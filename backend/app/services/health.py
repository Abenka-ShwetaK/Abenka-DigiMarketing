from __future__ import annotations

from sqlalchemy import text

from app.core.config import settings
from app.core.database import engine
from app.schemas.health import ComponentHealth, HealthResponse


def _check_database() -> ComponentHealth:
    if not settings.database_url or engine is None:
        return ComponentHealth(status="not_configured", detail="DATABASE_URL is not set.")

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return ComponentHealth(status="ok", detail="PostgreSQL connection succeeded.")
    except Exception as exc:  # noqa: BLE001 - health checks must not raise
        return ComponentHealth(status="error", detail=str(exc))


def _check_redis() -> ComponentHealth:
    if not settings.redis_url:
        return ComponentHealth(status="not_configured", detail="REDIS_URL is not set.")

    try:
        import redis

        client = redis.from_url(
            settings.redis_url,
            socket_connect_timeout=1,
            socket_timeout=1,
        )
        client.ping()
        return ComponentHealth(status="ok", detail="Redis ping succeeded.")
    except Exception as exc:  # noqa: BLE001 - health checks must not raise
        return ComponentHealth(status="error", detail=str(exc))


def get_health() -> HealthResponse:
    database = _check_database()
    redis = _check_redis()
    overall: str = "ok" if database.status != "error" and redis.status != "error" else "degraded"

    return HealthResponse(
        status=overall,  # type: ignore[arg-type]
        service=settings.app_name,
        version=settings.app_version,
        environment=settings.environment,
        database=database,
        redis=redis,
    )
