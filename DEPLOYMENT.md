# Deployment

This portfolio is built as a static export and published behind Apache at `https://quizthespire.com/portfolio/`.

## Source Of Truth

- App source: `/home/student/Project/Portfolio`
- Export and publish workflow: `/home/student/Project/project-one`
- Live serving path: `/var/www/quizthespire.com/portfolio`

## Publish Flow

Run the combined rebuild and publish script from the project-one repo:

```bash
cd /home/student/Project/project-one && npm run update:portfolio
```

That script rebuilds the Portfolio export, copies the generated files into the Apache-served portfolio directory, and verifies the live site after deployment.

## Validation

Before shipping changes, run:

```bash
cd /home/student/Project/Portfolio && npm run build
```

If the build is clean, follow up with the publish script above and confirm the live portfolio URL still responds correctly.
