// 界面布局模式
export enum layoutModeEnum {
    'classics',//经典
    'transverse',//横向
    'mixed'//混合
}

export interface configType {
    isCollapse: boolean
    themeColor: string
    isGrey: boolean
    isDark: boolean
    isWeakness: boolean
    locale: string
    layoutMode: layoutModeEnum
    sidebarBgColor: string
}

export interface configStoreType {
    configure: configType
}

