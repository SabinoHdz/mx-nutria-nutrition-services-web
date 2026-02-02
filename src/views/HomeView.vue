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
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Presión arterial</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.bloodPressure"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Frecuencia cardíaca</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.heartRate"
                  />
                </div>

                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Frecuencia respiratoria</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.respiratoryRate"
                  />
                </div>

                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Temperatura</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.temperature"
                  />
                </div>

                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Saturación de oxígeno</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.oxygenSaturation"
                  />
                </div>

                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Glucosa</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.glucose"
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
const { calculateImc, getWaistStatus, getHipStatus, getWaistHipRatio, getBadgeClass } =
  useHealthIndicators();

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
