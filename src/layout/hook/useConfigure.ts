import {darken, lighten, toggleClass} from "@/utils";
import { useDark, useToggle } from '@vueuse/core'

export function useConfigure() {

    /** 设置主题色*/
    function setThemeColor(color: string) {
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

    /** 设置暗黑模式*/
    function setDark(isDark: boolean) {
        useToggle(useDark())(isDark);
    }

    /** 设置灰色模式*/
    function setGrey(isGrey: boolean) {
        toggleClass(isGrey, "html-grey", document.getElementsByName('html')[0]);
    }

    /** 设置色弱模式*/
    function setWeakness(isWeakness: boolean) {
        toggleClass(isWeakness, "html-weakness",document.getElementsByName('html')[0]);
    }

    return {
        setThemeColor,
        setWeakness,
        setDark,
        setGrey
    }
}
