import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.errorHandler = function() {
  console.log(...arguments)
}
app.mount('#app')
