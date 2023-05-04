import {lighten,darken} from "@/utils";

export function useThemeColor() {

    /** 设置主题色*/
    function setThemeColor(color:string) {
       document.documentElement.style.setProperty("--el-color-primary", color)
        document.documentElement.style.setProperty("--el-color-primary", color);
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(
                `--el-color-primary-light-${i}`,
                lighten(color, i / 10)
            );
        }
        for (let i = 1; i <= 2; i++) {
            document.documentElement.style.setProperty(
                `--el-color-primary-dark-${i}`,
                darken(color, i / 10)
            );
        }
    }

    return{
        setThemeColor
    }
}
