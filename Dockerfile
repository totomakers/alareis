# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.7.0
FROM node:${NODE_VERSION}-slim AS base

# Copy needed files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json /alareis/
COPY ./apps/alareis-api /alareis/apps/alareis-api
WORKDIR /alareis

# Setup env
ENV NODE_ENV="production"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install right pnpm version
ARG PNPM_VERSION=10.2.0
RUN corepack enable

## prod-deps
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# ================
# Build ==========
# ================

# Throw-away build stage to reduce size of final image
FROM base AS build-api

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build --filter=@alareis/api

# ==============
# Apps =========
# ==============

# Final stage for app image
FROM base AS api

# Copy built application
COPY --from=build-api /alareis/apps/alareis-api/dist /alareis/apps/alareis-api/dist
COPY --from=prod-deps /alareis/node_modules /alareis/node_modules
COPY --from=prod-deps /alareis/apps/alareis-api/node_modules /alareis/apps/alareis-api/node_modules
COPY --from=prod-deps /alareis/apps/alareis-api/package.json /alareis/apps/alareis-api/package.json

WORKDIR /alareis/apps/alareis-api

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["node", "./dist/index.js"]
