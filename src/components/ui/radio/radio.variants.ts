/**
 * RADIO COMPONENT - CVA Configuration
 *
 * CVA (Class Variance Authority) genera clases CSS automáticamente
 * basándose en las props que pasamos.
 *
 * Ejemplo:
 * Input:  { variant: 'solid', color: 'primary', size: 'md' }
 * Output: "radio radio--variant-solid radio--color-primary radio--size-md"
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Función CVA principal para el radio
 * Genera clases CSS según las props del componente
 */
export const radioVariants = cva(
  // ========================================
  // CLASE BASE: Se aplica SIEMPRE
  // ========================================
  // Todos los radios tendrán esta clase
  'radio',

  {
    // ========================================
    // VARIANTS: Cada prop genera una clase
    // ========================================
    variants: {
      // ========================================
      // VARIANT: 4 variantes visuales
      // ========================================
      // Determina la presentación del radio (solid, outline, soft, borderless)
      variant: {
        solid: 'radio--variant-solid',
        outline: 'radio--variant-outline',
        soft: 'radio--variant-soft',
        borderless: 'radio--variant-borderless',
      },

      // ========================================
      // COLOR: 7 colores semánticos
      // ========================================
      // Si pasas color="primary", genera clase "radio--color-primary"
      color: {
        primary: 'radio--color-primary',
        secondary: 'radio--color-secondary',
        success: 'radio--color-success',
        warning: 'radio--color-warning',
        error: 'radio--color-error',
        info: 'radio--color-info',
        neutral: 'radio--color-neutral',
      },

      // ========================================
      // SIZE: 5 tamaños
      // ========================================
      // Controla el tamaño del checkbox circle
      size: {
        xs: 'radio--size-xs',
        sm: 'radio--size-sm',
        md: 'radio--size-md',
        lg: 'radio--size-lg',
        xl: 'radio--size-xl',
      },

      // ========================================
      // DISABLED: Booleano (true/false)
      // ========================================
      // Si disabled=true, genera clase "radio--disabled"
      // CSS aplicará: pointer-events-none, opacity reducida
      disabled: {
        true: 'radio--disabled',
        false: '',
      },

      // ========================================
      // ERROR: Booleano (true/false)
      // ========================================
      // Si error=true, genera clase "radio--error"
      // CSS aplicará: color rojo/error
      error: {
        true: 'radio--error',
        false: '',
      },

      // ========================================
      // READONLY: Booleano (true/false)
      // ========================================
      // Si readonly=true, genera clase "radio--readonly"
      // CSS aplicará: cursor-not-allowed pero visible
      readonly: {
        true: 'radio--readonly',
        false: '',
      },
    },

    // ========================================
    // COMPOUND VARIANTS: Combinar múltiples props
    // ========================================
    // Para casos especiales donde dos props necesitan comportamiento especial combinado
    compoundVariants: [
      // Cuando disabled=true, agregar clases de opacidad
      {
        disabled: true,
        class: 'pointer-events-none opacity-50',
      },
    ],

    // ========================================
    // DEFAULT VARIANTS: Valores por defecto
    // ========================================
    // Si el usuario NO proporciona una prop, se usa este valor
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      disabled: false,
      error: false,
      readonly: false,
    },
  },
);

/**
 * Exportar tipo para TypeScript
 * Permite que TypeScript sepa qué props acepta CVA
 */
export type RadioVariants = VariantProps<typeof radioVariants>;
