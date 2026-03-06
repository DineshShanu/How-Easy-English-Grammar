import blogData from '../data/blog.json'
import { Card, Pill } from '../components/ui'

type Post = { id: string; title: string; summary: string; level: string }

export default function Blog() {
  const posts: Post[] = blogData
  return (
    <div className="grid gap-6">
      <Card>
        <div className="text-lg font-extrabold">Grammar blog</div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Short, friendly explanations and tips.</div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.id} className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-extrabold">{p.title}</div>
              <Pill>{p.level}</Pill>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{p.summary}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
