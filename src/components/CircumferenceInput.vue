<template>
  <div class="space-y-1">
    <label v-if="label" class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}<span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <div class="flex gap-2">
      <input
        type="number"
        step="0.1"
        inputmode="decimal"
        :value="internalValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="minValue"
        :max="maxValue"
        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm transition-colors"
        @input="onInput"
      />
      <div
        class="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm"
      >
        {{ unit }}
      </div>
    </div>
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue?: number | string | null;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  fieldName?: string;
  decimalLimit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  minValue: 1,
  maxValue: 250,
  unit: 'cm',
  fieldName: 'El valor',
  decimalLimit: '3,1',
});

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
  clean: [];
}>();

const internalValue = ref<string>('');
const error = ref<string>('');

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val !== null && val !== undefined ? String(val) : '';
    error.value = '';
  },
  { immediate: true },
);

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  internalValue.value = value;

  if (!value || value === '') {
    emit('update:modelValue', null);
    return;
  }

  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    error.value = 'Ingrese un valor válido';
    return;
  }

  if (numValue < props.minValue) {
    error.value = `${props.fieldName}: mínimo permitido ${props.minValue} ${props.unit}`;
    return;
  }

  if (numValue > props.maxValue) {
    error.value = `${props.fieldName}: máximo permitido ${props.maxValue} ${props.unit}`;
    return;
  }

  error.value = '';
  emit('update:modelValue', numValue);
}
</script>
