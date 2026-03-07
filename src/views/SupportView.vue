<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-primary mb-4">Soporte y Guía de Uso</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Aprende a usar la herramienta y entender los indicadores
        </p>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs-container mb-6">
        <VTabs>
          <VTabsList variant="boxed" class="justify-center flex-wrap">
            <VTabsTab :active="activeTab === 'guide'" size="lg" @click="activeTab = 'guide'">
              <VIcon name="menu_book" size="md" />
              Guía de Uso
            </VTabsTab>
            <VTabsTab
              :active="activeTab === 'indicators'"
              size="lg"
              @click="activeTab = 'indicators'"
            >
              <VIcon name="bar_chart" size="md" />
              Explicación de Indicadores
            </VTabsTab>
            <VTabsTab
              :active="activeTab === 'changelog'"
              size="lg"
              @click="activeTab = 'changelog'"
            >
              <VIcon name="new_releases" size="md" />
              Notas de versión
            </VTabsTab>
          </VTabsList>
        </VTabs>
        <div class="tab-panels mt-4">
          <GuideTabPanel v-if="activeTab === 'guide'" />
          <!-- Explicación de Indicadores Content -->
          <div v-if="activeTab === 'indicators'" class="tab-panel tab-panel--indicators">
            <div class="indicators-panel-content space-y-4">
              <!-- Manual / Descarga -->
              <VCard variant="elevated" shadow>
                <VCardBody>
                  <VCardTitle class="text-xl text-primary mb-3 flex items-center gap-2">
                    <VIcon name="menu_book" size="lg" />
                    Manual de indicadores y uso
                  </VCardTitle>
                  <p class="text-gray-700 dark:text-gray-300 mb-4">
                    Consulta el manual en PDF con la descripción de los indicadores antropométricos
                    y signos vitales, rangos de referencia y recomendaciones para la interpretación
                    de resultados en la calculadora de diagnósticos.
                  </p>
                  <div class="flex flex-wrap items-center gap-2">
                    <VButton
                      variant="solid"
                      color="primary"
                      class="inline-flex items-center gap-2"
                      :disabled="manualPdfLoading"
                      @click="handleDownloadManualPdf"
                    >
                      <VIcon name="download" size="md" />
                      {{ manualPdfLoading ? 'Generando…' : 'Descargar manual (PDF)' }}
                    </VButton>
                    <VBadge variant="soft" color="info" size="sm">Ejemplo</VBadge>
                  </div>
                </VCardBody>
              </VCard>

              <!-- IMC Collapse -->
              <VCollapse v-model:open="collapseState.imc">
                <template #title>Índice de Masa Corporal (IMC)</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    El IMC es un indicador de la relación entre el peso y la altura. Se calcula
                    dividiendo el peso (kg) entre la altura al cuadrado (m²).
                  </p>
                  <h4 class="font-semibold">Clasificación:</h4>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Rango</th>
                        <th>Clasificación</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>&lt; 18.5</td>
                        <td>Desnutrición</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>18.5 - 24.9</td>
                        <td>Peso Normal</td>
                        <td><VBadge color="success">Normal</VBadge></td>
                      </tr>
                      <tr>
                        <td>25.0 - 29.9</td>
                        <td>Sobrepeso</td>
                        <td><VBadge color="info">Observación</VBadge></td>
                      </tr>
                      <tr>
                        <td>30.0 - 34.9</td>
                        <td>Obesidad Grado I</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>35.0 - 39.9</td>
                        <td>Obesidad Grado II</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>≥ 40.0</td>
                        <td>Obesidad Mórbida</td>
                        <td><VBadge color="error">Crítico</VBadge></td>
                      </tr>
                    </tbody>
                  </VTable>
                </div>
              </VCollapse>

              <!-- Circunferencia Cintura Collapse -->
              <VCollapse v-model:open="collapseState.waist">
                <template #title>Circunferencia de Cintura</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La circunferencia de cintura es un indicador de grasa abdominal y riesgo
                    cardiovascular. Los valores de referencia varían según el sexo.
                  </p>
                  <div class="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 class="font-semibold mb-2">Hombres:</h4>
                      <ul class="space-y-2 text-sm">
                        <li><VBadge color="success" size="sm">Normal</VBadge> &lt; 94 cm</li>
                        <li>
                          <VBadge color="warning" size="sm">Riesgo Aumentado</VBadge> 94-102 cm
                        </li>
                        <li><VBadge color="error" size="sm">Riesgo Alto</VBadge> &gt; 102 cm</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-2">Mujeres:</h4>
                      <ul class="space-y-2 text-sm">
                        <li><VBadge color="success" size="sm">Normal</VBadge> &lt; 80 cm</li>
                        <li>
                          <VBadge color="warning" size="sm">Riesgo Aumentado</VBadge> 80-88 cm
                        </li>
                        <li><VBadge color="error" size="sm">Riesgo Alto</VBadge> &gt; 88 cm</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </VCollapse>

              <!-- Circunferencia Cadera Collapse -->
              <VCollapse v-model:open="collapseState.hip">
                <template #title>Circunferencia de Cadera</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La circunferencia de cadera, junto con la cintura, ayuda a determinar la
                    distribución de grasa corporal y el riesgo metabólico.
                  </p>
                  <div class="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 class="font-semibold mb-2">Hombres:</h4>
                      <ul class="space-y-2 text-sm">
                        <li><VBadge color="success" size="sm">Normal</VBadge> &lt; 99 cm</li>
                        <li>
                          <VBadge color="warning" size="sm">Riesgo Aumentado</VBadge> 99-104 cm
                        </li>
                        <li><VBadge color="error" size="sm">Riesgo Alto</VBadge> &gt; 104 cm</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-2">Mujeres:</h4>
                      <ul class="space-y-2 text-sm">
                        <li><VBadge color="success" size="sm">Normal</VBadge> &lt; 104 cm</li>
                        <li>
                          <VBadge color="warning" size="sm">Riesgo Aumentado</VBadge> 104-109 cm
                        </li>
                        <li><VBadge color="error" size="sm">Riesgo Alto</VBadge> &gt; 109 cm</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </VCollapse>

              <!-- Peso saludable y Gasto Energético Basal -->
              <VCollapse v-model:open="collapseState.healthyWeight">
                <template #title>Peso saludable y Gasto Energético Basal</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    El peso saludable se calcula a partir de la talla usando el rango de IMC
                    considerado normal (18.5 a 24.9 kg/m²). El gasto energético basal (TMB) y el
                    requerimiento hídrico se muestran en la misma tarjeta según los datos del
                    paciente.
                  </p>
                  <h4 class="font-semibold">Peso mínimo y máximo</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Mínimo: 18.5 × talla² (talla en metros).</li>
                    <li>Máximo: 24.9 × talla² (talla en metros).</li>
                    <li>Unidad: kilogramos (kg).</li>
                  </ul>

                  <h4 class="font-semibold">Gasto Energético Basal (Kcal/Día)</h4>
                  <div class="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <p class="font-medium mb-1">Harris Benedict</p>
                      <p class="mb-2">Se usa cuando el IMC es Normal o Desnutrición.</p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Hombre: 66.5 + (13.75 × peso kg) + (5 × talla cm) − (6.78 × edad)</li>
                        <li>Mujer: 655 + (9.6 × peso kg) + (1.95 × talla cm) − (4.68 × edad)</li>
                      </ul>
                    </div>
                    <div>
                      <p class="font-medium mb-1">Mifflin-St. Jeor</p>
                      <p class="mb-2">
                        Se usa cuando el IMC es Sobrepeso, Obesidad I, II o Mórbida.
                      </p>
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Hombre: (10 × peso) + (6.25 × talla cm) − (5 × edad) + 5</li>
                        <li>Mujer: (10 × peso) + (6.25 × talla cm) − (5 × edad) − 161</li>
                      </ul>
                    </div>
                    <p class="text-sm">
                      Si no se ha calculado el IMC (estado Pendiente), se muestra Harris Benedict
                      con valor "-" hasta que el usuario pulse Calcular.
                    </p>
                  </div>

                  <h4 class="font-semibold">Requerimiento hídrico</h4>
                  <ul class="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Fórmula: <strong>Peso (kg) × 30 a 35 ml</strong></li>
                    <li>
                      Se muestra el rango resultante en litros (L). Ejemplo: 0.9 a 1.05 L para 30
                      kg.
                    </li>
                    <li>Siempre visible cuando hay peso</li>
                  </ul>

                  <h4 class="font-semibold">Gasto energético total</h4>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    El GET (Gasto Energético Total) suma el basal (Harris Benedict o Mifflin-St.
                    Jeor), el ETA (10% del basal) y el aporte por actividad física según el nivel
                    seleccionado. Se expresa en Kcal/Día.
                  </p>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>ETA (10%):</strong> Se refiere a la energía que el cuerpo gasta al
                    procesar y digerir los alimentos, lo que contribuye al gasto calórico total y
                    puede influir en la pérdida de peso. En esta herramienta se usa un 10% del gasto
                    basal (Kcal/Día).
                  </p>
                  <h5 class="font-medium mt-3 mb-1">Actividad Física</h5>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Cada nivel tiene un porcentaje que se aplica sobre el basal para estimar el
                    gasto por actividad:
                  </p>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Nivel</th>
                        <th>%</th>
                        <th>Información</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sedentario</td>
                        <td>10%</td>
                        <td>Poco o nada de ejercicio físico</td>
                      </tr>
                      <tr>
                        <td>Actividad ligera</td>
                        <td>20%</td>
                        <td>Actividad ligera de 1-3 días de ejercicio físico</td>
                      </tr>
                      <tr>
                        <td>Actividad moderada</td>
                        <td>30%</td>
                        <td>Actividad física de 3-5 días de ejercicio físico</td>
                      </tr>
                      <tr>
                        <td>Actividad Intensa</td>
                        <td>40%</td>
                        <td>Actividad intensa de 6-7 días de ejercicio físico</td>
                      </tr>
                    </tbody>
                  </VTable>
                </div>
              </VCollapse>

              <!-- Frecuencia Cardíaca Collapse -->
              <VCollapse v-model:open="collapseState.heartRate">
                <template #title>Frecuencia Cardíaca</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La frecuencia cardíaca indica el número de latidos del corazón por minuto en
                    reposo. Es un signo vital fundamental.
                  </p>
                  <h4 class="font-semibold">Rangos de Referencia (adultos en reposo):</h4>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Rango</th>
                        <th>Clasificación</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>≤ 59 pul/min</td>
                        <td>Bradicardia</td>
                        <td><VBadge color="info">Observación</VBadge></td>
                      </tr>
                      <tr>
                        <td>60 - 100 pul/min</td>
                        <td>Normal</td>
                        <td><VBadge color="success">Normal</VBadge></td>
                      </tr>
                      <tr>
                        <td>≥ 101 pul/min</td>
                        <td>Taquicardia</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                    </tbody>
                  </VTable>
                </div>
              </VCollapse>

              <!-- Frecuencia Respiratoria Collapse -->
              <VCollapse v-model:open="collapseState.respiratoryRate">
                <template #title>Frecuencia Respiratoria</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La frecuencia respiratoria es el número de respiraciones por minuto. Valores
                    anormales pueden indicar problemas respiratorios o metabólicos.
                  </p>
                  <h4 class="font-semibold">Rangos de Referencia (adultos):</h4>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Rango</th>
                        <th>Clasificación</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>≤ 11 resp/min</td>
                        <td>Baja (Bradipnea)</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>12 - 20 resp/min</td>
                        <td>Normal</td>
                        <td><VBadge color="success">Normal</VBadge></td>
                      </tr>
                      <tr>
                        <td>≥ 21 resp/min</td>
                        <td>Alta (Taquipnea)</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                    </tbody>
                  </VTable>
                </div>
              </VCollapse>

              <!-- Temperatura Collapse -->
              <VCollapse v-model:open="collapseState.temperature">
                <template #title>Temperatura Corporal</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La temperatura corporal es un indicador del equilibrio térmico del organismo.
                    Valores elevados pueden indicar procesos infecciosos o inflamatorios.
                  </p>
                  <h4 class="font-semibold">Rangos de Referencia:</h4>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Rango</th>
                        <th>Clasificación</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>35.7 - 37.3 °C</td>
                        <td>Normal</td>
                        <td><VBadge color="success">Normal</VBadge></td>
                      </tr>
                      <tr>
                        <td>37.4 - 37.9 °C</td>
                        <td>Febrícula (Fiebre Leve)</td>
                        <td><VBadge color="info">Observación</VBadge></td>
                      </tr>
                      <tr>
                        <td>38.0 - 38.9 °C</td>
                        <td>Fiebre Moderada</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>39.0 - 40.0 °C</td>
                        <td>Fiebre Alta</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>&gt; 40.0 °C</td>
                        <td>Fiebre Muy Alta (Hiperpirexia)</td>
                        <td><VBadge color="error">Crítico</VBadge></td>
                      </tr>
                    </tbody>
                  </VTable>
                  <VAlert color="warning" icon class="mt-4">
                    Temperaturas superiores a 39°C requieren atención médica inmediata.
                  </VAlert>
                </div>
              </VCollapse>

              <!-- Presión arterial Collapse -->
              <VCollapse v-model:open="collapseState.bloodPressure">
                <template #title>Presión arterial</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La presión arterial se mide con dos valores: sistólica (máxima) y diastólica
                    (mínima), en mmHg. El diagnóstico se obtiene evaluando ambos; si pertenecen a
                    categorías distintas, se muestra la más grave.
                  </p>
                  <h4 class="font-semibold">Clasificación (adultos):</h4>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Sistólica (mmHg)</th>
                        <th>Diastólica (mmHg)</th>
                        <th>Diagnóstico</th>
                        <th>Comentario</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>&lt; 90</td>
                        <td>&lt; 60</td>
                        <td><VBadge color="warning">Hipotensión</VBadge></td>
                        <td>—</td>
                      </tr>
                      <tr>
                        <td>90 - 119</td>
                        <td>80 - 83</td>
                        <td><VBadge color="success">Normal</VBadge></td>
                        <td>—</td>
                      </tr>
                      <tr>
                        <td>120 - 129</td>
                        <td>84</td>
                        <td><VBadge color="warning">Sub Óptima</VBadge></td>
                        <td>—</td>
                      </tr>
                      <tr>
                        <td>130 - 139</td>
                        <td>85</td>
                        <td><VBadge color="warning">Limítrofe</VBadge></td>
                        <td>Primer nivel de atención médica</td>
                      </tr>
                      <tr>
                        <td>140 - 159</td>
                        <td>86 - 90</td>
                        <td><VBadge color="error">Hipertensión 1</VBadge></td>
                        <td>Prevención</td>
                      </tr>
                      <tr>
                        <td>160 - 179</td>
                        <td>91 - 100</td>
                        <td><VBadge color="error">Hipertensión 2</VBadge></td>
                        <td>Tratamiento urgente</td>
                      </tr>
                      <tr>
                        <td>≥ 180</td>
                        <td>≥ 110</td>
                        <td><VBadge color="error">Hipertensión 3</VBadge></td>
                        <td>—</td>
                      </tr>
                    </tbody>
                  </VTable>
                </div>
              </VCollapse>

              <!-- Saturación de Oxígeno Collapse -->
              <VCollapse v-model:open="collapseState.oxygenSaturation">
                <template #title>Saturación de Oxígeno (SpO₂)</template>
                <div class="pt-4 space-y-3">
                  <p class="text-gray-700 dark:text-gray-300">
                    La saturación de oxígeno indica el porcentaje de hemoglobina saturada con
                    oxígeno en la sangre. Es un indicador vital de la función respiratoria.
                  </p>
                  <h4 class="font-semibold">Rangos de Referencia:</h4>
                  <VTable striped size="sm">
                    <thead>
                      <tr>
                        <th>Rango</th>
                        <th>Clasificación</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>95 - 100%</td>
                        <td>Niveles Normales</td>
                        <td><VBadge color="success">Normal</VBadge></td>
                      </tr>
                      <tr>
                        <td>91 - 94%</td>
                        <td>Niveles Bajos</td>
                        <td><VBadge color="warning">Atención</VBadge></td>
                      </tr>
                      <tr>
                        <td>&lt; 90%</td>
                        <td>Emergencia médica</td>
                        <td><VBadge color="error">Crítico</VBadge></td>
                      </tr>
                    </tbody>
                  </VTable>
                  <VAlert color="error" icon class="mt-4">
                    <span class="font-semibold">
                      Una saturación de oxígeno inferior al 90% es una EMERGENCIA MÉDICA y requiere
                      atención inmediata. El paciente debe ser derivado de urgencia.
                    </span>
                  </VAlert>
                </div>
              </VCollapse>
            </div>
          </div>

          <ChangelogTabPanel v-if="activeTab === 'changelog'" :app-version="appVersion" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import GuideTabPanel from '@/components/support/GuideTabPanel.vue';
