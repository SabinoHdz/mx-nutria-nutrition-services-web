<template>
  <div class="min-h-screen bg-background dark:bg-gray-900 flex justify-center items-start py-10">
    <div class="w-full max-w-6xl px-4 md:px-0">
      <!-- Grid Masonry: Organización optimizada de cards -->
      <div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 items-start">
        <!-- Card Datos del Paciente -->
        <div class="md:col-span-6 lg:col-span-7">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Datos del Paciente
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Sexo -->
                <VSelect
                  v-model="formData.gender"
                  label="Sexo"
                  :options="genderOptions"
                  placeholder="Seleccionar..."
                  clearable
                  required
                />
                <!-- Edad -->

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
                <!-- Peso actual -->
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
                <!-- Talla -->
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
              <!-- Botones -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <VButton
                  color="primary"
                  full-width
                  @click.prevent="handleSubmit"
                  :disabled="!isFormValid"
                >
                  Calcular
                </VButton>
                <VButton variant="outline" full-width @click="clearForm"> Limpiar </VButton>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Resultados -->
        <div class="md:col-span-6 lg:col-span-5">
          <VCard variant="elevated" shadow bordered>
            <VCardBody>
              <div class="flex justify-between items-center border-b border-base-300 pb-2">
                <h2 class="text-primary font-semibold text-lg">Resultados</h2>
                <VButton
                  size="sm"
                  color="primary"
                  :disabled="isDownloadingResultadosPdf"
                  @click="handleDownloadResultadosPdf"
                >
                  {{ isDownloadingResultadosPdf ? 'Generando…' : 'Descargar' }}
                </VButton>
              </div>
              <VTable size="sm">
                <thead>
                  <tr>
                    <th>Indicador</th>
                    <th>Valor</th>
                    <th>Diagnóstico</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Antropometría -->
                  <tr>
                    <td>IMC</td>
                    <td>
                      {{ antropomentric.imc || '-' }}
                      <span
                        v-if="antropomentric.imc"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >kg/m²</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          antropomentric.imcStatus === 'Pendiente' || !antropomentric.imcStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="antropomentric.imcColor || 'primary'"
                      >
                        {{ antropomentric.imcStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>Cintura</td>
                    <td>
                      {{ antropomentric.waistCircumference || '-' }}
                      <span
                        v-if="antropomentric.waistCircumference"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >cm</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          antropomentric.waistStatus === 'Pendiente' || !antropomentric.waistStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="antropomentric.waistColor || 'primary'"
                      >
                        {{ antropomentric.waistStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>Cadera</td>
                    <td>
                      {{ antropomentric.hipCircumference || '-' }}
                      <span
                        v-if="antropomentric.hipCircumference"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >cm</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          antropomentric.hipStatus === 'Pendiente' || !antropomentric.hipStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="antropomentric.hipColor || 'primary'"
                      >
                        {{ antropomentric.hipStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <!-- Signos Vitales -->
                  <tr>
                    <td>Frec. Cardíaca</td>
                    <td>
                      {{ signalVital.heartRate || '-' }}
                      <span
                        v-if="signalVital.heartRate"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >lpm</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          signalVital.heartRateStatus === 'Pendiente' ||
                          !signalVital.heartRateStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="signalVital.heartRateColor || 'primary'"
                      >
                        {{ signalVital.heartRateStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>Frec. Respiratoria</td>
                    <td>
                      {{ signalVital.respiratoryRate || '-' }}
                      <span
                        v-if="signalVital.respiratoryRate"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >x Min</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          signalVital.respiratoryRateStatus === 'Pendiente' ||
                          !signalVital.respiratoryRateStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="signalVital.respiratoryRateColor || 'primary'"
                      >
                        {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr>
                    <td>Temperatura</td>
                    <td>
                      {{ signalVital.temperature || '-' }}
                      <span
                        v-if="signalVital.temperature"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >°C</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          signalVital.temperatureStatus === 'Pendiente' ||
                          !signalVital.temperatureStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="signalVital.temperatureColor || 'primary'"
                      >
                        {{ signalVital.temperatureStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr v-if="signalVital.temperatureAlert">
                    <td colspan="3">
                      <VAlert
                        :color="signalVital.temperatureAlertColor || 'warning'"
                        variant="soft"
                        size="sm"
                      >
                        {{ signalVital.temperatureAlert }}
                      </VAlert>
                    </td>
                  </tr>
                  <tr>
                    <td>Sat. Oxígeno</td>
                    <td>
                      {{ signalVital.oxygenSaturation || '-' }}
                      <span
                        v-if="signalVital.oxygenSaturation"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >%</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          signalVital.oxygenSaturationStatus === 'Pendiente' ||
                          !signalVital.oxygenSaturationStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="signalVital.oxygenSaturationColor || 'primary'"
                      >
                        {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr v-if="signalVital.oxygenSaturationAlert">
                    <td colspan="3">
                      <VAlert
                        :color="signalVital.oxygenSaturationAlertColor || 'error'"
                        variant="soft"
                        size="sm"
                      >
                        {{ signalVital.oxygenSaturationAlert }}
                      </VAlert>
                    </td>
                  </tr>
                  <tr>
                    <td>Presión arterial</td>
                    <td>
                      {{ signalVital.systolic ?? '-' }}/{{ signalVital.diastolic ?? '-' }}
                      <span
                        v-if="signalVital.systolic != null && signalVital.diastolic != null"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >mmHg</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          signalVital.bloodPressureStatus === 'Pendiente' ||
                          !signalVital.bloodPressureStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="signalVital.bloodPressureColor || 'primary'"
                      >
                        {{ signalVital.bloodPressureStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr v-if="signalVital.bloodPressureComment">
                    <td colspan="3">
                      <VAlert
                        :color="signalVital.bloodPressureCommentColor || 'warning'"
                        variant="soft"
                        size="sm"
                      >
                        {{ signalVital.bloodPressureComment }}
                      </VAlert>
                    </td>
                  </tr>
                  <tr>
                    <td>Glucosa</td>
                    <td>
                      {{ signalVital.glucose || '-' }}
                      <span
                        v-if="signalVital.glucose"
                        class="text-xs text-gray-500 dark:text-gray-400"
                        >mg/dl</span
                      >
                    </td>
                    <td>
                      <VBadge
                        size="sm"
                        :variant="
                          signalVital.glucoseStatus === 'Pendiente' || !signalVital.glucoseStatus
                            ? 'ghost'
                            : 'solid'
                        "
                        :color="signalVital.glucoseColor || 'primary'"
                      >
                        {{ signalVital.glucoseStatus || 'Pendiente' }}
                      </VBadge>
                    </td>
                  </tr>
                  <tr v-if="signalVital.glucoseAlert">
                    <td colspan="3">
                      <VAlert
                        :color="signalVital.glucoseAlertColor || 'warning'"
                        variant="soft"
                        size="sm"
                      >
                        {{ signalVital.glucoseAlert }}
                      </VAlert>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Peso Saludable -->
        <div class="md:col-span-3 lg:col-span-3">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Peso Saludable
              </h2>
              <div class="space-y-3">
                <!-- Peso máximo -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Peso máximo</span
                  >
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ healthyWeight.max || '-' }}
                    </span>
                    <span class="text-sm text-gray-500">Kg</span>
                  </div>
                </div>
                <!-- Peso mínimo -->
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >Peso mínimo</span
                  >
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{ healthyWeight.min || '-' }}
                    </span>
                    <span class="text-sm text-gray-500">Kg</span>
                  </div>
                </div>

                <!-- Gasto Energético Basal -->
                <h3
                  class="text-primary font-semibold text-base border-b border-base-300 pb-1 pt-1"
                >
                  Gasto Energético Basal
                </h3>
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {{ basalEnergyExpenditure.method }}
                    </span>
                    <div class="flex items-center gap-2">
                      <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {{ basalEnergyExpenditure.value != null ? basalEnergyExpenditure.value : '—' }}
                      </span>
                      <span class="text-sm text-gray-500">Kcal/Día</span>
                    </div>
                  </div>
                </div>

                <!-- Requerimiento hídrico -->
                <div class="space-y-1">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Requerimiento hídrico
                  </span>
                  <!--<p class="text-xs text-gray-500 dark:text-gray-400">Peso (kg) × 30 a 35 ml</p> -->
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {{
                        hydrationRequirement.min != null && hydrationRequirement.max != null
                          ? `${hydrationRequirement.min} a ${hydrationRequirement.max}`
                          : '—'
                      }}
                    </span>
                    <span
                      v-if="hydrationRequirement.min != null"
                      class="text-sm text-gray-500"
                    >
                    Kg/ml
                    </span>
                  </div>
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Antropometría -->
        <div class="md:col-span-3 lg:col-span-4">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Antropometría
              </h2>
              <div class="space-y-3">
                <!-- IMC con unidades y estado -->
                <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
                  <span class="text-sm">IMC</span>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full"
                    v-model="antropomentric.imc"
                    placeholder="0.00"
                    suffix="kg/m²"
                    disabled
                  />
                  <VBadge
                    size="sm"
                    :variant="
                      antropomentric.imcStatus === 'Pendiente' || !antropomentric.imcStatus
                        ? 'ghost'
                        : 'solid'
                    "
                    :color="antropomentric.imcColor || 'primary'"
                    class="whitespace-nowrap justify-self-end"
                  >
                    {{ antropomentric.imcStatus || 'Pendiente' }}
                  </VBadge>
                </div>

                <!-- Circunferencia de cintura -->
                <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
                  <span class="text-sm">Cintura</span>
                  <VInput
                    type="decimal"
                    size="sm"
                    class="w-full"
                    v-model="antropomentric.waistCircumference"
                    :max="600"
                    :min="1"
                    :integer-digits="3"
                    :decimal-places="1"
                    :placeholder="!!formData.gender ? 'Ej: 64' : ''"
                    :disabled="!formData.gender"
                    suffix="cm"
                  />
                  <VBadge
                    size="sm"
                    :variant="
                      antropomentric.waistStatus === 'Pendiente' || !antropomentric.waistStatus
                        ? 'ghost'
                        : 'solid'
                    "
                    :color="antropomentric.waistColor || 'primary'"
                    class="whitespace-nowrap justify-self-end"
                  >
                    {{ antropomentric.waistStatus || 'Pendiente' }}
                  </VBadge>
                </div>

                <!-- Circunferencia de cadera -->
                <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
                  <span class="text-sm">Cadera</span>
                  <VInput
                    type="decimal"
                    size="sm"
                    class="w-full"
                    v-model="antropomentric.hipCircumference"
                    :max="600"
                    :min="1"
                    :integer-digits="3"
                    :decimal-places="1"
                    :placeholder="!!formData.gender ? 'Ej: 75' : ''"
                    :disabled="!formData.gender"
                    suffix="cm"
                  />
                  <VBadge
                    size="sm"
                    :variant="
                      antropomentric.hipStatus === 'Pendiente' || !antropomentric.hipStatus
                        ? 'ghost'
                        : 'solid'
                    "
                    :color="antropomentric.hipColor || 'primary'"
                    class="whitespace-nowrap justify-self-end"
                  >
                    {{ antropomentric.hipStatus || 'Pendiente' }}
                  </VBadge>
                </div>

                <div class="pt-1">
                  <span class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                    Índice Cintura/Estatura
                  </span>
                </div>

                <!-- Índice cintura/estatura (ICE) -->
                <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
                  <span class="text-sm">Cintura</span>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full"
                    :model-value="antropomentric.waistInCm"
                    placeholder="-"
                    suffix="cm"
                    disabled
                    label=""
                  />
                  <div></div>
                </div>

                <div class="grid grid-cols-[80px_120px_auto] items-center gap-1">
                  <span class="text-sm">Estatura</span>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full"
                    :model-value="antropomentric.heightInCm"
                    placeholder="-"
                    suffix="cm"
                    disabled
                    label=""
                  />
                  <div></div>
                </div>

                <div class="pt-2 border-t border-base-300">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Diagnóstico Índice Cintura/Estatura</span>
                    <VBadge
                      size="sm"
                      :variant="
                        antropomentric.waistHeightStatus === 'Pendiente' ||
                        !antropomentric.waistHeightStatus
                          ? 'ghost'
                          : 'solid'
                      "
                      :color="antropomentric.waistHeightColor || 'primary'"
                      class="whitespace-nowrap"
                    >
                      {{ antropomentric.waistHeightStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
        <!-- Card Índice Cintura/Estatura (comentada por referencia) -->
        <!--
        <div class="md:col-span-3 lg:col-span-5">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Índice Cintura/Estatura
              </h2>
              <div class="space-y-3">
                <div class="grid grid-cols-[100px_120px_auto] items-center gap-1">
                  <span class="text-sm">Cintura</span>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full"
                    :model-value="antropomentric.waistInCm"
                    placeholder="-"
                    suffix="cm"
                    disabled
                    label=""
                  />
                  <div></div>
                </div>

                <div class="grid grid-cols-[100px_120px_auto] items-center gap-1">
                  <span class="text-sm">Estatura</span>
                  <VInput
                    type="text"
                    size="sm"
                    class="w-full"
                    :model-value="antropomentric.heightInCm"
                    placeholder="-"
                    suffix="cm"
                    disabled
                    label=""
                  />
                  <div></div>
                </div>

                <div class="pt-2 border-t border-base-300">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Diagnóstico</span>
                    <VBadge
                      size="sm"
                      :variant="(antropomentric.waistHeightStatus === 'Pendiente' || !antropomentric.waistHeightStatus) ? 'ghost' : 'solid'"
                      :color="antropomentric.waistHeightColor || 'primary'"
                      class="whitespace-nowrap"
                    >
                      {{ antropomentric.waistHeightStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
        -->
        <!-- Card Signos Vitales -->
        <div class="md:col-span-6 lg:col-span-5">
          <VCard variant="elevated" shadow bordered>
            <VCardBody class="space-y-4">
              <h2 class="text-primary font-semibold text-lg border-b border-base-300 pb-2">
                Signos Vitales
              </h2>
              <div class="space-y-3">
                <!-- Presión arterial: Sistólica y Diastólica -->
                <div class="space-y-2">
                  <div
                    class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
                  >
                    <span class="text-sm">Presión arterial</span>
                    <div class="flex items-end gap-2 flex-wrap">
                      <VInput
                        label="Sis"
                        type="number"
                        size="sm"
                        class="w-full min-w-[100px] max-w-[130px]"
                        v-model="signalVital.systolic"
                        :max="300"
                        :min="1"
                        :maxlength="3"
                        placeholder="Ej: 120"
                        suffix="mmHg"
                      />
                      <span class="text-gray-500 dark:text-gray-400 font-medium shrink-0 pb-1"
                        >/</span
                      >
                      <VInput
                        label="Dia"
                        type="number"
                        size="sm"
                        class="w-full min-w-[100px] max-w-[130px]"
                        v-model="signalVital.diastolic"
                        :max="200"
                        :min="1"
                        :maxlength="3"
                        placeholder="Ej: 80"
                        suffix="mmHg"
                      />
                    </div>
                    <VBadge
                      size="sm"
                      :variant="
                        signalVital.bloodPressureStatus === 'Pendiente' ||
                        !signalVital.bloodPressureStatus
                          ? 'ghost'
                          : 'solid'
                      "
                      :color="signalVital.bloodPressureColor || 'primary'"
                      class="whitespace-nowrap"
                    >
                      {{ signalVital.bloodPressureStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                  <VAlert
                    v-if="signalVital.bloodPressureComment"
                    :color="signalVital.bloodPressureCommentColor || 'warning'"
                    variant="soft"
                    size="sm"
                  >
                    {{ signalVital.bloodPressureComment }}
                  </VAlert>
                </div>

                <!-- Frecuencia cardíaca con unidades y estado -->
                <div
                  class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
                >
                  <span class="text-sm">Frecuencia cardíaca</span>
                  <VInput
                    type="number"
                    size="sm"
                    class="w-full"
                    v-model="signalVital.heartRate"
                    :max="500"
                    :min="0"
                    :maxlength="3"
                    :placeholder="'Ej: 75'"
                    suffix="Pul/min"
                    @input="validateHeartRateInteger"
                  />
                  <VBadge
                    size="sm"
                    :variant="
                      signalVital.heartRateStatus === 'Pendiente' || !signalVital.heartRateStatus
                        ? 'ghost'
                        : 'solid'
                    "
                    :color="signalVital.heartRateColor || 'primary'"
                    class="whitespace-nowrap"
                  >
                    {{ signalVital.heartRateStatus || 'Pendiente' }}
                  </VBadge>
                </div>

                <!-- Frecuencia respiratoria con unidades y estado -->
                <div
                  class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
                >
                  <span class="text-sm">Frecuencia respiratoria</span>
                  <VInput
                    type="number"
                    size="sm"
                    class="w-full"
                    v-model="signalVital.respiratoryRate"
                    :max="100"
                    :min="0"
                    :maxlength="2"
                    :placeholder="'Ej: 15'"
                    suffix="x Min"
                    @input="validateRespiratoryRateInteger"
                  />
                  <VBadge
                    size="sm"
                    :variant="
                      signalVital.respiratoryRateStatus === 'Pendiente' ||
                      !signalVital.respiratoryRateStatus
                        ? 'ghost'
                        : 'solid'
                    "
                    :color="signalVital.respiratoryRateColor || 'primary'"
                    class="whitespace-nowrap"
                  >
                    {{ signalVital.respiratoryRateStatus || 'Pendiente' }}
                  </VBadge>
                </div>

                <!-- Temperatura con unidades y estado -->
                <div class="space-y-2">
                  <div
                    class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
                  >
                    <span class="text-sm">Temperatura</span>
                    <VInput
                      type="decimal"
                      size="sm"
                      class="w-full"
                      v-model="signalVital.temperature"
                      :max="100"
                      :min="0"
                      :integer-digits="2"
                      :decimal-places="1"
                      :placeholder="'Ej: 20.6'"
                      suffix="°C"
                      @input="validateHeartRateInteger"
                    />
                    <VBadge
                      size="sm"
                      :variant="
                        signalVital.temperatureStatus === 'Pendiente' ||
                        !signalVital.temperatureStatus
                          ? 'ghost'
                          : 'solid'
                      "
                      :color="signalVital.temperatureColor || 'primary'"
                      class="whitespace-nowrap"
                    >
                      {{ signalVital.temperatureStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                  <!-- Alerta de fiebre -->
                  <VAlert
                    v-if="signalVital.temperatureAlert"
                    :color="signalVital.temperatureAlertColor || 'warning'"
                    variant="soft"
                    size="sm"
                  >
                    {{ signalVital.temperatureAlert }}
                  </VAlert>
                </div>

                <!-- Saturación de oxígeno con unidades y estado -->
                <div class="space-y-2">
                  <div
                    class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
                  >
                    <span class="text-sm">Saturación de oxígeno</span>
                    <VInput
                      type="number"
                      size="sm"
                      class="w-full"
                      v-model="signalVital.oxygenSaturation"
                      :max="100"
                      :min="0"
                      :maxlength="2"
                      :placeholder="'Ej: 75'"
                      suffix="%"
                      @input="validateOxygenSaturationInteger"
                    />
                    <VBadge
                      size="sm"
                      :variant="
                        signalVital.oxygenSaturationStatus === 'Pendiente' ||
                        !signalVital.oxygenSaturationStatus
                          ? 'ghost'
                          : 'solid'
                      "
                      :color="signalVital.oxygenSaturationColor || 'primary'"
                      class="whitespace-nowrap"
                    >
                      {{ signalVital.oxygenSaturationStatus || 'Pendiente' }}
                    </VBadge>
                  </div>
                  <!-- Alerta de emergencia médica -->
                  <VAlert
                    v-if="signalVital.oxygenSaturationAlert"
                    :color="signalVital.oxygenSaturationAlertColor || 'error'"
                    variant="soft"
                    size="sm"
                  >
                    {{ signalVital.oxygenSaturationAlert }}
                  </VAlert>
                </div>

                <!-- Glucosa capilar con unidades y estado -->
                <div class="space-y-2">
                  <div
                    class="grid grid-cols-1 md:grid-cols-[minmax(140px,max-content)_minmax(110px,150px)_minmax(85px,max-content)] lg:grid-cols-[minmax(140px,max-content)_150px_minmax(85px,max-content)] items-center gap-2 md:gap-x-3"
                  >
                    <span class="text-sm">Glucosa capilar</span>
                    <VInput
                      type="number"
                      size="sm"
                      class="w-full"
                      v-model="signalVital.glucose"
                      :max="500"
                      :min="0"
                      :maxlength="3"
                      :placeholder="'Ej: 90'"
                      suffix="mg/dl"
                    />
                    <VBadge
                      size="sm"
                      :variant="
                        signalVital.glucoseStatus === 'Pendiente' || !signalVital.glucoseStatus
                          ? 'ghost'
                          : 'solid'
                      "
                      :color="signalVital.glucoseColor || 'primary'"
                      class="whitespace-nowrap"
                    >
                      {{ signalVital.glucoseStatus || 'Pendiente' }}
                    </VBadge>
                  </div>

                  <div v-if="shouldAskGlucose" class="rounded-md border border-base-300 p-2">
                    <p class="text-xs text-gray-600 dark:text-gray-300">
                      ¿Ha comido algún alimento el paciente durante las últimas dos horas?
                    </p>
                    <div class="mt-2 flex flex-wrap items-center gap-2">
                      <VButton
                        size="sm"
                        :variant="glucoseAteRecently === true ? 'solid' : 'outline'"
                        color="primary"
                        @click="setGlucoseAnswer(true)"
                      >
                        SI
                      </VButton>
                      <VButton
                        size="sm"
                        :variant="glucoseAteRecently === false ? 'solid' : 'outline'"
                        color="primary"
                        @click="setGlucoseAnswer(false)"
                      >
                        NO
                      </VButton>
                      <VButton
                        v-if="glucoseAteRecently !== null"
                        size="sm"
                        variant="outline"
                        @click="resetGlucoseAnswer"
                      >
                        Cambiar respuesta
                      </VButton>
                    </div>
                  </div>

                  <VAlert
                    v-if="signalVital.glucoseAlert"
                    :color="signalVital.glucoseAlertColor || 'warning'"
                    variant="soft"
                    size="sm"
                  >
                    {{ signalVital.glucoseAlert }}
                  </VAlert>
                </div>
              </div>
            </VCardBody>
          </VCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VCard, VCardBody } from '@/components/ui/card';
import { VButton } from '@/components/ui/button';
import { VSelect } from '@/components/ui/select';
import { VBadge } from '@/components/ui/badge';
import { VAlert } from '@/components/ui/alert';
import { VInput } from '@/components/ui/input';
import { VTable } from '@/components/ui/table';
import type { AntropometricData, SignalVital, Patient, ResultPatient } from '@/types';
import type { ValueLabel } from '@/types/Common';
import { downloadDiagnosticoResultadosPdf } from '@/utils/pdf';
import { ref, computed, onMounted, watch } from 'vue';
import { useHealthIndicators } from '@/composables/useHealthIndicators';

// Composable de indicadores de salud
const {
  calculateImc,
  getWaistStatus,
  getHipStatus,
  getWaistHipRatio,
  getWaistHeightRatio,
  getHeartRateStatus,
  getRespiratoryRateStatus,
  getOxygenSaturationStatus,
  getTemperatureStatus,
  getGlucoseStatus,
  getBloodPressureStatus,
} = useHealthIndicators();

const results = ref<ResultPatient>({});
const antropomentric = ref<AntropometricData>({});
const signalVital = ref<SignalVital>({});
const genderOptions: ValueLabel[] = [
  {
    value: 'MALE',
    label: 'Masculino',
  },
  {
    value: 'FEMALE',
    label: 'Femenino',
  },
];

const isDark = ref(false);
const isDownloadingResultadosPdf = ref(false);
const glucoseAteRecently = ref<boolean | null>(null);

async function handleDownloadResultadosPdf() {
  isDownloadingResultadosPdf.value = true;
  try {
    await downloadDiagnosticoResultadosPdf({
      patient: formData.value,
      antropometric: antropomentric.value,
      signalVital: signalVital.value,
      healthyWeight: healthyWeight.value,
      basalEnergyExpenditure: basalEnergyExpenditure.value,
      hydrationRequirement: hydrationRequirement.value,
    });
  } finally {
    isDownloadingResultadosPdf.value = false;
  }
}
const createDefaultFormData = (): Patient => {
  return {
    age: null,
    height: null,
    weight: null,
    gender: null,
  };
};
const formData = ref<Patient>(createDefaultFormData());

const isFormValid = computed(() => {
  return (Object.keys(formData.value) as Array<keyof Patient>).every(
    (field) => !!formData.value[field],
  );
});

const shouldAskGlucose = computed(() => {
  const glucoseValue = Number(signalVital.value.glucose);
  return glucoseValue >= 100 && glucoseValue <= 125;
});

const healthyWeight = computed(() => {
  const height = formData.value.height ?? 0;
  if (!height || height <= 0) {
    return { min: null, max: null } as const;
  }

  const min = 18.5 * height * height;
  const max = 24.9 * height * height;

  return {
    min: min.toFixed(1),
    max: max.toFixed(1),
  } as const;
});

type BasalMethod = 'Harris Benedict' | 'Mifflin-St. Jeor';
const basalEnergyExpenditure = computed<{
  method: BasalMethod;
  value: number | null;
}>(() => {
  const age = formData.value.age ?? 0;
  const weight = formData.value.weight ?? 0;
  const heightM = formData.value.height ?? 0;
  const gender = formData.value.gender as 'MALE' | 'FEMALE' | null;
  const imcStatus = antropomentric.value.imcStatus || 'Pendiente';

  const hasData = age > 0 && weight > 0 && heightM > 0 && !!gender;
  if (!hasData || imcStatus === 'Pendiente') {
    return { method: 'Harris Benedict', value: null };
  }

  const heightCm = heightM * 100;

  if (imcStatus === 'Normal' || imcStatus === 'Desnutrición') {
    const value =
      gender === 'MALE'
        ? 66.5 + 13.75 * weight + 5 * heightCm - 6.78 * age
        : 655 + 9.6 * weight + 1.95 * heightCm - 4.68 * age;
    return { method: 'Harris Benedict', value: Math.round(value) };
  }

  if (
    imcStatus === 'Sobrepeso' ||
    imcStatus === 'Obesidad I' ||
    imcStatus === 'Obesidad II' ||
    imcStatus === 'Obesidad Mórbida'
  ) {
    const value =
      gender === 'MALE'
        ? 10 * weight + 6.25 * heightCm - 5 * age + 5
        : 10 * weight + 6.25 * heightCm - 5 * age - 161;
    return { method: 'Mifflin-St. Jeor', value: Math.round(value) };
  }

  return { method: 'Harris Benedict', value: null };
});

const hydrationRequirement = computed<{ min: number | null; max: number | null }>(() => {
  const weight = formData.value.weight ?? 0;
  if (!weight || weight <= 0) {
    return { min: null, max: null };
  }
  return {
    min: Math.round(weight * 30),
    max: Math.round(weight * 35),
  };
});

function handleSubmit() {
  const weight = formData.value.weight ?? 0;
  const height = formData.value.height ?? 0;
  const gender = formData.value.gender as 'MALE' | 'FEMALE';

  // Calcular IMC usando el composable
  const imcResult = calculateImc(weight, height);
  if (imcResult) {
    results.value.imc = imcResult.formatted;
    antropomentric.value.imc = imcResult.formatted;
    antropomentric.value.imcStatus = imcResult.status?.status || 'Pendiente';
    antropomentric.value.imcColor = imcResult.status?.color ?? undefined;
  }

  // Calcular índice cintura-cadera
  const waist = Number(antropomentric.value.waistCircumference) || 0;
  const hip = Number(antropomentric.value.hipCircumference) || 0;
  if (waist > 0 && hip > 0 && gender) {
    const iccResult = getWaistHipRatio(waist, hip, gender);
    if (iccResult) {
      antropomentric.value.hipStatus = iccResult.status?.status || 'Pendiente';
      antropomentric.value.hipColor = iccResult.status?.color ?? undefined;
    }
  }
}

// Watcher para calcular el estado de cintura en tiempo real
watch(
  () => antropomentric.value.waistCircumference,
  (newWaist) => {
    if (!newWaist || newWaist === '' || Number(newWaist) <= 0) {
      antropomentric.value.waistStatus = 'Pendiente';
      antropomentric.value.waistColor = undefined;
    } else {
      const waistValue = Number(newWaist);
      const gender = formData.value.gender as 'MALE' | 'FEMALE';

      if (gender) {
        const waistStatus = getWaistStatus(waistValue, gender);
        antropomentric.value.waistStatus = waistStatus?.status || 'Pendiente';
        antropomentric.value.waistColor = waistStatus?.color ?? undefined;
      }
    }
  },
);

// Watcher para calcular el estado de cadera en tiempo real
watch(
  () => antropomentric.value.hipCircumference,
  (newHip) => {
    if (!newHip || newHip === '' || Number(newHip) <= 0) {
      antropomentric.value.hipStatus = 'Pendiente';
      antropomentric.value.hipColor = undefined;
    } else {
      const hipValue = Number(newHip);
      const gender = formData.value.gender as 'MALE' | 'FEMALE';

      if (gender) {
        const hipStatus = getHipStatus(hipValue, gender);
        antropomentric.value.hipStatus = hipStatus?.status || 'Pendiente';
        antropomentric.value.hipColor = hipStatus?.color ?? undefined;
      }
    }
  },
);

// Watcher para calcular el índice cintura/estatura en tiempo real
watch(
  [() => antropomentric.value.waistCircumference, () => formData.value.height],
  ([newWaist, newHeight]) => {
    // Convertir cintura a cm (si existe)
    const waistValue = Number(newWaist) || 0;
    if (waistValue > 0) {
      antropomentric.value.waistInCm = waistValue.toFixed(1);
    } else {
      antropomentric.value.waistInCm = undefined;
    }

    // Convertir estatura a cm (de metros a centímetros)
    const heightValue = Number(newHeight) || 0;
    if (heightValue > 0) {
      const heightInCm = heightValue * 100;
      antropomentric.value.heightInCm = heightInCm.toFixed(1);

      // Calcular índice cintura/estatura si ambos valores existen
      if (waistValue > 0) {
        const iceResult = getWaistHeightRatio(waistValue, heightInCm);
        if (iceResult) {
          antropomentric.value.waistHeightRatio = iceResult.ratio;
          antropomentric.value.waistHeightStatus = iceResult.status?.status || 'Pendiente';
          antropomentric.value.waistHeightColor = iceResult.status?.color ?? undefined;
        }
      } else {
        antropomentric.value.waistHeightStatus = 'Pendiente';
        antropomentric.value.waistHeightColor = undefined;
      }
    } else {
      antropomentric.value.heightInCm = undefined;
      antropomentric.value.waistHeightStatus = 'Pendiente';
      antropomentric.value.waistHeightColor = undefined;
    }
  },
);

// Función para validar que heartRate sea entero
function validateHeartRateInteger(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  // Permitir solo números enteros, eliminar decimales
  if (value.includes('.') || value.includes(',')) {
    signalVital.value.heartRate = Math.floor(Number(value));
  }
}

// Función para validar que respiratoryRate sea entero
function validateRespiratoryRateInteger(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  // Permitir solo números enteros, eliminar decimales
  if (value.includes('.') || value.includes(',')) {
    signalVital.value.respiratoryRate = Math.floor(Number(value));
  }
}

// Función para validar que oxygenSaturation sea entero
function validateOxygenSaturationInteger(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  // Permitir solo números enteros, eliminar decimales
  if (value.includes('.') || value.includes(',')) {
    signalVital.value.oxygenSaturation = Math.floor(Number(value));
  }
}

function updateGlucoseStatus() {
  const glucoseValue = Number(signalVital.value.glucose);
  if (!glucoseValue || glucoseValue <= 0) {
    signalVital.value.glucoseStatus = 'Pendiente';
    signalVital.value.glucoseColor = undefined;
    signalVital.value.glucoseAlert = undefined;
    signalVital.value.glucoseAlertColor = undefined;
    return;
  }

  const glucoseStatus = getGlucoseStatus(glucoseValue, glucoseAteRecently.value);
  signalVital.value.glucoseStatus = glucoseStatus?.status || 'Pendiente';
  signalVital.value.glucoseColor = glucoseStatus?.color ?? undefined;
  signalVital.value.glucoseAlert = glucoseStatus?.alert;
  signalVital.value.glucoseAlertColor = glucoseStatus?.color;
}

function setGlucoseAnswer(value: boolean) {
  glucoseAteRecently.value = value;
  updateGlucoseStatus();
}

function resetGlucoseAnswer() {
  glucoseAteRecently.value = null;
  updateGlucoseStatus();
}

// Watcher para calcular el estado de frecuencia cardíaca en tiempo real
watch(
  () => signalVital.value.heartRate,
  (newHeartRate) => {
    if (!newHeartRate || newHeartRate === '' || Number(newHeartRate) <= 0) {
      signalVital.value.heartRateStatus = 'Pendiente';
      signalVital.value.heartRateColor = undefined;
    } else {
      const heartRateValue = Math.floor(Number(newHeartRate)); // Asegurar que sea entero
      const heartRateStatus = getHeartRateStatus(heartRateValue);
      signalVital.value.heartRateStatus = heartRateStatus?.status || 'Pendiente';
      signalVital.value.heartRateColor = heartRateStatus?.color ?? undefined;
    }
  },
);

// Watcher para calcular el estado de frecuencia respiratoria en tiempo real
watch(
  () => signalVital.value.respiratoryRate,
  (newRespiratoryRate) => {
    if (!newRespiratoryRate || newRespiratoryRate === '' || Number(newRespiratoryRate) <= 0) {
      signalVital.value.respiratoryRateStatus = 'Pendiente';
      signalVital.value.respiratoryRateColor = undefined;
    } else {
      const respiratoryRateValue = Math.floor(Number(newRespiratoryRate)); // Asegurar que sea entero
      const respiratoryRateStatus = getRespiratoryRateStatus(respiratoryRateValue);
      signalVital.value.respiratoryRateStatus = respiratoryRateStatus?.status || 'Pendiente';
      signalVital.value.respiratoryRateColor = respiratoryRateStatus?.color ?? undefined;
    }
  },
);

// Watcher para calcular el estado de temperatura en tiempo real
watch(
  () => signalVital.value.temperature,
  (newTemperature) => {
    if (!newTemperature || newTemperature === '' || Number(newTemperature) <= 0) {
      signalVital.value.temperatureStatus = 'Pendiente';
      signalVital.value.temperatureColor = undefined;
      signalVital.value.temperatureAlert = undefined;
      signalVital.value.temperatureAlertColor = undefined;
    } else {
      const temperatureValue = Number(newTemperature);
      const temperatureStatus = getTemperatureStatus(temperatureValue);
      signalVital.value.temperatureStatus = temperatureStatus?.status || 'Pendiente';
      signalVital.value.temperatureColor = temperatureStatus?.color ?? undefined;
      signalVital.value.temperatureAlert = temperatureStatus?.alert;
      signalVital.value.temperatureAlertColor = temperatureStatus?.color;
    }
  },
);

// Watcher para calcular el estado de saturación de oxígeno en tiempo real
watch(
  () => signalVital.value.oxygenSaturation,
  (newOxygenSaturation) => {
    if (!newOxygenSaturation || newOxygenSaturation === '' || Number(newOxygenSaturation) <= 0) {
      signalVital.value.oxygenSaturationStatus = 'Pendiente';
      signalVital.value.oxygenSaturationColor = undefined;
      signalVital.value.oxygenSaturationAlert = undefined;
      signalVital.value.oxygenSaturationAlertColor = undefined;
    } else {
      const oxygenSaturationValue = Math.floor(Number(newOxygenSaturation)); // Asegurar que sea entero
      const oxygenSaturationStatus = getOxygenSaturationStatus(oxygenSaturationValue);
      signalVital.value.oxygenSaturationStatus = oxygenSaturationStatus?.status || 'Pendiente';
      signalVital.value.oxygenSaturationColor = oxygenSaturationStatus?.color ?? undefined;
      signalVital.value.oxygenSaturationAlert = oxygenSaturationStatus?.alert;
      signalVital.value.oxygenSaturationAlertColor = oxygenSaturationStatus?.color;
    }
  },
);

// Watcher para calcular el estado de glucosa en tiempo real
watch([() => signalVital.value.glucose, () => glucoseAteRecently.value], () => {
  if (!shouldAskGlucose.value) {
    glucoseAteRecently.value = null;
  }
  updateGlucoseStatus();
});

// Watcher para calcular el estado de presión arterial (sistólica y diastólica)
watch(
  [() => signalVital.value.systolic, () => signalVital.value.diastolic],
  ([systolic, diastolic]) => {
    const s = Number(systolic);
    const d = Number(diastolic);
    if (
      !systolic ||
      systolic === '' ||
      !diastolic ||
      diastolic === '' ||
      Number.isNaN(s) ||
      Number.isNaN(d) ||
      s <= 0 ||
      d <= 0
    ) {
      signalVital.value.bloodPressureStatus = 'Pendiente';
      signalVital.value.bloodPressureColor = undefined;
      signalVital.value.bloodPressureComment = undefined;
      signalVital.value.bloodPressureCommentColor = undefined;
    } else {
      const bpStatus = getBloodPressureStatus(s, d);
      signalVital.value.bloodPressureStatus = bpStatus.status;
      signalVital.value.bloodPressureColor = bpStatus.color ?? undefined;
      signalVital.value.bloodPressureComment = bpStatus.alert;
      signalVital.value.bloodPressureCommentColor = bpStatus.color;
    }
  },
);

// Watcher para actualizar cintura y cadera cuando cambia el género
watch(
  () => formData.value.gender,
  (newGender) => {
    if (!newGender) {
      // Limpiar estado si no hay género
      antropomentric.value.waistStatus = 'Pendiente';
      antropomentric.value.waistColor = undefined;
      antropomentric.value.hipStatus = 'Pendiente';
      antropomentric.value.hipColor = undefined;
      antropomentric.value.waistCircumference = undefined;
      return;
    }

    // Calcular cintura si existe
    if (
      antropomentric.value.waistCircumference &&
      Number(antropomentric.value.waistCircumference) > 0
    ) {
      const waistValue = Number(antropomentric.value.waistCircumference);
      const waistStatus = getWaistStatus(waistValue, newGender as 'MALE' | 'FEMALE');
      antropomentric.value.waistStatus = waistStatus?.status || 'Pendiente';
      antropomentric.value.waistColor = waistStatus?.color ?? undefined;
    }

    // Calcular cadera si existe (con sus propios rangos)
    if (
      antropomentric.value.hipCircumference &&
      Number(antropomentric.value.hipCircumference) > 0
    ) {
      const hipValue = Number(antropomentric.value.hipCircumference);
      const hipStatus = getHipStatus(hipValue, newGender as 'MALE' | 'FEMALE');
      antropomentric.value.hipStatus = hipStatus?.status || 'Pendiente';
      antropomentric.value.hipColor = hipStatus?.color ?? undefined;
    }
  },
);

function clearForm() {
  formData.value = createDefaultFormData();
  results.value = {};
  antropomentric.value = {};
  signalVital.value = {};
}

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});

</script>
