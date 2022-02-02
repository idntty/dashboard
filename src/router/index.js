import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/pages/home-page'),
      meta: {
        layout: 'LayoutDefault'
      }
    },
    {
      name: 'account',
      path: '/account/:id',
      props: true,
      component: () => import('@/pages/account-page'),
      meta: {
        layout: 'LayoutDefault'
      }
    },
    {
      name: 'transaction',
      path: '/transaction/:id',
      props: true,
      component: () => import('@/pages/transaction-page'),
      meta: {
        layout: 'LayoutDefault'
      }
    },
    {
      path :'*',
      component: () => import('@/pages/page-404'),
      meta: {
        layout: 'LayoutDefault'
      }
    }
  ]
})

export default router
