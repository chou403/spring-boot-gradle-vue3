import {http} from '@/utils/http'

enum Api {
    getAllSysDeptTreeList = '/sysDept/getAllSysDeptTreeList',
    getSysDeptTreeList = '/sysDept/getSysDeptTreeList',
    addSysDept = '/sysDept/addSysDept',
    getSysDept = '/sysDept/getSysDept/',
    updateSysDept = '/sysDept/updateSysDept',
    deleteSysDept = '/sysDept/deleteSysDept/',
}

/** 部门*/
// 获取所有的部门树形列表
export function getAllSysDeptTreeList(data:any) {
    return http.post<any>(Api.getAllSysDeptTreeList, data)
}
// 获取启用的部门树形列表
export function getSysDeptTreeList(data:any) {
    return http.post<any>(Api.getSysDeptTreeList, data)
}
// 添加部门
export function addSysDept(data:any) {
    return http.post<any>(Api.addSysDept,data)
}
// 部门详情
export function getSysDept(id:string|number) {
    return http.post<any>(Api.getSysDept+id)
}
// 修改部门
export function updateSysDept(data:any) {
    return http.post<any>(Api.updateSysDept,data)
}
// 删除部门
export function deleteSysDept(id:string|number) {
    return http.post<any>(Api.deleteSysDept+id)
}














