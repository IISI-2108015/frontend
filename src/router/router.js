import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";

// router設定
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login.vue'),
    props: true
  },
  {
    path: '/afterlogin',
    name: 'afterlogin',
    component: () => import('../pages/AfterLogin.vue'),
    props: true,
    meta: { requireAuth: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../pages/SignUp.vue'),
    props: true,
    // meta: { requireAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async(to, from, next) => {
  // 看看 to 和 from 兩個 arguments 會吐回什麼訊息
  // console.log('to: ', to)
  // console.log('from: ', from)
  
  // 目的路由在meta上是否有設置requireAuth: true
  if (to.meta.requireAuth) {
    // 獲取Cookies當中的login資訊並取得token
    const token = localStorage.token
    // console.log(info)
    if (token) {
      // 如果token不為空，且確實有這個欄位則讓路由變更
      if (token.length > 0 || token === undefined) {
        next()
      } else {
        // 未通過則導回login頁面
        next({ name: 'login' })
      }
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router;