import Vue from 'vue'
import Router from 'vue-router'
import AllNews from '@/components/AllNews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AllNews',
      component: AllNews
    }
  ]
})
