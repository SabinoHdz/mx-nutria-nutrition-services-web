/**
 * TEXT-AREA COMPONENT - Types & Interfaces
 * Mirrors input.ts structure for consistency.
 */

import type { ValidationRule } from '../form';

export const TEXT_AREA_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type TextAreaSize = (typeof TEXT_AREA_SIZES)[number];

export const TEXT_AREA_VARIANTS = ['solid', 'outline', 'soft', 'borderless', 'filled'] as const;
export type TextAreaVariant = (typeof TEXT_AREA_VARIANTS)[number];

export const TEXT_AREA_COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
] as const;
export type TextAreaColor = (typeof TEXT_AREA_COLORS)[number];

export const TEXT_AREA_ROUNDED = ['none', 'sm', 'md', 'lg', 'full'] as const;
export type TextAreaRounded = (typeof TEXT_AREA_ROUNDED)[number];

export const TEXT_AREA_RESIZE = ['none', 'vertical', 'horizontal', 'both'] as const;
export type TextAreaResize = (typeof TEXT_AREA_RESIZE)[number];

/** Tipos que aplican filtro de caracteres (reutiliza lógica de VInput) */
export const TEXT_AREA_FILTER_TYPES = [
  'text',
  'alphabetic',
  'alphanumeric',
  'alphanumeric-special',
] as const;
export type TextAreaFilterType = (typeof TEXT_AREA_FILTER_TYPES)[number];

export interface TextAreaProps {
  modelValue?: string | null;
  /** Filtro de caracteres: 'text' sin filtro; alphabetic/alphanumeric/alphanumeric-special restringen entrada */
  type?: TextAreaFilterType;
  label?: string;
  placeholder?: string;

  disabled?: boolean;
  readonly?: boolean;

  required?: boolean;
  rules?: ValidationRule<string>[];
  messageRequired?: string;
  validateOn?: 'blur' | 'input';

  maxlength?: number;
  minlength?: number;

  hint?: string;
  counter?: boolean;
  dense?: boolean;
  variant?: TextAreaVariant;
  color?: TextAreaColor;
  size?: TextAreaSize;
  rounded?: TextAreaRounded;
  shadow?: boolean;

  rows?: number;
  resize?: TextAreaResize;

  autofocus?: boolean;
  textAreaClass?: string;

  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const getDefaultRequiredMessageTextArea = (label: string): string => {
  return `El campo "${label}" es requerido`;
};
