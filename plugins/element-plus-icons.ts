import { 
  Menu,
  Message,
  Setting,
  Document,
  Location,
  Fold,
  Expand
} from '@element-plus/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('icon-menu', Menu);
  nuxtApp.vueApp.component('message', Message);
  nuxtApp.vueApp.component('setting', Setting);
  nuxtApp.vueApp.component('document', Document);
  nuxtApp.vueApp.component('location', Location);
  nuxtApp.vueApp.component('fold', Fold);
  nuxtApp.vueApp.component('expand', Expand);
});