# Desiglo

A cinematic dark website for a custom web design & development studio, built with
React, TypeScript, Vite, and Tailwind CSS. Includes a lightweight hash router
(no react-router dependency) covering Home, Portfolio, Services, Pricing,
About, Contact, a multi-step project request form, FAQ, and legal pages, plus
a Three.js wireframe-cube background.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

```
index.html
src/
  main.tsx      - React entry point
  App.tsx       - the entire site (components, pages, router)
  index.css     - Tailwind directives
tailwind.config.js
postcss.config.js
vite.config.ts
tsconfig.json
```

`App.tsx` is intentionally a single file containing the whole app — all
components, page-level views, and the hash router. Feel free to split it into
multiple files/folders as the project grows.
