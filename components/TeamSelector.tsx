'use client'
import React, { useState } from 'react'
import { TEAMS, Team } from '@/lib/data/teams'

interface Props {
  onSelect: (team: Team) => void
  selectedCountry?: string
  disabledCountry?: string  // opponent's choice
}

export default function TeamSelector({ onSelect, selectedCountry, disabledCountry }: Props) {
  const [search, setSearch] = useState('')

  const filtered = TEAMS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.nameZh.includes(search)
  )

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <input
        type="text"
        placeholder="搜索队伍..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:border-blue-400"
      />
      <div className="grid grid-cols-4 gap-2 max-h-72 overflow-y-auto">
        {filtered.map(team => (
          <button
            key={team.id}
            onClick={() => onSelect(team)}
            disabled={team.id === disabledCountry}
            className={`p-3 rounded-lg text-center transition-all border ${
              selectedCountry === team.id
                ? 'bg-blue-600 border-blue-400 text-white'
                : team.id === disabledCountry
                ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-1">{team.flag}</div>
            <div className="text-xs font-bold">{team.nameZh}</div>
            <div className="text-xs text-gray-400">{team.id}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
