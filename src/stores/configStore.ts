import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';
import type { ApiConfig } from '@/api';

const defaultWhatsapp = { number: '', defaultMessage: '' };

export const useConfigStore = defineStore('config', () => {
  const whatsapp = ref<{ number: string; defaultMessage: string }>({ ...defaultWhatsapp });
  const social = ref<Record<string, unknown>>({});
  const loaded = ref(false);
  const error = ref<string | null>(null);

  async function fetchConfig() {
    error.value = null;
    try {
      const data = await api.get<ApiConfig>('/api/config');
      whatsapp.value = data.whatsapp ?? { ...defaultWhatsapp };
      social.value = data.social ?? {};
      loaded.value = true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error al cargar la configuración';
      whatsapp.value = { ...defaultWhatsapp };
      social.value = {};
    }
  }

  return {
    whatsapp: readonly(whatsapp),
    social: readonly(social),
    loaded: readonly(loaded),
    error: readonly(error),
    fetchConfig,
  };
});
