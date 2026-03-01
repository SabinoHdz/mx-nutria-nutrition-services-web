<template>
  <div class="v-toggle-group-wrapper">
    <!-- Group label -->
    <label v-if="label" class="v-toggle-group-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Toggle group -->
    <div :class="toggleGroupClasses">
      <VToggle
        v-for="option in options"
        :key="`${option.value}`"
        :model-value="modelValue"
        :true-value="option.value"
        :false-value="option.value"
        :label="option.label"
        :label-position="'right'"
        :size="size"
        :variant="variant"
        :color="color"
        :disabled="disabled || option.disabled"
        :readonly="readonly"
        :error="error"
        @update:model-value="handleToggleChange"
      />
    </div>

    <!-- Error message -->
    <div v-if="error && errorMessage" class="v-toggle-group-error">
      {{ errorMessage }}
    </div>

    <!-- Hint -->
    <div v-if="hint && !error" class="v-toggle-group-hint">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VToggle from './VToggle.vue';
import type { ToggleGroupProps, ToggleGroupEmits, ToggleValue } from './toggle';

defineOptions({
  name: 'VToggleGroup',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  options: () => [],
  size: 'md',
  variant: 'solid',
  color: 'primary',
  disabled: false,
  readonly: false,
  required: false,
  direction: 'horizontal',
  error: false,
});

const emit = defineEmits<ToggleGroupEmits>();

/**
 * Group layout classes
 */
const toggleGroupClasses = computed(() => {
  const baseClasses = 'v-toggle-group flex gap-3';
  const directionClass = props.direction === 'vertical' ? 'flex-col' : 'flex-row';
  return `${baseClasses} ${directionClass}`;
});

/**
 * Handle toggle change
 */
const handleToggleChange = (value: ToggleValue) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>
