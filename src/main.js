import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Pagination as ElPagination} from 'element-ui';
import VueAsyncOperations from 'vue-async-operations'

import 'element-ui/lib/theme-chalk/index.css';

import './assets/tailwind.scss'

require('@/assets/css/main.styl')

Vue.use(ElPagination);
Vue.use(VueAsyncOperations);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
