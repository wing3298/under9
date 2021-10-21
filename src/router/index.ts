import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppMain from '../App.vue';
import SignUp from '../components/SignUp.vue';
import SignIn from '../components/SignIn.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

 const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: 'signin',
  },
  {
    path: '/',
    name: 'AppMain',
    component: AppMain,
    meta: { requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
  },
 ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        });
      }
    });

  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;

