<template>
  <div class="select-wrapper" ref="wrapperRef">
    <!-- Label -->
    <label v-if="label" class="select-label" :for="selectId">
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
            aria-label="Mas informacion"
          />
        </v-tooltip>

        <span v-if="required" class="select-label-required">*</span>
      </span>
      <span v-if="loading" class="ml-2 text-xs text-text-secondary">(Cargando...)</span>
    </label>

    <!-- Select container -->
    <div :class="['select-container', selectContainerClass]" @click="toggleOpen">
      <div
        class="select-control"
        :id="selectId"
        :aria-label="ariaLabel || label"
        :aria-describedby="hasError ? errorId : ariaDescribedBy"
        :aria-invalid="hasError"
      >
        <!-- Chips (multiple) -->
        <div v-if="multiple && useChips && selectedOptions.length" class="select-chips">
          <span
            v-for="opt in selectedOptions"
            :key="String(getOptionValue(opt))"
            class="select-chip"
          >
            {{ getOptionLabel(opt) }}
            <button
              type="button"
              class="select-chip-remove"
              :aria-label="`Quitar ${getOptionLabel(opt)}`"
              @click.stop="removeOption(opt)"
            >
              <v-icon name="close" size="xs" />
            </button>
          </span>
        </div>

        <!-- Single value -->
        <span v-else-if="hasSelection" class="select-value">{{ displayLabel }}</span>

        <!-- Placeholder -->
        <span v-else class="select-placeholder">{{ placeholder }}</span>
      </div>

      <!-- Clearable -->
      <button
        v-if="clearable && hasSelection && !disabled && !readonly && !loading"
        type="button"
        class="select-clear"
        @click.stop="handleClear"
        aria-label="Limpiar"
      >
        <v-icon name="close" size="sm" />
      </button>

      <!-- Loading spinner -->
      <div v-if="loading" class="select-loading-spinner"></div>

      <!-- Arrow -->
      <span class="select-arrow">
        <v-icon name="expand_more" size="sm" />
      </span>
    </div>

    <!-- Dropdown menu -->
    <div v-if="isOpen" :id="menuId" class="select-menu">
      <div v-if="searchable" class="select-search">
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="text"
          class="select-search-input"
          placeholder="Buscar..."
          @keydown.esc.prevent="closeMenu"
        />
      </div>

      <ul v-if="filteredOptions.length" class="select-options">
        <li
          v-for="option in filteredOptions"
          :key="String(getOptionValue(option))"
          :class="[
            'select-option',
            { 'select-option--selected': isSelected(option) },
            { 'select-option--disabled': isOptionDisabled(option) },
          ]"
          @click="handleOptionClick(option)"
        >
          <div class="select-option-content">
            <span class="select-option-label">{{ getOptionLabel(option) }}</span>
            <span v-if="option.description" class="select-option-desc">
              {{ option.description }}
            </span>
          </div>
          <v-icon
            v-if="multiple && isSelected(option)"
            name="check"
            size="sm"
            class="text-primary"
          />
        </li>
      </ul>

      <div v-else class="select-empty">{{ emptyText }}</div>
    </div>

    <!-- Bottom row: Error / Hint -->
    <div v-if="hasError || hint" class="select-bottom">
      <div v-if="hasError && touched" :id="errorId" class="select-error" role="alert">
        {{ errorMessage }}
      </div>
      <div v-else-if="hint" class="select-hint">{{ hint }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { VIcon } from '../icon';
import { VTooltip } from '../tooltip';
import type { SelectOption, SelectProps } from './select';
import { selectVariants } from './select.variants';
import { useFormContext, type ValidationRule } from '../form';

/**
 * Mensaje de validación por defecto para campos requeridos
 */
const getDefaultRequiredMessage = (label: string): string => {
  return `El campo "${label}" es requerido`;
};

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'Seleccionar...',
  disabled: false,
  readonly: false,
  required: false,
  validateOn: 'blur',
  clearable: true,
  variant: 'outline',
  color: 'primary',
  size: 'md',
  dense: false,
  rounded: 'md',
  shadow: false,
  loading: false,
  multiple: false,
  useChips: true,
  searchable: false,
  emptyText: 'Sin opciones',
  optionLabel: 'label',
  optionValue: 'value',
  optionDisable: 'disable',
  labelTooltipPlacement: 'top',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | Array<string | number>): void;
  (e: 'change', value: string | number | Array<string | number>): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'clear'): void;
}>();

