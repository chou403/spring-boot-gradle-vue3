// 界面布局模式
export enum layoutModeEnum {
    'classics',//经典
    'transverse',//横向
    'mixed'//混合
}

export type configType = {
    isCollapse: boolean
    themeColor: string
    locale: string
    layoutMode:layoutModeEnum
}

export type configStoreType = {
    configure: configType
}

