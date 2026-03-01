import { cva, type VariantProps } from 'class-variance-authority';

export const tabsListVariants = cva('tabs-list', {
  variants: {
    variant: {
      underline: 'tabs-list--underline',
      boxed: 'tabs-list--boxed',
    },
  },
  defaultVariants: {
    variant: 'boxed',
  },
});

export const tabsTabVariants = cva('tabs-tab', {
  variants: {
    active: {
      true: 'tabs-tab--active',
      false: '',
    },
    size: {
      sm: 'tabs-tab--size-sm',
      md: 'tabs-tab--size-md',
      lg: 'tabs-tab--size-lg',
    },
  },
  defaultVariants: {
    active: false,
    size: 'lg',
  },
});

export type TabsListVariants = VariantProps<typeof tabsListVariants>;
export type TabsTabVariants = VariantProps<typeof tabsTabVariants>;
