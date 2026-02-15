/**
 * TOGGLE COMPONENT - Types, Constants & Interfaces
 */

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'solid' | 'soft' | 'outline';
export type ToggleColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
export type ToggleLabelPosition = 'left' | 'right';
export type ToggleValue = string | number | boolean;

export const TOGGLE_SIZES = ['sm', 'md', 'lg'] as const;
export const TOGGLE_VARIANTS = ['solid', 'soft', 'outline'] as const;
export const TOGGLE_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
] as const;

export interface ToggleProps {
  modelValue?: ToggleValue;
  trueValue?: ToggleValue;
  falseValue?: ToggleValue;
  label?: string;
  labelPosition?: ToggleLabelPosition;
  onIcon?: string;
  offIcon?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  size?: ToggleSize;
  variant?: ToggleVariant;
  color?: ToggleColor;
  name?: string;
  id?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  rules?: ((value: ToggleValue) => boolean | string)[];
}

export interface ToggleGroupOption {
  label: string;
  value: ToggleValue;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  modelValue?: ToggleValue;
  options: ToggleGroupOption[];
  label?: string;
  hint?: string;
  size?: ToggleSize;
  variant?: ToggleVariant;
  color?: ToggleColor;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  direction?: 'vertical' | 'horizontal';
}

export interface ToggleEmits {
  'update:modelValue': [value: ToggleValue];
  change: [value: ToggleValue];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}

export interface ToggleGroupEmits {
  'update:modelValue': [value: ToggleValue];
  change: [value: ToggleValue];
}
