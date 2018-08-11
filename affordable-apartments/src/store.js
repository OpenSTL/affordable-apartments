import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const makeStoreOptions = ($http) => ({
  state: {
  },
  mutations: {
  },
  actions: {
  },
});

export function createStore($http) {
  return new Vuex.Store(makeStoreOptions($http));
}
