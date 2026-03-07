<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 flex justify-center items-start py-10">
    <div class="w-full max-w-6xl px-4 md:px-0">
      <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 items-start">
        <div class="md:col-span-6 lg:col-span-7">
          <PatientFormCard
            :form-data="formData"
            :is-form-valid="isFormValid"
            @submit="handleSubmit"
            @clear="clearForm"
          />
        </div>
        <div class="md:col-span-6 lg:col-span-5">
          <ResultsCard
            :antropometric="antropometric"
            :signal-vital="signalVital"
            :is-downloading-pdf="isDownloadingResultadosPdf"
            @download-pdf="handleDownloadResultadosPdf"
          />
        </div>
        <div class="md:col-span-3 lg:col-span-3">
          <HealthyWeightCard
            :healthy-weight="healthyWeight"
            :basal-energy-expenditure="basalEnergyExpenditure"
            :hydration-requirement="hydrationRequirement"
            :eta-value="etaValue"
            :get-value="getValue"
            :physical-activity-level="physicalActivityLevel"
            :activity-select-enabled="activitySelectEnabled"
            @update:physical-activity-level="physicalActivityLevel = $event"
          />
        </div>
        <div class="md:col-span-3 lg:col-span-4">
          <AntropometryCard :form-data="formData" :antropometric="antropometric" />
        </div>
        <div class="md:col-span-6 lg:col-span-5">
          <VitalSignsCard
            :signal-vital="signalVital"
            :should-ask-glucose="shouldAskGlucose"
            :glucose-ate-recently="glucoseAteRecently"
            @validate-heart-rate="validateHeartRateInteger"
            @validate-respiratory-rate="validateRespiratoryRateInteger"
            @validate-oxygen-saturation="validateOxygenSaturationInteger"
            @set-glucose-answer="setGlucoseAnswer"
            @reset-glucose-answer="resetGlucoseAnswer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PatientFormCard from '@/components/diagnostics/PatientFormCard.vue';
import ResultsCard from '@/components/diagnostics/ResultsCard.vue';
import HealthyWeightCard from '@/components/diagnostics/HealthyWeightCard.vue';
import AntropometryCard from '@/components/diagnostics/AntropometryCard.vue';
import VitalSignsCard from '@/components/diagnostics/VitalSignsCard.vue';
import type { AntropometricData, SignalVital, ResultPatient } from '@/types';
import { PHYSICAL_ACTIVITY_OPTIONS } from '@/constants/diagnostics';
import { downloadDiagnosticoResultadosPdf } from '@/utils/pdf';
import { ref, computed, onMounted, watch } from 'vue';
import { useHealthIndicators } from '@/composables/useHealthIndicators';
import { useDiagnosticsForm } from '@/composables/useDiagnosticsForm';
import { useDiagnosticsCalculations } from '@/composables/useDiagnosticsCalculations';
import { useDiagnosticsWatchers } from '@/composables/useDiagnosticsWatchers';

const {
  calculateImc,
  getWaistStatus,
  getHipStatus,
  getWaistHipRatio,
  getWaistHeightRatio,
  getHeartRateStatus,
  getRespiratoryRateStatus,
  getOxygenSaturationStatus,
  getTemperatureStatus,
  getGlucoseStatus,
  getBloodPressureStatus,
} = useHealthIndicators();

const { formData, createDefaultFormData, isFormValid, clearFormData } = useDiagnosticsForm();

const results = ref<ResultPatient>({});
const antropometric = ref<AntropometricData>({});
const signalVital = ref<SignalVital>({});
const physicalActivityLevel = ref<number | null>(null);

const {
  healthyWeight,
  basalEnergyExpenditure,
  hydrationRequirement,
  etaValue,
  getValue,
  activitySelectEnabled,
} = useDiagnosticsCalculations(formData, antropometric, physicalActivityLevel);

useDiagnosticsWatchers(formData, antropometric, {
  getWaistStatus,
  getHipStatus,
  getWaistHeightRatio,
});

const isDark = ref(false);
const isDownloadingResultadosPdf = ref(false);
const glucoseAteRecently = ref<boolean | null>(null);

const shouldAskGlucose = computed(() => {
  const glucoseValue = Number(signalVital.value.glucose);
  return glucoseValue >= 100 && glucoseValue <= 125;
});

