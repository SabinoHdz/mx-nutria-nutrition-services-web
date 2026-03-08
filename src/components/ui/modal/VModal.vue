<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="modal-overlay"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? 'modal-title' : undefined"
      aria-describedby="modal-message"
      @keydown.escape="close"
    >
      <div class="modal-backdrop" aria-hidden="true" @click="close" />

      <div ref="panelRef" class="modal-panel" @click.stop>
        <div class="modal-panel__icon" :class="`modal-panel__icon--${type}`">
          <VIcon :name="typeIcon" size="lg" />
        </div>
        <h2 v-if="title" id="modal-title" class="modal-panel__title">
          {{ title }}
        </h2>
        <p id="modal-message" class="modal-panel__message">
          <slot>{{ message }}</slot>
        </p>
        <div class="modal-panel__actions">
          <VButton
            variant="solid"
            :color="buttonColor"
            @click="close"
          >
            {{ closeLabel }}
          </VButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, ref, nextTick } from 'vue';
import { VIcon } from '@/components/ui/icon';
import { VButton } from '@/components/ui/button';
import type { ModalProps, ModalType } from './modal';
import { MODAL_TYPE_ICONS } from './modal';

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  type: 'info',
  closeLabel: 'Aceptar',
});

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});

const typeIcon = computed(() => MODAL_TYPE_ICONS[props.type as ModalType]);

const buttonColor = computed(() => {
  const map: Record<ModalType, 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
    info: 'primary',
    success: 'success',
    warning: 'warning',
    error: 'error',
  };
  return map[props.type as ModalType] ?? 'primary';
});

const panelRef = ref<HTMLElement | null>(null);

function close() {
  isOpen.value = false;
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      nextTick(() => {
        const firstFocusable = panelRef.value?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        firstFocusable?.focus();
      });
    }
  },
);
</script>
