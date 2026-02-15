import { cva } from 'class-variance-authority';

/**
 * Badge component variants configuration using CVA
 * Defines all visual variants, colors, sizes and their combinations
 */

/**
 * CVA (Class Variance Authority) - Configuración de variantes del Badge
 *
 * CVA es una utilidad para construir strings de clases CSS de forma type-safe
 * basándose en diferentes "variantes" (props del componente).
 *
 * Estructura:
 * - Primer argumento: Clases base que SIEMPRE se aplican
 * - Segundo argumento: Objeto de configuración con:
 *   - variants: Define las posibles variantes y sus clases
 *   - compoundVariants: Combina múltiples variantes (refererencias a clases en CSS)
 *   - defaultVariants: Valores por defecto
 *
 * ARQUITECTURA HIBRIDA (Recomendada):
 * - ESTILOS BASE (.badge) → Definidos en CSS
 * - VARIANTES SIMPLES (.badge-solid, .badge-outline) → Definidas en CSS
 * - COMPOUND VARIANTS (.badge-solid--primary) → Definidas en CSS (incluyendo dark mode)
 * - CVA → Solo orquesta las clases (mantiene lógica limpia y legible)
 *
 * VENTAJAS:
 * ✅ Separación de responsabilidades clara
 * ✅ Dark mode centralizado en CSS (no duplicado)
 * ✅ CVA limpio y enfocado en composición
 * ✅ Fácil expandir: agregar nuevas clases en CSS sin cambiar CVA
 */
export const badgeVariants = cva(
  // 1️⃣ CLASE BASE: Siempre se aplica, sin importar las props
  'badge',
  {
    // 2️⃣ VARIANTS: Define cada prop y sus posibles valores
    variants: {
      // variant: Define el estilo visual del badge
      variant: {
        solid: 'badge-solid', // Fondo sólido
        outline: 'badge-outline', // Solo borde, fondo transparente
        ghost: 'badge-ghost', // Sin fondo ni borde, hover sutil
        soft: 'badge-soft', // Fondo semi-transparente (definido en compoundVariants)
        dashed: 'badge-dashed', // Borde punteado
      },

      // color: Define el color semántico (se combina con variant en compoundVariants)
      // Dejamos vacío porque cada combinación variant+color es única
      color: {
        primary: '',
        secondary: '',
        accent: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },

      // size: Define el tamaño del badge (xs, sm, md, lg, xl)
      size: {
        xs: 'badge--size-xs', // Extra pequeño (0.65rem)
        sm: 'badge--size-sm', // Pequeño (0.75rem)
        md: 'badge--size-md', // Mediano (0.875rem) - default
        lg: 'badge--size-lg', // Grande (1rem)
        xl: 'badge--size-xl', // Extra grande (1.125rem)
      },

      // dot: Muestra el badge como un indicador puntual/circular
      dot: {
        true: 'badge--dot', // Modo punto: redondo y compacto
        false: '', // Modo normal
      },
    },

    // 3️⃣ COMPOUND VARIANTS: Combina múltiples props para casos específicos
    // Cuando variant='solid' Y color='primary', aplica estas clases
    // Las clases están definidas en badge.css con soporte para dark mode
    compoundVariants: [
      // ========================================
      // SOLID VARIANTS (Fondo sólido + texto)
      // ========================================
      { variant: 'solid', color: 'primary', class: 'badge-solid--primary' },
      { variant: 'solid', color: 'secondary', class: 'badge-solid--secondary' },
      { variant: 'solid', color: 'accent', class: 'badge-solid--accent' },
      { variant: 'solid', color: 'success', class: 'badge-solid--success' },
      { variant: 'solid', color: 'warning', class: 'badge-solid--warning' },
      { variant: 'solid', color: 'error', class: 'badge-solid--error' },
      { variant: 'solid', color: 'info', class: 'badge-solid--info' },

      // ========================================
      // OUTLINE VARIANTS (Solo borde + texto)
      // ========================================
      { variant: 'outline', color: 'primary', class: 'badge-outline--primary' },
      { variant: 'outline', color: 'secondary', class: 'badge-outline--secondary' },
      { variant: 'outline', color: 'accent', class: 'badge-outline--accent' },
      { variant: 'outline', color: 'success', class: 'badge-outline--success' },
      { variant: 'outline', color: 'warning', class: 'badge-outline--warning' },
      { variant: 'outline', color: 'error', class: 'badge-outline--error' },
      { variant: 'outline', color: 'info', class: 'badge-outline--info' },

      // ========================================
      // SOFT VARIANTS (Fondo semi-transparente)
      // ========================================
      { variant: 'soft', color: 'primary', class: 'badge-soft--primary' },
      { variant: 'soft', color: 'secondary', class: 'badge-soft--secondary' },
      { variant: 'soft', color: 'accent', class: 'badge-soft--accent' },
      { variant: 'soft', color: 'success', class: 'badge-soft--success' },
      { variant: 'soft', color: 'warning', class: 'badge-soft--warning' },
      { variant: 'soft', color: 'error', class: 'badge-soft--error' },
      { variant: 'soft', color: 'info', class: 'badge-soft--info' },

      // ========================================
      // GHOST VARIANTS (Sin fondo, hover sutil)
      // ========================================
      { variant: 'ghost', color: 'primary', class: 'badge-ghost--primary' },
      { variant: 'ghost', color: 'secondary', class: 'badge-ghost--secondary' },
      { variant: 'ghost', color: 'accent', class: 'badge-ghost--accent' },
      { variant: 'ghost', color: 'success', class: 'badge-ghost--success' },
      { variant: 'ghost', color: 'warning', class: 'badge-ghost--warning' },
      { variant: 'ghost', color: 'error', class: 'badge-ghost--error' },
      { variant: 'ghost', color: 'info', class: 'badge-ghost--info' },

      // ========================================
      // DASHED VARIANTS (Borde punteado)
      // ========================================
      { variant: 'dashed', color: 'primary', class: 'badge-dashed--primary' },
      { variant: 'dashed', color: 'secondary', class: 'badge-dashed--secondary' },
      { variant: 'dashed', color: 'accent', class: 'badge-dashed--accent' },
      { variant: 'dashed', color: 'success', class: 'badge-dashed--success' },
      { variant: 'dashed', color: 'warning', class: 'badge-dashed--warning' },
      { variant: 'dashed', color: 'error', class: 'badge-dashed--error' },
      { variant: 'dashed', color: 'info', class: 'badge-dashed--info' },
    ],

    // 4️⃣ DEFAULT VARIANTS: Valores por defecto si no se pasa ninguna prop
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
    },
  },
);

/**
 * EJEMPLO DE USO:
 *
 * badgeVariants({ variant: 'solid', color: 'primary', size: 'md' })
 * // Retorna: "badge badge-solid badge-solid--primary text-sm px-3 py-1"
 *
 * Clases aplicadas:
 * - 'badge' (base)
 * - 'badge-solid' (de variant: 'solid')
 * - 'badge-solid--primary' (de compoundVariant: solid + primary) [DEFINIDO EN CSS]
 * - 'text-sm px-3 py-1' (de size: 'md')
 *
 * VENTAJAS:
 * ✅ CVA limpio y legible
 * ✅ Estilos centralizados en CSS (badge.css)
 * ✅ Dark mode manejado completamente en CSS
 * ✅ Fácil escalar: solo agregar nuevos variant/color en CSS
 */
