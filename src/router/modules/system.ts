const Layout = () => import("@/layout/index.vue");

export default {
    path: "/system",
    name:"System",
    component: Layout,
    redirect: "/role",
    meta: {
        title: "系统管理",
        icon:'Setting'
    },
    children: [
        {
            path: "/user",
            name: "User",
            component: () => import("@/views/system/user/index.vue"),
            meta: {
                title: "用户管理",
                icon:'User'
            }
        },
        {
            path: "/dept",
            name: "Dept",
            component: () => import("@/views/system/dept/index.vue"),
            meta: {
                title: "部门管理",
                icon:'User'
            }
        },
        {
            path: "/role",
            name: "Role",
            component: () => import("@/views/system/role/index.vue"),
            meta: {
                title: "角色管理",
                icon:'User'
            }
        }
    ]
} as RouteConfigsTable;
