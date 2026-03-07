<template>
  <VCard variant="elevated" shadow bordered>
    <VCardBody class="space-y-4">
      <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
        Peso Saludable
      </h2>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Peso máximo</span>
          <div class="flex items-center gap-2">
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ healthyWeight.max || '-' }}
            </span>
            <span class="text-sm text-gray-500">Kg</span>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Peso mínimo</span>
          <div class="flex items-center gap-2">
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ healthyWeight.min || '-' }}
            </span>
            <span class="text-sm text-gray-500">Kg</span>
          </div>
        </div>

        <h3 class="text-primary font-semibold text-base border-b border-base-300 pb-1 pt-1">
          Gasto Energético Basal
        </h3>
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ basalEnergyExpenditure.method }}
            </span>
            <div class="flex items-center gap-2">
              <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{
                  basalEnergyExpenditure.value != null ? basalEnergyExpenditure.value : '—'
                }}
              </span>
              <span class="text-sm text-gray-500">Kcal/Día</span>
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Requerimiento hídrico
          </span>
          <div class="flex items-center gap-2">
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{
                hydrationRequirement.min != null && hydrationRequirement.max != null
                  ? `${hydrationRequirement.min} a ${hydrationRequirement.max}`
                  : '—'
              }}
            </span>
            <span v-if="hydrationRequirement.min != null" class="text-sm text-gray-500"> L </span>
          </div>
        </div>

        <h3 class="text-primary font-semibold text-base border-b border-base-300 pb-1 pt-1">
          Gasto energético total
        </h3>
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Método</span>
            <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {{ basalEnergyExpenditure.method }}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">ETA (10%)</span>
            <div class="flex items-center gap-2">
              <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ etaValue != null ? etaValue : '-' }}
              </span>
              <span class="text-sm text-gray-500">Kcal/Día</span>
            </div>
          </div>
          <div class="space-y-1">
            <VSelect
              :model-value="physicalActivityLevel"
              @update:model-value="
                $emit(
                  'update:physicalActivityLevel',
                  $event == null ? null : Number($event),
                )
              "
              label="Actividad Física"
              :options="PHYSICAL_ACTIVITY_OPTIONS"
              placeholder="Seleccione..."
              clearable
              :disabled="!activitySelectEnabled"
            />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">GET</span>
            <div class="flex items-center gap-2">
              <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ getValue != null ? getValue : '—' }}
              </span>
              <span class="text-sm text-gray-500">Kcal/Día</span>
            </div>
          </div>
        </div>
      </div>
    </VCardBody>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VSelect } from '@/components/ui/select';
import { PHYSICAL_ACTIVITY_OPTIONS } from '@/constants/diagnostics';
import type { BasalEnergyResult } from '@/composables/useDiagnosticsCalculations';

defineProps<{
  healthyWeight: { min: string | null; max: string | null };
  basalEnergyExpenditure: BasalEnergyResult;
  hydrationRequirement: { min: number | null; max: number | null };
  etaValue: number | null;
  getValue: number | null;
  physicalActivityLevel: number | null;
  activitySelectEnabled: boolean;
}>();

defineEmits<{
  'update:physicalActivityLevel': [value: number | null];
}>();
</script>
