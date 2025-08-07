FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack 
RUN corepack enable

FROM base AS setup

WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @alareis/frontend --docker

FROM base AS builder

ARG VITE_FRONTEND_URI
ENV VITE_FRONTEND_URI=$VITE_FRONTEND_URI

WORKDIR /app
COPY --from=setup /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=setup /app/out/full/ .

RUN --mount=type=secret,id=turbo_team,env=TURBO_TEAM \
    --mount=type=secret,id=turbo_token,env=TURBO_TOKEN \
    pnpm run build



FROM nginx:alpine AS runner

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY --from=setup /app/apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf