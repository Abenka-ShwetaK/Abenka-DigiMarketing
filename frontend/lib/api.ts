import type {
  ApiErrorBody,
  Client,
  ClientCreateInput,
  ClientListParams,
  ClientListResponse,
  ClientUpdateInput,
} from "@/types";

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
} as const;

export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = (await response.json().catch(() => null)) as T | ApiErrorBody | null;

  if (!response.ok) {
    const errorBody = payload as ApiErrorBody | null;
    throw new ApiError(
      response.status,
      errorBody?.error?.code ?? "http_error",
      errorBody?.error?.message ?? "Request failed.",
      errorBody?.error?.details,
    );
  }

  return payload as T;
}

function toQuery(params: ClientListParams): string {
  const searchParams = new URLSearchParams();
  if (params.search?.trim()) searchParams.set("search", params.search.trim());
  if (params.status && params.status !== "all") searchParams.set("status", params.status);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.page_size) searchParams.set("page_size", String(params.page_size));
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export const clientsApi = {
  list(params: ClientListParams = {}): Promise<ClientListResponse> {
    return request<ClientListResponse>(`/api/v1/clients${toQuery(params)}`);
  },
  get(id: string): Promise<Client> {
    return request<Client>(`/api/v1/clients/${id}`);
  },
  create(payload: ClientCreateInput): Promise<Client> {
    return request<Client>("/api/v1/clients", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  update(id: string, payload: ClientUpdateInput): Promise<Client> {
    return request<Client>(`/api/v1/clients/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  remove(id: string): Promise<void> {
    return request<void>(`/api/v1/clients/${id}`, { method: "DELETE" });
  },
};
