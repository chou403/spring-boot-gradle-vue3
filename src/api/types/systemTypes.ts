import {ListParams} from "@/api/types/index";

/** 获取系统用户分页列表参数*/
export interface GetSysUserListParamsType extends ListParams{

}

/** 获取系统用户分页列表返回数据*/
export type GetSysUserListResult = {
    id: number,
    username: string,
    nickname: string,
    salt: string,
    phone: string,
    email: string,
    gender: number,
    head: string,
    status: boolean,
    deptId: number,
    createTime: string,
    updateTime: string
}
