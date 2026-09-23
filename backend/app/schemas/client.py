from __future__ import annotations

import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl, field_validator

from app.models.client import ClientStatus


def _blank_to_none(value: str | None) -> str | None:
    if value is None:
        return None
    stripped = value.strip()
    return stripped or None


class ClientBase(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=255)
    contact_person: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    industry: str | None = Field(default=None, max_length=120)
    website: str | None = Field(default=None, max_length=500)
    business_description: str | None = None
    target_audience: str | None = None
    marketing_goals: str | None = None
    location: str | None = Field(default=None, max_length=255)
    status: ClientStatus = ClientStatus.PROSPECT

    @field_validator("email", mode="before")
    @classmethod
    def empty_email_to_none(cls, value: object) -> object:
        if value is None:
            return None
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("company_name")
    @classmethod
    def validate_company_name(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Company name is required.")
        return cleaned

    @field_validator(
        "contact_person",
        "phone",
        "industry",
        "business_description",
        "target_audience",
        "marketing_goals",
        "location",
        mode="before",
    )
    @classmethod
    def empty_strings_to_none(cls, value: str | None) -> str | None:
        if isinstance(value, str):
            return _blank_to_none(value)
        return value

    @field_validator("website", mode="before")
    @classmethod
    def normalize_website(cls, value: str | None) -> str | None:
        cleaned = _blank_to_none(value) if isinstance(value, str) or value is None else value
        if cleaned is None:
            return None
        if not cleaned.startswith(("http://", "https://")):
            cleaned = f"https://{cleaned}"
        # Validate URL shape via HttpUrl then store as string.
        return str(HttpUrl(cleaned))


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    company_name: str | None = Field(default=None, min_length=1, max_length=255)
    contact_person: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, max_length=50)
    industry: str | None = Field(default=None, max_length=120)
    website: str | None = Field(default=None, max_length=500)
    business_description: str | None = None
    target_audience: str | None = None
    marketing_goals: str | None = None
    location: str | None = Field(default=None, max_length=255)
    status: ClientStatus | None = None

    @field_validator("email", mode="before")
    @classmethod
    def empty_email_to_none(cls, value: object) -> object:
        if value is None:
            return None
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("company_name")
    @classmethod
    def validate_company_name(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Company name cannot be empty.")
        return cleaned

    @field_validator(
        "contact_person",
        "phone",
        "industry",
        "business_description",
        "target_audience",
        "marketing_goals",
        "location",
        mode="before",
    )
    @classmethod
    def empty_strings_to_none(cls, value: str | None) -> str | None:
        if isinstance(value, str):
            return _blank_to_none(value)
        return value

    @field_validator("website", mode="before")
    @classmethod
    def normalize_website(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = _blank_to_none(value) if isinstance(value, str) else value
        if cleaned is None:
            return None
        if not cleaned.startswith(("http://", "https://")):
            cleaned = f"https://{cleaned}"
        return str(HttpUrl(cleaned))


class ClientRead(ClientBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class ClientListResponse(BaseModel):
    items: list[ClientRead]
    total: int
    page: int
    page_size: int
    total_pages: int


ClientStatusLiteral = Literal["active", "inactive", "prospect", "archived"]
