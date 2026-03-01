<template>
  <div class="input-wrapper">
    <!-- Label -->
    <label v-if="label" class="input-label" :for="inputId">
      <span class="inline-flex items-center gap-1.5">
        {{ label }}

        <!-- Tooltip informativo -->
        <v-tooltip
          v-if="labelTooltip"
          :text="labelTooltip"
          :placement="labelTooltipPlacement || 'top'"
          color="neutral"
          size="sm"
          trigger="hover"
          :max-width="250"
        >
          <v-icon
            name="info"
            size="xs"
            class="text-text-secondary hover:text-text-primary transition-colors cursor-help"
            aria-label="Más información"
            role="button"
            tabindex="0"
            @keydown.enter.prevent
            @keydown.space.prevent
          />
        </v-tooltip>

        <span v-if="required" class="input-label-required">*</span>
      </span>
      <span v-if="loading" class="ml-2 text-xs text-text-secondary">(Cargando...)</span>
    </label>

    <!-- Input container -->
    <div :class="['input-container', inputContainerClass]">
      <!-- Prepend icon -->
      <div v-if="prependIconName" class="input-prepend">
        <v-icon :name="prependIconName" size="sm" />
      </div>

      <!-- Prefix text -->
      <span v-if="prefix" class="input-prefix">{{ prefix }}</span>

      <!-- Input element -->
      <input
        :id="inputId"
        ref="inputRef"
        :value="getDisplayValue()"
        :placeholder="placeholder"
        :disabled="disabled || loading"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :min="type === 'number' || type === 'decimal' ? min : undefined"
        :max="type === 'number' || type === 'decimal' ? max : undefined"
        :step="type === 'number' || type === 'decimal' ? step : undefined"
        :aria-label="ariaLabel || label"
        :aria-describedby="hasError ? errorId : ariaDescribedBy"
        :aria-invalid="hasError"
        :autofocus="autofocus"
        :class="['input-field', inputClass]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- Suffix text -->
      <span v-if="suffix" class="input-suffix">{{ suffix }}</span>

      <!-- Loading spinner -->
      <div v-if="loading" class="input-loading-spinner"></div>

      <!-- Append icon (password eye toggle) -->
      <button
        v-else-if="type === 'password'"
        type="button"
        class="input-append-btn"
        @click="togglePasswordVisibility"
        :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      >
        <v-icon :name="showPassword ? 'visibility_off' : 'visibility'" size="sm" />
      </button>

      <!-- Clearable icon -->
      <button
        v-else-if="clearable && modelValue && !disabled && !readonly && !loading"
        type="button"
        class="input-append-btn"
        @click="handleClear"
        aria-label="Limpiar"
      >
        <v-icon name="close" size="sm" />
      </button>
    </div>

    <!-- Bottom row: Error / Hint / Counter -->
    <div
      v-if="hasError || hint || (counter && maxlength)"
      class="flex justify-between gap-2 items-start"
    >
      <!-- Error message -->
      <div v-if="hasError && touched" :id="errorId" class="input-error flex-1" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Hint text -->
      <div v-else-if="hint" class="input-hint flex-1">
        {{ hint }}
      </div>

      <!-- Counter -->
      <div v-if="counter && maxlength" class="input-counter">
        {{ String(modelValue || '').length }} / {{ maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { VIcon } from '../icon';
import { VTooltip } from '../tooltip';
import type { InputProps } from './input';
import { getDefaultRequiredMessage } from './input';
import { inputVariants } from './input.variants';
import {
  filterInputByType,
  applyInputMask,
  limitDecimalPlaces,
  limitIntegerDigits,
} from './input.masks';
import { validateByType, getTypeErrorMessage } from './input.validators';
import { useFormContext, type ValidationRule } from '../form';

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  validateOn: 'blur',
  clearable: true,
  variant: 'outline',
  color: 'primary',
  size: 'md',
  decimalPlaces: 2,
  integerDigits: 10,
  dense: false,
  loading: false,
  counter: false,
  autofocus: false,
  shadow: false,
  rounded: 'md',
  labelTooltipPlacement: 'top',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'clear'): void;
}>();

// ===== REFS =====
const inputRef = ref<HTMLInputElement | null>(null);
const touched = ref(false);
const focused = ref(false);
const dirty = ref(false);
const showPassword = ref(false);
const errorMessage = ref('');

