import {useConfigure} from "@/layout/hook/useConfigure";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import {useConfigStoreHook} from "@/store/modules/config";


export function useGlobeConfigure() {

    function setThemeColor(color: string) {
        useConfigure().setThemeColor(color)
    }

    // 设置夜晚模式
    function setNightMode() {
        const hour: number = new Date().getHours();
        useConfigStoreHook().storageConfigureChange('isDark', hour > 19);
        useConfigure().setDark(hour > 19);
    }

    function getTranslation() {
        return useConfigStoreHook().configure.locale == 'zh' ? zhCn : en
    }

    function setGlobeConfigure() {
        const configure = JSON.parse(localStorage.getItem('configure') as string);
        if (configure) {
            setThemeColor(configure.themeColor);
            useConfigure().setGrey(configure.isGrey);
            useConfigure().setWeakness(configure.isWeakness);
            useConfigure().setDark(configure.isDark);
            useConfigStoreHook().setConfigure();
        } else {
            setThemeColor(getComputedStyle(document.documentElement)
                .getPropertyValue('--el-color-primary'));
        }
        setNightMode();
    }


    return {
        setGlobeConfigure,
        setThemeColor,
        getTranslation
    }
}