// ===== REFS =====
const wrapperRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const touched = ref(false);
const dirty = ref(false);
const errorMessage = ref('');
const searchQuery = ref('');
const lastChangeKey = ref('');

const selectId = `select-${Math.random().toString(36).slice(2, 9)}`;
const menuId = `select-menu-${Math.random().toString(36).slice(2, 9)}`;
const errorId = computed(() => `${selectId}-error`);

// ===== COMPUTED =====
const optionLabelKey = computed(() => props.optionLabel || 'label');
const optionValueKey = computed(() => props.optionValue || 'value');
const optionDisableKey = computed(() => props.optionDisable || 'disable');

const normalizedOptions = computed(() => props.options || []);

const selectedValues = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : [];
  }
  if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') {
    return [] as Array<string | number>;
  }
  return [props.modelValue as string | number];
});

const selectedOptions = computed(() => {
  const values = new Set(selectedValues.value);
  return normalizedOptions.value.filter((opt) => values.has(getOptionValue(opt)));
});

const hasSelection = computed(() => selectedValues.value.length > 0);

const displayLabel = computed(() => {
  const option = selectedOptions.value[0];
  return option ? getOptionLabel(option) : '';
});

const hasError = computed(() => errorMessage.value.length > 0);

const selectContainerClass = computed(() =>
  selectVariants({
    variant: props.variant,
    color: props.color,
    size: props.size,
    disabled: props.disabled || props.loading,
    error: hasError.value,
    dense: props.dense,
    rounded: props.rounded,
    shadow: props.shadow,
    loading: props.loading,
    open: isOpen.value,
  }),
);

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) return normalizedOptions.value;
  const query = searchQuery.value.toLowerCase();
  return normalizedOptions.value.filter((opt) => {
    const label = getOptionLabel(opt).toLowerCase();
    const value = String(getOptionValue(opt)).toLowerCase();
    return label.includes(query) || value.includes(query);
  });
});

const maxReached = computed(() => {
  if (!props.multiple || !props.maxValues) return false;
  return selectedValues.value.length >= props.maxValues;
});

const effectiveRules = computed(() => {
  const baseRules = props.rules || [];

  if (props.required) {
    const requiredRule: ValidationRule = (val) => {
      if (props.multiple) {
        const arr = Array.isArray(val) ? val : [];
        return arr.length > 0
          ? true
          : props.messageRequired || getDefaultRequiredMessage(props.label);
      }
      const strVal = String(val ?? '').trim();
      if (!strVal) {
        return props.messageRequired || getDefaultRequiredMessage(props.label);
      }
      return true;
    };
    return [requiredRule, ...baseRules];
  }

  return baseRules;
});

// ===== CHANGE HELPERS =====
const normalizeValue = (value: unknown) => {
  if (props.multiple) {
    return Array.isArray(value) ? value : [];
  }
  if (value === undefined || value === null || value === '') return '';
  return value as string | number;
};

const serializeValue = (value: unknown): string => JSON.stringify(normalizeValue(value));

const emitChangeIfNeeded = (nextValue: string | number | Array<string | number>) => {
  const nextKey = serializeValue(nextValue);
  if (nextKey === lastChangeKey.value) return;
  lastChangeKey.value = nextKey;
  emit('change', nextValue);
};

// ===== METHODS =====
const getOptionLabel = (option: SelectOption): string => {
  const key = optionLabelKey.value;
  const value = (option as unknown as Record<string, unknown>)[key];
  return String(value ?? '');
};

