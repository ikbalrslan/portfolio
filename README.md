# ikbalarslan.dev

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS.

- Edit projects in `src/data/projects.ts`, and name, email and links in `src/data/site.ts`.
- Add a screenshot by putting it in `public/` and setting `image` on a project. Otherwise a generated placeholder is shown.

```bash
npm run dev      # local dev
npm run build    # production build (standalone output)
docker build -t portfolio . && docker run -p 3000:3000 portfolio
```

Health check: `GET /api/health` returns `{"ok":true}`.
