<template>
  <div class="tooltip-wrapper" ref="wrapperRef">
    <!-- ELEMENTO QUE DISPARA: Slot default -->
    <!-- El usuario pasa aquí el elemento dónde hoverea/clicka -->
    <div ref="targetRef" class="tooltip-trigger">
      <slot />
    </div>

    <!-- TOOLTIP: Renderizado con Teleport -->
    <!-- Teleport lo mueve a <body> para evitar problemas de z-index -->
    <Teleport to="body">
      <div
        v-if="!disabled"
        ref="tooltipRef"
        :id="ariaId"
        role="tooltip"
        :class="[
          tooltipClasses, // Clases de CVA (color, size, placement, etc.)
          $attrs.class, // Clases custom del usuario (!bg-purple-500)
        ]"
        :style="tooltipStyles"
      >
        <!-- CONTENIDO: Slot o prop text -->
        <slot name="content">
          <!-- Si prop html=true, renderizar como HTML -->
          <span v-if="html" v-html="text"></span>
          <!-- Si no, renderizar como texto plano -->
          <span v-else>{{ text }}</span>
        </slot>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { TooltipProps } from './tooltip';
import { tooltipVariants } from './tooltip.variants';
import { useTooltip } from '@/composables/tooltip/useTooltip';

/**
 * IMPORTANTE: Desactivar herencia automática de attrs
 * Esto permite controlar manualmente dónde se aplican las clases custom
 * Sin esto, las clases irían al wrapper (.tooltip-wrapper) en lugar del tooltip
 */
defineOptions({
  inheritAttrs: false,
});

// ===== PROPS =====
// Definir todas las props con valores por defecto
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  color: 'neutral',
  size: 'md',
  arrow: true,
  trigger: 'hover',
  delay: 200,
  hideDelay: 0,
  disabled: false,
  offset: 8,
  transition: 'fade',
  persistent: false,
  boundary: true,
  zIndex: 9999,
  html: false,
});

// ===== EMITS =====
// Eventos que el componente emite
const emit = defineEmits<{
  show: [];
  hide: [];
  'update:modelValue': [value: boolean];
}>();

// ===== REFS =====
// Referencias a los elementos DOM
const wrapperRef = ref<HTMLElement | null>(null);
const targetRef = ref<HTMLElement | null>(null); // El elemento que dispara
const tooltipRef = ref<HTMLElement | null>(null); // El tooltip mismo

// ===== COMPOSABLE =====
// Usar el composable para toda la lógica
const { isVisible, position, show, hide } = useTooltip(
  targetRef,
  tooltipRef,
  {
    placement: props.placement,
    trigger: props.trigger,
    delay: props.delay,
    hideDelay: props.hideDelay,
    disabled: props.disabled,
    offset: props.offset,
    modelValue: props.modelValue,
  },
  emit as (event: string, ...args: unknown[]) => void,
);

// ===== COMPUTED =====

/**
 * Clases del tooltip generadas por CVA
 * Combina:
 * 1. Clases de CVA
 * 2. Clase de visibilidad (.tooltip--visible)
 */
const tooltipClasses = computed(() => {
  const classes = tooltipVariants({
    color: props.color,
    size: props.size,
    placement: props.placement,
    arrow: props.arrow,
    disabled: props.disabled,
    transition: props.transition,
  });

  // Agregar clase de visibilidad si está visible
  return [classes, isVisible.value && 'tooltip--visible'];
});

/**
 * Estilos inline del tooltip
 * Aquí se aplican:
 * - top, left: posición calculada en useTooltip
 * - maxWidth: ancho máximo
 * - zIndex: capas
 */
const tooltipStyles = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`,
  maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
  zIndex: props.zIndex,
}));

/**
 * ID para ARIA (accesibilidad)
 * Conecta el tooltip con aria-describedby del elemento que lo dispara
 */
const ariaId = computed(() => props.ariaId || `tooltip-${Math.random()}`);

// ===== WATCHERS =====

// Sincronizar v-model cuando cambia isVisible
watch(isVisible, (newValue) => {
  emit('update:modelValue', newValue);
});

// ===== EXPOSE =====
// Permitir que el padre controle programáticamente
defineExpose({
  show,
  hide,
});
</script>

<style scoped>
/**
 * Estilos scoped del componente
 * Solo aplican a este componente
 */

.tooltip-wrapper {
  /* El wrapper es inline-block para envolverse alrededor del contenido */
  display: inline-block;
}

.tooltip-trigger {
  /* El trigger también es inline-block */
  display: inline-block;
}
</style>
