import Vue from "vue"
import App from "./App"
import router from "./router"

import "./assets/css/reset.css"

import "./components"

import "./utils/http"
import "./filters/index"
import store from "./store"


import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
