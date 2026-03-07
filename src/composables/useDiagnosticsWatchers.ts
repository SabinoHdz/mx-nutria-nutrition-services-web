import type { Ref } from 'vue';
import { watch } from 'vue';
import type { Patient, AntropometricData } from '@/types';

type BadgeColor = NonNullable<AntropometricData['waistColor']>;

export interface WaistHipIndicators {
  getWaistStatus: (waistValue: number, gender: 'MALE' | 'FEMALE') => { status?: string; color?: string } | null;
  getHipStatus: (hipValue: number, gender: 'MALE' | 'FEMALE') => { status?: string; color?: string } | null;
  getWaistHeightRatio: (
    waistValue: number,
    heightInCm: number,
  ) => { ratio?: number | string; status?: { status?: string; color?: string } | null } | null;
}

/**
 * Registra watchers que actualizan estado de cintura, cadera e índice cintura/estatura
 * según formData y antropometric. No retorna nada; solo efectos.
 */
export function useDiagnosticsWatchers(
  formData: Ref<Patient>,
  antropometric: Ref<AntropometricData>,
  indicators: WaistHipIndicators,
) {
  const { getWaistStatus, getHipStatus, getWaistHeightRatio } = indicators;

  watch(
    () => antropometric.value.waistCircumference,
    (newWaist) => {
      if (!newWaist || newWaist === '' || Number(newWaist) <= 0) {
        antropometric.value.waistStatus = 'Pendiente';
        antropometric.value.waistColor = undefined;
      } else {
        const waistValue = Number(newWaist);
        const gender = formData.value.gender as 'MALE' | 'FEMALE';

        if (gender) {
          const waistStatus = getWaistStatus(waistValue, gender);
          antropometric.value.waistStatus = waistStatus?.status || 'Pendiente';
          antropometric.value.waistColor = (waistStatus?.color ?? undefined) as BadgeColor | undefined;
        }
      }
    },
  );

  watch(
    () => antropometric.value.hipCircumference,
    (newHip) => {
      if (!newHip || newHip === '' || Number(newHip) <= 0) {
        antropometric.value.hipStatus = 'Pendiente';
        antropometric.value.hipColor = undefined;
      } else {
        const hipValue = Number(newHip);
        const gender = formData.value.gender as 'MALE' | 'FEMALE';

        if (gender) {
          const hipStatus = getHipStatus(hipValue, gender);
          antropometric.value.hipStatus = hipStatus?.status || 'Pendiente';
          antropometric.value.hipColor = (hipStatus?.color ?? undefined) as BadgeColor | undefined;
        }
      }
    },
  );

  watch(
    [() => antropometric.value.waistCircumference, () => formData.value.height],
    ([newWaist, newHeight]) => {
      const waistValue = Number(newWaist) || 0;
      if (waistValue > 0) {
        antropometric.value.waistInCm = waistValue.toFixed(1);
      } else {
        antropometric.value.waistInCm = undefined;
      }

      const heightValue = Number(newHeight) || 0;
      if (heightValue > 0) {
        const heightInCm = heightValue * 100;
        antropometric.value.heightInCm = heightInCm.toFixed(1);

        if (waistValue > 0) {
          const iceResult = getWaistHeightRatio(waistValue, heightInCm);
          if (iceResult) {
            antropometric.value.waistHeightRatio = iceResult.ratio;
            antropometric.value.waistHeightStatus = iceResult.status?.status || 'Pendiente';
            antropometric.value.waistHeightColor = (iceResult.status?.color ?? undefined) as BadgeColor | undefined;
          }
        } else {
          antropometric.value.waistHeightStatus = 'Pendiente';
          antropometric.value.waistHeightColor = undefined;
        }
      } else {
        antropometric.value.heightInCm = undefined;
        antropometric.value.waistHeightStatus = 'Pendiente';
        antropometric.value.waistHeightColor = undefined;
      }
    },
  );

  watch(
    () => formData.value.gender,
    (newGender) => {
      if (!newGender) {
        antropometric.value.waistStatus = 'Pendiente';
        antropometric.value.waistColor = undefined;
        antropometric.value.hipStatus = 'Pendiente';
        antropometric.value.hipColor = undefined;
        antropometric.value.waistCircumference = undefined;
        return;
      }

      if (
        antropometric.value.waistCircumference &&
        Number(antropometric.value.waistCircumference) > 0
      ) {
        const waistValue = Number(antropometric.value.waistCircumference);
        const waistStatus = getWaistStatus(waistValue, newGender as 'MALE' | 'FEMALE');
        antropometric.value.waistStatus = waistStatus?.status || 'Pendiente';
        antropometric.value.waistColor = (waistStatus?.color ?? undefined) as BadgeColor | undefined;
      }

      if (
        antropometric.value.hipCircumference &&
        Number(antropometric.value.hipCircumference) > 0
      ) {
        const hipValue = Number(antropometric.value.hipCircumference);
        const hipStatus = getHipStatus(hipValue, newGender as 'MALE' | 'FEMALE');
        antropometric.value.hipStatus = hipStatus?.status || 'Pendiente';
        antropometric.value.hipColor = (hipStatus?.color ?? undefined) as BadgeColor | undefined;
      }
    },
  );
}
