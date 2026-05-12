import { MatchState, MatchPlayer, MatchEvent, Tactic } from './types'
import { distance } from './physics'

export function random(): number {
  return Math.random()
}

export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Stamina-adjusted stat (decays after 70 min)
export function getEffectiveStat(baseStat: number, currentStamina: number): number {
  const staminaFactor = Math.max(currentStamina / 100, 0.6)
  return Math.round(baseStat * staminaFactor)
}

// Shot success rate: 20-55% range
export function shotSuccessRate(
  shooter: MatchPlayer,
  keeper: MatchPlayer,
  tactic: Tactic
): number {
  const shootStat = getEffectiveStat(shooter.stats.shooting, shooter.currentStamina)
  const keepStat = getEffectiveStat(keeper.stats.defending, keeper.currentStamina)
  const base = (shootStat / 99) * 0.40
  const keeperReduce = (keepStat / 99) * 0.15
  const tacticBonus = tactic === 'attacking' ? 0.05 : tactic === 'defensive' ? -0.05 : 0
  return Math.min(Math.max(base - keeperReduce + tacticBonus, 0.08), 0.55)
}

// Pass success rate: 55-92% range
export function passSuccessRate(
  passer: MatchPlayer,
  isLong: boolean
): number {
  const passStat = getEffectiveStat(passer.stats.passing, passer.currentStamina)
  const base = (passStat / 99) * 0.9
  const penalty = isLong ? 0.18 : 0.04
  return Math.min(Math.max(base - penalty, 0.45), 0.94)
}

// Tackle success rate: 15-45% range
export function tackleSuccessRate(
  defender: MatchPlayer,
  attacker: MatchPlayer
): number {
  const defStat = getEffectiveStat(defender.stats.defending, defender.currentStamina)
  const attSpeed = getEffectiveStat(attacker.stats.speed, attacker.currentStamina)
  return Math.min(Math.max((defStat * 0.6 + (99 - attSpeed) * 0.4) / 99 * 0.45, 0.10), 0.45)
}

// Stamina decay per minute
export function decayStamina(players: MatchPlayer[], minute: number): MatchPlayer[] {
  return players.map(p => {
    const decayRate = minute > 70 ? 0.5 : 0.25  // accelerates after 70 min
    return {
      ...p,
      currentStamina: Math.max(p.currentStamina - decayRate, 40)
    }
  })
}

// Determine possession change probability
export function possessionChangeChance(tactic: Tactic, opponentTactic: Tactic): number {
  // Aggressive tactics create more chances but more turnovers
  const base = 0.25
  const tacticMod: Record<Tactic, number> = {
    attacking: 0.05,   // more open = more transitions
    balanced: 0,
    defensive: -0.08,  // hard to break down
    counter: 0.02,
  }
  return Math.min(Math.max(base + tacticMod[tactic], 0.1), 0.45)
}

// Main event resolution for one minute
export function resolveMinuteEvent(state: MatchState): Omit<MatchEvent, 'commentary'> {
  const attackTeam = state.possession
  const defendTeam = attackTeam === 'home' ? 'away' : 'home'

  const attackPlayers = state.players.filter(p => p.team === attackTeam)
  const defendPlayers = state.players.filter(p => p.team === defendTeam)

  const attackTactic = attackTeam === 'home' ? state.homeTeam.tactic : state.awayTeam.tactic

  const keeper = defendPlayers.find(p => p.position === 'GK')!
  const striker = attackPlayers.find(p => ['ST', 'CAM', 'LW', 'RW'].includes(p.position))!
  const midfielder = attackPlayers.find(p => ['CM', 'CDM'].includes(p.position))
  const defender = defendPlayers.find(p => ['CB', 'LB', 'RB'].includes(p.position))!

  // Determine event type based on field position and randomness
  const roll = random()

  // Is attacker in dangerous zone?
  const isInBox = attackTeam === 'home'
    ? state.ball.x > 75 && state.ball.y > 15 && state.ball.y < 45
    : state.ball.x < 25 && state.ball.y > 15 && state.ball.y < 45

  // Shot opportunity
  if (isInBox && roll < 0.35) {
    const shotPlayer = striker || attackPlayers[attackPlayers.length - 1]
    const success = random() < shotSuccessRate(shotPlayer, keeper, attackTactic)
    return {
      minute: state.minute,
      type: success ? 'goal' : 'save',
      team: attackTeam,
      playerName: shotPlayer.name,
      success,
    }
  }

  // Tackle / possession change
  if (roll < 0.55) {
    const defPlayer = defender
    const attPlayer = striker || attackPlayers[1]
    const success = random() < tackleSuccessRate(defPlayer, attPlayer)
    if (success) {
      return {
        minute: state.minute,
        type: 'tackle',
        team: defendTeam,
        playerName: defPlayer.name,
        success: true,
      }
    }
  }

  // Foul
  if (roll < 0.62) {
    const isFoul = random() < 0.4
    if (isFoul) {
      const defPlayer = randomChoice(defendPlayers.filter(p => p.position !== 'GK'))
      const isInDangerZone = isInBox
      return {
        minute: state.minute,
        type: isInDangerZone ? 'freekick' : 'foul',
        team: defendTeam,
        playerName: defPlayer.name,
        success: false,
      }
    }
  }

  // Corner
  if (roll < 0.68 && random() < 0.15) {
    return {
      minute: state.minute,
      type: 'corner',
      team: attackTeam,
      success: true,
    }
  }

  // Default: pass
  const passer = midfielder || attackPlayers[1]
  const isLong = random() < 0.3
  const success = random() < passSuccessRate(passer, isLong)
  return {
    minute: state.minute,
    type: 'pass',
    team: attackTeam,
    playerName: passer?.name,
    success,
  }
}
