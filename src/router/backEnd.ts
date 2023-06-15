import { getSysMenuListApi } from "@/api/menu"
import { addDynamicRoutes } from "@/router/permission"

const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');
/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules });

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 */
export async function initBackEndControlRoutes() {
  // 获取路由菜单数据
  const res = await getSysMenuListApi({
    "pageIndex": 1,
    "pageSize": 9999,
  });
  console.log(res);

  const result = await backEndComponent(formatRoute(groupedRoutes(res.list)));
  addDynamicRoutes(result);
  console.log(result);

}

/**
 * 后端路由 列表数据转成树形数据
 * @param routes 后端返回的路由表数组
 * @returns 返回嵌套路由菜单
 */
function groupedRoutes(routes: any[]) {
  // 将所有的一级路由和二级路由都提取出来
  const topLevelRoutes = routes.filter(route => route.parentId === null)
  const childRoutes = routes.filter(route => route.parentId !== null)

  // 将一级路由和二级路由分别进行分组
  const groupedChildRoutes = childRoutes.reduce((result, route) => {
    const parentId = route.parentId
    result[parentId] = result[parentId] || []
    result[parentId].push(route)
    return result
  }, {})

  // 将每个一级路由转换为一个菜单项，并将其下属的所有二级路由添加到菜单项的 `children` 字段中
  return topLevelRoutes.map(route => {
    const children = groupedChildRoutes[route.id]
    if (children) {
      route.children = children
    }
    return route
  })
}

/**
 * 后端路由 将数据格式化成路由数据
 * @param routes 嵌套路由
 * @returns 返回处理好的路由菜单
 */
function formatRoute(routes: any[]) {
  return routes.filter((p: any) => p.routeUrl && p.componentPath).map((p: any) => {
    let obj: any = {
      path: p.routeUrl,
      name: p.routeName,
      component: p.componentPath,
      meta: {
        title: p.name,
        isLink: p.isLink ? p.linkUrl : '',
        isHide: p.isShow,
        isKeepAlive: p.isCache,
        // roles: ['admin'],
        icon: p.icon
      },
    }
    if (p.routeRedirect) {
      obj.redirect = p.routeRedirect;
    }
    if (p.children?.length > 0) {
      obj.children = formatRoute(p.children);
    }
    return obj;
  })
}
/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
  if (!routes) return;
  return routes.map((item: any) => {
    if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component as string);
    item.children && backEndComponent(item.children);
    return item;
  });
}

/**
* 后端路由 component 转换函数
* @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
* @param component 当前要处理项 component
* @returns 返回处理成函数后的 component
*/
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
  const keys = Object.keys(dynamicViewsModules);

  const matchKeys = keys.filter((key) => {
    const k = key.replace(/..\/views|../, '');
    return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    return false;
  }
}