import Axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, CustomParamsSerializer} from 'axios'
import {stringify} from 'qs'
import {ElMessage, ElMessageBox} from "element-plus";
import {getToken} from "@/utils/auth";

import {PureHttpRequestConfig, RequestMethods} from "./types.d";
import {ResultType} from "@/api/types";
import {useUserStore} from "@/store/modules/user";

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
            (response) => {
                const $config = response.config as PureHttpRequestConfig;
                if (typeof $config.beforeResponseCallback === "function") {
                    $config.beforeResponseCallback(response);
                    return response;
                }
                if (Http.initConfig.beforeResponseCallback) {
                    Http.initConfig.beforeResponseCallback(response);
                    return response;
                }
                return response;
            },
            (error: AxiosResponse) => {
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
                .then((response: AxiosResponse<ResultType>) => {
                    const {code, data, msg} = response.data;
                    switch (code) {
                        case 200:
                            resolve(data);
                            break;
                        case 5001:
                            ElMessageBox.confirm(
                                '登录已过期或登录信息不存在，请重新登录',
                                '提示',
                                {
                                    confirmButtonText: '重新登录',
                                    cancelButtonText: '取消',
                                    type: 'warning',
                                })
                                .then(async () => {
                                    await useUserStore().logout();
                                }).catch(() => {
                            })
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
        data?: Record<string, any>,
        config?: PureHttpRequestConfig
    ): Promise<P> {
        return this.request<P>("post", url, {data}, config);
    }

    /** 单独抽离的get工具函数 */
    public get<P>(
        url: string,
        params?: Record<string, any>,
        config?: PureHttpRequestConfig
    ): Promise<P> {
        return this.request<P>("get", url, {params}, config);
    }
}

export const http = new Http();
