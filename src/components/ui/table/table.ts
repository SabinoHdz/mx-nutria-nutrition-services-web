/**
 * Table component type definitions
 */

export const TABLE_SIZES = ['sm', 'md'] as const;
export type TableSize = (typeof TABLE_SIZES)[number];

export interface TableProps {
  /** Striped rows (zebra striping) */
  striped?: boolean;
  /** Table size */
  size?: TableSize;
}
