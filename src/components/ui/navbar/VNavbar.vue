<template>
  <header class="navbar" role="banner">
    <!-- Mobile: hamburger only. Hidden on desktop (lg+). -->
    <div class="navbar__start flex-none">
      <slot name="start" />
    </div>
    <!-- Logo / brand (always visible) -->
    <div class="navbar__center flex-1 min-w-0">
      <slot name="center" />
    </div>
    <!-- Desktop: horizontal menu. Hidden on mobile. -->
    <div class="navbar__end flex-none">
      <slot name="end" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'VNavbar' });
</script>
