import {http} from '@/utils/http'
import {LoginParamsType,LoginResult,LoginUserInfoResult} from './types/userTypes'

enum Api {
    Login = '/login',
    Logout = '/logout',
    GetLoginUserInfo = '/getLoginUserInfo',
}

/** 登录*/
export function loginApi(data:LoginParamsType) {
    return http.post<LoginResult>(Api.Login,{data})
}

/** 获取登录用户信息*/
export function getLoginUserInfoApi() {
    return http.post<LoginUserInfoResult>(Api.GetLoginUserInfo)
}


/** 退出登录*/
export function logoutApi() {
    return http.post(Api.Logout)
}
