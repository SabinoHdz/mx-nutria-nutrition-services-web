/**
 * SELECT VARIANTS - CVA Configuration
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const selectVariants = cva('', {
  variants: {
    variant: {
      solid: 'select--solid',
      outline: 'select--outline',
      soft: 'select--soft',
      borderless: 'select--borderless',
      filled: 'select--filled',
    },
    color: {
      primary: 'select--primary',
      secondary: 'select--secondary',
      accent: 'select--accent',
      success: 'select--success',
      warning: 'select--warning',
      error: 'select--error',
      info: 'select--info',
    },
    size: {
      xs: 'select--size-xs',
      sm: 'select--size-sm',
      md: 'select--size-md',
      lg: 'select--size-lg',
      xl: 'select--size-xl',
    },
    disabled: {
      true: 'select--disabled',
      false: '',
    },
    error: {
      true: 'select--error-state',
      false: '',
    },
    dense: {
      true: 'select--dense',
      false: '',
    },
    rounded: {
      none: 'select--rounded-none',
      sm: 'select--rounded-sm',
      md: 'select--rounded-md',
      lg: 'select--rounded-lg',
      full: 'select--rounded-full',
    },
    shadow: {
      true: 'select--shadow',
      false: '',
    },
    loading: {
      true: 'select--loading',
      false: '',
    },
    open: {
      true: 'select--open',
      false: '',
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
    loading: false,
    open: false,
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
