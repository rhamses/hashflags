import { createApp } from 'vue'
import Router from './router/index.js'
import App from './App.vue'
import './index.css'

createApp(App).use(Router).mount('#app')
