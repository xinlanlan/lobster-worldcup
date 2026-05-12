'use client'
import React, { useRef, useEffect, useCallback } from 'react'
import { MatchState, FIELD_WIDTH, FIELD_HEIGHT } from '@/lib/engine/types'

interface Props {
  state: MatchState
}

const CANVAS_W = 700
const CANVAS_H = 420

// Convert field coords (0-100, 0-60) to canvas coords
function fieldToCanvas(x: number, y: number): [number, number] {
  const margin = 30
  const fieldW = CANVAS_W - margin * 2
  const fieldH = CANVAS_H - margin * 2
  return [
    margin + (x / FIELD_WIDTH) * fieldW,
    margin + (y / FIELD_HEIGHT) * fieldH,
  ]
}

export default function MatchField({ state }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    // === FIELD BACKGROUND ===
    ctx.fillStyle = '#1a6b1a'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Alternating stripe pattern
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        const x = 30 + (i / 8) * (CANVAS_W - 60)
        const w = (CANVAS_W - 60) / 8
        ctx.fillStyle = '#1c731c'
        ctx.fillRect(x, 30, w, CANVAS_H - 60)
      }
    }

    // === FIELD LINES ===
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'
    ctx.lineWidth = 1.5
    ctx.setLineDash([])

    const margin = 30
    const fw = CANVAS_W - margin * 2
    const fh = CANVAS_H - margin * 2

    // Outer boundary
    ctx.strokeRect(margin, margin, fw, fh)

    // Center line
    ctx.beginPath()
    ctx.moveTo(CANVAS_W / 2, margin)
    ctx.lineTo(CANVAS_W / 2, CANVAS_H - margin)
    ctx.stroke()

    // Center circle
    ctx.beginPath()
    ctx.arc(CANVAS_W / 2, CANVAS_H / 2, 50, 0, Math.PI * 2)
    ctx.stroke()

    // Center dot
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(CANVAS_W / 2, CANVAS_H / 2, 3, 0, Math.PI * 2)
    ctx.fill()

    // Penalty areas (left)
    const paW = (16.5 / FIELD_WIDTH) * fw
    const paH = (40.32 / FIELD_HEIGHT) * fh
    const paY = margin + (fh - paH) / 2
    ctx.strokeRect(margin, paY, paW, paH)

    // Penalty areas (right)
    ctx.strokeRect(CANVAS_W - margin - paW, paY, paW, paH)

    // Goal areas (6-yard boxes)
    const gaW = (5.5 / FIELD_WIDTH) * fw
    const gaH = (18.32 / FIELD_HEIGHT) * fh
    const gaY = margin + (fh - gaH) / 2
    ctx.strokeRect(margin, gaY, gaW, gaH)
    ctx.strokeRect(CANVAS_W - margin - gaW, gaY, gaW, gaH)

    // Goals
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    const goalH = (7.32 / FIELD_HEIGHT) * fh
    const goalY = margin + (fh - goalH) / 2
    const goalW = 8
    ctx.fillRect(margin - goalW, goalY, goalW, goalH)
    ctx.fillRect(CANVAS_W - margin, goalY, goalW, goalH)
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    ctx.strokeRect(margin - goalW, goalY, goalW, goalH)
    ctx.strokeRect(CANVAS_W - margin, goalY, goalW, goalH)

    // Penalty spots
    ctx.fillStyle = 'white'
    const pSpotX1 = margin + (11 / FIELD_WIDTH) * fw
    const pSpotX2 = CANVAS_W - margin - (11 / FIELD_WIDTH) * fw
    const pSpotY = CANVAS_H / 2
    ctx.beginPath()
    ctx.arc(pSpotX1, pSpotY, 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(pSpotX2, pSpotY, 2.5, 0, Math.PI * 2)
    ctx.fill()

    // === PLAYERS ===
    for (const player of state.players) {
      const [cx, cy] = fieldToCanvas(player.fieldPosition.x, player.fieldPosition.y)
      const isHome = player.team === 'home'

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.beginPath()
      ctx.ellipse(cx, cy + 9, 6, 2.5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Body circle
      const gradient = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, 10)
      if (isHome) {
        gradient.addColorStop(0, player.hasBall ? '#60afff' : '#3b82f6')
        gradient.addColorStop(1, player.hasBall ? '#1d4ed8' : '#1e40af')
      } else {
        gradient.addColorStop(0, player.hasBall ? '#ff8080' : '#ef4444')
        gradient.addColorStop(1, player.hasBall ? '#b91c1c' : '#991b1b')
      }

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(cx, cy, player.position === 'GK' ? 9 : 8, 0, Math.PI * 2)
      ctx.fill()

      // Border
      ctx.strokeStyle = player.hasBall ? '#fbbf24' : 'rgba(255,255,255,0.6)'
      ctx.lineWidth = player.hasBall ? 2.5 : 1
      ctx.stroke()

      // Jersey number
      ctx.fillStyle = 'white'
      ctx.font = `bold ${player.position === 'GK' ? '7' : '6.5'}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(player.number), cx, cy)

      // Name label
      ctx.font = '9px sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.textAlign = 'center'
      ctx.fillText(player.name.split(' ').pop() || '', cx, cy + 16)
    }

    // === BALL ===
    const [bx, by] = fieldToCanvas(state.ball.x, state.ball.y)

    // Ball shadow
    ctx.fillStyle = 'rgba(0,0,0,0.35)'
    ctx.beginPath()
    ctx.ellipse(bx, by + 7, 5, 2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Ball
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(bx, by, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    ctx.stroke()

    // Ball emoji overlay
    ctx.font = '8px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#222'
    ctx.fillText('⚽', bx, by)

    // === LAST EVENT HIGHLIGHT ===
    if (state.lastEvent?.type === 'goal') {
      ctx.fillStyle = 'rgba(255, 215, 0, 0.15)'
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
      ctx.font = 'bold 48px sans-serif'
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('⚽ GOAL!', CANVAS_W / 2, CANVAS_H / 2)
    }

    // Possession indicator
    const possText = state.possession === 'home'
      ? `← ${state.homeTeam.country} 控球`
      : `${state.awayTeam.country} 控球 →`
    ctx.font = '12px sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(possText, CANVAS_W / 2, 5)

  }, [state])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="w-full rounded-xl border border-gray-700 shadow-2xl"
      style={{ maxWidth: CANVAS_W }}
    />
  )
}
