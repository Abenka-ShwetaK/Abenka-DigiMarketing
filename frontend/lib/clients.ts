import type { ClientStatus } from "@/types";

export const CLIENT_STATUSES: ClientStatus[] = ["prospect", "active", "inactive", "archived"];

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  prospect: "Prospect",
  active: "Active",
  inactive: "Inactive",
  archived: "Archived",
};

export type ClientFormValues = {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  business_description: string;
  target_audience: string;
  marketing_goals: string;
  location: string;
  status: ClientStatus;
};

export const emptyClientForm: ClientFormValues = {
  company_name: "",
  contact_person: "",
  email: "",
  phone: "",
  industry: "",
  website: "",
  business_description: "",
  target_audience: "",
  marketing_goals: "",
  location: "",
  status: "prospect",
};

export type ClientFormErrors = Partial<Record<keyof ClientFormValues, string>>;

export function validateClientForm(values: ClientFormValues): ClientFormErrors {
  const errors: ClientFormErrors = {};

  if (!values.company_name.trim()) {
    errors.company_name = "Company name is required.";
  }

  if (values.email.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
  }

  if (values.website.trim()) {
    try {
      const normalized = values.website.startsWith("http")
        ? values.website.trim()
        : `https://${values.website.trim()}`;
      void new URL(normalized);
    } catch {
      errors.website = "Enter a valid website URL.";
    }
  }

  return errors;
}

export function toClientPayload(values: ClientFormValues) {
  const trimOrOmit = (value: string) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  };

  return {
    company_name: values.company_name.trim(),
    contact_person: trimOrOmit(values.contact_person),
    email: trimOrOmit(values.email),
    phone: trimOrOmit(values.phone),
    industry: trimOrOmit(values.industry),
    website: trimOrOmit(values.website),
    business_description: trimOrOmit(values.business_description),
    target_audience: trimOrOmit(values.target_audience),
    marketing_goals: trimOrOmit(values.marketing_goals),
    location: trimOrOmit(values.location),
    status: values.status,
  };
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
