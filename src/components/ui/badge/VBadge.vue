<template>
  <span :class="badgeClass">
    <span v-if="slots.icon" :class="iconClass">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { BadgeProps } from './badge';
import { badgeVariants } from './badge.variants';

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  dot: false,
  iconPosition: 'left',
});

const slots = useSlots();

const badgeClass = computed(() =>
  badgeVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    dot: props.dot,
  }),
);

const iconClass = computed(() => ({
  'inline-flex items-center': true,
  'order-2': props.iconPosition === 'right',
  'order-0': props.iconPosition === 'left',
}));
</script>
