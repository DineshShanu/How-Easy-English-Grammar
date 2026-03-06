import { Card, Pill } from '../components/ui'

const TIPS = [
  {
    id: 'tip-1',
    title: 'Use simple sentences first',
    body: 'Start with Subject + Verb + Object. Then add adjectives/adverbs.',
    hi: 'पहले सरल वाक्य बनाएं: कर्ता + क्रिया + कर्म। फिर विशेषण/क्रिया-विशेषण जोड़ें।',
  },
  {
    id: 'tip-2',
    title: 'Tense = time + verb form',
    body: 'Focus on verb forms and time words (yesterday, now, tomorrow).',
    hi: 'काल = समय + क्रिया का रूप। समय वाले शब्दों पर ध्यान दें।',
  },
  {
    id: 'tip-3',
    title: 'Read aloud for rhythm',
    body: 'Reading aloud helps you catch mistakes in agreement and punctuation.',
    hi: 'जोर से पढ़ने से agreement और punctuation की गलतियाँ पकड़ में आती हैं।',
  },
]

export default function Tips() {
  return (
    <div className="grid gap-6">
      <Card>
        <div className="text-lg font-extrabold">Grammar tips</div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Quick tips to learn faster.</div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {TIPS.map((t) => (
          <Card key={t.id} className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-extrabold">{t.title}</div>
              <Pill>Tip</Pill>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300">{t.body}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{t.hi}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
