const Layout = () => import("@/layout/index.vue");

export default {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
        title: "首页",
        icon: 'House'
    },
    children: [
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () => import("@/views/dashboard/index.vue"),
            meta: {
                title: "首页",
                icon: 'House',
                isHome: true
            }
        }
    ]
} as RouteConfigsTable;
