# AGENTS.md

This file provides guidance to AI agents (including Kimi Code CLI) when working with code in this repository.

## Project Overview

Personal portfolio website for Vaibhav Kubre built with Astro and TailwindCSS. Static site deployed on Cloudflare Pages featuring blog posts, work projects, and professional information.

## Build & Development Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build static site for production |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run Astro + TypeScript diagnostics |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |

**Note:** Do not run the dev server or build to check for errors. Use `pnpm check` instead.

## Architecture

### Framework
Astro 5.x with static output mode and Cloudflare Pages adapter.

### Content System
- Uses **Astro Content Collections** with Zod validation
- **Blog posts:** `src/content/blog/*.md`
- **Work projects:** `src/content/work/*.md`
- **Travel entries:** `src/content/travel/*.md`
- All collections support `draft: boolean` frontmatter field
- Dynamic routes via `[...slug].astro` files generate pages from markdown

### Utilities (`src/utils/`)
Shared utilities for consistent code:

| File | Purpose |
|------|---------|
| `date.ts` | Date formatting helpers (`DATE_FORMATTERS`, `formatDateRange`) |
| `text.ts` | Text utilities (`toSentenceCase`, `calculateReadTime`, `slugify`) |
| `seo.ts` | SEO helpers (`getOgImageUrl`, `getCanonicalUrl`, `SITE` metadata) |

### Directory Structure
| Path | Purpose |
|------|---------|
| `src/pages/` | File-based routing |
| `src/layouts/` | Layout.astro (main), BlogLayout.astro, TravelLayout.astro |
| `src/components/` | Reusable components |
| `src/content/config.ts` | Content collection schema definitions |
| `src/utils/` | Shared utility functions |
| `src/assets/` | Images processed by Astro/Cloudflare image optimization |

### Styling
- **TailwindCSS** with custom color palette (`enamel`, `carbon`, `foam`, `beige` variants)
- **Typography:** IBM Plex Mono with Departure Neon display font
- Custom scrollbar and selection highlight styling
- Typography plugin for markdown content rendering

### Deployment
- Cloudflare Pages with Cloudflare image service
- Site URL: https://www.kubre.in
- RSS feed generated via `@astrojs/rss`

## Conventions

- **Read time:** Auto-calculated via `calculateReadTime()` utility (word count / 200 WPM)
- **Date formatting:** Uses `DATE_FORMATTERS` from `src/utils/date.ts`
- **Blog comments:** Powered by Giscus (GitHub-backed)
- **JavaScript:** No client-side framework - pure static HTML/CSS with minimal vanilla JS
- **Draft content:** Set `draft: true` in frontmatter to hide from production (visible in dev)
- **Image optimization:** Use `<Image>` and `<Picture>` from `astro:assets`
