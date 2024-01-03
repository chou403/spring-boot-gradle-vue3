import {http} from '@/utils/http'
import {LoginParamsType,LoginResult,LoginUserInfoResult} from './types/systemTypes'

const server_url = '/login'
enum Api {
    Login = server_url + '/admin/login',
    Logout = server_url + '/admin/logout',
    GetProfile = server_url + '/admin/getLoginUserInfo',
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

