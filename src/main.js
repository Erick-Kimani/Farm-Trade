import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'// Ensure you are using
import *as labsComponents from 'vuetify/labs/components'


const vuetify = createVuetify({
  components:{
    ...components,
    ...labsComponents,
},
  directives,
  icons:{
    defaultsSet:'mdi',//This is already the default value
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
