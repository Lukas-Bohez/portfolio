# CMS Onderzoek + PoC (Next.js Portfolio)

Dit is een aparte CMS demo naast de gewone portfolio-homepage.
Route in de app: `/cms-demo/`.

## Fase 1 - Vooronderzoek

| CMS        | Type                             | Gratis tier      | Next.js integratie                              | Pluspunten                                                      | Minpunten                                    | Geschikt voor portfolio?                    |
| ---------- | -------------------------------- | ---------------- | ----------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------- |
| Sanity     | Headless SaaS                    | Ja               | Zeer sterk (`@sanity/client`, GROQ, goede docs) | Flexibel schema, snel op te zetten, sterke developer experience | Querytaal (GROQ) is nieuw voor beginners     | Ja, zeer geschikt voor projecten/blog/about |
| Contentful | Headless SaaS                    | Ja (limieten)    | Sterk (REST/GraphQL, officiële guides)          | Gebruiksvriendelijke UI, volwassen platform                     | Gratis tier kan sneller limiteren            | Ja, goed voor stabiele contentmodellen      |
| Strapi     | Headless self-hosted (ook cloud) | Ja (self-hosted) | Goed (REST/GraphQL)                             | Volledige controle, eigen hosting, uitbreidbaar                 | Meer beheerwerk (hosting, updates, security) | Ja, vooral als je alles zelf wil beheren    |

### Gekozen CMS: Sanity

Waarom:

- Beste balans tussen snelheid van opstart en flexibiliteit.
- Erg goede match met Next.js App Router en Server Components.
- Gratis tier is ruim genoeg voor een portfolio.

## Fase 2 - Proof of Concept

Wat werkt in deze PoC:

- Minstens 1 pagina haalt content op uit CMS: `/cms-demo/`.
- Content kan in Sanity aangepast worden zonder codewijziging.
- App draait lokaal met `npm run dev`.
- Dit is opgezet als basis voor echte portfolio-content.

## Fase 2b - SSR, caching en Cloudinary

### Server-side data in Next.js 16

- De pagina `/cms-demo/` is een **Server Component**.
- Projectlijst gebruikt server-side fetch met `revalidate: 3600` omdat dit zelden verandert.
- Profiel/intro-content gebruikt `revalidate: 300` zodat updates sneller zichtbaar zijn.
- Deze aanpak blijft compatibel met de bestaande static export pipeline (`npm run update:portfolio`).

### Waarom deze strategie?

- Projectkaarten zijn relatief statisch -> cached ophalen.
- Introtekst kan vaker wijzigen tijdens development/demos -> korte cache in minuten.
- De hoofdportfolio draait op static export, daarom is `fetch(..., { next: { revalidate } })` hier de pragmatische keuze.

### Cloudinary

- `next.config.ts` bevat `remotePatterns` voor `res.cloudinary.com`.
- Afbeeldingen worden via `<Image>` gerenderd.
- URL-transformatie gebruikt o.a. `f_auto,q_auto,w_1200,h_800,c_fill` voor optimalisatie.

## Lokale setup

1. Installeer dependencies:

```bash
npm install
```

2. Zet environment variabelen:

```bash
cp .env.example .env.local
```

3. Start portfolio app:

```bash
npm run dev
```

4. Open de CMS demo:

- `http://localhost:3000/cms-demo/`

## Sanity Studio setup

Gebruik exact jouw project:

```bash
npm create sanity@latest -- --project 3a5uodlw --dataset production --template clean --typescript --output-path studio-lukas-bohez-portfolio
cd studio-lukas-bohez-portfolio
npm run dev
```

Daarna in browser:

- `http://localhost:3333`

## Voorbeeld contentmodel (Sanity)

Gebruik bv. `projectDemo` met velden:

- `title` (string)
- `summary` (text)
- `stack` (array van strings)
- `imageUrl` (string, Cloudinary URL)
- `demoUrl` (url)

En een `profileDemo` document met:

- `title` (string)
- `bio` (text)

## Screenshots / previews

Deze repo bevat gegenereerde preview-afbeeldingen:

- `public/cms-demo/cms-pipeline-preview.svg`
- `public/cms-demo/sanity-dashboard-preview.svg`
- `public/cms-demo/ai-workspace-preview.svg`
- `public/cms-demo/ai-roadmap-preview.svg`

Cloudinary-hosted varianten zijn geupload naar:

- `https://res.cloudinary.com/dmefzpaea/image/upload/v1776524472/portfolio/cms-demo/ai-workspace-preview.svg`
- `https://res.cloudinary.com/dmefzpaea/image/upload/v1776524475/portfolio/cms-demo/ai-roadmap-preview.svg`

Gebruik je eigen Studio-screenshots voor de finale presentatie als je wil.

## Presentatie (5 min) - korte structuur

1. Waarom Sanity gekozen tegenover Contentful/Strapi.
2. Toon `/cms-demo/` en leg Server Component + caching kort uit.
3. Pas content in Studio aan en refresh de pagina.
4. Toon Cloudinary-afbeelding met geoptimaliseerde URL.
