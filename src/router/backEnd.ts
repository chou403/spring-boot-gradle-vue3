import {getNavMenuTreeList} from "@/api/menu"
import {useUserStoreHook} from "@/store/modules/user";
import {RouteRecordRaw} from "vue-router";
import {router} from "@/router/index";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
const route=useRoute();

const Layout = () => import("@/layout/index.vue");

const layoutModules: any = import.meta.glob(['../layout/*.{vue,tsx}','../layout/routerView/*.{vue,tsx}']);
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules: Record<string, Function> = Object.assign({}, {...layoutModules}, {...viewsModules});

const rootRoutes:any = [
    {
        path: "/",
        component: Layout,
        name: 'root',
        redirect: '/home'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
]

// 添加动态路由
export const addDynamicRoutes = async (routes: any) => {
    // 添加路由
    routes.forEach((route: RouteRecordRaw) => {
        const routeName: any = route.name;
        if (!router.hasRoute(routeName)) router.addRoute(route);
    })
}

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 */
export async function initBackEndControlRoutes() {
    // 获取路由菜单数据
    let res = await getNavMenuTreeList({});
    const result = backEndComponent(formatRoute(res));
    useUserStoreHook().setMenu(result);
    rootRoutes[0].children=result;
    await addDynamicRoutes(rootRoutes);
    return Promise.resolve(res);
}

/**
 * 后端路由 将数据格式化成路由数据
 * @param routes 嵌套路由
 * @returns 返回处理好的路由菜单
 */
function formatRoute(routes: any[]) {
    return routes.map((p: any) => {
        if (p.isHoem) {
            rootRoutes[0].redirect = p.routeUrl;
        }
        if(p.isLink){
            return {
                path: `/${p.code}Link`,
                name: p.code,
                meta: {
                    title: p.name,
                    icon: p.icon,
                    isCache:!!p.isCache,
                    isMenu: !!p.isShow,
                    isLink: !!p.isLink,
                    linkUrl: p.linkUrl,
                },
            }
        }
        let route: any = {
            path: p.routeUrl,
            name: p.routeName,
            component: p.componentPath,
            meta: {
                title: p.name,
                icon: p.icon,
                isCache:!!p.isCache,
                isMenu: !!p.isShow,
                isLink: !!p.isLink,
                linkUrl: p.linkUrl,
            },
        }
        if (p.routeRedirect) {
            route.redirect = p.routeRedirect;
        }
        if (p.children?.length > 0) {
            route.children = formatRoute(p.children);
            route.component="layout/routerView/parent"
        }
        return route;
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
