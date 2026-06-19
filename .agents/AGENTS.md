# AGENTS.md — satyam.cv

> Personal blog and portfolio for Satyam, built with **Astro 6**, deployed on **Netlify**.

---

## Project Overview

This is a statically-generated personal website (`satyam.cv`) featuring:

- **Blog** — Markdown/MDX posts with code highlighting, KaTeX math, reading time, TOC, and custom embeds (GitHub cards, link cards, NeoDB cards, X/Twitter posts, embedded videos).
- **About** — Work experience, education, and projects (data-driven from TypeScript).
- **Library** — Curated reading list, videos, and media links.
- **RSS/Atom feeds** — Auto-generated from posts.
- **OG images** — Auto-generated Open Graph images via `astro-og-canvas`.

### Tech Stack

| Layer              | Technology                                                       |
| ------------------ | ---------------------------------------------------------------- |
| Framework          | Astro 6 (static SSG)                                             |
| Language           | TypeScript (strict mode)                                         |
| Styling            | Vanilla CSS with CSS custom properties (no Tailwind)             |
| Markdown           | remark + rehype plugin pipeline (math, embeds, TOC, copy-code)   |
| Image Processing   | Sharp (via Astro image service)                                  |
| Package Manager    | pnpm (v11+, workspace mode)                                      |
| Node Version       | ^24.16.0                                                         |
| Deployment         | Netlify (static, `dist/` output)                                 |
| CI                 | GitHub Actions (`ci.yml`) — format check, lint, typecheck, build |
| Dependency Updates | Dependabot (weekly, grouped by ecosystem)                        |

---

## Directory Structure & Where Code Goes

```
satyam.cv/
├── .github/
│   ├── workflows/ci.yml       # CI pipeline (validate & build, auto-merge)
│   └── dependabot.yml         # Dependency update config
├── public/                    # Static assets served as-is (no processing)
│   ├── fonts/                 # Self-hosted font files
│   ├── favicons/              # Favicon variants
│   ├── feeds/                 # Pre-generated feed files
│   ├── og/                    # Generated OG images (build artifact)
│   ├── screenshots/           # Screenshot assets
│   ├── katex.min.css          # KaTeX stylesheet
│   └── satyam_resume.pdf      # Resume PDF
├── scripts/                   # Build-time CLI scripts (run via tsx)
│   ├── new-post.ts            # Create a new blog post scaffold
│   ├── update-link-metadata.ts # Fetch & cache link card metadata
│   ├── update-theme.ts        # Theme update utility
│   └── toggle-proxy.ts        # Dev proxy toggle
├── src/
│   ├── config.ts              # ★ Site-wide configuration (single source of truth)
│   ├── content.config.ts      # Astro content collections schema
│   ├── env.d.ts               # TypeScript ambient declarations
│   ├── components/
│   │   ├── layout/            # Structural chrome: BaseHead, Header, Footer, TransitionWrapper
│   │   ├── ui/                # Interactive/visual UI: TOC, ImageViewer, CopyCode, ThemeToggle, Cards, etc.
│   │   ├── widgets/           # Small display units: FormattedDate, PostList, FootnoteScroll, Home
│   │   └── examples/          # MDX example/demo components: Callout, CounterButton, Tag
│   ├── content/
│   │   ├── posts/             # ★ Blog posts (Markdown/MDX files)
│   │   │   └── _assets/       # Post-specific images (co-located)
│   │   ├── home/              # Homepage markdown content
│   │   └── about/             # About page markdown content
│   ├── data/                  # Typed data modules (NOT content collections)
│   │   ├── about.ts           # Work experience, education, projects
│   │   ├── library.ts         # Library/reading list entries
│   │   ├── videos.ts          # Video entries
│   │   └── link-card-metadata.json  # Cached link preview metadata
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Root HTML shell (theme, transitions, width)
│   │   ├── IndexLayout.astro  # List/index page layout
│   │   └── PostLayout.astro   # Blog post layout (TOC, reading time, embeds)
│   ├── pages/                 # File-based routing (Astro pages)
│   │   ├── index.astro        # Homepage
│   │   ├── [...slug].astro    # Dynamic blog post pages
│   │   ├── content.astro      # Content listing page
│   │   ├── about.astro        # About page
│   │   ├── work.astro         # Work page
│   │   ├── library.astro      # Library page
│   │   ├── 404.astro          # Custom 404 page
│   │   ├── rss.xml.ts         # RSS feed endpoint
│   │   ├── atom.xml.ts        # Atom feed endpoint
│   │   └── open-graph/        # OG image generation endpoints
│   ├── plugins/               # Custom remark/rehype plugins
│   │   ├── remark-*.mjs       # Remark plugins (AST transforms on markdown)
│   │   ├── rehype-*.mjs       # Rehype plugins (AST transforms on HTML)
│   │   └── utils/             # Shared plugin utilities
│   ├── styles/
│   │   ├── global.css         # Global styles, CSS variables, light/dark theme tokens
│   │   ├── post.css           # Blog post typography and content styles
│   │   └── fonts.css          # @font-face declarations
│   ├── types/
│   │   ├── index.ts           # Barrel export for all types
│   │   ├── config.types.ts    # ThemeConfig, SiteInfo, GeneralSettings, etc.
│   │   ├── content.types.ts   # ReadingTime, TOCItem, ContentFeatures, PostListProps
│   │   └── component.types.ts # PostLayoutProps, ImageOptimizerProps, GitHubRepoData, etc.
│   └── utils/
│       ├── date.ts            # Date formatting utilities
│       ├── draft.ts           # Post filtering (draft = filename starts with `_`)
│       ├── feed.ts            # RSS/Atom feed generation
│       ├── image-config.ts    # Sharp image optimization settings
│       └── client/
│           └── lazy-resource.ts # Client-side lazy loading utility
├── astro.config.ts            # Astro framework configuration
├── tsconfig.json              # TypeScript config (strict, path aliases)
├── eslint.config.js           # ESLint flat config
├── .prettierrc                # Prettier config
├── netlify.toml               # Netlify deployment & headers config
└── package.json               # Scripts, dependencies, engine constraints
```

