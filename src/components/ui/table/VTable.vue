<template>
  <div class="table-wrapper overflow-x-auto">
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
});

const tableClasses = computed(() => [
  'table',
  props.size === 'sm' ? 'table--size-sm' : 'table--size-md',
  props.striped && 'table--striped',
]);
</script>
