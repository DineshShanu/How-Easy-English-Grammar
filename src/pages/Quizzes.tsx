import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LESSONS } from '../data/lessons'
import type { Lesson, Level } from '../lib/types'
import { Button, Card, Pill, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'

export default function Quizzes() {
  const lessons: Lesson[] = LESSONS
  const { language } = useAppState()
  const [level, setLevel] = useState<Level>('beginner')
  const [lessonId, setLessonId] = useState<string | null>(null)

  const levels: Level[] = ['beginner', 'intermediate', 'advanced']

  const pool = useMemo(() => lessons.filter((l) => l.level === level), [lessons, level])
  const current = useMemo(() => (lessonId ? lessons.find((l) => l.id === lessonId) ?? null : null), [lessonId, lessons])

  return (
    <div className="grid gap-6">
      <Card className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-white/10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">Grammar quizzes</div>
            <div className="text-sm text-white/90">Pick a level and practice with quick quizzes.</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <SecondaryButton
                key={l}
                onClick={() => setLevel(l)}
                className={
                  (l === level ? 'border-white/60' : 'border-white/30') +
                  ' bg-white/10 text-white hover:bg-white/15'
                }
              >
                {l}
              </SecondaryButton>
            ))}
            <Button
              onClick={() => {
                if (!pool.length) {
                  setLessonId(null)
                  return
                }
                const pick = pool[Math.floor(Math.random() * pool.length)]
                setLessonId(pick.id)
              }}
              className="bg-white text-slate-900 hover:bg-white/90 shadow-white/20"
            >
              Random quiz
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-extrabold">Quiz list</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {pool.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLessonId(l.id)}
              className="lesson-card rounded-3xl border border-slate-200/80 bg-white/80 p-5 text-left shadow-sm backdrop-blur transition duration-300 hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-950/60 dark:hover:bg-slate-900/60"
            >
              <div className="text-sm font-extrabold">{language === 'en' ? l.topic.en : l.topic.hi}</div>
              <div className="mt-2 flex gap-2">
                <Pill>{l.level}</Pill>
                <Pill>{l.quiz.length} Q</Pill>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {current ? (
        <Card>
          <div className="text-lg font-extrabold">Selected quiz</div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Open this topic to take the full interactive quiz.</div>
          <Link
            to={`/lessons/${current.id}`}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-100 dark:text-slate-900"
          >
            Go to lesson quiz
          </Link>
        </Card>
      ) : null}
    </div>
  )
}
