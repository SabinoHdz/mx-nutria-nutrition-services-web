<template>
  <component
    :is="asTag"
    :class="cardClass"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    :aria-label="ariaLabel"
  >
    <slot name="media"></slot>

    <div v-if="hasHeader" class="card__header">
      <div class="card__header-text">
        <div v-if="title || slots.title" class="card__title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="subtitle || slots.subtitle" class="card__subtitle">
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </div>
      </div>
      <slot name="header"></slot>
    </div>

    <div v-if="shouldWrapBody" class="card__body">
      <slot name="body">
        <slot></slot>
      </slot>
    </div>
    <template v-else-if="hasBodyContent">
      <slot name="body"></slot>
      <slot v-if="!slots.body"></slot>
    </template>

    <div v-if="slots.actions" class="card__actions">
      <slot name="actions"></slot>
    </div>

    <div v-if="slots.footer" class="card__footer">
      <slot name="footer"></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, Fragment, useSlots, type VNode } from 'vue';
import type { CardProps } from './card';
import { cardVariants } from './card.variants';

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'solid',
  size: 'md',
  layout: 'flex',
  rounded: true,
  shadow: false,
  bordered: true,
  dense: false,
  hoverable: false,
  clickable: false,
  as: 'div',
});

const slots = useSlots();

const cardSubcomponents = new Set([
  'VCardHeader',
  'VCardBody',
  'VCardFooter',
  'VCardActions',
  'VCardMedia',
]);

const hasCardSubcomponents = (nodes: VNode[] | undefined): boolean => {
  if (!nodes) return false;

  for (const node of nodes) {
    if (!node) continue;

    if (node.type === Fragment && Array.isArray(node.children)) {
      if (hasCardSubcomponents(node.children as VNode[])) return true;
      continue;
    }

    const type = node.type as { name?: string; __name?: string } | string;
    const name = typeof type === 'string' ? null : type.name || type.__name || null;

    if (name && cardSubcomponents.has(name)) {
      return true;
    }
  }

  return false;
};

const cardClass = computed(() =>
  cardVariants({
    variant: props.variant,
    size: props.size,
    layout: props.layout,
    rounded: props.rounded,
    shadow: props.shadow,
    bordered: props.bordered,
    dense: props.dense,
    hoverable: props.hoverable,
    clickable: props.clickable,
  }),
);

const asTag = computed(() => props.as);

const hasHeader = computed(() =>
  Boolean(props.title || props.subtitle || slots.title || slots.subtitle || slots.header),
);

const defaultNodes = computed(() => slots.default?.() ?? []);
const hasStructuredContent = computed(() => hasCardSubcomponents(defaultNodes.value));
const hasBodyContent = computed(() => Boolean(slots.body || slots.default));
const shouldWrapBody = computed(() => hasBodyContent.value && !hasStructuredContent.value);

const { clickable, ariaLabel, title, subtitle } = props;
</script>
