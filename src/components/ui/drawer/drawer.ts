/**
 * Drawer (sidebar) component type definitions
 */

export type DrawerSide = 'start' | 'end';

export interface DrawerProps {
  /** Whether the drawer is open (v-model) */
  open?: boolean;
  /** Which side the drawer slides from */
  side?: DrawerSide;
}
