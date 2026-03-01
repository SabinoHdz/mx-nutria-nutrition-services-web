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
          <!-- Guía de Uso Content -->
          <div v-if="activeTab === 'guide'" class="tab-panel tab-panel--guide space-y-6">
            <div class="space-y-6">
              <VCard variant="elevated" shadow>
                <VCardBody>
                  <VCardTitle class="text-2xl text-primary mb-4">
                    Cómo Usar la Calculadora de Diagnósticos
                  </VCardTitle>

                  <div class="space-y-6">
                    <!-- Paso 1 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">1</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Seleccionar Sexo del Paciente</h3>
                        <p class="text-gray-700 dark:text-gray-300">
                          En la sección "Datos del Paciente", seleccione el sexo biológico del
                          paciente (Masculino o Femenino). Este dato es crucial para el cálculo
                          correcto de algunos indicadores como las circunferencias de cintura y
                          cadera.
                        </p>
                      </div>
                    </div>

                    <VDivider />

                    <!-- Paso 2 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">2</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Ingresar Datos Básicos</h3>
                        <p class="text-gray-700 dark:text-gray-300 mb-2">
                          Complete los siguientes campos:
                        </p>
                        <ul
                          class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4"
                        >
                          <li>
                            <strong>Edad:</strong> Ingrese la edad en años (solo números enteros)
                          </li>
                          <li>
                            <strong>Peso:</strong> Ingrese el peso en kilogramos (permite un
                            decimal, ej: 70.5)
                          </li>
                          <li>
                            <strong>Talla:</strong> Ingrese la altura en centímetros (permite un
                            decimal, ej: 165.5)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <VDivider />

                    <!-- Paso 3 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">3</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Completar Datos Antropométricos</h3>
                        <p class="text-gray-700 dark:text-gray-300 mb-2">
                          En la sección "Antropometría", ingrese las mediciones:
                        </p>
                        <ul
                          class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4"
                        >
                          <li><strong>Circunferencia de Cintura:</strong> Medida en centímetros</li>
                          <li><strong>Circunferencia de Cadera:</strong> Medida en centímetros</li>
                        </ul>
                        <p class="text-gray-700 dark:text-gray-300 mt-2">
                          El IMC se calculará automáticamente al presionar "Calcular".
                        </p>
                      </div>
                    </div>

                    <VDivider />

                    <!-- Paso 4 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">4</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Ingresar Signos Vitales</h3>
                        <p class="text-gray-700 dark:text-gray-300 mb-2">
                          Complete los signos vitales disponibles:
                        </p>
                        <ul
                          class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4"
                        >
                          <li>
                            <strong>Frecuencia Cardíaca:</strong> Pulsaciones por minuto (número
                            entero)
                          </li>
                          <li>
                            <strong>Frecuencia Respiratoria:</strong> Respiraciones por minuto
                            (número entero)
                          </li>
                          <li>
                            <strong>Temperatura:</strong> Grados Celsius (permite un decimal, ej:
                            36.5)
                          </li>
                          <li>
                            <strong>Saturación de Oxígeno:</strong> Porcentaje (número entero,
                            0-100)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <VDivider />

                    <!-- Paso 5 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">5</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Calcular e Interpretar Resultados</h3>
                        <p class="text-gray-700 dark:text-gray-300 mb-2">
                          Presione el botón <VBadge color="primary">Calcular</VBadge> para obtener
                          todos los resultados. Los indicadores se mostrarán en la tabla de
                          resultados con:
                        </p>
                        <ul
                          class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4"
                        >
                          <li>
                            <VBadge color="success" size="sm">Verde</VBadge> - Valores normales
                          </li>
                          <li>
                            <VBadge color="info" size="sm">Azul</VBadge> - Valores límite o
                            informativos
                          </li>
                          <li>
                            <VBadge color="warning" size="sm">Amarillo</VBadge> - Valores que
                            requieren atención
                          </li>
                          <li>
                            <VBadge color="error" size="sm">Rojo</VBadge> - Valores críticos o
                            preocupantes
                          </li>
                        </ul>
                      </div>
                    </div>

                    <VDivider />

                    <!-- Paso 6 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">6</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Alertas Médicas</h3>
                        <p class="text-gray-700 dark:text-gray-300">
                          Si algún signo vital presenta valores críticos (como temperatura muy alta
                          o saturación de oxígeno baja), aparecerá una alerta visual destacada en
                          color amarillo o rojo. Preste especial atención a estas alertas.
                        </p>
                      </div>
                    </div>

                    <VDivider />

                    <!-- Paso 7 -->
                    <div class="flex gap-4">
                      <VBadge color="primary" size="lg" class="font-bold shrink-0">7</VBadge>
                      <div class="flex-1">
                        <h3 class="font-bold text-lg mb-2">Limpiar Formulario</h3>
                        <p class="text-gray-700 dark:text-gray-300">
                          Para evaluar un nuevo paciente, presione el botón
                          <VBadge variant="outline">Limpiar</VBadge> para resetear todos los campos
                          y comenzar una nueva evaluación.
                        </p>
                      </div>
                    </div>
                  </div>
                </VCardBody>
              </VCard>

              <!-- Tips Card -->
              <VAlert color="info" icon class="shadow-lg">
                <template #title> Consejos Útiles </template>
                <ul class="list-disc list-inside mt-2 text-sm">
                  <li>Los campos se validan en tiempo real mientras escribe</li>
                  <li>
                    Los mensajes de error le indicarán si un valor está fuera del rango permitido
                  </li>
                  <li>
                    Puede navegar usando el teclado (Tab para avanzar, Shift+Tab para retroceder)
                  </li>
                  <li>Los resultados se actualizan automáticamente conforme ingresa los datos</li>
                </ul>
              </VAlert>
            </div>
          </div>

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

          <!-- Notas de versión / Changelog -->
          <div v-if="activeTab === 'changelog'" class="tab-panel tab-panel--changelog space-y-6">
            <VCard variant="elevated" shadow>
              <VCardBody>
                <VCardTitle class="text-2xl text-primary mb-4 flex items-center gap-2">
                  <VIcon name="new_releases" size="lg" />
                  Notas de versión
                </VCardTitle>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Cambios, mejoras y correcciones incorporadas en la aplicación. Actualiza esta
                  sección al subir nuevas versiones.
                </p>
                <p class="text-sm font-medium text-primary mb-6">Versión: {{ appVersion }}</p>

                <div class="space-y-6">
                  <!-- Versión actual (desde package.json vía __APP_VERSION__) -->
                  <div>
                    <h3 class="font-bold text-lg text-primary border-b border-border pb-2 mb-3">
                      v{{ appVersion }}
                    </h3>
                    <ul class="space-y-2 text-gray-700 dark:text-gray-300">
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span
                          >Migración de componentes DaisyUI a Tailwind (navbar, drawer, tabs,
                          collapse, table, divider).</span
                        >
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span
                          >Presión arterial con campos sistólica y diastólica y rangos según
                          referencia.</span
                        >
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span
                          >Badges de indicadores y signos vitales con colores por rango (variant y
                          color en VBadge).</span
                        >
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span>Descarga de PDF con resultados del diagnóstico nutricional.</span>
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span>Logo de la aplicación en la barra de navegación (reemplazo del emoji).</span>
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span>Correcciones ortográficas en textos de la aplicación.</span>
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span
                          >Sección de explicación de indicadores visible al cambiar de pestaña en
                          Soporte.</span
                        >
                      </li>
                      <li class="flex gap-2">
                        <span class="text-primary shrink-0">•</span>
                        <span>Correcciones de tipos TypeScript y ESLint en build (input, select, PDF, tooltip).</span>
                      </li>
                    </ul>
                  </div>

                  <VDivider />

                  <!-- Plantilla para futuras versiones -->
                  <div>
                    <h3 class="font-semibold text-base text-gray-600 dark:text-gray-400 mb-2">
                      Cómo documentar cambios
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      Al publicar una nueva versión, añade aquí una entrada con la fecha o número de
                      versión y lista bajo:
                      <strong>Nuevas funciones</strong>, <strong>Mejoras</strong> o
                      <strong>Correcciones</strong> según corresponda.
                    </p>
                  </div>
                </div>
              </VCardBody>
            </VCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
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
  heartRate: false,
  respiratoryRate: false,
  temperature: false,
  oxygenSaturation: false,
});
</script>
