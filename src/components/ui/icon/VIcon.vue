<template>
  <span :class="iconClass" :style="iconStyle" :aria-label="computedAriaLabel">
    {{ name }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './icon';
import { iconVariants } from './icon.variants';

/**
 * Componente Icon
 * Renderiza iconos de Material Symbols con soporte para:
 * - 3 familias de fuente (outlined, rounded, sharp)
 * - 7 tamaños predefinidos
 * - Colores semánticos del tema
 * - Estados interactivo y deshabilitado
 * - Personalización de peso y grado
 * - Accesibilidad (aria-label)
 */

const props = withDefaults(defineProps<IconProps>(), {
  family: 'outlined',
  size: 'md',
  color: 'current',
  filled: false,
  weight: 400,
  grade: 0,
  interactive: false,
  disabled: false,
});

/**
 * Clases CSS del icono
 * Generadas por CVA basándose en las props
 */
const iconClass = computed(() =>
  iconVariants({
    family: props.family,
    size: props.size,
    color: props.color,
    filled: props.filled,
    interactive: props.interactive,
    disabled: props.disabled,
  }),
);

/**
 * Estilos inline del icono
 * Para font-variation-settings personalizadas (weight, grade)
 *
 * Material Symbols usa font-variation-settings con 4 ejes:
 * - FILL: 0 (outline) o 1 (filled)
 * - wght: peso de fuente (100-700)
 * - GRAD: ajuste de grado visual (-25 a 200)
 * - opsz: tamaño óptico (20-48, automático basado en font-size)
 */
const iconStyle = computed(() => {
  // Solo aplicar si weight o grade son diferentes del default
  if (props.weight !== 400 || props.grade !== 0) {
    return {
      fontVariationSettings: `'FILL' ${props.filled ? 1 : 0}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' 24`,
    };
  }
  return undefined;
});

/**
 * Label accesible para el icono
 * Si no se provee ariaLabel, convierte el nombre del icono:
 * 'visibility_off' -> 'Visibility Off'
 */
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel;
  }

  // Convertir snake_case a Title Case
  return props.name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});
</script>
