<template>
  <VCard variant="elevated" shadow bordered>
    <VCardBody>
      <div class="flex justify-between items-center border-b border-base-300 pb-2">
        <h2 class="text-primary font-semibold text-lg">Resultados</h2>
        <VButton
          size="sm"
          color="primary"
          :disabled="isDownloadingPdf"
          @click="$emit('download-pdf')"
        >
          {{ isDownloadingPdf ? 'Generando…' : 'Descargar' }}
        </VButton>
      </div>
      <div
        class="max-h-[23rem] min-h-0 overflow-y-auto overflow-x-auto border border-base-300 rounded-lg"
      >
        <VTable size="sm" scrollable>
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Valor</th>
              <th>Diagnóstico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IMC</td>
              <td>
                {{ antropometric.imc || '-' }}
                <span v-if="antropometric.imc" class="text-xs text-gray-500 dark:text-gray-400"
                  >kg/m²</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    antropometric.imcStatus === 'Pendiente' || !antropometric.imcStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="antropometric.imcColor || 'primary'"
                >
                  {{ antropometric.imcStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr>
              <td>Cintura</td>
              <td>
                {{ antropometric.waistCircumference || '-' }}
                <span
                  v-if="antropometric.waistCircumference"
                  class="text-xs text-gray-500 dark:text-gray-400"
                  >cm</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    antropometric.waistStatus === 'Pendiente' || !antropometric.waistStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="antropometric.waistColor || 'primary'"
                >
                  {{ antropometric.waistStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr>
              <td>Cadera</td>
              <td>
                {{ antropometric.hipCircumference || '-' }}
                <span
                  v-if="antropometric.hipCircumference"
                  class="text-xs text-gray-500 dark:text-gray-400"
                  >cm</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    antropometric.hipStatus === 'Pendiente' || !antropometric.hipStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="antropometric.hipColor || 'primary'"
                >
                  {{ antropometric.hipStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr>
              <td>Frec. Cardíaca</td>
              <td>
                {{ signalVital.heartRate || '-' }}
                <span v-if="signalVital.heartRate" class="text-xs text-gray-500 dark:text-gray-400"
                  >lpm</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    signalVital.heartRateStatus === 'Pendiente' || !signalVital.heartRateStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="signalVital.heartRateColor || 'primary'"
                >
                  {{ signalVital.heartRateStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr>
              <td>Frec. Respiratoria</td>
              <td>
                {{ signalVital.respiratoryRate || '-' }}
                <span
                  v-if="signalVital.respiratoryRate"
                  class="text-xs text-gray-500 dark:text-gray-400"
                  >x Min</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    signalVital.respiratoryRateStatus === 'Pendiente' ||
                    !signalVital.respiratoryRateStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="signalVital.respiratoryRateColor || 'primary'"
                >
                  {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr>
              <td>Temperatura</td>
              <td>
                {{ signalVital.temperature || '-' }}
                <span
                  v-if="signalVital.temperature"
                  class="text-xs text-gray-500 dark:text-gray-400"
                  >°C</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    signalVital.temperatureStatus === 'Pendiente' || !signalVital.temperatureStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="signalVital.temperatureColor || 'primary'"
                >
                  {{ signalVital.temperatureStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr v-if="signalVital.temperatureAlert">
              <td colspan="3">
                <VAlert
                  :color="signalVital.temperatureAlertColor || 'warning'"
                  variant="soft"
                  size="sm"
                >
                  {{ signalVital.temperatureAlert }}
                </VAlert>
              </td>
            </tr>
            <tr>
              <td>Sat. Oxígeno</td>
              <td>
                {{ signalVital.oxygenSaturation || '-' }}
                <span
                  v-if="signalVital.oxygenSaturation"
                  class="text-xs text-gray-500 dark:text-gray-400"
                  >%</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    signalVital.oxygenSaturationStatus === 'Pendiente' ||
                    !signalVital.oxygenSaturationStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="signalVital.oxygenSaturationColor || 'primary'"
                >
                  {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr v-if="signalVital.oxygenSaturationAlert">
              <td colspan="3">
                <VAlert
                  :color="signalVital.oxygenSaturationAlertColor || 'error'"
                  variant="soft"
                  size="sm"
                >
                  {{ signalVital.oxygenSaturationAlert }}
                </VAlert>
              </td>
            </tr>
            <tr>
              <td>Presión arterial</td>
              <td>
                {{ signalVital.systolic ?? '-' }}/{{ signalVital.diastolic ?? '-' }}
                <span
                  v-if="signalVital.systolic != null && signalVital.diastolic != null"
                  class="text-xs text-gray-500 dark:text-gray-400"
                  >mmHg</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    signalVital.bloodPressureStatus === 'Pendiente' ||
                    !signalVital.bloodPressureStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="signalVital.bloodPressureColor || 'primary'"
                >
                  {{ signalVital.bloodPressureStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr v-if="signalVital.bloodPressureComment">
              <td colspan="3">
                <VAlert
                  :color="signalVital.bloodPressureCommentColor || 'warning'"
                  variant="soft"
                  size="sm"
                >
                  {{ signalVital.bloodPressureComment }}
                </VAlert>
              </td>
            </tr>
            <tr>
              <td>Glucosa</td>
              <td>
                {{ signalVital.glucose || '-' }}
                <span v-if="signalVital.glucose" class="text-xs text-gray-500 dark:text-gray-400"
                  >mg/dl</span
                >
              </td>
              <td>
                <VBadge
                  size="sm"
                  :variant="
                    signalVital.glucoseStatus === 'Pendiente' || !signalVital.glucoseStatus
                      ? 'ghost'
                      : 'solid'
                  "
                  :color="signalVital.glucoseColor || 'primary'"
                >
                  {{ signalVital.glucoseStatus || 'Pendiente' }}
                </VBadge>
              </td>
            </tr>
            <tr v-if="signalVital.glucoseAlert">
              <td colspan="3">
                <VAlert
                  :color="signalVital.glucoseAlertColor || 'warning'"
                  variant="soft"
                  size="sm"
                >
                  {{ signalVital.glucoseAlert }}
                </VAlert>
              </td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardBody>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VButton } from '@/components/ui/button';
import { VBadge } from '@/components/ui/badge';
import { VAlert } from '@/components/ui/alert';
import { VTable } from '@/components/ui/table';
import type { AntropometricData, SignalVital } from '@/types';

defineProps<{
  antropometric: AntropometricData;
  signalVital: SignalVital;
  isDownloadingPdf: boolean;
}>();

defineEmits<{
  'download-pdf': [];
}>();
</script>
