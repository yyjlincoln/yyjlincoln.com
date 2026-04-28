# Next.js Deploy Template

## Purpose

This repository is a Next.js website with automatic deployment on push to `main`.
The user may not be technical, so explain actions in simple language by default. Prefer "save and publish" over "commit and push", "website" over "container", and "preview" over "dev server".

## Stack

- Next.js 16 with App Router
- Tailwind CSS v4 and shadcn/ui
- Bun for package management
- Docker for local development and production packaging
- GitHub Actions for deployment

## Project structure

- `app/`: pages and layouts
- `components/ui/`: shadcn/ui components
- `lib/`: shared utilities
- `public/`: static assets
- `Makefile`: common local and deploy commands
- `Dockerfile`: production image build
- `docker-compose.yml`: local preview environment
- `project.json`: project metadata
- `deploy.py`: server-side deployment helper

## Workflow references

This repo includes both Codex-style skills and legacy Claude workflow docs. Prefer the Codex skills first and use the Claude files as supporting references when needed:

- `.codex/skills/local-run/SKILL.md`: how to start or stop the local preview
- `.codex/skills/deploy/SKILL.md`: how to publish changes
- `.claude/tools/update-git.md`: what the Git helper does
- `.claude/tools/update-git.sh`: helper script for staging, committing, and pushing
- `.claude/skills/local-run.md`: legacy Claude version of the local preview workflow
- `.claude/skills/deploy.md`: legacy Claude version of the deploy workflow

## Local preview

When the user wants to run the site locally, follow `.codex/skills/local-run/SKILL.md`.

Operational defaults:

- Check `docker info` before trying to start anything
- If Docker is not running, tell the user to open Docker Desktop first
- Use `make up` to start the preview
- Use `docker compose logs --tail=20` to confirm startup
- Open `http://localhost:3000` when appropriate
- Use `make down` to stop the preview

If styling or dependency errors mention shadcn or stale packages, a clean restart with `docker compose down -v` and `make up` is the preferred recovery path.

## Deployment

When the user wants to deploy, publish, or push their changes live, follow `.codex/skills/deploy/SKILL.md`.

Operational defaults:

- Use `.claude/tools/update-git.sh "commit message"` to save and push changes
- If no message is provided, the script defaults to `Update site`
- After push, tell the user the website will update automatically in a couple of minutes
- If they ask about progress, point them to the GitHub Actions tab

Do not dump the full CI/CD internals on the user unless they ask.

## Working style

- Prefer `bun` over `npm`
- Keep explanations short and plain-English unless the user asks for technical detail
- For page edits, start in `app/`
- For UI component work, check `components/ui/`
- If the user says "run it" without more context, assume they want a local preview
- If the user says "deploy" or "publish", assume they want the Git push workflow
