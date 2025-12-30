# =============================================================================
# Frontend Dockerfile for yyjlincoln.com (Vue.js)
# =============================================================================

# -----------------------------------------------------------------------------
# Development Stage (use with bind mount via docker-compose)
# -----------------------------------------------------------------------------
FROM node:16-alpine AS dev

WORKDIR /app

# Expose dev server port
EXPOSE 8080

# Install dependencies and start dev server
# Source code is provided via bind mount in docker-compose
CMD ["sh", "-c", "yarn install && yarn serve --host 0.0.0.0"]

# -----------------------------------------------------------------------------
# Build Stage (for production)
# -----------------------------------------------------------------------------
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments
ARG VERSION=dev
ARG VUE_APP_API_URL=https://apis.yyjlincoln.com
ENV VERSION=${VERSION}
ENV VUE_APP_API_URL=${VUE_APP_API_URL}

# Update version and build for production
RUN yarn update:version && yarn build

# -----------------------------------------------------------------------------
# Production Stage
# -----------------------------------------------------------------------------
FROM nginx:alpine AS prod

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
