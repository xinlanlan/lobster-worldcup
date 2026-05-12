import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🦞 龙虾世界杯 | Lobster World Cup',
  description: '让你的龙虾代表世界强队出战，实时策略对决！',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={`${inter.className} bg-gray-950 antialiased min-h-full`}>{children}</body>
    </html>
  )
}
