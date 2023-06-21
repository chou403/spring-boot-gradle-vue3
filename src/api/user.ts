import {http} from '@/utils/http'
import {LoginParamsType,LoginResult,LoginUserInfoResult} from './types/userTypes'

enum Api {
    Login = '/login',
    Logout = '/logout',
    GetLoginUserInfo = '/getLoginUserInfo',
    resetSysUserPassword = '/sysUser/resetSysUserPassword',

    updateSysUser = '/sysUser/updateSysUser',
    getSysUserList = '/sysUser/getSysUserList',
    getSysUser = '/sysUser/getSysUser/',
    deleteSysUser = '/sysUser/deleteSysUser/',
    addSysUser = '/sysUser/addSysUser',
}

/** 登录*/
export function loginApi(data:LoginParamsType) {
    return http.post<LoginResult>(Api.Login,data)
}

/** 获取登录用户信息*/
export function getLoginUserInfoApi() {
    return http.post<LoginUserInfoResult>(Api.GetLoginUserInfo)
}

/** 重置系统用户密码*/
export function resetSysUserPassword(data:any) {
    return http.post<any>(Api.resetSysUserPassword,data)
}


/** 退出登录*/
export function logoutApi() {
    return http.post(Api.Logout)
}


/** 用户*/
// 用户分页列表
export function getSysUserList(data:any) {
    return http.post<any>(Api.getSysUserList, data)
}
// 添加用户
export function addSysUser(data:any) {
    return http.post<any>(Api.addSysUser,data)
}
// 用户详情
export function getSysUser(id:string|number) {
    return http.post<any>(Api.getSysUser+id)
}
// 修改用户
export function updateSysUser(data:any) {
    return http.post<any>(Api.updateSysUser,data)
}
// 删除用户
export function deleteSysUser(id:string|number) {
    return http.post<any>(Api.deleteSysUser+id)
}