const getOptionValue = (option: SelectOption): string | number => {
  const key = optionValueKey.value;
  const value = (option as unknown as Record<string, unknown>)[key];
  return (value as string | number) ?? '';
};

const isOptionDisabled = (option: SelectOption): boolean => {
  const key = optionDisableKey.value;
  const disabled = Boolean((option as unknown as Record<string, unknown>)[key]);
  if (disabled) return true;
  if (maxReached.value && !isSelected(option)) return true;
  return false;
};

const isSelected = (option: SelectOption): boolean => {
  const value = getOptionValue(option);
  return selectedValues.value.includes(value);
};

const toggleOpen = () => {
  if (props.disabled || props.readonly) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit('focus');
  }
};

const closeMenu = async () => {
  if (!isOpen.value) return;
  isOpen.value = false;
  await handleBlur();
};

const handleOptionClick = (option: SelectOption) => {
  if (props.disabled || props.readonly || isOptionDisabled(option)) return;

  const value = getOptionValue(option);
  dirty.value = true;

  if (props.multiple) {
    const next = [...selectedValues.value];
    const index = next.indexOf(value);
    if (index >= 0) {
      next.splice(index, 1);
    } else if (!maxReached.value) {
      next.push(value);
    }
    emit('update:modelValue', next);
    emitChangeIfNeeded(next);
  } else {
    emit('update:modelValue', value);
    emitChangeIfNeeded(value);
    closeMenu();
  }

  if (touched.value) {
    nextTick(() => validateField());
  }
};

const removeOption = (option: SelectOption) => {
  if (props.disabled || props.readonly) return;
  const value = getOptionValue(option);
  const next = selectedValues.value.filter((item) => item !== value);
  dirty.value = true;
  emit('update:modelValue', next);
  emitChangeIfNeeded(next);

  if (touched.value) {
    nextTick(() => validateField());
  }
};

const handleClear = () => {
  dirty.value = true;
  const nextValue = props.multiple ? [] : '';
  emit('update:modelValue', nextValue);
  emitChangeIfNeeded(nextValue);
  errorMessage.value = '';
  touched.value = false;
  emit('clear');
};

const handleBlur = async () => {
  const hasValue = hasSelection.value;

  if (!dirty.value && !hasValue) {
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
};

const validateField = async (forceTouch = false): Promise<boolean> => {
  errorMessage.value = '';
  const value = props.modelValue ?? (props.multiple ? [] : '');

  for (const rule of effectiveRules.value) {
    const result = await rule(value as string | number | Array<string | number>);
    if (result !== true) {
      if (forceTouch) touched.value = true;
      errorMessage.value = String(result) || 'Campo invalido';
      return false;
    }
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
  emit('update:modelValue', props.multiple ? [] : '');
  errorMessage.value = '';
  touched.value = false;
  dirty.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!isOpen.value) return;
  const target = event.target as Node;
  if (!wrapperRef.value?.contains(target)) {
    closeMenu();
  }
};

// ===== WATCHERS =====
watch(isOpen, (open) => {
  if (open && props.searchable) {
    nextTick(() => searchInputRef.value?.focus());
  }
  if (!open) {
    searchQuery.value = '';
  }
});

watch(
  () => props.modelValue,
  (value) => {
    lastChangeKey.value = serializeValue(value);
  },
  { immediate: true },
);

// ===== FORM INTEGRATION =====
const formContext = useFormContext();
let unregister: (() => void) | null = null;

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);

  if (formContext) {
    unregister = formContext.registerField({
      validate: () => validateField(true),
      resetValidation,
      reset,
      focus: () => wrapperRef.value?.querySelector<HTMLElement>('.select-control')?.focus(),
    });
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true);
  if (unregister) unregister();
});

// ===== EXPOSE =====
defineExpose({
  validate: () => validateField(true),
  resetValidation,
  reset,
  focus: () => wrapperRef.value?.querySelector<HTMLElement>('.select-control')?.focus(),
});
</script>
