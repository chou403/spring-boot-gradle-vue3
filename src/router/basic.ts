const Layout = () => import("@/layout/index.vue");
export default [
    {
        path: "/login",
        name: 'Login',
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: '登录'
        },
    },
    // {
    //     path: '/404',
    //     name: '404',
    //     component: () => import('@/views/error/404.vue'),
    //     meta: {
    //         title: "404",
    //     }
    // },
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/404',
    // },
] as Array<RouteConfigsTable>;
