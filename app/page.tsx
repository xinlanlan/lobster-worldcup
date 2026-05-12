'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import TeamSelector from '@/components/TeamSelector'
import { Team } from '@/lib/data/teams'

export default function Home() {
  const router = useRouter()
  const [mode, setMode] = useState<'none' | 'create' | 'join'>('none')
  const [lobsterName, setLobsterName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [roomCode, setRoomCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createRoom = async () => {
    if (!lobsterName.trim() || !selectedTeam) {
      setError('请填写龙虾名字并选择队伍！')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lobsterName: lobsterName.trim(), country: selectedTeam.id }),
      })
      const data = await res.json()
      if (data.roomId) {
        router.push(`/room/${data.roomId}?role=host&lobster=${encodeURIComponent(lobsterName.trim())}&country=${selectedTeam.id}`)
      } else {
        setError(data.error || '创建失败')
      }
    } catch {
      setError('创建房间失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = async () => {
    if (!lobsterName.trim() || !selectedTeam || !roomCode.trim()) {
      setError('请填写所有信息！')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/rooms/${roomCode.trim().toUpperCase()}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lobsterName: lobsterName.trim(), country: selectedTeam.id }),
      })
      const data = await res.json()
      if (data.matchId) {
        router.push(`/match/${data.matchId}?role=guest&team=away`)
      } else {
        setError(data.error || '加入失败')
      }
    } catch {
      setError('加入房间失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="text-center py-16 px-4">
        <div className="text-6xl mb-4">🦞⚽🦞</div>
        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          龙虾世界杯
        </h1>
        <p className="text-gray-400 text-lg">让你的龙虾代表世界强队出战，实时策略对决</p>
      </div>

      {/* Mode Selection */}
      {mode === 'none' && (
        <div className="max-w-md mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode('create')}
              className="p-6 bg-green-700 hover:bg-green-600 rounded-xl text-center transition-all border border-green-500"
            >
              <div className="text-3xl mb-2">🏟️</div>
              <div className="font-bold text-lg">创建房间</div>
              <div className="text-sm text-green-200 mt-1">生成房间码，等待对手</div>
            </button>
            <button
              onClick={() => setMode('join')}
              className="p-6 bg-blue-700 hover:bg-blue-600 rounded-xl text-center transition-all border border-blue-500"
            >
              <div className="text-3xl mb-2">🚪</div>
              <div className="font-bold text-lg">加入房间</div>
              <div className="text-sm text-blue-200 mt-1">输入房间码，即刻开战</div>
            </button>
          </div>
        </div>
      )}

      {/* Create/Join Form */}
      {mode !== 'none' && (
        <div className="max-w-2xl mx-auto px-4 pb-16">
          <button
            onClick={() => { setMode('none'); setError('') }}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
          >
            ← 返回
          </button>

          <div className="space-y-4">
            {/* Lobster name */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">🦞 你的龙虾名</label>
              <input
                type="text"
                value={lobsterName}
                onChange={e => setLobsterName(e.target.value)}
                placeholder="起个霸气的名字..."
                maxLength={16}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400"
              />
            </div>

            {/* Join room code */}
            {mode === 'join' && (
              <div>
                <label className="text-gray-300 text-sm mb-1 block">🔑 房间码</label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={e => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="8位房间码"
                  maxLength={8}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 font-mono text-xl tracking-widest"
                />
              </div>
            )}

            {/* Team selection */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">
                {selectedTeam ? `✅ 已选择: ${selectedTeam.flag} ${selectedTeam.nameZh}` : '🌍 选择队伍'}
              </label>
              <TeamSelector
                onSelect={setSelectedTeam}
                selectedCountry={selectedTeam?.id}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/30 border border-red-700 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              onClick={mode === 'create' ? createRoom : joinRoom}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl font-bold text-lg transition-all disabled:opacity-50"
            >
              {loading ? '处理中...' : mode === 'create' ? '🏟️ 创建房间' : '⚔️ 加入对战'}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