import ChangelogTabPanel from '@/components/support/ChangelogTabPanel.vue';
import { VAlert } from '@/components/ui/alert';
import { VButton } from '@/components/ui/button';
import { VCard, VCardBody, VCardTitle } from '@/components/ui/card';
import { VBadge } from '@/components/ui/badge';
import { VDivider } from '@/components/ui/divider';
import { VTabs, VTabsList, VTabsTab } from '@/components/ui/tabs';
import { VCollapse } from '@/components/ui/collapse';
import { VTable } from '@/components/ui/table';
import { VIcon } from '@/components/ui/icon';
import { downloadManualIndicadoresPdf } from '@/utils/pdf';

const activeTab = ref<'guide' | 'indicators' | 'changelog'>('guide');

const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.0';

const manualPdfLoading = ref(false);

async function handleDownloadManualPdf() {
  manualPdfLoading.value = true;
  try {
    await downloadManualIndicadoresPdf();
  } finally {
    manualPdfLoading.value = false;
  }
}

// Estado de cada collapse (true = abierto, false = cerrado)
const collapseState = reactive({
  imc: false,
  waist: false,
  hip: false,
  healthyWeight: false,
  heartRate: false,
  respiratoryRate: false,
  temperature: false,
  bloodPressure: false,
  oxygenSaturation: false,
});
</script>
