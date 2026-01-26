# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Vaibhav Kubre built with Astro and TailwindCSS. Static site deployed on Cloudflare Pages featuring blog posts, work projects, and professional information.

## Commands

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build static site for production
- `pnpm preview` - Preview production build locally

**Do not run the dev server or build to check for errors.** Use these instead:
- `pnpm astro check` - Run Astro's diagnostics (type checking, component validation)
- `pnpx tsc --noEmit` - TypeScript type checking only

## Architecture

**Framework:** Astro 5.x with static output mode and Cloudflare Pages adapter

**Content System:**
- Uses Astro Content Collections with Zod validation
- Blog posts: `src/content/blog/*.md`
- Work projects: `src/content/work/*.md`
- Both collections share the same schema (title, description, image, publishedAt, tags, readTime)
- Dynamic routes via `[...slug].astro` files generate pages from markdown

**Key Directories:**
- `src/pages/` - File-based routing (index, about, resume, guestbook, blog/*, work/*)
- `src/layouts/` - Layout.astro (main wrapper), BlogLayout.astro (posts with Giscus comments)
- `src/components/` - Reusable components (Nav, PostCard, WorkCard, Avatar, Card, Chip, etc.)
- `src/content/config.ts` - Content collection schema definitions
- `src/assets/` - Images processed by Astro/Cloudflare image optimization

**Styling:**
- TailwindCSS with custom color palette (enamel, carbon, foam, beige variants)
- Monospace typography: IBM Plex Mono with Departure Neon display font
- Custom scrollbar and selection highlight styling
- Typography plugin for markdown content rendering

**Deployment:**
- Cloudflare Pages with Cloudflare image service
- Site URL: https://www.kubre.in
- RSS feed generated via @astrojs/rss

## Conventions

- Read time calculated automatically (word count / 200 WPM)
- Date formatting uses en-IN locale via Intl.DateTimeFormat
- Blog comments powered by Giscus (GitHub-backed)
- No client-side JavaScript framework - pure static HTML/CSS with minimal vanilla JS
