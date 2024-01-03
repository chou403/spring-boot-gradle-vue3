/*
* 字典信息
* */
import {http} from '@/utils/http'
import {ListResultType, ResultType} from "@/api/types";

const server_url = '/system'
enum Api {
    updateSysDict = server_url + '/admin/sysDict/updateSysDict',
    getSysDictPage = server_url + '/admin/sysDict/getSysDictPage',
    getSysDict = server_url + '/admin/sysDict/getSysDict/',
    deleteSysDict = server_url + '/admin/sysDict/deleteSysDict/',
    addSysDict = server_url + '/admin/sysDict/addSysDict',

    // 字典类型
    updateSysDictType = server_url + '/admin/sysDictType/updateSysDictType',
    getSysDictTypeList = server_url + '/admin/sysDictType/getSysDictTypeList',
    getSysDictType = server_url + '/admin/sysDictType/getSysDictType/',
    deleteSysDictType = server_url + '/admin/sysDictType/deleteSysDictType/',
    addSysDictType = server_url + '/admin/sysDictType/addSysDictType',
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










