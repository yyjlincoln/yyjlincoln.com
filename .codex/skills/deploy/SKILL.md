---
name: deploy
description: Save local changes, push them to GitHub, and trigger the production deployment. Use when the user asks to deploy, publish, go live, push their changes, or make the website live.
---

# Deploy

## Overview

Use this skill when the user wants the live website updated. The repo deploys automatically after a successful push to `main`, so the task is to save the current changes and push them cleanly.

## Workflow

1. Write a short commit message that matches the current changes.
2. Run:
   ```bash
   .claude/tools/update-git.sh "commit message"
   ```
3. If the script succeeds, tell the user:
   - their changes have been saved and uploaded
   - the website should update automatically in a couple of minutes
   - they do not need to do anything else unless they want to check GitHub Actions
4. If the user asks about status, point them to the repository Actions tab.

## Notes

- Keep the user-facing explanation simple. Prefer "save and publish" over "commit and push".
- Do not explain the full CI/CD pipeline unless the user asks.
- The helper script already stages all changes, commits, retries a failed push with `git pull --rebase`, and prints a deployment message.

## Troubleshooting

- If push fails, inspect the Git error and resolve it before retrying.
- If there are no changes, tell the user there was nothing new to publish.
- If the user wants deeper detail, the deployment flow is defined in `.github/workflows/build-and-deploy.yml`.

## References

- Legacy Claude skill: `.claude/skills/deploy.md`
- Git helper doc: `.claude/tools/update-git.md`
- Git helper script: `.claude/tools/update-git.sh`
