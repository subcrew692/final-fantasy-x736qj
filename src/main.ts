import { createApp, h } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router';
import quasarUserOptions from './quasar-user-options';

createApp({
  render: () => h(App),
})
  .use(router)
  .use(Quasar, quasarUserOptions)
  .mount('#app');
