'use client'
import React, { useEffect, useRef } from 'react'
import { MatchEvent } from '@/lib/engine/types'

interface Props {
  events: MatchEvent[]
}

const eventIcon: Record<string, string> = {
  goal: '⚽',
  save: '🧤',
  tackle: '💪',
  pass: '➡️',
  foul: '🟨',
  freekick: '🎯',
  corner: '🚩',
  halftime: '🔔',
  kickoff: '🏁',
  offside: '🚫',
  shot: '💥',
}

export default function Commentary({ events }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [events.length])

  const recentEvents = [...events].reverse().slice(0, 20)

  return (
    <div className="bg-gray-900 rounded-xl p-4 h-full flex flex-col border border-gray-700">
      <h3 className="text-white font-bold mb-3 flex items-center gap-2">
        <span>📢</span> 解说席
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {recentEvents.map((event, i) => (
          <div
            key={`${event.minute}-${i}`}
            className={`p-3 rounded-lg border-l-4 ${
              event.type === 'goal'
                ? 'bg-yellow-900/40 border-yellow-400'
                : event.type === 'save'
                ? 'bg-blue-900/30 border-blue-400'
                : event.type === 'halftime'
                ? 'bg-gray-700/50 border-gray-400'
                : 'bg-gray-800/50 border-gray-600'
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{eventIcon[event.type] || '📌'}</span>
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">{event.minute}&apos;</div>
                <div className="text-white text-sm leading-relaxed">
                  {event.commentary.main}
                </div>
                <div className="text-gray-300 text-xs mt-1 italic leading-relaxed">
                  {event.commentary.analyst}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
