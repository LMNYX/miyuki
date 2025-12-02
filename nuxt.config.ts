// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  css: ['~/assets/scss/main.scss'],
  app: {
    rootTag: 'div',
    rootId: 'app',
    buildAssetsDir: '_assets',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: "%s",
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      meta: [
        { name: 'description', content: 'Uptime monitor!' }
      ],
    }
  },

  mongoose: {
    uri: process.env.MONGO_URI,
    options: {
      serverSelectionTimeoutMS: 5000
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    'reka-ui/nuxt',
    'nuxt-mongoose'
  ]
})