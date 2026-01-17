<template>
  <div class="form-control">
    <!-- Label con estilo clínico -->
    <label class="label m-1" :for="inputId">
      <span class="label-text text-sm text-nutrition-text">
        {{ label }}<span v-if="required" class="text-red-500 ml-0.5">*</span>
      </span>
    </label>

    <div class="join w-full">
      <div class="relative flex items-center join-item flex-1">
        <input
          :id="inputId"
          type="text"
          inputmode="decimal"
          class="w-full pr-10 px-3 py-2 rounded border border-nutrition-border focus:border-nutrition-blue focus:outline-none bg-nutrition-bg-input text-sm text-nutrition-text-value transition-colors"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="internalValue"
          @input="onInput"
          @keydown="onKeyDown"
          autocomplete="off"
        />
        <!-- Botón de limpieza -->
        <BaseIcon
          v-if="internalValue && !disabled"
          name="close"
          class="absolute right-3 cursor-pointer text-nutrition-text-light hover:text-red-500 text-lg transition-colors"
          @click="onClean"
          aria-label="Limpiar"
        />
      </div>
      <!-- Unidad de medida: mts -->
      <span
        class="join-item px-4 py-2 border border-gray-300 bg-base-200 rounded-r text-sm font-medium"
      >
        mts
      </span>
    </div>

    <!-- Pequeño mensaje de ayuda opcional si el valor es inválido -->
    <p v-if="showError" class="text-[10px] text-red-500 mt-1 ml-1">
      Rango permitido: {{ minValue }} - {{ maxValue }} mts
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import BaseIcon from './icon/BaseIcon.vue';

interface Props {
  modelValue?: string | number | null;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  decimalLimit?: string;
  minValue?: number;
  maxValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: 'Talla / Estatura',
  required: false,
  placeholder: '0.00',
  disabled: false,
  decimalLimit: '1,2',
  minValue: 0.3,
  maxValue: 2.5,
});

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
  clean: [];
}>();

const inputId = `height-input-${Math.random().toString(36).substr(2, 9)}`;
const showError = ref(false);

// Parseo de límites de dígitos
const intLimit = ref(1);
const decLimit = ref(2);

watch(
  () => props.decimalLimit,
  (val) => {
    const parts = val.split(',').map(Number);
    const i = parts[0] ?? 1;
    const d = parts[1] ?? 2;
    intLimit.value = Number.isNaN(i) ? 1 : i;
    decLimit.value = Number.isNaN(d) ? 2 : d;
  },
  { immediate: true },
);

// Regex dinámico para el formato (ej: 1 entero, 2 decimales)
const decimalRegex = computed(
  () => new RegExp(`^\\d{0,${intLimit.value}}(\\.\\d{0,${decLimit.value}})?$`),
);

const internalValue = ref('');
const lastValid = ref('');

// Sincronización externa
watch(
  () => props.modelValue,
  (val) => {
    if (val === null || val === undefined || val === '') {
      internalValue.value = '';
      lastValid.value = '';
    } else {
      internalValue.value = String(val);
      lastValid.value = String(val);
    }
  },
  { immediate: true },
);

function onKeyDown(e: KeyboardEvent) {
  const controlKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
  if (controlKeys.includes(e.key)) return;
  if (e.key === '.' || e.key === ',') {
    if (internalValue.value.includes('.')) e.preventDefault();
    return;
  }
  if (!/^\d$/.test(e.key)) e.preventDefault();
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  const value = input.value.replace(',', '.').replace(/[^\d.]/g, '');

  // 1. Validar formato de dígitos
  if (!decimalRegex.value.test(value)) {
    input.value = lastValid.value;
    return;
  }

  // 2. Validar rango numérico (solo si el número está completo, ej: no validar "1.")
  if (value !== '' && !value.endsWith('.')) {
    const num = Number(value);
    if (num > props.maxValue) {
      showError.value = true;
      input.value = lastValid.value;
      setTimeout(() => (showError.value = false), 2000);
      return;
    }
    // Nota: No validamos minValue aquí para permitir que el usuario escriba "0.7"
    // sin que se borre mientras escribe. La validación final de min se hace al perder el foco o calcular.
  }

  internalValue.value = value;
  lastValid.value = value;
  const emitVal = value.endsWith('.') ? value.slice(0, -1) : value;
  emit('update:modelValue', emitVal === '' ? null : Number(emitVal));
}

function onClean() {
  internalValue.value = '';
  lastValid.value = '';
  emit('update:modelValue', null);
  emit('clean');
}
</script>
