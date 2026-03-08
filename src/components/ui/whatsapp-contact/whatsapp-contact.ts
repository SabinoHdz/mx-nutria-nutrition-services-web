/**
 * WhatsApp Contact CTA - Types
 * Variantes: banner (fondo claro + botón) y card (fondo verde sólido).
 */

export const WHATSAPP_CONTACT_VARIANTS = ['banner', 'card'] as const;
export type WhatsAppContactVariant = (typeof WHATSAPP_CONTACT_VARIANTS)[number];

export interface WhatsAppContactProps {
  /** Presentación: banner (verde claro + botón) o card (bloque verde sólido). */
  variant?: WhatsAppContactVariant;
  /** Título principal. */
  title?: string;
  /** Texto secundario (banner: descripción; card: puede usarse como subtítulo). */
  description?: string;
  /** Horario o info extra para card (ej. "Respuesta rápida • Lun-Vie 9:00-18:00"). */
  schedule?: string;
  /** Texto del botón en variante banner. Por defecto "Chatear por WhatsApp". */
  buttonText?: string;
  /** URL de WhatsApp. Si no se pasa, se usa useWhatsAppLink() (env VITE_WHATSAPP_*). */
  href?: string;
  /** Clases adicionales en el contenedor. */
  class?: string;
}
