import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3000"

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
    // console.log(config)
    if(!config.headers.Authorization){
        config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
        return config;
    },function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

router.beforeEach((to, from, next) => {
    if (to.path !== "/login" && !localStorage.getItem("token")) {
        router.push("/login");
    } else {
        next();
    }
})

Vue.config.productionTip = false
new Vue({
    router,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
