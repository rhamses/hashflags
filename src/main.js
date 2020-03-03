import Vue from 'vue'
import './plugins/axios'
import LazyLoad from 'vue-lazyload';
import App from './App.vue'
import i18n from './i18n'
import router from './router'
Vue.use(LazyLoad);

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
