from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import Select, func, or_, select
from sqlalchemy.orm import Session

from app.models.client import Client, ClientStatus
from app.schemas.client import ClientCreate, ClientUpdate


class ClientRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def _base_query(self, *, include_deleted: bool = False) -> Select[tuple[Client]]:
        stmt = select(Client)
        if not include_deleted:
            stmt = stmt.where(Client.deleted_at.is_(None))
        return stmt

    def create(self, payload: ClientCreate) -> Client:
        client = Client(**payload.model_dump())
        self.db.add(client)
        self.db.commit()
        self.db.refresh(client)
        return client

    def get_by_id(self, client_id: uuid.UUID, *, include_deleted: bool = False) -> Client | None:
        stmt = self._base_query(include_deleted=include_deleted).where(Client.id == client_id)
        return self.db.scalar(stmt)

    def list(
        self,
        *,
        search: str | None = None,
        status: ClientStatus | None = None,
        page: int = 1,
        page_size: int = 12,
    ) -> tuple[list[Client], int]:
        stmt = self._base_query()

        if search:
            term = search.strip().lower()
            pattern = f"%{term}%"
            stmt = stmt.where(
                or_(
                    func.lower(Client.company_name).like(pattern),
                    func.lower(func.coalesce(Client.contact_person, "")).like(pattern),
                    func.lower(func.coalesce(Client.email, "")).like(pattern),
                )
            )

        if status is not None:
            stmt = stmt.where(Client.status == status)

        count_stmt = select(func.count()).select_from(stmt.order_by(None).subquery())
        total = int(self.db.scalar(count_stmt) or 0)

        offset = (page - 1) * page_size
        items_stmt = stmt.order_by(Client.created_at.desc()).offset(offset).limit(page_size)
        items = list(self.db.scalars(items_stmt).all())
        return items, total

    def update(self, client: Client, payload: ClientUpdate) -> Client:
        data = payload.model_dump(exclude_unset=True)
        for key, value in data.items():
            setattr(client, key, value)
        client.updated_at = datetime.now(timezone.utc)
        self.db.add(client)
        self.db.commit()
        self.db.refresh(client)
        return client

    def soft_delete(self, client: Client) -> Client:
        client.deleted_at = datetime.now(timezone.utc)
        client.updated_at = datetime.now(timezone.utc)
        self.db.add(client)
        self.db.commit()
        self.db.refresh(client)
        return client
