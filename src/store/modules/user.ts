import {defineStore} from "pinia";
import {store} from "@/store";
import {LoginParamsType, LoginUserInfoResult} from "@/api/types/systemTypes";
import {loginApi, logoutApi,getLoginUserInfoApi} from '@/api/system'
import {ElMessage} from "element-plus";
import {removeToken, setToken} from "@/utils/auth";
import {computeDate, formatGreet} from "@/utils";
import {router} from "@/router";
import {useTabsStore} from "@/store/modules/tabs";

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
            roleIds: [],
            roleNames: [],
            id: '',
            username: '',
            head:'',
            gender:0,
            email:'',
            phone:'',
            createTime:''
        },
        menuList: []
    }),
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                key: "userinfo",
                paths: ['userinfo']
            },
        ]
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
                            expires: computeDate(3, 3)
                        });
                        this.getLoginUserInfo().then((userRes:any) => {
                            ElMessage.success(`${formatGreet(new Date())}，${userRes.nickname}`);
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
                this.$reset();
                useTabsStore().$reset();
                localStorage.removeItem('userinfo');
                localStorage.removeItem('tabsList');
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
