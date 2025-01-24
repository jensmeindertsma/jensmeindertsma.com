FROM node:23.6.1-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM base AS production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
RUN pnpm prune --prod

FROM base
WORKDIR /app
COPY --from=production /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY package.json ./

ENV NODE_ENV="production"
CMD ["npm", "run", "start"]
