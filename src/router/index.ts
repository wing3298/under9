import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    }as RouteConfig,
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    }as RouteConfig,
  ],
});
