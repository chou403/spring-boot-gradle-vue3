import {ElMessage, ElMessageBox} from "element-plus";

// 定义一个delTableType类型，它是一个对象
type delTableType = {
    // 对象属性id，它是一个字符串
    id: string
    // 对象属性request，它是一个函数，接受一个参数id，返回一个Promise<void>
    request: (id: string) => Promise<void>
    // 对象属性callback，它是一个函数，不返回任何值
    callback: () => void
}

// 删除表格数据
export function delTable({id, request, callback}: delTableType): void {
    // 弹出确认框，询问是否确认删除
    ElMessageBox.confirm(
        '是否确认删除本条数据？',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            // 发送请求删除表格数据
            request(id).then(() => {
                // 删除成功，弹出提示框
                ElMessage.success('删除成功');
                // 如果有回调函数，则执行回调函数
                if (callback) callback();
            })
        }).catch(() => {
        // 取消删除，不执行任何操作
    })
}
