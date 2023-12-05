/*
* 字典信息
* */
import {http} from '@/utils/http'
import {ListResultType, ResultType} from "@/api/types";

enum Api {
    updateSysDict = '/admin/sysDict/updateSysDict',
    getSysDictPage = '/admin/sysDict/getSysDictPage',
    getSysDict = '/admin/sysDict/getSysDict/',
    deleteSysDict = '/admin/sysDict/deleteSysDict/',
    addSysDict = '/admin/sysDict/addSysDict',

    // 字典类型
    updateSysDictType = '/admin/sysDictType/updateSysDictType',
    getSysDictTypeList = '/admin/sysDictType/getSysDictTypeList',
    getSysDictType = '/admin/sysDictType/getSysDictType/',
    deleteSysDictType = '/admin/sysDictType/deleteSysDictType/',
    addSysDictType = '/admin/sysDictType/addSysDictType',
}

/** 字典列表*/
// 修改字典数据
export function updateSysDictApi(data:any) {
    return http.post<ResultType>(Api.updateSysDict,data)
}
// 字典数据分页列表
export function getSysDictPageApi(data:any) {
    return http.post<ListResultType>(Api.getSysDictPage, data)
}
// 字典数据详情
export function getSysDictApi(id:string|number) {
    return http.post<any>(Api.getSysDict+id)
}
// 删除字典数据
export function deleteSysDictApi(id:string|number) {
    return http.post<any>(Api.deleteSysDict+id)
}
// 添加字典数据
export function addSysDictApi(data:any) {
    return http.post<any>(Api.addSysDict,data)
}

/** 字典类型*/
// 修改字典类型
export function updateSysDictTypeApi(data:any) {
    return http.post<ResultType>(Api.updateSysDictType,data)
}
// 字典类型分页列表
export function getSysDictTypeListApi(data:any) {
    return http.post<any>(Api.getSysDictTypeList, data)
}
// 字典类型详情
export function getSysDictTypeApi(id:string):Promise<any> {
    return http.post<any>(Api.getSysDictType+id)
}
// 删除字典类型
export function deleteSysDictTypeApi(id:string) {
    return http.post<any>(Api.deleteSysDictType+id)
}
// 添加字典类型
export function addSysDictTypeApi(data:any) {
    return http.post<any>(Api.addSysDictType,data)
}










