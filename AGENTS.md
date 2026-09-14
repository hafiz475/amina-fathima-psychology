# Amina Fathima — Counselling Psychologist Website

## Agent Rules

1. Use Next.js App Router.
2. Use TypeScript.
3. Use Tailwind for layout and utility styling.
4. Use SCSS for custom visual systems.
5. Use Manrope as the primary typeface (400, 500, 600, 700).
6. Use Lucide React for icons.
7. Never introduce arbitrary brand colors — use the design tokens in `variables.scss`.
8. Use the design tokens defined in `src/styles/variables.scss`.
9. Use only verified profile content supplied by the client.
10. Do not invent qualifications, certifications or clinical claims.
11. Keep the UI responsive from 320px upward.
12. Keep animation subtle and accessible (use `prefers-reduced-motion`).
13. Run lint and typecheck after component changes.
14. Run production build before completion.
15. Do not add dependencies without justification.
16. Preserve the hero SVG as a reusable component in `components/hero/`.
17. Maintain semantic HTML and accessibility (ARIA labels, alt text, heading hierarchy).

## Color Palette

| Token              | Value     | Usage                        |
| ------------------ | --------- | ---------------------------- |
| `--color-primary`      | `#245C54` | Deep teal — primary brand    |
| `--color-primary-dark` | `#183F3A` | Dark teal — hover states     |
| `--color-teal`         | `#4D8C81` | Mid teal — accents           |
| `--color-sage`         | `#A9D8C7` | Sage — soft accents          |
| `--color-sage-light`   | `#DDEDE7` | Light sage — backgrounds     |
| `--color-mint`         | `#F3F8F6` | Very light mint — sections   |
| `--color-white`        | `#FFFFFF` | White — primary background   |
| `--color-text`         | `#263331` | Dark neutral — body text     |
| `--color-text-muted`   | `#687572` | Muted — secondary text       |
| `--color-border`       | `#DCE5E2` | Border — dividers            |

## Key Architecture

- `src/app/` — App Router pages
- `src/components/layout/` — Navbar, Footer, MobileMenu
- `src/components/hero/` — Hero section + SVG background
- `src/components/sections/` — All homepage sections
- `src/components/ui/` — Shared UI primitives
- `src/data/` — Static content data
- `src/styles/` — SCSS design system
- `public/illustrations/` — SVG hero artwork
- `public/images/profile/` — Professional photographs

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
