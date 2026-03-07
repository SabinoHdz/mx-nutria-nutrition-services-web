import type { Ref } from 'vue';
import { ref, computed } from 'vue';
import type { Patient } from '@/types';

export function createDefaultFormData(): Patient {
  return {
    age: null,
    height: null,
    weight: null,
    gender: null,
  };
}

export function useDiagnosticsForm() {
  const formData = ref<Patient>(createDefaultFormData());

  const isFormValid = computed(() => {
    return (Object.keys(formData.value) as Array<keyof Patient>).every(
      (field) => !!formData.value[field],
    );
  });

  function clearFormData() {
    formData.value = createDefaultFormData();
  }

  return {
    formData,
    createDefaultFormData,
    isFormValid,
    clearFormData,
  };
}
