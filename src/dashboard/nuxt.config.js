import colors from 'vuetify/es5/util/colors';

export default {
  server: {
    port: 8000
  },
  mode: 'universal',

  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [],

  devModules: ['@nuxtjs/vuetify'],

  modules: ['@nuxtjs/apollo'],

  apollo: {
    clientConfigs: {
      'default': '@/plugins/apollo-config.js'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#fc2041',
          accent: colors.grey.darken4,
          secondary: '#F12B49',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    extend(config, ctx) {}
  }
};
