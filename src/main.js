// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import EUI from 'element-ui'
import './assets/element-#D4002A/index.css'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.use(EUI)
Vue.config.productionTip = false

/* eslint-disable */
if (typeof API_BASE !== 'undefined') {
  axios.defaults.baseURL = API_BASE
  // 在prod的webpack.DefinePlugin里定义成了全局变量，不需要再手动引入，所以eslint-disable
  // 开发时API_BASE自然是undefined，而构建时会从webpack.prod.conf.js里读到真实的后端API基础路径
}
/* eslint-disable */
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
