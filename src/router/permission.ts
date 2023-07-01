/**
 * 路由权限控制
 *
 */

import {router} from "@/router/index";
import type {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {closeNProgress, startNProgress} from "@/utils/nprogress";
import {getToken} from "@/utils/auth";
import {initBackEndControlRoutes} from "@/router/backEnd"
import {useUserStoreHook} from "@/store/modules/user";
import {NextLoading} from '@/utils/loading';
import {ElMessage, ElMessageBox} from "element-plus";


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
            const routers = await initBackEndControlRoutes();
            if (routers.length > 0) {
                next({path: to.path, query: to.query});
            } else {
                ElMessageBox.confirm(
                    '当前账号权限不足，请联系管理员分配权限。',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        showCancelButton:false,
                        type: 'warning',
                    })
                    .then(async () => {

                    }).catch(() => {
                })
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
