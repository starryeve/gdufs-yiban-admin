import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import {
  Button, Form, FormItem, Input, Message, Container, Header,
  Main, Menu, MenuItem, Breadcrumb, BreadcrumbItem, Card,
  Table, TableColumn, Pagination, Dialog, Loading
} from 'element-ui'

Vue.use(Element)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$message = Message
let loading = null
export const startLoading = () => {
  const options = {
    lock: true,
    customClass: 'my-loading', // 设置class, 方便我们修改样式
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0)'
  }
  loading = Loading.service(options)
}
export const endLoading = () => {
  loading.close()
}
Vue.use(Loading.directive)
