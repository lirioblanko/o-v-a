import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import './style.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

async function mount() {
    const app = createApp(App, {});
    app.use(createPinia());
    app.component('Toast', Toast);
    app.use(PrimeVue,{
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: '.my-app-light',
                cssLayer: false
            }
        }
    });
    app.use(ToastService);
    app.use(router);
    app.mount('#app');
}

void mount();