import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import DiagnosticsView from '../views/DiagnosticsView.vue';

// SEO: cada ruta define meta.title y meta.description para buscadores y pestaña del navegador.
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    description?: string;
  }
}

const defaultTitle = 'La Pequeña Nutria';
const defaultDescription =
  'Diagnóstico nutricional y asesoría de profesionales en nutrición. Herramientas y soporte para tu bienestar.';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView,
      meta: {
        title: 'Diagnóstico Nutricional | La Pequeña Nutria',
        description:
          'Herramientas de diagnóstico nutricional y asesoría de profesionales en nutrición. Conoce tu estado de salud y mejora tu bienestar con La Pequeña Nutria.',
      },
    },
    {
      path: '/diagnostics',
      name: 'diagnostics',
      component: DiagnosticsView,
      meta: {
        title: 'Diagnóstico Nutricional | La Pequeña Nutria',
        description:
          'Realiza tu diagnóstico nutricional en línea con profesionales en nutrición. Indicadores, recomendaciones y seguimiento personalizado en La Pequeña Nutria.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Nosotros | La Pequeña Nutria',
        description:
          'Conoce al equipo y la misión de La Pequeña Nutria. Somos profesionales en nutrición con herramientas y asesoría para tu salud.',
      },
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue'),
      meta: {
        title: 'Soporte y Contacto | La Pequeña Nutria',
        description:
          '¿Necesitas ayuda? Como profesionales en nutrición te atendemos por correo o WhatsApp. Horario de atención y formulario de contacto.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: { name: 'home' },
      meta: { title: defaultTitle, description: defaultDescription },
    },
  ],
});

export default router;
