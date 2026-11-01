# ikbalarslan.dev

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS.

- Edit projects in `src/data/projects.ts`, and name, email and links in `src/data/site.ts`.
- Add a screenshot by putting it in `public/` and setting `image` on a project. Otherwise a generated placeholder is shown.

```bash
npm run dev      # local dev
npm run build    # production build (standalone output)
docker build -t portfolio . && docker run -p 3000:3000 portfolio
```

Health check: `GET /api/health` returns `{"ok":true,"version":"<git sha>"}`.

## QA tests

Playwright tests in `e2e/` cover every page, link and button on desktop and mobile
viewports, and fail on any console error.

```bash
npm run build && npm run test:e2e                          # against a local `next start`
BASE_URL=https://acceptance.ikbalarslan.dev npm run test:e2e  # against a deployed host
npm run test:e2e -- --grep @smoke                          # smoke subset only
```

## Release pipeline

`.github/workflows/pipeline.yml`:

| Trigger | Steps |
|---|---|
| Pull request | lint + typecheck → build image `sha-<sha>` → deploy to **acceptance** → full QA suite |
| Merge to `main` | same as above, then deploy the **same image** to **production** → smoke tests → automatic rollback if they fail |

- Acceptance: https://acceptance.ikbalarslan.dev (`~/portfolio-acceptance` on the VPS, `noindex`)
- Production: https://ikbalarslan.dev (`~/portfolio-deploy` on the VPS)
- Acceptance is shared, so acceptance runs queue instead of overwriting each other.
- `deploy/remote-deploy.sh` waits for the container to be healthy and rolls back to the
  previous tag if it isn't. To roll production back by hand:
  `bash ~/portfolio-deploy/remote-deploy.sh rollback ~/portfolio-deploy portfolio`
- QA reports (HTML, traces, screenshots) are attached to each workflow run as artifacts.
