# Portfolio

[![Vercel](https://vercel.com/button)](https://vercel.com/)
[![Live Portfolio](https://img.shields.io/badge/live-quizthespire.com%2FLukasBohez-0ea5e9?style=for-the-badge)](https://quizthespire.com/LukasBohez/)

This is the Next.js portfolio for Lukas Bohez. It is exported to static files and published through the Apache-hosted `quizthespire.com/LukasBohez` path.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the publish flow and verification notes.

## Setup

1. Clone the repository.
2. Run `cp .env.example .env.local`.
3. Fill every variable in `.env.local`.
4. Install dependencies with `npm install`.
5. Start development with `npm run dev`.
6. Run quality checks with `npm run lint` and `npm run build`.

## Lighthouse Evidence

Latest production audit against `https://quizthespire.com/LukasBohez/`:

| Audit Date (UTC)         | Performance | Accessibility | Best Practices | SEO |
| ------------------------ | ----------- | ------------- | -------------- | --- |
| 2026-04-26T09:35:00.000Z | 97          | 100           | 96             | 100 |
| 2026-04-26T07:09:55.000Z | 94          | 100           | 96             | 100 |

Previous baseline: 2026-04-26T06:43:30.520Z | 82 | 100 | 100 | 100

Phase 1 improvements: +3 perf (+15 from baseline) via design tokens, compound components, custom hooks, responsive images.

## Deployment Verification

The `npm run update:portfolio` workflow now verifies static export checksums and confirms the live `/LukasBohez/` page serves the current build id after publish.
