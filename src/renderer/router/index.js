import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'background',
      component: require('@/components/Background').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
