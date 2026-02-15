/**
 * STEP 3: CVA CONFIGURATION
 *
 * CVA (Class Variance Authority) genera strings de clases CSS
 * basándose en las props que pasamos.
 *
 * Ejemplo:
 * Input:  { color: 'primary', size: 'md', placement: 'top' }
 * Output: "tooltip tooltip--color-primary tooltip--size-md tooltip--placement-top"
 *
 * Luego CSS se encarga de aplicar los estilos a esas clases
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Función CVA principal
 * Primer argumento: clase base siempre se aplica
 * Segundo argumento: configuración de variantes
 */

/**
 * Función CVA principal
 * Primer argumento: clase base siempre se aplica
 * Segundo argumento: configuración de variantes
 */
export const tooltipVariants = cva(
  // ========================================
  // CLASE BASE: Se aplica SIEMPRE
  // ========================================
  // Todos los tooltips tendrán esta clase
  // En CSS definiremos: .tooltip { ... estilos base ... }
  'tooltip',

  {
    // ========================================
    // VARIANTS: Cada prop genera una clase
    // ========================================
    variants: {
      // ========================================
      // COLOR: 7 opciones
      // ========================================
      // Si pasas color="primary", genera clase "tooltip--color-primary"
      // Si pasas color="error", genera clase "tooltip--color-error"
      // Nota: dejamos los valores vacíos ("") porque CSS se encargará
      color: {
        primary: 'tooltip--color-primary',
        secondary: 'tooltip--color-secondary',
        success: 'tooltip--color-success',
        warning: 'tooltip--color-warning',
        error: 'tooltip--color-error',
        info: 'tooltip--color-info',
        neutral: 'tooltip--color-neutral',
      },

      // ========================================
      // SIZE: 5 opciones
      // ========================================
      // Si pasas size="xs", genera clase "tooltip--size-xs"
      // CSS aplicará: padding pequeño, font-size pequeño
      size: {
        xs: 'tooltip--size-xs',
        sm: 'tooltip--size-sm',
        md: 'tooltip--size-md',
        lg: 'tooltip--size-lg',
        xl: 'tooltip--size-xl',
      },

      // ========================================
      // PLACEMENT: 12 opciones
      // ========================================
      // Determina la posición del tooltip relativa al elemento
      // Si pasas placement="top", genera clase "tooltip--placement-top"
      // CSS aplicará: posición absoluta, transform para centrar, etc.
      placement: {
        top: 'tooltip--placement-top',
        'top-start': 'tooltip--placement-top-start',
        'top-end': 'tooltip--placement-top-end',
        bottom: 'tooltip--placement-bottom',
        'bottom-start': 'tooltip--placement-bottom-start',
        'bottom-end': 'tooltip--placement-bottom-end',
        left: 'tooltip--placement-left',
        'left-start': 'tooltip--placement-left-start',
        'left-end': 'tooltip--placement-left-end',
        right: 'tooltip--placement-right',
        'right-start': 'tooltip--placement-right-start',
        'right-end': 'tooltip--placement-right-end',
      },

      // ========================================
      // ARROW: Booleano (true/false)
      // ========================================
      // Si arrow=true, genera clase "tooltip--arrow"
      // Si arrow=false, no genera nada ("")
      // CSS aplicará: pseudo-elemento ::before para dibujar flecha
      arrow: {
        true: 'tooltip--arrow',
        false: '',
      },

      // ========================================
      // DISABLED: Booleano (true/false)
      // ========================================
      // Si disabled=true, genera clase "tooltip--disabled"
      // CSS aplicará: pointer-events-none, opacity reducida
      disabled: {
        true: 'tooltip--disabled',
        false: '',
      },

      // ========================================
      // TRANSITION: Tipo de animación
      // ========================================
      // Si transition="fade", genera clase "tooltip--transition-fade"
      // CSS aplicará: animación de opacidad
      transition: {
        fade: 'tooltip--transition-fade',
        scale: 'tooltip--transition-scale',
        slide: 'tooltip--transition-slide',
      },
    },

    // ========================================
    // COMPOUND VARIANTS: Combinar múltiples props
    // ========================================
    // Se usan solo para casos especiales donde necesitas que
    // múltiples props se combinen para generar una clase adicional
    compoundVariants: [
      // Cuando disabled=true, agregar clase extra
      {
        disabled: true,
        class: 'pointer-events-none opacity-0',
      },
    ],

    // ========================================
    // DEFAULT VARIANTS: Valores por defecto
    // ========================================
    // Si el usuario NO proporciona una prop, se usa este valor
    // Ejemplo: si no pasas size, se usa 'md'
    defaultVariants: {
      color: 'neutral',
      size: 'md',
      placement: 'top',
      arrow: true,
      disabled: false,
      transition: 'fade',
    },
  },
);

/**
 * Exportar tipo para TypeScript
 * Permite que TypeScript sepa qué props acepta CVA
 */
export type TooltipVariants = VariantProps<typeof tooltipVariants>;
