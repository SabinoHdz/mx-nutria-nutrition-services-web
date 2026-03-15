<template>
  <section role="region" aria-label="Resumen de características" :class="bannerClasses">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BannerProps } from './banner';
import { bannerVariants } from './banner.variants';

const props = withDefaults(defineProps<BannerProps>(), {
  variant: 'primary',
});

const bannerClasses = computed(() => {
  const parts = [
    bannerVariants({ variant: props.variant }),
    props.background,
    props.color,
    props.class,
  ];
  return parts.filter(Boolean).join(' ');
});
</script>
