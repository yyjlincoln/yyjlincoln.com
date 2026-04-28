---
name: update-git
description: Save all changes, upload them to GitHub, and trigger an automatic deployment. Use this whenever the user wants to publish or deploy their changes.
---

# Update Git

Run the bash script at `.claude/tools/update-git.sh` to save and push changes.

## Usage

```bash
.claude/tools/update-git.sh "Your commit message here"
```

If no message is given, it defaults to "Update site".

The script will:
1. Check if there are any changes to save
2. Stage everything
3. Commit with the provided message
4. Push to GitHub (pulls and retries if needed)
5. Print a confirmation that deployment is in progress

After running the script, tell the user in simple terms:
- What changes were saved
- That the site will update automatically in a couple of minutes
- They can check progress in the Actions tab on GitHub if they're curious