### Where to Put New Code

| You want to…                                  | Put it in…                                    |
| --------------------------------------------- | --------------------------------------------- |
| Write a new blog post                         | `src/content/posts/<slug>.md`                 |
| Add post images                               | `src/content/posts/_assets/`                  |
| Create a new page/route                       | `src/pages/<name>.astro`                      |
| Add a reusable UI component                   | `src/components/ui/`                          |
| Add a structural layout piece                 | `src/components/layout/`                      |
| Add a small display widget                    | `src/components/widgets/`                     |
| Add an MDX example/demo component             | `src/components/examples/`                    |
| Add a new page layout                         | `src/layouts/`                                |
| Add structured data (not content collections) | `src/data/` (export typed arrays/objects)     |
| Add a remark/rehype markdown plugin           | `src/plugins/` (use `.mjs` extension)         |
| Add shared plugin helpers                     | `src/plugins/utils/`                          |
| Add TypeScript type definitions               | `src/types/` (then re-export from `index.ts`) |
| Add a utility function (server-side)          | `src/utils/`                                  |
| Add a client-side utility                     | `src/utils/client/`                           |
| Add global CSS / design tokens                | `src/styles/global.css`                       |
| Add post-specific CSS                         | `src/styles/post.css`                         |
| Add a build-time script                       | `scripts/` (TypeScript, run via `tsx`)        |
| Add static assets (fonts, favicons, PDFs)     | `public/`                                     |
| Modify site-wide settings                     | `src/config.ts`                               |

---

## Build & Dev Commands

```bash
# Install dependencies
pnpm install

# Development server (updates link metadata, then starts Astro dev)
pnpm dev

# Production build (typecheck → update link metadata → astro build)
pnpm build

# Preview production build locally
pnpm preview

# Type checking
pnpm typecheck          # TypeScript + Astro check
pnpm typecheck:ts       # TypeScript only (tsc --noEmit)

# Linting
pnpm lint               # ESLint check
pnpm lint:fix           # ESLint auto-fix

# Formatting
pnpm format             # Prettier write
pnpm format:check       # Prettier check (CI uses this)

# Create a new blog post
pnpm new "My Post Title"       # Creates src/content/posts/my-post-title.md
pnpm new "_Draft Title"        # Creates a draft post (underscore prefix = hidden)

# Update link card metadata cache
pnpm update-link-metadata

# Update theme
pnpm update-theme
```

### CI Pipeline

The GitHub Actions CI (`ci.yml`) runs on pushes/PRs to `main`:

1. `pnpm format:check` — Prettier format validation
2. `pnpm lint` — ESLint (continue-on-error)
3. `tsc --noEmit` — TypeScript type check
4. `pnpm build` — Full production build

