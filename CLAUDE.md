# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A personal **developer portfolio website** — single-page-feeling, heavily visual, animation-forward. The goal is a site that reads as the work of someone who cares about craft: motion on scroll, tactile hover states, and a distinctive dark navy-and-brown palette rather than the usual purple-gradient template.

Frontend is **Angular** (v21). No backend has been chosen yet — see [Open decisions](#open-decisions) before building anything that needs a server.

## Architecture
```
src/
├── app/
    └── components/              # All components with ther css
    └── services/                # All service files
    └── directives/              # Reusable directives (e.g. [appReveal])
    └── app.html                 # should be clean
    └── app.routes.ts            # all routes are configured here

```

### Current state

The site is built and building clean. Shape of it:

- **One page, anchored sections.** [app.routes.ts](src/app/app.routes.ts) has a single lazy `''` route to `Home`, plus a `**` redirect. [home.html](src/app/components/home/home.html) composes Hero → About → Skills → Projects → Experience → Contact; each section owns the `id` its nav anchor targets.
- **[app.html](src/app/app.html) is the shell only** — skip link, `<app-header />`, `<main id="main">` with the outlet, `<app-footer />`.
- **All content lives in [portfolio-data.ts](src/app/services/portfolio-data.ts)** behind typed interfaces. Components are presentational and inject that service; they hold no copy of their own. Most of the copy there is still placeholder — edit the service, not the templates.
- **Do not wrap sections in `@defer`.** It was the original plan and it is wrong here: anchor navigation and the header's scroll-spy both need every section present in the DOM, and a deferred section has no `id` to scroll to. The page is ~27 kB lazy, so there is nothing to win.
- **[photo-stack](src/app/components/photo-stack/photo-stack.ts) is split out of Hero only to satisfy the 4 kB style budget.** Despite the name it now renders a *single* framed photo (`[image]`, from `heroImage` in the data service) with a copper offset outline behind it. It is the one input-driven component here; everything else injects the data service.
- **The hero image is remote** (`images.unsplash.com`), the site's only third-party request. Note `picsum.photos` and `dummyimage.com` are blocked on this network — if placeholders ever need swapping, verify the host resolves before committing to it.
- The workspace name is misspelled `myprotfolio`. Build targets are therefore `myprotfolio:build:production` / `myprotfolio:build:development` — keep that spelling in `ng` target references.

## Commands

```bash
npx ng serve # Development build in watch mode
npx ng g c component_name # Generate a new component for use
npx ng g s service_name # Generarate a new service for use
```

Test filtering (these flags come from the `@angular/build:unit-test` builder, **not** Vitest's own CLI):

```bash
ng test --include src/app/app.spec.ts       # single spec file (glob, relative to project root)
ng test --filter "should render title"      # regex against suite/test names
ng test --watch=false                       # force a single run; watch defaults to true only in a TTY
ng test --coverage
ng test --ui                                # Vitest interactive UI
```

No linter is configured — `ng lint` fails until ESLint is added. Formatting comes from the inline `prettier` block in [package.json](package.json) (100 cols, single quotes, `parser: angular` for HTML) and [.editorconfig](.editorconfig) (2-space indent, final newline, trimmed trailing whitespace).

## Design system

Define every token below as a CSS custom property in [src/styles.css](src/styles.css) — **not** per-component. Components reference `var(--*)` only; a hardcoded hex in a component is a bug.

### Palette

Dark-first. Navy carries structure, brown/copper carries attention. Use brown sparingly — it should feel like a warm metal accent against cold navy, not a 50/50 split.

```css
/* Structure — navy */
--navy-950: #060d1a;  /* page background, deepest wells */
--navy-900: #0a1628;  /* default section background */
--navy-800: #112240;  /* raised surfaces: cards, nav bar */
--navy-700: #1c3055;  /* hover surfaces, dividers */
--navy-600: #2a4574;  /* borders on interactive elements */

/* Accent — brown / copper */
--brown-800: #4a3428;  /* decorative fills, card edges */
--brown-700: #6f4e37;  /* deep coffee; surfaces only, never text */
--brown-500: #a97155;  /* secondary accent, icons */
--copper-400: #c08552; /* PRIMARY accent: links, CTAs, active nav, underlines */
--tan-300: #d9a66c;    /* hover state for copper */
--sand-200: #e8c9a0;   /* highest-emphasis accent text, small headings */

/* Text */
--text-primary: #e6edf7;    /* headings, body */
--text-secondary: #a8b8ce;  /* supporting copy, captions */
--text-muted: #7d8fa9;      /* metadata, timestamps */
```

Contrast against `--navy-900`, measured — do not degrade these:

| Token | Ratio | Safe for |
|---|---|---|
| `--text-primary` | 15.5:1 | anything |
| `--text-secondary` | 9.1:1 | anything |
| `--text-muted` | 5.5:1 | body text and up (AA) |
| `--copper-400` | 5.9:1 | body text and up (AA); **fails AAA** |
| `--sand-200` | ~12:1 | anything |
| `--brown-700` | 2.5:1 | **decorative only** — never text or icons that carry meaning |

If you introduce a new color, compute its ratio against `--navy-900` and keep it ≥ 4.5:1 for anything readable.

### Type

Resolved: **no webfont is loaded, on purpose.** `--font-body`, `--font-display`, and `--font-mono` in [styles.css](src/styles.css) are system stacks, so the site makes zero third-party requests and what you see locally is what ships. `--font-mono` carries a lot of the developer character here (section numbers, tags, timestamps) — keep using it for metadata rather than body copy.

If you later want a real display face, self-host the files under `public/` with `@font-face` and `font-display: swap`, and point `--font-display` at it. Don't reintroduce a Google Fonts `<link>`.

## Animation

This is central to the brief, so it has real constraints.

**Use CSS. Do not install an animation library.** `@angular/animations`, GSAP, and Motion are all absent, and `@angular/cdk` is too. Angular's `animate()` DSL is deprecated in favor of native CSS, and a JS animation library will push against the bundle budget below. CSS transitions, `@keyframes`, and the Web Animations API (`element.animate()`) cover everything this site needs.

**Scroll-triggered reveals** — the main motion device. Build one reusable attribute directive backed by `IntersectionObserver` that adds a class when the element enters the viewport; drive the actual movement from CSS. Never animate on `scroll` events. Because the app is zoneless (below), a directive that only calls `classList.add()` needs no change detection at all — that is the cheapest correct approach.

**Animate `transform` and `opacity` only.** Animating `width`, `height`, `top`, or `box-shadow` triggers layout on every frame. For entrances, combine a small `translateY` with `opacity`.

**Honor `prefers-reduced-motion`.** Every non-trivial animation needs a reduced-motion fallback that keeps content visible — a reveal animation that starts at `opacity: 0` and is disabled without a fallback makes content permanently invisible. This is the single easiest way to ship a broken portfolio.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Route transitions** are available natively: `provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }))` in [app.config.ts](src/app/app.config.ts). Both are exported by the installed `@angular/router`.

**The reveal directive is [reveal.ts](src/app/directives/reveal.ts)** — `[appReveal]`, with an optional `[appRevealDelay]` in ms for staggering lists. It only toggles `.is-visible`; the motion is the `[appReveal]` rules in [styles.css](src/styles.css). It fails open (adds the class immediately) when `IntersectionObserver` is missing, which is what keeps content visible under jsdom.

**Hero entrance animations run on load**, not on scroll — the hero is above the fold, so it uses `animation-delay` on a `reveal-up` keyframe rather than the directive.

Keep shared `@keyframes` and easing tokens in `src/styles.css`; duplicating keyframes per component burns the 8 kB component-style budget fast.

## Architecture constraints

**Zoneless.** `zone.js` is not a dependency, is absent from the lockfile, and `angular.json` declares no `polyfills` entry. Change detection is signal-driven:

- Template state must be a `signal` / `computed` (see `title` in [app.ts](src/app/app.ts)). Mutating a plain field will not repaint.
- In tests use `await fixture.whenStable()`, not `fixture.detectChanges()` — as [app.spec.ts](src/app/app.spec.ts) does.
- Do not add `provideZoneChangeDetection` or reintroduce `zone.js`.

**Standalone, no NgModules.** Bootstrap is `bootstrapApplication(App, appConfig)` in [main.ts](src/main.ts). App-wide providers go in the `providers` array of [app.config.ts](src/app/app.config.ts); component dependencies go in that component's own `imports` array.

**Angular 21 naming.** The CLI no longer appends type suffixes — the root component is `App` in `src/app/app.ts`, not `AppComponent` in `app.component.ts`. Match that for new code. Templates use `styleUrl` (singular), not `styleUrls`.

**Vitest, not Karma/Jasmine.** Tests run in Node under jsdom unless `--browsers` is passed. `describe`/`it`/`expect` are global via `"types": ["vitest/globals"]` in [tsconfig.spec.json](tsconfig.spec.json); anything else (`vi`, `beforeAll`) imports from `vitest`. Note jsdom does not implement `IntersectionObserver` — scroll-reveal directives need it stubbed in tests.

**TypeScript is strict.** [tsconfig.json](tsconfig.json) sets `strict`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `isolatedModules`, and `noPropertyAccessFromIndexSignature` (index-signature members require bracket access: `obj['key']`). Angular adds `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers` — template type errors fail the build, and `protected`/`private` members are enforced in templates.

**Production budgets bite.** The prod build **errors** above a 1 MB initial bundle (warns at 500 kB) and above **8 kB for any single component stylesheet** (warns at 4 kB). An animation-heavy portfolio hits the per-component style ceiling easily — this is the most likely cause of a build that fails while `npm start` is happy.

## Settled decisions

- **Routing:** single page, anchor-scrolled sections, one lazy route. `withViewTransitions()` is wired up in [app.config.ts](src/app/app.config.ts) and currently does nothing visible — it only earns its keep if real routes get added.
- **Content:** typed local data in [portfolio-data.ts](src/app/services/portfolio-data.ts). No CMS, no GitHub API.
- **Contact:** `mailto:` call-to-action, no form. A form that silently drops submissions is worse than no form, and there is no handler to post to.

## Still open

Ask before assuming an answer to these:

- **Real content.** Most copy in `portfolio-data.ts` is placeholder — project blurbs, the second role, the LinkedIn URL. Needs the user's actual details.
- **Backend.** Still none. Required before the contact section becomes a real form.
- **Hosting.** Affects whether SSR/prerendering is worth adding; the app is client-side only today. Prerendering would help SEO for a portfolio.
- **Imagery.** The hero photo is an Unsplash placeholder, and its alt text describes it only approximately — rewrite it to match whatever ships. Featured project cards still use a generated monogram plate instead of screenshots; real ones would need `public/` assets and `loading="lazy"`.
