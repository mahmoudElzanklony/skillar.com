import { resolve } from 'path'
const dotenv = require('dotenv')
const env = dotenv.config().parsed

const envKeys = {}
for (const key in env) {
  envKeys[key] = env[key]
}
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'skillar.com',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet',  href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/css/bootstrap.min.css' },
      // { rel: 'stylesheet',class:'ar_external_style',  href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/css/bootstrap.rtl.min.css' },
    ],
    script:[
      {src:'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.0/js/bootstrap.min.js'},
      {src:'https://cdn.ckeditor.com/ckeditor5/36.0.1/classic/ckeditor.js'},
      {src:'https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.41.0/apexcharts.min.js'},
      {src:'https://www.google.com/recaptcha/api.js'},
    ],
  },
  devServer: {
    port: 4000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/style.scss',
  ],
  alias: {
    'images': resolve(__dirname, './assets/images'),
    'style': resolve(__dirname, './assets/scss'),

  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //{src:'~/plugins/checkStyle.js',mode:'client'},
    {src:'~/plugins/jquery_plugin',mode:'client'},
    {src:'~/plugins/sweet_alert',mode:'client'},
    // {src:'~/plugins/text_editor',mode:'client'},
    {src:'~/plugins/tooltip_plugin',mode:'client'},
    // {src:'~/plugins/text_editor',mode:'client'},
    {src:'~/plugins/axios'},
    {src:'~/plugins/route'},
    {src:'~/plugins/AutoCompleteTags',mode: 'client'},
    {src:'~/plugins/loader',mode:'client'},

  ],




  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  env: envKeys,
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    /*'@nuxtjs/recaptcha'*/
  ],
  /*recaptcha: {
    /!* reCAPTCHA options *!/
    siteKey: '6LfvFEclAAAAAFBdk7D9g0MePCnSpil7pyumkMjA', // for example,
    hideBadge: false,
    size: 'invisible',
    version: 2
  },*/
  ssr: true, // Enable SSR
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'https://jd-api.skillar.com/api',
    baseURL: 'http://127.0.0.1:8000/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders:  {
      vue: {
        prettify: false
      }
    }
  },
  router: {
    middleware: ['checkStyle','auth_check'],
  },
  auth: {
    redirect:false,
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 60,
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user' }
        },
        refreshToken: {
          property: 'token',
          maxAge: 2016000 * 60,
        },
      }
    }
  },
}
