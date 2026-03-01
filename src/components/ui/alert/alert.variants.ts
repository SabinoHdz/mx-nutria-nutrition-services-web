/**
 * ALERT VARIANTS - CVA Configuration
 *
 * CVA (Class Variance Authority) genera strings de clases CSS
 * basándose en las props que pasamos.
 *
 * Ejemplo:
 * Input:  { variant: 'soft', color: 'success', size: 'md' }
 * Output: "alert alert-soft alert-soft--success alert--size-md"
 *
 * Luego CSS se encarga de aplicar los estilos a esas clases
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Función CVA principal para Alert
 * Primer argumento: clase base siempre se aplica
 * Segundo argumento: configuración de variantes
 */
export const alertVariants = cva(
  // ========================================
  // CLASE BASE: Se aplica SIEMPRE
  // ========================================
  'alert',
  {
    // ========================================
    // VARIANTS: Cada prop genera una clase
    // ========================================
    variants: {
      // ========================================
      // VARIANT: 4 opciones
      // ========================================
      variant: {
        solid: 'alert-solid',
        soft: 'alert-soft',
        outline: 'alert-outline',
        bordered: 'alert-bordered',
      },

      // ========================================
      // COLOR: 7 opciones
      // ========================================
      // Las clases están vacías aquí porque se combinan
      // con variant en compoundVariants
      color: {
        primary: '',
        secondary: '',
        accent: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },

      // ========================================
      // SIZE: 5 opciones
      // ========================================
      size: {
        xs: 'alert--size-xs',
        sm: 'alert--size-sm',
        md: 'alert--size-md',
        lg: 'alert--size-lg',
        xl: 'alert--size-xl',
      },

      // ========================================
      // DENSE: Versión compacta
      // ========================================
      dense: {
        true: 'alert--dense',
        false: '',
      },

      // ========================================
      // ROUNDED: Esquinas muy redondeadas
      // ========================================
      rounded: {
        true: 'alert--rounded',
        false: '',
      },

      // ========================================
      // INLINE ACTIONS: Acciones en misma línea
      // ========================================
      inlineActions: {
        true: 'alert--inline-actions',
        false: '',
      },
    },

    // ========================================
    // COMPOUND VARIANTS
    // ========================================
    // Combinar variant + color para generar clases específicas
    compoundVariants: [
      // SOLID + COLORS
      { variant: 'solid', color: 'primary', class: 'alert-solid--primary' },
      { variant: 'solid', color: 'secondary', class: 'alert-solid--secondary' },
      { variant: 'solid', color: 'accent', class: 'alert-solid--accent' },
      { variant: 'solid', color: 'success', class: 'alert-solid--success' },
      { variant: 'solid', color: 'warning', class: 'alert-solid--warning' },
      { variant: 'solid', color: 'error', class: 'alert-solid--error' },
      { variant: 'solid', color: 'info', class: 'alert-solid--info' },

      // SOFT + COLORS
      { variant: 'soft', color: 'primary', class: 'alert-soft--primary' },
      { variant: 'soft', color: 'secondary', class: 'alert-soft--secondary' },
      { variant: 'soft', color: 'accent', class: 'alert-soft--accent' },
      { variant: 'soft', color: 'success', class: 'alert-soft--success' },
      { variant: 'soft', color: 'warning', class: 'alert-soft--warning' },
      { variant: 'soft', color: 'error', class: 'alert-soft--error' },
      { variant: 'soft', color: 'info', class: 'alert-soft--info' },

      // OUTLINE + COLORS
      { variant: 'outline', color: 'primary', class: 'alert-outline--primary' },
      { variant: 'outline', color: 'secondary', class: 'alert-outline--secondary' },
      { variant: 'outline', color: 'accent', class: 'alert-outline--accent' },
      { variant: 'outline', color: 'success', class: 'alert-outline--success' },
      { variant: 'outline', color: 'warning', class: 'alert-outline--warning' },
      { variant: 'outline', color: 'error', class: 'alert-outline--error' },
      { variant: 'outline', color: 'info', class: 'alert-outline--info' },

      // BORDERED + COLORS
      { variant: 'bordered', color: 'primary', class: 'alert-bordered--primary' },
      { variant: 'bordered', color: 'secondary', class: 'alert-bordered--secondary' },
      { variant: 'bordered', color: 'accent', class: 'alert-bordered--accent' },
      { variant: 'bordered', color: 'success', class: 'alert-bordered--success' },
      { variant: 'bordered', color: 'warning', class: 'alert-bordered--warning' },
      { variant: 'bordered', color: 'error', class: 'alert-bordered--error' },
      { variant: 'bordered', color: 'info', class: 'alert-bordered--info' },
    ],

    // ========================================
    // DEFAULT VARIANTS
    // ========================================
    defaultVariants: {
      variant: 'soft',
      color: 'info',
      size: 'md',
      dense: false,
      rounded: false,
      inlineActions: false,
    },
  },
);

/**
 * Exportar tipo para TypeScript
 */
export type AlertVariants = VariantProps<typeof alertVariants>;
