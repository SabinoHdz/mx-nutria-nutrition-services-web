<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VAlert } from '@/components/ui/alert';
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-primary mb-4">
          Acerca de LPN Diagnósticos Virtual
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Herramienta digital para profesionales de la salud
        </p>
      </div>

      <!-- Mission Card -->
      <VCard variant="elevated" shadow>
        <VCardBody>
          <h2 class="card-title text-2xl text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            Nuestra Misión
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            LPN Diagnósticos Virtual es una herramienta diseñada para facilitar la evaluación
            de indicadores antropométricos y signos vitales en el ámbito de la salud.
            Nuestro objetivo es proporcionar a los profesionales de la nutrición y la salud
            una plataforma rápida, precisa y confiable para el análisis de datos de pacientes.
          </p>
        </VCardBody>
      </VCard>

      <!-- Features Card -->
      <VCard variant="elevated" shadow class="mb-6">
        <VCardBody>
          <h2 class="card-title text-2xl text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            Características Principales
          </h2>
          <div class="space-y-4">
            <div class="flex gap-3">
              <span class="text-success text-xl">✓</span>
              <div>
                <h3 class="font-semibold text-lg">Cálculos Precisos</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Algoritmos basados en Normas Oficiales Mexicanas (NOM) para garantizar
                  resultados confiables.
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="text-success text-xl">✓</span>
              <div>
                <h3 class="font-semibold text-lg">Validación en Tiempo Real</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Los datos se validan automáticamente conforme se ingresan, evitando errores
                  de captura.
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="text-success text-xl">✓</span>
              <div>
                <h3 class="font-semibold text-lg">Clasificación Normalizada</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Cada indicador se clasifica de acuerdo a las Normas Oficiales Mexicanas (NOM)
                  y estás pueden cambiar o actualizarse de acuerdo a la sección de soporte.
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="text-success text-xl">✓</span>
              <div>
                <h3 class="font-semibold text-lg">Interfaz Intuitiva</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  Diseño limpio y fácil de usar que permite una evaluación rápida sin
                  complicaciones.
                </p>
              </div>
            </div>
          </div>
        </VCardBody>
      </VCard>

      <!-- Standards Card -->
      <VCard variant="elevated" shadow class="mb-6">
        <VCardBody>
          <h2 class="card-title text-2xl text-primary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Estándares de nutrición
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Todos los rangos de clasificación y valores de referencia utilizados en esta
            herramienta están basados en:
          </p>
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li class="flex gap-2">
              <span class="text-primary">•</span>
              <span>Organización Mundial de la Salud (OMS) para IMC</span>
            </li>
            <li class="flex gap-2">
              <span class="text-primary">•</span>
              <span>Guías internacionales de mediciones antropométricas</span>
            </li>
            <li class="flex gap-2">
              <span class="text-primary">•</span>
              <span>Rangos de signos vitales establecidos por instituciones médicas reconocidas</span>
            </li>
            <li class="flex gap-2">
              <span class="text-primary">•</span>
              <span>Protocolos de evaluación nutricional actualizados</span>
            </li>
          </ul>
        </VCardBody>
      </VCard>

      <!-- Disclaimer Card -->
      <VAlert color="warning" icon class="shadow-lg mb-6">
        <template #title>
          Descargo de responsabilidad médica
        </template>
        Esta herramienta es de apoyo para profesionales de la salud y NO reemplaza
        el juicio clínico ni el diagnóstico médico profesional. Los resultados deben
        interpretarse en el contexto de una evaluación integral del paciente. Siempre
        consulte con un profesional de la salud calificado para decisiones médicas.
      </VAlert>

      <!-- Version Info -->
      <div class="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>LPN Diagnósticos Virtual - Versión 1.0.0</p>
        <p class="mt-1">© 2026 Todos los derechos reservados</p>
      </div>
    </div>
  </div>
</template>
