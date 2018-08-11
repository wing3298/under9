import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import AppMain from '../App.vue';
import SignUp from '../components/SignUp.vue';
import SignIn from '../components/SignIn.vue';
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin',
    }as RouteConfig,
    {
      path: '/',
      name: 'AppMain',
      component: AppMain,
      meta: { requiresAuth: true },
    }as RouteConfig,
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    }as RouteConfig,
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    }as RouteConfig,
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged((user) => {
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

