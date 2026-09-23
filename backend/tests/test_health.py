from fastapi.testclient import TestClient


def test_versioned_health_returns_payload(client: TestClient) -> None:
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["service"] == "Abenka AI Marketing API"
    assert payload["version"] == "0.1.0"
    assert payload["status"] in {"ok", "degraded"}
    assert payload["database"]["status"] in {"ok", "error", "not_configured"}
    assert payload["redis"]["status"] in {"ok", "error", "not_configured"}


def test_root_health_alias(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert "database" in response.json()
