import { IconGlobe } from './icons'
import { SecondaryButton } from './ui'
import { useAppState } from '../state/AppState'

export default function LanguageToggle() {
  const { language, actions } = useAppState()
  return (
    <SecondaryButton
      onClick={() => actions.setLanguage(language === 'en' ? 'hi' : 'en')}
      className="glass px-3 border-slate-200/70 dark:border-slate-800/70"
    >
      <IconGlobe className="h-4 w-4" />
      <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'हिं'}</span>
    </SecondaryButton>
  )
}
