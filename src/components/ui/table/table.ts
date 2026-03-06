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
  /**
   * Habilita scroll vertical con altura máxima configurable via scrollableMaxHeight.
   * Evita que la tabla crezca indefinidamente; el contenido hace scroll dentro del wrapper.
   * Por defecto false para no modificar el comportamiento de tablas en otras vistas.
   */
  scrollable?: boolean;
  /**
   * Altura máxima del área scrollable (ej. '25rem', '28rem').
   * Solo tiene efecto cuando scrollable es true. Por defecto '25rem'.
   */
  scrollableMaxHeight?: string;
}
