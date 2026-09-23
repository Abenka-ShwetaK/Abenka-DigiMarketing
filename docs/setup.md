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

## Database

1. Start PostgreSQL with Docker or a local install.
2. Confirm `DATABASE_URL` in `backend/.env`.
3. Run the foundational Alembic revision:

```bash
cd backend
alembic upgrade head
```

Phase 1 does not create business tables. The first revision is a no-op foundation migration.

## Known limitations

- Unimplemented routes show a "Coming in a future phase" state.
- Database health reports `not_configured` if `DATABASE_URL` is missing, and `error` if the database is unreachable.
- Redis is pinged when `REDIS_URL` is set; no job workers exist yet.
