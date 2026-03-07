<template>
  <div class="tab-panel tab-panel--changelog space-y-6">
    <VCard variant="elevated" shadow>
      <VCardBody>
        <VCardTitle class="text-2xl text-primary mb-4 flex items-center gap-2">
          <VIcon name="new_releases" size="lg" />
          Notas de versión
        </VCardTitle>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Cambios, mejoras y correcciones incorporadas en la aplicación. Actualiza esta sección al
          subir nuevas versiones.
        </p>
        <p class="text-sm font-medium text-primary mb-6">Versión: {{ appVersion }}</p>

        <div class="space-y-6">
          <div>
            <h3 class="font-bold text-lg text-primary border-b border-border pb-2 mb-3">
              v{{ appVersion }}
            </h3>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span
                  >Presión arterial en diagnósticos: captura de sistólica y diastólica con
                  clasificación según rangos de referencia (normal, sub óptima, limítrofe,
                  hipertensión 1/2/3, hipotensión).</span
                >
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span
                  >Peso saludable ampliado: peso mínimo y máximo por IMC, gasto energético basal
                  (Harris Benedict para IMC normal/desnutrición, Mifflin-St. Jeor para
                  sobrepeso/obesidad) y requerimiento hídrico (peso × 30–35 ml).</span
                >
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span>Descarga de PDF con resultados del diagnóstico nutricional.</span>
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span
                  >Soporte: manual de indicadores descargable en PDF y explicación de indicadores por
                  pestañas (guía, indicadores, notas de versión).</span
                >
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span
                  >Explicación de indicadores actualizada: IMC, circunferencias, frecuencia cardíaca
                  y respiratoria, temperatura, presión arterial (tabla de rangos y comentarios) y peso
                  saludable con fórmulas de gasto basal y requerimiento hídrico.</span
                >
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span
                  >Indicadores y signos vitales muestran colores según el rango del resultado
                  (normal, advertencia, riesgo).</span
                >
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span>Logo de la aplicación en la barra de navegación.</span>
              </li>
              <li class="flex gap-2">
                <span class="text-primary shrink-0">•</span>
                <span>Correcciones ortográficas en textos de la aplicación.</span>
              </li>
            </ul>
          </div>

          <VDivider />

          <div>
            <h3 class="font-semibold text-base text-gray-600 dark:text-gray-400 mb-2">
              Cómo documentar cambios
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Al publicar una nueva versión, añade aquí una entrada con la fecha o número de
              versión y lista bajo: <strong>Nuevas funciones</strong>, <strong>Mejoras</strong> o
              <strong>Correcciones</strong> según corresponda.
            </p>
          </div>
        </div>
      </VCardBody>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { VCard, VCardBody, VCardTitle } from '@/components/ui/card';
import { VDivider } from '@/components/ui/divider';
import { VIcon } from '@/components/ui/icon';

defineProps<{
  appVersion: string;
}>();
</script>
