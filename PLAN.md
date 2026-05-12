# 🦞 龙虾世界杯 — 实现计划

> **Goal:** 一个多人足球策略游戏，龙虾选队、实时踢球、AI解说。部署在 Vercel。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **实时通信**: Pusher Channels（免费套餐）
- **数据存储**: Vercel KV (Redis)
- **样式**: Tailwind CSS
- **动画**: HTML Canvas API
- **部署**: Vercel

## 项目结构

```
lobster-worldcup/
├── app/
│   ├── page.tsx                    # 首页：队伍列表 + 创建/加入房间
│   ├── room/[roomId]/page.tsx      # 房间页：等待对手 + 选队
│   ├── match/[matchId]/page.tsx    # 比赛页：实时球场 + 解说 + 操作
│   └── api/
│       ├── rooms/route.ts          # 创建/查询房间
│       ├── rooms/[roomId]/join/route.ts  # 加入房间
│       ├── match/[matchId]/route.ts     # 查询比赛状态
│       ├── match/[matchId]/action/route.ts  # 教练操作
│       └── match/[matchId]/tick/route.ts    # 引擎推进（cron/手动触发）
├── lib/
│   ├── data/
│   │   ├── teams.ts               # 32支队伍数据
│   │   └── players.ts             # 球员数据 + 5维属性
│   ├── engine/
│   │   ├── types.ts               # 所有类型定义
│   │   ├── match-engine.ts        # 核心引擎：每帧计算
│   │   ├── physics.ts             # 球员移动、球路径
│   │   ├── events.ts              # 事件判定（传球/射门/抢断）
│   │   └── commentary.ts          # 解说生成
│   ├── pusher.ts                  # Pusher 客户端/服务端
│   └── kv.ts                      # Vercel KV 操作封装
├── components/
│   ├── TeamSelector.tsx            # 队伍选择组件
│   ├── MatchField.tsx              # Canvas球场渲染
│   ├── Commentary.tsx              # 解说滚动面板
│   ├── ScoreBoard.tsx              # 比分板
│   ├── CoachPanel.tsx              # 教练操作面板
│   └── PlayerStats.tsx             # 球员属性展示
└── ...config files
```

---

## Task 1: 项目初始化

**创建 Next.js 项目，安装依赖，配置环境**

```bash
npx create-next-app@latest lobster-worldcup \
  --typescript --tailwind --app --src-dir=false \
  --import-alias="@/*" --yes

cd lobster-worldcup

npm install pusher pusher-js @vercel/kv uuid
npm install -D @types/uuid
```

`.env.local`:
```
PUSHER_APP_ID=xxx
PUSHER_KEY=xxx
PUSHER_SECRET=xxx
PUSHER_CLUSTER=ap3
NEXT_PUBLIC_PUSHER_KEY=xxx
NEXT_PUBLIC_PUSHER_CLUSTER=ap3
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
```

---

## Task 2: 数据层 — 队伍 + 球员

**文件**: `lib/data/teams.ts`, `lib/data/players.ts`

### 2026世界杯参赛队（分组后实际为48队，取热门16强）

包含：巴西、阿根廷、法国、英格兰、西班牙、葡萄牙、德国、荷兰、日本、韩国、摩洛哥、美国、墨西哥、克罗地亚、意大利、塞内加尔

### 每队核心球员（11-15人），5维属性：

```typescript
interface Player {
  id: string
  name: string
  country: string
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST'
  stats: {
    speed: number      // 速度 1-99
    passing: number    // 传球 1-99
    shooting: number   // 射门 1-99
    defending: number  // 防守 1-99
    stamina: number    // 体能 1-99
  }
  overall: number      // 综合评分
}
```

**数值基准（FIFA真实评分映射）：**
- 梅西: speed=82, passing=96, shooting=91, defending=37, stamina=78
- 姆巴佩: speed=97, passing=79, shooting=93, defending=44, stamina=87
- 孙兴慜: speed=94, passing=82, shooting=87, defending=62, stamina=85
- 哈兰德: speed=87, passing=65, shooting=95, defending=28, stamina=88

---

## Task 3: 核心类型定义

**文件**: `lib/engine/types.ts`

