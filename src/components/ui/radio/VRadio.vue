<template>
  <div class="radio-container">
    <!-- WRAPPER DEL RADIO -->
    <label :class="radioClasses">
      <!-- INPUT NATIVO (oculto pero funcional) -->
      <div class="radio-input-wrapper">
        <input
          type="radio"
          :id="inputId"
          :name="name"
          :value="value"
          :checked="modelValue === value"
          :disabled="disabled || readonly"
          :required="required"
          :aria-describedby="ariaDescribedby"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- CHECKMARK VISUAL (reemplaza input nativo) -->
        <div class="radio-checkmark"></div>

        <!-- INDICATOR (círculo interior) -->
        <div class="radio-indicator"></div>
      </div>

      <!-- LABEL TEXT -->
      <span v-if="label" class="radio-label">
        {{ label }}
      </span>
    </label>

    <!-- HINT O ERROR MESSAGE -->
    <div v-if="hint || (error && errorMessage)" class="ml-6">
      <div v-if="hint && !error" class="radio-hint">
        {{ hint }}
      </div>
      <div v-if="error && errorMessage" class="radio-error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RadioProps, RadioEmits } from './radio';
import { radioVariants } from './radio.variants';

/**
 * Desactivar herencia automática de attrs para control manual
 */
defineOptions({
  inheritAttrs: false,
});

// ===== PROPS =====
const props = withDefaults(defineProps<RadioProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  html: false,
});

// ===== EMITS =====
const emit = defineEmits<RadioEmits>();

// ===== COMPUTED =====

/**
 * ID único para el input (para accesibilidad con labels)
 */
const inputId = computed(() => props.id || `radio-${Math.random().toString(36).substr(2, 9)}`);

/**
 * Clases del radio generadas por CVA + clases personalizadas
 */
const radioClasses = computed(() => {
  const classes = radioVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    disabled: props.disabled,
    readonly: props.readonly,
    error: props.error,
  });

  return [classes, '$attrs.class'];
});

// ===== EVENT HANDLERS =====

/**
 * Manejar cambio de valor
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  // Validar con rules si existen
  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      const result = rule(target.value);
      if (result !== true) {
        // Validación falló, mostrar error
        break;
      }
    }
  }

  // Actualizar v-model
  emit('update:modelValue', target.value);

  // Emitir evento change
  emit('change', target.value);
};

/**
 * Manejar focus
 */
const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

/**
 * Manejar blur
 */
const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>

<style scoped>
/**
 * Estilos scoped del componente
 * Solo aplican a este componente
 */

.radio-container {
  width: 100%;
}
</style>
