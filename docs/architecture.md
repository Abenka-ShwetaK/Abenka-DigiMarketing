# Architecture

## Purpose

Abenka AI Marketing is an internal operations platform. The long-term system will convert client requirements into marketing deliverables through specialized AI agents.

## Current phases

- **Phase 1:** Application shell, API foundation, health checks, Docker infrastructure
- **Phase 2:** Client management (CRUD, search, status filter, soft delete)

## Applications

### Frontend

- Next.js App Router with TypeScript strict mode
- Shared dashboard shell: desktop sidebar, mobile sheet navigation, top header, main content
- Client module pages under `/clients`
- Centralized API client in `frontend/lib/api.ts`
- TanStack Query for client list/detail mutations and caching
- Frontend environment exposes only `NEXT_PUBLIC_API_URL`

### Backend

- FastAPI app factory in `backend/app/main.py`
- Versioned API prefix `/api/v1`
- Layered design: routes → services → repositories → models
- CORS for the frontend development origin
- Structured JSON logging and centralized exception handlers
- SQLAlchemy 2 models + Alembic migrations

### Client domain

- Table: `clients`
- Soft deletion via `deleted_at` (preferred over permanent removal for auditability)
- Status values: `prospect`, `active`, `inactive`, `archived`
- Indexes on `company_name`, `status`, and `deleted_at`

### Client API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/v1/clients` | List/search/filter clients (`search`, `status`, `page`, `page_size`) |
| `POST` | `/api/v1/clients` | Create client |
| `GET` | `/api/v1/clients/{client_id}` | Get client by ID |
| `PATCH` | `/api/v1/clients/{client_id}` | Update client |
| `DELETE` | `/api/v1/clients/{client_id}` | Soft-delete client (`204`) |

## Data and infrastructure

- PostgreSQL is the system of record
- Redis is included for future background jobs; Celery is not implemented
- Docker Compose runs frontend, backend, Postgres, and Redis

## Security notes

- AI provider keys stay on the backend.
- JWT secret is environment-only and unused in this phase.
- No authentication or authorization is implemented yet.

## Future phases

1. Presentation project model and generation pipeline
2. Agent execution, provider adapters, and activity logs
3. Templates, review workflow, and delivery
