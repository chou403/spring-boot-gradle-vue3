import {useConfigure} from "@/layout/hook/useConfigure";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import {useConfigStoreHook} from "@/store/modules/config";



export function useGlobeConfigure() {

    function setThemeColor(color:string){
        useConfigure().setThemeColor(color)
    }

    function getTranslation(){
        return useConfigStoreHook().configure.locale=='zh'?zhCn:en
    }

    function setGlobeConfigure() {
       const configure=JSON.parse(localStorage.getItem('configure') as string);
       if(configure){
           setThemeColor(configure.themeColor);
           useConfigure().setGrey(configure.isGrey);
           useConfigure().setWeakness(configure.isWeakness);
           useConfigure().setDark(configure.isDark);
           useConfigStoreHook().setConfigure();
       }else{
           setThemeColor(getComputedStyle(document.documentElement)
               .getPropertyValue('--el-color-primary'));
       }
       return
    }


    return{
        setGlobeConfigure,
        setThemeColor,
        getTranslation
    }
}
