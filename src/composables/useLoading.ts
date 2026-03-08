import { ref, readonly } from 'vue';

const visible = ref(false);
const message = ref('');
let delayTimer: ReturnType<typeof setTimeout> | null = null;
const defaultDelay = 200;

export interface LoadingShowOptions {
  message?: string;
  delay?: number;
}

/**
 * Global loading state (Quasar-style).
 * show() / show('Enviando...') / show({ message, delay })
 * hide() in finally.
 */
export function useLoading() {
  function show(options?: string | LoadingShowOptions) {
    const msg = typeof options === 'string' ? options : options?.message ?? '';
    const delay = typeof options === 'object' && options?.delay !== undefined ? options.delay : defaultDelay;

    message.value = msg;

    if (delay <= 0) {
      visible.value = true;
      return;
    }

    delayTimer = setTimeout(() => {
      visible.value = true;
      delayTimer = null;
    }, delay);
  }

  function hide() {
    if (delayTimer !== null) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
    visible.value = false;
    message.value = '';
  }

  return {
    show,
    hide,
    isLoading: readonly(visible),
    message: readonly(message),
  };
}

/** Shared state for VLoadingOverlay (same refs everywhere) */
export function useLoadingState() {
  return {
    visible,
    message,
  };
}
