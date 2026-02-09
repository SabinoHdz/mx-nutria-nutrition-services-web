<template>
  <div class="form-control">
    <!-- Label con asterisco si es requerido -->
    <label class="label" :for="inputId" v-if="!!label">
      <span class="label-text text-sm text-nutrition-text">
        {{ label }}<span v-if="required" class="text-red-500 ml-0.5">*</span>
      </span>
    </label>

    <div class="relative flex items-center w-full">
      <input
        :id="inputId"
        type="text"
        inputmode="decimal"
        class="w-full pr-10 px-3 py-2 rounded border border-nutrition-border focus:border-nutrition-blue focus:outline-none bg-nutrition-bg-input text-sm text-nutrition-text-value transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="internalValue"
        @input="onInput"
        @keydown="onKeyDown"
        @blur="onBlur"
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

    <!-- Mensaje de error si el valor está fuera de rango -->
    <p v-if="showError" class="text-[10px] text-red-500 mt-1 ml-1">
      {{ errorMessage }}
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
  /** Para circunferencias en cm: "3,1" (ej: 85.5) o "3,0" (ej: 85) */
  decimalLimit?: string;
  /** Mínimo lógico (bebé o brazo muy delgado) */
  minValue?: number;
  /** Máximo lógico (casos extremos) */
  maxValue?: number;
  /** Unidad de medida para mostrar en mensajes de error */
  unit?: string;
  /** Nombre del campo para mensajes de error personalizados */
  fieldName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  required: false,
  placeholder: '',
  disabled: false,
  decimalLimit: '3,1',
  minValue: 20,
  maxValue: 250,
  unit: 'cm',
  fieldName: 'El valor',
});

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
  clean: [];
}>();

const inputId = `circumference-input-${Math.random().toString(36).substr(2, 9)}`;
const showError = ref(false);
const errorMessage = ref('');

// Parseo de límites de dígitos
const intLimit = ref(3);
const decLimit = ref(1);

watch(
  () => props.decimalLimit,
  (val) => {
    const [i = 3, d = 1] = val.split(',').map(Number);
    intLimit.value = isNaN(i) ? 3 : i;
    decLimit.value = isNaN(d) ? 1 : d;
  },
  { immediate: true },
);

// Regex dinámico para el formato (ej: 3 enteros, 1 decimal)
const decimalRegex = computed(
  () => new RegExp(`^\\d{0,${intLimit.value}}(\\.\\d{0,${decLimit.value}})?$`),
);

const internalValue = ref('');
const lastValid = ref('');

// Sincronización externa -> interna
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

// Bloqueo preventivo de teclas no permitidas
function onKeyDown(e: KeyboardEvent) {
  const controlKeys = [
    'Backspace',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    'Home',
    'End',
    'Enter',
  ];
  if (controlKeys.includes(e.key)) return;

  // Permitir punto o coma decimal (solo uno)
  if (e.key === '.' || e.key === ',') {
    if (internalValue.value.includes('.')) {
      e.preventDefault();
    }
    return;
  }

  // Solo dígitos
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(',', '.').replace(/[^\d.]/g, '');

  // Solo un punto
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }

  // 1. Validar formato de dígitos (regex)
  if (!decimalRegex.value.test(value)) {
    internalValue.value = lastValid.value;
    input.value = lastValid.value;
    return;
  }

  // 2. Validar rango numérico (solo si no termina en punto)
  if (value !== '' && !value.endsWith('.')) {
    const num = Number(value);

    // Validar máximo
    if (num > props.maxValue) {
      showError.value = true;
      errorMessage.value = `${props.fieldName}: máximo ${props.maxValue} ${props.unit}`;
      internalValue.value = lastValid.value;
      input.value = lastValid.value;
      setTimeout(() => (showError.value = false), 2500);
      return;
    }

    // Validar mínimo (solo al terminar de escribir, no mientras escribe)
    // Esta validación se hace mejor en onBlur para no interrumpir al usuario
  }

  // Si pasa las validaciones, actualizar
  internalValue.value = value;
  lastValid.value = value;

  const emitVal = value.endsWith('.') ? value.slice(0, -1) : value;
  emit('update:modelValue', emitVal === '' ? null : Number(emitVal));
}

// Validación final al perder el foco
function onBlur() {
  if (internalValue.value === '') return;

  const num = Number(internalValue.value);

  if (num < props.minValue) {
    showError.value = true;
    errorMessage.value = `${props.fieldName}: mínimo ${props.minValue} ${props.unit}`;
    setTimeout(() => (showError.value = false), 2500);
  }
}

function onClean() {
  internalValue.value = '';
  lastValid.value = '';
  showError.value = false;
  emit('update:modelValue', null);
  emit('clean');
}
</script>
