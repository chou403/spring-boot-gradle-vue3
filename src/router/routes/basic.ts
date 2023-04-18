
export default [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name:'Login',
        component: () => import("@/views/login/index.vue"),
        meta: {
            title:'登录'
        },
    }
];
