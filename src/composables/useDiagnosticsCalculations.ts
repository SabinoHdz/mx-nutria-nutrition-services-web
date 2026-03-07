import type { Ref } from 'vue';
import { computed } from 'vue';
import type { Patient, AntropometricData } from '@/types';

export type BasalMethod = 'Harris Benedict' | 'Mifflin-St. Jeor';

export interface BasalEnergyResult {
  method: BasalMethod;
  value: number | null;
}

export function useDiagnosticsCalculations(
  formData: Ref<Patient>,
  antropometric: Ref<AntropometricData>,
  physicalActivityLevel: Ref<number | null>,
) {
  const healthyWeight = computed(() => {
    const height = formData.value.height ?? 0;
    if (!height || height <= 0) {
      return { min: null, max: null } as const;
    }

    const min = 18.5 * height * height;
    const max = 24.9 * height * height;

    return {
      min: min.toFixed(1),
      max: max.toFixed(1),
    } as const;
  });

  const basalEnergyExpenditure = computed<BasalEnergyResult>(() => {
    const age = formData.value.age ?? 0;
    const weight = formData.value.weight ?? 0;
    const heightM = formData.value.height ?? 0;
    const gender = formData.value.gender as 'MALE' | 'FEMALE' | null;
    const imcStatus = antropometric.value.imcStatus || 'Pendiente';

    const hasData = age > 0 && weight > 0 && heightM > 0 && !!gender;
    if (!hasData || imcStatus === 'Pendiente') {
      return { method: 'Harris Benedict', value: null };
    }

    const heightCm = heightM * 100;

    if (imcStatus === 'Normal' || imcStatus === 'Desnutrición') {
      const value =
        gender === 'MALE'
          ? 66.5 + 13.75 * weight + 5 * heightCm - 6.78 * age
          : 655 + 9.6 * weight + 1.95 * heightCm - 4.68 * age;
      return { method: 'Harris Benedict', value: Math.round(value) };
    }

    if (
      imcStatus === 'Sobrepeso' ||
      imcStatus === 'Obesidad I' ||
      imcStatus === 'Obesidad II' ||
      imcStatus === 'Obesidad Mórbida'
    ) {
      const value =
        gender === 'MALE'
          ? 10 * weight + 6.25 * heightCm - 5 * age + 5
          : 10 * weight + 6.25 * heightCm - 5 * age - 161;
      return { method: 'Mifflin-St. Jeor', value: Math.round(value) };
    }

    return { method: 'Harris Benedict', value: null };
  });

  const hydrationRequirement = computed<{ min: number | null; max: number | null }>(() => {
    const weight = formData.value.weight ?? 0;
    if (!weight || weight <= 0) {
      return { min: null, max: null };
    }
    return {
      min: Math.round(weight * 30) / 1000,
      max: Math.round(weight * 35) / 1000,
    };
  });

  const etaValue = computed<number | null>(() => {
    const basal = basalEnergyExpenditure.value?.value;
    return basal != null ? Math.round(basal * 0.1) : null;
  });

  const getValue = computed<number | null>(() => {
    const basal = basalEnergyExpenditure.value?.value;
    const act = physicalActivityLevel.value;
    if (basal == null || act == null) return null;
    return Math.round(basal * (1 + 0.1 + act / 100));
  });

  const activitySelectEnabled = computed(() => basalEnergyExpenditure.value?.value != null);

  return {
    healthyWeight,
    basalEnergyExpenditure,
    hydrationRequirement,
    etaValue,
    getValue,
    activitySelectEnabled,
  };
}
