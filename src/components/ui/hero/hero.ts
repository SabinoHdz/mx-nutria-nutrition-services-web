/**
 * Hero Component Type Definitions
 * Tipos, constantes e interfaces para el componente VHero
 */

// ========================================
// VARIANTES VISUALES
// ========================================

/**
 * Estilos visuales del hero
 * - default: hero simple con padding estándar
 * - centered: contenido centrado vertical y horizontalmente
 * - minimal: sin padding extra, solo estructura básica
 */
export const HERO_VARIANTS = ['default', 'centered', 'minimal'] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];

// ========================================
// TAMAÑOS
// ========================================

/**
 * Tamaños de altura del hero
 * - sm: ~50vh
 * - md: ~75vh
 * - lg: 100vh (full screen)
 */
export const HERO_SIZES = ['sm', 'md', 'lg'] as const;
export type HeroSize = (typeof HERO_SIZES)[number];

// ========================================
// INTERFACE PROPS
// ========================================

/**
 * Props completas del componente VHero
 */
export interface HeroProps {
  /** Variante visual del hero */
  variant?: HeroVariant;

  /** Tamaño (altura) del hero */
  size?: HeroSize;

  /** Background overlay oscuro (útil con imágenes) */
  overlay?: boolean;

  /** URL de imagen de fondo */
  backgroundImage?: string;

  /** Gradiente de fondo (ej: 'from-blue-50 to-indigo-100') */
  backgroundGradient?: string;

  /** Tag HTML de renderizado */
  as?: string;
}

// ========================================
// EXPORTS PÚBLICOS
// ========================================
