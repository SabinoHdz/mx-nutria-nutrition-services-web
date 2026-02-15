/**
 * TOGGLE COMPONENT - CVA Variants Configuration
 */

import { cva } from 'class-variance-authority';

/**
 * Root toggle container variants
 */
export const toggleCva = cva('v-toggle', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
    readonly: {
      true: 'cursor-default',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
    readonly: false,
  },
});

/**
 * Toggle control (track) variants
 */
export const toggleControlCva = cva('v-toggle__control', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Toggle thumb (switch) variants
 */
export const toggleThumbCva = cva('v-toggle__thumb', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Toggle icon variants
 */
export const toggleIconCva = cva('v-toggle__icon', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ToggleCVAProps = ReturnType<typeof toggleCva>;
export type ToggleControlCVAProps = ReturnType<typeof toggleControlCva>;
export type ToggleThumbCVAProps = ReturnType<typeof toggleThumbCva>;
