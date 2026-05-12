'use client'
import React, { useState } from 'react'
import { Tactic, CoachAction, MatchState } from '@/lib/engine/types'

interface Props {
  matchId: string
  team: 'home' | 'away'
  state: MatchState
}

const tactics: { value: Tactic; label: string; desc: string }[] = [
  { value: 'attacking', label: '⚡ 强攻', desc: '全力进攻，防线暴露' },
  { value: 'balanced', label: '⚖️ 平衡', desc: '攻守兼备' },
  { value: 'defensive', label: '🛡️ 防守', desc: '稳固后防，等待机会' },
  { value: 'counter', label: '🏃 反击', desc: '收缩反击，速度致命' },
]

export default function CoachPanel({ matchId, team, state }: Props) {
  const [loading, setLoading] = useState(false)
  const [lastAction, setLastAction] = useState<string>('')

  const teamState = team === 'home' ? state.homeTeam : state.awayTeam
  const currentTactic = teamState.tactic

  const sendAction = async (action: CoachAction) => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/match/${matchId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action),
      })
      if (res.ok) {
        setLastAction(`${new Date().toLocaleTimeString()} — 指令已下达`)
      }
    } catch {
      setLastAction('发送失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const changeTactic = (tactic: Tactic) => {
    sendAction({ type: 'tactic', tactic, team })
  }

  if (state.phase === 'finished') {
    return (
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
        <h3 className="text-white font-bold mb-3">🏆 比赛结束</h3>
        <div className="text-center py-8">
          <div className="text-5xl mb-4">
            {state.homeTeam.score > state.awayTeam.score ? '🎉' :
             state.homeTeam.score < state.awayTeam.score ? '😭' : '🤝'}
          </div>
          <div className="text-white text-lg font-bold">
            {state.homeTeam.score === state.awayTeam.score ? '平局！' :
             team === 'home' ?
               (state.homeTeam.score > state.awayTeam.score ? '你赢了！' : '下次加油！') :
               (state.awayTeam.score > state.homeTeam.score ? '你赢了！' : '下次加油！')
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 flex flex-col h-full">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <span>🎯</span>
        {teamState.lobsterName}的指挥台
      </h3>

      {/* Tactic Buttons */}
      <div className="mb-4">
        <div className="text-gray-400 text-xs mb-2 uppercase tracking-wider">战术</div>
        <div className="grid grid-cols-2 gap-2">
          {tactics.map((t) => (
            <button
              key={t.value}
              onClick={() => changeTactic(t.value)}
              disabled={loading || state.phase !== 'playing'}
              className={`p-2 rounded-lg text-sm font-medium transition-all border ${
                currentTactic === t.value
                  ? 'bg-green-600 border-green-400 text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={t.desc}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Substitution info */}
      <div className="text-gray-400 text-xs mt-auto">
        换人次数：{teamState.subs}/3
      </div>

      {/* Last action feedback */}
      {lastAction && (
        <div className="text-green-400 text-xs mt-2">
          ✓ {lastAction}
        </div>
      )}
    </div>
  )
}
