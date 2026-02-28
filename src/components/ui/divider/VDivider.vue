<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="dividerClasses"
  >
    <template v-if="label">
      <span class="divider__line" aria-hidden="true" />
      <span class="divider__label">{{ label }}</span>
      <span class="divider__line" aria-hidden="true" />
    </template>
    <span v-else class="divider__line" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DividerProps } from './divider';

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
});
const dividerClasses = computed(() => [
  'divider',
  props.orientation === 'vertical' ? 'divider--vertical' : 'divider--horizontal',
]);
</script>
