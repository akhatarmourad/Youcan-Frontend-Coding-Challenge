import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

import './assets/styles/global.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
