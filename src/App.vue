<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router';
import { useSeoMeta, useHead } from '@unhead/vue';
import { useTheme } from '@/composables/useTheme';
import { VIcon } from '@/components/ui/icon';
import { VButton } from '@/components/ui/button';
import { VDrawer } from '@/components/ui/drawer';
import { VNavbar } from '@/components/ui/navbar';
import { VDivider } from '@/components/ui/divider';
import { VLoadingOverlay } from '@/components/ui/loading';
import { useConfigStore } from '@/stores/configStore';
import { useVisitsStore } from '@/stores/visitsStore';

const route = useRoute();

// URL base del sitio para meta absolutas (og:image, JSON-LD). En producción usar lapequenanutria.com.
const siteUrl = 'https://lapequenanutria.com';
const canonicalUrl = computed(
  () => (typeof window !== 'undefined' ? window.location.origin : '') + route.fullPath,
);

// SEO: canonical evita contenido duplicado; og:image y Twitter Card mejoran la vista al compartir en redes.
useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
});

// SEO: actualiza <head> con la meta de la ruta actual (título, descripción, Open Graph, Twitter) usando Unhead.
useSeoMeta({
  title: computed(() => (route.meta.title as string) ?? 'La Pequeña Nutria'),
  description: computed(
    () =>
      (route.meta.description as string) ??
      'Diagnóstico nutricional y asesoría de profesionales en nutrición. Herramientas y soporte para tu bienestar.',
  ),
  ogTitle: computed(() => (route.meta.title as string) ?? 'La Pequeña Nutria'),
  ogDescription: computed(
    () =>
      (route.meta.description as string) ??
      'Diagnóstico nutricional y asesoría de profesionales en nutrición. Herramientas y soporte para tu bienestar.',
  ),
  ogUrl: computed(
    () => (typeof window !== 'undefined' ? window.location.origin : '') + route.fullPath,
  ),
  ogImage: `${siteUrl}/logo.png`,
  ogImageAlt: 'La Pequeña Nutria – Diagnóstico Nutricional',
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => (route.meta.title as string) ?? 'La Pequeña Nutria'),
  twitterDescription: computed(
    () =>
      (route.meta.description as string) ??
      'Diagnóstico nutricional y asesoría de profesionales en nutrición. Herramientas y soporte para tu bienestar.',
  ),
  twitterImage: `${siteUrl}/logo.png`,
});

// SEO: datos estructurados (JSON-LD) para que Google muestre mejor el sitio (WebSite + Organization).
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'La Pequeña Nutria',
      description:
        'Diagnóstico nutricional y asesoría de profesionales en nutrición. Herramientas y soporte para tu bienestar.',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'es-MX',
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'La Pequeña Nutria',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
  ],
}));
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(jsonLd.value)),
    },
  ],
});

const { isDarkMode, toggleDarkMode } = useTheme();
const drawerOpen = ref(false);

onMounted(() => {
  useVisitsStore().recordVisit();
  useConfigStore().fetchConfig();
});
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

      <VLoadingOverlay />
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
