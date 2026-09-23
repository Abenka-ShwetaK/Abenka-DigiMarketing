# Abenka AI Marketing Platform

An AI-powered marketing operations workspace for Abenka Infotech. Phase 1 delivers the project foundation and master dashboard shell. AI agents, client management, and content generation are not implemented yet.

## Existing repository

The repository previously contained product vision notes only. This phase adds the Next.js frontend, FastAPI backend, PostgreSQL/Redis infrastructure, and documentation while preserving that original product direction.

## Stack

- Frontend: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Lucide, TanStack Query
- Backend: Python, FastAPI, SQLAlchemy 2, Pydantic, Alembic
- Database: PostgreSQL
- Infrastructure: Docker Compose, Redis (reserved for future background jobs)

## Project structure

```
frontend/          Next.js application
backend/           FastAPI application
docs/              Architecture and setup notes
prompts/           Reserved for future agent prompts
templates/         Reserved for future marketing templates
clients/           Reserved for future client working files
docker-compose.yml Development services
```

## Quick start

See [docs/setup.md](docs/setup.md) for local and Docker commands.

```bash
cp .env.example .env
docker compose up postgres redis -d
cd backend && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
cd frontend && npm install && npm run dev
```

Health check: `http://localhost:8000/api/v1/health`

Dashboard: `http://localhost:3000/dashboard`

## Known limitations

- Client, presentation, template, agent, and settings workflows are placeholders.
- No business tables, authentication, or AI provider calls yet.
- Dashboard metrics are development placeholders set to zero.

## License

Internal project for Abenka Infotech.
