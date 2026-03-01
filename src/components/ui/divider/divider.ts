/**
 * Divider component type definitions
 */

export const DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type DividerOrientation = (typeof DIVIDER_ORIENTATIONS)[number];

export interface DividerProps {
  /** Orientation of the divider line */
  orientation?: DividerOrientation;
  /** Optional label text in the center (e.g. "OR") */
  label?: string;
}
