export type ClientStatus = "active" | "inactive" | "prospect" | "archived";

export type Client = {
  id: string;
  company_name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  industry: string | null;
  website: string | null;
  business_description: string | null;
  target_audience: string | null;
  marketing_goals: string | null;
  location: string | null;
  status: ClientStatus;
  created_at: string;
  updated_at: string;
};

export type ClientCreateInput = {
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  industry?: string;
  website?: string;
  business_description?: string;
  target_audience?: string;
  marketing_goals?: string;
  location?: string;
  status?: ClientStatus;
};

export type ClientUpdateInput = Partial<ClientCreateInput>;

export type ClientListResponse = {
  items: Client[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
};

export type ClientListParams = {
  search?: string;
  status?: ClientStatus | "all";
  page?: number;
  page_size?: number;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ComingSoonFeature = {
  title: string;
  summary: string;
};
