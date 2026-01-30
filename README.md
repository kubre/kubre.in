# kubre.in

Personal portfolio website for Vaibhav Kubre built with Astro and TailwindCSS.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: [Astro 5.x](https://astro.build) with static output
- **Styling**: [TailwindCSS 4.x](https://tailwindcss.com) with custom theme
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Content**: Astro Content Collections with Zod validation

### Project Structure
```
├── src/
│   ├── components/       # Reusable UI components
│   ├── layouts/          # Page layouts
│   ├── pages/            # File-based routes
│   ├── content/          # Content collections (blog, work, travel)
│   ├── styles/           # Global styles
│   └── utils/            # Shared utilities
├── public/               # Static assets
└── astro.config.mjs      # Astro configuration
```

### Content Collections

- **Blog** (`src/content/blog/*.md`): Technical articles and thoughts
- **Work** (`src/content/work/*.md`): Project case studies
- **Travel** (`src/content/travel/*.md`): Travel journal with photos

### Frontmatter Schema

```yaml
---
title: "Post Title"
description: "Brief description"
image: ../../assets/image.jpg
publishedAt: 2024-01-15
tags: ["tag1", "tag2"]
readTime: 5  # Auto-calculated if omitted
draft: false  # Set to true to hide from production
---
```

## 📝 Development

### Code Quality

```bash
# Run Astro type checking
pnpm astro check

# Run TypeScript checking
pnpx tsc --noEmit
```

### Adding Content

1. **Blog Post**: Create a new `.md` file in `src/content/blog/`
2. **Work Project**: Create a new `.md` file in `src/content/work/`
3. **Travel Entry**: Create a new `.md` file in `src/content/travel/` and add photos to `src/assets/travel/{slug}/`

## 🚢 Deployment

Automatically deployed to Cloudflare Pages on push to main branch.

## 📄 License

Content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
Code: MIT
