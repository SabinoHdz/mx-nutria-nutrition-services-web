<template>
  <VCard variant="elevated" shadow bordered>
    <VCardBody class="space-y-4">
      <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
        Antropometría
      </h2>
      <div class="space-y-3">
        <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
          <span class="text-sm">IMC</span>
          <VInput
            type="text"
            size="sm"
            class="w-full"
            v-model="antropometric.imc"
            placeholder="0.00"
            suffix="kg/m²"
            disabled
          />
          <VBadge
            size="sm"
            :variant="
              antropometric.imcStatus === 'Pendiente' || !antropometric.imcStatus
                ? 'ghost'
                : 'solid'
            "
            :color="antropometric.imcColor || 'primary'"
            class="whitespace-nowrap justify-self-end"
          >
            {{ antropometric.imcStatus || 'Pendiente' }}
          </VBadge>
        </div>

        <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
          <span class="text-sm">Cintura</span>
          <VInput
            type="decimal"
            size="sm"
            class="w-full"
            v-model="antropometric.waistCircumference"
            :max="600"
            :min="1"
            :integer-digits="3"
            :decimal-places="1"
            :placeholder="!!formData.gender ? 'Ej: 64' : ''"
            :disabled="!formData.gender"
            suffix="cm"
          />
          <VBadge
            size="sm"
            :variant="
              antropometric.waistStatus === 'Pendiente' || !antropometric.waistStatus
                ? 'ghost'
                : 'solid'
            "
            :color="antropometric.waistColor || 'primary'"
            class="whitespace-nowrap justify-self-end"
          >
            {{ antropometric.waistStatus || 'Pendiente' }}
          </VBadge>
        </div>

        <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
          <span class="text-sm">Cadera</span>
          <VInput
            type="decimal"
            size="sm"
            class="w-full"
            v-model="antropometric.hipCircumference"
            :max="600"
            :min="1"
            :integer-digits="3"
            :decimal-places="1"
            :placeholder="!!formData.gender ? 'Ej: 75' : ''"
            :disabled="!formData.gender"
            suffix="cm"
          />
          <VBadge
            size="sm"
            :variant="
              antropometric.hipStatus === 'Pendiente' || !antropometric.hipStatus
                ? 'ghost'
                : 'solid'
            "
            :color="antropometric.hipColor || 'primary'"
            class="whitespace-nowrap justify-self-end"
          >
            {{ antropometric.hipStatus || 'Pendiente' }}
          </VBadge>
        </div>

        <div class="pt-1">
          <span class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
            Índice Cintura/Estatura
          </span>
        </div>

        <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
          <span class="text-sm">Cintura</span>
          <VInput
            type="text"
            size="sm"
            class="w-full"
            :model-value="antropometric.waistInCm"
            placeholder="-"
            suffix="cm"
            disabled
            label=""
          />
          <div></div>
        </div>

        <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
          <span class="text-sm">Estatura</span>
          <VInput
            type="text"
            size="sm"
            class="w-full"
            :model-value="antropometric.heightInCm"
            placeholder="-"
            suffix="cm"
            disabled
            label=""
          />
          <div></div>
        </div>

        <div class="pt-2 border-t border-base-300">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Diagnóstico Índice Cintura/Estatura</span>
            <VBadge
              size="sm"
              :variant="
                antropometric.waistHeightStatus === 'Pendiente' || !antropometric.waistHeightStatus
                  ? 'ghost'
                  : 'solid'
              "
              :color="antropometric.waistHeightColor || 'primary'"
              class="whitespace-nowrap"
            >
              {{ antropometric.waistHeightStatus || 'Pendiente' }}
            </VBadge>
          </div>
        </div>
      </div>
    </VCardBody>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VBadge } from '@/components/ui/badge';
import { VInput } from '@/components/ui/input';
import type { Patient, AntropometricData } from '@/types';

defineProps<{
  formData: Patient;
  antropometric: AntropometricData;
}>();
</script>
