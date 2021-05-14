/*
 * @Description: 封装了一些常用的工具函数
 * @Author: Ali
 * @Date: 2021-01-09 14:36:33
 * @LastEditors: Ali
 * @LastEditTime: 2021-02-19 14:53:51
 */


export function requiredValidator (obj, exceptArr) {
  if (!(obj instanceof Object)) {
    alert('只能校验对象！')
    return
  }
  function except (key) {
    if (exceptArr && exceptArr instanceof Array) {
      for (const arrValue of exceptArr) {
        if (key === arrValue) return true
      }
    }
    return false
  }
  for (const key in obj) {
    // if (obj[key] instanceof Array) { // 如果对象某一个属性是数组，且为对象数组，继续校验
    //   for (const item of obj[key]) {
    //     if (!requiredValidator(item)) {
    //       return false
    //     }
    //   }
    // }

    if (obj[key] === '' && !except(key)) {
      console.log(key)
      return false
    }
  }
  return true
}
