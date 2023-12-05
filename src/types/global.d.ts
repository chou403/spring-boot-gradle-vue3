import type {RouteComponent} from "vue-router";

/**
 * 全局类型声明
 */
declare global {
    declare type NullType<T> = T | null | undefined;

    /**
     * @description 路由配置表
     */
    interface RouteConfigsTable {
        /** 路由地址 `必填` */
        path: string;
        /** 路由名字（保持唯一）`可选` */
        name?: string;
        /** `Layout`组件 `可选` */
        component?: RouteComponent;
        /** 路由重定向 `可选` */
        redirect?: string;
        meta?: {
            /** 菜单名称`必填` */
            title: string;
            /** 菜单图标 `可选` */
            icon?: string;
            /** 是否在菜单中显示（默认`true`）`可选` */
            isShow?: boolean;
            /** 是否缓存路由（默认`false`）`可选` */
            isCache?: boolean;
            /** 是否是首页（默认`false`）`可选` */
            isHome?: boolean;
        };
        /** 子路由配置项 */
        children?: Array<RouteChildrenConfigsTable>;
    }

    /**
     * @description 子路由配置表
     */
    interface RouteChildrenConfigsTable {
        /** 子路由地址 `必填` */
        path: string;
        /** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
        name?: string;
        /** 路由重定向 `可选` */
        redirect?: string;
        /** 按需加载组件 `可选` */
        component?: RouteComponent;
        meta?: {
            /** 菜单名称`必填` */
            title: string;
            /** 菜单图标 `可选` */
            icon?: string;
            /** 是否在菜单中显示（默认`true`）`可选` */
            isShow?: boolean;
            /** 是否缓存路由`可选` */
            isCache?: boolean;
            /** 是否是首页（默认`false`）`可选` */
            isHome?: boolean;
        };
        /** 子路由配置项 */
        children?: Array<RouteChildrenConfigsTable>;
    }

    /**
     * @description tableData
     * */
    interface TableDataType {
        data:any[]
    }

    // 声明文件，定义全局变量
    declare interface Window {
        nextLoading: boolean;
    }
}


