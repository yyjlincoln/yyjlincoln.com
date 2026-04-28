---
name: local-run
description: Start or stop the local development server using Docker. Use when the user says things like "run locally", "start the site", "preview", "test it", "open it", "stop the server", or "shut it down".
user_invocable: true
---

# Local Run

The user wants to run the website on their own computer so they can see their changes before deploying.

## Starting the local server

1. First, check if Docker is running:
   ```
   docker info
   ```
   If Docker is not running, tell the user: "Docker isn't running. Please open the Docker Desktop app first, then ask me to try again."

2. Check if a container is already running:
   ```
   docker compose ps
   ```
   If the server is already running, skip to step 4.

3. Start the server:
   ```
   make up
   ```
   Wait a few seconds for it to start, then check the logs briefly to make sure there are no errors:
   ```
   docker compose logs --tail=20
   ```

4. Open the browser for the user:
   ```
   open http://localhost:3000
   ```

5. Tell the user:
   - The site is now running on their computer
   - They can see it in their browser at localhost:3000
   - Any changes they make to the code will show up automatically (just refresh the page)
   - When they're done, they can ask you to stop it

## Stopping the local server

1. Run:
   ```
   make down
   ```

2. Tell the user the server has been stopped.

## Troubleshooting

- **Port 3000 already in use**: Something else is using that port. Run `lsof -ti:3000 | xargs kill -9` to free it up, then try `make up` again. Tell the user you cleared a conflicting process.
- **Docker not running**: Tell the user to open Docker Desktop and try again.
- **Build errors in logs**: Read the error carefully. If it's a dependency issue, try `docker compose down -v && make up` to do a clean install (the `-v` removes the old package cache). Explain to the user that you're doing a fresh setup.
- **CSS/styling errors mentioning shadcn**: Run `docker compose down -v && make up` — this is usually a stale package cache issue.
- **Page shows an error**: Check `docker compose logs --tail=50` for details and fix the underlying code issue.

## Important

- Always check if Docker is running before trying anything
- If the user just says "run it" or "start it", assume they mean locally
- If the user says "stop" or "shut down", stop the server
- Keep explanations simple — "the local server" or "your preview" rather than "Docker container"
