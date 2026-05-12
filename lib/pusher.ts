import Pusher from 'pusher-js'
import PusherServer from 'pusher'

// Client-side Pusher (browser)
export function createPusherClient(): Pusher {
  return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  })
}

// Server-side Pusher (lazy singleton)
let _pusherServer: PusherServer | null = null

export function getPusherServer(): PusherServer | null {
  if (!process.env.PUSHER_APP_ID || !process.env.PUSHER_SECRET) {
    return null
  }
  if (!_pusherServer) {
    _pusherServer = new PusherServer({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    })
  }
  return _pusherServer
}

// Keep backward compat — lazily initialized
export const pusherServer = new Proxy({} as PusherServer, {
  get(_, prop) {
    const server = getPusherServer()
    if (!server) {
      // No-op when Pusher is not configured
      if (prop === 'trigger') return async () => {}
      return undefined
    }
    return (server as any)[prop]
  }
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
