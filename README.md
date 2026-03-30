
# AI The Spire

Private, offline AI chat powered by Ollama (no cloud, no tracking)

---

## Android APK

Build the app:

```sh
flutter build apk --release
```

Install on device:

```sh
flutter install
```

## Windows MSI

Build the app:

```sh
flutter build windows --release
```

Package to MSIX (requires msix):

```sh
dart pub global activate msix
msix create --package-name=com.aithespire.app --output=build/ai_thespire.msix
```

## Build from source

```sh
flutter pub get && dart run build_runner build
```

## Links

- Ollama library: https://ollama.com/library
- Termux: https://termux.com/

## Scripts

- `npm run dev` - start Next.js development server
- `npm run build` - build production app
- `npm run start` - run production build locally
- `npm run lint` - run ESLint checks
- `npm run format` - format source with Prettier
- `npm run format:check` - verify formatting
- `npm test` - lint + build

## Connect

- GitHub: [github.com/Lukas-Bohez](https://github.com/Lukas-Bohez)
- Sponsors: [github.com/sponsors/Lukas-Bohez](https://github.com/sponsors/Lukas-Bohez)
- Support: [buymeacoffee.com/LukasBohez](buymeacoffee.com/OrokaConner)
- Personal tool: [quizthespire.com](https://quizthespire.com)
- LinkedIn: [linkedin.com/in/lukas-bohez](https://www.linkedin.com/in/lukas-bohez)
- Email: lukasbohez@gmail.com


## Featured Repositories

- [AI The Spire](https://github.com/Lukas-Bohez/aithespire)
- [Convert the Spire Reborn](https://github.com/Lukas-Bohez/ConvertTheSpireFlutter)
- [QuizTheSpire](https://github.com/Lukas-Bohez/QuizTheSpire)
- [opdracht-1-howest](https://github.com/Lukas-Bohez/opdracht-1-howest)
- [mct-interaction-design/view-transition-intro-Lukas-Bohez](https://github.com/Lukas-Bohez/mct-interaction-design/tree/main/view-transition-intro-Lukas-Bohez)

## Deploy

### Option 1: Static export (Apache friendly)

1. Build and export static files:
   ```bash
   npm run build
   npm run export
   ```
2. This generates an `out` directory with an `index.html` and static asset tree.
3. Copy `out/` into your Apache docroot (e.g., `/var/www/quizthespire.com/`).
4. Ensure `DirectoryIndex index.html` is set, and (optionally) add this in `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^(.*)$ /index.html [L,QSA]
   ```
5. Visit your site at `https://quizthespire.com`.

### Option 2: Next.js server reverse proxy

If you prefer dynamic mode, run `npm run start` on a node server and reverse proxy through Apache:

```apache
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
```

---

Deploy safely to Vercel or any Next.js compatible hosting. CI automatically validates each commit.

---

Thank you for visiting my portfolio codebase. Feedback is welcome!

## Updated About Me (Added by AI sync)

- AI setup: repository synchronized with https://github.com/Lukas-Bohez/lbohez-portfolio
- Latest skills: added notes about full-stack Next.js portfolio + static export deployment.
- Personal intent: maintain accessible open-source self-hosted tools and media pipelines.
>>>>>>> 1e48e36 (Initial commit)
