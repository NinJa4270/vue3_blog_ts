import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect:'/main',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    children:[
      {
        path: '/main',
        name: 'main',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Main/Main.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
