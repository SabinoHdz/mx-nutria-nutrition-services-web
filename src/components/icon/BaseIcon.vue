<template>
  <span
    :class="[familyClass, props.color, extraClasses || '', 'inline-flex items-center leading-none']"
    :style="[symbolConfig, sizeIcon]"
    >{{ name }}</span
  >
</template>
<script lang="ts" setup>
import { computed } from 'vue';

type Family = 'outlined' | 'rounded' | 'sharp';
const props = defineProps({
  name: String,
  family: {
    type: String as () => Family,
    default: 'outlined',
  },
  size: {
    type: String,
    default: 'sm',
  },
  color: {
    type: String,
  },
  fill: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
    default: 400,
  },
  grade: {
    type: Number,
    default: 0,
  },
  opsz: {
    type: Number,
    default: 24,
  },
  extraClasses: {
    type: String,
    default: null,
  },
  rotate: {
    type: Number,
    default: 0,
  },
});

const familyClass = computed(() => `material-symbols-${props.family}`);
const symbolConfig = computed(() => ({
  'font-variation-settings': `'FILL' ${props.fill ? 1 : 0}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' ${props.opsz}`,
  transform: `rotate(${props.rotate}deg)`,
}));

const sizeIcon = computed(() => {
  const typeSize = {
    xs: '16px',
    sm: '24px',
    md: '32px',
    lg: '38px',
    xl: '46px',
  };
  return { fontSize: typeSize[props.size as keyof typeof typeSize] || props.size };
});
</script>
