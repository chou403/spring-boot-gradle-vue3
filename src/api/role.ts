import {http} from '@/utils/http'

enum Api {
    updateSysRole = '/sysRole/updateSysRole',
    getSysRoleAllList = '/sysRole/getSysRoleAllList',
    setRoleMenus = '/sysRole/setRoleMenus',
    getSysRoleList = '/sysRole/getSysRoleList',
    getSysRole = '/sysRole/getSysRole/',
    deleteSysRole = '/sysRole/deleteSysRole/',
    addSysRole = '/sysRole/addSysRole',
}

/** 角色*/
// 角色分页列表
export function getSysRoleList(data:any) {
    return http.post<any>(Api.getSysRoleList, data)
}
// 系统所有角色列表
export function getSysRoleAllList(data:any) {
    return http.post<any>(Api.getSysRoleAllList, data)
}
// 设置角色权限
export function setRoleMenus(data:any) {
    return http.post<any>(Api.setRoleMenus, data)
}
// 添加角色
export function addSysRole(data:any) {
    return http.post<any>(Api.addSysRole,data)
}
// 角色详情
export function getSysRole(id:string|number) {
    return http.post<any>(Api.getSysRole+id)
}
// 修改角色
export function updateSysRole(data:any) {
    return http.post<any>(Api.updateSysRole,data)
}
// 删除角色
export function deleteSysRole(id:string|number) {
    return http.post<any>(Api.deleteSysRole+id)
}














