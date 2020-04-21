import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Single from './views/Single.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:campaingName/:hashflag?',
      name: 'single',
      component: Single
    }
  ]
})
