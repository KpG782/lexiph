'use client'

import { UserMenu } from './user-menu'

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 h-14 sm:h-16 bg-white border-b border-slate-200">
      <div className="h-full max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <h1 className="font-display text-xl sm:text-2xl font-bold bg-linear-to-r from-iris-400 via-purple-500 to-iris-600 animate-gradient bg-clip-text text-transparent truncate tracking-tight">LexInSight</h1>
        <UserMenu />
      </div>
    </header>
  )
}
