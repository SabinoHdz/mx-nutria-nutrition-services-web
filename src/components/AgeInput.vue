<style scoped>
.input:focus {
  box-shadow: none !important;
}
</style>
<template>
  <div class="form-control">
    <label class="label m-1" :for="inputId">
      <span class="label-text text-sm">
        {{ label }}<span v-if="required" class="text-red-500">*</span>
      </span>
    </label>
    <div class="relative flex items-center">
      <!-- Si DaisyUI sigue mostrando doble borde, puedes usar tu propio input con Tailwind: -->
      <input
        :id="inputId"
        type="text"
        class="w-full pr-8 px-3 py-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none bg-base-100 text-sm"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        :value="modelValue"
        @input="onInput"
        @keydown="onKeyDown"
      />
      <BaseIcon
        v-if="!!modelValue && !disabled"
        name="close"
        class="absolute right-2 cursor-pointer text-gray-400 hover:text-red-500 text-lg"
        @click="onClean"
        aria-label="Limpiar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseIcon from './icon/BaseIcon.vue';

const inputId = `age-input-${Math.random().toString(36).substr(2, 9)}`;
const props = defineProps({
  modelValue: {
    type: [Number, null],
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 1,
  },
  maxLength: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(['update:modelValue', 'clean']);

function onInput(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  // Solo permitir dígitos
  value = value.replace(/\D/g, '');
  // Limitar a min y maxLength
  if (value !== '' && Number(value) < props.min) {
    value = String(props.min);
  }
  if (value.length > props.maxLength) {
    value = value.slice(0, props.maxLength);
  }
  emit('update:modelValue', value);
}

function onKeyDown(e: KeyboardEvent) {
  // Permitir solo números, teclas de control y navegación
  if (
    !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(e.key) &&
    !(e.key >= '0' && e.key <= '9')
  ) {
    e.preventDefault();
  }
}

function onClean() {
  // emit('update:modelValue', '');
  emit('clean');
}
</script>
