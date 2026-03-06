import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LESSONS } from '../data/lessons'
import type { Lesson as LessonType } from '../lib/types'
import { useAppState } from '../state/AppState'
import Illustration from '../components/Illustration'
import { Button, Card, Input, Pill, ProgressBar, SecondaryButton } from '../components/ui'
import { getYoutubeVideoIdForIllustrationKey } from '../lib/youtube'

type ChoiceState = Record<string, number>

type Guide = {
  titleEn: string
  titleHi: string
  bulletsEn: string[]
  bulletsHi: string[]
}

function buildGuide(lesson: LessonType): Guide {
  const base: Guide = {
    titleEn: 'Learning guide',
    titleHi: 'सीखने का गाइड',
    bulletsEn: [],
    bulletsHi: [],
  }

  if (lesson.level === 'beginner') {
    base.bulletsEn.push(
      'Learn the pattern first, then change only one word at a time.',
      'Speak the 5 examples aloud twice to build rhythm.',
      'Do the practice slowly; accuracy matters more than speed.',
    )
    base.bulletsHi.push(
      'पहले पैटर्न समझें, फिर एक-एक शब्द बदलकर अभ्यास करें।',
      '5 उदाहरणों को दो बार ज़ोर से बोलें—रिदम बनेगा।',
      'प्रैक्टिस धीरे करें; स्पीड से ज़्यादा सही होना ज़रूरी है।',
    )
  } else if (lesson.level === 'intermediate') {
    base.bulletsEn.push(
      'Focus on meaning + form: ask “why this tense/article?”',
      'Notice common mistakes and fix them in your own sentences.',
      'After practice, write 3 original sentences using the same rule.',
    )
    base.bulletsHi.push(
      'meaning + form दोनों देखें: “यह tense/article क्यों?” पूछें।',
      'common mistakes पकड़ें और अपने वाक्यों में सुधार करें।',
      'प्रैक्टिस के बाद उसी rule से 3 अपने वाक्य लिखें।',
    )
  } else {
    base.bulletsEn.push(
      'Aim for precision: check clause boundaries and connectors.',
      'Rewrite one example in 2 different ways without changing meaning.',
      'Use the quiz to identify weak spots, then redo practice once.',
    )
    base.bulletsHi.push(
      'precision पर ध्यान दें: clauses और connectors साफ़ रखें।',
      'एक example को meaning बदले बिना 2 तरीकों से rewrite करें।',
      'quiz से weak spots पहचानें, फिर प्रैक्टिस एक बार दोहराएँ।',
    )
  }

  switch (lesson.illustrationKey) {
    case 'articles':
      base.bulletsEn.push('Quick check: “a/an” = new/one of many; “the” = specific/known.')
      base.bulletsHi.push('Quick check: “a/an” = नया/कई में से एक; “the” = specific/पहले से known।')
      break
    case 'present-simple':
      base.bulletsEn.push('Habit rule: add “-s/-es” with he/she/it in affirmative sentences.')
      base.bulletsHi.push('Habit rule: affirmative में he/she/it के साथ “-s/-es” लगाएँ।')
      break
    case 'past-simple':
      base.bulletsEn.push('Past rule: use V2 for affirmative; use “did + V1” for negative/questions.')
      base.bulletsHi.push('Past rule: affirmative में V2; negative/questions में “did + V1”।')
      break
    case 'future-simple':
      base.bulletsEn.push('Future rule: “will + V1” for decisions/predictions; keep verb base form.')
      base.bulletsHi.push('Future rule: decisions/predictions के लिए “will + V1”; verb base form रखें।')
      break
    case 'reported-speech':
      base.bulletsEn.push('Reported speech: keep meaning; adjust pronouns/time words when needed.')
      base.bulletsHi.push('Reported speech: meaning same रखें; जरूरत पर pronouns/time words बदलें।')
      break
    case 'conditionals':
      base.bulletsEn.push('Conditionals: separate the “if” clause from the result clause; check tense pairing.')
      base.bulletsHi.push('Conditionals: “if” clause और result clause अलग रखें; tense pairing जाँचें।')
      break
    default:
      break
  }

  return base
}