async function handleDownloadResultadosPdf() {
  isDownloadingResultadosPdf.value = true;
  try {
    const activityLabel =
      PHYSICAL_ACTIVITY_OPTIONS.find((o) => o.value === physicalActivityLevel.value)?.label ?? null;
    await downloadDiagnosticoResultadosPdf({
      patient: formData.value,
      antropometric: antropometric.value,
      signalVital: signalVital.value,
      healthyWeight: healthyWeight.value,
      basalEnergyExpenditure: basalEnergyExpenditure.value,
      hydrationRequirement: hydrationRequirement.value,
      totalEnergyExpenditure: {
        method: basalEnergyExpenditure.value.method,
        eta: etaValue.value,
        activityLabel,
        activityPercent: physicalActivityLevel.value,
        get: getValue.value,
      },
    });
  } finally {
    isDownloadingResultadosPdf.value = false;
  }
}

function handleSubmit() {
  const weight = formData.value.weight ?? 0;
  const height = formData.value.height ?? 0;
  const gender = formData.value.gender as 'MALE' | 'FEMALE';

  // Calcular IMC usando el composable
  const imcResult = calculateImc(weight, height);
  if (imcResult) {
    results.value.imc = imcResult.formatted;
    antropometric.value.imc = imcResult.formatted;
    antropometric.value.imcStatus = imcResult.status?.status || 'Pendiente';
    antropometric.value.imcColor = imcResult.status?.color ?? undefined;
  }

  // Calcular índice cintura-cadera
  const waist = Number(antropometric.value.waistCircumference) || 0;
  const hip = Number(antropometric.value.hipCircumference) || 0;
  if (waist > 0 && hip > 0 && gender) {
    const iccResult = getWaistHipRatio(waist, hip, gender);
    if (iccResult) {
      antropometric.value.hipStatus = iccResult.status?.status || 'Pendiente';
      antropometric.value.hipColor = iccResult.status?.color ?? undefined;
    }
  }
}

// Función para validar que heartRate sea entero
function validateHeartRateInteger(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  // Permitir solo números enteros, eliminar decimales
  if (value.includes('.') || value.includes(',')) {
    signalVital.value.heartRate = Math.floor(Number(value));
  }
}

// Función para validar que respiratoryRate sea entero
function validateRespiratoryRateInteger(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  // Permitir solo números enteros, eliminar decimales
  if (value.includes('.') || value.includes(',')) {
    signalVital.value.respiratoryRate = Math.floor(Number(value));
  }
}

// Función para validar que oxygenSaturation sea entero
function validateOxygenSaturationInteger(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  // Permitir solo números enteros, eliminar decimales
  if (value.includes('.') || value.includes(',')) {
    signalVital.value.oxygenSaturation = Math.floor(Number(value));
  }
}

function updateGlucoseStatus() {
  const glucoseValue = Number(signalVital.value.glucose);
  if (!glucoseValue || glucoseValue <= 0) {
    signalVital.value.glucoseStatus = 'Pendiente';
    signalVital.value.glucoseColor = undefined;
    signalVital.value.glucoseAlert = undefined;
    signalVital.value.glucoseAlertColor = undefined;
    return;
  }

  const glucoseStatus = getGlucoseStatus(glucoseValue, glucoseAteRecently.value);
  signalVital.value.glucoseStatus = glucoseStatus?.status || 'Pendiente';
  signalVital.value.glucoseColor = glucoseStatus?.color ?? undefined;
  signalVital.value.glucoseAlert = glucoseStatus?.alert;
  signalVital.value.glucoseAlertColor = glucoseStatus?.color;
}

function setGlucoseAnswer(value: boolean) {
  glucoseAteRecently.value = value;
  updateGlucoseStatus();
}

function resetGlucoseAnswer() {
  glucoseAteRecently.value = null;
  updateGlucoseStatus();
}

// Watcher para calcular el estado de frecuencia cardíaca en tiempo real
watch(
  () => signalVital.value.heartRate,
  (newHeartRate) => {
    if (!newHeartRate || newHeartRate === '' || Number(newHeartRate) <= 0) {
      signalVital.value.heartRateStatus = 'Pendiente';
      signalVital.value.heartRateColor = undefined;
    } else {
      const heartRateValue = Math.floor(Number(newHeartRate)); // Asegurar que sea entero
      const heartRateStatus = getHeartRateStatus(heartRateValue);
      signalVital.value.heartRateStatus = heartRateStatus?.status || 'Pendiente';
      signalVital.value.heartRateColor = heartRateStatus?.color ?? undefined;
    }
  },
);

