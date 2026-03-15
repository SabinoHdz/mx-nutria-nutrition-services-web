<template>
  <div class="tab-panel tab-panel--contact space-y-6">
    <!-- Three contact cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <VCard variant="elevated" shadow class="rounded-xl overflow-hidden">
        <VCardBody class="flex flex-col items-center text-center p-6">
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-info/20 text-info"
          >
            <VIcon name="mail" size="lg" />
          </div>
          <VCardTitle class="text-base font-semibold text-text-primary mb-1">
            Correo electrónico
          </VCardTitle>
          <p class="text-sm text-text-secondary">
            {{ contactEmail }}
          </p>
        </VCardBody>
      </VCard>

      <VCard variant="elevated" shadow class="rounded-xl overflow-hidden">
        <VCardBody class="flex flex-col items-center text-center p-6">
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-success/20 text-success"
          >
            <VIcon name="schedule" size="lg" />
          </div>
          <VCardTitle class="text-base font-semibold text-text-primary mb-1">
            Horario de atención
          </VCardTitle>
          <p class="text-sm text-text-secondary">Lun-Vie 9:00-18:00</p>
        </VCardBody>
      </VCard>

      <VCard variant="elevated" shadow class="rounded-xl overflow-hidden">
        <VCardBody class="flex flex-col items-center text-center p-6">
          <div
            class="w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-primary/20 text-primary"
          >
            <VIcon name="share" size="lg" />
          </div>
          <VCardTitle class="text-base font-semibold text-text-primary mb-1">
            Redes sociales
          </VCardTitle>
          <p class="text-sm text-text-secondary">Síguenos en Instagram</p>
        </VCardBody>
      </VCard>
    </div>

    <!-- WhatsApp card -->
    <VWhatsAppContact
      variant="card"
      title="Soporte por WhatsApp"
      schedule="Respuesta rápida · Lun-Vie 9:00-18:00"
    />

    <!-- Contact form -->
    <VCard variant="elevated" shadow>
      <VCardBody>
        <VCardTitle class="text-xl text-primary mb-4 flex items-center gap-2">
          <VIcon name="send" size="lg" />
          Formulario de Contacto
        </VCardTitle>

        <VForm ref="formRef" @submit="onSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <VInput
              v-model="form.name"
              label="Nombre"
              placeholder="Tu nombre"
              required
              type="alphanumeric"
            />
            <VInput
              v-model="form.email"
              label="Correo electrónico"
              placeholder="tucorreo@ejemplo.com"
              required
              type="email"
            />
          </div>
          <div class="mb-4">
            <VInput
              v-model="form.subject"
              label="Asunto"
              placeholder="¿En qué podemos ayudarte?"
              required
              type="alphanumeric"
            />
          </div>
          <div class="mb-4">
            <VTextArea
              v-model="form.message"
              type="alphanumeric-special"
              label="Mensaje"
              placeholder="Escribe tu mensaje aquí..."
              required
              :rows="5"
              resize="vertical"
            />
          </div>
          <VButton
            type="submit"
            variant="solid"
            color="primary"
            class="w-full inline-flex items-center justify-center gap-2"
          >
            <VIcon name="send" size="md" />
            Enviar mensaje
          </VButton>
        </VForm>
      </VCardBody>
    </VCard>

    <!-- Success / Error modal -->
    <VModal
      v-model="modalOpen"
      :title="modalTitle"
      :message="modalMessage"
      :type="modalType"
      close-label="Aceptar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { VCard, VCardBody, VCardTitle } from '@/components/ui/card';
import { VForm } from '@/components/ui/form';
import { VInput } from '@/components/ui/input';
import { VTextArea } from '@/components/ui/text-area';
import { VButton } from '@/components/ui/button';
import { VIcon } from '@/components/ui/icon';
import { VWhatsAppContact } from '@/components/ui/whatsapp-contact';
import { VModal } from '@/components/ui/modal';
import { useLoading } from '@/composables/useLoading';
import { useContactStore } from '@/stores/contactStore';

const contactEmail = computed(
  () => import.meta.env.VITE_CONTACT_EMAIL ?? 'lapequenanutria.nutricion@gmail.com',
);

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const modalOpen = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');
const modalType = ref<'success' | 'error'>('success');

const { show: loadingShow, hide: loadingHide } = useLoading();
const contactStore = useContactStore();

async function onSubmit() {
  try {
    loadingShow();

    await contactStore.submitContact({
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
    });
    modalTitle.value = 'Mensaje enviado';
    modalMessage.value =
      'Tu mensaje ha sido enviado correctamente. Te responderemos a la brevedad.';
    modalType.value = 'success';
    modalOpen.value = true;
    formRef.value?.reset();
    form.value = { name: '', email: '', subject: '', message: '' };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'No se pudo enviar el mensaje. Intenta de nuevo.';
    modalTitle.value = 'Error al enviar';
    modalMessage.value = message;
    modalType.value = 'error';
    modalOpen.value = true;
  } finally {
    loadingHide();
  }
}
</script>
