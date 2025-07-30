FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack 
RUN corepack enable


FROM base AS builder

WORKDIR /app

RUN pnpm add -g turbo
COPY . .
RUN turbo prune @alareis/api --docker

FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN --mount=type=secret,id=turbo_team,env=TURBO_TEAM \
    --mount=type=secret,id=turbo_token,env=TURBO_TOKEN \
    pnpm run build


FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

WORKDIR /app/apps/api
EXPOSE 8080
CMD ["pnpm", "start:prod"]