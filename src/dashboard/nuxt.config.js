import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: process.env.NUXT_PORT || 8080,
    host: process.env.NUXT_HOST || '127.0.0.1'
  },

  mode: 'universal',

  head: {
    titleTemplate: 'Junko Dashboard',
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [],

  devModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true,
    credentials: true
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:4000',
      pathRewrite: { '^/api/': '' },
      changeOrigin: true
    }
  },

  apollo: {
    clientConfigs: {
      default: '@/plugins/apollo-config.js'
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
