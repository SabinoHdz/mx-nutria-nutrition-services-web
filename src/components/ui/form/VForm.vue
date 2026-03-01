<template>
  <form
    ref="formRef"
    class="form"
    :novalidate="noValidate"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import type { FormField, FormProps, FormValidationPayload, ValidationResult } from './form';
import { FORM_CONTEXT_KEY } from './form';

const props = withDefaults(defineProps<FormProps>(), {
  greedy: false,
  noErrorFocus: false,
  noResetFocus: false,
  noValidate: true,
});

const emit = defineEmits<{
  (e: 'submit', event: SubmitEvent): void;
  (e: 'reset', event: Event): void;
  (e: 'validation-success', payload: FormValidationPayload): void;
  (e: 'validation-error', payload: FormValidationPayload): void;
}>();

const formRef = ref<HTMLFormElement | null>(null);
const fields = ref<FormField[]>([]);
const errors = ref<string[]>([]);

const registerField = (field: FormField) => {
  fields.value.push(field);
  return () => {
    fields.value = fields.value.filter((item) => item !== field);
  };
};

provide(FORM_CONTEXT_KEY, { registerField });

const normalizeResult = (result: ValidationResult, fallback: string) => {
  if (result === true) return null;
  if (result === false) return fallback;
  if (typeof result === 'string') return result || fallback;
  return null;
};

const validateRules = async () => {
  if (!props.rules?.length) return [];
  const ruleErrors: string[] = [];

  for (const rule of props.rules) {
    const result = await rule(props.modelValue);
    const message = normalizeResult(result, 'Invalid form');
    if (message) {
      ruleErrors.push(message);
      if (!props.greedy) break;
    }
  }

  return ruleErrors;
};

const focusFirstError = (field?: FormField | null) => {
  if (props.noErrorFocus) return;

  if (field?.focus) {
    field.focus();
    return;
  }

  const fallback = formRef.value?.querySelector<HTMLElement>(
    '[aria-invalid="true"], :invalid, input, select, textarea, button',
  );
  fallback?.focus();
};

const validate = async (): Promise<boolean> => {
  errors.value = [];
  let firstInvalidField: FormField | null = null;

  const ruleErrors = await validateRules();
  if (ruleErrors.length) {
    errors.value.push(...ruleErrors);
  }

  for (const field of fields.value) {
    const result = await field.validate();
    const message = normalizeResult(result, 'Invalid field');

    if (message) {
      errors.value.push(message);
      if (!firstInvalidField) firstInvalidField = field;
      if (!props.greedy) break;
    }
  }

  const isValid = errors.value.length === 0;

  if (isValid) {
    emit('validation-success', { errors: [] });
  } else {
    emit('validation-error', { errors: errors.value });
    focusFirstError(firstInvalidField);
  }

  return isValid;
};

const resetValidation = () => {
  errors.value = [];
  for (const field of fields.value) {
    field.resetValidation?.();
  }
};

const reset = () => {
  formRef.value?.reset();
  for (const field of fields.value) {
    field.reset?.();
  }
  resetValidation();

  if (!props.noResetFocus) {
    const firstInput = formRef.value?.querySelector<HTMLElement>('input, select, textarea, button');
    firstInput?.focus();
  }
};

const handleSubmit = async (event: SubmitEvent) => {
  const isValid = await validate();
  if (isValid) {
    emit('submit', event);
  }
};

const handleReset = (event: Event) => {
  reset();
  emit('reset', event);
};

defineExpose({
  validate,
  resetValidation,
  reset,
  getValidationErrors: () => errors.value.slice(),
});
</script>
