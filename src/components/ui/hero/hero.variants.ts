/**
 * Hero Component Variants
 * Configuración de CVA para mapear props -> clases CSS
 */

import { cva } from 'class-variance-authority';

export const heroVariants = cva('hero', {
  variants: {
    // ========================================
    // VARIANT: Define el estilo visual
    // ========================================
    variant: {
      default: 'hero-default',
      centered: 'hero-centered',
      minimal: 'hero-minimal',
    },

    // ========================================
    // SIZE: Altura del hero
    // ========================================
    size: {
      sm: 'hero--size-sm', // ~50vh
      md: 'hero--size-md', // ~75vh
      lg: 'hero--size-lg', // 100vh
    },

    // ========================================
    // OVERLAY: Fondo oscuro sobre imagen
    // ========================================
    overlay: {
      true: 'hero--overlay',
      false: '',
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'lg',
    overlay: false,
  },
});
