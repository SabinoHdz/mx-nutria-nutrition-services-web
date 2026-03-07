/**
 * Banner Component Type Definitions
 * Tipos e interfaces para el componente VBanner
 */

// ========================================
// VARIANTES DE COLOR (preset con dark mode)
// ========================================

export const BANNER_VARIANTS = [
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
] as const;

export type BannerVariant = (typeof BANNER_VARIANTS)[number];

// ========================================
// INTERFACE PROPS
// ========================================

export interface BannerProps {
  /** Variante de color (preset con dark mode). Por defecto primary (color-primary de Tailwind). */
  variant?: BannerVariant;

  /** Clases Tailwind de fondo. Si se define, sustituye el fondo del preset. */
  background?: string;

  /** Clases Tailwind de color de texto. Si se define, sustituye el color del preset. */
  color?: string;

  /** Clases adicionales para personalizar (Tailwind u otras). Se fusionan en el elemento raíz. */
  class?: string;
}
