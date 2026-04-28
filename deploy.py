#!/usr/bin/env python3
"""Manifest-based deploy script.

Reads project.json from the same directory as this script, pulls the Docker
image, restarts the container, and updates the nginx config.
"""

import json
import shutil
import subprocess
import sys
from pathlib import Path

ENV_DIR = Path("/opt")


def run(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    print(f"+ {' '.join(cmd)}")
    return subprocess.run(cmd, check=check)


def main() -> None:
    manifest_dir = Path(__file__).resolve().parent
    config_path = manifest_dir / "project.json"

    if not config_path.exists():
        print(f"Error: {config_path} not found", file=sys.stderr)
        sys.exit(1)

    config = json.loads(config_path.read_text())

    image = config.get("image")
    name = config.get("name")
    port = config.get("port", 3000)

    if not image:
        print("Error: 'image' key missing from project.json", file=sys.stderr)
        sys.exit(1)
    if not name:
        print("Error: 'name' key missing from project.json", file=sys.stderr)
        sys.exit(1)

    # Check prerequisites
    if not shutil.which("docker"):
        print("Error: docker is not installed", file=sys.stderr)
        sys.exit(1)

    # Pull the image
    run(["docker", "pull", image])

    # Stop and remove existing container
    run(["docker", "stop", name], check=False)
    run(["docker", "rm", name], check=False)

    # Start new container
    env_file = ENV_DIR / name / ".env"
    docker_cmd = [
        "docker", "run", "-d",
        "--restart=unless-stopped",
        "-p", f"{port}:3000",
        "--name", name,
    ]
    if env_file.exists():
        docker_cmd += ["--env-file", str(env_file)]
        print(f"Using env file: {env_file}")
    else:
        print(f"Warning: {env_file} not found, running without env file")
    docker_cmd.append(image)
    run(docker_cmd)
    print(f"Container {name} is running on port {port}")

    # Generate and install nginx config
    server_name = config.get("server_name")
    if not server_name:
        print("Warning: 'server_name' missing from project.json, skipping nginx update")
    else:
        nginx_conf = manifest_dir / f"nginx-project-{name}.conf"
        nginx_conf.write_text(
            f"""server {{
    listen 80;
    server_name {server_name};
    return 301 https://$host$request_uri;
}}

server {{
    listen 443 ssl;
    server_name {server_name};

    ssl_certificate /opt/ssl/{server_name}.pem;
    ssl_certificate_key /opt/ssl/{server_name}.key;

    location / {{
        proxy_pass http://localhost:{port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }}
}}
"""
        )
        run(["sudo", "update-nginx-conf", nginx_conf.name, str(nginx_conf)])


if __name__ == "__main__":
    main()
