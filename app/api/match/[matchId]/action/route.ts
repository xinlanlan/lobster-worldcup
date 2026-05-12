import { NextRequest, NextResponse } from 'next/server'
import { kvGet, kvSet } from '@/lib/kv'
import { MatchState, CoachAction } from '@/lib/engine/types'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params
    const action: CoachAction = await request.json()

    const matchState = await kvGet<MatchState>(`match:${matchId}`)
    if (!matchState) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 })
    }
    if (matchState.phase === 'finished') {
      return NextResponse.json({ error: 'Match is finished' }, { status: 400 })
    }

    // Store the pending action
    matchState.pendingActions[action.team] = action
    await kvSet(`match:${matchId}`, matchState, 7200)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Action error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
