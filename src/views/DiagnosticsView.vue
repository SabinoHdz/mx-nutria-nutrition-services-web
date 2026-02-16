<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 flex justify-center items-start py-10">
    <div class="w-full max-w-6xl px-4 md:px-0">
      <!-- Grid Masonry: Organización optimizada de cards -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <!-- Card Datos del Paciente -->
        <div class="lg:col-span-7">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Datos del Paciente
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Sexo -->
                <VSelect
                  v-model="formData.gender"
                  label="Sexo"
                  :options="genderOptions"
                  placeholder="Seleccionar..."
                  label-tooltip="Sexo biológico del paciente"
                  label-tooltip-placement="top"
                  clearable
                  required
                />
                <!-- Edad -->

                <VInput
                  v-model="formData.age"
                  type="number"
                  label="Edad"
                  suffix="años"
                  placeholder="Ej: 25"
                  :min="1"
                  :max="99"
                  :maxlength="2"
                  label-tooltip="Edad del paciente en años completos"
                  label-tooltip-placement="top"
                  clearable
                  required
                />
                <!-- Peso actual -->
                <VInput
                  v-model="formData.weight"
                  type="decimal"
                  label="Peso actual"
                  suffix="kg"
                  placeholder="Ej: 70.5"
                  :min="1"
                  :max="300"
                  :integer-digits="3"
                  :decimal-places="2"
                  label-tooltip="Peso corporal del paciente en kilogramos"
                  label-tooltip-placement="top"
                  clearable
                  required
                />
                <!-- Talla -->
                <VInput
                  v-model="formData.height"
                  type="decimal"
                  label="Talla"
                  suffix="mts"
                  placeholder="Ej: 1.70"
                  :min="0.5"
                  :max="2.5"
                  :decimal-places="2"
                  :integer-digits="1"
                  label-tooltip="Altura del paciente en metros"
                  label-tooltip-placement="top"
                  required
                />
              </div>
              <!-- Botones -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <VButton
                  color="primary"
                  full-width
                  @click.prevent="handleSubmit"
                  :disabled="!isFormValid"
                >
                  Calcular
                </VButton>
                <VButton
                  variant="outline"
                  full-width
                  @click="clearForm"
                >
                  Limpiar
                </VButton>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Resultados -->
        <div class="lg:col-span-5">
          <VCard variant="elevated" shadow bordered>
            <VCardBody>
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Resultados
              </h2>
              <div class="overflow-x-auto">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th>Valor</th>
                      <th>Diagnóstico</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Antropometría -->
                    <tr>
                      <td>IMC</td>
                      <td>
                        {{ antropomentric.imc || '-' }}
                        <span v-if="antropomentric.imc" class="text-xs text-gray-500">kg/m²</span>
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :color="antropomentric.imcStatus === 'Normal' ? 'success' : antropomentric.imcStatus === 'Pendiente' ? 'ghost' : 'warning'"
                          :class="antropomentric.imcBadgeClass || ''"
                        >
                          {{ antropomentric.imcStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <tr>
                      <td>Cintura</td>
                      <td>
                        {{ antropomentric.waistCircumference || '-' }}
                        <span v-if="antropomentric.waistCircumference" class="text-xs text-gray-500"
                          >cm</span
                        >
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :class="antropomentric.waistBadgeClass || ''"
                        >
                          {{ antropomentric.waistStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <tr>
                      <td>Cadera</td>
                      <td>
                        {{ antropomentric.hipCircumference || '-' }}
                        <span v-if="antropomentric.hipCircumference" class="text-xs text-gray-500"
                          >cm</span
                        >
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :class="antropomentric.hipBadgeClass || ''"
                        >
                          {{ antropomentric.hipStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <!-- Signos Vitales -->
                    <tr>
                      <td>Frec. Cardíaca</td>
                      <td>
                        {{ signalVital.heartRate || '-' }}
                        <span v-if="signalVital.heartRate" class="text-xs text-gray-500">lpm</span>
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :class="signalVital.heartRateBadgeClass || ''"
                        >
                          {{ signalVital.heartRateStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <tr>
                      <td>Frec. Respiratoria</td>
                      <td>
                        {{ signalVital.respiratoryRate || '-' }}
                        <span v-if="signalVital.respiratoryRate" class="text-xs text-gray-500"
                          >x Min</span
                        >
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :class="signalVital.respiratoryRateBadgeClass || ''"
                        >
                          {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <tr>
                      <td>Temperatura</td>
                      <td>
                        {{ signalVital.temperature || '-' }}
                        <span v-if="signalVital.temperature" class="text-xs text-gray-500">°C</span>
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :class="signalVital.temperatureBadgeClass || ''"
                        >
                          {{ signalVital.temperatureStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <tr>
                      <td>Sat. Oxígeno</td>
                      <td>
                        {{ signalVital.oxygenSaturation || '-' }}
                        <span v-if="signalVital.oxygenSaturation" class="text-xs text-gray-500"
                          >%</span
                        >
                      </td>
                      <td>
                        <VBadge
                          size="sm"
                          :class="signalVital.oxygenSaturationBadgeClass || ''"
                        >
                          {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
                        </VBadge>
                      </td>
                    </tr>
                    <!-- Pendientes -->
                    <tr class="opacity-50">
                      <td>Presión arterial</td>
                      <td>-</td>
                      <td><VBadge size="sm" color="secondary" variant="soft">Próximamente</VBadge></td>
                    </tr>
                    <tr class="opacity-50">
                      <td>Glucosa</td>
                      <td>-</td>
                      <td><VBadge size="sm" color="secondary" variant="soft">Próximamente</VBadge></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Peso Saludable -->
        <div class="lg:col-span-3">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Peso Saludable
              </h2>
              <div class="space-y-3">
                <!-- Peso máximo -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Peso máximo</span>
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ healthyWeight.max || '-' }}
                    </span>
                    <span class="text-sm text-gray-500">Kg</span>
                  </div>
                </div>
                <!-- Peso mínimo -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Peso mínimo</span>
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ healthyWeight.min || '-' }}
                    </span>
                    <span class="text-sm text-gray-500">Kg</span>
                  </div>
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Antropometría -->
        <div class="lg:col-span-4">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Antropometría
              </h2>
              <div class="space-y-3">
                <!-- IMC con unidades y estado -->
                <div class="flex items-center gap-2">
                  <span class="text-sm w-20">IMC</span>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-28"
                    v-model="antropomentric.imc"
                    placeholder="0.00"
                    disabled
                  />
                  <span
                    class="text-xs px-2 py-1 bg-base-200 rounded border border-gray-300 whitespace-nowrap"
                  >
                    kg/m²
                  </span>
                  <VBadge
                    size="sm"
                    class="whitespace-nowrap"
                    :class="antropomentric.imcBadgeClass || ''"
                  >
                    {{ antropomentric.imcStatus || 'Pendiente' }}
                  </VBadge>
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
                  <VBadge
                    size="sm"
                    class="whitespace-nowrap"
                    :class="antropomentric.waistBadgeClass || ''"
                  >
                    {{ antropomentric.waistStatus || 'Pendiente' }}
                  </VBadge>
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
                  <VBadge
                    size="sm"
                    class="whitespace-nowrap"
                    :class="antropomentric.hipBadgeClass || ''"
                  >
                    {{ antropomentric.hipStatus || 'Pendiente' }}
                  </VBadge>
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Signos Vitales -->
        <div class="lg:col-span-4">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Signos Vitales
              </h2>
              <div class="space-y-3">
                <!-- Presión arterial (No implementado) -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm">Presión arterial</span>
                    <VBadge size="xs" color="secondary" variant="soft">Próximamente</VBadge>
                  </div>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full md:w-48"
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
                  <VBadge
                    size="sm"
                    class="whitespace-nowrap"
                    :class="signalVital.heartRateBadgeClass || ''"
                  >
                    {{ signalVital.heartRateStatus || 'Pendiente' }}
                  </VBadge>
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
                  <VBadge
                    size="sm"
                    class="whitespace-nowrap"
                    :class="signalVital.respiratoryRateBadgeClass || ''"
                  >
                    {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
                  </VBadge>
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
                    <VBadge
                      size="sm"
                      class="whitespace-nowrap"
                      :class="signalVital.temperatureBadgeClass || ''"
                    >
                      {{ signalVital.temperatureStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                  <!-- Alerta de fiebre -->
                  <VAlert
                    v-if="signalVital.temperatureAlert"
                    :color="signalVital.temperatureStatus === 'Fiebre Muy Alta' ? 'error' : 'warning'"
                    size="sm"
                    icon
                    class="py-2 px-3"
                  >
                    {{ signalVital.temperatureAlert }}
                  </VAlert>
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
                    <VBadge
                      size="sm"
                      class="whitespace-nowrap"
                      :class="signalVital.oxygenSaturationBadgeClass || ''"
                    >
                      {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                  <!-- Alerta de emergencia médica -->
                  <VAlert
                    v-if="signalVital.oxygenSaturationAlert"
                    color="error"
                    size="sm"
                    icon
                    class="py-2 px-3"
                  >
                    {{ signalVital.oxygenSaturationAlert }}
                  </VAlert>
                </div>

                <!-- Glucosa (No implementado) -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span class="text-sm">Glucosa</span>
                    <VBadge size="xs" color="secondary" variant="soft">Próximamente</VBadge>
                  </div>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full md:w-48"
                    v-model="signalVital.glucose"
                    placeholder="En desarrollo..."
                    disabled
                  />
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircumferenceInput from '@/components/CircumferenceInput.vue';
import { VCard, VCardBody } from '@/components/ui/card';
import { VButton } from '@/components/ui/button';
import { VSelect } from '@/components/ui/select';
import { VBadge } from '@/components/ui/badge';
import { VAlert } from '@/components/ui/alert';
import { VInput } from '@/components/ui/input';
import type { AntropometricData, SignalVital, Patient, ResultPatient } from '@/types';
import type { ValueLabel } from '@/types/Common';
import { ref, computed, onMounted, watch } from 'vue';
import { useHealthIndicators } from '@/composables/useHealthIndicators';

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
