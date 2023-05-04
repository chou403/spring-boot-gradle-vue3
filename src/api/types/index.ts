/**
 * @description 分页列表参数配置
 */
export interface ListParams {
    pageIndex?:number
    pageSize?:number
    orderBy?:OrderByParams
}

/**
 * @description 排序参数配置
 */
export interface OrderByParams {
    column?:string
    asc?:boolean
    orderBy?:string
}