Dependabot auto-merge is enabled for dependency PRs with the `automerge` label.

---

## Code Style Guidelines

### Enforced by Tooling

- **Prettier** (`.prettierrc`):
  - No semicolons (`"semi": false`)
  - Single quotes (`"singleQuote": true`)
  - No trailing commas (`"trailingComma": "none"`)
  - 120 char print width
  - 2-space indentation
  - Astro plugin enabled for `.astro` files

- **ESLint** (`eslint.config.js`):
  - TypeScript recommended rules
  - Astro recommended rules
  - `no-console`: warn (except `console.warn` and `console.error`)
  - `@typescript-eslint/no-unused-vars`: warn (ignore args starting with `_`)
  - `@typescript-eslint/no-explicit-any`: warn
  - `astro/no-set-html-directive`: off
  - `scripts/` directory: `no-console` is disabled (scripts log freely)

### Conventions to Follow

- **Path aliases**: Use `@/` to import from `src/` (e.g., `import { themeConfig } from '@/config'`). Never use relative `../` paths from deep nesting.
- **Type imports**: Use `import type { ... }` for type-only imports.
- **Types barrel**: Export all types from `src/types/index.ts`. Import from `@/types` in components.
- **Component file naming**: PascalCase for `.astro` files (e.g., `BackButton.astro`, `PostLayout.astro`).
- **Plugin file naming**: kebab-case with `.mjs` extension (e.g., `remark-reading-time.mjs`).
- **Script file naming**: kebab-case with `.ts` extension (e.g., `new-post.ts`).
- **CSS**: Use vanilla CSS with CSS custom properties defined in `global.css`. No CSS-in-JS, no Tailwind. Component-scoped styles use `<style>` blocks inside `.astro` files.
- **No inline `set:html`**: The ESLint rule is off, but prefer component composition over raw HTML injection where possible.
- **Astro component props**: Define prop types using interfaces from `src/types/`, passed via `Astro.props`.
- **Content collections**: All content schemas are in `src/content.config.ts` using Zod. Don't scatter schema definitions.

### CSS Architecture

- **Design tokens** are in `src/styles/global.css` under `:root` (light mode) and `[data-theme='dark']` (dark mode).
- **Typography** uses Inter (sans), Besley (serif), and SF Mono (monospace) — self-hosted in `public/fonts/`.
- **Theme** is managed via `data-theme` attribute on `<html>`, toggled by `ThemeManager.astro`.
- **Content width** is controlled via `--content-width` CSS variable, set from `src/config.ts`.

---

## Content Authoring

### Blog Posts

Posts live in `src/content/posts/` as Markdown or MDX files.

**Required frontmatter:**

```yaml
---
title: 'Post Title'
pubDate: '2024-07-07' # ISO date string (YYYY-MM-DD)
---
```

**Optional frontmatter:**

```yaml
image: './path-to-cover-image.png' # Cover image (relative path)
```

**Draft system:**

- Prefix the filename with `_` to mark as draft (e.g., `_work-in-progress.md`)
- Drafts are excluded from listings and builds via `src/utils/draft.ts`
- The `pnpm new "_Draft Title"` command creates a draft directly

**Post images:**

- Store post-specific images in `src/content/posts/_assets/`
- Reference in posts via relative paths: `![](./_assets/image-name.png)`

**Custom features available in posts** (auto-detected by `remark-content-features`):

- Code blocks with copy button
- KaTeX math (`$inline$` and `$$block$$`)
- Table of contents (auto-generated from headings)
- GitHub repository cards
- Link preview cards
- NeoDB media cards
- X/Twitter post embeds
- Embedded videos (YouTube, Bilibili)

### Other Content Collections

- `src/content/home/home.md` — Homepage body content
- `src/content/about/about.md` — About page body content

### Structured Data (TypeScript)

For typed lists that aren't markdown content, use `src/data/`:

- `about.ts` — `ExperienceEntry[]` arrays for work, education, projects
- `library.ts` — `LibraryCategory[]` for reading lists
- `videos.ts` — `VideoEntry[]` for video links
- `link-card-metadata.json` — Auto-generated cache (do not manually edit)

---

## Plugin Development

Custom remark/rehype plugins live in `src/plugins/` and use `.mjs` extensions.

### Current Plugin Pipeline (order matters)

**Remark (markdown AST):**

