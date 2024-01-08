import { useUserStoreHook } from "@/store/modules/user";

import { debounce as _debounce } from 'lodash-es'
import { App, Directive } from 'vue'

const { permissionList } = storeToRefs(useUserStoreHook());

const permission: Directive = {
  mounted: (el, binding, vnode) => {
    const { value } = binding
    const all_permission = '*:*:*'

    const permissions = permissionList.value

    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value
      const hasPermissions = permissions.some((permission) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
const install = function (Vue: App<Element>) {

  Vue.directive('permission', permission)
}
export default install