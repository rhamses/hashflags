import Vue from 'vue'
import './plugins/axios'
import LazyLoad from 'vue-lazyload';
import App from './App.vue'
import i18n from './i18n'
Vue.use(LazyLoad);

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
