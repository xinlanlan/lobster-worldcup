import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { kvGet, kvSet } from '@/lib/kv'
import { pusherServer, roomChannel, EVENTS } from '@/lib/pusher'
import { Room } from '@/lib/engine/types'
import { createMatchState } from '@/lib/engine/match-engine'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  try {
    const { roomId } = await params
    const body = await request.json()
    const { lobsterName, country } = body

    if (!lobsterName || !country) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const room = await kvGet<Room>(`room:${roomId}`)
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }
    if (room.status !== 'waiting') {
      return NextResponse.json({ error: 'Room is not available' }, { status: 400 })
    }

    const matchId = uuidv4().substring(0, 12)

    // Update room
    room.guest = { lobsterName, country, ready: true }
    room.host.ready = true
    room.status = 'playing'
    room.matchId = matchId

    await kvSet(`room:${roomId}`, room, 3600)

    // Create match state
    const matchState = createMatchState(
      matchId,
      roomId,
      room.host.country,
      room.host.lobsterName,
      country,
      lobsterName
    )

    await kvSet(`match:${matchId}`, matchState, 7200) // 2 hour expiry

    // Notify host via Pusher
    await pusherServer.trigger(roomChannel(roomId), EVENTS.MATCH_STARTED, {
      matchId,
      homeCountry: room.host.country,
      homeLobster: room.host.lobsterName,
      awayCountry: country,
      awayLobster: lobsterName,
    })

    return NextResponse.json({ matchId, role: 'guest' })
  } catch (error) {
    console.error('Join room error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
