import { Card, Pill, ProgressBar } from '../components/ui'
import { useAppState } from '../state/AppState'
import { t } from '../lib/i18n'
import { LESSONS } from '../data/lessons'
import type { Level } from '../lib/types'
import { Link } from 'react-router-dom'
import vocabularyData from '../data/vocabulary.json'
import { toLocalDateString } from '../lib/date'
import { pickDailyIndex } from '../lib/daily'

function levelLabel(level: Level) {
  if (level === 'beginner') return 'Beginner'
  if (level === 'intermediate') return 'Intermediate'
  return 'Advanced'
}

export default function Dashboard() {
  const { user, userData, language } = useAppState()
  const lessons = LESSONS

  type WordItem = { id: string; word: string; meaningHi: string; exampleEn: string; exampleHi: string }
  const words: WordItem[] = vocabularyData
  const dailyWord = words[pickDailyIndex(toLocalDateString(), words.length)]

  const completedIds = new Set(
    Object.values(userData?.progress ?? {})
      .filter((p) => p.completed)
      .map((p) => p.lessonId),
  )

  const byLevel: Record<Level, { total: number; completed: number }> = {
    beginner: { total: 0, completed: 0 },
    intermediate: { total: 0, completed: 0 },
    advanced: { total: 0, completed: 0 },
  }

  for (const l of lessons) {
    byLevel[l.level].total += 1
    if (completedIds.has(l.id)) byLevel[l.level].completed += 1
  }

  const points = userData?.stats.points ?? 0
  const streak = userData?.stats.streak.current ?? 0
  const badges = userData?.stats.badges ?? []

  const nextLesson = (() => {
    const progress = userData?.progress ?? {}
    return lessons.find((l) => !progress[l.id]?.completed) ?? lessons[0] ?? null
  })()

  let nextLessonTitle = '—'
  if (nextLesson) nextLessonTitle = language === 'en' ? nextLesson.topic.en : nextLesson.topic.hi

  const levels: Level[] = ['beginner', 'intermediate', 'advanced']

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
        <div className="relative flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold text-white/80">Overview</div>
            <div className="mt-1 text-2xl font-extrabold">Your learning dashboard</div>
            <div className="mt-1 text-sm font-semibold text-white/90">Track progress, points, streaks, and daily learning.</div>
          </div>
          <div className="glass rounded-3xl border border-white/20 p-4 shadow-2xl">
            <div className="rounded-2xl bg-white/70 px-4 py-3 text-slate-900 shadow-sm backdrop-blur dark:bg-slate-950/60 dark:text-slate-100">
              <div className="text-xs font-extrabold text-slate-600 dark:text-slate-300">Student</div>
              <div className="mt-1 text-sm font-black">{user?.name ?? 'Student'}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Student</div>
          <div className="mt-1 text-lg font-extrabold">{user?.name ?? 'Student'}</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{user?.email}</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t(language, 'common.points')}</div>
          <div className="mt-1 text-3xl font-extrabold">{points}</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">Earn points with quizzes and practice.</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t(language, 'common.streak')}</div>
          <div className="mt-1 text-3xl font-extrabold">{streak} 🔥</div>
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">Keep learning daily to grow your streak.</div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">Continue learning</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Pick up where you left off.</div>
          </div>
          {nextLesson ? <Pill>{nextLesson.level}</Pill> : null}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">Next lesson</div>
            <div className="mt-1 truncate text-lg font-extrabold">{nextLessonTitle}</div>
          </div>
          {nextLesson ? (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-center text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-100 dark:text-slate-900"
            >
              Continue
            </Link>
          ) : null}
        </div>
      </Card>

      {dailyWord ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-lg font-extrabold">Daily word</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Learn one useful word every day.</div>
            </div>
            <Pill>{dailyWord.word}</Pill>
          </div>
          <div className="mt-3 rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
            <div className="text-sm font-semibold">Meaning (Hindi): {dailyWord.meaningHi}</div>
            <div className="mt-2 text-sm font-semibold">{dailyWord.exampleEn}</div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{dailyWord.exampleHi}</div>
          </div>
        </Card>
      ) : null}

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">Lesson progress</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Complete practice + score ≥ 60% in quiz.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(badges.length ? badges : ['first_lesson']).slice(0, 6).map((b) => (
              <Pill key={b}>🏅 {b.replaceAll('_', ' ')}</Pill>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {levels.map((level) => {
            const total = byLevel[level].total
            const completed = byLevel[level].completed
            const pct = total ? Math.round((completed / total) * 100) : 0
            return (
              <div key={level} className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold">{levelLabel(level)}</div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {completed}/{total}
                  </div>
                </div>
                <ProgressBar value={pct} />
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-base font-extrabold">Learning history</div>
        <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">Your recent activity (latest first).</div>
        <div className="mt-3 grid max-h-64 gap-2 overflow-auto pr-1">
          {(userData?.history ?? []).slice(0, 10).map((e) => (
            <div key={e.id} className="grid gap-0.5 rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2 text-xs shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
              <div className="font-semibold">{e.type.replaceAll('_', ' ')}</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">{new Date(e.ts).toLocaleString()}</div>
            </div>
          ))}
          {userData?.history?.length ? null : (
            <div className="text-xs text-slate-600 dark:text-slate-400">Start a lesson to see your history here.</div>
          )}
        </div>
      </Card>
    </div>
  )
}

