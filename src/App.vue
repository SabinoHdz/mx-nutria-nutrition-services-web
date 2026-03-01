<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '@/composables/useTheme';
import { RouterLink, RouterView } from 'vue-router';
import { VIcon } from '@/components/ui/icon';
import { VButton } from '@/components/ui/button';
import { VDrawer } from '@/components/ui/drawer';
import { VNavbar } from '@/components/ui/navbar';
import { VDivider } from '@/components/ui/divider';

const { isDarkMode, toggleDarkMode } = useTheme();
const drawerOpen = ref(false);
</script>

<template>
  <VDrawer v-model:open="drawerOpen">
    <template #default>
      <VNavbar>
        <template #start>
          <VButton variant="ghost" square aria-label="Abrir menú" @click="drawerOpen = true">
            <VIcon name="menu" size="lg" />
          </VButton>
        </template>
        <template #center>
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2 text-xl font-bold text-primary hover:opacity-90"
          >
            <img src="/logo.png" alt="LPN" class="h-8 w-auto object-contain" />
            LPN Diagnósticos Virtual
          </RouterLink>
        </template>
        <template #end>
          <ul class="flex flex-wrap items-center gap-1 px-1 list-none">
            <li>
              <RouterLink
                to="/"
                class="flex items-center gap-1 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-primary/10"
                active-class="!bg-primary !text-white"
              >
                <VIcon name="home" size="md" />
                Inicio
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/diagnostics"
                class="flex items-center gap-1 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-primary/10"
                active-class="!bg-primary !text-white"
              >
                <VIcon name="assignment" size="md" />
                Diagnósticos
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="flex items-center gap-1 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-primary/10"
                active-class="!bg-primary !text-white"
              >
                <VIcon name="info" size="md" />
                Nosotros
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/support"
                class="flex items-center gap-1 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-primary/10"
                active-class="!bg-primary !text-white"
              >
                <VIcon name="help" size="md" />
                Soporte
              </RouterLink>
            </li>
            <li>
              <button
                type="button"
                class="flex items-center gap-1 rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-primary/10"
                :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
                @click="toggleDarkMode"
              >
                <VIcon :name="isDarkMode ? 'light_mode' : 'dark_mode'" size="md" />
                {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
              </button>
            </li>
          </ul>
        </template>
      </VNavbar>

      <div class="flex-1 bg-background dark:bg-gray-900">
        <RouterView />
      </div>
    </template>

    <template #sidebar>
      <ul class="p-4 w-80 min-h-full flex flex-col gap-1 list-none">
        <li class="mb-4">
          <RouterLink
            to="/"
            class="text-lg font-bold text-primary hover:opacity-90"
            @click="drawerOpen = false"
          >
            🩺 LPN Diagnósticos Virtual
          </RouterLink>
        </li>
        <VDivider />
        <li>
          <RouterLink
            to="/"
            class="flex items-center gap-2 rounded-md px-3 py-2 text-lg transition-colors hover:bg-primary/10"
            active-class="!bg-primary !text-white"
            @click="drawerOpen = false"
          >
            <VIcon name="home" size="lg" />
            Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/diagnostics"
            class="flex items-center gap-2 rounded-md px-3 py-2 text-lg transition-colors hover:bg-primary/10"
            active-class="!bg-primary !text-white"
            @click="drawerOpen = false"
          >
            <VIcon name="assignment" size="lg" />
            Diagnósticos
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/about"
            class="flex items-center gap-2 rounded-md px-3 py-2 text-lg transition-colors hover:bg-primary/10"
            active-class="!bg-primary !text-white"
            @click="drawerOpen = false"
          >
            <VIcon name="info" size="lg" />
            Nosotros
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/support"
            class="flex items-center gap-2 rounded-md px-3 py-2 text-lg transition-colors hover:bg-primary/10"
            active-class="!bg-primary !text-white"
            @click="drawerOpen = false"
          >
            <VIcon name="help" size="lg" />
            Soporte
          </RouterLink>
        </li>
        <VDivider />
        <li>
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-lg transition-colors hover:bg-primary/10"
            :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            @click="toggleDarkMode"
          >
            <VIcon :name="isDarkMode ? 'light_mode' : 'dark_mode'" size="lg" />
            {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
          </button>
        </li>
      </ul>
    </template>
  </VDrawer>
</template>
