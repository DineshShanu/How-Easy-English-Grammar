import type { LocalDateString } from './types'

export function pickDailyIndex(date: LocalDateString, length: number): number {
  if (length <= 0) return 0
  const seed = Number.parseInt(date.replaceAll('-', ''), 10)
  return seed % length
}
