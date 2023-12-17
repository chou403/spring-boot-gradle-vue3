type dialogType={
    idName?:string
    initFormParam?:Object
    getDetailsApi:(id:string)=>Promise<any>,
    dataCallBack?:Function,
    afterOpenDialog?:Function
}

export default function useDialog({idName='id',initFormParam={},getDetailsApi,dataCallBack,afterOpenDialog}:dialogType) {

    const state=reactive({
        isShow:false,
        title:'新增',
        id:'',
    })

    // 表单数据
    const form=ref({...initFormParam})

    // 获取详情
    async function getDetails(id:string) {
        getDetailsApi(id).then(res=>{
            form.value=Object.assign({}, initFormParam, res);
            dataCallBack && (form.value = dataCallBack(form.value));
        })
    }

    // 打开弹框
    async function openDialog(row:any) {
        if(row[idName]){
            state.title='编辑';
            state.id=row[idName];
            await getDetails(row[idName]);
        }else{
            state.title='新增';
            state.id='';
        }
        state.isShow=true;
        afterOpenDialog && afterOpenDialog(form.value);
    }

    // 关闭弹框
    function closeDialog() {
        state.isShow=false;
        form.value={...initFormParam};
    }

    return{
        ...toRefs(state),
        form,
        closeDialog,
        openDialog,
    }
}
