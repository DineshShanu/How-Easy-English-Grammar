import worksheetsData from '../data/worksheets.json'
import { Button, Card, Pill } from '../components/ui'

type Worksheet = { id: string; title: string; level: string; content: string }

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Worksheets() {
  const sheets: Worksheet[] = worksheetsData

  return (
    <div className="grid gap-6">
      <Card>
        <div className="text-lg font-extrabold">Downloadable worksheets</div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Download simple practice sheets (text format).</div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {sheets.map((s) => (
          <Card key={s.id} className="grid gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-extrabold">{s.title}</div>
              <Pill>{s.level}</Pill>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 line-clamp-4">{s.content}</div>
            <Button onClick={() => downloadText(`${s.title}.txt`, s.content)}>Download</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