1. `remark-math` — Parse math syntax
2. `remark-directive` — Parse directive syntax (`::: callout` etc.)
3. `remark-embedded-media` — Transform embedded media directives into components
4. `remark-content-features` — Detect content features (code blocks, images, etc.) and set frontmatter flags
5. `remark-reading-time` — Calculate and inject reading time into frontmatter
6. `remark-toc` — Extract headings for table of contents

**Rehype (HTML AST):**

1. `rehype-katex` — Render KaTeX math
2. `rehype-cleanup` — Clean up HTML output
3. `rehype-image-processor` — Process and optimize images
4. `rehype-copy-code` — Add copy buttons to code blocks

### Adding a New Plugin

1. Create `src/plugins/remark-<name>.mjs` or `rehype-<name>.mjs`
2. Export a default function returning a transformer
3. Register in `astro.config.ts` in the appropriate array (`remarkPlugins` or `rehypePlugins`)
4. Order matters — place it where its input/output expectations are met
5. Shared helpers go in `src/plugins/utils/`

---

## Testing Instructions

There is no test framework currently configured. Validation is done through:

1. **Type checking**: `pnpm typecheck` (TypeScript strict + Astro check)
2. **Linting**: `pnpm lint`
3. **Format checking**: `pnpm format:check`
4. **Build verification**: `pnpm build` (a successful build validates all content, plugins, and pages)
5. **Visual verification**: `pnpm preview` after build to inspect output

### Before Submitting Changes

Run the full validation chain:

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm build
```

Or simply `pnpm build` which already runs typecheck before building.

### Common Failure Points

- **Content schema violations**: Missing or malformed frontmatter in posts → breaks `pnpm build`
- **Broken image paths**: Relative image references in posts must resolve → check with `pnpm dev`
- **Plugin errors**: Remark/rehype plugins that throw will crash the build for every page
- **Type errors**: Strict null checks are enabled — handle `undefined` cases explicitly

---

## Security Considerations

### Headers (Netlify)

Security headers are configured in `netlify.toml`:

- `X-Frame-Options: SAMEORIGIN` — Prevents clickjacking
- `X-Content-Type-Options: nosniff` — Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — Restricts geolocation, microphone, camera
- `Content-Security-Policy` — Strict CSP with whitelisted sources

### Content Safety

- **`sanitize-html`** is a dependency — used for sanitizing any user-facing HTML
- **`set:html` directive** is allowed by ESLint config but should be used sparingly and only with trusted/sanitized content
- **External fetch** (`update-link-metadata.ts`) fetches metadata from external URLs — the cached results in `link-card-metadata.json` should be reviewed before committing

### Sensitive Files

- `.env` / `.env.production` — Gitignored. No secrets should be committed.
- `netlify.toml` — Contains CSP and deployment config. Review CSP changes carefully.
- `src/data/link-card-metadata.json` — Auto-generated from external fetches. Verify content after regeneration.

### Dependencies

- Dependabot is configured for weekly updates (grouped by ecosystem)
- Auto-merge is enabled only for non-major version bumps
- Major version updates require manual review

---

## Astro-Specific Gotchas

- **Client-side JavaScript**: Astro ships zero JS by default. Interactive scripts go inside `<script>` tags in `.astro` files. Use `is:inline` for scripts that need access to `define:vars`.
- **Content collections v2**: This project uses Astro's content layer API (`glob` loader). Don't mix with the legacy `src/content/config.ts` pattern.
- **Image service**: Uses Sharp via `astro/assets/services/sharp` with custom quality settings in `src/utils/image-config.ts`.
- **View transitions**: Enabled conditionally via `themeConfig.general.fadeAnimation`. When off, a manual `astro:page-load` event is dispatched for compatibility.
- **Path alias**: `@/` maps to `./src/` — configured in both `tsconfig.json` and `astro.config.ts` (Vite alias).

---

## Quick Reference

| Task                          | Command / Location                   |
| ----------------------------- | ------------------------------------ |
| Start dev server              | `pnpm dev`                           |
| Create new post               | `pnpm new "Title"`                   |
| Create draft post             | `pnpm new "_Title"`                  |
| Build for production          | `pnpm build`                         |
| Site config                   | `src/config.ts`                      |
| Content schemas               | `src/content.config.ts`              |
| Deployment config             | `netlify.toml`                       |
| CI pipeline                   | `.github/workflows/ci.yml`           |
| Design tokens / CSS variables | `src/styles/global.css`              |
| Type definitions              | `src/types/` (import from `@/types`) |
