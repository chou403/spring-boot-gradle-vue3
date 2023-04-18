import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import basicRoutes from "@/router/routes/basic";

export const router=createRouter({
    history:createWebHashHistory(),
    routes:basicRoutes
})


export function setupRouter(app: App<Element>) {
    app.use(router);
}
