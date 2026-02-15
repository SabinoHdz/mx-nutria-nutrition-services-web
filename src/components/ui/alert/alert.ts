/**
 * ALERT COMPONENT - Types, Constants & Interfaces
 *
 * Define los valores posibles para cada prop del alert
 * Esto nos da type-safety en TypeScript
 */

// ========================================
// 1. VARIANTS (Estilos visuales)
// ========================================
/**
 * 4 variantes visuales principales
 * - solid: fondo sólido con color (más prominente)
 * - soft: fondo semi-transparente (recomendado para alerts)
 * - outline: solo borde, fondo transparente
 * - bordered: borde grueso izquierdo + fondo suave
 */
export const ALERT_VARIANTS = ['solid', 'soft', 'outline', 'bordered'] as const;
export type AlertVariant = (typeof ALERT_VARIANTS)[number];

// ========================================
// 2. COLORES SEMÁNTICOS
// ========================================
/**
 * 7 colores que coinciden con el design system
 * Se usan en todas partes: Badge, Button, Tooltip, Alert, etc.
 * Esto asegura consistencia visual
 */
export const ALERT_COLORS = [
  'primary', // Azul - información general
  'secondary', // Teal - información secundaria
  'accent', // Púrpura - destacado especial
  'success', // Verde - operación exitosa
  'warning', // Amarillo - advertencia
  'error', // Rojo - error/peligro
  'info', // Cyan - información útil
] as const;
export type AlertColor = (typeof ALERT_COLORS)[number];

// ========================================
// 3. SIZES (Tamaños)
// ========================================
/**
 * 5 tamaños con diferentes paddings y font-sizes
 * xs: muy compacto
 * sm: pequeño
 * md: mediano (default)
 * lg: grande
 * xl: extra grande
 */
export const ALERT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type AlertSize = (typeof ALERT_SIZES)[number];

// ========================================
// 4. INTERFACE PROPS
// ========================================
/**
 * Interfaz que define TODAS las props del componente
 * Cada prop tiene un comentario explicando qué hace
 */
export interface AlertProps {
  // ===== ESTILO VISUAL =====
  /** Variante visual del alert (4 opciones) */
  variant?: AlertVariant;

  /** Color semántico (7 colores del design system) */
  color?: AlertColor;

  /** Tamaño del alert (5 tamaños) */
  size?: AlertSize;

  // ===== MODIFICADORES =====
  /** Versión compacta con menos padding (inspirado en Quasar) */
  dense?: boolean;

  /** Esquinas muy redondeadas (inspirado en Quasar) */
  rounded?: boolean;

  /** Acciones en la misma línea del contenido (Quasar inline-actions) */
  inlineActions?: boolean;

  // ===== ICONO =====
  /** Mostrar icono automático según el color (default: true) */
  icon?: boolean;

  // ===== INTERACTIVIDAD =====
  /** Mostrar botón de cerrar X (dismissible) */
  dismissible?: boolean;

  /** Título del alert (alternativa al slot title) */
  title?: string;

  /** Mensaje del alert (alternativa al slot default) */
  message?: string;
}

// ========================================
// 5. ICONOS POR DEFECTO SEGÚN COLOR
// ========================================
/**
 * Mapeo de color a icono Material Symbol
 * Se usa cuando icon=true y no se proporciona slot icon
 */
export const ALERT_DEFAULT_ICONS: Record<AlertColor, string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
  primary: 'info',
  secondary: 'info',
  accent: 'star',
};
