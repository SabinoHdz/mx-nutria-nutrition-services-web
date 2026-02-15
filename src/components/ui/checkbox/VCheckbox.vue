<template>
  <div class="checkbox-container">
    <label :class="checkboxClasses">
      <span class="checkbox-input-wrapper">
        <input
          type="checkbox"
          :id="inputId"
          :name="name"
          :value="value"
          :checked="isChecked"
          :disabled="disabled || readonly"
          :required="required"
          :aria-describedby="ariaDescribedby"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span class="checkbox-checkmark"></span>
        <VIcon name="done" class="checkbox-icon" />
      </span>

      <span v-if="label" class="checkbox-label">
        {{ label }}
      </span>
    </label>

    <div v-if="hint || displayError" class="ml-7">
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
import { computed, ref, useAttrs } from 'vue';
import VIcon from '@/components/ui/icon/VIcon.vue';
import type { CheckboxProps, CheckboxEmits, CheckboxValue } from './checkbox';
import { checkboxVariants } from './checkbox.variants';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  trueValue: true,
  falseValue: false,
});

const emit = defineEmits<CheckboxEmits>();
const attrs = useAttrs();
const localError = ref<string | null>(null);

const inputId = computed(() => props.id || `checkbox-${Math.random().toString(36).slice(2, 9)}`);

const isChecked = computed(() => props.modelValue === props.trueValue);

const checkboxClasses = computed(() => {
  const classes = checkboxVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    disabled: props.disabled,
    readonly: props.readonly,
    error: props.error || Boolean(localError.value),
  });

  return [classes, attrs.class];
});

const displayError = computed(() => {
  if (props.error) return props.errorMessage || 'Campo requerido';
  return localError.value || '';
});

const runRules = (value: CheckboxValue): string | null => {
  if (props.required && value === props.falseValue) {
    return 'Este campo es obligatorio';
  }

  if (props.rules) {
    for (const rule of props.rules) {
      const result = rule(value);
      if (result !== true) {
        return typeof result === 'string' ? result : 'Valor invalido';
      }
    }
  }

  return null;
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (props.readonly) {
    target.checked = isChecked.value;
    return;
  }

  const newValue = target.checked ? props.trueValue : props.falseValue;
  localError.value = runRules(newValue);

  emit('update:modelValue', newValue);
  emit('change', newValue);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  localError.value = runRules(props.modelValue ?? props.falseValue);
  emit('blur', event);
};
</script>
