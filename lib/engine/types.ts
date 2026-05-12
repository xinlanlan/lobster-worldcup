export const FIELD_WIDTH = 100
export const FIELD_HEIGHT = 60

export interface Position {
  x: number
  y: number
}

export interface PlayerStats {
  speed: number
  passing: number
  shooting: number
  defending: number
  stamina: number
}

export interface Player {
  id: string
  name: string
  country: string
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST'
  stats: PlayerStats
  overall: number
  number: number
}

export interface MatchPlayer {
  playerId: string
  name: string
  fieldPosition: Position
  stats: PlayerStats
  currentStamina: number
  hasBall: boolean
  team: 'home' | 'away'
  position: Player['position']
  number: number
}

export interface TeamState {
  country: string
  lobsterName: string
  score: number
  tactic: Tactic
  subs: number  // substitutions used, max 3
}

export interface MatchState {
  matchId: string
  roomId: string
  homeTeam: TeamState
  awayTeam: TeamState
  players: MatchPlayer[]
  ball: Position
  minute: number
  phase: 'waiting' | 'playing' | 'halftime' | 'finished'
  possession: 'home' | 'away'
  lastEvent: MatchEvent | null
  events: MatchEvent[]
  pendingActions: {
    home: CoachAction | null
    away: CoachAction | null
  }
}

export interface MatchEvent {
  minute: number
  type: 'pass' | 'shot' | 'goal' | 'save' | 'tackle' | 'foul' | 'offside' | 'corner' | 'freekick' | 'kickoff' | 'halftime'
  team: 'home' | 'away'
  playerName?: string
  success: boolean
  commentary: Commentary
}

export interface Commentary {
  main: string
  analyst: string
}

export type Tactic = 'attacking' | 'balanced' | 'defensive' | 'counter'

export interface CoachAction {
  type: 'tactic' | 'substitute'
  tactic?: Tactic
  subOutId?: string
  subInId?: string
  team: 'home' | 'away'
}

export interface Room {
  roomId: string
  status: 'waiting' | 'ready' | 'playing' | 'finished'
  host: {
    lobsterName: string
    country: string
    ready: boolean
  }
  guest?: {
    lobsterName: string
    country: string
    ready: boolean
  }
  matchId?: string
  createdAt: number
}
