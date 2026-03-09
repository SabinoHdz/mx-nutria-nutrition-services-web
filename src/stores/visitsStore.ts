import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';
import { useFingerprint } from '@/composables/useFingerprint';

export const useVisitsStore = defineStore('visits', () => {
  const count = ref<number | null>(null);
  const recorded = ref(false);

  async function recordVisit() {
    if (recorded.value) return;
    try {
      const fingerprint = await useFingerprint();
      const headers: Record<string, string> = {};
      if (fingerprint) headers['x-visit-fingerprint'] = fingerprint;
      await api.get<void>('/api/visits/record', { headers });
      recorded.value = true;
    } catch {
      // Silently ignore; don't block app
    }
  }

  async function fetchCount() {
    try {
      const data = await api.get<{ count: number }>('/api/visits/count');
      count.value = data.count;
    } catch {
      count.value = null;
    }
  }

  return {
    count: readonly(count),
    recorded: readonly(recorded),
    recordVisit,
    fetchCount,
  };
});
