import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { t } from '../lib/i18n'
import { useAppState } from '../state/AppState'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { Button, SecondaryButton, cx } from './ui'

function NavItem({ to, label }: Readonly<{ to: string; label: string }>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          'whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold',
          isActive
            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900',
        )
      }
    >
      {label}
    </NavLink>
  )
}

export default function TopNav() {
  const { language, user, actions } = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
  const authed = Boolean(user)
  const showAuthedNav = authed && !['/login', '/signup'].includes(location.pathname)

  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (!location.pathname.startsWith('/lessons')) return
    const q = new URLSearchParams(location.search).get('q') ?? ''
    setSearchText(q)
  }, [location.pathname, location.search])


  const primaryNav = useMemo(() => {
    if (showAuthedNav) {
      return [
        { to: '/', label: t(language, 'nav.home') },
        { to: '/dashboard', label: t(language, 'nav.dashboard') },
        { to: '/lessons', label: t(language, 'nav.lessons') },
        { to: '/quizzes', label: t(language, 'nav.quizzes') },
      ]
    }
    return [
      { to: '/', label: t(language, 'nav.home') },
      { to: '/blog', label: t(language, 'nav.blog') },
      { to: '/worksheets', label: t(language, 'nav.worksheets') },
      { to: '/tips', label: t(language, 'nav.tips') },
    ]
  }, [language, showAuthedNav])

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white backdrop-blur dark:border-slate-800/70 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white grid place-items-center font-black shadow-lg">
              H
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{t(language, 'app.name')}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">English Grammar • EN/HI</div>
            </div>
          </Link>

          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault()
              const q = searchText.trim()
              navigate(q ? `/lessons?q=${encodeURIComponent(q)}` : '/lessons')
            }}
          >
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={language === 'en' ? 'Search lessons…' : 'पाठ खोजें…'}
              className={cx(
                'w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-semibold backdrop-blur',
                'text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500',
                'dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-indigo-400',
              )}
            />
          </form>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />
            <ThemeToggle />

            {authed ? (
              <SecondaryButton onClick={() => actions.logout()} className="inline-flex px-3">
                {t(language, 'auth.logout')}
              </SecondaryButton>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <SecondaryButton onClick={() => navigate('/login')} className="px-3">
                  {t(language, 'auth.login')}
                </SecondaryButton>
                <Button onClick={() => navigate('/signup')} className="px-3">
                  {t(language, 'auth.signup')}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {authed ? null : (
            <div className="flex sm:hidden gap-2">
              <SecondaryButton onClick={() => navigate('/login')} className="px-3">
                {t(language, 'auth.login')}
              </SecondaryButton>
              <Button onClick={() => navigate('/signup')} className="px-3">
                {t(language, 'auth.signup')}
              </Button>
            </div>
          )}

          <nav className="no-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {primaryNav.map((i) => (
              <NavItem key={i.to} to={i.to} label={i.label} />
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
