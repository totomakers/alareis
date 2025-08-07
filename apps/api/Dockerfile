FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack 
RUN corepack enable


FROM base AS setup

WORKDIR /app

RUN pnpm add -g turbo
COPY . .
RUN turbo prune @alareis/api --docker

FROM base AS builder

WORKDIR /app

COPY --from=setup /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=setup /app/out/full/ .

RUN --mount=type=secret,id=turbo_team,env=TURBO_TEAM \
    --mount=type=secret,id=turbo_token,env=TURBO_TOKEN \
    pnpm run build


FROM base AS runner
WORKDIR /app

COPY --from=builder /app .

WORKDIR /app/apps/api
EXPOSE 8080
CMD ["pnpm", "start:prod"]