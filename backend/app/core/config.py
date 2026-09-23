from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Abenka AI Marketing API"
    app_version: str = "0.1.0"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    log_level: str = "INFO"

    frontend_origin: str = "http://localhost:3000"
    cors_allow_origins: str = "http://localhost:3000"

    database_url: str | None = None
    redis_url: str | None = None

    jwt_secret: str = "change-me-in-development-only"
    ai_provider: str = "anthropic"
    anthropic_api_key: str | None = None
    openai_api_key: str | None = None

    @property
    def cors_origins(self) -> list[str]:
        origins = [origin.strip() for origin in self.cors_allow_origins.split(",") if origin.strip()]
        if self.frontend_origin and self.frontend_origin not in origins:
            origins.append(self.frontend_origin)
        return origins


settings = Settings()
