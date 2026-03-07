<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
  >
    <!-- Hero Section -->
    <VHero
      size="lg"
      variant="centered"
      background-gradient="from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
      <template #badge>
        <span
          class="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium uppercase tracking-wide text-white"
        >
          <VIcon name="diamond" size="sm" class="text-white" />
          Herramienta profesional gratuita
        </span>
      </template>

      <template #title>
        <span class="text-primary">LPN Diagnósticos Virtual</span>
      </template>

      <template #subtitle>
        Evaluación nutricional y clínica en segundos
      </template>

      <template #description>
        Calcula y clasifica indicadores antropométricos y signos vitales con diagnósticos automáticos
        basados en OMS, NOM, ADA y ACC/AHA. Diseñado para nutriólogos, médicos y estudiantes de
        ciencias de la salud.
      </template>

      <template #actions>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <VButton
            color="primary"
            variant="solid"
            size="lg"
            @click="goToDiagnostics"
            class="shadow-lg hover:shadow-xl transition-all"
          >
            <template #icon>
              <VIcon name="assignment" size="md" />
            </template>
            <span class="inline-flex items-center gap-2">
              Comenzar Evaluación
              <VIcon name="arrow_forward" size="sm" />
            </span>
          </VButton>
          <VButton
            color="primary"
            variant="outline"
            size="lg"
            @click="goToSupport"
            class="shadow-md hover:shadow-lg transition-all"
          >
            <template #icon>
              <VIcon name="folder" size="md" />
            </template>
            Soporte
          </VButton>
        </div>
      </template>
    </VHero>

    <!-- Info Banner -->
    <VBanner>
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div>
          <div class="text-3xl font-bold">12+</div>
          <div class="text-sm opacity-90">Indicadores clínicos</div>
        </div>
        <div>
          <div class="text-3xl font-bold">4</div>
          <div class="text-sm opacity-90">Estándares médicos</div>
        </div>
        <div>
          <div class="text-3xl font-bold">100%</div>
          <div class="text-sm opacity-90">Gratuito para profesionales</div>
        </div>
        <div>
          <div class="text-3xl font-bold">NOM</div>
          <div class="text-sm opacity-90">Basado en normas oficiales mexicanas</div>
        </div>
      </div>
    </VBanner>

    <!-- How it works -->
    <section class="w-full py-8 px-4 bg-surface dark:bg-gray-900">
      <div class="w-full max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center text-primary">¿Cómo funciona?</h2>
        <p class="text-center text-gray-600 dark:text-gray-300 mt-2 mb-12">
          4 pasos sencillos para obtener un diagnóstico clínico completo
        </p>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Step 01 -->
          <VCard variant="elevated" class="relative transition-shadow">
            <VCardBody>
              <div class="relative">
                <span
                  class="absolute top-0 right-0 text-5xl font-bold text-gray-200 dark:text-gray-600 select-none"
                  aria-hidden="true"
                >01</span>
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/15 text-primary"
                >
                  <VIcon name="description" size="lg" />
                </div>
                <h3 class="text-lg font-bold text-text-primary mb-2">Ingresa los datos del paciente</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Captura sexo, edad, peso y talla del paciente para inicializar la evaluación.
                </p>
              </div>
            </VCardBody>
          </VCard>
          <!-- Step 02 -->
          <VCard variant="elevated" class="relative transition-shadow">
            <VCardBody>
              <div class="relative">
                <span
                  class="absolute top-0 right-0 text-5xl font-bold text-gray-200 dark:text-gray-600 select-none"
                  aria-hidden="true"
                >02</span>
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-warning/20 text-warning"
                >
                  <VIcon name="monitor_weight" size="lg" />
                </div>
                <h3 class="text-lg font-bold text-text-primary mb-2">Registra medidas antropométricas</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Añade cintura, cadera y estatura para calcular IMC, ICE y riesgo cardiovascular.
                </p>
              </div>
            </VCardBody>
          </VCard>
          <!-- Step 03 -->
          <VCard variant="elevated" class="relative transition-shadow">
            <VCardBody>
              <div class="relative">
                <span
                  class="absolute top-0 right-0 text-5xl font-bold text-gray-200 dark:text-gray-600 select-none"
                  aria-hidden="true"
                >03</span>
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-error/15 text-error"
                >
                  <VIcon name="favorite" size="lg" />
                </div>
                <h3 class="text-lg font-bold text-text-primary mb-2">Captura signos vitales</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Ingresa FC, FR, temperatura, SpO2, presión arterial y glucosa capilar.
                </p>
              </div>
            </VCardBody>
          </VCard>
          <!-- Step 04 -->
          <VCard variant="elevated" class="relative transition-shadow">
            <VCardBody>
              <div class="relative">
                <span
                  class="absolute top-0 right-0 text-5xl font-bold text-gray-200 dark:text-gray-600 select-none"
                  aria-hidden="true"
                >04</span>
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-success/15 text-success"
                >
                  <VIcon name="bolt" size="lg" />
                </div>
                <h3 class="text-lg font-bold text-text-primary mb-2">Obtén el diagnóstico al instante</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Resultados con código de color, nivel de riesgo y referencia bibliográfica inmediata.
                </p>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <div class="flex justify-center mt-10">
          <VButton
            color="primary"
            variant="solid"
            size="lg"
            @click="goToDiagnostics"
            class="rounded-full shadow-lg px-8"
          >
            <span class="inline-flex items-center gap-2">
              Ir a Diagnósticos
              <VIcon name="arrow_forward" size="sm" />
            </span>
          </VButton>
        </div>
      </div>
    </section>

    <!-- Basado en Estándares Médicos -->
    <section class="w-full py-16 px-4 bg-surface dark:bg-gray-900">
      <div class="w-full max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center text-primary">Basado en Estándares Médicos</h2>
        <p class="text-center text-gray-600 dark:text-gray-300 mt-2 mb-12">
          Diagnósticos respaldados por las principales guías clínicas internacionales y nacionales
        </p>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <VCard variant="elevated" class="transition-shadow">
            <VCardBody>
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary text-white text-sm font-bold shrink-0"
              >
                OMS
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">Organización Mundial de la Salud</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                IMC, antropometría y signos vitales
              </p>
            </VCardBody>
          </VCard>
          <VCard variant="elevated" class="transition-shadow">
            <VCardBody>
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-accent text-white text-sm font-bold shrink-0"
              >
                NOM
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">Normas Oficiales Mexicanas</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                NOM-008, NOM-030, NOM-043
              </p>
            </VCardBody>
          </VCard>
          <VCard variant="elevated" class="transition-shadow">
            <VCardBody>
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-error text-white text-sm font-bold shrink-0"
              >
                ADA
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">American Diabetes Association</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Glucosa y diagnóstico de diabetes
              </p>
            </VCardBody>
          </VCard>
          <VCard variant="elevated" class="transition-shadow">
            <VCardBody>
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-warning text-white text-sm font-bold shrink-0"
              >
                CC/AH
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">Sociedad Americana de Cardiología</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Clasificación de hipertensión arterial
              </p>
            </VCardBody>
          </VCard>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <div class="py-4 px-4 bg-surface dark:bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-primary">Indicadores Disponibles</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Antropometría Card -->
          <VCard variant="elevated" hoverable class="transition-shadow">
            <VCardBody>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-primary"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <VCardTitle class="text-lg">Antropometría</VCardTitle>
              </div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Índice de Masa Corporal (IMC)
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Circunferencia de Cintura
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Circunferencia de Cadera
                </li>
              </ul>
            </VCardBody>
          </VCard>

          <!-- Signos Vitales Card -->
          <VCard variant="elevated" hoverable class="transition-shadow">
            <VCardBody>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-error"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <VCardTitle class="text-lg">Signos Vitales</VCardTitle>
              </div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Frecuencia Cardíaca
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Frecuencia Respiratoria
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Temperatura Corporal
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Saturación de Oxígeno
                </li>
              </ul>
            </VCardBody>
          </VCard>

          <!-- Resultados Instantáneos Card -->
          <VCard variant="elevated" hoverable class="transition-shadow">
            <VCardBody>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-info"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <VCardTitle class="text-lg">Análisis Inmediato</VCardTitle>
              </div>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Resultados en tiempo real
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Clasificación automática
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Alertas médicas visuales
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span> Rangos estandarizados
                </li>
              </ul>
            </VCardBody>
          </VCard>
        </div>

        <!-- CTA Section -->
        <div class="text-center my-8">
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Comienza a evaluar indicadores de salud de forma profesional
          </p>
          <VButton
            color="primary"
            wide
            @click="goToDiagnostics"
            class="shadow-lg hover:shadow-xl transition-all"
          >
            Comenzar evaluación
          </VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { VHero } from '@/components/ui/hero';
import { VBanner } from '@/components/ui/banner';
import { VButton } from '@/components/ui/button';
import { VIcon } from '@/components/ui/icon';
import { VCard, VCardBody, VCardTitle } from '@/components/ui/card';

const router = useRouter();

const goToDiagnostics = () => {
  router.push('/diagnostics');
};

const goToSupport = () => {
  router.push('/support');
};
</script>
