import { NextRequest, NextResponse } from 'next/server'
import { kvGet } from '@/lib/kv'
import { MatchState } from '@/lib/engine/types'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params
    const matchState = await kvGet<MatchState>(`match:${matchId}`)

    if (!matchState) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 })
    }

    return NextResponse.json(matchState)
  } catch (error) {
    console.error('Get match error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
