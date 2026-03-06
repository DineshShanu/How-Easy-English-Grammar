# How-Easy (Copilot Instructions)

You are working in the **How-Easy** workspace: a Vite + React + TypeScript SPA with Tailwind CSS.

## Goals
- Keep the UI **mobile-first**, SaaS-style, responsive.
- Maintain **bilingual learning** (EN/HI) across lessons and UI strings.
- Keep data in local JSON/TS modules (no backend).

## Project conventions
- Lesson content must conform to the `Lesson` type in `src/lib/types.ts`.
- Lesson data lives in:
  - `src/data/lessons.beginner.json`
  - `src/data/lessons.intermediate.json`
  - `src/data/lessons.advanced.json`
  - `src/data/lessons.ts` exports `LESSONS` (combined array)
- Use `LESSONS` for imports (do not reintroduce `lessons.json`).

## UX rules
- Do not add extra pages, modals, filters, animations, icons, or themes unless explicitly asked.
- Use existing UI primitives from `src/components/ui.tsx`.
- Keep colors/tokens consistent with Tailwind defaults already used (no new hard-coded palettes).

## Quality bar
- TypeScript strict: keep types correct and avoid `any`.
- After changes, run `npm run build` and fix issues caused by your changes.
- Avoid large refactors unless required.

## Content rules (lessons)
- Each lesson must include:
  - `topic.en` and `topic.hi`
  - `explanation.en` and `explanation.hi`
  - **exactly 5** `examples` entries (EN + HI)
  - `practice` items with unique `id`s per lesson
  - `quiz` questions with `optionsEn/optionsHi` aligned and a valid `correctIndex`
