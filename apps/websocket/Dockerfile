FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=1999

COPY package.json package-lock.json ./
COPY apps/websocket/package.json apps/websocket/package.json
RUN npm ci --omit=dev -w @vayhu/websocket

COPY apps/websocket apps/websocket

EXPOSE 1999

CMD ["npm", "run", "start", "-w", "@vayhu/websocket"]
