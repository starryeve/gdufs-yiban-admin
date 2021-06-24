import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import { startLoading, endLoading } from './plugins/element'
import './assets/css/global.less'

import axios from 'axios'
// 配置根路径
axios.defaults.baseURL = 'https://www.gdufsybgzs.com:8002'
axios.interceptors.request.use(config => {
  startLoading()
  const token = window.sessionStorage.getItem('token')
  config.headers.token = token
  return config
}, error => {
  endLoading()
  console.log(error);
})
axios.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  error => {
    endLoading()
    console.log(error);
  }
)

Vue.prototype.$http = axios
Vue.prototype.$loading = {
  startLoading,
  endLoading
}
Vue.config.productionTip = false


import MyDialog from '@/utils/dialog' // 导入自定义dialog组件
Vue.prototype.$dialog = MyDialog // 挂载到全局Vue实例组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
