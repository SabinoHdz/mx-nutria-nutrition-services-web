<template>
  <div class="min-h-screen bg-base-200 py-12 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-primary mb-4">
          Soporte y Guía de Uso
        </h1>
        <p class="text-xl text-gray-600">
          Aprende a usar la herramienta y entender los indicadores
        </p>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs tabs-boxed bg-base-100 shadow-lg mb-6 justify-center flex-wrap">
        <a
          class="tab tab-lg"
          :class="{ 'tab-active': activeTab === 'guide' }"
          @click="activeTab = 'guide'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Guía de Uso
        </a>
        <a
          class="tab tab-lg"
          :class="{ 'tab-active': activeTab === 'indicators' }"
          @click="activeTab = 'indicators'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          Explicación de Indicadores
        </a>
      </div>

      <!-- Guía de Uso Content -->
      <div v-if="activeTab === 'guide'" class="space-y-6">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl text-primary mb-4">
              Cómo Usar la Calculadora de Diagnósticos
            </h2>

            <div class="space-y-6">
              <!-- Paso 1 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">1</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Seleccionar Sexo del Paciente</h3>
                  <p class="text-gray-700">
                    En la sección "Datos del Paciente", seleccione el sexo biológico del paciente
                    (Masculino o Femenino). Este dato es crucial para el cálculo correcto de algunos
                    indicadores como las circunferencias de cintura y cadera.
                  </p>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Paso 2 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">2</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Ingresar Datos Básicos</h3>
                  <p class="text-gray-700 mb-2">Complete los siguientes campos:</p>
                  <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li><strong>Edad:</strong> Ingrese la edad en años (solo números enteros)</li>
                    <li><strong>Peso:</strong> Ingrese el peso en kilogramos (permite un decimal, ej: 70.5)</li>
                    <li><strong>Talla:</strong> Ingrese la altura en centímetros (permite un decimal, ej: 165.5)</li>
                  </ul>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Paso 3 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">3</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Completar Datos Antropométricos</h3>
                  <p class="text-gray-700 mb-2">
                    En la sección "Antropometría", ingrese las mediciones:
                  </p>
                  <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li><strong>Circunferencia de Cintura:</strong> Medida en centímetros</li>
                    <li><strong>Circunferencia de Cadera:</strong> Medida en centímetros</li>
                  </ul>
                  <p class="text-gray-700 mt-2">
                    El IMC se calculará automáticamente al presionar "Calcular".
                  </p>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Paso 4 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">4</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Ingresar Signos Vitales</h3>
                  <p class="text-gray-700 mb-2">
                    Complete los signos vitales disponibles:
                  </p>
                  <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li><strong>Frecuencia Cardíaca:</strong> Pulsaciones por minuto (número entero)</li>
                    <li><strong>Frecuencia Respiratoria:</strong> Respiraciones por minuto (número entero)</li>
                    <li><strong>Temperatura:</strong> Grados Celsius (permite un decimal, ej: 36.5)</li>
                    <li><strong>Saturación de Oxígeno:</strong> Porcentaje (número entero, 0-100)</li>
                  </ul>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Paso 5 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">5</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Calcular e Interpretar Resultados</h3>
                  <p class="text-gray-700 mb-2">
                    Presione el botón <span class="badge badge-primary">Calcular</span> para obtener
                    todos los resultados. Los indicadores se mostrarán en la tabla de resultados con:
                  </p>
                  <ul class="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li><span class="badge badge-success badge-sm">Verde</span> - Valores normales</li>
                    <li><span class="badge badge-info badge-sm">Azul</span> - Valores límite o informativos</li>
                    <li><span class="badge badge-warning badge-sm">Amarillo</span> - Valores que requieren atención</li>
                    <li><span class="badge badge-error badge-sm">Rojo</span> - Valores críticos o preocupantes</li>
                  </ul>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Paso 6 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">6</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Alertas Médicas</h3>
                  <p class="text-gray-700">
                    Si algún signo vital presenta valores críticos (como temperatura muy alta o
                    saturación de oxígeno baja), aparecerá una alerta visual destacada en color
                    amarillo o rojo. Preste especial atención a estas alertas.
                  </p>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Paso 7 -->
              <div class="flex gap-4">
                <div class="badge badge-primary badge-lg font-bold">7</div>
                <div class="flex-1">
                  <h3 class="font-bold text-lg mb-2">Limpiar Formulario</h3>
                  <p class="text-gray-700">
                    Para evaluar un nuevo paciente, presione el botón
                    <span class="badge badge-outline">Limpiar</span> para resetear todos los campos
                    y comenzar una nueva evaluación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips Card -->
        <div class="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="font-bold">Consejos Útiles</h3>
              <div class="text-sm">
                <ul class="list-disc list-inside mt-2">
                  <li>Los campos se validan en tiempo real mientras escribe</li>
                  <li>Los mensajes de error le indicarán si un valor está fuera del rango permitido</li>
                  <li>Puede navegar usando el teclado (Tab para avanzar, Shift+Tab para retroceder)</li>
                  <li>Los resultados se actualizan automáticamente conforme ingresa los datos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Explicación de Indicadores Content -->
      <div v-if="activeTab === 'indicators'" class="space-y-4">
        <!-- IMC Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Índice de Masa Corporal (IMC)
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                El IMC es un indicador de la relación entre el peso y la altura. Se calcula
                dividiendo el peso (kg) entre la altura al cuadrado (m²).
              </p>
              <h4 class="font-semibold">Clasificación:</h4>
              <div class="overflow-x-auto">
                <table class="table table-sm table-zebra">
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
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>18.5 - 24.9</td>
                      <td>Peso Normal</td>
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>25.0 - 29.9</td>
                      <td>Sobrepeso</td>
                      <td><span class="badge badge-info">Observación</span></td>
                    </tr>
                    <tr>
                      <td>30.0 - 34.9</td>
                      <td>Obesidad Grado I</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>35.0 - 39.9</td>
                      <td>Obesidad Grado II</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>≥ 40.0</td>
                      <td>Obesidad Mórbida</td>
                      <td><span class="badge badge-error">Crítico</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Circunferencia Cintura Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Circunferencia de Cintura
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                La circunferencia de cintura es un indicador de grasa abdominal y riesgo
                cardiovascular. Los valores de referencia varían según el sexo.
              </p>
              <div class="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 class="font-semibold mb-2">Hombres:</h4>
                  <ul class="space-y-2 text-sm">
                    <li><span class="badge badge-success badge-sm">Normal</span> &lt; 94 cm</li>
                    <li><span class="badge badge-warning badge-sm">Riesgo Aumentado</span> 94-102 cm</li>
                    <li><span class="badge badge-error badge-sm">Riesgo Alto</span> &gt; 102 cm</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-2">Mujeres:</h4>
                  <ul class="space-y-2 text-sm">
                    <li><span class="badge badge-success badge-sm">Normal</span> &lt; 80 cm</li>
                    <li><span class="badge badge-warning badge-sm">Riesgo Aumentado</span> 80-88 cm</li>
                    <li><span class="badge badge-error badge-sm">Riesgo Alto</span> &gt; 88 cm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Circunferencia Cadera Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Circunferencia de Cadera
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                La circunferencia de cadera, junto con la cintura, ayuda a determinar la
                distribución de grasa corporal y el riesgo metabólico.
              </p>
              <div class="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 class="font-semibold mb-2">Hombres:</h4>
                  <ul class="space-y-2 text-sm">
                    <li><span class="badge badge-success badge-sm">Normal</span> &lt; 99 cm</li>
                    <li><span class="badge badge-warning badge-sm">Riesgo Aumentado</span> 99-104 cm</li>
                    <li><span class="badge badge-error badge-sm">Riesgo Alto</span> &gt; 104 cm</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-2">Mujeres:</h4>
                  <ul class="space-y-2 text-sm">
                    <li><span class="badge badge-success badge-sm">Normal</span> &lt; 104 cm</li>
                    <li><span class="badge badge-warning badge-sm">Riesgo Aumentado</span> 104-109 cm</li>
                    <li><span class="badge badge-error badge-sm">Riesgo Alto</span> &gt; 109 cm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Frecuencia Cardíaca Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Frecuencia Cardíaca
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                La frecuencia cardíaca indica el número de latidos del corazón por minuto
                en reposo. Es un signo vital fundamental.
              </p>
              <h4 class="font-semibold">Rangos de Referencia (adultos en reposo):</h4>
              <div class="overflow-x-auto">
                <table class="table table-sm table-zebra">
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
                      <td><span class="badge badge-info">Observación</span></td>
                    </tr>
                    <tr>
                      <td>60 - 100 pul/min</td>
                      <td>Normal</td>
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>≥ 101 pul/min</td>
                      <td>Taquicardia</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Frecuencia Respiratoria Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Frecuencia Respiratoria
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                La frecuencia respiratoria es el número de respiraciones por minuto.
                Valores anormales pueden indicar problemas respiratorios o metabólicos.
              </p>
              <h4 class="font-semibold">Rangos de Referencia (adultos):</h4>
              <div class="overflow-x-auto">
                <table class="table table-sm table-zebra">
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
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>12 - 20 resp/min</td>
                      <td>Normal</td>
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>≥ 21 resp/min</td>
                      <td>Alta (Taquipnea)</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Temperatura Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Temperatura Corporal
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                La temperatura corporal es un indicador del equilibrio térmico del organismo.
                Valores elevados pueden indicar procesos infecciosos o inflamatorios.
              </p>
              <h4 class="font-semibold">Rangos de Referencia:</h4>
              <div class="overflow-x-auto">
                <table class="table table-sm table-zebra">
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
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>37.4 - 37.9 °C</td>
                      <td>Febrícula (Fiebre Leve)</td>
                      <td><span class="badge badge-info">Observación</span></td>
                    </tr>
                    <tr>
                      <td>38.0 - 38.9 °C</td>
                      <td>Fiebre Moderada</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>39.0 - 40.0 °C</td>
                      <td>Fiebre Alta</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>&gt; 40.0 °C</td>
                      <td>Fiebre Muy Alta (Hiperpirexia)</td>
                      <td><span class="badge badge-error">Crítico</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="alert alert-warning mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                <span class="text-sm">Temperaturas superiores a 39°C requieren atención médica inmediata.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Saturación de Oxígeno Collapse -->
        <div tabindex="0" class="collapse collapse-arrow bg-base-100 shadow-xl">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-bold text-primary">
            Saturación de Oxígeno (SpO₂)
          </div>
          <div class="collapse-content">
            <div class="pt-4 space-y-3">
              <p class="text-gray-700">
                La saturación de oxígeno indica el porcentaje de hemoglobina saturada con oxígeno
                en la sangre. Es un indicador vital de la función respiratoria.
              </p>
              <h4 class="font-semibold">Rangos de Referencia:</h4>
              <div class="overflow-x-auto">
                <table class="table table-sm table-zebra">
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
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>91 - 94%</td>
                      <td>Niveles Bajos</td>
                      <td><span class="badge badge-warning">Atención</span></td>
                    </tr>
                    <tr>
                      <td>&lt; 90%</td>
                      <td>Emergencia Médica</td>
                      <td><span class="badge badge-error">Crítico</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="alert alert-error mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-sm font-semibold">
                  Una saturación de oxígeno inferior al 90% es una EMERGENCIA MÉDICA y requiere
                  atención inmediata. El paciente debe ser derivado de urgencia.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref<'guide' | 'indicators'>('guide');
</script>
