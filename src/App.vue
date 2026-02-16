<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { RouterLink, RouterView } from 'vue-router';
import { VIcon } from '@/components/ui/icon';

const { isDarkMode, toggleDarkMode } = useTheme();
</script>

<template>
  <div class="drawer">
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar bg-surface dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div class="flex-none lg:hidden">
          <label for="main-drawer" class="btn btn-square btn-ghost">
            <VIcon name="menu" size="lg" />
          </label>
        </div>
        <div class="flex-1">
          <RouterLink to="/" class="btn btn-ghost text-xl font-bold text-primary">
            🩺 LPN Diagnósticos Virtual
          </RouterLink>
        </div>
        <div class="flex-none hidden lg:flex">
          <ul class="menu menu-horizontal px-1 gap-1">
            <li>
              <RouterLink to="/" class="font-medium" active-class="bg-primary text-primary-content">
                <VIcon name="home" size="md" />
                Inicio
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/diagnostics"
                class="font-medium"
                active-class="bg-primary text-primary-content"
              >
                <VIcon name="assignment" size="md" />
                Diagnósticos
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="font-medium"
                active-class="bg-primary text-primary-content"
              >
                <VIcon name="info" size="md" />
                Nosotros
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/support"
                class="font-medium"
                active-class="bg-primary text-primary-content"
              >
                <VIcon name="help" size="md" />
                Soporte
              </RouterLink>
            </li>
            <li>
              <button
                @click="toggleDarkMode"
                class="font-medium"
                :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
              >
                <VIcon :name="isDarkMode ? 'light_mode' : 'dark_mode'" size="md" />
                {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Page content -->
      <div class="flex-1">
        <RouterView />
      </div>
    </div>

    <!-- Mobile drawer sidebar -->
    <div class="drawer-side z-50">
      <label for="main-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200">
        <li class="mb-4">
          <RouterLink to="/" class="text-lg font-bold text-primary">
            🩺 LPN Diagnósticos Virtual
          </RouterLink>
        </li>
        <div class="divider"></div>
        <li>
          <RouterLink to="/" class="text-lg" active-class="bg-primary text-primary-content">
            <VIcon name="home" size="lg" />
            Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/diagnostics"
            class="text-lg"
            active-class="bg-primary text-primary-content"
          >
            <VIcon name="assignment" size="lg" />
            Diagnósticos
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="text-lg" active-class="bg-primary text-primary-content">
            <VIcon name="info" size="lg" />
            Nosotros
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/support" class="text-lg" active-class="bg-primary text-primary-content">
            <VIcon name="help" size="lg" />
            Soporte
          </RouterLink>
        </li>
        <div class="divider"></div>
        <li>
          <button
            @click="toggleDarkMode"
            class="text-lg"
            :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          >
            <VIcon :name="isDarkMode ? 'light_mode' : 'dark_mode'" size="lg" />
            {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
