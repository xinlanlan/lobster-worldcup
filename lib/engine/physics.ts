import { Position, MatchPlayer, Tactic, FIELD_WIDTH, FIELD_HEIGHT } from './types'

// Base formation positions (for home team, 0=left goal, 100=right goal)
export const FORMATIONS: Record<string, Record<string, Position>> = {
  '4-3-3': {
    GK:  { x: 5, y: 30 },
    CB1: { x: 22, y: 22 }, CB2: { x: 22, y: 38 },
    LB:  { x: 20, y: 10 }, RB:  { x: 20, y: 50 },
    CDM: { x: 38, y: 30 },
    CM1: { x: 48, y: 18 }, CM2: { x: 48, y: 42 },
    LW:  { x: 68, y: 10 }, RW:  { x: 68, y: 50 },
    ST:  { x: 78, y: 30 },
  },
  '4-4-2': {
    GK:  { x: 5, y: 30 },
    CB1: { x: 22, y: 22 }, CB2: { x: 22, y: 38 },
    LB:  { x: 20, y: 10 }, RB:  { x: 20, y: 50 },
    LM:  { x: 45, y: 10 }, CM1: { x: 45, y: 25 }, CM2: { x: 45, y: 35 }, RM: { x: 45, y: 50 },
    ST1: { x: 72, y: 22 }, ST2: { x: 72, y: 38 },
  },
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

export function distance(a: Position, b: Position): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// Get base formation position for a player slot index (0=GK, 1-4=DEF, 5-7=MID, 8-10=FWD)
export function getFormationPosition(slotIndex: number, team: 'home' | 'away', tactic: Tactic): Position {
  const positions433 = [
    { x: 5, y: 30 },   // GK
    { x: 22, y: 18 },  // CB
    { x: 22, y: 42 },  // CB
    { x: 20, y: 8 },   // LB
    { x: 20, y: 52 },  // RB
    { x: 40, y: 30 },  // CDM
    { x: 50, y: 16 },  // CM
    { x: 50, y: 44 },  // CM
    { x: 70, y: 8 },   // LW
    { x: 70, y: 52 },  // RW
    { x: 78, y: 30 },  // ST
  ]

  const tacticXOffset = { attacking: 8, balanced: 0, defensive: -8, counter: -4 }[tactic]
  let pos = { ...positions433[slotIndex] }

  // Apply tactic offset (except GK stays put)
  if (slotIndex > 0) {
    pos.x = clamp(pos.x + tacticXOffset, 8, 90)
  }

  // Mirror for away team
  if (team === 'away') {
    pos = { x: FIELD_WIDTH - pos.x, y: FIELD_HEIGHT - pos.y }
  }

  return pos
}

// Add random jitter to simulate organic movement
export function jitter(pos: Position, amount: number): Position {
  return {
    x: clamp(pos.x + (Math.random() - 0.5) * amount * 2, 2, 98),
    y: clamp(pos.y + (Math.random() - 0.5) * amount * 2, 2, 58),
  }
}

// Move players towards their ideal positions
export function updatePlayerPositions(
  players: MatchPlayer[],
  possession: 'home' | 'away',
  homeTactic: Tactic,
  awayTactic: Tactic,
  ballPos: Position
): MatchPlayer[] {
  const homePlayers = players.filter(p => p.team === 'home')
  const awayPlayers = players.filter(p => p.team === 'away')

  return players.map((player) => {
    const slotIndex = player.team === 'home'
      ? homePlayers.indexOf(player)
      : awayPlayers.indexOf(player)
    const tactic = player.team === 'home' ? homeTactic : awayTactic

    let target = getFormationPosition(slotIndex, player.team, tactic)

    // Ball carrier moves toward opponent goal
    if (player.hasBall) {
      target = player.team === 'home'
        ? { x: clamp(ballPos.x + 5, 10, 95), y: clamp(ballPos.y, 5, 55) }
        : { x: clamp(ballPos.x - 5, 5, 90), y: clamp(ballPos.y, 5, 55) }
    }

    // Move toward target (speed-dependent)
    const speedFactor = player.stats.speed / 99 * 0.4
    const newPos = {
      x: lerp(player.fieldPosition.x, target.x, speedFactor) + (Math.random() - 0.5) * 1.5,
      y: lerp(player.fieldPosition.y, target.y, speedFactor) + (Math.random() - 0.5) * 1.5,
    }

    return {
      ...player,
      fieldPosition: {
        x: clamp(newPos.x, 2, 98),
        y: clamp(newPos.y, 2, 58),
      }
    }
  })
}

export function moveBallToPlayer(player: MatchPlayer): Position {
  return { ...player.fieldPosition }
}

export function getShotTarget(shooter: MatchPlayer): Position {
  // Aim for goal (x=0 or x=100, y=25-35)
  const goalX = shooter.team === 'home' ? 99 : 1
  const goalY = 25 + Math.random() * 10
  return { x: goalX, y: goalY }
}
