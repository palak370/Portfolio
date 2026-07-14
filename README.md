# Adv. Shailendra Yadav — TAX CONSULTANT & GST LITIGATION EXPERT

Portfolio website for Advocate Shailendra Yadav, a GST litigation and tax
consultant practising since 2002, representing clients across India
before Departmental Authorities, High Courts and the GST Appellate Tribunal
(GSTAT).

## Highlights

- **Interactive 3D portfolio book** in the hero — a CSS-3D hardcover with a
  full-bleed portrait cover, four photo pages and a branded back cover; click
  the right/left halves to turn pages.
- **GST Notice Assistant** — visitors pick their notice type (ITC mismatch,
  ASMT-10 scrutiny, blocked credit, audit/summons), see the risk and suggested
  defence, and can pre-fill the consultation form in one click.
- **Scroll-driven photo stack** on the About page — photographs land on a pile
  as you scroll; clicking the top print cycles it beneath the stack.
- Media gallery with lightbox, client testimonials, career timeline, and a
  contact page with a pinned map of the chamber office in Datia (M.P.).

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vite.dev) with [oxlint](https://oxc.rs) for linting
- [React Router 7](https://reactrouter.com)
- [lucide-react](https://lucide.dev) icons
- Hand-rolled CSS design system (no framework) — gold/ivory legal aesthetic

## Development

```bash
npm install
npm run dev       # start dev server on :5173
npm run lint      # oxlint
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build on :4173
```

All imagery lives in `public/images/` (web-optimized JPEG/PNG).
