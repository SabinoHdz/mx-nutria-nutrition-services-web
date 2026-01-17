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
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>IMC</td>
                      <td>{{ results.imc }}</td>
                      <td><span class="badge badge-warning">Sobrepeso</span></td>
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
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">IMC</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="antropomentric.imc"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Pliegue Cutáneo</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="antropomentric.skinFold"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Perímetro Cintura</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="antropomentric.waistCircumference"
                  />
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
                  <span class="text-sm">Frecuencia Cardíaca</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.heartRate"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Presión Arterial</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.bloodPressure"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Saturación de Oxígeno</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                    v-model="signalVital.oxygenSaturation"
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
import { ref, computed, onMounted } from 'vue';

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
  // Ejemplo: llenar los datos al hacer clic
  results.value = {
    imc: 26.7,
    healthyWeight: '45 – 60 kg',
    glucoseLevel: '90',
    bloodPressure: '130 / 85 mmHg',
    cholesterolLevel: 210,
  };
  antropomentric.value = {
    imc: 26.7,
    skinFold: 12,
    waistCircumference: 80,
  };
  signalVital.value = {
    heartRate: 72,
    bloodPressure: '130/85',
    oxygenSaturation: 98,
  };
}

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
