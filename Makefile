PROJECT_JSON := project.json
PROJECT_NAME := $(shell cat $(PROJECT_JSON) | python3 -c "import sys,json; print(json.load(sys.stdin)['name'])")
SERVER_NAME := $(shell cat $(PROJECT_JSON) | python3 -c "import sys,json; print(json.load(sys.stdin)['server_name'])")
REPOSITORY := $(shell cat $(PROJECT_JSON) | python3 -c "import sys,json; print(json.load(sys.stdin)['repository'])")
PLATFORMS := $(shell cat $(PROJECT_JSON) | python3 -c "import sys,json; print(','.join(json.load(sys.stdin)['platforms']))")
TAG ?= latest
GIT_SHA := $(shell git rev-parse --short HEAD 2>/dev/null)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null)
SHA_TAG := $(GIT_BRANCH)-$(GIT_SHA)
PORT ?= 3000
IMAGE := $(REPOSITORY):$(TAG)
NGINX_CONF := nginx-project-$(PROJECT_NAME).conf
NGINX_SITES_DIR := /etc/nginx/sites-enabled

.PHONY: build push run stop clean info buildx up down generate-nginx manifest generate-manifest

## build: Build the Docker image for the current platform
build:
	docker build -t $(IMAGE) .

## buildx: Build multi-platform image and load it locally
buildx:
	docker buildx build --platform $(PLATFORMS) -t $(IMAGE) .

## push: Build multi-platform image and push to registry
push:
	docker buildx build --platform $(PLATFORMS) -t $(IMAGE) --push .

## run: Run the container locally on port 3000
run:
	docker run --rm -p 3000:3000 --name nexttemplate $(IMAGE)

## stop: Stop the running container
stop:
	docker stop nexttemplate

## clean: Remove the local image
clean:
	docker rmi $(IMAGE)

## up: Start dev environment with docker compose
up:
	docker compose up -d

## down: Stop dev environment
down:
	docker compose down

## info: Print build configuration
info:
	@echo "Repository: $(REPOSITORY)"
	@echo "Image:      $(IMAGE)"
	@echo "Platforms:  $(PLATFORMS)"

## generate-nginx: Generate nginx reverse proxy config
generate-nginx:
	@printf '%s\n' \
		'server {' \
		'    listen 80;' \
		'    server_name $(SERVER_NAME);' \
		'' \
		'    location / {' \
		'        proxy_pass http://localhost:$(PORT);' \
		'        proxy_http_version 1.1;' \
		'        proxy_set_header Upgrade $$http_upgrade;' \
		'        proxy_set_header Connection '\''upgrade'\'';' \
		'        proxy_set_header Host $$host;' \
		'        proxy_set_header X-Real-IP $$remote_addr;' \
		'        proxy_set_header X-Forwarded-For $$proxy_add_x_forwarded_for;' \
		'        proxy_set_header X-Forwarded-Proto $$scheme;' \
		'        proxy_cache_bypass $$http_upgrade;' \
		'    }' \
		'}' > $(NGINX_CONF)
	@echo "Generated $(NGINX_CONF)"

## manifest: Assemble deployment manifest tarball (no build/push)
manifest: generate-nginx
	@rm -rf manifest manifest.tar.gz
	@mkdir -p manifest
	@cat $(PROJECT_JSON) | python3 -c "import sys,json;d=json.load(sys.stdin);d['image']='$(IMAGE)';json.dump(d,sys.stdout,indent=2)" > manifest/project.json
	@cp $(NGINX_CONF) manifest/
	@cp deploy.py manifest/
	@chmod +x manifest/deploy.py
	@tar czf manifest.tar.gz -C manifest .
	@rm -rf $(NGINX_CONF)
	@echo "Created manifest.tar.gz"

## generate-manifest: Build, push, and create manifest tarball (uses git SHA tag)
generate-manifest:
	$(MAKE) push TAG=$(SHA_TAG)
	$(MAKE) manifest TAG=$(SHA_TAG)
