export default {
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  mode: 'spa',
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
      { hid: 'theme-color', name: 'theme-color', content: '#f271cd' },
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
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/proxy'],
  proxy: ['http://localhost:4000/api/*'],
  build: {
    extend(config, ctx) {}
  }
};
