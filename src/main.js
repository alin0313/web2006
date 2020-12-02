import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import "./assets/css/common.css"
import router from './router'
import store from './store'
import "./router/permission"
import './plugins/element.js'

import "./utils/eventbus"
import "./plugins/MyComponent"
import i18n from "./plugins/i18n"

import { initProject } from "./utils/init"


initProject()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
