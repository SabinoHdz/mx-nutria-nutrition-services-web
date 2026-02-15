/**
 * CARD VARIANTS - CVA Configuration
 */

import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva('card', {
  variants: {
    variant: {
      solid: 'card--solid',
      soft: 'card--soft',
      outline: 'card--outline',
      ghost: 'card--ghost',
      elevated: 'card--elevated',
    },
    size: {
      xs: 'card--size-xs',
      sm: 'card--size-sm',
      md: 'card--size-md',
      lg: 'card--size-lg',
      xl: 'card--size-xl',
    },
    layout: {
      flex: 'card--layout-flex',
      grid: 'card--layout-grid',
    },
    rounded: {
      true: 'card--rounded',
      false: '',
    },
    shadow: {
      true: 'card--shadow',
      false: '',
    },
    bordered: {
      true: 'card--bordered',
      false: '',
    },
    dense: {
      true: 'card--dense',
      false: '',
    },
    hoverable: {
      true: 'card--hoverable',
      false: '',
    },
    clickable: {
      true: 'card--clickable',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    layout: 'flex',
    rounded: true,
    shadow: false,
    bordered: true,
    dense: false,
    hoverable: false,
    clickable: false,
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;
