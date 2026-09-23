# Architecture

## Purpose

Abenka AI Marketing is an internal operations platform. The long-term system will convert client requirements into marketing deliverables through specialized AI agents. Phase 1 establishes the application shell, API foundation, and data infrastructure only.

## Applications

### Frontend

- Next.js App Router with TypeScript strict mode
- Shared dashboard shell: desktop sidebar, mobile sheet navigation, top header, main content
- Route-level pages for dashboard and future modules
- Centralized navigation and metric configuration in `frontend/lib`
- TanStack Query provider is installed for later API integration
- Frontend environment exposes only `NEXT_PUBLIC_API_URL`

### Backend

- FastAPI app factory in `backend/app/main.py`
- Versioned API prefix `/api/v1`
- CORS for the frontend development origin
- Structured JSON logging
- Centralized exception handlers
- Environment-based settings via Pydantic Settings
- SQLAlchemy 2 engine created when `DATABASE_URL` is present
- Alembic configured for future schema migrations
- Placeholder packages: `agents`, `providers`, `repositories`

### Data and infrastructure

- PostgreSQL is the system of record
- Redis is included for future background jobs; Celery is not implemented
- Docker Compose runs frontend, backend, Postgres, and Redis

## Health

- `GET /health`
- `GET /api/v1/health`

The health payload reports overall status plus database and Redis component status (`ok`, `error`, or `not_configured`).

## Security notes

- AI provider keys stay on the backend.
- JWT secret is environment-only and unused in this phase.
- No authentication or authorization is implemented yet.

## Future phases

1. Client management and requirement collection
2. Presentation project model and generation pipeline
3. Agent execution, provider adapters, and activity logs
4. Templates, review workflow, and delivery
