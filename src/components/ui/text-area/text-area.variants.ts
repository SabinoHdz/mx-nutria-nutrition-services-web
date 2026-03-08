/**
 * TEXT-AREA VARIANTS - CVA Configuration
 * Aligned with input.variants for visual consistency.
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const textAreaVariants = cva('', {
  variants: {
    variant: {
      solid: 'textarea--solid',
      outline: 'textarea--outline',
      soft: 'textarea--soft',
      borderless: 'textarea--borderless',
      filled: 'textarea--filled',
    },
    color: {
      primary: 'textarea--primary',
      secondary: 'textarea--secondary',
      accent: 'textarea--accent',
      success: 'textarea--success',
      warning: 'textarea--warning',
      error: 'textarea--error',
      info: 'textarea--info',
    },
    size: {
      xs: 'textarea--size-xs',
      sm: 'textarea--size-sm',
      md: 'textarea--size-md',
      lg: 'textarea--size-lg',
      xl: 'textarea--size-xl',
    },
    disabled: {
      true: 'textarea--disabled',
      false: '',
    },
    error: {
      true: 'textarea--error-state',
      false: '',
    },
    dense: {
      true: 'textarea--dense',
      false: '',
    },
    rounded: {
      none: 'textarea--rounded-none',
      sm: 'textarea--rounded-sm',
      md: 'textarea--rounded-md',
      lg: 'textarea--rounded-lg',
      full: 'textarea--rounded-full',
    },
    shadow: {
      true: 'textarea--shadow',
      false: '',
    },
    resize: {
      none: 'textarea--resize-none',
      vertical: 'textarea--resize-vertical',
      horizontal: 'textarea--resize-horizontal',
      both: 'textarea--resize-both',
    },
  },
  defaultVariants: {
    variant: 'outline',
    color: 'primary',
    size: 'md',
    disabled: false,
    error: false,
    dense: false,
    rounded: 'md',
    shadow: false,
    resize: 'vertical',
  },
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
