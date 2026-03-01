<template>
  <div :class="alertClass" role="alert">
    <!-- ICONO: Slot o automático según color -->
    <div v-if="showIcon" class="alert__icon">
      <slot name="icon">
        <v-icon :name="defaultIcon" :size="iconSize" />
      </slot>
    </div>

    <!-- CONTENIDO -->
    <div class="alert__content">
      <!-- TÍTULO (opcional) -->
      <div v-if="title || slots.title" class="alert__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <!-- MENSAJE -->
      <div class="alert__message">
        <slot>
          {{ message }}
        </slot>
      </div>

      <!-- ACCIONES (opcional) -->
      <div v-if="slots.actions" class="alert__actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- BOTÓN CERRAR (dismissible) -->
    <button
      v-if="dismissible"
      @click="handleDismiss"
      class="alert__close"
      type="button"
      aria-label="Cerrar alerta"
    >
      <v-icon name="close" :size="closeIconSize" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { VIcon } from '../icon';
import type { AlertProps } from './alert';
import { ALERT_DEFAULT_ICONS } from './alert';
import { alertVariants } from './alert.variants';

/**
 * Props con valores por defecto
 */
const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'soft',
  color: 'info',
  size: 'md',
  dense: false,
  rounded: false,
  inlineActions: false,
  icon: true,
  dismissible: false,
});

/**
 * Eventos que emite el componente
 */
const emit = defineEmits<{
  dismiss: [];
}>();

/**
 * Slots disponibles
 */
const slots = useSlots();

/**
 * Clases del alert generadas por CVA
 */
const alertClass = computed(() =>
  alertVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    dense: props.dense,
    rounded: props.rounded,
    inlineActions: props.inlineActions,
  }),
);

/**
 * Determinar si mostrar icono
 */
const showIcon = computed(() => props.icon || !!slots.icon);

/**
 * Icono por defecto según el color
 */
const defaultIcon = computed(() => ALERT_DEFAULT_ICONS[props.color]);

/**
 * Tamaño del icono según el tamaño del alert
 */
const iconSize = computed(() => {
  const sizeMap = {
    xs: 'sm',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  };
  return sizeMap[props.size] as 'sm' | 'md' | 'lg' | 'xl';
});

/**
 * Tamaño del icono de cerrar
 */
const closeIconSize = computed(() => {
  const sizeMap = {
    xs: 'sm',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'md',
  };
  return sizeMap[props.size] as 'sm' | 'md';
});

/**
 * Handler para cerrar el alert
 */
const handleDismiss = () => {
  emit('dismiss');
};
</script>
