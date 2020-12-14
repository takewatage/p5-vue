export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'p5-vue',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [{ src: '~/assets/sass/main.scss', lang: 'scss' }],

  //プラグイン
  plugins: [
    { src: '~plugins/bootstrap-vue.js' },
  ],

  services: [
    { src: '~services/makeContactFormService.js' },
  ],

  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: [
      './assets/sass/main.scss',
    ]
  },
}

