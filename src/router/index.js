import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AllNews from '@/components/AllNews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/articles',
      name: 'AllNews',
      component: AllNews
    }
  ]
})
