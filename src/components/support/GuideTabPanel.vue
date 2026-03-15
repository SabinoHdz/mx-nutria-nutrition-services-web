<template>
  <div class="tab-panel tab-panel--guide space-y-6">
    <div class="space-y-6">
      <VWhatsAppContact
        variant="banner"
        title="¿Necesitas ayuda con el diagnóstico?"
        description="Escríbenos por WhatsApp y te apoyamos con dudas sobre el uso de la calculadora o la interpretación de resultados."
        button-text="Chatear por WhatsApp"
      />
      <VCard variant="elevated" shadow>
        <VCardBody>
          <VCardTitle class="text-2xl text-primary mb-4">
            Cómo Usar la Calculadora de Diagnósticos
          </VCardTitle>

          <div class="space-y-6">
            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">1</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Seleccionar Sexo del Paciente</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  En la sección "Datos del Paciente", seleccione el sexo biológico del paciente
                  (Masculino o Femenino). Este dato es crucial para el cálculo correcto de algunos
                  indicadores como las circunferencias de cintura y cadera.
                </p>
              </div>
            </div>

            <VDivider />

            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">2</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Ingresar Datos Básicos</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-2">Complete los siguientes campos:</p>
                <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Edad:</strong> Ingrese la edad en años (solo números enteros)</li>
                  <li>
                    <strong>Peso:</strong> Ingrese el peso en kilogramos (permite un decimal, ej:
                    70.5)
                  </li>
                  <li>
                    <strong>Talla:</strong> Ingrese la altura en centímetros (permite un decimal,
                    ej: 165.5)
                  </li>
                </ul>
              </div>
            </div>

            <VDivider />

            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">3</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Completar Datos Antropométricos</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  En la sección "Antropometría", ingrese las mediciones:
                </p>
                <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Circunferencia de Cintura:</strong> Medida en centímetros</li>
                  <li><strong>Circunferencia de Cadera:</strong> Medida en centímetros</li>
                </ul>
                <p class="text-gray-700 dark:text-gray-300 mt-2">
                  El IMC se calculará automáticamente al presionar "Calcular".
                </p>
              </div>
            </div>

            <VDivider />

            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">4</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Ingresar Signos Vitales</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  Complete los signos vitales disponibles:
                </p>
                <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>
                    <strong>Frecuencia Cardíaca:</strong> Pulsaciones por minuto (número entero)
                  </li>
                  <li>
                    <strong>Frecuencia Respiratoria:</strong> Respiraciones por minuto (número
                    entero)
                  </li>
                  <li>
                    <strong>Temperatura:</strong> Grados Celsius (permite un decimal, ej: 36.5)
                  </li>
                  <li><strong>Saturación de Oxígeno:</strong> Porcentaje (número entero, 0-100)</li>
                </ul>
              </div>
            </div>

            <VDivider />

            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">5</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Calcular e Interpretar Resultados</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  Presione el botón <VBadge color="primary">Calcular</VBadge> para obtener todos los
                  resultados. Los indicadores se mostrarán en la tabla de resultados con:
                </p>
                <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li><VBadge color="success" size="sm">Verde</VBadge> - Valores normales</li>
                  <li>
                    <VBadge color="info" size="sm">Azul</VBadge> - Valores límite o informativos
                  </li>
                  <li>
                    <VBadge color="warning" size="sm">Amarillo</VBadge> - Valores que requieren
                    atención
                  </li>
                  <li>
                    <VBadge color="error" size="sm">Rojo</VBadge> - Valores críticos o preocupantes
                  </li>
                </ul>
              </div>
            </div>

            <VDivider />

            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">6</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Alertas Médicas</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Si algún signo vital presenta valores críticos (como temperatura muy alta o
                  saturación de oxígeno baja), aparecerá una alerta visual destacada en color
                  amarillo o rojo. Preste especial atención a estas alertas.
                </p>
              </div>
            </div>

            <VDivider />

            <div class="flex gap-4">
              <VBadge color="primary" size="lg" class="font-bold shrink-0">7</VBadge>
              <div class="flex-1">
                <h3 class="font-bold text-lg mb-2">Limpiar Formulario</h3>
                <p class="text-gray-700 dark:text-gray-300">
                  Para evaluar un nuevo paciente, presione el botón
                  <VBadge variant="outline">Limpiar</VBadge> para resetear todos los campos y
                  comenzar una nueva evaluación.
                </p>
              </div>
            </div>
          </div>
        </VCardBody>
      </VCard>

      <VAlert color="info" icon class="shadow-lg">
        <template #title> Consejos Útiles </template>
        <ul class="list-disc list-inside mt-2 text-sm">
          <li>Los campos se validan en tiempo real mientras escribe</li>
          <li>Los mensajes de error le indicarán si un valor está fuera del rango permitido</li>
          <li>Puede navegar usando el teclado (Tab para avanzar, Shift+Tab para retroceder)</li>
          <li>Los resultados se actualizan automáticamente conforme ingresa los datos</li>
        </ul>
      </VAlert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VCard, VCardBody, VCardTitle } from '@/components/ui/card';
import { VBadge } from '@/components/ui/badge';
import { VAlert } from '@/components/ui/alert';
import { VDivider } from '@/components/ui/divider';
import { VWhatsAppContact } from '@/components/ui/whatsapp-contact';
</script>
