export interface columnsType{
    label:string,
    name:string
    tagConfig?:Record<any, tagConfig>
}

export interface tagConfig {
    color:string
    text:string
}

export interface optionsType{
    id:string|number,
    name:string
}

export type customType = {
    /** 接口地址*/
    url: string
    /** option的label属性名称,默认：name*/
    labelName?: string
    /** option的value属性名称,默认：id*/
    valueName?: string
}

export enum formType{
    input,
    password,
    select,
    radio,
    number,
    textarea,
    checkBox,
    cascade
}

/** 表单配置*/
export interface configureType{
    label:string
    name:string
    placeholder?:string
    type?:formType
    custom?:customType
    options?:optionsType
}

export type operationsType={
    configure:Array<configureType>,
    /** 分页获取配置*/
    getOptions?:{
        // 分页接口
        url:string,
        type?:string
        pageSize?:number
    },
    /** 删除配置*/
    delOptions?:{
        // 删除接口
        url:string
    },
    /** 添加配置*/
    addOptions?:{
        // 添加接口
        url:string
    },
    /** 编辑配置*/
    editOptions?:{
        // 编辑接口
        url:string
    },
}
