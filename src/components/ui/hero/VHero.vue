<template>
  <component
    :is="asTag"
    :class="heroClasses"
    :style="backgroundStyles"
  >
    <div class="hero__content">
      <!-- Title -->
      <h1 v-if="$slots.title" class="hero__title">
        <slot name="title" />
      </h1>

      <!-- Subtitle -->
      <p v-if="$slots.subtitle" class="hero__subtitle">
        <slot name="subtitle" />
      </p>

      <!-- Description -->
      <div v-if="$slots.description" class="hero__description">
        <slot name="description" />
      </div>

      <!-- Default slot (contenido principal) -->
      <slot />

      <!-- Actions (botones) -->
      <div v-if="$slots.actions" class="hero__actions">
        <slot name="actions" />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HeroProps } from './hero';
import { heroVariants } from './hero.variants';

const props = withDefaults(defineProps<HeroProps>(), {
  variant: 'default',
  size: 'lg',
  overlay: false,
  as: 'section',
});

const asTag = computed(() => props.as);

const heroClasses = computed(() => {
  const classes = [
    heroVariants({
      variant: props.variant,
      size: props.size,
      overlay: props.overlay,
    }),
  ];

  // Agregar clases de background
  if (props.backgroundImage) {
    classes.push('hero--bg-image');
  }

  if (props.backgroundGradient) {
    classes.push('hero--bg-gradient', props.backgroundGradient);
  }

  return classes;
});

const backgroundStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (props.backgroundImage) {
    styles.backgroundImage = `url(${props.backgroundImage})`;
  }

  return styles;
});
</script>
