import {ListParams} from "@/api/types/index";

/** 获取系统用户分页列表参数*/
export interface GetSysUserListParamsType extends ListParams{}

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

/** 修改个人信息提交数据类型*/
export type updateUserParamsType = {
    id: string,
    nickname: string,
    phone: string,
    email: string,
    head:NullType<string>,
    gender: NullType<number>,
}

/** 修改用户密码提交数据类型*/
export type updatePasswordParamsType = {
    id: string,
    oldPassword: string,
    password: string,
    confirmPassword: string,
}
