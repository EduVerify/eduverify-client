import { createApp } from 'vue';

import App from '@/App.vue';
import { registerPlugins } from '@core/utils/plugins';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Styles
import '@core/scss/template/index.scss';
import '@styles/styles.scss';

// Create vue app
const app = createApp(App)

// Register plugins
registerPlugins(app)
app.use(Toast);
// Mount vue app
app.mount('#app')
