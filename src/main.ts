import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
//import ElementPlus from "element-plus"
import "./assets/assets/css/index.css"
import { setupStore } from './store'
import { globalRegister } from './global'



const app =  createApp(App)

app.use(store)
//app.use(ElementPlus)
setupStore()
app.use(router)
app.use(globalRegister)


app.mount('#app')

