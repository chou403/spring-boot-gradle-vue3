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
import {ElMessage} from "element-plus";


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
            const routers=await initBackEndControlRoutes();
            if(routers.length>0){
                next({ path: to.path, query: to.query });
            }else{
                ElMessage.error('当前账号权限不足');
                NextLoading.done(600);
                next(`/login`)
            }
        }
    } else {
        next(`/login?redirect=${to.fullPath}`)
    }
})

router.afterEach(() => {
    closeNProgress();
});
