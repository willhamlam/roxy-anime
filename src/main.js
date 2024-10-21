import './assets/main.css'

import { createApp } from 'vue'
import { VuePrlx } from 'vue3-prlx'
import App from './App.vue'

const app = createApp(App)
app.use(VuePrlx)

app.mount('#app')
