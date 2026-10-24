# Atelier

A website builder for architecture, interiors and design studios. Pick a
template, edit it visually, save your work to your account, and export it
as a static site you can host anywhere.

## What it does

- **Templates.** ~19 starter templates for studio sites (hero, gallery,
  about, services, projects, testimonials, contact, nav, footer), each
  built from the same section components so switching palette or font
  restyles the whole site at once.
- **Visual editor.** Drag-free, panel-based editing: reorder or hide
  sections, edit text and images, change variant/spacing/alignment, pick a
  colour palette and font pairing, with live desktop/tablet/mobile preview.
- **Accounts.** Sign up / sign in (via Clerk), save designs to your
  account, and come back to rename, duplicate or delete them later.
- **Export.** Download a finished design as a plain HTML + CSS + JS `.zip`
   no build step, no server required  ready to drag onto Netlify Drop,
  push to Vercel, or publish via GitHub Pages.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, plain
  JavaScript (not TypeScript)
- [Clerk](https://clerk.com) for authentication
- [Neon](https://neon.tech) (Postgres) + [Drizzle ORM](https://orm.drizzle.team)
  for saved designs
- [Tailwind CSS](https://tailwindcss.com) v4, [GSAP](https://gsap.com) and
  [Motion](https://motion.dev) for animation
- [fflate](https://github.com/101arrowz/fflate) for building the export zip

> This project's Next.js version has breaking changes from what most
> tooling (including AI assistants) expects. See [AGENTS.md](AGENTS.md).

## Getting started

```bash
npm install
```

Create `.env.local` with:

```bash
# Clerk  https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Postgres  e.g. a Neon project's pooled connection string
DATABASE_URL=
```

Push the database schema (creates the `designs` table):

```bash
npm run db:push
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project layout

```
app/                   routes: home/editor (single page), sign-in, sign-up,
                        /api/export
components/
  canvas/               the section components every template is built
                        from (Nav, Hero, Gallery, About, …)  also what
                        gets exported
  editor/               the visual editor UI (toolbar, layers, properties)
  gallery/, home/        the marketing homepage + template picker
  publish/               preview mode and the export dialog
data/                   starter templates, image list, colour/font themes
db/                     Drizzle schema + client (Neon)
lib/
  actions/designs.js    server actions: save/list/get/rename/duplicate/
                        delete a saved design, scoped to the signed-in user
  export/               builds the exported site's HTML/CSS/JS/zip
  store.js              the editor's state (React context + reducer)
  validation/design.js  validates a design's shape before it's saved
```

## Useful scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also rebuilds `lib/export/site.css`) |
| `npm run db:push` | Push the Drizzle schema to the database |
| `npm run db:studio` | Open Drizzle Studio to browse the database |
| `npm run build:export-css` | Rebuild the standalone CSS used in exports |

## Deploying

Deployed on [Vercel](https://vercel.com). Add the same environment
variables as above (the `DATABASE_URL` from your production Postgres) in
**Project → Settings → Environment Variables**, then push to the branch
Vercel watches.

Clerk's production instance needs a custom domain you control DNS for 
a default `*.vercel.app` domain can't verify it. Until then, Clerk's
development keys work fine in production, just with its dev-mode banner
and lower rate limits.
