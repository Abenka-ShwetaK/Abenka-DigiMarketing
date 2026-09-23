# Abenka AI Marketing Platform

An AI-powered marketing operations workspace for Abenka Infotech.

Phase 1 delivered the project foundation and master dashboard shell. Phase 2 adds full client management (create, list, search, filter, view, edit, soft-delete).

## Stack

- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Lucide, TanStack Query
- Backend: Python, FastAPI, SQLAlchemy 2, Pydantic, Alembic
- Database: PostgreSQL
- Infrastructure: Docker Compose, Redis (reserved for future background jobs)

## Quick start

See [docs/setup.md](docs/setup.md) for local and Docker commands.

```bash
cp .env.example .env
docker compose up postgres redis -d
cd backend && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
cd frontend && npm install && npm run dev
```

- Health: `http://localhost:8000/api/v1/health`
- Dashboard: `http://localhost:3000/dashboard`
- Clients: `http://localhost:3000/clients`
- API docs: `http://localhost:8000/docs`

## Known limitations

- Presentation, template, agent, and settings workflows remain placeholders.
- Dashboard summary metrics are still development placeholders.
- Client deletion is soft-delete (`deleted_at`); hard delete is not exposed.
- No authentication yet.

## License

Internal project for Abenka Infotech.
