/**
 * Contact form submission.
 * Replace with real API call (e.g. POST /api/contact) when backend is ready.
 */

export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(_payload: ContactFormPayload): Promise<void> {
  // Mock: simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // In production: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload), ... });
}
