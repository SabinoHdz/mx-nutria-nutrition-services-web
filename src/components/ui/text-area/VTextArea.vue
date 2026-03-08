<template>
  <div class="textarea-wrapper">
    <label v-if="label" class="textarea-label" :for="textareaId">
      <span class="inline-flex items-center gap-1.5">
        {{ label }}
        <span v-if="required" class="textarea-label-required">*</span>
      </span>
    </label>

    <div :class="['textarea-container', textAreaContainerClass]">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="rows"
        :aria-label="ariaLabel || label"
        :aria-describedby="hasError ? errorId : ariaDescribedBy"
        :aria-invalid="hasError"
        :autofocus="autofocus"
        :class="['textarea-field', textAreaClass]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <div
      v-if="hasError || hint || (counter && maxlength)"
      class="flex justify-between gap-2 items-start"
    >
      <div v-if="hasError && touched" :id="errorId" class="textarea-error flex-1" role="alert">
        {{ errorMessage }}
      </div>
      <div v-else-if="hint" class="textarea-hint flex-1">
        {{ hint }}
      </div>
      <div v-if="counter && maxlength" class="textarea-counter">
        {{ String(modelValue || '').length }} / {{ maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { TextAreaProps } from './text-area';
import { getDefaultRequiredMessageTextArea } from './text-area';
import { textAreaVariants } from './text-area.variants';
import { useFormContext, type ValidationRule } from '../form';
import { filterInputByType } from '../input/input.masks';
import type { InputType } from '../input/input';

const props = withDefaults(defineProps<TextAreaProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  validateOn: 'blur',
  variant: 'outline',
  color: 'primary',
  size: 'md',
  dense: false,
  counter: false,
  autofocus: false,
  shadow: false,
  rounded: 'md',
  rows: 4,
  resize: 'vertical',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const touched = ref(false);
const dirty = ref(false);
const errorMessage = ref('');

const textareaId = computed(() => `textarea-${Math.random().toString(36).slice(2, 9)}`);
const errorId = computed(() => `${textareaId.value}-error`);

const effectiveRules = computed(() => {
  const baseRules = props.rules || [];
  if (props.required) {
    const requiredRule: ValidationRule<string> = (val) => {
      const strVal = String(val ?? '').trim();
      if (!strVal) {
        return props.messageRequired ?? getDefaultRequiredMessageTextArea(props.label ?? 'Campo');
      }
      return true;
    };
    return [requiredRule, ...baseRules];
  }
  return baseRules;
});

const hasError = computed(() => errorMessage.value.length > 0);

const textAreaContainerClass = computed(() =>
  textAreaVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    disabled: props.disabled,
    error: hasError.value,
    dense: props.dense,
    rounded: props.rounded,
    shadow: props.shadow,
    resize: props.resize,
  }),
);

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value;
  if (value !== String(props.modelValue ?? '')) {
    dirty.value = true;
  }
  let out = value;
  if (props.type !== 'text') {
    out = filterInputByType(out, props.type as InputType);
  }
  if (props.maxlength) {
    out = out.slice(0, props.maxlength);
  }
  // Actualizar el DOM de inmediato (como VInput) para que no se vean caracteres no permitidos
  if (target.value !== out) {
    target.value = out;
  }
  emit('update:modelValue', out);
  if (props.validateOn === 'input' && touched.value) {
    validateField();
  }
}

async function handleBlur() {
  const currentValue = String(props.modelValue ?? '').trim();
  if (!dirty.value && !currentValue) {
    touched.value = false;
    errorMessage.value = '';
    emit('blur');
    return;
  }
  touched.value = true;
  if (props.validateOn === 'blur') {
    await validateField();
  }
  emit('blur');
}

function handleFocus() {
  if (!touched.value) {
    errorMessage.value = '';
  }
  emit('focus');
}

async function validateField(forceTouch = false): Promise<boolean> {
  errorMessage.value = '';
  const value = String(props.modelValue ?? '').trim();

  for (const rule of effectiveRules.value) {
    const result = await rule(value);
    if (result !== true) {
      if (forceTouch) touched.value = true;
      errorMessage.value = String(result) || 'Campo inválido';
      return false;
    }
  }

  if (!value && !props.required) {
    return true;
  }

  if (props.minlength && value.length < props.minlength) {
    if (forceTouch) touched.value = true;
    errorMessage.value = `Mínimo ${props.minlength} caracteres`;
    return false;
  }

  if (forceTouch) touched.value = true;
  return true;
}

function resetValidation() {
  errorMessage.value = '';
  touched.value = false;
  dirty.value = false;
}

function reset() {
  emit('update:modelValue', '');
  errorMessage.value = '';
  touched.value = false;
  dirty.value = false;
}

const formContext = useFormContext();
let unregister: (() => void) | null = null;

onMounted(() => {
  if (props.autofocus) {
    nextTick(() => {
      textareaRef.value?.focus();
    });
  }
  if (formContext) {
    unregister = formContext.registerField({
      validate: () => validateField(true),
      resetValidation,
      reset,
      focus: () => textareaRef.value?.focus(),
    });
  }
});

onBeforeUnmount(() => {
  if (unregister) unregister();
});

defineExpose({
  validate: () => validateField(true),
  resetValidation,
  reset,
  focus: () => textareaRef.value?.focus(),
});
</script>
