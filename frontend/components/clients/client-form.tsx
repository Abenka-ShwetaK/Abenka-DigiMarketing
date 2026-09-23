"use client";

import { useState, type FormEvent } from "react";
import type { ReactNode } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CLIENT_STATUS_LABELS,
  CLIENT_STATUSES,
  type ClientFormErrors,
  type ClientFormValues,
  validateClientForm,
} from "@/lib/clients";
import type { ClientStatus } from "@/types";

type ClientFormProps = {
  initialValues: ClientFormValues;
  submitLabel: string;
  onSubmit: (values: ClientFormValues) => Promise<void>;
  onCancel?: () => void;
};

export function ClientForm({ initialValues, submitLabel, onSubmit, onCancel }: ClientFormProps) {
  const [values, setValues] = useState<ClientFormValues>(initialValues);
  const [errors, setErrors] = useState<ClientFormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ClientFormValues>(key: K, value: ClientFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);
    const nextErrors = validateClientForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Unable to save client.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {apiError ? <Alert variant="error" title="Could not save client">{apiError}</Alert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Company name" htmlFor="company_name" error={errors.company_name} required>
          <Input
            id="company_name"
            value={values.company_name}
            onChange={(event) => updateField("company_name", event.target.value)}
            aria-invalid={Boolean(errors.company_name)}
            required
          />
        </Field>
        <Field label="Contact person" htmlFor="contact_person" error={errors.contact_person}>
          <Input
            id="contact_person"
            value={values.contact_person}
            onChange={(event) => updateField("contact_person", event.target.value)}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
        <Field label="Phone" htmlFor="phone" error={errors.phone}>
          <Input
            id="phone"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </Field>
        <Field label="Industry" htmlFor="industry" error={errors.industry}>
          <Input
            id="industry"
            value={values.industry}
            onChange={(event) => updateField("industry", event.target.value)}
          />
        </Field>
        <Field label="Website" htmlFor="website" error={errors.website}>
          <Input
            id="website"
            value={values.website}
            onChange={(event) => updateField("website", event.target.value)}
            placeholder="https://example.com"
            aria-invalid={Boolean(errors.website)}
          />
        </Field>
        <Field label="Location" htmlFor="location" error={errors.location}>
          <Input
            id="location"
            value={values.location}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </Field>
        <Field label="Client status" htmlFor="status" error={errors.status}>
          <Select
            id="status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value as ClientStatus)}
          >
            {CLIENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {CLIENT_STATUS_LABELS[status]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Business description" htmlFor="business_description" error={errors.business_description}>
        <Textarea
          id="business_description"
          value={values.business_description}
          onChange={(event) => updateField("business_description", event.target.value)}
          rows={4}
        />
      </Field>
      <Field label="Target audience" htmlFor="target_audience" error={errors.target_audience}>
        <Textarea
          id="target_audience"
          value={values.target_audience}
          onChange={(event) => updateField("target_audience", event.target.value)}
          rows={3}
        />
      </Field>
      <Field label="Primary marketing goals" htmlFor="marketing_goals" error={errors.marketing_goals}>
        <Textarea
          id="marketing_goals"
          value={values.marketing_goals}
          onChange={(event) => updateField("marketing_goals", event.target.value)}
          rows={3}
        />
      </Field>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
