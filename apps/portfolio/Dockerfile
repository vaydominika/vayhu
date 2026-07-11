FROM node:22-alpine AS build

WORKDIR /app
ARG NEXT_PUBLIC_DOODLE_WS_HOST
ENV NEXT_PUBLIC_DOODLE_WS_HOST=$NEXT_PUBLIC_DOODLE_WS_HOST

COPY package.json package-lock.json ./
COPY apps/portfolio/package.json apps/portfolio/package.json
COPY apps/websocket/package.json apps/websocket/package.json
RUN npm ci

COPY apps/portfolio apps/portfolio
RUN npm run build -w @vayhu/portfolio

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
COPY apps/portfolio/package.json apps/portfolio/package.json
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/apps/portfolio/.next apps/portfolio/.next
COPY --from=build /app/apps/portfolio/public apps/portfolio/public
COPY --from=build /app/apps/portfolio/next.config.ts apps/portfolio/next.config.ts

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "@vayhu/portfolio"]
