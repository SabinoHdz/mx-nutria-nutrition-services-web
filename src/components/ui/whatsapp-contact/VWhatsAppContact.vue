<template>
  <section
    :class="rootClasses"
    role="region"
    aria-label="Contacto por WhatsApp"
  >
    <!-- Banner: texto a la izquierda, botón a la derecha -->
    <template v-if="variant === 'banner'">
      <div class="wa-contact__content wa-contact__content--banner">
        <div class="wa-contact__text">
          <h3 v-if="titleSlot || title" class="wa-contact__title">
            <slot name="title">{{ title }}</slot>
          </h3>
          <p v-if="descriptionSlot || description" class="wa-contact__description">
            <slot name="description">{{ description }}</slot>
          </p>
        </div>
        <a
          :href="effectiveHref"
          target="_blank"
          rel="noopener noreferrer"
          class="wa-contact__btn wa-contact__btn--pill"
        >
          <slot name="button">
            <VIcon name="WhatsApp" is-svg size="md" class="text-white">
              <WhatsappIcon />
            </VIcon>
            <span class="wa-contact__btn-label">{{ buttonText }}</span>
          </slot>
        </a>
      </div>
    </template>

    <!-- Card: bloque verde, icono + título + schedule -->
    <template v-else-if="variant === 'card'">
      <a
        :href="effectiveHref"
        target="_blank"
        rel="noopener noreferrer"
        class="wa-contact__link wa-contact__content wa-contact__content--card"
      >
        <div class="wa-contact__icon-wrap">
          <VIcon name="WhatsApp" is-svg size="lg" class="text-white">
            <WhatsappIcon />
          </VIcon>
        </div>
        <div class="wa-contact__text">
          <span v-if="titleSlot || title" class="wa-contact__card-title">
            <slot name="title">{{ title }}</slot>
          </span>
          <span v-if="scheduleSlot || schedule" class="wa-contact__schedule">
            <slot name="schedule">{{ schedule }}</slot>
          </span>
        </div>
      </a>
    </template>
  </section>
</template>

<script setup lang="ts">
/**
 * VWhatsAppContact: CTA de contacto por WhatsApp con dos variantes.
 * - banner: fondo verde claro, título + descripción a la izquierda, botón pill a la derecha.
 * - card: bloque verde sólido (--color-whatsapp), icono + título + schedule.
 * Si no se pasa `href`, se usa useWhatsAppLink() (env VITE_WHATSAPP_NUMBER y VITE_WHATSAPP_MESSAGE).
 */
import { computed, useSlots } from 'vue';
import type { WhatsAppContactProps } from './whatsapp-contact';
import { VIcon } from '@/components/ui/icon';
import WhatsappIcon from '@/components/icons/WhatsappIcon.vue';
import { useWhatsAppLink } from '@/composables/useWhatsAppLink';

defineOptions({
  name: 'VWhatsAppContact',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<WhatsAppContactProps>(), {
  variant: 'banner',
  buttonText: 'Chatear por WhatsApp',
});

const slots = useSlots();
const titleSlot = computed(() => !!slots.title);
const descriptionSlot = computed(() => !!slots.description);
const scheduleSlot = computed(() => !!slots.schedule);

const { whatsappUrl } = useWhatsAppLink();
const effectiveHref = computed(() => props.href ?? whatsappUrl.value);

const rootClasses = computed(() => {
  const base = 'wa-contact';
  const variantClass = `wa-contact--${props.variant}`;
  const extra = props.class ? [props.class] : [];
  return [base, variantClass, ...extra].filter(Boolean).join(' ');
});
</script>
