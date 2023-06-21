import {http} from '@/utils/http'

enum Api {
    uploadLocal = '/upload/uploadLocal',
}

/** 文件上传到本地*/
export function uploadLocal(data:any) {
    return http.post<any>(Api.uploadLocal,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

