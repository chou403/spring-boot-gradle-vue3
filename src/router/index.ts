import type { App } from 'vue';
import { Router, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useUserStoreHook } from "@/store/modules/user";
import {getToken} from "@/utils/auth"
import basicRoutes from "@/router/basic";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件 */
const modules: Record<string, any> = import.meta.glob(
    ["./modules/**/*.ts"],
    {
        eager: true
    }
);
/** 原始静态路由（未做任何处理） */
const routes: Array<RouteConfigsTable> = [];

Object.keys(modules).forEach(key => {
    routes.push(modules[key].default);
});

console.log(124124,routes)
// useUserStoreHook().setMenu(routes);


export const router: Router = createRouter({
    history: createWebHashHistory(),
    // routes: [...basicRoutes,...routes] as RouteRecordRaw[]
    routes: [...basicRoutes] as RouteRecordRaw[]
})


export function setupRouter(app: App<Element>) {
    app.use(router);
}
