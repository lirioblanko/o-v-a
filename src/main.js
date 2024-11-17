import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css'

async function mount() {
    const app = createApp(App, {});
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: '.my-app-light',
                cssLayer: false
            }
        }
    });

    app.mount('#app');
}

void mount();