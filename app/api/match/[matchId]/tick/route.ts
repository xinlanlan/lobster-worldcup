import { NextRequest, NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv'
import { pusherServer, matchChannel, EVENTS } from '@/lib/pusher'
import { MatchState } from '@/lib/engine/types'
import { tickMatch } from '@/lib/engine/match-engine'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params

    const currentState = await kvGet<MatchState>(`match:${matchId}`)
    if (!currentState) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 })
    }
    if (currentState.phase === 'finished') {
      return NextResponse.json(currentState)
    }

    // Advance one minute
    const newState = tickMatch(currentState)

    // Save
    await kvSet(`match:${matchId}`, newState, 7200)

    // Broadcast to all watchers
    await pusherServer.trigger(matchChannel(matchId), EVENTS.MATCH_TICK, {
      state: newState,
    })

    if (newState.phase === 'finished') {
      await pusherServer.trigger(matchChannel(matchId), EVENTS.MATCH_ENDED, {
        homeScore: newState.homeTeam.score,
        awayScore: newState.awayTeam.score,
        homeLobster: newState.homeTeam.lobsterName,
        awayLobster: newState.awayTeam.lobsterName,
      })
    }

    return NextResponse.json(newState)
  } catch (error) {
    console.error('Tick error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
