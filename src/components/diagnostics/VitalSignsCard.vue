<template>
  <VCard variant="elevated" shadow bordered>
    <VCardBody class="space-y-4">
      <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
        Signos Vitales
      </h2>
      <div class="space-y-3">
        <div class="space-y-2">
          <div
            class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
          >
            <span class="text-sm">Presión arterial</span>
            <div class="flex items-end gap-2 flex-wrap">
              <VInput
                label="Sis"
                type="number"
                size="sm"
                class="w-full min-w-[100px] max-w-[130px]"
                v-model="signalVital.systolic"
                :max="300"
                :min="1"
                :maxlength="3"
                placeholder="Ej: 120"
                suffix="mmHg"
              />
              <span class="text-gray-500 dark:text-gray-400 font-medium shrink-0 pb-1">/</span>
              <VInput
                label="Dia"
                type="number"
                size="sm"
                class="w-full min-w-[100px] max-w-[130px]"
                v-model="signalVital.diastolic"
                :max="200"
                :min="1"
                :maxlength="3"
                placeholder="Ej: 80"
                suffix="mmHg"
              />
            </div>
            <VBadge
              size="sm"
              :variant="
                signalVital.bloodPressureStatus === 'Pendiente' || !signalVital.bloodPressureStatus
                  ? 'ghost'
                  : 'solid'
              "
              :color="signalVital.bloodPressureColor || 'primary'"
              class="whitespace-nowrap"
            >
              {{ signalVital.bloodPressureStatus || 'Pendiente' }}
            </VBadge>
          </div>
          <VAlert
            v-if="signalVital.bloodPressureComment"
            :color="signalVital.bloodPressureCommentColor || 'warning'"
            variant="soft"
            size="sm"
          >
            {{ signalVital.bloodPressureComment }}
          </VAlert>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
        >
          <span class="text-sm">Frecuencia cardíaca</span>
          <VInput
            type="number"
            size="sm"
            class="w-full"
            v-model="signalVital.heartRate"
            :max="500"
            :min="0"
            :maxlength="3"
            :placeholder="'Ej: 75'"
            suffix="Pul/min"
            @input="$emit('validate-heart-rate', $event)"
          />
          <VBadge
            size="sm"
            :variant="
              signalVital.heartRateStatus === 'Pendiente' || !signalVital.heartRateStatus
                ? 'ghost'
                : 'solid'
            "
            :color="signalVital.heartRateColor || 'primary'"
            class="whitespace-nowrap"
          >
            {{ signalVital.heartRateStatus || 'Pendiente' }}
          </VBadge>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
        >
          <span class="text-sm">Frecuencia respiratoria</span>
          <VInput
            type="number"
            size="sm"
            class="w-full"
            v-model="signalVital.respiratoryRate"
            :max="100"
            :min="0"
            :maxlength="2"
            :placeholder="'Ej: 15'"
            suffix="x Min"
            @input="$emit('validate-respiratory-rate', $event)"
          />
          <VBadge
            size="sm"
            :variant="
              signalVital.respiratoryRateStatus === 'Pendiente' ||
              !signalVital.respiratoryRateStatus
                ? 'ghost'
                : 'solid'
            "
            :color="signalVital.respiratoryRateColor || 'primary'"
            class="whitespace-nowrap"
          >
            {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
          </VBadge>
        </div>

        <div class="space-y-2">
          <div
            class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
          >
            <span class="text-sm">Temperatura</span>
            <VInput
              type="decimal"
              size="sm"
              class="w-full"
              v-model="signalVital.temperature"
              :max="100"
              :min="0"
              :integer-digits="2"
              :decimal-places="1"
              :placeholder="'Ej: 20.6'"
              suffix="°C"
            />
            <VBadge
              size="sm"
              :variant="
                signalVital.temperatureStatus === 'Pendiente' || !signalVital.temperatureStatus
                  ? 'ghost'
                  : 'solid'
              "
              :color="signalVital.temperatureColor || 'primary'"
              class="whitespace-nowrap"
            >
              {{ signalVital.temperatureStatus || 'Pendiente' }}
            </VBadge>
          </div>
          <VAlert
            v-if="signalVital.temperatureAlert"
            :color="signalVital.temperatureAlertColor || 'warning'"
            variant="soft"
            size="sm"
          >
            {{ signalVital.temperatureAlert }}
          </VAlert>
        </div>

        <div class="space-y-2">
          <div
            class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
          >
            <span class="text-sm">Saturación de oxígeno</span>
            <VInput
              type="number"
              size="sm"
              class="w-full"
              v-model="signalVital.oxygenSaturation"
              :max="100"
              :min="0"
              :maxlength="2"
              :placeholder="'Ej: 75'"
              suffix="%"
              @input="$emit('validate-oxygen-saturation', $event)"
            />
            <VBadge
              size="sm"
              :variant="
                signalVital.oxygenSaturationStatus === 'Pendiente' ||
                !signalVital.oxygenSaturationStatus
                  ? 'ghost'
                  : 'solid'
              "
              :color="signalVital.oxygenSaturationColor || 'primary'"
              class="whitespace-nowrap"
            >
              {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
            </VBadge>
          </div>
          <VAlert
            v-if="signalVital.oxygenSaturationAlert"
            :color="signalVital.oxygenSaturationAlertColor || 'error'"
            variant="soft"
            size="sm"
          >
            {{ signalVital.oxygenSaturationAlert }}
          </VAlert>
        </div>

        <div class="space-y-2">
          <div
            class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
          >
            <span class="text-sm">Glucosa capilar</span>
            <VInput
              type="number"
              size="sm"
              class="w-full"
              v-model="signalVital.glucose"
              :max="500"
              :min="0"
              :maxlength="3"
              :placeholder="'Ej: 90'"
              suffix="mg/dl"
            />
            <VBadge
              size="sm"
              :variant="
                signalVital.glucoseStatus === 'Pendiente' || !signalVital.glucoseStatus
                  ? 'ghost'
                  : 'solid'
              "
              :color="signalVital.glucoseColor || 'primary'"
              class="whitespace-nowrap"
            >
              {{ signalVital.glucoseStatus || 'Pendiente' }}
            </VBadge>
          </div>

          <div v-if="shouldAskGlucose" class="rounded-md border border-base-300 p-2">
            <p class="text-xs text-gray-600 dark:text-gray-300">
              ¿Ha comido algún alimento el paciente durante las últimas dos horas?
            </p>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <VButton
                size="sm"
                :variant="glucoseAteRecently === true ? 'solid' : 'outline'"
                color="primary"
                @click="$emit('set-glucose-answer', true)"
              >
                SI
              </VButton>
              <VButton
                size="sm"
                :variant="glucoseAteRecently === false ? 'solid' : 'outline'"
                color="primary"
                @click="$emit('set-glucose-answer', false)"
              >
                NO
              </VButton>
              <VButton
                v-if="glucoseAteRecently !== null"
                size="sm"
                variant="outline"
                @click="$emit('reset-glucose-answer')"
              >
                Cambiar respuesta
              </VButton>
            </div>
          </div>

          <VAlert
            v-if="signalVital.glucoseAlert"
            :color="signalVital.glucoseAlertColor || 'warning'"
            variant="soft"
            size="sm"
          >
            {{ signalVital.glucoseAlert }}
          </VAlert>
        </div>
      </div>
    </VCardBody>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VButton } from '@/components/ui/button';
import { VBadge } from '@/components/ui/badge';
import { VAlert } from '@/components/ui/alert';
import { VInput } from '@/components/ui/input';
import type { SignalVital } from '@/types';

defineProps<{
  signalVital: SignalVital;
  shouldAskGlucose: boolean;
  glucoseAteRecently: boolean | null;
}>();

defineEmits<{
  'validate-heart-rate': [event: Event];
  'validate-respiratory-rate': [event: Event];
  'validate-oxygen-saturation': [event: Event];
  'set-glucose-answer': [value: boolean];
  'reset-glucose-answer': [];
}>();
</script>
