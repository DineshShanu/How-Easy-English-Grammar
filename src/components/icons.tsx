import type React from 'react'

type Props = Readonly<{ className?: string; title?: string }>

function IconBase({ children, className, title }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className ?? 'h-5 w-5'}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export function IconHome(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </IconBase>
  )
}

export function IconBook(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M6 4h10a2 2 0 0 1 2 2v14" />
      <path d="M6 4a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h12" />
    </IconBase>
  )
}

export function IconQuiz(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M7 7h10" />
      <path d="M7 12h6" />
      <path d="M7 17h10" />
      <path d="M5 4h14a2 2 0 0 1 2 2v12a3 3 0 0 1-3 3H7a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2Z" />
    </IconBase>
  )
}

export function IconSpark(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M12 2l1.4 4.4L18 8l-4.6 1.6L12 14l-1.4-4.4L6 8l4.6-1.6L12 2Z" />
      <path d="M19 12l.8 2.5L22 15l-2.2.5L19 18l-.8-2.5L16 15l2.2-.5L19 12Z" />
    </IconBase>
  )
}

export function IconBookmark(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M7 4h10a1 1 0 0 1 1 1v17l-6-3-6 3V5a1 1 0 0 1 1-1Z" />
    </IconBase>
  )
}

export function IconSun(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M12 4V2" />
      <path d="M12 22v-2" />
      <path d="M4 12H2" />
      <path d="M22 12h-2" />
      <path d="M19.8 4.2 18.4 5.6" />
      <path d="M5.6 18.4 4.2 19.8" />
      <path d="M19.8 19.8 18.4 18.4" />
      <path d="M5.6 5.6 4.2 4.2" />
      <circle cx="12" cy="12" r="4" />
    </IconBase>
  )
}

export function IconMoon(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M21 13a7.5 7.5 0 1 1-10-10 6.5 6.5 0 0 0 10 10Z" />
    </IconBase>
  )
}

export function IconGlobe(props: Props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3.5 3 14 0 18" />
      <path d="M12 3c-3 3.5-3 14 0 18" />
    </IconBase>
  )
}

export function IconArrowUp(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </IconBase>
  )
}
