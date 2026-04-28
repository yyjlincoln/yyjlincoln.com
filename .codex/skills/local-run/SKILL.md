---
name: local-run
description: Start or stop the website locally with Docker so the user can preview changes before deploying. Use when the user asks to run locally, start the site, preview it, test it, open it, stop it, or shut it down.
---

# Local Run

## Overview

Use this skill when the user wants a local preview of the website. The normal path is Docker-based via `make up` and `make down`.

## Starting the preview

1. Check whether Docker is running:
   ```bash
   docker info
   ```
2. If Docker is not running, stop and tell the user to open Docker Desktop first.
3. Check whether the app is already up:
   ```bash
   docker compose ps
   ```
4. If it is not already running, start it:
   ```bash
   make up
   ```
5. Check recent logs to confirm startup:
   ```bash
   docker compose logs --tail=20
   ```
6. Open `http://localhost:3000` when appropriate.
7. Tell the user the preview is running locally and code changes should appear after refresh.

## Stopping the preview

Run:

```bash
make down
```

Then tell the user the local preview has been stopped.

## Troubleshooting

- If port `3000` is in use, free it and retry startup.
- If logs show dependency or package-cache issues, use a clean restart with:
  ```bash
  docker compose down -v
  make up
  ```
- If styling errors mention shadcn, treat that as a stale package cache issue and use the same clean restart.
- If the page errors after startup, inspect `docker compose logs --tail=50` and fix the underlying code issue.

## Notes

- If the user just says "run it" or "start it", assume they mean a local preview unless the conversation clearly indicates deployment.
- Keep explanations simple. Prefer "local preview" to "Docker container".

## References

- Legacy Claude skill: `.claude/skills/local-run.md`
- Local run commands: `Makefile`, `docker-compose.yml`
