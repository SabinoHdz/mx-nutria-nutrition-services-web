/**
 * FAB COMPONENT - Types, Constants & Interfaces
 * Floating Action Button with Speed Dial functionality
 */

// ========================================
// 1. POSITIONS (Posiciones en pantalla)
// ========================================
/**
 * 4 posiciones en las esquinas de la pantalla
 * Visualización:
 *  top-left        top-right
 *         ┌──────────┐
 *         │  SCREEN  │
 *         └──────────┘
 *  bottom-left    bottom-right
 */
export const FAB_POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;
export type FabPosition = (typeof FAB_POSITIONS)[number];

// ========================================
// 2. DIRECTIONS (Direcciones de expansión)
// ========================================
/**
 * Dirección en la que se expanden los botones del Speed Dial
 */
export const FAB_DIRECTIONS = ['up', 'down', 'left', 'right'] as const;
export type FabDirection = (typeof FAB_DIRECTIONS)[number];

// ========================================
// 3. COLORES SEMÁNTICOS
// ========================================
export const FAB_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
] as const;
export type FabColor = (typeof FAB_COLORS)[number];

// ========================================
// 4. TAMAÑOS
// ========================================
export const FAB_SIZES = ['sm', 'md', 'lg'] as const;
export type FabSize = (typeof FAB_SIZES)[number];

// ========================================
// 5. TRIGGERS
// ========================================
/**
 * Cómo se activa el Speed Dial
 */
export const FAB_TRIGGERS = ['click', 'hover'] as const;
export type FabTrigger = (typeof FAB_TRIGGERS)[number];

// ========================================
// 6. FAB ACTION INTERFACE
// ========================================
/**
 * Cada acción en el Speed Dial
 */
export interface FabAction {
  /** Icono (Material Symbols) */
  icon: string;
  /** Etiqueta/tooltip */
  label?: string;
  /** Color del botón */
  color?: FabColor;
  /** Función al hacer click */
  onClick?: () => void;
  /** Deshabilitado */
  disabled?: boolean;
  /** Link href (si es un enlace) */
  href?: string;
  /** Target para href */
  target?: string;
}

// ========================================
// 7. FAB PROPS INTERFACE
// ========================================
export interface FabProps {
  /** Posición en la pantalla */
  position?: FabPosition;
  /** Dirección de expansión del Speed Dial */
  direction?: FabDirection;
  /** Color del botón principal */
  color?: FabColor;
  /** Tamaño del FAB */
  size?: FabSize;
  /** Icono del botón principal */
  icon?: string;
  /** Label del botón principal */
  label?: string;
  /** Acciones del Speed Dial */
  actions?: FabAction[];
  /** Trigger para abrir (click o hover) */
  trigger?: FabTrigger;
  /** Estado abierto (v-model) */
  modelValue?: boolean;
  /** Mostrar labels de las acciones */
  showLabels?: boolean;
  /** Tooltip del botón principal */
  tooltip?: string;
  /** Deshabilitado */
  disabled?: boolean;
  /** Offset desde el borde (en px) */
  offset?: string;
  /** z-index */
  zIndex?: number;
  /** Rotar icono principal cuando está abierto */
  rotateIcon?: boolean;
  /** Mostrar backdrop cuando está abierto */
  showBackdrop?: boolean;
  /** Usar teleport (true para body, false para posición absoluta en contenedor padre) */
  teleport?: boolean;
}

// ========================================
// 8. FAB EMITS
// ========================================
export interface FabEmits {
  'update:modelValue': [value: boolean];
  click: [event: MouseEvent];
  open: [];
  close: [];
}
