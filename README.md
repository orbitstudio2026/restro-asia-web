# Restro~Asia — website

Premium single-page site for Restro~Asia, Surat — *Flavours of Indo Chinese & Beyond*.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger) · Lenis

## Run

```bash
npm install
npm run dev
```

Build for production with `npm run build` (output in `dist/`).

## What's inside

- **Ramen showcase** (`src/components/RamenShowcase.tsx`) — pinned scroll scene; the background morphs per ramen, bowls rotate, ingredients float at parallax depths.
- **Interactive menu** (`src/data/menu.ts`) — full 2026 menu with prices, category tabs and a "Jain only" filter.
- **WhatsApp** — reservation form builds a prefilled message to +91 97370 20808; floating chat button and mobile action bar.
- **Menu PDF** — `public/Restro-Asia-Menu-2026.pdf` (compressed).
- **Brand** — official logo variants in `public/brand/`; tokens in `src/index.css` (`@theme`).
- **Imagery** — `public/gen/` generated with Higgsfield (AI-generated food and interior imagery, not photographs of the restaurant).

## Before launch

- Fill in `src/data/founder.ts` (name, photo, story, quote, year opened).
- Confirm the address in `src/components/Visit.tsx` (Vesu vs Piplod) and add opening hours.
- Replace the AI-generated interior image with a real photo of the restaurant.

## Claude Code skills

`.claude/skills/` contains GSAP skills (MIT), impeccable (Apache-2.0) and ui-ux-pro-max (MIT); see `.claude/skills/THIRD_PARTY_LICENSES.md`.
