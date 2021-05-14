
import Vue from 'vue'
import MyDialog from '@/components/MyDialog'
const MyDialogConstructor = Vue.extend(MyDialog)
export default function (content) {
  return new Promise((resolve, reject) => {
    // promise封装，ok执行resolve，no执行rejectect
    const instance = new MyDialogConstructor({
      el: document.createElement('div')
    })
    instance.visible = true
    document.body.appendChild(instance.$el) // new一个对象，然后插入body里面
    instance.content = content // 为了使MyDialog的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
    instance.submit = function () {
      resolve()
      instance.visible = false
    }
    instance.cancel = function () {
      // eslint-disable-next-line prefer-promise-reject-errors
      // reject()
      instance.visible = false
    }
  })
}