```typescript
// 球场尺寸（逻辑单位）
export const FIELD_WIDTH = 100
export const FIELD_HEIGHT = 60

export interface Position {
  x: number  // 0-100
  y: number  // 0-60
}

export interface MatchPlayer {
  playerId: string
  name: string
  position: Position
  stats: PlayerStats
  currentStamina: number  // 随比赛衰减
  hasBall: boolean
  team: 'home' | 'away'
}

export interface MatchState {
  matchId: string
  homeTeam: { country: string; lobsterName: string; score: number; tactic: Tactic }
  awayTeam: { country: string; lobsterName: string; score: number; tactic: Tactic }
  players: MatchPlayer[]
  ball: Position
  minute: number          // 0-90
  phase: 'waiting' | 'playing' | 'halftime' | 'finished'
  possession: 'home' | 'away'
  lastEvent: MatchEvent | null
  events: MatchEvent[]
}

export interface MatchEvent {
  minute: number
  type: 'pass' | 'shot' | 'goal' | 'save' | 'tackle' | 'foul' | 'offside' | 'corner' | 'freekick'
  team: 'home' | 'away'
  player?: string
  success: boolean
  commentary: Commentary
}

export interface Commentary {
  main: string      // 主播（情绪）
  analyst: string   // 分析员（数据）
}

export type Tactic = 'attacking' | 'balanced' | 'defensive' | 'counter'

export interface CoachAction {
  type: 'tactic' | 'substitute'
  tactic?: Tactic
  subOut?: string   // playerId
  subIn?: string    // playerId
}
```

---

## Task 4: 比赛引擎核心

**文件**: `lib/engine/match-engine.ts`

每次调用 `tickMatch(state)` 推进1分钟：

```typescript
export function tickMatch(state: MatchState): MatchState {
  const newState = deepClone(state)
  newState.minute++
  
  // 1. 体能衰减（70分钟后加速）
  applyStaminaDecay(newState)
  
  // 2. 判定本分钟主要事件
  const event = resolveMinuteEvent(newState)
  
  // 3. 更新球和球员位置
  updatePositions(newState, event)
  
  // 4. 处理进球
  if (event.type === 'goal' && event.success) {
    if (event.team === 'home') newState.homeTeam.score++
    else newState.awayTeam.score++
  }
  
  // 5. 生成解说
  event.commentary = generateCommentary(event, newState)
  
  newState.lastEvent = event
  newState.events.push(event)
  
  // 6. 处理中场休息
  if (newState.minute === 45) newState.phase = 'halftime'
  if (newState.minute === 46) newState.phase = 'playing'
  if (newState.minute >= 90) newState.phase = 'finished'
  
  return newState
}
```

### 事件判定概率公式

```typescript
// 射门成功率
function shotSuccessRate(shooter: MatchPlayer, keeper: MatchPlayer, tactic: Tactic): number {
  const base = (shooter.stats.shooting / 99) * 0.35  // 基础35%射门转化率
  const keeperFactor = (99 - keeper.stats.defending) / 99 * 0.15
  const tacticBonus = tactic === 'attacking' ? 0.05 : tactic === 'defensive' ? -0.05 : 0
  return Math.min(base + keeperFactor + tacticBonus, 0.65)
}

// 传球成功率
function passSuccessRate(passer: MatchPlayer, distance: 'short' | 'long'): number {
  const base = passer.stats.passing / 99
  const distancePenalty = distance === 'long' ? 0.25 : 0.05
  return Math.max(base - distancePenalty, 0.3)
}

// 抢断成功率
function tackleSuccessRate(defender: MatchPlayer, attacker: MatchPlayer): number {
  return (defender.stats.defending * 0.6 + (99 - attacker.stats.speed) * 0.4) / 99 * 0.5
}
```

### 事件权重（每分钟）

```
possession_change: 15%   控球转换
pass: 45%               传球（控球方）
dribble: 15%            带球
shot: 15%               射门（需要在前场）
foul: 5%                犯规
corner: 3%              角球
freekick: 2%            任意球
```

---

## Task 5: 球员位置物理系统

**文件**: `lib/engine/physics.ts`

每帧根据战术和事件更新22名球员的坐标：

```typescript
// 阵型基础站位（4-3-3）
const FORMATION_433: Record<string, Position> = {
  GK:  { x: 5, y: 30 },
  CB1: { x: 20, y: 20 }, CB2: { x: 20, y: 40 },
  LB:  { x: 22, y: 10 }, RB:  { x: 22, y: 50 },
  CDM: { x: 35, y: 30 },
  CM1: { x: 45, y: 18 }, CM2: { x: 45, y: 42 },
  LW:  { x: 65, y: 8 },  RW:  { x: 65, y: 52 },
  ST:  { x: 72, y: 30 },
}

// 战术修正
function applyTacticOffset(pos: Position, tactic: Tactic, team: 'home' | 'away'): Position {
  const sign = team === 'home' ? 1 : -1
  const xOffset = { attacking: 10, balanced: 0, defensive: -8, counter: -5 }[tactic]
  return { x: clamp(pos.x + sign * xOffset, 5, 95), y: pos.y }
}
```

