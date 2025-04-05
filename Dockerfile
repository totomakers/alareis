# base
FROM node:22.14.0 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack 
RUN corepack enable

COPY . /monorepo
WORKDIR /monorepo

## prod-deps
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# ================
# Build ==========
# ================

# api
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
CMD [ "pnpm", "start:prod" ]
