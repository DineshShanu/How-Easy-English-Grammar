import { NavLink } from 'react-router-dom'
import { t } from '../lib/i18n'
import { useAppState } from '../state/AppState'
import { IconBook, IconHome, IconQuiz, IconSpark } from './icons'
import { cx } from './ui'

function Item({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon: (className: string) => React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-semibold',
          isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400',
        )
      }
    >
      {icon('h-5 w-5')}
      <span>{label}</span>
    </NavLink>
  )
}

export default function MobileNav() {
  const { language, user } = useAppState()
  if (!user) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:hidden">
      <div className="mx-auto flex max-w-6xl px-2">
        <Item to="/dashboard" label={t(language, 'nav.dashboard')} icon={(c) => <IconHome className={c} />} />
        <Item to="/lessons" label={t(language, 'nav.lessons')} icon={(c) => <IconBook className={c} />} />
        <Item to="/quizzes" label={t(language, 'nav.quizzes')} icon={(c) => <IconQuiz className={c} />} />
        <Item to="/daily-challenge" label={t(language, 'nav.dailyChallenge')} icon={(c) => <IconSpark className={c} />} />
      </div>
    </nav>
  )
}
