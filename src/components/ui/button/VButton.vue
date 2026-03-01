<template>
  <button
    :type="type as any"
    :disabled="disabled"
    :class="[buttonClasses, $attrs.class]"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <!-- Icon slot (left) -->
    <slot name="icon" />

    <!-- Label/Text -->
    <span v-if="$slots.default" class="button__label" :class="{ 'opacity-0': loading }">
      <slot />
    </span>

    <!-- Loading spinner -->
    <span v-if="loading" class="button__spinner button__spinner--spin">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="animate-spin"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './button';
import { buttonVariants } from './button.variants';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  rounded: false,
  dense: false,
  square: false,
  circle: false,
  iconOnly: false,
  fullWidth: false,
  wide: false,
  ripple: false,
  noCaps: false,
  unelevated: false,
  push: false,
  glossy: false,
  fab: false,
  glass: false,
  stretch: false,
  active: false,
});

const buttonClasses = computed(() =>
  buttonVariants({
    variant: props.variant as ButtonVariant,
    color: props.color as ButtonColor,
    size: props.size as ButtonSize,
    disabled: props.disabled,
    loading: props.loading,
    rounded: props.rounded,
    dense: props.dense,
    square: props.square,
    circle: props.circle,
    iconOnly: props.iconOnly,
    fullWidth: props.fullWidth,
    wide: props.wide,
    push: props.push,
    glossy: props.glossy,
    fab: props.fab,
    glass: props.glass,
    ripple: props.ripple,
    noCaps: props.noCaps,
    unelevated: props.unelevated,
    stretch: props.stretch,
    active: props.active,
  }),
);

const handleClick = (event: MouseEvent) => {
  if (props.ripple && !props.disabled && !props.loading) {
    createRipple(event);
  }
};

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'button__ripple';
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
};
</script>
<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
