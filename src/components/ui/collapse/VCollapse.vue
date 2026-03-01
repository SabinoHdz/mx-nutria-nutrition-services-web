<template>
  <div class="vc-collapse" :class="{ 'vc-collapse--open': model }">
    <div
      :id="titleId"
      class="vc-collapse__title"
      role="button"
      :aria-expanded="model"
      :aria-controls="contentId"
      tabindex="0"
      @click="toggle"
      @keydown.enter.space.prevent="toggle"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <span v-if="arrow" class="vc-collapse__arrow" aria-hidden="true">
        <VIcon name="expand_more" size="md" />
      </span>
    </div>
    <div
      :id="contentId"
      class="vc-collapse__content"
      :class="{ 'vc-collapse__content--open': model }"
      role="region"
      :aria-labelledby="titleId"
      :aria-hidden="!model"
    >
      <div class="vc-collapse__content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { CollapseProps } from './collapse';

const props = withDefaults(defineProps<CollapseProps>(), {
  open: false,
  arrow: true,
});

const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>();

const contentId = `collapse-content-${Math.random().toString(36).slice(2, 9)}`;
const titleId = `collapse-title-${Math.random().toString(36).slice(2, 9)}`;

const model = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
});

const toggle = () => {
  model.value = !model.value;
};
</script>
