/**
 * Collapse (accordion) component type definitions
 */

export interface CollapseProps {
  /** Whether the collapse content is open */
  open?: boolean;
  /** Show arrow icon that rotates when open */
  arrow?: boolean;
  /** Optional title text when not using title slot */
  title?: string;
}
