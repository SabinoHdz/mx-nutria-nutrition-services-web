/**
 * Banner Component Variants
 * Configuración de CVA para mapear props -> clases CSS
 */

import { cva } from 'class-variance-authority';

export const bannerVariants = cva('banner', {
  variants: {
    variant: {
      primary: 'banner--primary',
      secondary: 'banner--secondary',
      accent: 'banner--accent',
      info: 'banner--info',
      success: 'banner--success',
      warning: 'banner--warning',
      error: 'banner--error',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
