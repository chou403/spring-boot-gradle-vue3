import {defineStore} from "pinia";
import {store} from "@/store";
import {configStoreType,configType} from "@/store/types";


export const useConfigStore = defineStore({
    id: 'config',
    state: (): configStoreType => ({
        configure: {
            isCollapse: false,
            themeColor: '#2e5cf6',
            sidebarBgColor:'#f00',
            isGrey:false,
            isDark:false,
            isWeakness:false,
            locale:'zh',
            layoutMode:0,
        }
    }),
    getters: {
        getSidebarStatus(): boolean {
            return this.configure.isCollapse;
        },
    },
    actions: {
        /** 切换菜单展开状态*/
        toggleSidebar(): void {
            this.storageConfigureChange('isCollapse',!this.configure.isCollapse);
        },
        /** 修改全局配置*/
        storageConfigureChange<T>(key: keyof configType, val: T): void {
            // @ts-ignore
            this.configure[key] = val;
            localStorage.setItem('configure', JSON.stringify(this.configure))
        },
        /** 获取本地全局配置*/
        setConfigure(){
            this.configure=JSON.parse(localStorage.getItem('configure') as string);;
        },
    }
});

export function useConfigStoreHook() {
    return useConfigStore(store);
}
