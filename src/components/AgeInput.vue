<template>
  <div class="space-y-1">
    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}<span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <input
      type="number"
      :value="internalValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="minValue"
      :max="maxValue"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-sm transition-colors"
      @input="onInput"
    />
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue?: number | null;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  placeholder: '',
  required: false,
  disabled: false,
  minValue: 1,
  maxValue: 150,
});

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
  clean: [];
}>();

const internalValue = ref<number | null>(null);
const error = ref<string>('');

watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val || null;
    error.value = '';
  },
  { immediate: true },
);

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  let numValue = value ? Number(value) : null;

  // Validar rango
  if (numValue !== null) {
    if (numValue < props.minValue) {
      error.value = `Mínimo permitido: ${props.minValue}`;
      return;
    }
    if (numValue > props.maxValue) {
      error.value = `Máximo permitido: ${props.maxValue}`;
      return;
    }
  }

  error.value = '';
  internalValue.value = numValue;
  emit('update:modelValue', numValue);
}
</script>
