/**
 * Button Component Type Definitions
 * Tipos, constantes e interfaces para el componente VButton
 * Incluye características inspiradas en Quasar y DaisyUI
 */

// ========================================
// VARIANTES VISUALES
// ========================================

/**
 * Estilos visuales del botón
 * - solid: fondo sólido (Quasar inspired)
 * - outline: solo borde
 * - ghost: sin borde, fondo transparente
 * - soft: fondo transparente con color suave
 * - link: estilo de enlace
 * - dashed: borde punteado
 */

export const BUTTON_VARIANTS = ['solid', 'outline', 'ghost', 'soft', 'dashed', 'link'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

// ========================================
// COLORES SEMÁNTICOS
// ========================================

/**
 * Colores usando el sistema de diseño
 * Cada color mapea a variables CSS en main.css
 */

export const BUTTON_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
] as const;
export type ButtonColor = (typeof BUTTON_COLORS)[number];

// ========================================
// TAMAÑOS
// ========================================

/**
 * Tamaños predefinidos con padding y tipografía alineados
 */
export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

// ========================================
// TIPOS HTML
// ========================================

export const BUTTON_TYPES = ['button', 'submit', 'reset'] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

// ========================================
// INTERFACE PROPS
// ========================================

/**
 * Props completas del componente VButton
 * Incluye todas las variaciones visuales y de comportamiento
 */
export interface ButtonProps {
  // ===== CORE PROPS =====
  /** Estilo visual del botón */
  variant?: ButtonVariant;

  /** Color semántico */
  color?: ButtonColor;

  /** Tamaño del botón */
  size?: ButtonSize;

  /** Tipo HTML del botón */
  type?: ButtonType;

  /** Deshabilita el botón (visual y funcional) */
  disabled?: boolean;

  /** Muestra estado de carga con spinner */
  loading?: boolean;

  // ===== LAYOUT & SIZING =====
  /** Botón de ancho completo (DaisyUI) */
  fullWidth?: boolean;

  /** Padding horizontal extra (DaisyUI wide) */
  wide?: boolean;

  /** Solo icono, sin texto (para iconos) */
  iconOnly?: boolean;

  // ===== QUASAR INSPIRED =====
  /** Efecto ripple Material Design */
  ripple?: boolean;

  /** Mantiene texto en minúsculas (sin transformar a mayúsculas) */
  noCaps?: boolean;

  /** Sin sombra/elevación (flat style) */
  unelevated?: boolean;

  /** Forma de píldora (rounded-full) */
  rounded?: boolean;

  /** Padding compacto */
  dense?: boolean;

  /** Efecto 3D con sombra */
  push?: boolean;

  /** Efecto brillante con gradiente */
  glossy?: boolean;

  /** Floating Action Button style */
  fab?: boolean;

  /** Ancho completo (alias para fullWidth) */
  stretch?: boolean;

  // ===== DAISYUI INSPIRED =====
  /** Efecto glassmorphism (backdrop blur) */
  glass?: boolean;

  /** Sin border-radius (esquinas rectas) */
  square?: boolean;

  /** Completamente circular */
  circle?: boolean;

  /** Fuerza estado active/presionado */
  active?: boolean;

  // ===== CUSTOM =====
  /** Clases CSS adicionales */
  class?: string;
}