// ===== COMPUTED =====
const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`);

const errorId = computed(() => `${inputId.value}-error`);

/*const computedInputType = computed(() => {
  if (props.type === 'password' && showPassword.value) return 'text';
  if (props.type === 'phone') return 'tel';
  if (props.type === 'email') return 'email';
  if (props.type === 'url') return 'url';
  if (props.type === 'search') return 'search';
  return 'text';
});*/

const prependIconName = computed(() => {
  if (props.prependIcon) return props.prependIcon;
  if (props.type === 'search') return 'search';
  if (props.type === 'email') return 'mail';
  if (props.type === 'phone') return 'phone';
  if (props.type === 'url') return 'link';
  return undefined;
});

const effectiveRules = computed(() => {
  const baseRules = props.rules || [];

  // Agregar regla de requerido si required={true}
  if (props.required) {
    const requiredRule: ValidationRule = (val) => {
      const strVal = String(val).trim();
      if (!strVal) {
        return props.messageRequired || getDefaultRequiredMessage(props.label);
      }
      return true;
    };
    return [requiredRule, ...baseRules];
  }

  return baseRules;
});

const hasError = computed(() => errorMessage.value.length > 0);

const inputContainerClass = computed(() =>
  inputVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    disabled: props.disabled || props.loading,
    error: hasError.value,
    dense: props.dense,
    rounded: props.rounded,
    shadow: props.shadow,
    loading: props.loading,
  }),
);

// ===== METHODS =====

const getDisplayValue = (): string => {
  const value = String(props.modelValue || '');
  return applyInputMask(value, props.type);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // Marcar como dirty
  if (value !== String(props.modelValue || '')) {
    dirty.value = true;
  }

  // 1. Filtrar caracteres inválidos
  value = filterInputByType(value, props.type);

  // 2. Respetar maxlength
  if (props.maxlength) {
    value = value.slice(0, props.maxlength);
  }

  // 3. Limitar decimales si es tipo decimal
  if (props.type === 'decimal') {
    value = limitDecimalPlaces(value, props.decimalPlaces);
    value = limitIntegerDigits(value, props.integerDigits);
  }

  // 4. Aplicar máscara visual
  target.value = applyInputMask(value, props.type);

  // 5. Emitir valor limpio (sin máscara para almacenamiento)
  const cleanValue = props.type === 'phone' ? value.replace(/\D/g, '') : value;
  emit('update:modelValue', cleanValue);

  // 6. Validar en tiempo real si es necesario
  if (props.validateOn === 'input' && touched.value) {
    validateField();
  }
};

const handleBlur = async () => {
  focused.value = false;
  const currentValue = String(props.modelValue ?? '').trim();

  // Si el usuario no escribio nada, no marcar touched ni validar
  if (!dirty.value && !currentValue) {
    touched.value = false;
    errorMessage.value = '';
    emit('blur');
    return;
  }

  touched.value = true;

  // Validar en blur
  if (props.validateOn === 'blur') {
    await validateField();
  }

  emit('blur');
};

const handleFocus = () => {
  focused.value = true;
  if (!touched.value) {
    errorMessage.value = ''; // Limpiar error solo si aún no se ha validado
  }
  emit('focus');
};

const handleClear = () => {
  emit('update:modelValue', '');
  errorMessage.value = '';
  touched.value = false;
  dirty.value = false;
  inputRef.value?.focus();
  emit('clear');
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const validateField = async (forceTouch = false): Promise<boolean> => {
  errorMessage.value = '';
  const value = props.modelValue ?? '';
  const trimmedValue = String(value).trim();

  // Validar con rules
  for (const rule of effectiveRules.value) {
    const result = await rule(value);
    if (result !== true) {
      if (forceTouch) touched.value = true;
      errorMessage.value = String(result) || 'Campo inválido';
      return false;
    }
  }

  // Si está vacío y no es requerido, no validar por tipo
  if (!trimmedValue && !props.required) {
    return true;
  }

  // Validar según tipo
  const isValidType = validateByType(value, props.type, {
    min: props.min,
    max: props.max,
    minlength: props.minlength,
    maxlength: props.maxlength,
    decimalPlaces: props.decimalPlaces,
    integerDigits: props.integerDigits,
  });

  if (!isValidType) {
    if (forceTouch) touched.value = true;
    errorMessage.value = getTypeErrorMessage(props.type);
    return false;
  }

  if (forceTouch) touched.value = true;
  return true;
};

const resetValidation = () => {
  errorMessage.value = '';
  touched.value = false;
  dirty.value = false;
};

const reset = () => {
  emit('update:modelValue', '');
  errorMessage.value = '';
  touched.value = false;
  dirty.value = false;
  showPassword.value = false;
};

// ===== FORM INTEGRATION =====
const formContext = useFormContext();
let unregister: (() => void) | null = null;

onMounted(() => {
  // Auto focus si está especificado
  if (props.autofocus) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }

  if (formContext) {
    unregister = formContext.registerField({
      validate: () => validateField(true),
      resetValidation,
      reset,
      focus: () => inputRef.value?.focus(),
    });
  }
});

onBeforeUnmount(() => {
  if (unregister) unregister();
});

// ===== EXPOSE =====
defineExpose({
  validate: () => validateField(true),
  resetValidation,
  reset,
  focus: () => inputRef.value?.focus(),
});
</script>
