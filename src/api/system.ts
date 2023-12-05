import {http} from '@/utils/http'
import {LoginParamsType,LoginResult,LoginUserInfoResult} from './types/systemTypes'

enum Api {
    Login = '/admin/login',
    Logout = '/admin/logout',
    GetProfile = '/admin/getLoginUserInfo',
}

/** 登录*/
export function loginApi(data:LoginParamsType) {
    return http.post<LoginResult>(Api.Login,data)
}

/** 获取登录用户信息*/
export function getLoginUserInfoApi() {
    return http.post<LoginUserInfoResult>(Api.GetProfile)
}

/** 退出登录*/
export function logoutApi() {
    return http.post(Api.Logout)
}

