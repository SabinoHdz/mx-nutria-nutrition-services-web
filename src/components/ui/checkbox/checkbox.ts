/**
 * CHECKBOX COMPONENT - Types, Constants & Interfaces
 *
 * Define tipos TypeScript, constantes y contratos
 * para VCheckbox y VCheckboxGroup.
 */

// ========================================
// 1. VARIANTES (Estilos visuales)
// ========================================
export const CHECKBOX_VARIANTS = ['solid', 'outline', 'soft', 'borderless'] as const;

export type CheckboxVariant = (typeof CHECKBOX_VARIANTS)[number];

// ========================================
// 2. COLORES SEMANTICOS
// ========================================
export const CHECKBOX_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
] as const;

export type CheckboxColor = (typeof CHECKBOX_COLORS)[number];

// ========================================
// 3. TAMANOS
// ========================================
export const CHECKBOX_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];

// ========================================
// 4. TIPOS ALIAS
// ========================================
export type CheckboxValue = string | number | boolean;

// ========================================
// 5. PROPS VCheckbox
// ========================================
export interface CheckboxProps {
  // ===== VALOR =====
  /** Valor actual (v-model) */
  modelValue?: CheckboxValue;

  /** Valor cuando esta checked (default: true) */
  trueValue?: CheckboxValue;

  /** Valor cuando esta unchecked (default: false) */
  falseValue?: CheckboxValue;

  /** Valor de esta opcion (util para grupos) */
  value?: CheckboxValue;

  /** Label visible */
  label?: string;

  /** Texto de ayuda */
  hint?: string;

  // ===== FORM =====
  /** Nombre del input */
  name?: string;

  /** Campo requerido */
  required?: boolean;

  /** Reglas de validacion */
  rules?: ((value: CheckboxValue) => boolean | string)[];

  /** Forzar estado error */
  error?: boolean;

  /** Mensaje de error */
  errorMessage?: string;

  // ===== ESTILOS =====
  variant?: CheckboxVariant;
  color?: CheckboxColor;
  size?: CheckboxSize;

  // ===== ESTADOS =====
  disabled?: boolean;
  readonly?: boolean;

  // ===== ACCESIBILIDAD =====
  id?: string;
  ariaDescribedby?: string;
}

// ========================================
// 6. EMITS VCheckbox
// ========================================
export interface CheckboxEmits {
  'update:modelValue': [value: CheckboxValue];
  change: [value: CheckboxValue];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}

// ========================================
// 7. VCheckboxGroup
// ========================================
export interface CheckboxOption {
  label: string;
  value: CheckboxValue;
  disabled?: boolean;
  hint?: string;
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[];
  options: CheckboxOption[];

  label?: string;
  hint?: string;
  name?: string;

  required?: boolean;
  rules?: ((value: CheckboxValue[]) => boolean | string)[];
  error?: boolean;
  errorMessage?: string;

  variant?: CheckboxVariant;
  color?: CheckboxColor;
  size?: CheckboxSize;

  disabled?: boolean;
  readonly?: boolean;

  direction?: 'vertical' | 'horizontal';
}

export interface CheckboxGroupEmits {
  'update:modelValue': [value: CheckboxValue[]];
  change: [value: CheckboxValue[]];
}
