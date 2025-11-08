'use client'

import { useRouter, usePathname } from 'next/navigation'
import { MessageSquare, PenSquare, Search, Image, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store/auth-store'

interface NavItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  active?: boolean
}

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuthStore()

  const navItems: NavItem[] = [
    {
      icon: MessageSquare,
      label: 'Chat',
      href: '/chat',
    },
    {
      icon: PenSquare,
      label: 'New Chat',
      href: '/chat/new',
    },
    {
      icon: Search,
      label: 'Search',
      href: '/search',
    },
    {
      icon: Image,
      label: 'Gallery',
      href: '/gallery',
    },
  ]

  const isActive = (href: string) => {
    if (href === '/chat') {
      return pathname === '/chat' || pathname?.startsWith('/chat/')
    }
    return pathname === href
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center bg-slate-900 py-4">
      {/* Top Navigation Items */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Button
              key={item.href}
              onClick={() => router.push(item.href)}
              variant="ghost"
              size="icon"
              className={cn(
                'h-12 w-12 rounded-xl transition-all duration-200',
                'hover:bg-slate-800 hover:text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
                active
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400'
              )}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
            </Button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-2">
        {/* Upgrade/Premium Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-xl transition-all duration-200',
            'text-slate-400 hover:bg-slate-800 hover:text-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
          )}
          aria-label="Upgrade"
          title="Upgrade"
        >
          <Sparkles className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <Button
          onClick={() => router.push('/profile')}
          variant="ghost"
          size="icon"
          className={cn(
            'h-12 w-12 rounded-full transition-all duration-200',
            'hover:ring-2 hover:ring-slate-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
          )}
          aria-label="Profile"
          title="Profile"
        >
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
        </Button>
      </div>
    </aside>
  )
}
