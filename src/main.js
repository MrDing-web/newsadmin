import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import  ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:3000"

router.beforeEach((to,from,next)=>{
  if(to.path!=="/login" && !localStorage.getItem("token")){
      router.push("/login");
  }else{
    next();
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
