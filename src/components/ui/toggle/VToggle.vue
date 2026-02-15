<template>
  <div class="v-toggle-wrapper">
    <!-- Left label (if labelPosition = 'left') -->
    <label v-if="label && labelPosition === 'left'" :for="inputId" class="v-toggle-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Toggle control -->
    <label
      :for="inputId"
      :class="toggleContainerClasses"
      :data-color="color"
      :data-size="size"
      :data-variant="variant"
    >
      <input
        :id="inputId"
        v-model="modelValueComputed"
        type="checkbox"
        :true-value="trueValue"
        :false-value="falseValue"
        class="hidden"
        :disabled="disabled"
        :readonly="readonly"
        :name="name"
        @change="handleChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />

      <!-- Toggle track -->
      <span
        :class="toggleControlClasses"
        :data-color="color"
        :data-size="size"
        :data-variant="variant"
        :data-error="error"
      >
        <!-- Thumb with icon -->
        <span :class="toggleThumbClasses" :data-size="size">
          <VIcon
            v-if="isChecked && onIcon"
            :name="onIcon"
            :class="toggleIconClasses"
            :data-size="size"
          />
          <VIcon
            v-else-if="!isChecked && offIcon"
            :name="offIcon"
            :class="toggleIconClasses"
            :data-size="size"
          />
        </span>
      </span>
    </label>

    <!-- Right label (if labelPosition = 'right') -->
    <label v-if="label && labelPosition === 'right'" :for="inputId" class="v-toggle-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Error message -->
    <div v-if="error && errorMessage" class="v-toggle-error">
      {{ errorMessage }}
    </div>

    <!-- Hint -->
    <div v-if="hint && !error" class="v-toggle-hint">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VIcon from '../icon/VIcon.vue';
import { toggleCva, toggleControlCva, toggleThumbCva, toggleIconCva } from './toggle.variants';
import type { ToggleProps, ToggleEmits, ToggleValue } from './toggle';

defineOptions({
  name: 'VToggle',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  trueValue: true,
  falseValue: false,
  labelPosition: 'right',
  onIcon: '',
  offIcon: '',
  disabled: false,
  readonly: false,
  required: false,
  size: 'md',
  variant: 'solid',
  color: 'primary',
  error: false,
});

const emit = defineEmits<ToggleEmits>();

const inputId = computed(() => props.id || `toggle-${Math.random().toString(36).substr(2, 9)}`);

/**
 * Computed property for checked state
 */
const isChecked = computed(() => {
  return props.modelValue === props.trueValue;
});

/**
 * V-model binding
 */
const modelValueComputed = computed({
  get: () => props.modelValue,
  set: (value: ToggleValue | ToggleValue[]) => {
    const actualValue = Array.isArray(value) ? value[0] : value;
    emit('update:modelValue', actualValue as ToggleValue);
  },
});

/**
 * Toggle classes
 */
const toggleContainerClasses = computed(() =>
  toggleCva({
    disabled: props.disabled,
    readonly: props.readonly,
  }),
);

const toggleControlClasses = computed(() =>
  toggleControlCva({
    size: props.size,
  }),
);

const toggleThumbClasses = computed(() =>
  toggleThumbCva({
    size: props.size,
  }),
);

const toggleIconClasses = computed(() =>
  toggleIconCva({
    size: props.size,
  }),
);

/**
 * Handle change event
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newValue = target.checked ? props.trueValue : props.falseValue;

  // Validate
  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      const result = rule(newValue);
      if (typeof result === 'string') {
        console.warn('Validation error:', result);
        return;
      }
    }
  }

  emit('update:modelValue', newValue);
  emit('change', newValue);
};
</script>
