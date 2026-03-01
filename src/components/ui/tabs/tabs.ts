/**
 * Tabs component type definitions
 */

export const TABS_VARIANTS = ['underline', 'boxed'] as const;
export type TabsVariant = (typeof TABS_VARIANTS)[number];

export const TAB_SIZES = ['sm', 'md', 'lg'] as const;
export type TabSize = (typeof TAB_SIZES)[number];

export interface TabsProps {
  variant?: TabsVariant;
}

export interface TabsTabProps {
  /** Whether this tab is active */
  active?: boolean;
  size?: TabSize;
}
