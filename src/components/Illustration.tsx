import { useId } from 'react'
import type { Level } from '../lib/types'
import { cx } from './ui'
import { IconBook } from './icons'

export default function Illustration({
  illustrationKey,
  level,
  lessonNumber,
  className,
}: Readonly<{
  illustrationKey: string
  level: Level
  lessonNumber?: number
  className?: string
}>) {
  const textureId = useId()

  let accent = 'text-violet-600 dark:text-violet-400'
  if (level === 'beginner') accent = 'text-emerald-600 dark:text-emerald-400'
  else if (level === 'intermediate') accent = 'text-sky-600 dark:text-sky-400'

  // Simple illustration-based explanation placeholder (SVG, no external assets)
  const icon = (() => {
    switch (illustrationKey) {
      case 'alphabet':
        return (
          <>
            <path d="M7 18h10" />
            <path d="M9 18 12 6l3 12" />
            <path d="M10 14h4" />
          </>
        )
      case 'noun':
        return (
          <>
            <path d="M8 7h8" />
            <path d="M8 11h8" />
            <path d="M8 15h6" />
            <path d="M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          </>
        )
      case 'pronoun':
        return (
          <>
            <path d="M16 11a4 4 0 1 0-8 0" />
            <path d="M6 20c1.2-3 3.4-5 6-5s4.8 2 6 5" />
            <path d="M12 3v2" />
          </>
        )
      case 'verb':
        return (
          <>
            <path d="M7 17l10-10" />
            <path d="M10 7h7v7" />
          </>
        )
      case 'adjective':
        return <path d="M12 3l2.4 5 5.6.6-4.2 3.7 1.2 5.6-5-2.8-5 2.8 1.2-5.6L4 8.6 9.6 8z" />
      case 'adverb':
        return (
          <>
            <path d="M5 12h10" />
            <path d="M11 8l4 4-4 4" />
            <path d="M5 7h6" />
            <path d="M5 17h6" />
          </>
        )
      case 'preposition':
        return (
          <>
            <path d="M4 19h16" />
            <path d="M7 19V8a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v11" />
            <path d="M9 10h6" />
          </>
        )
      case 'conjunction':
        return (
          <>
            <path d="M7 12h4" />
            <path d="M13 12h4" />
            <path d="M11 12c0-2 2-4 4-4" />
            <path d="M11 12c0 2 2 4 4 4" />
          </>
        )
      case 'interjection':
        return (
          <>
            <path d="M6 9a6 6 0 0 1 12 0v5a4 4 0 0 1-4 4H9a3 3 0 0 1-3-3V9Z" />
            <path d="M10 9h.01" />
            <path d="M14 9h.01" />
            <path d="M9 13h6" />
          </>
        )
      case 'sentence-types':
      case 'sentences':
        return (
          <>
            <path d="M7 8h10" />
            <path d="M7 12h7" />
            <path d="M7 16h10" />
            <path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5Z" />
          </>
        )

      case 'parts-of-speech':
        return (
          <>
            <path d="M7 7h10" />
            <path d="M7 12h10" />
            <path d="M7 17h10" />
            <path d="M4 4h16v16H4z" />
          </>
        )

      case 'articles':
        return (
          <>
            <path d="M8 7h8" />
            <path d="M7 17h10" />
            <path d="M9 17V9" />
            <path d="M15 17V9" />
            <path d="M9 9h6" />
          </>
        )

      case 'plural':
        return (
          <>
            <path d="M8 8h8" />
            <path d="M8 12h8" />
            <path d="M8 16h6" />
            <path d="M6 6h12v14H6z" />
            <path d="M9 6V4h6v2" />
          </>
        )

      case 'gender':
        return (
          <>
            <circle cx="9" cy="10" r="3" />
            <circle cx="15" cy="10" r="3" />
            <path d="M9 13v6" />
            <path d="M15 13v6" />
          </>
        )

      case 'tense-intro':
        return (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M12 7v5l3 2" />
          </>
        )

      case 'present-simple':
        return (
          <>
            <path d="M6 16V8" />
            <path d="M6 16h12" />
            <path d="M10 12h8" />
            <path d="M10 8h8" />
          </>
        )

      case 'past-simple':
        return (
          <>
            <path d="M8 7V4" />
            <path d="M16 7V4" />
            <path d="M6 9h12" />
            <path d="M6 20V7h12v13" />
            <path d="M9 13h6" />
          </>
        )

      case 'future-simple':
        return (
          <>
            <path d="M5 12h10" />
            <path d="M11 8l4 4-4 4" />
            <path d="M5 7h8" />
            <path d="M5 17h8" />
          </>
        )

      case 'modals':
        return (
          <>
            <path d="M7 12h10" />
            <path d="M9 8h6" />
            <path d="M9 16h6" />
            <path d="M6 6h12v12H6z" />
          </>
        )

      case 'wh-questions':
        return (
          <>
            <path d="M9 9a3 3 0 0 1 6 1c0 2-2 2-2 4" />
            <path d="M12 17h.01" />
            <path d="M5 5h14v14H5z" />
          </>
        )

      case 'punctuation':
        return (
          <>
            <path d="M10 7h4" />
            <path d="M12 7v6" />
            <path d="M12 16h.01" />
            <path d="M16 7h.01" />
            <path d="M16 16h.01" />
          </>
        )

      case 'passive-advanced':
      case 'voice-intro':
        return (
          <>
            <path d="M7 9h10" />
            <path d="M7 13h6" />
            <path d="M13 13l4 4" />
            <path d="M13 17h4" />
          </>
        )

      case 'agreement':
        return (
          <>
            <path d="M7 7h10" />
            <path d="M7 12h10" />
            <path d="M7 17h10" />
            <path d="M9 12l2 2 4-4" />
          </>
        )

      case 'present-perfect':
        return (
          <>
            <path d="M12 6v6l4 2" />
            <path d="M7 12a5 5 0 0 0 10 0" />
            <path d="M4 12a8 8 0 0 1 16 0" />
          </>
        )

      case 'past-perfect':
        return (
          <>
            <path d="M8 8h8" />
            <path d="M8 12h6" />
            <path d="M8 16h8" />
            <path d="M6 6h12v14H6z" />
          </>
        )

      case 'reported-speech':
        return (
          <>
            <path d="M6 8h12" />
            <path d="M6 12h8" />
            <path d="M6 16h10" />
            <path d="M6 20l3-3h9a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3" />
          </>
        )

      case 'conditionals':
        return (
          <>
            <path d="M7 12h10" />
            <path d="M12 7v10" />
            <path d="M9 9l3-3 3 3" />
            <path d="M9 15l3 3 3-3" />
          </>
        )

      case 'clauses':
        return (
          <>
            <path d="M7 7h6" />
            <path d="M7 11h10" />
            <path d="M7 15h8" />
            <path d="M5 5h14v14H5z" />
          </>
        )

      case 'gerund-infinitive':
        return (
          <>
            <path d="M7 7h6" />
            <path d="M7 12h10" />
            <path d="M7 17h6" />
            <path d="M15 7h2" />
            <path d="M15 17h2" />
          </>
        )

      case 'parallelism':
        return (
          <>
            <path d="M7 8h10" />
            <path d="M7 12h10" />
            <path d="M7 16h10" />
            <path d="M9 8v10" />
            <path d="M15 8v10" />
          </>
        )

      default:
        return (
          <>
            <path d="M4 19V6a2 2 0 0 1 2-2h10a4 4 0 0 1 4 4v11" />
            <path d="M8 4v15" />
            <path d="M6 19h14" />
          </>
        )
    }
  })()

  return (
    <div className={cx('relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950', className)}>
      <svg
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      <div className={cx('absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10', accent, 'bg-current')} />
      <div className={cx('absolute -bottom-10 -left-10 h-28 w-28 rounded-full opacity-10', accent, 'bg-current')} />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] dark:opacity-[0.08]"
      >
        <defs>
          <pattern id={textureId} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 16L16 0" stroke="currentColor" strokeWidth="1" />
            <path d="M-4 12L12 -4" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${textureId})`} className={accent} />
      </svg>
      <div className="flex items-center gap-3">
        <div className={cx('h-10 w-10 rounded-2xl bg-slate-100 p-2 dark:bg-slate-900', accent)}>
          <IconBook className="h-full w-full" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {typeof lessonNumber === 'number' && Number.isFinite(lessonNumber) ? `Lesson-${lessonNumber}` : 'Lesson'}
          </div>
          <div className="truncate text-xs text-slate-600 dark:text-slate-400">{illustrationKey}</div>
        </div>
      </div>
    </div>
  )
}