// Watcher para calcular el estado de frecuencia respiratoria en tiempo real
watch(
  () => signalVital.value.respiratoryRate,
  (newRespiratoryRate) => {
    if (!newRespiratoryRate || newRespiratoryRate === '' || Number(newRespiratoryRate) <= 0) {
      signalVital.value.respiratoryRateStatus = 'Pendiente';
      signalVital.value.respiratoryRateColor = undefined;
    } else {
      const respiratoryRateValue = Math.floor(Number(newRespiratoryRate)); // Asegurar que sea entero
      const respiratoryRateStatus = getRespiratoryRateStatus(respiratoryRateValue);
      signalVital.value.respiratoryRateStatus = respiratoryRateStatus?.status || 'Pendiente';
      signalVital.value.respiratoryRateColor = respiratoryRateStatus?.color ?? undefined;
    }
  },
);

// Watcher para calcular el estado de temperatura en tiempo real
watch(
  () => signalVital.value.temperature,
  (newTemperature) => {
    if (!newTemperature || newTemperature === '' || Number(newTemperature) <= 0) {
      signalVital.value.temperatureStatus = 'Pendiente';
      signalVital.value.temperatureColor = undefined;
      signalVital.value.temperatureAlert = undefined;
      signalVital.value.temperatureAlertColor = undefined;
    } else {
      const temperatureValue = Number(newTemperature);
      const temperatureStatus = getTemperatureStatus(temperatureValue);
      signalVital.value.temperatureStatus = temperatureStatus?.status || 'Pendiente';
      signalVital.value.temperatureColor = temperatureStatus?.color ?? undefined;
      signalVital.value.temperatureAlert = temperatureStatus?.alert;
      signalVital.value.temperatureAlertColor = temperatureStatus?.color;
    }
  },
);

// Watcher para calcular el estado de saturación de oxígeno en tiempo real
watch(
  () => signalVital.value.oxygenSaturation,
  (newOxygenSaturation) => {
    if (!newOxygenSaturation || newOxygenSaturation === '' || Number(newOxygenSaturation) <= 0) {
      signalVital.value.oxygenSaturationStatus = 'Pendiente';
      signalVital.value.oxygenSaturationColor = undefined;
      signalVital.value.oxygenSaturationAlert = undefined;
      signalVital.value.oxygenSaturationAlertColor = undefined;
    } else {
      const oxygenSaturationValue = Math.floor(Number(newOxygenSaturation)); // Asegurar que sea entero
      const oxygenSaturationStatus = getOxygenSaturationStatus(oxygenSaturationValue);
      signalVital.value.oxygenSaturationStatus = oxygenSaturationStatus?.status || 'Pendiente';
      signalVital.value.oxygenSaturationColor = oxygenSaturationStatus?.color ?? undefined;
      signalVital.value.oxygenSaturationAlert = oxygenSaturationStatus?.alert;
      signalVital.value.oxygenSaturationAlertColor = oxygenSaturationStatus?.color;
    }
  },
);

// Watcher para calcular el estado de glucosa en tiempo real
watch([() => signalVital.value.glucose, () => glucoseAteRecently.value], () => {
  if (!shouldAskGlucose.value) {
    glucoseAteRecently.value = null;
  }
  updateGlucoseStatus();
});

// Watcher para calcular el estado de presión arterial (sistólica y diastólica)
watch(
  [() => signalVital.value.systolic, () => signalVital.value.diastolic],
  ([systolic, diastolic]) => {
    const s = Number(systolic);
    const d = Number(diastolic);
    if (
      !systolic ||
      systolic === '' ||
      !diastolic ||
      diastolic === '' ||
      Number.isNaN(s) ||
      Number.isNaN(d) ||
      s <= 0 ||
      d <= 0
    ) {
      signalVital.value.bloodPressureStatus = 'Pendiente';
      signalVital.value.bloodPressureColor = undefined;
      signalVital.value.bloodPressureComment = undefined;
      signalVital.value.bloodPressureCommentColor = undefined;
    } else {
      const bpStatus = getBloodPressureStatus(s, d);
      signalVital.value.bloodPressureStatus = bpStatus.status;
      signalVital.value.bloodPressureColor = bpStatus.color ?? undefined;
      signalVital.value.bloodPressureComment = bpStatus.alert;
      signalVital.value.bloodPressureCommentColor = bpStatus.color;
    }
  },
);

function clearForm() {
  clearFormData();
  results.value = {};
  antropometric.value = {};
  signalVital.value = {};
  physicalActivityLevel.value = null;
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});
</script>
