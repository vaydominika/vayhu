# vay.hu

Monorepo for the portfolio and the shared doodle websocket.

## Apps

- `apps/portfolio` - Next.js portfolio site.
- `apps/websocket` - self-hosted websocket service for the doodle wall.

## Local Development

Install dependencies from the repo root:

```bash
npm install
```

Run the portfolio:

```bash
npm run dev:portfolio
```

Run the websocket service in a second terminal:

```bash
npm run dev:websocket
```

The portfolio connects to `ws://127.0.0.1:1999` automatically on localhost. For a custom target, set:

```bash
NEXT_PUBLIC_DOODLE_WS_HOST=ws://127.0.0.1:1999
```

## Docker Compose

```bash
docker compose up --build
```

Services:

- Portfolio: `http://localhost:3000`
- Websocket health check: `http://localhost:1999/health`

## Coolify

Use two services from this repo:

- `portfolio`: Dockerfile `apps/portfolio/Dockerfile`, domain `vay.hu`
- `websocket`: Dockerfile `apps/websocket/Dockerfile`, domain `doodle.vay.hu`

Set these env vars:

```bash
NEXT_PUBLIC_DOODLE_WS_HOST=wss://doodle.vay.hu
DOODLE_STORAGE_FILE=/app/data/doodle-strokes.json
DOODLE_ALLOWED_ORIGINS=https://vay.hu,https://www.vay.hu
ADMIN_EMAIL=vaydominika@gmail.com
AUTH_SECRET=<generated_random_secret>
AUTH_GOOGLE_ID=<google_oauth_client_id>
AUTH_GOOGLE_SECRET=<google_oauth_client_secret>
AUTH_URL=https://vay.hu
DOODLE_ADMIN_TOKEN=<long_random_shared_token>
DOODLE_ADMIN_API_URL=http://websocket:1999
```

`NEXT_PUBLIC_DOODLE_WS_HOST` must be available during the portfolio image build because Next.js bakes public env vars into the browser bundle.

Add persistent storage for the websocket service at `/app/data` so doodles survive deploys and restarts.

For Google login, add this authorized redirect URI in Google Cloud:

```txt
https://vay.hu/api/auth/callback/google
```
