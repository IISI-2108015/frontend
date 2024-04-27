import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BootstrapVue3 from "bootstrap-vue-3";
import router from './router/router'
import axios from 'axios';
 
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')

// createApp(App).use(router).use(BootstrapVue3).mount('#app')

// 每次请求前 有token就带上
axios.interceptors.request.use( config => {
    const token = localStorage.token
    if(token !== null && token !== ""){
        config.headers.Authorization = token;
    }
    return config
})
// axios.defaults.headers['Authorization'] = localStorage.token