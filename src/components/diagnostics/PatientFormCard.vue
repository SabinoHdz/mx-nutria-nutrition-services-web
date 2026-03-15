<template>
  <VCard variant="elevated" shadow bordered>
    <VCardBody class="space-y-4">
      <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
        Datos del Paciente
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VSelect
          v-model="formData.gender"
          label="Sexo"
          :options="GENDER_OPTIONS"
          placeholder="Seleccionar..."
          clearable
          required
        />
        <VInput
          v-model="formData.age"
          type="number"
          label="Edad"
          suffix="años"
          placeholder="Ej: 25"
          :min="1"
          :max="99"
          :maxlength="2"
          clearable
          required
        />
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
          clearable
          required
        />
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
          required
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <VButton
          color="primary"
          full-width
          @click.prevent="$emit('submit')"
          :disabled="!isFormValid"
        >
          Calcular
        </VButton>
        <VButton variant="outline" full-width @click="$emit('clear')"> Limpiar </VButton>
      </div>
    </VCardBody>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VButton } from '@/components/ui/button';
import { VSelect } from '@/components/ui/select';
import { VInput } from '@/components/ui/input';
import { GENDER_OPTIONS } from '@/constants/diagnostics';
import type { Patient } from '@/types';

defineProps<{
  formData: Patient;
  isFormValid: boolean;
}>();

defineEmits<{
  submit: [];
  clear: [];
}>();
</script>
