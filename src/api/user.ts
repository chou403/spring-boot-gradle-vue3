import {http} from '@/utils/http'
import {
    GetSysUserListParamsType,
    GetSysUserListResult,
    updatePasswordParamsType,
    updateUserParamsType,
} from "@/api/types/userTypes";
import {ListResultType, ResultType} from "@/api/types";

enum Api {
    updateSysUser = '/admin/sysUser/updateSysUser',
    getSysUserList = '/admin/sysUser/getSysUserPage',
    getSysUser = '/admin/sysUser/getSysUser/',
    deleteSysUser = '/admin/sysUser/deleteSysUser/',
    addSysUser = '/admin/sysUser/addSysUser',
    resetSysUserPassword = '/admin/sysUser/resetSysUserPassword',
    updatePassword = '/admin/sysUser/updatePassword',
    updateProfile = '/admin/sysUser/updateProfile',
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

