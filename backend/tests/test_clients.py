from __future__ import annotations

from fastapi.testclient import TestClient


def _valid_payload(**overrides: object) -> dict[str, object]:
    payload: dict[str, object] = {
        "company_name": "Abenka Demo Co",
        "contact_person": "Priya Shah",
        "email": "priya@example.com",
        "phone": "+91 98765 43210",
        "industry": "SaaS",
        "website": "example.com",
        "business_description": "B2B productivity software.",
        "target_audience": "Operations managers",
        "marketing_goals": "Lead generation and brand awareness",
        "location": "Pune, India",
        "status": "prospect",
    }
    payload.update(overrides)
    return payload


def test_create_valid_client(client: TestClient) -> None:
    response = client.post("/api/v1/clients", json=_valid_payload())
    assert response.status_code == 201
    data = response.json()
    assert data["company_name"] == "Abenka Demo Co"
    assert data["website"] == "https://example.com/"
    assert data["status"] == "prospect"
    assert "id" in data


def test_create_client_requires_company_name(client: TestClient) -> None:
    response = client.post("/api/v1/clients", json=_valid_payload(company_name=""))
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "validation_error"


def test_list_clients_empty(client: TestClient) -> None:
    response = client.get("/api/v1/clients")
    assert response.status_code == 200
    payload = response.json()
    assert payload["items"] == []
    assert payload["total"] == 0
    assert payload["page"] == 1


def test_list_and_get_clients(client: TestClient) -> None:
    created = client.post("/api/v1/clients", json=_valid_payload()).json()
    client.post("/api/v1/clients", json=_valid_payload(company_name="Northwind Retail", status="active"))

    listed = client.get("/api/v1/clients", params={"search": "Abenka"})
    assert listed.status_code == 200
    body = listed.json()
    assert body["total"] == 1
    assert body["items"][0]["company_name"] == "Abenka Demo Co"

    filtered = client.get("/api/v1/clients", params={"status": "active"})
    assert filtered.json()["total"] == 1

    detail = client.get(f"/api/v1/clients/{created['id']}")
    assert detail.status_code == 200
    assert detail.json()["email"] == "priya@example.com"


def test_update_client(client: TestClient) -> None:
    created = client.post("/api/v1/clients", json=_valid_payload()).json()
    response = client.patch(
        f"/api/v1/clients/{created['id']}",
        json={"status": "active", "location": "Mumbai, India"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "active"
    assert data["location"] == "Mumbai, India"


def test_delete_client_is_soft_delete(client: TestClient) -> None:
    created = client.post("/api/v1/clients", json=_valid_payload()).json()
    deleted = client.delete(f"/api/v1/clients/{created['id']}")
    assert deleted.status_code == 204

    missing = client.get(f"/api/v1/clients/{created['id']}")
    assert missing.status_code == 404
    assert missing.json()["error"]["code"] == "client_not_found"

    listed = client.get("/api/v1/clients")
    assert listed.json()["total"] == 0


def test_invalid_client_id(client: TestClient) -> None:
    response = client.get("/api/v1/clients/00000000-0000-0000-0000-000000000099")
    assert response.status_code == 404
    assert response.json()["error"]["message"] == "Client not found."


def test_invalid_email_returns_validation_error(client: TestClient) -> None:
    response = client.post("/api/v1/clients", json=_valid_payload(email="not-an-email"))
    assert response.status_code == 422
    assert response.json()["error"]["code"] == "validation_error"
