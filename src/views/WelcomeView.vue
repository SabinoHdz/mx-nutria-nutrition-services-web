<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDiagnostics = () => {
  router.push('/diagnostics');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <div class="hero min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-4xl">
          <h1 class="text-5xl md:text-6xl font-bold text-primary mb-6">
            LPN Diagnósticos Virtual
          </h1>
          <p class="text-xl md:text-2xl text-gray-700 mb-4">
            Herramienta profesional para evaluación de indicadores de salud
          </p>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Calcula y analiza indicadores antropométricos y signos vitales de forma precisa y rápida.
            Obtén resultados inmediatos basados en estándares médicos reconocidos.
          </p>

          <button
            @click="goToDiagnostics"
            class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
            Comenzar Evaluación
          </button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 px-4 bg-base-100">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 text-primary">
          Indicadores Disponibles
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Antropometría Card -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-300">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 class="card-title text-lg">Antropometría</h3>
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
            </div>
          </div>

          <!-- Signos Vitales Card -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-300">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-error bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-error">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 class="card-title text-lg">Signos Vitales</h3>
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
            </div>
          </div>

          <!-- Resultados Instantáneos Card -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-300">
            <div class="card-body">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 bg-info bg-opacity-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-info">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 class="card-title text-lg">Análisis Inmediato</h3>
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
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center mt-16">
          <p class="text-lg text-gray-600 mb-6">
            Comienza a evaluar indicadores de salud de forma profesional
          </p>
          <button
            @click="goToDiagnostics"
            class="btn btn-primary btn-wide shadow-lg hover:shadow-xl transition-all"
          >
            Comenzar evaluación
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
