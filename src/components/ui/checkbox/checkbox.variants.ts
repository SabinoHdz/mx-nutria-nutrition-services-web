/**
 * CHECKBOX COMPONENT - CVA Configuration
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva('checkbox', {
  variants: {
    variant: {
      solid: 'checkbox--variant-solid',
      outline: 'checkbox--variant-outline',
      soft: 'checkbox--variant-soft',
      borderless: 'checkbox--variant-borderless',
    },
    color: {
      primary: 'checkbox--color-primary',
      secondary: 'checkbox--color-secondary',
      success: 'checkbox--color-success',
      warning: 'checkbox--color-warning',
      error: 'checkbox--color-error',
      info: 'checkbox--color-info',
      neutral: 'checkbox--color-neutral',
    },
    size: {
      xs: 'checkbox--size-xs',
      sm: 'checkbox--size-sm',
      md: 'checkbox--size-md',
      lg: 'checkbox--size-lg',
      xl: 'checkbox--size-xl',
    },
    disabled: {
      true: 'checkbox--disabled',
      false: '',
    },
    error: {
      true: 'checkbox--error',
      false: '',
    },
    readonly: {
      true: 'checkbox--readonly',
      false: '',
    },
  },
  compoundVariants: [
    {
      disabled: true,
      class: 'pointer-events-none opacity-50',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    disabled: false,
    error: false,
    readonly: false,
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
