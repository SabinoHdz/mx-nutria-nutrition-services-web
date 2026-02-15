/**
 * Icon Component Type Definitions
 * Definiciones de tipos, constantes e interfaces para el componente VIcon
 * Basado en Material Symbols de Google
 */

// ========================================
// FONT FAMILIES
// ========================================

/**
 * Variantes de familia de fuente de Material Symbols
 * - outlined: Iconos con bordes finos (default)
 * - rounded: Iconos con esquinas redondeadas
 * - sharp: Iconos con esquinas angulares
 */
export const ICON_FAMILIES = ['outlined', 'rounded', 'sharp'] as const;
export type IconFamily = (typeof ICON_FAMILIES)[number];

// ========================================
// SIZES
// ========================================

/**
 * Tamaños predefinidos para iconos
 * Alineados con el sistema de diseño
 */
export const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
export type IconSize = (typeof ICON_SIZES)[number];

// ========================================
// COLORS
// ========================================

/**
 * Colores semánticos disponibles para iconos
 * Mapeados a las variables CSS del tema
 */
export const ICON_COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
  'current', // Hereda el color del texto padre
] as const;
export type IconColor = (typeof ICON_COLORS)[number];

// ========================================
// INTERFACE
// ========================================

/**
 * Propiedades del componente Icon
 */
export interface IconProps {
  /**
   * Nombre del icono de Material Symbols
   * @example 'home', 'settings', 'close', 'check_circle'
   * @see https://fonts.google.com/icons
   */
  name: string;

  /**
   * Variante de familia de fuente
   * @default 'outlined'
   */
  family?: IconFamily;

  /**
   * Tamaño del icono
   * @default 'md'
   */
  size?: IconSize;

  /**
   * Color del icono (token semántico)
   * @default 'current' - hereda el color del texto
   */
  color?: IconColor;

  /**
   * Estilo de relleno
   * - false: outline (sin relleno)
   * - true: filled (con relleno)
   * @default false
   */
  filled?: boolean;

  /**
   * Peso de la fuente (grosor del trazo)
   * Valores: 100, 200, 300, 400 (regular), 500, 600, 700 (bold)
   * @default 400
   */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;

  /**
   * Ajuste de grado visual (-25 a 200)
   * Afecta la "pesadez" visual del icono
   * @default 0
   */
  grade?: number;

  /**
   * Hacer el icono interactivo (clickeable)
   * Agrega cursor pointer y efectos hover
   * @default false
   */
  interactive?: boolean;

  /**
   * Deshabilitar el icono
   * Reduce opacidad y cambia cursor
   * @default false
   */
  disabled?: boolean;

  /**
   * Label para accesibilidad (aria-label)
   * Si no se provee, usa el nombre del icono formateado
   */
  ariaLabel?: string;
}

// ========================================
// COMMON ICONS REFERENCE
// ========================================

/**
 * Referencia de iconos comunes de Material Symbols
 * Útil para autocompletado y documentación
 */
export const COMMON_ICONS = {
  // Navegación
  home: 'home',
  menu: 'menu',
  close: 'close',
  arrowBack: 'arrow_back',
  arrowForward: 'arrow_forward',
  chevronLeft: 'chevron_left',
  chevronRight: 'chevron_right',
  expandMore: 'expand_more',
  expandLess: 'expand_less',

  // Acciones
  add: 'add',
  remove: 'remove',
  edit: 'edit',
  delete: 'delete',
  save: 'save',
  done: 'done',
  check: 'check',
  clear: 'clear',
  refresh: 'refresh',
  search: 'search',
  filter: 'filter_list',
  sort: 'sort',
  moreVert: 'more_vert',
  moreHoriz: 'more_horiz',

  // UI Elements
  visibility: 'visibility',
  visibilityOff: 'visibility_off',
  lock: 'lock',
  lockOpen: 'lock_open',
  star: 'star',
  starBorder: 'star_border',
  favorite: 'favorite',
  favoriteBorder: 'favorite_border',
  share: 'share',
  download: 'download',
  upload: 'upload',
  copy: 'content_copy',

  // Status
  info: 'info',
  warning: 'warning',
  error: 'error',
  checkCircle: 'check_circle',
  cancel: 'cancel',
  help: 'help',

  // Comunicación
  notifications: 'notifications',
  mail: 'mail',
  send: 'send',
  phone: 'phone',
  message: 'message',
  chat: 'chat',

  // Usuario
  person: 'person',
  group: 'group',
  accountCircle: 'account_circle',

  // Configuración
  settings: 'settings',
  tune: 'tune',
  build: 'build',

  // Archivos
  folder: 'folder',
  folderOpen: 'folder_open',
  description: 'description',
  attachFile: 'attach_file',

  // Tiempo
  schedule: 'schedule',
  today: 'today',
  event: 'event',
  alarm: 'alarm',

  // Tema
  lightMode: 'light_mode',
  darkMode: 'dark_mode',
} as const;
