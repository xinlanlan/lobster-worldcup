'use client'
import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPusherClient, roomChannel, EVENTS } from '@/lib/pusher'

interface Props {
  params: Promise<{ roomId: string }>
  searchParams: Promise<{ role?: string; lobster?: string; country?: string }>
}

export default function RoomPage({ params, searchParams }: Props) {
  const { roomId } = use(params)
  const { role, lobster } = use(searchParams)
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const pusher = createPusherClient()
    const channel = pusher.subscribe(roomChannel(roomId))

    channel.bind(EVENTS.MATCH_STARTED, (data: { matchId: string }) => {
      router.push(`/match/${data.matchId}?role=${role ?? 'host'}&team=home`)
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe(roomChannel(roomId))
    }
  }, [roomId, role, router])

  const copyCode = () => {
    navigator.clipboard.writeText(roomId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-4 animate-bounce">🦞</div>
        <h1 className="text-2xl font-bold mb-2">等待对手加入...</h1>
        <p className="text-gray-400 mb-8">{lobster ?? '你'} 已准备就绪</p>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="text-gray-400 text-sm mb-2">把这个房间码发给你的对手</div>
          <div className="font-mono text-4xl font-black text-green-400 tracking-widest mb-4">
            {roomId}
          </div>
          <button
            onClick={copyCode}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all"
          >
            {copied ? '✅ 已复制' : '📋 复制房间码'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          等待中...
        </div>
      </div>
    </main>
  )
}
