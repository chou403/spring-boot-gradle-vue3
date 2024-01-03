import {http} from '@/utils/http'

const server_url = '/system'
enum Api {
    updateSysRole = server_url + '/admin/sysRole/updateSysRole',
    getSysRoleAllList = server_url + '/admin/sysRole/getSysRoleAllList',
    getMenuIdsByRoleId = server_url + '/admin/sysRole/getMenuIdsByRoleId/',
    setRoleMenus = server_url + '/admin/sysRole/setRoleMenus',
    getSysRoleList = server_url + '/admin/sysRole/getSysRolePage',
    getSysRole = server_url + '/admin/sysRole/getSysRole/',
    deleteSysRole = server_url + '/admin/sysRole/deleteSysRole/',
    addSysRole = server_url + '/admin/sysRole/addSysRole',
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














