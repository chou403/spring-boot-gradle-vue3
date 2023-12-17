import {excelType, headType, imageType, pdfType, wordType} from "@/enum";

interface uploadType {
    image:imageType,
    head:headType,
    excel:excelType,
    word:wordType,
    pdf:pdfType
}


/**
 * 文件上传参数类型
 * */
export type UploadParamsTypes ={
    file:File,
}
