import {http} from '@/utils/http'

const server_url = '/system'
enum Api {
    getAllSysMenuTreeList = server_url + '/admin/sysMenu/getAllSysMenuTreeList',
    getSysMenuTreeList = server_url + '/admin/sysMenu/getSysMenuTreeList',
    getNavMenuTreeList = server_url + '/admin/sysMenu/getNavMenuTreeList',
    addSysMenu = server_url + '/admin/sysMenu/addSysMenu',
    getSysMenu = server_url + '/admin/sysMenu/getSysMenu/',
    updateSysMenu = server_url + '/admin/sysMenu/updateSysMenu',
    deleteSysMenu = server_url + '/admin/sysMenu/deleteSysMenu/',
}

/** 菜单*/
// 获取所有的系统菜单树形列表
export function getAllSysMenuTreeList(data:any) {
    return http.post<any>(Api.getAllSysMenuTreeList, data)
}
// 获取当前用户的导航菜单
export function getNavMenuTreeList(data:any) {
    return http.post<any>(Api.getNavMenuTreeList, data)
}
// 获取启用的系统菜单树形列表
export function getSysMenuTreeList(data:any) {
    return http.post<any>(Api.getSysMenuTreeList, data)
}
// 添加菜单
export function addSysMenu(data:any) {
    return http.post<any>(Api.addSysMenu,data)
}
// 菜单详情
export function getSysMenu(id:string|number) {
    return http.post<any>(Api.getSysMenu+id)
}
// 修改菜单
export function updateSysMenu(data:any) {
    return http.post<any>(Api.updateSysMenu,data)
}
// 删除菜单
export function deleteSysMenu(id:string|number) {
    return http.post<any>(Api.deleteSysMenu+id)
}














