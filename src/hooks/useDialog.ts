type dialogType={
    initFormParam?:Object
    getDetailsApi:(id:string)=>Promise<any>
}

export default function useDialog({initFormParam={},getDetailsApi}:dialogType) {

    const state=reactive({
        isShow:false,
        title:'新增',
        id:'',
    })

    // 表单数据
    const form=ref({...initFormParam})

    // 获取详情
    function getDetails(id:string) {
        getDetailsApi(id).then(res=>{
            form.value=Object.assign({}, initFormParam, res);
        })
    }

    // 打开弹框
    function openDialog(row:any) {
        if(row?.id){
            state.title='编辑';
            state.id=row.id;
            getDetails(row.id);
        }else{
            state.title='新增';
            state.id='';
        }
        state.isShow=true;
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
