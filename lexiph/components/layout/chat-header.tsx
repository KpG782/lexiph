'use client'

import { UserMenu } from './user-menu'

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 h-14 sm:h-16 bg-white border-b border-slate-200">
      <div className="h-full max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <h1 className="text-lg sm:text-xl font-bold text-slate-900">LexiPH</h1>
        <UserMenu />
      </div>
    </header>
  )
}
