import { createI18n } from 'vue-i18n'
import { getCurrLang } from "@/utils/common"

// elementPlus
// import EleEn from 'element-plus/dist/locale/en.mjs'
// import EleZhCn from 'element-plus/dist/locale/zh-cn.mjs'

import zhLocale from './zh'; // 引入中文对应语言配置
import enLocale from './en'; // 引入英文对应语言配置
const messages = {
    zh: zhLocale,
    en: enLocale
}
const i18n = createI18n({
    globalInjection: true, // 全局注入
    locale: getCurrLang(), // 当前语言
    messages,
    legacy: false,
})

export default i18n

