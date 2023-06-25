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
import { NextLoading } from '@/utils/loading';


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
            // 界面 loading 动画开始执行
            if (window.nextLoading === undefined) NextLoading.start();
            await initBackEndControlRoutes()
            next({ path: to.path, query: to.query });
        }
    } else {
        next(`/login?redirect=${to.fullPath}`)
    }
})

router.afterEach(() => {
    closeNProgress();
});
