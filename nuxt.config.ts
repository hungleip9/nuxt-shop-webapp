// https://nuxt.com/docs/api/configuration/nuxt-config
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
    '@element-plus/nuxt'
  ],
  ssr: true,
  routeRules: {

  },
  elementPlus: {
    // Các tùy chọn cấu hình (nếu cần)
  },
  app: {
    head: {
      title: 'Nuxtshop Coffee', // default fallback title
      meta: [
        { name: 'description', content: 'Cà phê ngon số 1 Việt Nam.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  }
})