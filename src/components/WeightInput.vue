<template>
  <div class="form-control">
    <label class="label" :for="inputId">
      <span class="label-text text-sm">
        {{ label }}<span v-if="required" class="text-red-500">*</span>
      </span>
    </label>

    <div class="join w-full">
      <div class="relative flex items-center join-item flex-1">
        <input
          :id="inputId"
          type="text"
          inputmode="decimal"
          class="w-full pr-8 px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none bg-base-100 text-sm"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="internalValue"
          @input="onInput"
          @keydown="onKeyDown"
          autocomplete="off"
        />
        <BaseIcon
          v-if="internalValue && !disabled"
          name="close"
          class="absolute right-2 cursor-pointer text-gray-400 hover:text-red-500 text-lg"
          @click="onClean"
          aria-label="Limpiar"
        />
      </div>
      <span class="join-item btn btn-sm btn-ghost border-base-300 bg-base-200"> kg </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import BaseIcon from './icon/BaseIcon.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  // "3,2" => 3 enteros, 2 decimales
  decimalLimit: {
    type: String,
    default: '3,2',
    validator: (val: string) => /^\d+,\d+$/.test(val),
  },
  // 👉 mínimo permitido (para peso, 1 evita 0 como valor)
  minValue: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
  clean: [];
}>();

const inputId = `weight-input-${Math.random().toString(36).substr(2, 9)}`;

const intLimit = ref(3);
const decLimit = ref(2);

watch(
  () => props.decimalLimit,
  (val) => {
    const [i, d] = val.split(',').map(Number);
    intLimit.value = isNaN(i) ? 3 : i;
    decLimit.value = isNaN(d) ? 2 : d;
  },
  { immediate: true },
);

// ^\d{0,int}(\.\d{0,dec})?$
const decimalRegex = computed(
  () =>
    new RegExp(
      `^\\d{0,${intLimit.value}}` + (decLimit.value > 0 ? `(\\.\\d{0,${decLimit.value}})?$` : '$'),
    ),
);

const internalValue = ref(''); // lo que ve el usuario
const lastValid = ref(''); // último valor que pasó validación (regex + minValue)

// Sincroniza valor externo -> interno
watch(
  () => props.modelValue,
  (val) => {
    if (val === null || val === undefined || val === '') {
      internalValue.value = '';
      lastValid.value = '';
    } else {
      const str = String(val);
      internalValue.value = str;
      lastValid.value = str;
    }
  },
  { immediate: true },
);

// Bloqueo preventivo de letras y caracteres raros
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

  // punto o coma decimal (solo uno)
  if (e.key === '.' || e.key === ',') {
    if (internalValue.value.includes('.')) {
      e.preventDefault();
    }
    return;
  }

  // solo dígitos
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
}

function onInput(e: Event) {
  const input = e.target as HTMLInputElement;
  let value = input.value;

  // Normalizar coma -> punto y quitar todo lo que no sea número o punto
  value = value.replace(',', '.').replace(/[^\d.]/g, '');

  // Solo un punto (si pegan algo raro)
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }

  // 1) Validación de formato (enteros/decimales) con regex
  if (!decimalRegex.value.test(value)) {
    internalValue.value = lastValid.value;
    input.value = lastValid.value;
    return;
  }

  // 2) Validación de mínimo (evitar 0, valores negativos, etc.)
  if (value !== '') {
    // Para el cálculo del min quitamos punto final temporalmente (ej. "10.")
    const numericStr = value.endsWith('.') ? value.slice(0, -1) : value;
    const num = numericStr === '' ? NaN : Number(numericStr);

    // Si hay número y es menor que minValue, lo rechazamos y volvemos al último bueno
    if (!isNaN(num) && num < props.minValue) {
      internalValue.value = lastValid.value;
      input.value = lastValid.value;
      return;
    }
  }

  // Si pasa ambas validaciones, actualizamos
  internalValue.value = value;
  lastValid.value = value;

  const emitStr = value.endsWith('.') ? value.slice(0, -1) : value;
  emit('update:modelValue', emitStr === '' ? null : Number(emitStr));
}

function onClean() {
  internalValue.value = '';
  lastValid.value = '';
  emit('update:modelValue', null);
  emit('clean');
}
</script>
