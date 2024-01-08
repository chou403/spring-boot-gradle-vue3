export interface LoginParamsType {
    username: string;
    password: string;
}

export type LoginResult = {
    /** token */
    token: string;
};

/** 获取当前登录用户信息返回数据类型*/
export type LoginUserInfoResult = {
    id:string
    deptId:NullType<string>,
    deptName:NullType<string>,
    nickname:string,
    roleIds:Array<string>,
    roleNames:Array<string>,
    username:string
    phone:string
    email:string
    gender:number
    head:NullType<string>
    createTime:string
    permissions:Array<string>
};
