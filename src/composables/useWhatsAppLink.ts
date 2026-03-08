import { computed } from 'vue';

/**
 * Builds the WhatsApp chat URL using env vars.
 * Use VITE_WHATSAPP_NUMBER (e.g. 5215512345678) and VITE_WHATSAPP_MESSAGE for the default text.
 */
export function useWhatsAppLink() {
  const whatsappUrl = computed(() => {
    const number = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';
    const message = import.meta.env.VITE_WHATSAPP_MESSAGE ?? '';
    const encoded = encodeURIComponent(message);
    return number ? `https://wa.me/${number}?text=${encoded}` : '';
  });

  return { whatsappUrl };
}
