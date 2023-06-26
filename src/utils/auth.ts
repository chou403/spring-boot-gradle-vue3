import Cookies from "js-cookie";

export interface DataInfo<T> {
    /** token */
    token: string;
    /** `Token`的过期时间（时间戳） */
    expires: T;
}

export const TokenKey = "accessToken";

/** 获取`token` */
export function getToken(): DataInfo<number> {
    return Cookies.get(TokenKey) && JSON.parse(<string>Cookies.get(TokenKey));
}

/**
 * @description 设置`token`以及过期时间
 */
export function setToken(data: DataInfo<Date|string>) {
    let expires = 0;
    const {token} = data;
    expires = new Date(data.expires).getTime();
    const cookieString = JSON.stringify({token, expires});
    expires > 0
        ? Cookies.set(TokenKey, cookieString, {
            expires: (expires - Date.now()) / 86400000
        })
        : Cookies.set(TokenKey, cookieString);
}

/** 删除`token` */
export function removeToken() {
    Cookies.remove(TokenKey);
}
