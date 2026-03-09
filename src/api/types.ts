/**
 * Shared types for API responses and payloads.
 */

export interface ApiConfig {
  whatsapp: { number: string; defaultMessage: string };
  social: Record<string, unknown>;
}

export interface VisitsCountResponse {
  count: number;
}

export interface ContactFormPayload {
  email: string;
  name?: string;
  subject?: string;
  message: string;
}
