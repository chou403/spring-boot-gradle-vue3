import {AxiosRequestConfig, AxiosResponse, Method} from "axios";


export type RequestMethods = Extract<Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head">;

export interface PureHttpResponse extends AxiosResponse {
    config: PureHttpRequestConfig;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: PureHttpRequestConfig) => void;
    beforeResponseCallback?: (response: PureHttpResponse) => void;
}


export default class Http {
    request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: PureHttpRequestConfig
    ): Promise<T>;

    post<T, P>(
        url: string,
        params?: T,
        config?: PureHttpRequestConfig
    ): Promise<P>;

    get<T, P>(
        url: string,
        params?: T,
        config?: PureHttpRequestConfig
    ): Promise<P>;
}