export default function Lesson() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { language, userData, actions } = useAppState()
  const lessons: LessonType[] = LESSONS

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [lessonId])

  const lesson = useMemo(() => lessons.find((l) => l.id === lessonId) ?? null, [lessonId, lessons])
  const nav = useMemo(() => {
    const idx = lessons.findIndex((l) => l.id === lessonId)
    const prev = idx > 0 ? lessons[idx - 1] : null
    const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null
    return { idx, prev, next }
  }, [lessonId, lessons])

  const prevId = nav.prev?.id ?? null
  const nextId = nav.next?.id ?? null

  const progress = lessonId && userData ? userData.progress[lessonId] : undefined

  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({})
  const [practiceChecked, setPracticeChecked] = useState(false)
  const [quizChoices, setQuizChoices] = useState<ChoiceState>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  useEffect(() => {
    if (lesson?.id) actions.visitLesson(lesson.id)
  }, [actions, lesson?.id])

  useEffect(() => {
    // Clear local UI state when moving between lessons
    setPracticeAnswers({})
    setPracticeChecked(false)
    setQuizChoices({})
    setQuizSubmitted(false)
  }, [lesson?.id])

  if (!lesson) {
    return (
      <Card>
        <div className="text-lg font-extrabold">Lesson not found</div>
        <Link to="/lessons" className="mt-3 inline-block text-sm font-semibold underline">
          Back to lessons
        </Link>
      </Card>
    )
  }

  const youtubeQuery = `English grammar ${lesson.topic.en}`.trim()
  const youtubeVideoId = getYoutubeVideoIdForIllustrationKey(lesson.illustrationKey)

  const youtubeOpenUrl = youtubeVideoId
    ? `https://youtu.be/${encodeURIComponent(youtubeVideoId)}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery || 'English grammar lessons')}`

  const youtubeThumbnailUrl = youtubeVideoId
    ? `https://i.ytimg.com/vi/${encodeURIComponent(youtubeVideoId)}/hqdefault.jpg`
    : null

  const effectiveProgress = {
    practiceCompleted: progress?.practiceCompleted ?? false,
    quizBestScore: progress?.quizBestScore ?? 0,
    completed: progress?.completed ?? false,
  }

  const pct = (() => {
    if (effectiveProgress.completed) return 100
    const practiceBonus = effectiveProgress.practiceCompleted ? 20 : 0
    return Math.min(80, effectiveProgress.quizBestScore + practiceBonus)
  })()

  const setChoice = (questionId: string, optionIndex: number) => {
    setQuizChoices((s) => ({ ...s, [questionId]: optionIndex }))
  }

  const optionClassName = (args: { selected: boolean; correct: boolean; wrongSelected: boolean }) => {
    if (args.correct) return 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-100'
    if (args.wrongSelected) return 'border-rose-500 bg-rose-50 text-rose-900 dark:border-rose-400 dark:bg-rose-950/40 dark:text-rose-100'
    if (args.selected) return 'border-slate-900 bg-slate-50 dark:border-slate-100 dark:bg-slate-900'
    return 'border-slate-200/80 bg-white/80 hover:bg-slate-50 dark:border-slate-800/80 dark:bg-slate-950/60 dark:hover:bg-slate-900/60'
  }

  const quizTotal = lesson.quiz.length
  const quizScore = lesson.quiz.reduce((acc, q) => {
    const chosen = quizChoices[q.id]
    return acc + (quizSubmitted && chosen === q.correctIndex ? 1 : 0)
  }, 0)

  const guide = buildGuide(lesson)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="grid gap-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <SecondaryButton
              onClick={() => {
                navigate('/lessons')
              }}
            >
              Back
            </SecondaryButton>
            <SecondaryButton onClick={() => navigate('/lessons')}>All lessons</SecondaryButton>
          </div>
        </div>

        <Card className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-white/10">
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Pill>{lesson.level}</Pill>
              <Pill>EN/HI</Pill>
              {effectiveProgress.completed ? <Pill>✅ Completed</Pill> : null}
            </div>
            <h1 className="text-3xl font-black tracking-tight">{language === 'en' ? lesson.topic.en : lesson.topic.hi}</h1>
            <p className="whitespace-pre-line text-white/90">{language === 'en' ? lesson.explanation.en : lesson.explanation.hi}</p>
          </div>
        </Card>

        <Card className="p-5">
        <div className="text-sm font-semibold">{guide.titleEn}</div>
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">{guide.titleHi}</div>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
            {guide.bulletsEn.map((b: string) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            {guide.bulletsHi.map((b: string) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="text-lg font-extrabold">Examples (5)</div>
        <div className="mt-3 grid gap-2">
          {lesson.examples.slice(0, 5).map((ex) => (
            <div key={`${lesson.id}:${ex.en}:${ex.hi}`} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
              <div className="text-sm font-semibold">{ex.en}</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{ex.hi}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">Practice</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Type the correct answer and check.</div>
          </div>
          {effectiveProgress.practiceCompleted ? <Pill>✅ Completed</Pill> : null}
        </div>

        <div className="mt-4 grid gap-3">
          {lesson.practice.map((p) => (
            <div key={p.id} className="grid gap-2 rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
              <div className="text-sm font-semibold">{language === 'en' ? p.promptEn : p.promptHi}</div>
              <Input
                label={language === 'en' ? 'Your answer' : 'आपका उत्तर'}
                value={practiceAnswers[p.id] ?? ''}
                onChange={(v) => setPracticeAnswers((s) => ({ ...s, [p.id]: v }))}
                placeholder={language === 'en' ? 'Type here...' : 'यहाँ लिखें...'}
              />
              {practiceChecked ? (
                <div className="text-sm font-semibold">
                  {String((practiceAnswers[p.id] ?? '').trim().toLowerCase()) === p.answer.trim().toLowerCase() ? (
                    <span className="text-emerald-600 dark:text-emerald-400">Correct</span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400">Correct answer: {p.answer}</span>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <SecondaryButton onClick={() => setPracticeChecked(true)}>Check</SecondaryButton>
          <Button
            onClick={() => {
              setPracticeChecked(true)
              const allCorrect = lesson.practice.every(
                (p) => String((practiceAnswers[p.id] ?? '').trim().toLowerCase()) === p.answer.trim().toLowerCase(),
              )
              if (allCorrect) actions.completePractice(lesson.id)
            }}
          >
            Mark practice complete
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold">Quiz</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Choose the best answer and submit.</div>
          </div>
          <Pill>Best: {effectiveProgress.quizBestScore}%</Pill>
        </div>

        <div className="mt-4 grid gap-4">
          {lesson.quiz.map((q, idx) => {
            const choice = quizChoices[q.id]
            const options = language === 'en' ? q.optionsEn : q.optionsHi
            return (
              <div key={q.id} className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
                <div className="text-sm font-extrabold">
                  {idx + 1}. {language === 'en' ? q.questionEn : q.questionHi}
                </div>
                <div className="mt-3 grid gap-2">
                  {options.map((opt, i) => {
                    const selected = choice === i
                    const correct = quizSubmitted && i === q.correctIndex
                    const wrongSelected = quizSubmitted && selected && i !== q.correctIndex
                    return (
                      <button
                        key={`${q.id}:${opt}`}
                        type="button"
                        onClick={() => setChoice(q.id, i)}
                        className={
                          'w-full rounded-2xl border px-3 py-2 text-left text-sm font-semibold transition ' +
                          optionClassName({ selected, correct, wrongSelected })
                        }
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
                {quizSubmitted ? (
                  <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    {language === 'en' ? q.explanationEn : q.explanationHi}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {quizSubmitted ? `Score: ${quizScore}/${quizTotal}` : `Questions: ${quizTotal}`}
          </div>
          <div className="flex gap-2">
            <SecondaryButton onClick={() => {
              setQuizChoices({})
              setQuizSubmitted(false)
            }}>
              Reset
            </SecondaryButton>
            <Button
              onClick={() => {
                setQuizSubmitted(true)
                const score = lesson.quiz.reduce((acc, q) => acc + ((quizChoices[q.id] ?? -1) === q.correctIndex ? 1 : 0), 0)
                actions.submitQuiz(lesson.id, score, quizTotal)
              }}
            >
              Submit quiz
            </Button>
          </div>
        </div>
      </Card>
      </div>

      <aside className="grid gap-3 lg:sticky lg:top-24">
        <Card className="p-4">
          <Illustration illustrationKey={lesson.illustrationKey} level={lesson.level} lessonNumber={nav.idx >= 0 ? nav.idx + 1 : undefined} className="mb-3" />

          <div className="mb-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">YouTube</div>
              <a
                className="text-xs font-semibold underline"
                href={youtubeOpenUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            </div>
            <div className="mt-2 aspect-video overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-800/80 dark:bg-slate-950/60">
              {youtubeThumbnailUrl ? (
                <a
                  href={youtubeOpenUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block h-full w-full"
                  aria-label={`Open YouTube video: ${lesson.topic.en}`}
                >
                  <img
                    src={youtubeThumbnailUrl}
                    alt={lesson.topic.en}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/40">
                    <div className="rounded-2xl bg-white/90 px-3 py-1 text-xs font-extrabold text-slate-900">
                      Play on YouTube
                    </div>
                  </div>
                </a>
              ) : (
                <div className="grid h-full place-items-center p-3 text-center">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Open on YouTube to watch this topic.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Lesson progress</span>
              <span>{pct}%</span>
            </div>
            <ProgressBar value={pct} />
          </div>

          <div className="mt-4 grid gap-2">
            {prevId ? <SecondaryButton onClick={() => navigate(`/lessons/${prevId}`)}>Prev lesson</SecondaryButton> : null}
            {nextId ? <SecondaryButton onClick={() => navigate(`/lessons/${nextId}`)}>Next lesson</SecondaryButton> : null}
            <SecondaryButton onClick={() => navigate('/lessons')}>Back to catalog</SecondaryButton>
          </div>
        </Card>
      </aside>
    </div>
  )
}
