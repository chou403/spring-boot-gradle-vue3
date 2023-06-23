import {getNavMenuTreeList} from "@/api/menu"
import {addDynamicRoutes} from "@/router/permission"

const layoutModules: any = import.meta.glob('../layout/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');
/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules: Record<string, Function> = Object.assign({}, {...layoutModules}, {...viewsModules});

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 */
export async function initBackEndControlRoutes() {
    // 获取路由菜单数据
    const res = await getNavMenuTreeList({});

    const result = backEndComponent(formatRoute(res));
    await addDynamicRoutes(result);
}

/**
 * 后端路由 将数据格式化成路由数据
 * @param routes 嵌套路由
 * @returns 返回处理好的路由菜单
 */
function formatRoute(routes: any[]) {
    return routes.filter((p: any) => p.routeUrl && p.componentPath).map((p: any) => {
        if (p.parentId === "0" && p.children?.length <= 0) {
            return {
                path: p.isHome ? "/" : p.routeUrl + '-layout',
                component: '/layout/index',
                redirect: p.routeUrl,
                meta: {
                    title: p.name,
                    icon: p.icon,
                    isMenu: true
                },
                children: [
                    {
                        path: p.routeUrl,
                        name: p.code,
                        component: p.componentPath,
                        meta: {
                            title: p.name,
                            icon: p.icon,
                            isHome: true,
                            isMenu: false
                        }
                    }
                ]
            };
        }
        console.log()
        let obj: any = {
            path: p.routeUrl,
            name: p.routeName,
            component: p.parentId === '0'? '/layout/index' : p.componentPath,
            meta: {
                title: p.name,
                isLink: p.isLink ? p.linkUrl : '',
                isMenu: p.isShow,
                isCache: p.isCache,
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
