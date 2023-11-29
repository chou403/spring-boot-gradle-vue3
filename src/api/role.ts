import {http} from '@/utils/http'

enum Api {
    updateSysRole = '/api/admin/sysRole/updateSysRole',
    getSysRoleAllList = '/api/admin/sysRole/getSysRoleAllList',
    getMenuIdsByRoleId = '/api/admin/sysRole/getMenuIdsByRoleId/',
    setRoleMenus = '/api/admin/sysRole/setRoleMenus',
    getSysRoleList = '/api/admin/sysRole/getSysRolePage',
    getSysRole = '/api/admin/sysRole/getSysRole/',
    deleteSysRole = '/api/admin/sysRole/deleteSysRole/',
    addSysRole = '/api/admin/sysRole/addSysRole',
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
// 获取角色权限
export function getMenuIdsByRoleId(id:any) {
    return http.post<any>(Api.getMenuIdsByRoleId+id)
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














