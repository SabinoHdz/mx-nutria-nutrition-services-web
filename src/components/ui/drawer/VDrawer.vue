<template>
  <div class="drawer min-h-screen bg-background">
    <!-- Main content -->
    <div class="drawer__content flex flex-col min-h-screen">
      <slot />
    </div>

    <!-- Overlay -->
    <div
      v-show="model"
      class="drawer__overlay"
      aria-hidden="true"
      @click="close"
    />

    <!-- Sidebar -->
    <aside
      class="drawer__side"
      :class="{ 'drawer__side--open': model }"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      :aria-hidden="!model"
    >
      <slot name="sidebar" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import type { DrawerProps } from './drawer';

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  side: 'start',
});

const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>();

const model = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
});

const close = () => {
  model.value = false;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && model.value) {
    model.value = false;
  }
};

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
});
</script>
