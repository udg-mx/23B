import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css';
import router from './router/route';  // Importando el router

const app = createApp(App);

app.use(router);  // Usando el router
app.mount('#app');