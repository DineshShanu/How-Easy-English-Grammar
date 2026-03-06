import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSONS } from '../data/lessons'
import { Button, Card, Pill, ProgressBar, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'

export default function Home() {
  const { user, userData, language } = useAppState()
  const navigate = useNavigate()

  const lessons = LESSONS

  const stats = useMemo(() => {
    const points = userData?.stats.points ?? 0
    const streak = userData?.stats.streak.current ?? 0
    const badges = userData?.stats.badges ?? []
    return { points, streak, badgeCount: badges.length }
  }, [userData])

  const overall = useMemo(() => {
    if (!userData) return { pct: 0, nextId: lessons[0]?.id ?? null }
    const progress = userData.progress ?? {}
    const completed = Object.values(progress).filter((p) => p.completed).length
    const total = lessons.length || 1
    const pct = Math.round((completed / total) * 100)

    const next = lessons.find((l) => !progress[l.id]?.completed) ?? lessons[0]
    return { pct, nextId: next?.id ?? null }
  }, [lessons, userData])

  const nextLesson = useMemo(() => {
    if (!overall.nextId) return null
    return lessons.find((l) => l.id === overall.nextId) ?? null
  }, [lessons, overall.nextId])

  const nextLessonTitle = useMemo(() => {
    if (!nextLesson) return '—'
    return language === 'en' ? nextLesson.topic.en : nextLesson.topic.hi
  }, [language, nextLesson])

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-xl md:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9), transparent 55%)' }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div className="grid gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold text-white/95 backdrop-blur">
              Modern EdTech • Micro-interactions • Dark mode
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">How-Easy English Grammar</h1>
            <p className="max-w-xl text-sm font-semibold text-white/90 md:text-base">
              Learn English Grammar from Beginner to Advanced — with bilingual explanations (English + Hindi), interactive practice,
              quizzes, and progress tracking.
            </p>

            <div className="flex flex-wrap gap-3">
              {user ? (
                <Button
                  onClick={() => navigate('/lessons')}
                  className="!bg-white !text-slate-900 hover:!bg-white/90 shadow-white/20"
                >
                  Explore lessons →
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/lessons')}
                  className="!bg-white !text-slate-900 hover:!bg-white/90 shadow-white/20"
                >
                  Explore lessons →
                </Button>
              )}
              <SecondaryButton
                onClick={() => navigate(user ? '/dashboard' : '/signup')}
                className="!border-white/30 !bg-white/15 !text-white hover:!bg-white/20"
              >
                View dashboard
              </SecondaryButton>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="glass rounded-2xl border border-white/15 p-4 shadow-sm">
                <div className="text-xs font-extrabold text-white/80">XP</div>
                <div className="mt-1 text-2xl font-black">+{stats.points}</div>
              </div>
              <div className="glass rounded-2xl border border-white/15 p-4 shadow-sm">
                <div className="text-xs font-extrabold text-white/80">Streak</div>
                <div className="mt-1 text-2xl font-black">{stats.streak} days</div>
              </div>
              <div className="glass rounded-2xl border border-white/15 p-4 shadow-sm">
                <div className="text-xs font-extrabold text-white/80">Badges</div>
                <div className="mt-1 text-2xl font-black">{stats.badgeCount}</div>
              </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="rounded-3xl bg-slate-900/60 p-4 shadow-2xl shadow-slate-900/30 backdrop-blur dark:bg-slate-950/70 md:p-5">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 dark:bg-slate-950/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-white/70">Today's goal</div>
                    <div className="mt-2 text-lg font-black text-white">Finish 1 lesson + 1 quiz</div>
                    <div className="mt-1 text-sm font-semibold text-white/80">Earn XP, keep your streak, unlock badges.</div>
                  </div>
                  <Pill>Achievement</Pill>
                </div>

                <div className="mt-5 grid gap-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-extrabold text-white/70">
                      <span>Course completion</span>
                      <span>{overall.pct}%</span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={overall.pct} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <div className="text-xs font-extrabold text-white/70">Next up</div>
                      <div className="text-sm font-black text-white">
                        {nextLessonTitle}
                      </div>
                    </div>
                    <div className="text-xs font-extrabold text-white/80">+20 XP</div>
                  </div>

                  <Button
                    onClick={() => navigate(nextLesson ? `/lessons/${nextLesson.id}` : '/lessons')}
                    className="w-full !bg-white !text-slate-900 hover:!bg-white/90 shadow-white/20"
                  >
                    Continue ▶
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="dark:bg-slate-950/70">
          <div className="text-sm font-extrabold">Beginner → Advanced</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Structured lessons with 5 examples each.</p>
        </Card>
        <Card className="dark:bg-slate-950/70">
          <div className="text-sm font-extrabold">Practice + Quiz</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Fill-in practice and instant feedback quizzes.</p>
        </Card>
        <Card className="dark:bg-slate-950/70">
          <div className="text-sm font-extrabold">Daily Challenge</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Build learning streaks with daily tasks.</p>
        </Card>
      </div>
    </div>
  )
}
