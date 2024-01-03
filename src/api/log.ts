import {http} from '@/utils/http'

const server_url = '/system'
enum Api {
    getSysLogList = server_url + '/admin/sysLog/getSysLogPage',
    getSysLog = server_url + '/admin/sysLog/getSysLog/',

}
/** 日志*/
// 操作日志分页列表
export function getSysLogList(data:any) {
    return http.post<any>(Api.getSysLogList, data)
}
// 操作日志详情
export function getSysLog(id:string|number) {
    return http.post<any>(Api.getSysLog+id)
}
