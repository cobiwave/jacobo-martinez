# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (pinned via `packageManager` in package.json).

- `pnpm dev` — dev server at http://localhost:3000 (also regenerates the Next.js block in AGENTS.md)
- `pnpm build` — production build (also runs TypeScript type checking)
- `pnpm lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript)
- `pnpm exec tsc --noEmit` — type check only

No test framework is configured yet.

## Stack and architecture

Early-stage Next.js 16 project (App Router, React 19, TypeScript, strict mode), bootstrapped from create-next-app. All routes live in `app/`; there is no `src/` directory. Path alias `@/*` maps to the repo root.

- **Next.js version caveat:** Next 16.x APIs differ from older versions. Bundled docs are in `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`, …) — consult them before using unfamiliar APIs rather than relying on memory.
- **next.config.ts** enables `cacheComponents` (Cache Components / PPR model — dynamic data must be wrapped in `<Suspense>` or marked cached with `"use cache"`), `partialPrefetching`, and `experimental.agentFeedback`.
- **Typed route helpers:** layouts/pages use the globally generated `LayoutProps<"/route">` / `PageProps<"/route">` types (generated into `.next/types` by `next dev`/`next build`) instead of hand-written prop types.
## Portfolio layout

Static, minimalist single-page portfolio — everything renders at `/` (`app/page.tsx` composes Hero → About → Projects → Contact → Footer from `app/_components/`). No animations; placeholder copy is lorem ipsum.

**Styling:** plain CSS only (no Tailwind/Sass). Global tokens, reset and grid utilities in `app/globals.css`; one CSS Module per component, written with native CSS nesting (media queries nested inside each rule).

**Grid system (mobile first):**
- 4 columns (mobile) → 8 (tablet, `width >= 48em` = 768px) → 12 (desktop, `width >= 75em` = 1200px). Columns, gutter, margin and the type scale are CSS variables redefined per breakpoint in `globals.css`. Media queries use `em` because they ignore the html font-size.
- `.container` — global page grid; every section/block root is a `.container`, and each child is positioned with explicit `grid-column` / `grid-row` per breakpoint in its module.
- `.subgrid` — nested group that inherits parent columns (`grid-template-columns: subgrid`), full width by default.
- Rows subgrid (`grid-template-rows: subgrid`) is applied in modules on sibling items that must align (hero meta, about facts, project cards), always paired with an explicit `grid-row: span N` — without it children collapse into one track and overlap.
- Utilities are wrapped in `:where()` (zero specificity) so module classes always override them regardless of CSS order.
- Tracks use `minmax(0, 1fr)` so long words never blow out columns.
- Dev-only grid overlay (`app/_components/GridOverlay.tsx`, rendered in `layout.tsx` only when `NODE_ENV === "development"`): press `g` in `pnpm dev` to toggle; state persists in localStorage.

**Typography:** `html { font-size: 62.5% }` → 1rem = 10px. Always use `rem` for font sizes, preferably via the `--fs-*` tokens.
