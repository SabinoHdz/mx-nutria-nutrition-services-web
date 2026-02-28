<template>
  <button
    type="button"
    role="tab"
    :aria-selected="active"
    :class="tabClasses"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TabSize } from './tabs';
import { tabsTabVariants } from './tabs.variants';

const props = withDefaults(
  defineProps<{ active?: boolean; size?: TabSize }>(),
  { active: false, size: 'lg' },
);

defineEmits<{ (e: 'click'): void }>();

const tabClasses = computed(() =>
  tabsTabVariants({ active: props.active, size: props.size }),
);
</script>
