<template>
  <div role="tablist" :class="listClasses" aria-label="Tabs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TabsVariant } from './tabs';
import { tabsListVariants } from './tabs.variants';

const props = withDefaults(
  defineProps<{ variant?: TabsVariant }>(),
  { variant: 'boxed' },
);

const listClasses = computed(() =>
  tabsListVariants({ variant: props.variant }),
);
</script>
