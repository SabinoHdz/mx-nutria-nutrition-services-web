import { computed } from 'vue';
import { useConfigStore } from '@/stores/configStore';

/**
 * Builds the WhatsApp chat URL from API config (GET /api/config) with fallback to env vars.
 * Uses VITE_WHATSAPP_NUMBER and VITE_WHATSAPP_MESSAGE when config is not loaded or empty.
 */
export function useWhatsAppLink() {
  const configStore = useConfigStore();

  const whatsappUrl = computed(() => {
    const number =
      configStore.loaded && configStore.whatsapp.number
        ? configStore.whatsapp.number
        : ((import.meta.env.VITE_WHATSAPP_NUMBER as string) ?? '');
    const message =
      configStore.loaded && configStore.whatsapp.defaultMessage !== undefined
        ? configStore.whatsapp.defaultMessage
        : ((import.meta.env.VITE_WHATSAPP_MESSAGE as string) ?? '');
    const encoded = encodeURIComponent(message);
    return number ? `https://wa.me/${number}?text=${encoded}` : '';
  });

  return { whatsappUrl };
}
