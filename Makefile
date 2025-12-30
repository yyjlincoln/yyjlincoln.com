# =============================================================================
# Makefile for yyjlincoln.com (Frontend)
# =============================================================================

IMAGE_NAME ?= yyjlincoln-frontend
VERSION ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo "dev")
CONTAINER_NAME ?= yyjlincoln-frontend-prod

# Production configuration
PORT ?= 80
API_URL ?= https://apis.yyjlincoln.com

.PHONY: help up down build logs clean up-prod down-prod logs-prod

help:
	@echo "Available targets:"
	@echo "  make up        - Build and run container in development mode"
	@echo "  make down      - Stop and remove dev container"
	@echo "  make logs      - Follow dev container logs"
	@echo "  make build     - Build production image"
	@echo "  make up-prod   - Run production container (PORT=80 API_URL=...)"
	@echo "  make down-prod - Stop production container"
	@echo "  make logs-prod - Follow production container logs"
	@echo "  make clean     - Remove containers and images"

# Development
up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f

# Production build
build:
	docker build \
		--target prod \
		--build-arg VERSION=$(VERSION) \
		--build-arg VUE_APP_API_URL=$(API_URL) \
		-t $(IMAGE_NAME):$(VERSION) \
		-t $(IMAGE_NAME):latest \
		.
	@echo "Built $(IMAGE_NAME):$(VERSION)"

# Production run
up-prod: build
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):80 \
		$(IMAGE_NAME):latest
	@echo "Running $(CONTAINER_NAME) on port $(PORT)"

down-prod:
	-docker stop $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)

logs-prod:
	docker logs -f $(CONTAINER_NAME)

# Cleanup
clean:
	docker compose down -v --rmi local
	-docker stop $(CONTAINER_NAME) 2>/dev/null
	-docker rm $(CONTAINER_NAME) 2>/dev/null
	-docker rmi $(IMAGE_NAME):$(VERSION) $(IMAGE_NAME):latest 2>/dev/null
