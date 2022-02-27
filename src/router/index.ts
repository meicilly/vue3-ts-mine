import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import localCache from "@/utils/cache"
const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect:"/main/system/user"
    },
    {
      path:"/login",
      name:"login",
      component: () => import("@/views/login/index.vue")
    },
    {
      path:"/main",
      name: 'main',
      component: () => import("@/views/main/index.vue"),
      children:[]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//导航守卫
router.beforeEach((to) => {
  //console.log(to)
  if(to.path !== "/login"){
    const token = localStorage.getItem("token")
    if(!token){
      return "/login"
    }
  }
})

export default router
