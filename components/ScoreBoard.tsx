import React from 'react'
import { MatchState } from '@/lib/engine/types'

interface Props {
  state: MatchState
}

const tacticLabels: Record<string, string> = {
  attacking: '⚡ 强攻',
  balanced: '⚖️ 平衡',
  defensive: '🛡️ 防守',
  counter: '🏃 反击',
}

export default function ScoreBoard({ state }: Props) {
  const phaseLabel = {
    waiting: '等待开始',
    playing: `第 ${state.minute} 分钟`,
    halftime: '中场休息',
    finished: '比赛结束',
  }[state.phase]

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 flex items-center justify-between shadow-lg border border-gray-700">
      {/* Home Team */}
      <div className="flex flex-col items-end flex-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{state.homeTeam.country}</span>
          <span className="text-2xl">{getFlag(state.homeTeam.country)}</span>
        </div>
        <div className="text-sm text-gray-400">🦞 {state.homeTeam.lobsterName}</div>
        <div className="text-xs text-blue-400 mt-1">{tacticLabels[state.homeTeam.tactic]}</div>
      </div>

      {/* Score */}
      <div className="flex flex-col items-center mx-8">
        <div className="text-5xl font-mono font-black">
          <span className="text-blue-400">{state.homeTeam.score}</span>
          <span className="text-gray-500 mx-2">:</span>
          <span className="text-red-400">{state.awayTeam.score}</span>
        </div>
        <div className="text-sm text-yellow-400 mt-1 font-semibold">{phaseLabel}</div>
        {state.phase === 'playing' && (
          <div className="w-32 h-1 bg-gray-700 rounded mt-2">
            <div
              className="h-1 bg-green-400 rounded transition-all duration-1000"
              style={{ width: `${(state.minute / 90) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Away Team */}
      <div className="flex flex-col items-start flex-1">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getFlag(state.awayTeam.country)}</span>
          <span className="text-lg font-bold">{state.awayTeam.country}</span>
        </div>
        <div className="text-sm text-gray-400">🦞 {state.awayTeam.lobsterName}</div>
        <div className="text-xs text-red-400 mt-1">{tacticLabels[state.awayTeam.tactic]}</div>
      </div>
    </div>
  )
}

function getFlag(country: string): string {
  const flags: Record<string, string> = {
    ARG: '🇦🇷', FRA: '🇫🇷', BRA: '🇧🇷', ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    ESP: '🇪🇸', PRT: '🇵🇹', GER: '🇩🇪', NED: '🇳🇱',
    JPN: '🇯🇵', KOR: '🇰🇷', MAR: '🇲🇦', USA: '🇺🇸',
    MEX: '🇲🇽', CRO: '🇭🇷', ITA: '🇮🇹', SEN: '🇸🇳',
  }
  return flags[country] || '🏳️'
}
