# Next.js Deploy Template

## About this project

This is a website built with Next.js. It's set up so that whenever changes are pushed to GitHub, the site automatically builds and deploys to a server. The user of this project may not be technical — always explain things in simple, friendly language. Avoid jargon unless the user specifically asks for technical details.

## Key concepts (for Claude's context)

- **Next.js 16** with App Router — pages live in the `app/` directory
- **Tailwind CSS v4** + **shadcn/ui** for styling and components
- **Bun** is the package manager (use `bun` instead of `npm`)
- **Docker** is used for both local development and production deployment
- **Standalone output** — Next.js builds to a self-contained folder for Docker
- Deployment is fully automated via GitHub Actions on push to `main`

## Project structure

```
app/              → Pages and layouts (this is where the website content lives)
components/ui/    → Reusable UI components (from shadcn/ui)
lib/              → Utility functions
public/           → Static files (images, icons)
Makefile          → Commands for building, running, and deploying
Dockerfile        → How the production container is built
docker-compose.yml → Local development setup
project.json     → Project name, domain, and registry config
deploy.py        → Server-side deployment script
```

## How deployment works

1. Changes are pushed to the `main` branch on GitHub
2. GitHub Actions automatically builds a Docker image
3. The image is pushed to GitHub Container Registry
4. A deployment manifest is created and sent to the server via SSH
5. The server pulls the new image and restarts the container

The user just needs to push their changes — everything else is automatic.

## Common tasks

### Adding or editing pages
- Edit files in the `app/` directory
- The main homepage is `app/page.tsx`
- The layout wrapper is `app/layout.tsx`

### Adding shadcn/ui components
```
bunx shadcn@latest add <component-name>
```
Components are installed to `components/ui/`.

### Running locally
Use the `/local-run` skill or run `make up` manually. The site will be at http://localhost:3000.

### Deploying
Use the `/deploy` skill. This saves changes to GitHub, and the CI pipeline handles the rest.

## Important notes

- When working with CSS, the `shadcn/tailwind.css` import requires the `shadcn` package in node_modules. If Docker gives CSS errors, run `docker compose down -v && make up` to clear the stale package cache.
- The docker-compose dev setup uses a named volume for `node_modules`. After adding new packages, this volume may need to be recreated with `-v`.
- Always communicate in simple terms. Say "save and publish" instead of "commit and push". Say "the website" instead of "the container". Say "preview" instead of "dev server".
