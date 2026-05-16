import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <-- Importando o router
import './index.css'

const app = createApp(App)

app.use(router) // <-- Ativando o router
app.mount('#root')