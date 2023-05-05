/**
 * 路由权限控制
 *
 */

import {router} from "@/router/index";
import type {  RouteLocationNormalized,NavigationGuardNext } from "vue-router";
import {startNProgress,closeNProgress} from "@/utils/nprogress";
import {getToken} from "@/utils/auth";

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized,next:NavigationGuardNext) => {
    startNProgress();
    if(getToken()){
        next();
    }else{
        if(whiteList.includes(to.path)){
            next();
        }else{
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})

router.afterEach(() => {
    closeNProgress();
});
