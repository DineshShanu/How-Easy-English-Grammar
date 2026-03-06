import React, { useEffect, useState } from 'react'
import MobileNav from './MobileNav'
import TopNav from './TopNav'
import { SecondaryButton } from './ui'
import { IconArrowUp } from './icons'

export default function Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(globalThis.window.scrollY > 400)
    }
    onScroll()
    globalThis.window.addEventListener('scroll', onScroll, { passive: true })
    return () => globalThis.window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-dvh bg-amber-50 text-slate-900 dark:bg-black dark:text-slate-100">
      <TopNav />
      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-6">{children}</main>

      {showScrollTop ? (
        <div className="fixed bottom-24 right-4 z-40 md:bottom-6">
          <SecondaryButton
            onClick={() => globalThis.window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3"
            type="button"
          >
            <IconArrowUp className="h-4 w-4" title="Back to top" />
          </SecondaryButton>
        </div>
      ) : null}

      <MobileNav />
    </div>
  )
}
