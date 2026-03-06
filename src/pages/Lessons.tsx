import { Link, useSearchParams } from 'react-router-dom'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { LESSONS } from '../data/lessons'
import type { Level } from '../lib/types'
import Illustration from '../components/Illustration'
import { Card, Input, Pill, ProgressBar, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'
import { t } from '../lib/i18n'
import { IconBookmark } from '../components/icons'

const LEVELS: Array<{ value: 'all' | Level; labelEn: string; labelHi: string }> = [
  { value: 'all', labelEn: 'All levels', labelHi: 'सभी स्तर' },
  { value: 'beginner', labelEn: 'Beginner', labelHi: 'शुरुआती' },
  { value: 'intermediate', labelEn: 'Intermediate', labelHi: 'मध्यम' },
  { value: 'advanced', labelEn: 'Advanced', labelHi: 'उन्नत' },
]

export default function Lessons() {
  const lessons = LESSONS
  const { language, userData, actions } = useAppState()

  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(urlQuery)
  const [level, setLevel] = useState<'all' | Level>('all')

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  const deferredQuery = useDeferredValue(query)

  const bookmarks = new Set(userData?.bookmarks ?? [])

  const lessonNumberById = useMemo(() => {
    const m = new Map<string, number>()
    for (let i = 0; i < lessons.length; i++) m.set(lessons[i].id, i + 1)
    return m
  }, [lessons])

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase()
    return lessons
      .filter((l) => (level === 'all' ? true : l.level === level))
      .filter((l) => {
        if (!q) return true
        return (
          l.topic.en.toLowerCase().includes(q) ||
          l.topic.hi.toLowerCase().includes(q) ||
          l.explanation.en.toLowerCase().includes(q) ||
          l.explanation.hi.toLowerCase().includes(q)
        )
      })
  }, [deferredQuery, lessons, level])

  const parseLevel = (value: string): 'all' | Level => {
    if (value === 'all' || value === 'beginner' || value === 'intermediate' || value === 'advanced') return value
    return 'all'
  }

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-xl dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 md:p-10">
        <div
          className="absolute inset-0 opacity-25 dark:hidden"
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9), transparent 55%)' }}
        />
        <div
          className="absolute inset-0 hidden opacity-35 dark:block"
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.55), transparent 55%)' }}
        />
        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div className="grid gap-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white/95 backdrop-blur">
              {t(language, 'nav.lessons')} • EN/HI
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">{t(language, 'nav.lessons')}</h1>
            <div className="text-sm font-semibold text-white/90">
              {t(language, 'common.search')} • {t(language, 'common.level')}
            </div>
          </div>

          <div className="glass rounded-3xl border border-white/20 p-5 shadow-2xl">
            <div className="rounded-2xl bg-white/70 p-5 text-slate-900 shadow-sm backdrop-blur dark:bg-slate-950/60 dark:text-slate-100">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-950/50">
                  <div className="text-xs font-extrabold text-slate-600 dark:text-slate-300">Results</div>
                  <div className="mt-1 text-2xl font-black">{filtered.length}</div>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800/70 dark:bg-slate-950/50">
                  <div className="text-xs font-extrabold text-slate-600 dark:text-slate-300">Total lessons</div>
                  <div className="mt-1 text-2xl font-black">{lessons.length}</div>
                </div>
              </div>
              <div className="mt-4 text-xs font-semibold text-slate-600 dark:text-slate-300">Tip: type to search; use level to filter.</div>
            </div>
          </div>
        </div>
      </section>

      <Card className="p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <Input label={t(language, 'common.search')} value={query} onChange={setQuery} placeholder="Noun / Tense / Voice..." />
          </div>
          <label className="grid gap-1 text-sm">
            <span className="font-medium text-slate-700 dark:text-slate-200">{t(language, 'common.level')}</span>
            <select
              value={level}
              onChange={(e) => setLevel(parseLevel(e.target.value))}
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2 text-slate-900 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:ring-indigo-400"
            >
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>
                  {language === 'en' ? l.labelEn : l.labelHi}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      <div className="grid gap-3">
        {filtered.map((lesson) => {
          const p = userData?.progress?.[lesson.id]
          const quizScore = p?.quizBestScore ?? 0
          const practiceBonus = p?.practiceCompleted ? 20 : 0
          const pct = p?.completed ? 100 : Math.min(80, quizScore + practiceBonus)
          const isBookmarked = bookmarks.has(lesson.id)

          let ctaLabel = 'Start'
          if (p?.completed) ctaLabel = 'Review'
          else if (pct > 0) ctaLabel = 'Continue'

          return (
            <Card key={lesson.id} className="lesson-card overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row">
                <div className="shrink-0 border-b border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800/80 dark:bg-slate-950/40 sm:w-56 sm:border-b-0 sm:border-r">
                  <Illustration
                    illustrationKey={lesson.illustrationKey}
                    level={lesson.level}
                    lessonNumber={lessonNumberById.get(lesson.id)}
                    className="border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/60"
                  />
                </div>

                <div className="grid flex-1 gap-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                        {language === 'en' ? lesson.topic.en : lesson.topic.hi}
                      </div>
                      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {language === 'en' ? lesson.explanation.en : lesson.explanation.hi}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <Pill>{lesson.level}</Pill>
                        <span>•</span>
                        <span>5 examples</span>
                        <span>•</span>
                        <span>Practice: {lesson.practice.length}</span>
                        <span>•</span>
                        <span>Quiz: {lesson.quiz.length}</span>
                        {p?.completed ? (
                          <>
                            <span>•</span>
                            <span className="font-extrabold text-emerald-700 dark:text-emerald-300">Completed</span>
                          </>
                        ) : null}
                      </div>
                    </div>

                    <SecondaryButton
                      onClick={() => actions.toggleBookmark(lesson.id)}
                      className={isBookmarked ? 'border-slate-900 dark:border-slate-100' : ''}
                    >
                      <IconBookmark className="h-4 w-4" />
                    </SecondaryButton>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span>{t(language, 'common.progress')}</span>
                      <span>{pct}%</span>
                    </div>
                    <ProgressBar value={pct} />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      EN/HI • Self-paced
                    </div>
                    <Link
                      to={`/lessons/${lesson.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-center text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-100 dark:text-slate-900"
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
