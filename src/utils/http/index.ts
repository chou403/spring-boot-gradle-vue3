import Axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, CustomParamsSerializer} from 'axios'
import {stringify} from 'qs'
import {closeNProgress, startNProgress} from "@/utils/nprogress";
import {ElMessageBox} from "element-plus";
import {getToken} from "@/utils/auth";
import {useUserStoreHook} from "@/store/modules/user";
import { ElMessage } from 'element-plus'

import {PureHttpRequestConfig, PureHttpResponse, RequestMethods} from "./types.d";


const defaultConfig: AxiosRequestConfig = {
    // 请求超时时间
    timeout: 30000,
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {},
    paramsSerializer: {
        serialize: stringify as unknown as CustomParamsSerializer
    }
};


class Http {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }

    /** 初始化配置对象 */
    private static initConfig: PureHttpRequestConfig = {};

    /** 保存当前Axios实例对象 */
    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

    /** 请求拦截 */
    private httpInterceptorsRequest(): void {
        Http.axiosInstance.interceptors.request.use(
            async (config: any) => {
                startNProgress();
                if (typeof config.beforeRequestCallback === "function") {
                    config.beforeRequestCallback(config);
                    return config;
                }
                if (Http.initConfig.beforeRequestCallback) {
                    Http.initConfig.beforeRequestCallback(config);
                    return config;
                }
                return new Promise(resolve => {
                    const data: any = getToken();
                    if (data) {
                        config.headers["token"] = data.token;
                    }
                    resolve(config);
                });
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /** 响应拦截 */
    private httpInterceptorsResponse(): void {
        const instance = Http.axiosInstance;
        instance.interceptors.response.use(
            (response: PureHttpResponse) => {
                const $config = response.config;
                // 关闭进度条动画
                closeNProgress();
                if (typeof $config.beforeResponseCallback === "function") {
                    $config.beforeResponseCallback(response);
                    return response.data;
                }
                if (Http.initConfig.beforeResponseCallback) {
                    Http.initConfig.beforeResponseCallback(response);
                    return response.data;
                }
                return response.data;
            },
            (error: AxiosResponse) => {
                closeNProgress();
                return Promise.reject(error);
            }
        );
    }

    /** 通用请求函数 */
    public request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: PureHttpRequestConfig
    ): Promise<T> {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig
        } as PureHttpRequestConfig;
        // 单独处理自定义请求/响应回掉
        return new Promise((resolve, reject) => {
            Http.axiosInstance
                .request(config)
                .then((response: any) => {
                    const {code, data, msg} = response;
                    switch (code) {
                        case 200:
                            resolve(data);
                            break;
                        default:
                            ElMessage.error(msg || '网络错误');
                            reject(response);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /** 单独抽离的post工具函数 */
    public post<P>(
        url: string,
        data?: AxiosRequestConfig,
        config?: PureHttpRequestConfig
    ): Promise<P> {
        return this.request<P>("post", url, data, config);
    }

    /** 单独抽离的get工具函数 */
    public get<T, P>(
        url: string,
        params?: AxiosRequestConfig<T>,
        config?: PureHttpRequestConfig
    ): Promise<P> {
        return this.request<P>("get", url, params, config);
    }
}

export const http = new Http();


// // 返回其他状态吗
// Axios.defaults.validateStatus = function(status) {
//     return status >= 200 && status <= 500 // 默认的
// }
// // 跨域请求，允许保存cookie
// Axios.defaults.withCredentials = true
//
// // HTTP request拦截
// Axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// Axios.interceptors.request.use(config => {
//     const isToken = (config.headers || {}).isToken === false
//     const token = useUserStoreHook().token
//
//     if (token && !isToken) {
//         config.headers['token'] = 'Bearer ' + token// token
//     }
//
//     // headers中配置serialize为true开启序列化
//     if (config.method === 'post' && config.headers.serialize) {
//         config.data = serialize(config.data)
//         delete config.data.serialize
//     }
//
//     if (config.method === 'get') {
//         config.paramsSerializer = function(params) {
//             return qs.stringify(params, { arrayFormat: 'repeat' })
//         }
//     }
//     return config
// }, error => {
//     return Promise.reject(error)
// })
//
// // HTTP response拦截
// Axios.interceptors.response.use((res:any) => {
//     const status = Number(res.status) || 200
//     // const message = res.data.msg || errorCode[status] || errorCode['default']
//     const message = res.data.msg || '网络错误'
//
//     // 后台定义 424 针对令牌过去的特殊响应码
//     if (status === 424) {
//         ElMessageBox.confirm('令牌状态已过期，请点击重新登录', '系统提示', {
//                 confirmButtonText: '重新登录',
//                 cancelButtonText: '取消',
//                 type: 'warning'
//             }
//         ).then(() => {
//             useUserStoreHook().logout().then(() => {
//                 // 刷新登录页面，避免多次弹框
//                 window.location.reload()
//             })
//         }).catch(() => {
//         })
//         return
//     }
//
//     if (status !== 200 || res.data.code === 1) {
//         ElMessage({
//             message: message,
//             type: 'error'
//         })
//         return Promise.reject(new Error(message))
//     }
//
//     return res
// }, error => {
//     // 处理 503 网络异常
//     console.log(error)
//     if (error.response.status === 503) {
//         ElMessage({
//             message: error.response.data.msg,
//             type: 'error'
//         })
//     }
//     return Promise.reject(new Error(error))
// })
//
// export default Axios
