import { MatchState, MatchPlayer, MatchEvent, Position, Player, Tactic } from './types'
import { getFormationPosition, updatePlayerPositions, jitter } from './physics'
import { resolveMinuteEvent, decayStamina, possessionChangeChance } from './events'
import { generateCommentary } from './commentary'
import { getStartingEleven } from '../data/players'

export function createMatchState(
  matchId: string,
  roomId: string,
  homeCountry: string,
  homeLobster: string,
  awayCountry: string,
  awayLobster: string
): MatchState {
  const homePlayers = getStartingEleven(homeCountry)
  const awayPlayers = getStartingEleven(awayCountry)

  const matchPlayers: MatchPlayer[] = [
    ...homePlayers.map((p, i) => ({
      playerId: p.id,
      name: p.name,
      fieldPosition: jitter(getFormationPosition(i, 'home', 'balanced'), 2),
      stats: p.stats,
      currentStamina: 100,
      hasBall: i === 10, // striker starts with ball
      team: 'home' as const,
      position: p.position,
      number: p.number,
    })),
    ...awayPlayers.map((p, i) => ({
      playerId: p.id,
      name: p.name,
      fieldPosition: jitter(getFormationPosition(i, 'away', 'balanced'), 2),
      stats: p.stats,
      currentStamina: 100,
      hasBall: false,
      team: 'away' as const,
      position: p.position,
      number: p.number,
    })),
  ]

  const kickoffEvent: MatchEvent = {
    minute: 0,
    type: 'kickoff',
    team: 'home',
    success: true,
    commentary: {
      main: `比赛开始！${homeLobster}的${homeCountry}对阵${awayLobster}的${awayCountry}！`,
      analyst: '双方教练都已就位，让我们期待精彩对决！',
    }
  }

  return {
    matchId,
    roomId,
    homeTeam: { country: homeCountry, lobsterName: homeLobster, score: 0, tactic: 'balanced', subs: 0 },
    awayTeam: { country: awayCountry, lobsterName: awayLobster, score: 0, tactic: 'balanced', subs: 0 },
    players: matchPlayers,
    ball: { x: 50, y: 30 },
    minute: 0,
    phase: 'playing',
    possession: 'home',
    lastEvent: kickoffEvent,
    events: [kickoffEvent],
    pendingActions: { home: null, away: null },
  }
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function tickMatch(state: MatchState): MatchState {
  if (state.phase === 'finished') return state

  const newState = deepClone(state)
  newState.minute++

  // Apply pending coach actions
  applyPendingActions(newState)

  // Halftime
  if (newState.minute === 45 && newState.phase === 'playing') {
    newState.phase = 'halftime'
    const htEvent: MatchEvent = {
      minute: 45,
      type: 'halftime',
      team: 'home',
      success: true,
      commentary: {
        main: `上半场结束！比分 ${newState.homeTeam.score} : ${newState.awayTeam.score}`,
        analyst: '中场休息，双方教练可以调整战术和换人。',
      }
    }
    newState.lastEvent = htEvent
    newState.events.push(htEvent)
    return newState
  }

  if (newState.minute === 46 && newState.phase === 'halftime') {
    newState.phase = 'playing'
  }

  // Finish
  if (newState.minute >= 90) {
    newState.phase = 'finished'
    const homeScore = newState.homeTeam.score
    const awayScore = newState.awayTeam.score
    let resultText: string
    if (homeScore > awayScore) {
      resultText = `${newState.homeTeam.lobsterName}胜出`
    } else if (awayScore > homeScore) {
      resultText = `${newState.awayTeam.lobsterName}胜出`
    } else {
      resultText = '平局'
    }
    const endEvent: MatchEvent = {
      minute: 90,
      type: 'kickoff',
      team: 'home',
      success: true,
      commentary: {
        main: `终场哨声响起！最终比分 ${homeScore} : ${awayScore}！`,
        analyst: `精彩的比赛！${resultText}！`,
      }
    }
    newState.lastEvent = endEvent
    newState.events.push(endEvent)
    return newState
  }

  // Stamina decay
  newState.players = decayStamina(newState.players, newState.minute)

  // Resolve event
  const eventBase = resolveMinuteEvent(newState)

  // Update score
  if (eventBase.type === 'goal') {
    if (eventBase.team === 'home') newState.homeTeam.score++
    else newState.awayTeam.score++
    // Ball goes to center after goal
    newState.ball = { x: 50, y: 30 }
    newState.possession = eventBase.team === 'home' ? 'away' : 'home'
  }

  // Update possession on tackle/pass failure
  if (eventBase.type === 'tackle' && eventBase.success) {
    newState.possession = eventBase.team
  } else if (eventBase.type === 'pass' && !eventBase.success) {
    newState.possession = newState.possession === 'home' ? 'away' : 'home'
  }

  // Random possession change (minor drift; reserved for future enhancement)
  const attackTactic = newState.possession === 'home' ? newState.homeTeam.tactic : newState.awayTeam.tactic
  void possessionChangeChance(attackTactic, attackTactic) // referenced to avoid unused-import warning

  // Generate commentary
  const commentary = generateCommentary(eventBase as MatchEvent, newState)
  const event: MatchEvent = { ...eventBase, commentary }

  newState.lastEvent = event
  newState.events.push(event)

  // Update ball position based on event
  updateBallPosition(newState, event)

  // Update player positions
  newState.players = updatePlayerPositions(
    newState.players,
    newState.possession,
    newState.homeTeam.tactic,
    newState.awayTeam.tactic,
    newState.ball
  )

  // Update hasBall flag
  const ballCarriers = newState.players.filter(
    p => p.team === newState.possession && ['ST', 'CAM', 'LW', 'RW'].includes(p.position)
  )
  newState.players = newState.players.map(p => ({
    ...p,
    hasBall: ballCarriers.length > 0 && p.playerId === ballCarriers[0].playerId
  }))

  return newState
}

function updateBallPosition(state: MatchState, event: MatchEvent): void {
  const isHome = event.team === 'home'

  if (event.type === 'goal') {
    state.ball = { x: 50, y: 30 }
  } else if (event.type === 'shot' || event.type === 'save') {
    // Ball near opponent goal
    state.ball = isHome
      ? { x: 85 + Math.random() * 10, y: 22 + Math.random() * 16 }
      : { x: 5 + Math.random() * 10, y: 22 + Math.random() * 16 }
  } else if (event.type === 'corner') {
    state.ball = isHome
      ? { x: 99, y: Math.random() < 0.5 ? 2 : 58 }
      : { x: 1, y: Math.random() < 0.5 ? 2 : 58 }
  } else if (event.type === 'tackle' && event.success) {
    // Ball where defender is
    const defender = state.players.find(
      p => p.team === event.team && ['CB', 'LB', 'RB', 'CDM'].includes(p.position)
    )
    if (defender) state.ball = { ...defender.fieldPosition }
  } else {
    // Ball moves forward/backward with possession
    const currentX = state.ball.x
    const deltaX = isHome
      ? Math.random() * 8 - 2    // mostly forward
      : -(Math.random() * 8 - 2)
    const deltaY = (Math.random() - 0.5) * 10
    state.ball = {
      x: Math.max(2, Math.min(98, currentX + deltaX)),
      y: Math.max(2, Math.min(58, state.ball.y + deltaY))
    }
  }
}

function applyPendingActions(state: MatchState): void {
  for (const teamKey of ['home', 'away'] as const) {
    const action = state.pendingActions[teamKey]
    if (!action) continue

    const teamState = teamKey === 'home' ? state.homeTeam : state.awayTeam

    if (action.type === 'tactic' && action.tactic) {
      teamState.tactic = action.tactic
    }

    if (action.type === 'substitute' && action.subOutId && action.subInId && teamState.subs < 3) {
      const outIdx = state.players.findIndex(p => p.team === teamKey && p.playerId === action.subOutId)
      if (outIdx >= 0) {
        // Reset stamina of subbed-out player to simulate fresh substitute legs
        state.players[outIdx].currentStamina = 95
        teamState.subs++
      }
    }

    state.pendingActions[teamKey] = null
  }
}
