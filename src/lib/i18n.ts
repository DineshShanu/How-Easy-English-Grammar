import type { Language } from "./types";

export type I18nKey =
  | "app.name"
  | "nav.home"
  | "nav.dashboard"
  | "nav.lessons"
  | "nav.quizzes"
  | "nav.vocabulary"
  | "nav.blog"
  | "nav.worksheets"
  | "nav.tips"
  | "nav.dailyChallenge"
  | "nav.contact"
  | "auth.login"
  | "auth.signup"
  | "auth.logout"
  | "common.search"
  | "common.level"
  | "common.beginner"
  | "common.intermediate"
  | "common.advanced"
  | "common.bookmark"
  | "common.bookmarked"
  | "common.progress"
  | "common.points"
  | "common.streak";

const STRINGS: Record<Language, Record<I18nKey, string>> = {
  en: {
    "app.name": "How-Easy",
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.lessons": "Lessons",
    "nav.quizzes": "Quizzes",
    "nav.vocabulary": "Vocabulary",
    "nav.blog": "Grammar Blog",
    "nav.worksheets": "Worksheets",
    "nav.tips": "Grammar Tips",
    "nav.dailyChallenge": "Daily Challenge",
    "nav.contact": "Contact Us",
    "auth.login": "Login",
    "auth.signup": "Sign up",
    "auth.logout": "Logout",
    "common.search": "Search",
    "common.level": "Level",
    "common.beginner": "Beginner",
    "common.intermediate": "Intermediate",
    "common.advanced": "Advanced",
    "common.bookmark": "Bookmark",
    "common.bookmarked": "Bookmarked",
    "common.progress": "Progress",
    "common.points": "Points",
    "common.streak": "Streak",
  },
  hi: {
    "app.name": "How-Easy",
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.lessons": "पाठ",
    "nav.quizzes": "क्विज़",
    "nav.vocabulary": "शब्दावली",
    "nav.blog": "व्याकरण ब्लॉग",
    "nav.worksheets": "वर्कशीट",
    "nav.tips": "व्याकरण टिप्स",
    "nav.dailyChallenge": "डेली चैलेंज",
    "nav.contact": "संपर्क करें",
    "auth.login": "लॉगिन",
    "auth.signup": "साइन अप",
    "auth.logout": "लॉगआउट",
    "common.search": "खोजें",
    "common.level": "स्तर",
    "common.beginner": "शुरुआती",
    "common.intermediate": "मध्यम",
    "common.advanced": "उन्नत",
    "common.bookmark": "बुकमार्क",
    "common.bookmarked": "बुकमार्क किया",
    "common.progress": "प्रगति",
    "common.points": "अंक",
    "common.streak": "स्ट्रिक",
  },
};

export function t(language: Language, key: I18nKey): string {
  return STRINGS[language][key];
}
