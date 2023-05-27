import {ListParams} from "@/api/types/index";

/** 获取系统用户分页列表参数*/
export interface GetSysMenuListParamsType extends ListParams{

}

/** 获取系统用户分页列表返回数据*/
export type GetSysMenuListResult = {
    id: number,
    name: string,
    parentId: number,
    code: string,
    icon: string,
    type: number,
    status: boolean,
    sort: number,
    routeUrl: string,
    routeName: string,
    routeRedirect: string,
    requestUrl: string,
    componentPath: string,
    isShow: boolean,
    isCache: boolean,
    isLink: boolean,
    linkUrl: string,
    createTime: string,
    updateTime: string
}
