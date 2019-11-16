import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: process.env.NUXT_PORT || 8080
  },

  env: {
    GQL_ENDPOINT:
      process.env.NODE_ENV === 'production'
        ? 'https://bot.hichuyamichu.me/api/query'
        : 'http://localhost:4000/api/query'
  },

  mode: 'universal',

  head: {
    titleTemplate: 'Junko bot - Dashboard',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'Discord bot',
        name: 'Junko bot',
        content: 'Touhou themed discord bot'
      },
      { hid: 'og:title', name: 'og:title', content: 'Junko bot' },
      { hid: 'og:url', name: 'og:url', content: 'https://bot.hichuyamichu.me' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/avatar.webp'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Cool embed huh?'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Junko dashboard'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/avatar.webp' }]
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [],

  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/dotenv'],

  modules: ['@nuxtjs/proxy', '@nuxtjs/pwa', '@nuxtjs/apollo'],

  apollo: {
    clientConfigs: {
      default: '@/plugins/apollo-config.js'
    }
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:4000',
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: '#000',
          accent: '#f271cd',
          secondary: '#F12B49',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#000',
          accent: '#000',
          secondary: '#000',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    extend (config, ctx) {}
  }
}
