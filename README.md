# How-Easy

Modern, mobile-first **English Grammar Learning Platform** (Beginner → Advanced) with:

- EN/HI bilingual learning toggle
- Light/Dark mode
- Interactive lessons (examples, practice, quizzes)
- Progress tracking + points/badges/streaks (localStorage)
- Search/filter + bookmarking
- Extra sections: Vocabulary, Daily Challenge, Blog, Worksheets, Tips

## Tech

- Vite + React + TypeScript
- Tailwind CSS (via `@tailwindcss/vite`)
- React Router
- Local JSON/TS modules as a “database”

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Data layout

Lessons are stored in split JSON files and combined at runtime:

- `src/data/lessons.beginner.json`
- `src/data/lessons.intermediate.json`
- `src/data/lessons.advanced.json`
- `src/data/lessons.ts` exports `LESSONS`

Other content:

- `src/data/vocabulary.json`
- `src/data/blog.json`
- `src/data/worksheets.json`

## Notes

- Auth is a local mock (signup/login stored in localStorage). Do not use real passwords.
- Lesson schema is defined in `src/lib/types.ts` (`Lesson`).
