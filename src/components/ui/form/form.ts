import { inject } from 'vue';

export type ValidationResult = true | false | string;

export type ValidationRule<T = unknown> = (
  value: T,
) => ValidationResult | Promise<ValidationResult>;

export interface FormField {
  validate: () => ValidationResult | Promise<ValidationResult>;
  resetValidation?: () => void;
  reset?: () => void;
  focus?: () => void;
}

export interface FormContext {
  registerField: (field: FormField) => () => void;
}

export interface FormProps {
  modelValue?: unknown;
  rules?: ValidationRule<unknown>[];
  greedy?: boolean;
  noErrorFocus?: boolean;
  noResetFocus?: boolean;
  noValidate?: boolean;
}

export interface FormValidationPayload {
  errors: string[];
}

export const FORM_CONTEXT_KEY = Symbol('VForm');

export const useFormContext = () => inject<FormContext | null>(FORM_CONTEXT_KEY, null);
