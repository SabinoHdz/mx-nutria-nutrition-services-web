import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';
import type { ContactFormPayload } from '@/api';

export const useContactStore = defineStore('contact', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function submitContact(payload: ContactFormPayload): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await api.post('/api/contact', payload);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'No se pudo enviar el mensaje. Intenta de nuevo.';
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    submitContact,
  };
});