---

## Task 6: 解说系统

**文件**: `lib/engine/commentary.ts`

模板引擎 + 随机变体：

```typescript
const TEMPLATES = {
  goal: {
    main: [
      "⚽ {player}！{player}！球进了！{team}队打破僵局！",
      "进球！！！{player}的这脚射门速度{speed}，门将根本来不及反应！",
      "GOOOAL！{team}！{minute}分钟，{player}建功！",
    ],
    analyst: [
      "注意看这次进攻路线，{team}选择了{tactic}打法，{player}的射门属性{shooting}在这个位置命中率很高。",
      "这个进球来自于对方防线的空档，{tactic}战术在这一刻奏效了。",
    ]
  },
  shot_saved: {
    main: [
      "打门——被扑出去了！{keeper}神勇！",
      "险！{player}的射门被门将化解！",
    ],
    analyst: [
      "{keeper}防守属性{defending}，面对这种距离的射门扑救率有{rate}%。",
    ]
  },
  tackle: {
    main: [
      "好一个铲球！{player}把球断下来了！",
      "{player}！漂亮的防守！",
    ],
    analyst: [
      "{player}防守属性{defending}，这个抢断概率是{rate}%，今天运气不错。",
    ]
  },
  // ... more templates
}
```

---

## Task 7: API 路由

### `POST /api/rooms` — 创建房间
```typescript
// body: { lobsterName, country }
// 返回: { roomId, joinCode }
// 存入KV: room:{roomId} = { host, status: 'waiting' }
```

### `POST /api/rooms/[roomId]/join` — 加入房间
```typescript
// body: { lobsterName, country }
// 触发Pusher: room:{roomId} channel, 'player-joined' event
// 状态变更: waiting → ready
```

### `GET /api/match/[matchId]` — 获取比赛状态
```typescript
// 从KV读取 match:{matchId}
```

### `POST /api/match/[matchId]/action` — 教练操作
```typescript
// body: CoachAction
// 存入KV，下一帧引擎计算时纳入
```

### `POST /api/match/[matchId]/tick` — 推进一帧
```typescript
// 读取当前state → tickMatch() → 存回KV → Pusher推送
// 前端每3秒轮询触发（Vercel免费版不支持cron，用客户端轮询）
```

---

## Task 8: 前端页面

### 首页 `app/page.tsx`
- 32支队伍展示（国旗emoji + 队名）
- 「创建房间」按钮 → 输入龙虾名 → 选队 → 生成房间码
- 「加入房间」按钮 → 输入房间码 + 龙虾名 → 选队

### 等待页 `app/room/[roomId]/page.tsx`
- 显示房间码（供对手加入）
- 实时等待对手加入（Pusher监听）
- 两人都准备好后自动跳转比赛页

### 比赛页 `app/match/[matchId]/page.tsx`

**布局：**
```
┌─────────────────────────────────────────┐
│        🦞 虾王  1 : 0  海底捞哥 🦞      │  ← ScoreBoard
│                  第 67 分钟              │
├─────────────────────────────────────────┤
│                                         │
│         [Canvas 球场 700×420px]          │  ← MatchField
│   22个小点实时移动，球是⚽，进球有动画    │
│                                         │
├──────────────────┬──────────────────────┤
│  📢 解说席        │  🎯 教练操作          │
│  主播: ...       │  [进攻] [平衡] [防守]  │  ← Commentary + CoachPanel
│  分析: ...       │  [换人] 选择球员      │
└──────────────────┴──────────────────────┘
```

### Canvas 球场渲染
- 绿色草皮背景，白线画出球场线
- 主队蓝色圆点，客队红色圆点
- ⚽ emoji 标记球的位置
- 事件发生时：射门有轨迹线，进球有闪光动画
- 每帧（3秒）球员位置平滑插值过渡

---

## Task 9: 部署配置

### vercel.json
```json
{
  "functions": {
    "app/api/match/[matchId]/tick/route.ts": {
      "maxDuration": 10
    }
  }
}
```

### 环境变量（Vercel Dashboard）
- Pusher: 去 pusher.com 免费注册，创建 App
- Vercel KV: Vercel Dashboard → Storage → Create KV

---

## 开发顺序

1. 初始化项目
2. 数据层（队伍+球员）
3. 引擎核心（可以先单元测试）
4. API 路由
5. 前端页面
6. 联调测试
7. 部署 Vercel

**预计总代码量**: ~2500行
**预计开发时间**: 全力跑 2-3小时（subagent流水线）
