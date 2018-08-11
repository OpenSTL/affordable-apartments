import 'normalize.css/normalize.css';
import axios from 'axios';
import Meta from 'vue-meta';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps'

import './style/index.scss';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

Vue.use(Meta);

Vue.use(VueGoogleMaps, {
  load: {
   key: 'AIzaSyCWEMQM9l1gdvBTBXaovReSEmYo8yRaFJU',
   libraries: 'places',
  },



 //// If you want to manually install components, e.g.
 //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
 //// Vue.component('GmapMarker', GmapMarker)
 //// then disable the following:
 // installComponents: true,
});

export function createApp() {
  const http = axios.create();
  const store = createStore(http);
  const router = createRouter(store);
  const app = new Vue({
    store,
    router,
    render: (h) => h(App),
    mixins: [{
      computed: { $http: () => http },
    }],
  });

  return { app, store, router };
}
