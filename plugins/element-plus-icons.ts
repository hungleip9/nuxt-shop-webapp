import { Menu, Message, Setting, Document, Location } from '@element-plus/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('icon-menu', Menu);
  nuxtApp.vueApp.component('message', Message);
  nuxtApp.vueApp.component('setting', Setting);
  nuxtApp.vueApp.component('document', Document);
  nuxtApp.vueApp.component('location', Location);
  
});