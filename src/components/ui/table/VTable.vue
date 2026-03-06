<template>
  <!--
    Cuando scrollable es true se añade table-wrapper--scrollable para limitar altura
    y mostrar scroll vertical sin que la tabla expanda la página.
  -->
  <div
    class="table-wrapper overflow-x-auto"
    :class="{ 'table-wrapper--scrollable': scrollable }"
    :style="scrollable ? { '--v-table-scrollable-max-height': scrollableMaxHeight } : undefined"
  >
    <table :class="tableClasses">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TableProps } from './table';

const props = withDefaults(defineProps<TableProps>(), {
  striped: false,
  size: 'md',
  scrollable: false, // por defecto false para no afectar tablas en otras vistas (ej. SupportView)
  scrollableMaxHeight: '23rem',
});

const { scrollable, scrollableMaxHeight } = props;

const tableClasses = computed(() => [
  'table',
  props.size === 'sm' ? 'table--size-sm' : 'table--size-md',
  props.striped && 'table--striped',
]);
</script>
