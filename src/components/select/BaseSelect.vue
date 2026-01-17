<template>
  <div class="form-control">
    <!-- Label con asterisco si es requerido -->
    <label class="label" :for="inputId">
      <span class="label-text text-sm text-nutrition-text">
        {{ label }}<span v-if="required" class="text-red-500 ml-0.5">*</span>
      </span>
    </label>

    <div class="relative">
      <!-- Select nativo con estilos personalizados -->
      <select
        :id="inputId"
        class="select select-bordered select-sm w-full bg-nutrition-bg-input border-nutrition-border focus:border-nutrition-blue focus:outline-none text-sm text-nutrition-text-value transition-colors pr-10"
        :class="{ 'text-nutrition-text-light': !modelValue }"
        :disabled="disabled"
        :value="modelValue"
        @change="onChange"
      >
        <!-- Opción placeholder si no hay valor seleccionado -->
        <option value="" disabled selected v-if="placeholder">
          {{ placeholder }}
        </option>

        <!-- Opciones dinámicas -->
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Botón de limpieza (X) -->
      <BaseIcon
        v-if="!!modelValue && !disabled"
        name="close"
        class="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer text-nutrition-text-light hover:text-red-500 text-lg transition-colors z-10"
        @click="onClean"
        aria-label="Limpiar selección"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseIcon from '../icon/BaseIcon.vue';

// Interfaz para las opciones
export interface SelectOption {
  value: string | number;
  label: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array as () => SelectOption[],
    required: true,
    validator: (val: SelectOption[]) => {
      return val.every((opt) => 'value' in opt && 'label' in opt);
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Selecciona una opción',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  clean: [];
}>();

const inputId = `select-${Math.random().toString(36).substr(2, 9)}`;

function onChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value;
  emit('update:modelValue', value);
}

function onClean() {
  emit('update:modelValue', '');
  emit('clean');
}
</script>

<style scoped>
/* Ajustar el padding derecho para que el icono X no se superponga con la flecha del select */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Cuando hay botón de limpieza, ajustar el padding */
select:not(:disabled) {
  padding-right: 3rem;
}

/* Estilo para opción deshabilitada (placeholder) */
select option[disabled] {
  color: #94a3b8;
}
</style>
