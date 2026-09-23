from __future__ import annotations

import math
import uuid

from sqlalchemy.orm import Session

from app.core.exceptions import AppError
from app.models.client import ClientStatus
from app.repositories.client import ClientRepository
from app.schemas.client import ClientCreate, ClientListResponse, ClientRead, ClientUpdate


class ClientService:
    def __init__(self, db: Session) -> None:
        self.repository = ClientRepository(db)

    def create_client(self, payload: ClientCreate) -> ClientRead:
        client = self.repository.create(payload)
        return ClientRead.model_validate(client)

    def get_client(self, client_id: uuid.UUID) -> ClientRead:
        client = self.repository.get_by_id(client_id)
        if client is None:
            raise AppError("Client not found.", status_code=404, code="client_not_found")
        return ClientRead.model_validate(client)

    def list_clients(
        self,
        *,
        search: str | None = None,
        status: ClientStatus | None = None,
        page: int = 1,
        page_size: int = 12,
    ) -> ClientListResponse:
        if page < 1:
            raise AppError("Page must be greater than or equal to 1.", status_code=422, code="validation_error")
        if page_size < 1 or page_size > 100:
            raise AppError("Page size must be between 1 and 100.", status_code=422, code="validation_error")

        items, total = self.repository.list(
            search=search,
            status=status,
            page=page,
            page_size=page_size,
        )
        total_pages = math.ceil(total / page_size) if total else 0
        return ClientListResponse(
            items=[ClientRead.model_validate(item) for item in items],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages,
        )

    def update_client(self, client_id: uuid.UUID, payload: ClientUpdate) -> ClientRead:
        client = self.repository.get_by_id(client_id)
        if client is None:
            raise AppError("Client not found.", status_code=404, code="client_not_found")
        if not payload.model_dump(exclude_unset=True):
            raise AppError("No fields provided for update.", status_code=422, code="validation_error")
        updated = self.repository.update(client, payload)
        return ClientRead.model_validate(updated)

    def delete_client(self, client_id: uuid.UUID) -> None:
        client = self.repository.get_by_id(client_id)
        if client is None:
            raise AppError("Client not found.", status_code=404, code="client_not_found")
        self.repository.soft_delete(client)
