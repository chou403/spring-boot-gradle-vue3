import {defineStore} from "pinia";
import {store} from "@/store";
import {LoginParamsType, LoginUserInfoResult} from "@/api/types/systemTypes";
import {getLoginUserInfoApi, loginApi, logoutApi} from '@/api/system'
import {ElMessage} from "element-plus";
import {removeToken, setToken} from "@/utils/auth";
import {computeDate} from "@/utils";
import {router} from "@/router";

interface userType {
    userinfo: LoginUserInfoResult,
    menuList: Array<RouteConfigsTable>
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): userType => ({
        userinfo: {
            deptId: null,
            deptName: null,
            nickname: '',
            roleCodes: [],
            roleIds: [],
            roleNames: [],
            userId: '',
            username: ''
        },
        menuList: []
    }),
    getters: {
        /** 获取本地用户信息*/
        getUserInfo(): LoginUserInfoResult {
            const userinfo = <string>localStorage.getItem('userinfo');
            return JSON.parse(userinfo) || this.userinfo;
        }
    },
    actions: {
        /**
         * @description:登录
         * */
        async login(data: LoginParamsType) {
            return new Promise((resolve) => {
                loginApi(data).then((res) => {
                    if (res) {
                        setToken({
                            token: res.token,
                            expires: computeDate(1, 2)
                        });
                        this.getLoginUserInfo().then(() => {
                            resolve(res);
                        });
                    }
                })
            })
        },
        /**
         * @description:获取登录用户信息
         * */
        async getLoginUserInfo() {
            return new Promise((resolve) => {
                getLoginUserInfoApi().then((res) => {
                    this.userinfo = res;
                    localStorage.setItem('userinfo', JSON.stringify(res));
                    ElMessage.success('登录成功');
                    resolve(res);
                })
            })
        },

        /**
         * @description:退出登录
         * */
        async logout() {
            logoutApi().then(() => {
                removeToken();
                localStorage.removeItem('userinfo');
                router.push("/login");
            })
        },

        /**
         * @description:设置菜单路由
         * */
        setMenu(data: Array<RouteConfigsTable>) {
            this.menuList = data;
        },
    }
});

export function useUserStoreHook() {
    return useUserStore(store);
}
