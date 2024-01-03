import {http} from '@/utils/http'
import {
    GetSysUserListParamsType,
    GetSysUserListResult,
    updatePasswordParamsType,
    updateUserParamsType,
} from "@/api/types/userTypes";
import {ListResultType, ResultType} from "@/api/types";

const server_url = '/system'
enum Api {
    updateSysUser = server_url + '/admin/sysUser/updateSysUser',
    getSysUserList = server_url + '/admin/sysUser/getSysUserPage',
    getSysUser = server_url + '/admin/sysUser/getSysUser/',
    deleteSysUser = server_url + '/admin/sysUser/deleteSysUser/',
    addSysUser = server_url + '/admin/sysUser/addSysUser',
    resetSysUserPassword = server_url + '/admin/sysUser/resetSysUserPassword',
    updatePassword = server_url + '/admin/sysUser/updatePassword',
    updateProfile = server_url + '/admin/sysUser/updateProfile',
}


/** 系统用户*/
// 用户分页列表
export function getSysUserList(data: GetSysUserListParamsType) {
    return http.post<ListResultType>(Api.getSysUserList, data)
}

// 添加用户
export function addSysUser(data: any) {
    return http.post<any>(Api.addSysUser, data)
}

// 用户详情
export function getSysUser(id: string) {
    return http.post<any>(Api.getSysUser + id)
}

// 修改用户
export function updateSysUser(data: any) {
    return http.post<ResultType>(Api.updateSysUser, data)
}

// 删除用户
export function deleteSysUser(id: string) {
    return http.post<ResultType>(Api.deleteSysUser + id)
}

// 重置系统用户密码
export function resetSysUserPassword(data: any) {
    return http.post<ResultType>(Api.resetSysUserPassword, data)
}

// 修改用户密码
export function updatePassword(data: updatePasswordParamsType) {
    return http.post<ResultType>(Api.updatePassword, data)
}

// 修改个人信息
export function updateProfile(data: updateUserParamsType) {
    return http.post<ResultType>(Api.updateProfile, data)
}

