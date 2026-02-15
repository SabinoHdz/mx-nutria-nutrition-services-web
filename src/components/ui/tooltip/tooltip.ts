/**
 * Define los valores posibles para cada prop del tooltip
 * Esto nos da type-safety en TypeScript
 */

// ========================================
// 1. PLACEMENTS (Posiciones)
// ========================================
/**
 * 12 posiciones posibles donde puede aparecer el tooltip
 * Visualización:
 *     top-start    top    top-end
 *            ┌──────────────┐
 *  left      │   ELEMENT    │      right
 *            └──────────────┘
 *  bottom-start  bottom  bottom-end
 */

export const TOOLTIP_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const;
export type TooltipPlacement = (typeof TOOLTIP_PLACEMENTS)[number];

// ========================================
// 2. COLORES SEMÁNTICOS
// ========================================
/**
 * 7 colores que coinciden con el design system
 * Se usan en todas partes: Badge, Button, Tooltip, etc.
 * Esto asegura consistencia visual
 */
export const TOOLTIP_COLORS = [
  'primary', // Azul - color principal de la app
  'secondary', // Teal - color secundario
  'success', // Verde - operación exitosa
  'warning', // Amarillo - advertencia
  'error', // Rojo - error/peligro
  'info', // Cyan - información
  'neutral', // Gris - genérico/sin semántica
] as const;

export type TooltipColor = (typeof TOOLTIP_COLORS)[number];

// ========================================
// 3. TRIGGERS (Cómo se activa)
// ========================================
/**
 * 4 formas diferentes de activar el tooltip
 * - hover: al pasar el mouse (default, más común)
 * - click: al hacer click (útil en móviles)
 * - focus: al enfocar con teclado (accesibilidad)
 * - manual: control programático (v-model)
 */
export const TOOLTIP_TRIGGERS = ['hover', 'click', 'focus', 'manual'] as const;

export type TooltipTrigger = (typeof TOOLTIP_TRIGGERS)[number];

// ========================================
// 4. SIZES (Tamaños)
// ========================================
/**
 * 5 tamaños con diferentes paddings y font-sizes
 * xs: muy pequeño (etiquetas mínimas)
 * sm: pequeño (info breve)
 * md: mediano (default, info estándar)
 * lg: grande (más legibilidad)
 * xl: extra grande (destacado)
 */
export const TOOLTIP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type TooltipSize = (typeof TOOLTIP_SIZES)[number];

// ========================================
// 5. TRANSITIONS (Animaciones)
// ========================================
/**
 * 3 tipos de animaciones para entrada/salida
 * fade: opacidad (aparece/desaparece suavemente)
 * scale: tamaño (crece desde pequeño hacia grande)
 * slide: movimiento (se desliza desde un lado)
 */

export const TOOLTIP_TRANSITIONS = ['fade', 'scale', 'slide'] as const;
export type TooltipTransition = (typeof TOOLTIP_TRANSITIONS)[number];

// ========================================
// 6. INTERFACE PROPS
// ========================================
/**
 * Interfaz que define TODAS las props del componente
 */

export interface TooltipProps {
  // ===== CONTENIDO =====
  /** Texto del tooltip (alternativa al slot default) */
  text?: string;

  /** Permitir HTML en el contenido (⚠️ XSS risk) */
  html?: boolean;

  // ===== POSICIONAMIENTO =====
  /** Posición del tooltip relativa al elemento (12 opciones) */
  placement?: TooltipPlacement;

  /** Distancia en píxeles entre el tooltip y el elemento (default: 8px) */
  offset?: number;

  // ===== COLORES Y ESTILO =====
  /** Color semántico (7 colores del design system) */
  color?: TooltipColor;

  /** Tamaño del tooltip (5 tamaños) */
  size?: TooltipSize;

  /** Mostrar flecha pequeña apuntando al elemento (default: true) */
  arrow?: boolean;

  /** Ancho máximo del tooltip (CSS value, ej: "200px" o 200) */
  maxWidth?: string | number;

  // ===== COMPORTAMIENTO =====
  /** Cómo se activa el tooltip (4 opciones) */
  trigger?: TooltipTrigger;

  /** Delay en ms antes de mostrar (default: 200ms) */
  delay?: number;

  /** Delay en ms antes de ocultar (default: 0ms) */
  hideDelay?: number;

  /** Deshabilitar tooltip completamente */
  disabled?: boolean;

  /** v-model: controlar visibilidad manualmente */
  modelValue?: boolean;

  // ===== ANIMACIÓN =====
  /** Tipo de transición (3 opciones) */
  transition?: TooltipTransition;

  // ===== AVANZADO =====
  /** No cerrar al hacer click fuera (útil con trigger='click') */
  persistent?: boolean;

  /** Auto-ajustar posición si sale del viewport */
  boundary?: boolean;

  /** z-index del tooltip (default: 9999) */
  zIndex?: number;

  // ===== ACCESIBILIDAD =====
  /** ID personalizado para ARIA (default: auto-generado) */
  ariaId?: string;
}
