/**
 * Contact form submission. Delegates to contact store (POST /api/contact).
 */
import { useContactStore } from '@/stores/contactStore';
import type { ContactFormPayload } from '@/api';

export type { ContactFormPayload } from '@/api';

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  await useContactStore().submitContact(payload);
}
