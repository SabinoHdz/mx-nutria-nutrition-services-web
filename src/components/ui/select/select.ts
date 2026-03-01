/**
 * SELECT COMPONENT - Types, Constants & Interfaces
 */

import type { ValidationRule } from '../form';
import type { TooltipPlacement } from '../tooltip';

// ========================================
// 1. SIZES & VARIANTS
// ========================================
export const SELECT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type SelectSize = (typeof SELECT_SIZES)[number];

export const SELECT_VARIANTS = ['solid', 'outline', 'soft', 'borderless', 'filled'] as const;
export type SelectVariant = (typeof SELECT_VARIANTS)[number];

export const SELECT_COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
] as const;
export type SelectColor = (typeof SELECT_COLORS)[number];

export const SELECT_ROUNDED = ['none', 'sm', 'md', 'lg', 'full'] as const;
export type SelectRounded = (typeof SELECT_ROUNDED)[number];

// ========================================
// 2. OPTIONS
// ========================================
export interface SelectOption {
  label: string;
  value: string | number;
  disable?: boolean;
  description?: string;
  icon?: string;
}

// ========================================
// 3. INTERFACE PROPS
// ========================================
export interface SelectProps {
  // Basicos
  modelValue?: string | number | Array<string | number> | null;
  options: SelectOption[];
  label: string;
  placeholder?: string;

  // Estados
  disabled?: boolean;
  readonly?: boolean;

  // Validacion
  required?: boolean;
  rules?: ValidationRule<string | number | Array<string | number>>[];
  messageRequired?: string;
  validateOn?: 'blur' | 'input';

  // UI
  clearable?: boolean;
  variant?: SelectVariant;
  color?: SelectColor;
  size?: SelectSize;
  dense?: boolean;
  rounded?: SelectRounded;
  shadow?: boolean;
  loading?: boolean;

  // Quasar / DaisyUI inspired
  multiple?: boolean;
  useChips?: boolean;
  searchable?: boolean;
  maxValues?: number;
  emptyText?: string;

  // Mapping de options estilo Quasar
  optionLabel?: string;
  optionValue?: string;
  optionDisable?: string;

  // Tooltip informativo
  labelTooltip?: string;
  labelTooltipPlacement?: TooltipPlacement;

  // Ayuda
  hint?: string;

  // Accesibilidad
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

