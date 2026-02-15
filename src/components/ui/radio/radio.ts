/**
 * RADIO COMPONENT - Types, Constants & Interfaces
 *
 * Define todos los tipos TypeScript, constantes y la interfaz de props
 * para el componente Radio con type-safety garantizado
 */

// ========================================
// 1. VARIANTES (Estilos visuales)
// ========================================
/**
 * 4 variantes visuales disponibles
 * - solid: fondo sólido (default)
 * - outline: solo borde
 * - soft: fondo suave/transparente
 * - borderless: sin borde, solo indicador
 */
export const RADIO_VARIANTS = ['solid', 'outline', 'soft', 'borderless'] as const;

export type RadioVariant = (typeof RADIO_VARIANTS)[number];

// ========================================
// 2. COLORES SEMÁNTICOS
// ========================================
/**
 * 7 colores que coinciden con el design system
 * Consistencia visual en toda la app
 */
export const RADIO_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
] as const;

export type RadioColor = (typeof RADIO_COLORS)[number];

// ========================================
// 3. TAMAÑOS
// ========================================
/**
 * 5 tamaños disponibles
 * xs: muy pequeño (icono mínimo)
 * sm: pequeño
 * md: mediano (default)
 * lg: grande
 * xl: extra grande
 */
export const RADIO_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type RadioSize = (typeof RADIO_SIZES)[number];

// ========================================
// 4. TIPOS ALIAS
// ========================================
export type RadioValue = string | number | boolean;

// ========================================
// 4. INTERFACE PROPS
// ========================================
/**
 * Interfaz que define TODAS las props del componente Radio
 */
export interface RadioProps {
  // ===== CONTENIDO Y VALOR =====
  /** Valor seleccionado actualmente (v-model) */
  modelValue?: RadioValue;

  /** Valor que representa este radio cuando está seleccionado */
  value: RadioValue;

  /** Label visible del radio */
  label?: string;

  /** Hint o texto de ayuda debajo del radio */
  hint?: string;

  // ===== NOMBRE Y VALIDACIÓN =====
  /** Nombre del input (para agrupar radios) */
  name?: string;

  /** Campo requerido (valida en submit) */
  required?: boolean;

  /** Reglas de validación personalizadas */
  rules?: ((value: RadioValue) => boolean | string)[];

  /** Mostrar message de error */
  error?: boolean;

  /** Mensaje de error personalizado */
  errorMessage?: string;

  // ===== ESTILOS =====
  /** Variante visual (solid, outline, soft, borderless) */
  variant?: RadioVariant;

  /** Color semántico (primary, secondary, error, etc.) */
  color?: RadioColor;

  /** Tamaño del radio (xs, sm, md, lg, xl) */
  size?: RadioSize;

  // ===== ESTADOS =====
  /** Deshabilitar el radio */
  disabled?: boolean;

  /** Solo lectura (no cambiar valor, pero sí tab) */
  readonly?: boolean;

  // ===== ACCESIBILIDAD =====
  /** ID personalizado */
  id?: string;

  /** Descripción ARIA */
  ariaDescribedby?: string;
}

// ========================================
// 5. INTERFACE EMITS
// ========================================
/**
 * Eventos que emite el componente
 */
export interface RadioEmits {
  /** Emitido cuando cambia el valor (v-model) */
  'update:modelValue': [value: RadioValue];

  /** Emitido cuando cambia la selección */
  change: [value: RadioValue];

  /** Emitido cuando el input recibe focus */
  focus: [event: FocusEvent];

  /** Emitido cuando el input pierde focus */
  blur: [event: FocusEvent];
}
