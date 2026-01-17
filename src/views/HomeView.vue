<template>
  <div class="min-h-screen bg-base-200 flex justify-center items-start py-10">
    <div class="w-full max-w-6xl px-4 md:px-0 space-y-6">
      <!-- FILA 1: Datos del Paciente + Resultados -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Card Datos del Paciente -->
        <div class="lg:col-span-7">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Datos del Paciente
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Sexo -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-sm">Sexo</span>
                  </label>
                  <select class="select select-bordered select-sm bg-base-100">
                    <option>Femenino</option>
                    <option>Masculino</option>
                  </select>
                </div>
                <!-- Edad -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-sm">Edad</span>
                  </label>
                  <input type="text" class="input input-bordered input-sm bg-base-100" />
                </div>
                <!-- Peso actual -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-sm">Peso actual</span>
                  </label>
                  <div class="join w-full">
                    <input
                      type="text"
                      class="input input-bordered input-sm join-item flex-1 bg-base-100"
                      value="60"
                    />
                    <span class="join-item btn btn-sm btn-ghost border-base-300 bg-base-200"
                      >kg</span
                    >
                  </div>
                </div>
                <!-- Talla -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-sm">Talla</span>
                  </label>
                  <div class="join w-full">
                    <input
                      type="text"
                      class="input input-bordered input-sm join-item flex-1 bg-base-100"
                      value="1.50"
                    />
                    <span class="join-item btn btn-sm btn-ghost border-base-300 bg-base-200"
                      >mts</span
                    >
                  </div>
                </div>
              </div>
              <button class="btn btn-primary w-full mt-2 normal-case">Calcular</button>
            </div>
          </div>
        </div>
        <!-- Card Resultados -->
        <div class="lg:col-span-5">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Resultados
              </h2>
              <div class="overflow-x-auto">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th>Valor</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>IMC</td>
                      <td>26.7 kg/m²</td>
                      <td><span class="badge badge-warning">Sobrepeso</span></td>
                    </tr>
                    <tr>
                      <td>Peso saludable</td>
                      <td>45 – 60 kg</td>
                      <td><span class="badge badge-success">En rango</span></td>
                    </tr>
                    <tr>
                      <td>Glucosa</td>
                      <td>90 mg/dl</td>
                      <td><span class="badge badge-success">Normal</span></td>
                    </tr>
                    <tr>
                      <td>Presión arterial</td>
                      <td>130 / 85 mmHg</td>
                      <td><span class="badge badge-warning">Elevada</span></td>
                    </tr>
                    <tr>
                      <td>Colesterol</td>
                      <td>210 mg/dl</td>
                      <td><span class="badge badge-error">Alto</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FILA 2: Antropometría + Signos Vitales -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <!-- Antropometría -->
        <div class="lg:col-span-5">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Antropometría
              </h2>
              <div class="space-y-3">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">IMC</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Pliegue Cutáneo</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Perímetro Cintura</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Signos Vitales debajo de Antropometría -->
        <div class="lg:col-span-5 lg:col-start-1 mt-4">
          <div class="card bg-base-100 shadow-xl border border-base-300">
            <div class="card-body space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Signos Vitales
              </h2>
              <div class="space-y-3">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Frecuencia Cardíaca</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Presión Arterial</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Saturación de Oxígeno</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Presión Arterial</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span class="text-sm">Saturación de Oxígeno</span>
                  <input
                    type="text"
                    class="input input-bordered input-sm w-full md:w-48 bg-base-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
