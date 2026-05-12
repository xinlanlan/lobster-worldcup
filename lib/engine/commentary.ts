import { MatchEvent, MatchState, Commentary } from './types'

type Templates = {
  main: string[]
  analyst: string[]
}

const TEMPLATES: Record<string, Templates> = {
  goal: {
    main: [
      '⚽ 进球啦！！！{player}，这脚射门太漂亮了！{team}队破门！',
      '球——进——了！{player}！{team}队领先了！观众席都沸腾了！',
      '不可思议！{minute}分钟，{player}打进一球！{team}完全掌控局面！',
      'GOOOAL！{team}！{player}把握住了机会，门将毫无办法！',
    ],
    analyst: [
      '{player}今天状态很好，这次射门充分利用了他的射门属性，选位非常精准。',
      '注意到了吗？{team}在这一波进攻中完全执行了{tactic}战术，最终由{player}完成临门一脚。',
      '这个进球有{coach}教练的功劳——上一次战术调整打开了这个通道。',
    ],
  },
  save: {
    main: [
      '打门——被扑出去了！门将太神勇了！',
      '险！{player}的射门被扑救！差一点点！',
      '门将鱼跃扑球，{player}这一脚没能改变比分！',
      '哦——出去了！{player}的射门偏出了！这个角度选择有点问题。',
    ],
    analyst: [
      '{player}选择了{tactic}打法下的强行突破，这种情况下射门角度会受限。',
      '门将的防守属性在这次扑救中发挥了关键作用，{player}需要换个思路。',
      '数据上看，这个位置的射门转化率大概只有20%，{player}还需要更靠近球门。',
    ],
  },
  tackle: {
    main: [
      '好球！漂亮的断球！{player}把球抢下来了！',
      '{player}！干净利落的铲球！反击机会来了！',
      '断球成功！{player}今天的防守太稳了，{team}反守为攻！',
    ],
    analyst: [
      '{player}的防守属性帮了大忙，这次断球时机卡得很精准。',
      '{team}在{tactic}战术下防守重心靠后，这给了{player}更好的断球位置。',
      '注意这次反抢的角度，{player}没有正面冲撞，而是等对方传球的瞬间出脚。',
    ],
  },
  pass: {
    main: [
      '{player}横传，{team}继续在中场倒脚...',
      '球传到了{player}脚下，{team}在重新组织进攻。',
      '{player}一脚传球，{team}控制着局面节奏。',
    ],
    analyst: [
      '{team}用这种传控来消耗对方体力，随着时间推移会有效果。',
      '传球成功率还不错，{player}今天的视野很好。',
      '{tactic}战术下的传球体系运转流畅，{team}在积累优势。',
    ],
  },
  pass_failed: {
    main: [
      '传球失误！{player}这脚球传丢了！',
      '{player}的传球被断！控球权易主！',
      '哦不，{player}选择失误，球被对方抢走了！',
    ],
    analyst: [
      '这个传球角度选择有问题，在{tactic}战术下应该走更保险的路线。',
      '{player}的传球属性不支持这种难度的穿插，风险太大了。',
      '这就是激进战术的代价——创造机会的同时也容易失误。',
    ],
  },
  foul: {
    main: [
      '犯规！{player}上脚太重了，裁判马上吹哨！',
      '犯规，{player}的动作有点大，对方球员倒地了。',
    ],
    analyst: [
      '这次犯规发生在{minute}分钟，{team}的体力消耗在影响判断了。',
      '{player}的防守属性虽然不错，但这次出脚时机明显慢了半拍。',
    ],
  },
  freekick: {
    main: [
      '危险区域任意球！{team}获得了一次绝好机会！',
      '任意球！{team}要如何利用这次机会？',
    ],
    analyst: [
      '这个位置距球门大约25-30米，射门直接破门的概率在15-20%左右。',
      '任意球是{team}的机会，看教练怎么安排战术。',
    ],
  },
  corner: {
    main: [
      '角球！{team}获得角球机会！',
      '球出了底线，{team}角球！',
    ],
    analyst: [
      '角球是可以直接转化为射门的机会，{team}要利用好。',
      '角球阶段往往是防守方最容易出现混乱的时候。',
    ],
  },
  halftime: {
    main: [
      '上半场结束！双方各有发挥，下半场会更精彩！',
      '裁判吹响了上半场结束的哨声，两队回到更衣室。',
    ],
    analyst: [
      '上半场数据上看，控球率和射门次数是关键指标，教练们下半场会做出调整。',
      '中场休息是换人和调整战术的最佳时机，下半场开局很关键。',
    ],
  },
  kickoff: {
    main: [
      '比赛开始！让我们期待精彩的对决！',
      '哨声响起，球滚了！两队龙虾教练各就各位！',
    ],
    analyst: [
      '开球时刻，双方的战术部署将在接下来几分钟内逐渐清晰。',
      '注意观察两队的站位，这将反映教练的战术意图。',
    ],
  },
}

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]
}

function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] || key)
}

export function generateCommentary(event: MatchEvent, state: MatchState): Commentary {
  const isHome = event.team === 'home'
  const teamState = isHome ? state.homeTeam : state.awayTeam
  const opponentState = isHome ? state.awayTeam : state.homeTeam

  const tacticLabels: Record<string, string> = {
    attacking: '强力进攻',
    balanced: '均衡',
    defensive: '稳固防守',
    counter: '反击',
  }

  const vars: Record<string, string> = {
    player: event.playerName || '球员',
    team: teamState.country,
    coach: teamState.lobsterName,
    opponent: opponentState.country,
    minute: String(event.minute),
    tactic: tacticLabels[teamState.tactic] || teamState.tactic,
  }

  let templateKey: string = event.type
  if (event.type === 'pass' && !event.success) templateKey = 'pass_failed'
  if (event.type === 'shot') templateKey = 'save'  // non-goal shot
  if (event.type === 'goal') templateKey = 'goal'

  const templates = TEMPLATES[templateKey] || TEMPLATES.pass

  return {
    main: fillTemplate(pick(templates.main), vars),
    analyst: fillTemplate(pick(templates.analyst), vars),
  }
}
