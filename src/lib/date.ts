import type { LocalDateString } from './types'

export function toLocalDateString(ts: number = Date.now()): LocalDateString {
  const d = new Date(ts)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}` as LocalDateString
}

export function isYesterday(a: LocalDateString, b: LocalDateString): boolean {
  const da = new Date(`${a}T00:00:00`)
  const db = new Date(`${b}T00:00:00`)
  const diffDays = Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays === 1
}
