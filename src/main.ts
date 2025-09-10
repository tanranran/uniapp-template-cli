import { createSSRApp } from 'vue';
import App from './App.vue';
import store from './store';
import core from './core';
import 'virtual:uno.css';

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(core);
  return {
    app
  };
}
