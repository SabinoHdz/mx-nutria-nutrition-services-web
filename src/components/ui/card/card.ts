/**
 * CARD COMPONENT - Types, Constants & Interfaces
 */

// ========================================
// 1. VARIANTS (Visual styles)
// ========================================
export const CARD_VARIANTS = ['solid', 'soft', 'outline', 'ghost', 'elevated'] as const;
export type CardVariant = (typeof CARD_VARIANTS)[number];

// ========================================
// 2. SIZES (Spacing)
// ========================================
export const CARD_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type CardSize = (typeof CARD_SIZES)[number];

// ========================================
// 3. LAYOUTS (Flex / Grid)
// ========================================
export const CARD_LAYOUTS = ['flex', 'grid'] as const;
export type CardLayout = (typeof CARD_LAYOUTS)[number];

// ========================================
// 4. INTERFACE PROPS
// ========================================
export interface CardProps {
  // Visual style
  variant?: CardVariant;
  size?: CardSize;
  layout?: CardLayout;

  // Modifiers
  rounded?: boolean;
  shadow?: boolean;
  bordered?: boolean;
  dense?: boolean;
  hoverable?: boolean;
  clickable?: boolean;

  // Content helpers
  title?: string;
  subtitle?: string;

  // Accessibility
  ariaLabel?: string;

  // Root element
  as?: keyof HTMLElementTagNameMap;
}
