import { IconMoon, IconSun } from './icons'
import { SecondaryButton } from './ui'
import { useAppState } from '../state/AppState'

export default function ThemeToggle() {
  const { theme, actions } = useAppState()
  const isDark = theme === 'dark'
  return (
    <SecondaryButton
      onClick={() => actions.setTheme(isDark ? 'light' : 'dark')}
      className="glass px-3 border-slate-200/70 dark:border-slate-800/70"
    >
      {isDark ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
    </SecondaryButton>
  )
}
