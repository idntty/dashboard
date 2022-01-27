import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import VueAsyncOperations from 'vue-async-operations'

// import 'element-ui/lib/theme-chalk/index.css';
import 'element-theme-dark';
require('@/assets/css/main.styl')

Vue.use(ElementUI);
Vue.use(VueAsyncOperations);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
