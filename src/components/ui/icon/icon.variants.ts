/**
 * Icon Component Variants
 * Configuración de CVA (Class Variance Authority) para el componente Icon
 *
 * ARQUITECTURA:
 * Similar al Badge, usamos CVA para componer clases CSS predefinidas.
 * Las clases están en assets/css/components/icon.css
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Función CVA para generar clases del icono
 *
 * @example
 * iconVariants({ family: 'rounded', size: 'lg', color: 'primary' })
 * // Returns: 'icon icon--rounded icon--lg icon--primary'
 */
export const iconVariants = cva(
  // Clase base - siempre aplicada
  'icon',
  {
    variants: {
      /**
       * Familia de fuente del icono
       * Determina el estilo visual: outlined, rounded o sharp
       */
      family: {
        outlined: 'icon--outlined',
        rounded: 'icon--rounded',
        sharp: 'icon--sharp',
      },

      /**
       * Tamaño del icono
       * Controla font-size (de 16px a 64px)
       */
      size: {
        xs: 'icon--xs', // 16px
        sm: 'icon--sm', // 20px
        md: 'icon--md', // 24px (default Material)
        lg: 'icon--lg', // 32px
        xl: 'icon--xl', // 40px
        '2xl': 'icon--2xl', // 48px
        '3xl': 'icon--3xl', // 64px
      },

      /**
       * Color del icono
       * Usa tokens semánticos del sistema de diseño
       */
      color: {
        primary: 'icon--primary',
        secondary: 'icon--secondary',
        accent: 'icon--accent',
        success: 'icon--success',
        warning: 'icon--warning',
        error: 'icon--error',
        info: 'icon--info',
        current: 'icon--current', // Hereda color del padre
      },

      /**
       * Estilo de relleno
       * filled = true: icono sólido (FILL = 1)
       * filled = false: icono outline (FILL = 0)
       */
      filled: {
        true: 'icon--filled',
        false: '',
      },

      /**
       * Estado interactivo
       * Agrega cursor pointer y efectos hover/active
       */
      interactive: {
        true: 'icon--interactive',
        false: '',
      },

      /**
       * Estado deshabilitado
       * Reduce opacidad y quita interactividad
       */
      disabled: {
        true: 'icon--disabled',
        false: '',
      },
    },

    /**
     * Variantes compuestas
     * Combinaciones específicas que necesitan estilos adicionales
     */
    compoundVariants: [
      // Cuando está deshabilitado, nunca debe ser interactivo
      {
        disabled: true,
        interactive: true,
        class: '!cursor-not-allowed',
      },
    ],

    /**
     * Valores por defecto
     * Se usan si no se especifica la prop
     */
    defaultVariants: {
      family: 'outlined',
      size: 'md',
      color: 'current',
      filled: false,
      interactive: false,
      disabled: false,
    },
  },
);

/**
 * Tipo inferido de las variantes para TypeScript
 * Permite type-safety al usar iconVariants
 */
export type IconVariants = VariantProps<typeof iconVariants>;
