'use client'
import React, { use, useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MatchState } from '@/lib/engine/types'
import { createPusherClient, matchChannel, EVENTS } from '@/lib/pusher'
import ScoreBoard from '@/components/ScoreBoard'
import MatchField from '@/components/MatchField'
import Commentary from '@/components/Commentary'
import CoachPanel from '@/components/CoachPanel'

interface Props {
  params: Promise<{ matchId: string }>
  searchParams: Promise<{ role?: string; team?: string }>
}

export default function MatchPage({ params, searchParams }: Props) {
  const { matchId } = use(params)
  const { role, team } = use(searchParams)
  const router = useRouter()

  const teamSide = (team || 'home') as 'home' | 'away'
  const isHost = role === 'host' || teamSide === 'home'

  const [matchState, setMatchState] = useState<MatchState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isTickingRef = useRef(false)

  // Fetch initial state
  useEffect(() => {
    fetch(`/api/match/${matchId}`)
      .then(r => r.json())
      .then((data: MatchState & { error?: string }) => {
        if (data.error) {
          setError(data.error)
        } else {
          setMatchState(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError('加载比赛失败')
        setLoading(false)
      })
  }, [matchId])

  // Pusher subscription
  useEffect(() => {
    const pusher = createPusherClient()
    const channel = pusher.subscribe(matchChannel(matchId))

    channel.bind(EVENTS.MATCH_TICK, (data: { state: MatchState }) => {
      setMatchState(data.state)
      isTickingRef.current = false
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(matchChannel(matchId))
    }
  }, [matchId])

  // Tick engine — only HOST/home triggers ticks
  const tick = useCallback(async () => {
    if (isTickingRef.current) return
    isTickingRef.current = true
    try {
      const res = await fetch(`/api/match/${matchId}/tick`, { method: 'POST' })
      if (!res.ok) {
        isTickingRef.current = false
      }
      // State will be updated via Pusher broadcast
    } catch {
      isTickingRef.current = false
    }
  }, [matchId])

  useEffect(() => {
    if (!matchState) return
    if (matchState.phase === 'finished') {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current)
      return
    }
    if (!isHost) return

    tickIntervalRef.current = setInterval(tick, 3000)
    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current)
    }
  }, [matchState?.phase, tick, isHost])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">⚽</div>
          <p>加载比赛...</p>
        </div>
      </div>
    )
  }

  if (error || !matchState) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">😵</div>
          <p className="text-red-400">{error || '比赛不存在'}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Score Board */}
        <ScoreBoard state={matchState} />

        {/* Field */}
        <div className="flex justify-center">
          <MatchField state={matchState} />
        </div>

        {/* Bottom Panel */}
        <div className="grid grid-cols-2 gap-4" style={{ height: '280px' }}>
          <Commentary events={matchState.events} />
          <CoachPanel
            matchId={matchId}
            team={teamSide}
            state={matchState}
          />
        </div>

        {/* Role badge */}
        <div className="text-center text-gray-500 text-xs pb-4">
          你是 🦞 {teamSide === 'home' ? matchState.homeTeam.lobsterName : matchState.awayTeam.lobsterName}
          &nbsp;·&nbsp;
          执教 {teamSide === 'home' ? matchState.homeTeam.country : matchState.awayTeam.country}
        </div>
      </div>
    </main>
  )
}
