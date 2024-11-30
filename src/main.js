import { createApp } from 'vue'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './style.css'
import App from './App.vue'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

async function mount() {
    const app = createApp(App, {});
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
    app.mount('#app');
}

void mount();