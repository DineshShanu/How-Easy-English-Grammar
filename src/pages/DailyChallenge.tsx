import { useMemo, useState } from 'react'
import { LESSONS } from '../data/lessons'
import type { Lesson } from '../lib/types'
import { toLocalDateString } from '../lib/date'
import { Button, Card, Pill, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'

export default function DailyChallenge() {
  const { userData, actions, language } = useAppState()
  const lessons: Lesson[] = LESSONS
  const today = toLocalDateString()

  const alreadyDone = userData?.stats.dailyChallenge.lastCompletedDate === today
  const [submitted, setSubmitted] = useState(false)
  const [choice, setChoice] = useState<number | null>(null)

  const challenge = useMemo(() => {
    if (!lessons.length) return null
    const seed = Number.parseInt(today.replaceAll('-', ''), 10)
    const pick = lessons[seed % lessons.length]
    const q = pick.quiz[seed % pick.quiz.length]
    return { lesson: pick, question: q }
  }, [lessons, today])

  if (!challenge) return null

  const q = challenge.question
  const options = language === 'en' ? q.optionsEn : q.optionsHi
  const correct = submitted && choice === q.correctIndex

  const optionClassName = (args: { isCorrect: boolean; isWrongSelected: boolean; isSelected: boolean }) => {
    if (args.isCorrect) return 'border-emerald-500 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/40'
    if (args.isWrongSelected) return 'border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-950/40'
    if (args.isSelected) return 'border-slate-900 bg-slate-50 dark:border-slate-100 dark:bg-slate-900'
    return 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900'
  }

  const handleReset = () => {
    setChoice(null)
    setSubmitted(false)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    if (choice === q.correctIndex && !alreadyDone) actions.completeDailyChallenge()
  }

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-lg font-extrabold">Daily challenge</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Complete one question per day to build a streak.</div>
          </div>
          <Pill>{today}</Pill>
        </div>
      </Card>

      <Card>
        <div className="text-sm font-extrabold">{language === 'en' ? q.questionEn : q.questionHi}</div>
        <div className="mt-3 grid gap-2">
          {options.map((o, i) => (
            <button
              key={`${q.id}:${i}:${o}`}
              type="button"
              onClick={() => setChoice(i)}
              className={
                'w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold ' +
                optionClassName({
                  isCorrect: submitted && i === q.correctIndex,
                  isWrongSelected: submitted && choice === i && i !== q.correctIndex,
                  isSelected: choice === i,
                })
              }
            >
              {o}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-slate-600 dark:text-slate-400">Topic: {language === 'en' ? challenge.lesson.topic.en : challenge.lesson.topic.hi}</div>
          <div className="flex gap-2">
            <SecondaryButton onClick={handleReset}>Reset</SecondaryButton>
            <Button
              disabled={alreadyDone || choice === null}
              onClick={handleSubmit}
            >
              {alreadyDone ? 'Completed today' : 'Submit'}
            </Button>
          </div>
        </div>

        {submitted ? (
          <div className={"mt-4 text-sm font-semibold " + (correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
            {correct ? 'Correct! +15 points' : 'Try again tomorrow (or reset and retry).'}
          </div>
        ) : null}
      </Card>
    </div>
  )
}
