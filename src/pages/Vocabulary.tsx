import vocabularyData from '../data/vocabulary.json'
import { Card, Pill, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'
import { toLocalDateString } from '../lib/date'
import { pickDailyIndex } from '../lib/daily'

type WordItem = { id: string; word: string; meaningHi: string; exampleEn: string; exampleHi: string }

export default function Vocabulary() {
  const { language } = useAppState()
  const words: WordItem[] = vocabularyData
  const dailyWord = words[pickDailyIndex(toLocalDateString(), words.length)]

  return (
    <div className="grid gap-6">
      <Card>
        <div className="text-lg font-extrabold">Vocabulary builder</div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Build word power with simple, daily-use words and examples.
        </div>
      </Card>

      {dailyWord ? (
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-sm font-extrabold">Daily word</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{dailyWord.word} • {dailyWord.meaningHi}</div>
            </div>
            <Pill>Today</Pill>
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="font-semibold">{dailyWord.exampleEn}</div>
            <div className="mt-1 text-slate-600 dark:text-slate-400">{dailyWord.exampleHi}</div>
          </div>
        </Card>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {words.map((w) => (
          <Card key={w.id} className="grid gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="text-lg font-extrabold">{w.word}</div>
              <Pill>Word</Pill>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              {language === 'en' ? 'Meaning (Hindi): ' : 'अर्थ: '} <span className="font-semibold">{w.meaningHi}</span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="font-semibold">{w.exampleEn}</div>
              <div className="mt-1 text-slate-600 dark:text-slate-400">{w.exampleHi}</div>
            </div>
            <SecondaryButton>Mark as learned</SecondaryButton>
          </Card>
        ))}
      </div>
    </div>
  )
}
