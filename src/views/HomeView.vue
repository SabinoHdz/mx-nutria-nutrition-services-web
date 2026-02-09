<template>
  <div class="min-h-screen bg-base-200 flex justify-center items-start py-10">
    <div class="w-full max-w-6xl px-4 md:px-0 space-y-6">
      <!-- FILA 1: Datos del Paciente + Resultados -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Card Datos del Paciente -->
        <div class="lg:col-span-7">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Datos del Paciente
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Sexo -->
                <BaseSelect
                  label="Sexo"
                  :options="genderOptions"
                  required
                  @clean="formData.gender = null"
                  v-model="formData.gender"
                />
                <!-- Edad -->

                <AgeInput
                  v-model="formData.age"
                  label="Edad"
                  :max-length="2"
                  required
                  @clean="formData.age = null"
                />
                <!-- Peso actual -->
                <WeightInput
                  label="Peso actual"
                  decimal-limit="3,2"
                  v-model="formData.weight"
                  @clean="formData.weight = null"
                  required
                />
                <!-- Talla -->
                <HeightInput
                  label="Talla"
                  required
                  v-model="formData.height"
                  @clean="formData.height = null"
                />
              </div>
              <button
                class="btn btn-primary w-full mt-2 normal-case"
                @click.prevent="handleSubmit"
                :disabled="!isFormValid"
              >
                Calcular
              </button>
              <button class="btn btn-outline w-full mt-2" @click="clearForm">Limpiar</button>
            </div>
          </div>
        </div>
        <!-- Card Resultados -->
        <div class="lg:col-span-5">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Resultados
              </h2>
              <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th>Valor</th>
                      <th>Diagnostico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>IMC</td>
                      <td>{{ results.imc }}</td>
                      <td>
                        <span class="badge" :class="antropomentric.imcBadgeClass || 'badge-ghost'">
                          {{ antropomentric.imcStatus || 'Pendiente' }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Peso saludable</td>
                      <td>{{ results.healthyWeight }}</td>
                      <td><span class="badge badge-success">En rango</span></td>
                    </tr>
                    <tr>
                      <td>Glucosa</td>
                      <td>{{ results.glucoseLevel }}</td>
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>Presión arterial</td>
                      <td>{{ results.bloodPressure }}</td>
                      <td><span class="badge badge-warning">Elevada</span></td>
                    </tr>
                    <tr>
                      <td>Colesterol</td>
                      <td>{{ results.cholesterolLevel }}</td>
                      <td><span class="badge badge-error">Alto</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FILA 2: Antropometría + Signos Vitales -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Antropometría -->
        <div class="lg:col-span-5">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Antropometría
              </h2>
              <div class="space-y-3">
                <!-- IMC con unidades y estado -->
                <div class="flex items-center gap-2">
                  <span class="text-sm w-20">IMC</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-28 bg-base-100"
                    v-model="antropomentric.imc"
                    placeholder="0.00"
                    disabled
                  />
                  <span
                    class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                  >
                    kg/m²
                  </span>
                  <span
                    class="badge badge-sm whitespace-nowrap"
                    :class="antropomentric.imcBadgeClass || 'badge-ghost'"
                  >
                    {{ antropomentric.imcStatus || 'Pendiente' }}
                  </span>
                </div>

                <!-- Circunferencia de cintura -->
                <div class="flex items-center gap-2">
                  <span class="text-sm w-20">Cintura</span>
                  <CircumferenceInput
                    class="w-28"
                    :disabled="!formData.gender"
                    v-model="antropomentric.waistCircumference"
                    :max-value="600"
                    :placeholder="!!formData.gender ? 'Ej: 64' : ''"
                    field-name="Circunferencia de cintura"
                  />
                  <span
                    class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                  >
                    cm
                  </span>
                  <span
                    class="badge badge-sm whitespace-nowrap"
                    :class="antropomentric.waistBadgeClass || 'badge-ghost'"
                  >
                    {{ antropomentric.waistStatus || 'Pendiente' }}
                  </span>
                </div>

                <!-- Circunferencia de cadera -->
                <div class="flex items-center gap-2">
                  <span class="text-sm w-20">Cadera</span>
                  <CircumferenceInput
                    class="w-28"
                    :disabled="!formData.gender"
                    v-model="antropomentric.hipCircumference"
                    :max-value="600"
                    :placeholder="!!formData.gender ? 'Ej: 75' : ''"
                    field-name="Circunferencia de cadera"
                    unit="cm"
                  />
                  <span
                    class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                  >
                    cm
                  </span>
                  <span
                    class="badge badge-sm whitespace-nowrap"
                    :class="antropomentric.hipBadgeClass || 'badge-ghost'"
                  >
                    {{ antropomentric.hipStatus || 'Pendiente' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Signos Vitales debajo de Antropometría -->
        <div class="lg:col-span-5 lg:col-start-1 mt-4">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Signos Vitales
              </h2>
              <div class="space-y-3">
                <!-- Presión arterial (No implementado) -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm">Presión arterial</span>
                    <span class="badge badge-ghost badge-xs">Próximamente</span>
                  </div>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-200"
                    v-model="signalVital.bloodPressure"
                    placeholder="En desarrollo..."
                    disabled
                  />
                </div>

                <!-- Frecuencia cardíaca con unidades y estado -->
                <div class="flex items-center gap-2">
                  <span class="text-sm w-20">Frecuencia cardíaca</span>
                  <CircumferenceInput
                    class="w-28"
                    v-model="signalVital.heartRate"
                    decimalLimit="3"
                    :max-value="500"
                    :placeholder="!signalVital.heartRate ? 'Ej: 75' : ''"
                    @input="validateHeartRateInteger"
                    field-name="Frecuencia cardíaca"
                    unit="Pul/min"
                  />
                  <span
                    class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                  >
                    Pul/min
                  </span>
                  <span
                    class="badge badge-sm whitespace-nowrap"
                    :class="signalVital.heartRateBadgeClass || 'badge-ghost'"
                  >
                    {{ signalVital.heartRateStatus || 'Pendiente' }}
                  </span>
                </div>

                <!-- Frecuencia respiratoria con unidades y estado -->
                <div class="flex items-center gap-2">
                  <span class="text-sm w-20">Frecuencia respiratoria</span>

                  <CircumferenceInput
                    class="w-28"
                    v-model="signalVital.respiratoryRate"
                    decimalLimit="2"
                    :max-value="100"
                    :placeholder="!signalVital.respiratoryRate ? 'Ej: 15' : ''"
                    @input="validateRespiratoryRateInteger"
                    field-name="Frecuencia respiratoria"
                    unit="x Min"
                  />
                  <span
                    class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                  >
                  x Min
                  </span>
                  <span
                    class="badge badge-sm whitespace-nowrap"
                    :class="signalVital.respiratoryRateBadgeClass || 'badge-ghost'"
                  >
                    {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
                  </span>
                </div>

                <!-- Temperatura con unidades y estado -->
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm w-20">Temperatura</span>

                    <CircumferenceInput
                      class="w-28"
                      v-model="signalVital.temperature"
                      :max-value="100"
                      decimalLimit="2,1"
                      :placeholder="!signalVital.temperature ? 'Ej: 20.6' : ''"
                      @input="validateHeartRateInteger"
                      field-name="Temperatura"
                      unit="°C"
                    />
                    <span
                      class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                    >
                      °C
                    </span>
                    <span
                      class="badge badge-sm whitespace-nowrap"
                      :class="signalVital.temperatureBadgeClass || 'badge-ghost'"
                    >
                      {{ signalVital.temperatureStatus || 'Pendiente' }}
                    </span>
                  </div>
                  <!-- Alerta de fiebre -->
                  <div
                    v-if="signalVital.temperatureAlert"
                    :class="[
                      'alert py-2 px-3 text-sm',
                      signalVital.temperatureStatus === 'Fiebre Muy Alta'
                        ? 'alert-error'
                        : 'alert-warning',
                    ]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="stroke-current shrink-0 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{{ signalVital.temperatureAlert }}</span>
                  </div>
                </div>

                <!-- Saturación de oxígeno con unidades y estado -->
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm w-20">Saturación de oxígeno</span>
                    <CircumferenceInput
                      class="w-28"
                      v-model="signalVital.oxygenSaturation"
                      decimalLimit="3"
                      :max-value="100"
                      :placeholder="!signalVital.oxygenSaturation ? 'Ej: 75' : ''"
                      @input="validateOxygenSaturationInteger"
                       field-name="Saturación de oxígeno"
                    unit="%"
                    />
                    <span
                      class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                    >
                      %
                    </span>
                    <span
                      class="badge badge-sm whitespace-nowrap"
                      :class="signalVital.oxygenSaturationBadgeClass || 'badge-ghost'"
                    >
                      {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
                    </span>
                  </div>
                  <!-- Alerta de emergencia médica -->
                  <div
                    v-if="signalVital.oxygenSaturationAlert"
                    class="alert alert-error py-2 px-3 text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="stroke-current shrink-0 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>{{ signalVital.oxygenSaturationAlert }}</span>
                  </div>
                </div>

                <!-- Glucosa (No implementado) -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm">Glucosa</span>
                    <span class="badge badge-ghost badge-xs">Próximamente</span>
                  </div>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-200"
                    v-model="signalVital.glucose"
                    placeholder="En desarrollo..."
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AgeInput from '@/components/AgeInput.vue';
import HeightInput from '@/components/HeightInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
import WeightInput from '@/components/WeightInput.vue';
import type { AntropometricData, SignalVital, Patient, ResultPatient } from '@/types';
import type { ValueLabel } from '@/types/Common';
import { ref, computed, onMounted, watch } from 'vue';
import { useHealthIndicators } from '@/composables/useHealthIndicators';
import CircumferenceInput from '@/components/CircumferenceInput.vue';

// Composable de indicadores de salud
const {
  calculateImc,
  getWaistStatus,
  getHipStatus,
  getWaistHipRatio,
  getHeartRateStatus,
  getRespiratoryRateStatus,
  getOxygenSaturationStatus,
  getTemperatureStatus,
  getBadgeClass,
} = useHealthIndicators();

const results = ref<ResultPatient>({});
const antropomentric = ref<AntropometricData>({});
const signalVital = ref<SignalVital>({});
const genderOptions: ValueLabel[] = [
  {
    value: 'MALE',
    label: 'Masculino',
  },
  {
    value: 'FEMALE',
    label: 'Femenino',
  },
];

const isDark = ref(false);
const createDefaultFormData = (): Patient => {
  return {
    age: null,
    height: null,
    weight: null,
    gender: null,
  };
};
const formData = ref<Patient>(createDefaultFormData());

const isFormValid = computed(() => {
  return (Object.keys(formData.value) as Array<keyof Patient>).every(
    (field) => !!formData.value[field],
  );
});

function handleSubmit() {
  const weight = formData.value.weight ?? 0;
  const height = formData.value.height ?? 0;
  const gender = formData.value.gender as 'MALE' | 'FEMALE';

  // Calcular IMC usando el composable
  const imcResult = calculateImc(weight, height);
  if (imcResult) {
    results.value.imc = imcResult.formatted;
    antropomentric.value.imc = imcResult.formatted;
    antropomentric.value.imcStatus = imcResult.status?.status || 'Pendiente';
    antropomentric.value.imcBadgeClass = getBadgeClass(imcResult.status?.color);
  }

  // Calcular índice cintura-cadera
  const waist = Number(antropomentric.value.waistCircumference) || 0;
  const hip = Number(antropomentric.value.hipCircumference) || 0;
  if (waist > 0 && hip > 0 && gender) {
    const iccResult = getWaistHipRatio(waist, hip, gender);
    if (iccResult) {
      antropomentric.value.hipStatus = iccResult.status?.status || 'Pendiente';
      antropomentric.value.hipBadgeClass = getBadgeClass(iccResult.status?.color);
    }
  }
}

// Watcher para calcular el estado de cintura en tiempo real
watch(
  () => antropomentric.value.waistCircumference,
  (newWaist) => {
    if (!newWaist || newWaist === '' || Number(newWaist) <= 0) {
      antropomentric.value.waistStatus = 'Pendiente';
      antropomentric.value.waistBadgeClass = 'badge-ghost';
    } else {
      const waistValue = Number(newWaist);
      const gender = formData.value.gender as 'MALE' | 'FEMALE';

      if (gender) {
        const waistStatus = getWaistStatus(waistValue, gender);
        antropomentric.value.waistStatus = waistStatus?.status || 'Pendiente';
        antropomentric.value.waistBadgeClass = getBadgeClass(waistStatus?.color);
      }
    }
  },
);

// Watcher para calcular el estado de cadera en tiempo real
watch(
  () => antropomentric.value.hipCircumference,
  (newHip) => {
    if (!newHip || newHip === '' || Number(newHip) <= 0) {
      antropomentric.value.hipStatus = 'Pendiente';
      antropomentric.value.hipBadgeClass = 'badge-ghost';
    } else {
      const hipValue = Number(newHip);
      const gender = formData.value.gender as 'MALE' | 'FEMALE';

      if (gender) {
        const hipStatus = getHipStatus(hipValue, gender);
        antropomentric.value.hipStatus = hipStatus?.status || 'Pendiente';
        antropomentric.value.hipBadgeClass = getBadgeClass(hipStatus?.color);
      }
    }
  },
);

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

// Watcher para calcular el estado de frecuencia cardíaca en tiempo real
watch(
  () => signalVital.value.heartRate,
  (newHeartRate) => {
    if (!newHeartRate || newHeartRate === '' || Number(newHeartRate) <= 0) {
      signalVital.value.heartRateStatus = 'Pendiente';
      signalVital.value.heartRateBadgeClass = 'badge-ghost';
    } else {
      const heartRateValue = Math.floor(Number(newHeartRate)); // Asegurar que sea entero
      const heartRateStatus = getHeartRateStatus(heartRateValue);
      signalVital.value.heartRateStatus = heartRateStatus?.status || 'Pendiente';
      signalVital.value.heartRateBadgeClass = getBadgeClass(heartRateStatus?.color);
    }
  },
);

// Watcher para calcular el estado de frecuencia respiratoria en tiempo real
watch(
  () => signalVital.value.respiratoryRate,
  (newRespiratoryRate) => {
    if (!newRespiratoryRate || newRespiratoryRate === '' || Number(newRespiratoryRate) <= 0) {
      signalVital.value.respiratoryRateStatus = 'Pendiente';
      signalVital.value.respiratoryRateBadgeClass = 'badge-ghost';
    } else {
      const respiratoryRateValue = Math.floor(Number(newRespiratoryRate)); // Asegurar que sea entero
      const respiratoryRateStatus = getRespiratoryRateStatus(respiratoryRateValue);
      signalVital.value.respiratoryRateStatus = respiratoryRateStatus?.status || 'Pendiente';
      signalVital.value.respiratoryRateBadgeClass = getBadgeClass(respiratoryRateStatus?.color);
    }
  },
);

// Watcher para calcular el estado de temperatura en tiempo real
watch(
  () => signalVital.value.temperature,
  (newTemperature) => {
    if (!newTemperature || newTemperature === '' || Number(newTemperature) <= 0) {
      signalVital.value.temperatureStatus = 'Pendiente';
      signalVital.value.temperatureBadgeClass = 'badge-ghost';
      signalVital.value.temperatureAlert = undefined;
    } else {
      const temperatureValue = Number(newTemperature);
      const temperatureStatus = getTemperatureStatus(temperatureValue);
      signalVital.value.temperatureStatus = temperatureStatus?.status || 'Pendiente';
      signalVital.value.temperatureBadgeClass = getBadgeClass(temperatureStatus?.color);
      signalVital.value.temperatureAlert = temperatureStatus?.alert;
    }
  },
);

// Watcher para calcular el estado de saturación de oxígeno en tiempo real
watch(
  () => signalVital.value.oxygenSaturation,
  (newOxygenSaturation) => {
    if (!newOxygenSaturation || newOxygenSaturation === '' || Number(newOxygenSaturation) <= 0) {
      signalVital.value.oxygenSaturationStatus = 'Pendiente';
      signalVital.value.oxygenSaturationBadgeClass = 'badge-ghost';
      signalVital.value.oxygenSaturationAlert = undefined;
    } else {
      const oxygenSaturationValue = Math.floor(Number(newOxygenSaturation)); // Asegurar que sea entero
      const oxygenSaturationStatus = getOxygenSaturationStatus(oxygenSaturationValue);
      signalVital.value.oxygenSaturationStatus = oxygenSaturationStatus?.status || 'Pendiente';
      signalVital.value.oxygenSaturationBadgeClass = getBadgeClass(oxygenSaturationStatus?.color);
      signalVital.value.oxygenSaturationAlert = oxygenSaturationStatus?.alert;
    }
  },
);

// Watcher para actualizar cintura y cadera cuando cambia el género
watch(
  () => formData.value.gender,
  (newGender) => {
    if (!newGender) {
      // Limpiar estado si no hay género
      antropomentric.value.waistStatus = 'Pendiente';
      antropomentric.value.waistBadgeClass = 'badge-ghost';
      antropomentric.value.hipStatus = 'Pendiente';
      antropomentric.value.hipBadgeClass = 'badge-ghost';
      antropomentric.value.waistCircumference = undefined;
      return;
    }

    // Calcular cintura si existe
    if (
      antropomentric.value.waistCircumference &&
      Number(antropomentric.value.waistCircumference) > 0
    ) {
      const waistValue = Number(antropomentric.value.waistCircumference);
      const waistStatus = getWaistStatus(waistValue, newGender as 'MALE' | 'FEMALE');
      antropomentric.value.waistStatus = waistStatus?.status || 'Pendiente';
      antropomentric.value.waistBadgeClass = getBadgeClass(waistStatus?.color);
    }

    // Calcular cadera si existe (con sus propios rangos)
    if (
      antropomentric.value.hipCircumference &&
      Number(antropomentric.value.hipCircumference) > 0
    ) {
      const hipValue = Number(antropomentric.value.hipCircumference);
      const hipStatus = getHipStatus(hipValue, newGender as 'MALE' | 'FEMALE');
      antropomentric.value.hipStatus = hipStatus?.status || 'Pendiente';
      antropomentric.value.hipBadgeClass = getBadgeClass(hipStatus?.color);
    }
  },
);

function clearForm() {
  formData.value = createDefaultFormData();
  results.value = {};
  antropomentric.value = {};
  signalVital.value = {};
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
}
</script>
