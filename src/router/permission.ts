/**
 * 路由权限控制
 *
 */

import { router } from "@/router/index";
import type { RouteLocationNormalized, NavigationGuardNext, RouteRecordRaw } from "vue-router";
import { startNProgress, closeNProgress } from "@/utils/nprogress";
import { getToken } from "@/utils/auth";
import { initBackEndControlRoutes } from "@/router/backEnd"
import { useUserStoreHook } from "@/store/modules/user";

// 添加动态路由
export const addDynamicRoutes = async (routes: any) => {
    useUserStoreHook().setMenu(routes);
    // 添加路由
    routes.forEach((route: RouteRecordRaw) => {
        const routeName: any = route.name;
        if (!router.hasRoute(routeName)) router.addRoute(route);
    })
}

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    startNProgress();
    if (whiteList.includes(to.path)) {
        next();
    } else if (getToken()) {
        if (useUserStoreHook().menuList.length > 0) {
            next();
        } else {
            await initBackEndControlRoutes()
           console.log( router.getRoutes());
            next();
        }
    } else {
        next(`/login?redirect=${to.fullPath}`)
    }
    // if (getToken() && menuList.value.length > 0) {
    //     next();
    // } else if (getToken()) {
    //     await initBackEndControlRoutes()
    //     next();
    // } else {
    //     if (whiteList.includes(to.path)) {
    //         next();
    //     } else {
    //         next(`/login?redirect=${to.fullPath}`)
    //     }
    // }
})

router.afterEach(() => {
    closeNProgress();
});
