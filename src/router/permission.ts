/**
 * 路由权限控制
 *
 */

import {router} from "@/router/index";
import type {  RouteLocationNormalized,NavigationGuardNext } from "vue-router";
import {startNProgress,closeNProgress} from "@/utils/nprogress";

/** 路由白名单 */
const whiteList = ["/login"];

router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized,next:NavigationGuardNext) => {
    startNProgress();
    next();
})

router.afterEach(() => {
    closeNProgress();
});
