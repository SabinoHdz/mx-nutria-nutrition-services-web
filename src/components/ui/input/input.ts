/**
 * INPUT COMPONENT - Types, Constants & Interfaces
 */

import type { ValidationRule } from '../form';
import type { TooltipPlacement } from '../tooltip';

// ========================================
// 1. INPUT TYPES
// ========================================
export const INPUT_TYPES = [
  'text',
  'email',
  'number',
  'decimal',
  'phone',
  'password',
  'search',
  'alphabetic',
  'alphanumeric',
  'alphanumeric-special',
  'url',
] as const;
export type InputType = (typeof INPUT_TYPES)[number];

// ========================================
// 2. SIZES & VARIANTS
// ========================================
export const INPUT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type InputSize = (typeof INPUT_SIZES)[number];

export const INPUT_VARIANTS = ['solid', 'outline', 'soft', 'borderless', 'filled'] as const;
export type InputVariant = (typeof INPUT_VARIANTS)[number];

export const INPUT_COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
] as const;
export type InputColor = (typeof INPUT_COLORS)[number];

export const INPUT_ROUNDED = ['none', 'sm', 'md', 'lg', 'full'] as const;
export type InputRounded = (typeof INPUT_ROUNDED)[number];

// ========================================
// 3. INTERFACE PROPS
// ========================================
export interface InputProps {
  // Básicos
  modelValue?: string | number | null;
  type?: InputType;
  label?: string;
  placeholder?: string;

  // Estados
  disabled?: boolean;
  readonly?: boolean;

  // Validación
  required?: boolean;
  rules?: ValidationRule<string | number>[];
  messageRequired?: string;
  validateOn?: 'blur' | 'input';

  // Números
  min?: number;
  max?: number;
  step?: number;

  // Decimales
  decimalPlaces?: number;
  integerDigits?: number;

  // Caracteres
  maxlength?: number;
  minlength?: number;

  // UI
  clearable?: boolean;
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  prependIcon?: string;
  appendIcon?: string;

  // Nuevas features inspiradas en Quasar/DaisyUI
  hint?: string; // Texto de ayuda persistente
  counter?: boolean; // Muestra contador de caracteres
  dense?: boolean; // Modo compacto
  loading?: boolean; // Estado de carga con spinner
  prefix?: string; // Texto antes del input
  suffix?: string; // Texto después del input (también sirve para unidades: kg, mts, °C, etc.)
  rounded?: InputRounded; // Radio de borde (none, sm, md, lg, full)
  autofocus?: boolean; // Auto focus al montar
  inputClass?: string; // Clase adicional para el input
  shadow?: boolean; // Agrega sombra al contenedor

  // Tooltip informativo
  labelTooltip?: string; // Texto del tooltip a mostrar junto al label
  labelTooltipPlacement?: TooltipPlacement; // Posición del tooltip (default: 'top')

  // Accesibilidad
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

// ========================================
// 4. ERROR MESSAGE DEFAULTS
// ========================================
export const getDefaultRequiredMessage = (label: string): string => {
  return `El campo "${label}" es requerido`;
};

export const getTypeErrorMessages: Record<InputType, string> = {
  email: 'Email inválido',
  number: 'Solo se permiten números enteros',
  decimal: 'Formato de decimal inválido',
  phone: 'Teléfono inválido',
  password: 'Contraseña inválida',
  search: 'Búsqueda inválida',
  alphabetic: 'Solo se permiten letras',
  alphanumeric: 'Solo se permiten letras y números',
  'alphanumeric-special': 'Formato inválido',
  url: 'URL inválida',
  text: 'Texto inválido',
};

// ========================================
// 5. REGEX PATTERNS
// ========================================
export const VALIDATION_PATTERNS: Record<InputType, RegExp | null> = {
  // RFC 5322 simplified
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // RFC 3986 simplified
  url: /^(https?|ftp):\/\/[^\s]+$/,
  phone: /^\+?[\d\s\-()]{7,}$/, // Flexible phone format
  text: null,
  number: null,
  decimal: null,
  password: null,
  search: null,
  alphabetic: null,
  alphanumeric: null,
  'alphanumeric-special': null,
};

// ========================================
// 6. INPUT CONFIG BY TYPE
// ========================================
export const INPUT_CONFIG: Record<
  InputType,
  {
    inputType: string;
    allowClear: boolean;
    pattern?: string;
  }
> = {
  text: { inputType: 'text', allowClear: true },
  email: { inputType: 'email', allowClear: true },
  number: { inputType: 'number', allowClear: true },
  decimal: { inputType: 'text', allowClear: true },
  phone: { inputType: 'tel', allowClear: true },
  password: { inputType: 'password', allowClear: true },
  search: { inputType: 'search', allowClear: true },
  alphabetic: { inputType: 'text', allowClear: true },
  alphanumeric: { inputType: 'text', allowClear: true },
  'alphanumeric-special': { inputType: 'text', allowClear: true },
  url: { inputType: 'url', allowClear: true },
};
