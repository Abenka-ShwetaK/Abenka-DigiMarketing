# Setup

## Prerequisites

- Node.js 20+
- Python 3.12+
- Docker Desktop running (required for PostgreSQL, Redis, and `docker compose`)

## Environment variables

Copy the examples before running services:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

| Variable | Used by | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Backend | PostgreSQL connection string |
| `REDIS_URL` | Backend | Redis connection string |
| `NEXT_PUBLIC_API_URL` | Frontend | Public API origin |
| `FRONTEND_ORIGIN` / `CORS_ALLOW_ORIGINS` | Backend | CORS allow list |
| `JWT_SECRET` | Backend | Reserved for future auth |
| `AI_PROVIDER` | Backend | Reserved provider selector |
| `ANTHROPIC_API_KEY` | Backend | Reserved; never sent to the frontend |
| `OPENAI_API_KEY` | Backend | Reserved; never sent to the frontend |

No new environment variables were added for Phase 2 client management.

Do not put provider API keys in frontend env files.

## Docker

Start the full stack:

```bash
docker compose up --build
```

Start only infrastructure for local app processes:

```bash
docker compose up postgres redis -d
```

Useful URLs:

- Frontend: http://localhost:3000
- Clients: http://localhost:3000/clients
- Backend docs: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health

Stop services:

```bash
docker compose down
```

## Frontend (local)

```bash
cd frontend
npm install
npm run dev
```

Other commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Backend (local)

Windows PowerShell:

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

macOS / Linux:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Tests:

```bash
cd backend
pytest
```

## Database migrations

1. Start PostgreSQL with Docker or a local install.
2. Confirm `DATABASE_URL` in `backend/.env`.
3. Apply migrations:

```bash
cd backend
alembic upgrade head
```

Phase 2 adds revision `0002_clients`, which creates the `clients` table and indexes.

### Soft delete decision

Client `DELETE` sets `deleted_at` instead of removing the row. Soft-deleted clients are excluded from list/get endpoints. This preserves audit history and supports future recovery without requiring a separate archive table.

## Client management usage

1. Start Postgres/Redis and apply migrations.
2. Start the backend and frontend.
3. Open http://localhost:3000/clients
4. Use **Add Client** to create a record, then open, edit, or soft-delete from the detail page.

## Known limitations

- Presentation, template, agent, and settings routes still show a future-phase placeholder.
- Dashboard summary metrics remain development placeholders.
- Database health reports `not_configured` if `DATABASE_URL` is missing, and `error` if the database is unreachable.
- Redis is pinged when `REDIS_URL` is set; no job workers exist yet.
