import {http} from '@/utils/http'
import {GetSysUserListResult,GetSysUserListParamsType} from './types/systemTypes'

enum Api {
    GetSysUserList = '/sysUser/getSysUserList',

    GetSysDeptList = '/sysDept/getSysDeptList',

    GetSysMenuList = '/sysMenu/getSysMenuList',
    AddSysMenu = '/sysMenu/addSysMenu',
    GetSysMenu = '/sysMenu/getSysMenu/',
    UpdateSysMenu = '/sysMenu/updateSysMenu',
}

/** 获取系统用户分页列表*/
export function getSysUserListApi(data:GetSysUserListParamsType) {
    return http.post<GetSysUserListResult>(Api.GetSysUserList, data)
}

/** 部门*/
// 部门分页列表
export function getSysDeptListApi(data:any) {
    return http.post<any>(Api.GetSysDeptList, data)
}

/** 菜单*/
// 菜单分页列表
export function getSysMenuListApi(data:any) {
    return http.post<any>(Api.GetSysMenuList, data)
}
// 添加菜单
export function addSysMenuApi(data:any) {
    return http.post<any>(Api.AddSysMenu,data)
}
// 菜单详情
export function getSysMenuApi(id:string|number) {
    return http.post<any>(Api.GetSysMenu+id)
}
// 修改菜单
export function updateSysMenuApi(data:any) {
    return http.post<any>(Api.UpdateSysMenu,data)
}

