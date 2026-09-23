from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.client import ClientStatus
from app.schemas.client import ClientCreate, ClientListResponse, ClientRead, ClientUpdate
from app.services.client import ClientService

router = APIRouter(prefix="/clients", tags=["clients"])


def get_client_service(db: Session = Depends(get_db)) -> ClientService:
    return ClientService(db)


@router.get("", response_model=ClientListResponse)
def list_clients(
    search: str | None = Query(default=None, description="Search company name, contact, or email"),
    status_filter: ClientStatus | None = Query(default=None, alias="status"),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=100),
    service: ClientService = Depends(get_client_service),
) -> ClientListResponse:
    return service.list_clients(search=search, status=status_filter, page=page, page_size=page_size)


@router.post("", response_model=ClientRead, status_code=status.HTTP_201_CREATED)
def create_client(
    payload: ClientCreate,
    service: ClientService = Depends(get_client_service),
) -> ClientRead:
    return service.create_client(payload)


@router.get("/{client_id}", response_model=ClientRead)
def get_client(
    client_id: uuid.UUID,
    service: ClientService = Depends(get_client_service),
) -> ClientRead:
    return service.get_client(client_id)


@router.patch("/{client_id}", response_model=ClientRead)
def update_client(
    client_id: uuid.UUID,
    payload: ClientUpdate,
    service: ClientService = Depends(get_client_service),
) -> ClientRead:
    return service.update_client(client_id, payload)


@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(
    client_id: uuid.UUID,
    service: ClientService = Depends(get_client_service),
) -> Response:
    service.delete_client(client_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
