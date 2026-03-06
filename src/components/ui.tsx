import React from 'react'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={cx(
        'rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur',
        'transition-shadow duration-300 hover:shadow-md',
        'dark:border-slate-800/80 dark:bg-slate-950/80',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Button({
  children,
  className,
  type,
  onClick,
  disabled,
}: Readonly<{
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}>) {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-extrabold',
        'bg-slate-900 text-white shadow-lg shadow-slate-900/15',
        'transition hover:scale-[1.02] hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100',
        'dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:shadow-slate-950/30',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({
  children,
  className,
  type,
  onClick,
}: Readonly<{
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}>) {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-extrabold',
        'border border-slate-200/80 bg-white/80 text-slate-900 shadow-sm backdrop-blur',
        'transition hover:bg-slate-50 hover:shadow-md active:scale-[0.98]',
        'dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-100 dark:hover:bg-slate-900/70',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function Input({
  label,
  value,
  onChange,
  type,
  placeholder,
  name,
}: {
  readonly label: string
  readonly value: string
  readonly onChange: (v: string) => void
  readonly type?: string
  readonly placeholder?: string
  readonly name?: string
}) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type ?? 'text'}
        placeholder={placeholder}
        className={cx(
          'w-full rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2 backdrop-blur',
          'text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-indigo-400',
        )}
      />
    </label>
  )
}

export function ProgressBar({ value }: Readonly<{ value: number }>) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
      <div
        className="progress-bar h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ width: `${v}%` }}
      />
    </div>
  )
}

export function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-xs font-bold text-slate-700 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-200">
      {children}
    </span>
  )
}
