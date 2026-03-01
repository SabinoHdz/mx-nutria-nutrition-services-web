/**
 * Button Component Variants
 * Configuración de CVA para mapear props -> clases CSS
 *
 * ARQUITECTURA:
 * - CVA actúa como ORQUESTADOR DE CLASES
 * - Genera clases individuales por prop (sin combinar como compound variants)
 * - Las combinaciones complejas se manejan en CSS usando selectores descendentes
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Función CVA para button
 *
 * Estructura:
 * 1. CLASE BASE ('button') - Se aplica siempre
 * 2. VARIANTS - Cada prop genera una clase independiente
 * 3. COMPOUND VARIANTS - Solo para casos muy específicos (disabled, loading, fab)
 * 4. DEFAULT VARIANTS - Valores por defecto
 */
export const buttonVariants = cva('button', {
  variants: {
    // ========================================
    // VARIANT: Define el estilo visual del botón
    // ========================================
    // Cada variante es una clase base que define colores, bordes, fondos
    // NO incluimos color (primary, secondary, etc.) porque el color se aplica
    // como CLASE SEPARADA en CSS (button-solid.button--color-primary)
    variant: {
      solid: 'button-solid', // Fondo sólido opaco
      outline: 'button-outline', // Solo borde, fondo transparente
      ghost: 'button-ghost', // Sin borde, texto coloreado
      soft: 'button-soft', // Fondo semi-transparente
      dashed: 'button-dashed', // Borde punteado
      link: 'button-link', // Estilo de enlace (underline)
    },

    // ========================================
    // COLOR: Color semántico (se combina con variant en CSS)
    // ========================================
    // La clase generada (button--color-primary) se APLICA JUNTO A variant
    // El CSS se encarga de combinarlas: .button-solid.button--color-primary { ... }
    color: {
      primary: 'button--color-primary',
      secondary: 'button--color-secondary',
      success: 'button--color-success',
      warning: 'button--color-warning',
      error: 'button--color-error',
      info: 'button--color-info',
    },

    // ========================================
    // SIZE: Tamaño del botón (padding y tipografía)
    // ========================================
    size: {
      xs: 'button--size-xs', // Muy pequeño (px-3 py-1 text-xs)
      sm: 'button--size-sm', // Pequeño
      md: 'button--size-md', // Mediano (default)
      lg: 'button--size-lg', // Grande
      xl: 'button--size-xl', // Extra grande
    },

    // ========================================
    // BOOLEAN PROPS: Modificadores on/off
    // ========================================
    // Cada prop booleano genera una clase cuando es true, vacío cuando es false
    // Esta es la DIFERENCIA PRINCIPAL con Badge: Button tiene muchos modificadores

    // Estado deshabilitado
    disabled: {
      true: 'button--disabled opacity-50 cursor-not-allowed', // Múltiples clases Tailwind
      false: '', // Sin clase cuando está habilitado
    },

    // Estado de carga (loading spinner)
    loading: {
      true: 'button--loading', // Cursor de espera, spinner visible
      false: '',
    },

    // Forma de píldora (rounded-full)
    rounded: {
      true: 'button--rounded',
      false: '',
    },

    // Esquinas rectas (sin border-radius)
    square: {
      true: 'button--square',
      false: '',
    },

    // Forma completamente circular
    circle: {
      true: 'button--circle',
      false: '',
    },

    // Padding compacto (menos vertical)
    dense: {
      true: 'button--dense',
      false: '',
    },

    // Solo mostrar icono, sin texto
    iconOnly: {
      true: 'button--icon-only',
      false: '',
    },

    // Ancho completo (100% del contenedor)
    fullWidth: {
      true: 'button--full-width w-full', // Combina clase custom + Tailwind
      false: '',
    },

    // Padding horizontal extra
    push: {
      true: 'button--push',
      false: '',
    },

    // Efecto brillante con gradiente
    glossy: {
      true: 'button--glossy',
      false: '',
    },

    // Floating Action Button (FAB) - circular, grande, flotante
    fab: {
      true: 'button--fab',
      false: '',
    },

    // No transformar texto a mayúsculas
    noCaps: {
      true: 'button--no-caps',
      false: '',
    },

    // Sin sombra/elevación (flat style)
    unelevated: {
      true: 'button--unelevated',
      false: '',
    },

    // Sinónimo de fullWidth (WCAG, accesibilidad)
    stretch: {
      true: 'button--stretch',
      false: '',
    },

    // Fuerza estado presionado/activo
    active: {
      true: 'button--active',
      false: '',
    },

    // Padding horizontal extra (diferente a push)
    wide: {
      true: 'button--wide',
      false: '',
    },

    // Efecto glassmorphism (backdrop blur)
    glass: {
      true: 'button--glass',
      false: '',
    },

    // Efecto ripple de Material Design
    ripple: {
      true: 'button--ripple',
      false: '',
    },
  },

  // ========================================
  // COMPOUND VARIANTS: Combina múltiples props
  // ========================================
  // Se usa SOLO cuando combinaciones específicas requieren reglas especiales
  // El resto de combinaciones se manejan automáticamente en CSS
  compoundVariants: [
    // Cuando disabled es true, agregar pointer-events-none
    // (Ya está en disabled: true, pero reforzando para compound logic)
    {
      disabled: true,
      class: 'pointer-events-none',
    },
    // Cuando loading es true, también agregar pointer-events-none
    // (El usuario no puede clickear mientras carga)
    {
      loading: true,
      class: 'pointer-events-none',
    },
    // Cuando fab es true, forzar rounded-full (circular)
    // El fab siempre debe ser circular, no tiene opción alternativa
    {
      fab: true,
      class: 'rounded-full',
    },
  ],

  // ========================================
  // DEFAULT VARIANTS: Valores por defecto
  // ========================================
  // Si no se proporciona una prop, se usa estos valores
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    rounded: false,
    square: false,
    circle: false,
    dense: false,
    iconOnly: false,
    fullWidth: false,
    wide: false,
    push: false,
    glossy: false,
    fab: false,
    glass: false,
    ripple: false,
    noCaps: false,
    unelevated: false,
    stretch: false,
    active: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
