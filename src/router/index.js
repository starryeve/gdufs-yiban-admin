import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Intro from '../views/Intro.vue'
import Activity from '../views/Activity.vue'
import Video from '../views/Video.vue'
import AddVid from '../views/AddVid.vue';
import ModifyVid from '../views/ModifyVid.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    component: Index,
    redirect: '/intro',
    children: [
      {
        path: '/intro',
        component: Intro
      },
      {
        path: '/activity',
        component: Activity
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/addVid',
        component: AddVid
      },
      {
        path: '/modifyVid/:id',
        component: ModifyVid
      },


    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {


  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login')
  next()
})

export default router
