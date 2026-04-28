#!/usr/bin/env bash
# update-git: Stage all changes, commit with a message, push to GitHub.
# Usage: update-git.sh "commit message"
# If no message is provided, a default one is used.

set -euo pipefail

MSG="${1:-Update site}"

# Check for changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "Nothing to deploy — no changes found."
  exit 0
fi

# Stage, commit, push
git add -A
git commit -m "$MSG"

if ! git push 2>/tmp/git-push-err; then
  echo "Push failed, attempting to sync with remote..."
  git pull --rebase
  git push
fi

echo ""
echo "Changes pushed. Deployment is in progress — the site will update in a couple of minutes."
