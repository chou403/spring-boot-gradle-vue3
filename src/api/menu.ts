import {http} from '@/utils/http'
import {GetSysMenuListParamsType, GetSysMenuListResult} from "@/api/types/menuTypes";

enum Api {
    GetSysMenuList = '/sysMenu/getSysMenuList',
}

/** 获取系统用户分页列表*/
export function getSysMenuListApi(data:GetSysMenuListParamsType) {
    return http.post<GetSysMenuListResult>(Api.GetSysMenuList, data)
}

