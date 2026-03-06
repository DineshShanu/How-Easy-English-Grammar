import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { toLocalDateString, isYesterday } from '../lib/date'
import { loadState, saveState } from '../lib/storage'
import type {
  AppState,
  BadgeKey,
  HistoryEventType,
  Language,
  LessonProgress,
  LocalDateString,
  ThemeMode,
  User,
  UserData,
} from '../lib/types'

function id(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function emptyUserData(): UserData {
  return {
    progress: {},
    bookmarks: [],
    history: [],
    stats: {
      points: 0,
      badges: [],
      streak: { current: 0, best: 0, lastActiveDate: null },
      dailyChallenge: { lastCompletedDate: null },
    },
  }
}

const DEFAULT_STATE: AppState = {
  users: [],
  session: { userId: null },
  preferences: { language: 'en', theme: 'light' },
  userDataByUserId: {},
}

type Action =
  | { type: 'PREFERENCES_LANGUAGE_SET'; language: Language }
  | { type: 'PREFERENCES_THEME_SET'; theme: ThemeMode }
  | { type: 'SIGNUP'; name: string; email: string; password: string }
  | { type: 'LOGIN'; email: string; password: string }
  | { type: 'LOGOUT' }
  | { type: 'BOOKMARK_TOGGLE'; lessonId: string }
  | { type: 'LESSON_VISIT'; lessonId: string }
  | { type: 'PRACTICE_COMPLETE'; lessonId: string; points: number }
  | { type: 'QUIZ_SUBMIT'; lessonId: string; score: number; total: number; points: number }
  | { type: 'DAILY_CHALLENGE_COMPLETE'; points: number }

function ensureLessonProgress(userData: UserData, lessonId: string): LessonProgress {
  const existing = userData.progress[lessonId]
  if (existing) return existing
  const created: LessonProgress = {
    lessonId,
    practiceCompleted: false,
    quizBestScore: 0,
    completed: false,
    lastVisitedAt: null,
  }
  userData.progress[lessonId] = created
  return created
}

function grantBadge(userData: UserData, badge: BadgeKey): void {
  if (!userData.stats.badges.includes(badge)) userData.stats.badges.push(badge)
}

function touchStreak(userData: UserData, today: LocalDateString): void {
  const last = userData.stats.streak.lastActiveDate
  if (!last) {
    userData.stats.streak.current = 1
    userData.stats.streak.best = Math.max(userData.stats.streak.best, 1)
    userData.stats.streak.lastActiveDate = today
    return
  }
  if (last === today) return
  if (isYesterday(last, today)) {
    userData.stats.streak.current += 1
  } else {
    userData.stats.streak.current = 1
  }
  userData.stats.streak.best = Math.max(userData.stats.streak.best, userData.stats.streak.current)
  userData.stats.streak.lastActiveDate = today
}

type HistoryMeta = Record<string, string | number | boolean>

function addHistory(userData: UserData, type: HistoryEventType, lessonId?: string, meta?: HistoryMeta): void {
  userData.history.unshift({ id: id(), type, ts: Date.now(), lessonId, meta })
  userData.history = userData.history.slice(0, 50)
}

function reduceSignup(state: AppState, next: AppState, action: Extract<Action, { type: 'SIGNUP' }>): AppState {
  const email = action.email.trim().toLowerCase()
  if (next.users.some((u) => u.email.toLowerCase() === email)) return state
  const user: User = { id: id(), name: action.name.trim() || 'Student', email, password: action.password, createdAt: Date.now() }
  next.users.push(user)
  next.session.userId = user.id
  next.userDataByUserId[user.id] = emptyUserData()
  addHistory(next.userDataByUserId[user.id], 'signup')
  return next
}

function reduceLogin(state: AppState, next: AppState, action: Extract<Action, { type: 'LOGIN' }>): AppState {
  const email = action.email.trim().toLowerCase()
  const user = next.users.find((u) => u.email.toLowerCase() === email && u.password === action.password)
  if (!user) return state
  next.session.userId = user.id
  next.userDataByUserId[user.id] = next.userDataByUserId[user.id] ?? emptyUserData()
  addHistory(next.userDataByUserId[user.id], 'login')
  return next
}

function reduceLogout(next: AppState, userData: UserData | null): AppState {
  if (userData) addHistory(userData, 'logout')
  next.session.userId = null
  return next
}

function reduceBookmarkToggle(state: AppState, next: AppState, userData: UserData | null, action: Extract<Action, { type: 'BOOKMARK_TOGGLE' }>): AppState {
  if (!userData) return state
  const idx = userData.bookmarks.indexOf(action.lessonId)
  if (idx >= 0) {
    userData.bookmarks.splice(idx, 1)
    addHistory(userData, 'bookmark_remove', action.lessonId)
  } else {
    userData.bookmarks.unshift(action.lessonId)
    addHistory(userData, 'bookmark_add', action.lessonId)
  }
  return next
}

function reduceLessonVisit(state: AppState, next: AppState, userData: UserData | null, action: Extract<Action, { type: 'LESSON_VISIT' }>): AppState {
  if (!userData) return state
  const p = ensureLessonProgress(userData, action.lessonId)
  p.lastVisitedAt = Date.now()
  addHistory(userData, 'lesson_view', action.lessonId)
  return next
}

function reducePracticeComplete(state: AppState, next: AppState, userData: UserData | null, action: Extract<Action, { type: 'PRACTICE_COMPLETE' }>): AppState {
  if (!userData) return state
  const today = toLocalDateString()
  touchStreak(userData, today)

  const p = ensureLessonProgress(userData, action.lessonId)
  p.practiceCompleted = true
  userData.stats.points += action.points
  addHistory(userData, 'practice_complete', action.lessonId, { points: action.points })

  if (p.practiceCompleted && p.quizBestScore >= 60) p.completed = true
  if (p.completed) grantBadge(userData, 'first_lesson')

  return next
}

function applyThresholdBadges(userData: UserData): void {
  if (userData.stats.streak.current >= 3) grantBadge(userData, 'streak_3')
  if (userData.stats.streak.current >= 7) grantBadge(userData, 'streak_7')
  if (userData.stats.points >= 100) grantBadge(userData, 'points_100')
  if (userData.stats.points >= 500) grantBadge(userData, 'points_500')
}

function reduceQuizSubmit(state: AppState, next: AppState, userData: UserData | null, action: Extract<Action, { type: 'QUIZ_SUBMIT' }>): AppState {
  if (!userData) return state
  const today = toLocalDateString()
  touchStreak(userData, today)

  const p = ensureLessonProgress(userData, action.lessonId)
  const pct = Math.round((action.score / Math.max(1, action.total)) * 100)
  p.quizBestScore = Math.max(p.quizBestScore, pct)
  userData.stats.points += action.points
  addHistory(userData, 'quiz_submit', action.lessonId, { score: action.score, total: action.total, pct, points: action.points })

  grantBadge(userData, 'first_quiz')
  if (p.practiceCompleted && p.quizBestScore >= 60) {
    p.completed = true
    addHistory(userData, 'lesson_complete', action.lessonId)
    grantBadge(userData, 'first_lesson')
  }

  applyThresholdBadges(userData)
  return next
}

function reduceDailyChallengeComplete(state: AppState, next: AppState, userData: UserData | null, action: Extract<Action, { type: 'DAILY_CHALLENGE_COMPLETE' }>): AppState {
  if (!userData) return state
  const today = toLocalDateString()
  if (userData.stats.dailyChallenge.lastCompletedDate === today) return state

  touchStreak(userData, today)
  userData.stats.dailyChallenge.lastCompletedDate = today
  userData.stats.points += action.points
  addHistory(userData, 'daily_challenge_complete', undefined, { points: action.points })

  applyThresholdBadges(userData)
  return next
}

function reducer(state: AppState, action: Action): AppState {
  const next: AppState = structuredClone(state)

  const userId = next.session.userId
  const userData = userId ? (next.userDataByUserId[userId] ?? (next.userDataByUserId[userId] = emptyUserData())) : null

  switch (action.type) {
    case 'PREFERENCES_LANGUAGE_SET':
      next.preferences.language = action.language
      return next
    case 'PREFERENCES_THEME_SET':
      next.preferences.theme = action.theme
      return next

    case 'SIGNUP':
      return reduceSignup(state, next, action)

    case 'LOGIN':
      return reduceLogin(state, next, action)

    case 'LOGOUT':
      return reduceLogout(next, userData)

    case 'BOOKMARK_TOGGLE':
      return reduceBookmarkToggle(state, next, userData, action)

    case 'LESSON_VISIT':
      return reduceLessonVisit(state, next, userData, action)

    case 'PRACTICE_COMPLETE':
      return reducePracticeComplete(state, next, userData, action)

    case 'QUIZ_SUBMIT':
      return reduceQuizSubmit(state, next, userData, action)

    case 'DAILY_CHALLENGE_COMPLETE':
      return reduceDailyChallengeComplete(state, next, userData, action)
  }
}

type Ctx = {
  state: AppState
  language: Language
  theme: ThemeMode
  user: User | null
  userData: UserData | null
  actions: {
    setLanguage: (language: Language) => void
    setTheme: (theme: ThemeMode) => void
    signup: (args: { name: string; email: string; password: string }) => void
    login: (args: { email: string; password: string }) => void
    logout: () => void
    toggleBookmark: (lessonId: string) => void
    visitLesson: (lessonId: string) => void
    completePractice: (lessonId: string) => void
    submitQuiz: (lessonId: string, score: number, total: number) => void
    completeDailyChallenge: () => void
  }
}

const AppStateContext = createContext<Ctx | null>(null)

export function AppStateProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE, () => loadState() ?? DEFAULT_STATE)

  useEffect(() => {
    saveState(state)
  }, [state])

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', state.preferences.theme === 'dark')
  }, [state.preferences.theme])

  const actions: Ctx['actions'] = useMemo(() => {
    return {
      setLanguage: (language) => dispatch({ type: 'PREFERENCES_LANGUAGE_SET', language }),
      setTheme: (theme) => dispatch({ type: 'PREFERENCES_THEME_SET', theme }),
      signup: ({ name, email, password }) => dispatch({ type: 'SIGNUP', name, email, password }),
      login: ({ email, password }) => dispatch({ type: 'LOGIN', email, password }),
      logout: () => dispatch({ type: 'LOGOUT' }),
      toggleBookmark: (lessonId) => dispatch({ type: 'BOOKMARK_TOGGLE', lessonId }),
      visitLesson: (lessonId) => dispatch({ type: 'LESSON_VISIT', lessonId }),
      completePractice: (lessonId) => dispatch({ type: 'PRACTICE_COMPLETE', lessonId, points: 10 }),
      submitQuiz: (lessonId, score, total) => {
        const pct = Math.round((score / Math.max(1, total)) * 100)
        const points = Math.max(5, Math.min(30, Math.round(pct / 4)))
        dispatch({ type: 'QUIZ_SUBMIT', lessonId, score, total, points })
      },
      completeDailyChallenge: () => dispatch({ type: 'DAILY_CHALLENGE_COMPLETE', points: 15 }),
    }
  }, [dispatch])

  const ctx: Ctx = useMemo(() => {
    const user = state.session.userId ? state.users.find((u) => u.id === state.session.userId) ?? null : null
    const userData = state.session.userId ? state.userDataByUserId[state.session.userId] ?? null : null

    return {
      state,
      language: state.preferences.language,
      theme: state.preferences.theme,
      user,
      userData,
      actions,
    }
  }, [actions, state])

  return <AppStateContext.Provider value={ctx}>{children}</AppStateContext.Provider>
}

export function useAppState(): Ctx {
  const v = useContext(AppStateContext)
  if (!v) throw new Error('useAppState must be used within AppStateProvider')
  return v
}
