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

**Indentation:** always 2 spaces, never tabs, in every file (TS/TSX, CSS, JSON, Markdown). Match this when editing files that still contain tabs.

## Stack and architecture

Early-stage Next.js 16 project (App Router, React 19, TypeScript, strict mode), bootstrapped from create-next-app. All routes live in `app/`; there is no `src/` directory. Path alias `@/*` maps to the repo root.

- **Next.js version caveat:** Next 16.x APIs differ from older versions. Bundled docs are in `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`, …) — consult them before using unfamiliar APIs rather than relying on memory.
- **next.config.ts** enables `cacheComponents` (Cache Components / PPR model — dynamic data must be wrapped in `<Suspense>` or marked cached with `"use cache"`), `partialPrefetching`, and `experimental.agentFeedback`.
- **Typed route helpers:** layouts/pages use the globally generated `LayoutProps<"/route">` / `PageProps<"/route">` types (generated into `.next/types` by `next dev`/`next build`) instead of hand-written prop types.

## Portfolio layout

Static, minimalist single-page portfolio — everything renders at `/` (`app/page.tsx` composes Hero → About → Projects → Contact → Footer from `app/_components/`). Section titles use the shared `SectionHeading` component.

Real copy is in place except Projects and the metadata description in `layout.tsx`, which are still lorem ipsum.

**Animations:** GSAP (`gsap` + `@gsap/react`), used sparingly.
- **Before writing or changing any GSAP code, load the matching GSAP skill(s)** (installed in `.claude/skills/`): `gsap-react` for any component work (always, since this is React), plus `gsap-core` (tweens, easing, `matchMedia`/reduced motion), `gsap-timeline` (sequencing), `gsap-plugins` (SplitText, Flip, etc.), `gsap-scrolltrigger` (scroll-driven), `gsap-performance` (jank/FPS), `gsap-utils` (`gsap.utils.*`) as relevant. Follow them over memory.
- **Use the helpers in `app/_lib/motion.ts`** (they register `useGSAP`, ScrollTrigger and SplitText; don't re-register in components):
  - `useMotion(scopeRef, { full, reduced? })` instead of calling `useGSAP` directly. It wraps `gsap.matchMedia()` so `full` only runs without `prefers-reduced-motion`. `reduced` is only for extra setup under reduced motion.
  - Put `data-reveal` on the scope element (section root): it hides the section in CSS so the server-rendered HTML doesn't flash in its final state before hydration. `useMotion` reveals it after the tweens set their start state (both branches); a `<noscript>` rule in `layout.tsx` shows it without JS.
  - `revealTimeline(trigger?)` — timeline with the shared `motion` tokens (`expo.out`, 1.2s); with a trigger it plays once at `top 75%` via ScrollTrigger (attached to the timeline, never to child tweens).
  - `splitWords(el)` — masked word split; masks get the global `split-word-mask` class (padding fix for clipped glyphs in `globals.css`). Don't split text with `text-decoration` (it doesn't carry into the split words).
  - `childrenOf(el)` — children as an array for staggering list items.
- Section pattern: heading children fade up → large text word-mask reveal → body/list items fade up with stagger, sequenced with the position parameter (`"<0.2"`), not `delay`. Long sections give lower blocks their own `revealTimeline`.
- Target elements through refs, not class selectors: CSS Module class names are hashed, so `".title"` never matches.
- Always pass a config object to `SplitText.create(el, { type: … })`: in GSAP 3.15 omitting it throws `Cannot read properties of undefined (reading 'overwrite')`.

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

**Font:** Neue Haas Display, self-hosted via `next/font/local` in `app/fonts/neue-haas-display.ts` (`.ttf` files alongside). The files' built-in weight classes are shifted, so weights are remapped to CSS convention there (Roman = 400, Thin = 250) — use those values, not the cut names' implied weights. The font's CSS variable is set on `<html>` in `layout.tsx` and consumed via `--font-sans` in `globals.css`.
