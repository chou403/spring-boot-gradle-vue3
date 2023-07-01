// 各种数据状态颜色类型
const color = {
    primary: '',
    success: 'success',
    info: 'info',
    warning: 'warning',
    danger: 'danger',
}

export interface InterfaceStatus {
    label: string,
    type?: string
}

type StatusType = Record<string, Record<number | string, InterfaceStatus>>


/**
 * 各种数据状态
 * */

/** 系统模块*/
export const system_status: StatusType = {
    //===================================================================TODO 系统用户
    // 性别
    gender: {
        1: {label: '男'},
        2: {label: '女'},
    },


    //===================================================================TODO 操作日志
    //日志类型
    logType: {
        0: {label: '访问日志'},
        1: {label: '新增'},
        2: {label: '修改'},
        3: {label: '删除'},
        4: {label: '详情'},
        5: {label: '所有列表'},
        6: {label: '分页列表'},
        7: {label: '其它查询'},
        8: {label: '上传文件'},
        9: {label: '登录'},
        10: {label: '退出'},
    },
    // 响应状态
    responseSuccess: {
        true: {label: '成功', type: color.success},
        false: {label: '失败', type: color.danger},
    },
    // 设备信息
    isMobile: {
        true: {label: '移动端'},
        false: {label: 'PC端'},
    },
}
