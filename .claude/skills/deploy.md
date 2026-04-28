---
name: deploy
description: Save your changes and deploy the site. Use when the user says things like "deploy", "publish", "go live", "push my changes", or "make it live".
user_invocable: true
---

# Deploy

The user wants to publish their changes to the live website. This is a simple process — save the changes to GitHub, and the rest happens automatically.

## What to do

1. Write a short commit message describing the changes, then run:
   ```bash
   .claude/tools/update-git.sh "Your commit message"
   ```

2. After pushing, tell the user:
   - Their changes have been saved and uploaded
   - The website will automatically update in a couple of minutes
   - The system builds a fresh version of the site and deploys it to the server — they don't need to do anything else

## How it works (for your context, not to dump on the user)

- Pushing to the `main` branch triggers a GitHub Actions workflow
- The workflow builds a Docker image, pushes it to GitHub Container Registry, creates a deployment manifest, and SSHs into the server to deploy
- The user doesn't need to know any of this unless they ask

## If something goes wrong

- If push fails, help the user resolve it (see update-git tool for details)
- If the user asks about deployment status, suggest they check the Actions tab on their GitHub repository
- Keep explanations simple and reassuring
