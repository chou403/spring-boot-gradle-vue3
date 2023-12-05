/**
* @description 系统配置
* */

import {http} from '@/utils/http'
import {ListResultType, ResultType} from "@/api/types";

enum Api {
    updateSysConfig = '/admin/sysConfig/updateSysConfig',
    getSysConfigPage = '/admin/sysConfig/getSysConfigPage',
    getSysConfig = '/admin/sysConfig/getSysConfig/',
    deleteSysConfig = '/admin/sysConfig/deleteSysConfig/',
    addSysConfig = '/admin/sysConfig/addSysConfig',
}

// 修改系统配置
export function updateSysConfigApi(data:any) {
    return http.post<ResultType>(Api.updateSysConfig,data)
}
// 系统配置分页列表
export function getSysConfigPageApi(data:any) {
    return http.post<ListResultType>(Api.getSysConfigPage, data)
}
// 系统配置详情
export function getSysConfigApi(id:string|number) {
    return http.post<any>(Api.getSysConfig+id)
}
// 删除系统配置
export function deleteSysConfigApi(id:string|number) {
    return http.post<any>(Api.deleteSysConfig+id)
}
// 添加系统配置
export function addSysConfigApi(data:any) {
    return http.post<any>(Api.addSysConfig,data)
}










