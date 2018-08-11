import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';

Vue.use(VueRouter);

const routerOptions = {
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '*', component: NotFound },
  ],
};

export function createRouter(store) {
  return new VueRouter(routerOptions);
}
