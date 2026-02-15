<template>
  <div class="checkbox-group">
    <div v-if="label" class="checkbox-group__label">{{ label }}</div>

    <div :class="groupClasses">
      <VCheckbox
        v-for="option in options"
        :key="String(option.value)"
        :model-value="isSelected(option.value) ? option.value : falseValue"
        :true-value="option.value"
        :false-value="falseValue"
        :label="option.label"
        :name="name"
        :variant="variant"
        :color="color"
        :size="size"
        :disabled="disabled || option.disabled"
        :readonly="readonly"
        @update:model-value="(value) => handleItemChange(option.value, value)"
        @blur="handleBlur"
      />
    </div>

    <div v-if="hint || displayError" class="checkbox-group__messages">
      <div v-if="hint && !displayError" class="checkbox-hint">
        {{ hint }}
      </div>
      <div v-if="displayError" class="checkbox-error-message">
        {{ displayError }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CheckboxGroupProps, CheckboxGroupEmits, CheckboxValue } from './checkbox';
import VCheckbox from './VCheckbox.vue';

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  direction: 'vertical',
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
});

const emit = defineEmits<CheckboxGroupEmits>();
const localError = ref<string | null>(null);

const falseValue: CheckboxValue = false;

const groupClasses = computed(() =>
  props.direction === 'horizontal' ? 'checkbox-group__row' : 'checkbox-group__col',
);

const displayError = computed(() => {
  if (props.error) return props.errorMessage || 'Selecciona al menos una opcion';
  return localError.value || '';
});

const isSelected = (value: CheckboxValue) => props.modelValue?.includes(value);

const runRules = (values: CheckboxValue[]): string | null => {
  if (props.required && values.length === 0) {
    return 'Selecciona al menos una opcion';
  }

  if (props.rules) {
    for (const rule of props.rules) {
      const result = rule(values);
      if (result !== true) {
        return typeof result === 'string' ? result : 'Seleccion invalida';
      }
    }
  }

  return null;
};

const handleItemChange = (value: CheckboxValue, newValue: CheckboxValue) => {
  if (props.readonly) return;

  const current = props.modelValue ? [...props.modelValue] : [];
  const exists = current.includes(value);

  if (newValue === value && !exists) {
    current.push(value);
  } else if (newValue !== value && exists) {
    const index = current.indexOf(value);
    current.splice(index, 1);
  }

  localError.value = runRules(current);

  emit('update:modelValue', current);
  emit('change', current);
};

const handleBlur = () => {
  localError.value = runRules(props.modelValue ?? []);
};
</script>
