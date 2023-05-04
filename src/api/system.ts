import {http} from '@/utils/http'
import {GetSysUserListResult,GetSysUserListParamsType} from './types/systemTypes'

enum Api {
    GetSysUserList = '/sysUser/getSysUserList',
}

/** 获取系统用户分页列表*/
export function getSysUserListApi(data:GetSysUserListParamsType) {
    return http.post<GetSysUserListResult>(Api.GetSysUserList,{data})
}

