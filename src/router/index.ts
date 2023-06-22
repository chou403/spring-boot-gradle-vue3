import type {App} from 'vue';
import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router';
import basicRoutes from "@/router/basic";


export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: [...basicRoutes] as RouteRecordRaw[]
})


export function setupRouter(app: App<Element>) {
    app.use(router);
}
