export type Language = 'en' | 'hi'
export type ThemeMode = 'light' | 'dark'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export type LocalDateString = `${number}-${number}-${number}`

export type LessonExample = {
  en: string
  hi: string
}

export type LessonPracticeItem = {
  id: string
  promptEn: string
  promptHi: string
  answer: string
}

export type LessonQuizQuestion = {
  id: string
  questionEn: string
  questionHi: string
  optionsEn: string[]
  optionsHi: string[]
  correctIndex: number
  explanationEn: string
  explanationHi: string
}

export type Lesson = {
  id: string
  level: Level
  topic: {
    en: string
    hi: string
  }
  explanation: {
    en: string
    hi: string
  }
  examples: LessonExample[]
  illustrationKey: string
  practice: LessonPracticeItem[]
  quiz: LessonQuizQuestion[]
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: number
}

export type LessonProgress = {
  lessonId: string
  practiceCompleted: boolean
  quizBestScore: number
  completed: boolean
  lastVisitedAt: number | null
}

export type HistoryEventType =
  | 'signup'
  | 'login'
  | 'logout'
  | 'lesson_view'
  | 'practice_complete'
  | 'quiz_submit'
  | 'lesson_complete'
  | 'bookmark_add'
  | 'bookmark_remove'
  | 'daily_challenge_complete'

export type LearningHistoryEvent = {
  id: string
  type: HistoryEventType
  ts: number
  lessonId?: string
  meta?: Record<string, string | number | boolean>
}

export type BadgeKey =
  | 'first_lesson'
  | 'first_quiz'
  | 'streak_3'
  | 'streak_7'
  | 'points_100'
  | 'points_500'

export type UserStats = {
  points: number
  badges: BadgeKey[]
  streak: {
    current: number
    best: number
    lastActiveDate: LocalDateString | null
  }
  dailyChallenge: {
    lastCompletedDate: LocalDateString | null
  }
}

export type UserData = {
  progress: Record<string, LessonProgress>
  bookmarks: string[]
  history: LearningHistoryEvent[]
  stats: UserStats
}

export type AppPreferences = {
  language: Language
  theme: ThemeMode
}

export type AppState = {
  users: User[]
  session: {
    userId: string | null
  }
  preferences: AppPreferences
  userDataByUserId: Record<string, UserData>
}
