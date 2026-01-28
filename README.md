# website

personal site and blog built with react router, mdx, tailwind, and framer motion.

## setup

install dependencies:

```bash
bun install
```

## development

start the dev server:

```bash
bun run dev
```

open http://localhost:5173

## production

build the app:

```bash
bun run build
```

preview the build:

```bash
bun run preview
```

## how it works

- routes live in `app/routes.ts`
- the home page is in `app/routes/home.tsx`
- blog pages are mdx under `app/routes/blog`
- the blog layout is `app/routes/blog-layout.tsx`
- charts are rendered with recharts in `app/components/mdx-charts.tsx`
- code blocks use a custom component in `app/components/code-block.tsx`
- global styling w/ kanagawa in `app/app.css`

## notes

- mdx content can import react components directly
- charts and tables are styled to match the kanagawa palette
