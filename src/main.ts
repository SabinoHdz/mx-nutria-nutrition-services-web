import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue/client';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
// SEO: gestiona título y meta (descripción, Open Graph) por ruta para buscadores y pestaña del navegador.
app.use(createHead());

app.mount('#app');
