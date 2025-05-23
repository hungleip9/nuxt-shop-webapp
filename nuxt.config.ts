export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  experimental: { sharedPrerenderData: true },
  nitro: { preset: 'node-server', compressPublicAssets: true },
  components: true,
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  colorMode: {
    preference: 'system', // mặc định là 'system'
    fallback: 'light',    // fallback khi không detect được
    classSuffix: '',      // hậu tố class (vd: 'dark-mode' sẽ thành .dark-mode)
    storageKey: 'nuxt-color-mode' // key lưu trong localStorage/cookie
  },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/tailwind.css',
    '@/assets/scss/element-ui.scss',
    '@/assets/scss/style.scss',
    'element-plus/theme-chalk/dark/css-vars.css',
    'element-plus/dist/index.css'
  ],
  plugins: [
    { src: '~/plugins/axios', mode: 'client' },
  ],
  elementPlus: {
    themes: ['dark'],
    importStyle: 'scss', // hoặc 'scss' nếu bạn dùng SCSS
  },
  ssr: true,
  routeRules: {

  },
  app: {
    head: {
      title: 'Nuxtshop Coffee',
      meta: [
        { name: 'description', content: 'Cà phê ngon số 1 Việt Nam.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  runtimeConfig: {
    public: {
      BASE_API: '',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['dayjs/plugin/localeData']
    }
  },
  build: {
    transpile: ['element-plus/es']
  }
})