<template>
  <Teleport to="body">
    <div
      v-show="visible"
      class="loading-overlay"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div class="loading-overlay__backdrop" />
      <div class="loading-overlay__content">
        <div class="loading-overlay__spinner" />
        <p v-if="message" class="loading-overlay__message">
          {{ message }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useLoadingState } from '@/composables/useLoading';

const { visible, message } = useLoadingState();
</script>
