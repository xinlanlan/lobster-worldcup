import Pusher from 'pusher-js'
import PusherServer from 'pusher'

// Client-side Pusher (browser)
export function createPusherClient(): Pusher {
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  })
}

// Server-side Pusher singleton
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
})

export function roomChannel(roomId: string): string {
  return `room-${roomId}`
}

export function matchChannel(matchId: string): string {
  return `match-${matchId}`
}

export const EVENTS = {
  MATCH_STARTED: 'match-started',
  MATCH_TICK: 'match-tick',
  MATCH_ENDED: 'match-ended',
  COACH_ACTION: 'coach-action',
} as const
