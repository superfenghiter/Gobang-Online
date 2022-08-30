import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import './assets/theme/scrollbar.css'
import './assets/theme/container.css'
import './assets/theme/chess.css'
import { store, key } from './store'
import i18n from './locals'

createApp(App).use(store, key).use(router).use(ElementPlus).use(i18n).mount('#app')
