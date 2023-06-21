import {http} from '@/utils/http'

enum Api {
    getAllSysMenuTreeList = '/sysMenu/getAllSysMenuTreeList',
    getSysMenuTreeList = '/sysMenu/getSysMenuTreeList',
    addSysMenu = '/sysMenu/addSysMenu',
    getSysMenu = '/sysMenu/getSysMenu/',
    updateSysMenu = '/sysMenu/updateSysMenu',
    deleteSysMenu = '/sysMenu/deleteSysMenu/',
}

/** 菜单*/
// 获取所有的系统菜单树形列表
export function getAllSysMenuTreeList(data:any) {
    return http.post<any>(Api.getAllSysMenuTreeList, data)
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














