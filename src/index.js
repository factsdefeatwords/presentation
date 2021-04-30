import { createApp } from 'vue'
import App from './app.vue'
import router from './router/index'
import Alert from './components/Alert'

const app = createApp(App)
//app.use(router)
app.use(Alert)

app.mount('#app')