<template>
  <teleport to="body" :disabled="!teleport">
    <!-- Backdrop (opcional, cuando está abierto) -->
    <div
      v-if="showBackdrop && isOpen"
      class="v-fab-backdrop"
      :class="{ 'v-fab-backdrop--active': isOpen }"
      @click="close"
    />

    <!-- FAB Container -->
    <div
      :class="fabContainerClasses"
      :data-position="position"
      :data-teleport="teleport"
      :style="fabContainerStyles"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- FAB Main Button -->
      <button
        :class="fabButtonClasses"
        :data-color="color"
        :data-size="size"
        :disabled="disabled"
        type="button"
        @click="handleMainClick"
      >
        <VIcon :name="isOpen && rotateIcon ? 'close' : icon" :data-size="iconSize" />
      </button>

      <!-- Speed Dial Actions -->
      <div
        v-if="actions && actions.length > 0"
        :class="fabActionsContainerClasses"
        :data-direction="direction"
      >
        <component
          :is="action.href ? 'a' : 'button'"
          v-for="(action, index) in actions"
          :key="index"
          :class="fabActionClasses"
          :data-color="action.color || 'neutral'"
          :data-size="actionSize"
          :disabled="action.disabled"
          :href="action.href"
          :target="action.target"
          type="button"
          @click="handleActionClick(action, $event)"
        >
          <VIcon :name="action.icon" :data-size="actionIconSize" />

          <!-- Label / Tooltip -->
          <span v-if="action.label && showLabels" class="v-fab-action-label">
            {{ action.label }}
          </span>
        </component>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { FabProps, FabEmits, FabAction } from './fab';
import {
  fabContainerCva,
  fabButtonCva,
  fabActionsContainerCva,
  fabActionCva,
} from './fab.variants';
import { VIcon } from '../icon';

defineOptions({
  name: 'VFab',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<FabProps>(), {
  position: 'bottom-right',
  direction: 'up',
  color: 'primary',
  size: 'md',
  icon: 'add',
  trigger: 'click',
  modelValue: false,
  showLabels: true,
  disabled: false,
  offset: '1rem',
  zIndex: 50,
  rotateIcon: true,
  showBackdrop: false,
  teleport: true,
});

const emit = defineEmits<FabEmits>();

// ========================================
// State
// ========================================
const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  },
);

watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue);
  if (newValue) {
    emit('open');
  } else {
    emit('close');
  }
});

// ========================================
// Computed Classes
// ========================================
const fabContainerClasses = computed(() =>
  fabContainerCva({
    position: props.position,
  }),
);

const fabButtonClasses = computed(() => [
  fabButtonCva({
    size: props.size,
    disabled: props.disabled,
  }),
  {
    'v-fab-button--active': isOpen.value,
  },
]);

const fabActionsContainerClasses = computed(() =>
  fabActionsContainerCva({
    direction: props.direction,
    open: isOpen.value,
  }),
);

const fabActionClasses = computed(() =>
  fabActionCva({
    size: actionSize.value,
  }),
);

// ========================================
// Computed Styles
// ========================================
const fabContainerStyles = computed(() => ({
  '--fab-offset': props.offset,
  'z-index': props.zIndex,
}));

// ========================================
// Computed Sizes
// ========================================
const iconSize = computed(() => {
  const sizeMap = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  };
  return sizeMap[props.size];
});

const actionSize = computed(() => {
  // Las acciones son un poco más pequeñas que el botón principal
  const sizeMap = {
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const,
  };
  return sizeMap[props.size];
});

const actionIconSize = computed(() => {
  const sizeMap = {
    sm: 'xs' as const,
    md: 'sm' as const,
    lg: 'md' as const,
  };
  return sizeMap[props.size];
});

// ========================================
// Methods
// ========================================
const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const open = () => {
  if (props.disabled) return;
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

const handleMainClick = (event: MouseEvent) => {
  emit('click', event);

  if (props.actions && props.actions.length > 0 && props.trigger === 'click') {
    toggle();
  }
};

const handleMouseEnter = () => {
  if (props.trigger === 'hover' && props.actions && props.actions.length > 0) {
    open();
  }
};

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    close();
  }
};

const handleActionClick = (action: FabAction, event: MouseEvent) => {
  if (action.disabled) {
    event.preventDefault();
    return;
  }

  if (action.onClick) {
    action.onClick();
  }

  // Cerrar el Speed Dial después de hacer click en una acción
  if (props.trigger === 'click') {
    close();
  }
};

// ========================================
// Expose public methods
// ========================================
defineExpose({
  isOpen,
  toggle,
  open,
  close,
});
</script>
