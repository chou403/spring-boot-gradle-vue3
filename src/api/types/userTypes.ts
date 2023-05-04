export interface LoginParamsType {
    username: string;
    password: string;
}

export type LoginResult = {
    /** token */
    token: string;
};

export type LoginUserInfoResult = {
    deptId:NullType<string>,
    deptName:NullType<string>,
    nickname:string,
    roleCodes:Array<string>,
    roleIds:Array<string>,
    roleNames:Array<string>,
    userId:string,
    username:string
};
