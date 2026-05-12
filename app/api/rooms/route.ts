import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { kvGet, kvSet } from '@/lib/kv'
import { Room } from '@/lib/engine/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lobsterName, country } = body

    if (!lobsterName || !country) {
      return NextResponse.json({ error: 'Missing lobsterName or country' }, { status: 400 })
    }

    const roomId = uuidv4().substring(0, 8).toUpperCase()

    const room: Room = {
      roomId,
      status: 'waiting',
      host: { lobsterName, country, ready: false },
      createdAt: Date.now(),
    }

    await kvSet(`room:${roomId}`, room, 3600) // 1 hour expiry

    return NextResponse.json({ roomId, role: 'host' })
  } catch (error) {
    console.error('Create room error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const roomId = request.nextUrl.searchParams.get('roomId')

  if (!roomId) {
    return NextResponse.json({ error: 'Missing roomId' }, { status: 400 })
  }

  const room = await kvGet<Room>(`room:${roomId}`)

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  return NextResponse.json(room)
}
