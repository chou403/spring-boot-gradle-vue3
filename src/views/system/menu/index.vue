<template>
  <el-card shadow="never" style="height: 100%" :body-style="{height:'100%',padding:'10px'}">
    <custom-table :data="tableData.data" :operations="tableData.operations" :columns="tableData.columns"
                  @refresh="getTableList" @open="openFormDialog" @close="closeFormDialog">
      <template #form>
        <div>
            <el-dialog :model-value="dialogData.isShow" destroy-on-close :title="form.id?'修改':'新增'" @closed="closeFormDialog">
              <el-form :model="form" label-width="90px">
                <el-row>
                  <el-col :span="dialogData.span">
                    <el-form-item label="类型">
                      <el-radio-group v-model="form.type">
                        <el-radio-button v-for="(item,index) in typeOptions" :key="index" :label="item.id">
                          {{ item.name }}
                        </el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="dialogData.span">
                    <el-form-item label="上级菜单">
                      <el-cascader v-model="form.parentIds" placeholder="请选择上级菜单" :options="tableData.data" :props="defaultConfig" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="dialogData.span">
                    <el-form-item label="排序">
                      <el-input v-model="form.sort" type="number" placeholder="请输入排序"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="dialogData.span">
                    <el-form-item label="权限标识">
                      <el-input v-model="form.code" placeholder="请输入权限标识"/>
                    </el-form-item>
                  </el-col>
                  <!--                  按钮-->
                  <template v-if="form.type===2">
                    <el-col :span="dialogData.span">
                      <el-form-item label="按钮名称">
                        <el-input v-model="form.name" placeholder="请输入按钮名称"/>
                      </el-form-item>
                    </el-col>
                  </template>
<!--                  菜单-->
                  <template v-else>
                    <el-col :span="dialogData.span">
                      <el-form-item label="菜单名称">
                        <el-input v-model="form.name" placeholder="请输入菜单名称（如：菜单管理）"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="路由路径">
                        <el-input v-model="form.routeUrl" placeholder="请输入路由路径（如：/menu）"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="路由名称">
                        <el-input v-model="form.routeName" placeholder="请输入路由名称（如：Menu）"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="路由重定向">
                        <el-input v-model="form.routeRedirect" placeholder="请输入路由重定向（如：/system）"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="页面路径">
                        <el-input v-model="form.componentPath" placeholder="请输入页面路径（如：system/menu/index）"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="图标">
<!--                        <el-input v-model="form.icon" placeholder="请输入图标"/>-->
                        <custom-icon-input v-model:value="form.icon"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="是否隐藏">
                        <el-radio-group v-model="form.isShow">
                          <el-radio :label="true" border>是</el-radio>
                          <el-radio :label="false" border>否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="是否缓存">
                        <el-radio-group v-model="form.isCache">
                          <el-radio :label="true" border>是</el-radio>
                          <el-radio :label="false" border>否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="dialogData.span">
                      <el-form-item label="是否首页">
                        <el-radio-group v-model="form.isHome">
                          <el-radio :label="true" border>是</el-radio>
                          <el-radio :label="false" border>否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </template>
                  <el-col :span="dialogData.span">
                    <el-form-item label="状态">
                      <el-radio-group v-model="form.status">
                        <el-radio :label="true" border>启用</el-radio>
                        <el-radio :label="false" border>禁用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="closeFormDialog">取消</el-button>
                  <el-button type="primary" @click="submit">确定</el-button>
                </div>
              </template>
            </el-dialog>
        </div>
      </template>
    </custom-table>
  </el-card>
</template>

<script lang="ts" setup>
import {addSysMenuApi, getSysMenuApi, getSysMenuListApi, updateSysMenuApi} from "@/api/system";
import {reactive, ref} from "vue";
import {formatCascade, getCascadeParent} from "@/utils";
import {ElMessage} from "element-plus";

/** 分页*/
// 分页参数
const pageParams = reactive({
  pageIndex: 1,
  pageSize: 99999,
})

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
  columns: [
    {
      label: '菜单名称',
      name: 'name',
    },
    {
      label: '图标',
      name: 'icon',
    },
    {
      label: '路径',
      name: 'routeUrl',
    },
    {
      label: '页面路径',
      name: 'componentPath',
    },
    {
      label: '权限标识',
      name: 'code',
    },
    {
      label: '排序',
      name: 'sort',
    },
    {
      label: '状态',
      name: 'status',
      tagConfig: {
        false: {
          color: 'danger',
          text: '禁用'
        },
        true: {
          color: 'success',
          text: '启用'
        },
      }
    },
  ],
  operations: {
    addOptions: {
      url: '/sysMenu/addSysMenu',
    },
    editOptions: {
      url: '/sysMenu/updateSysMenu',
    },
    delOptions: {
      url: '/sysMenu/deleteSysMenu/'
    },
  }
})
// 获取表格数据
const getTableList = () => {
  getSysMenuListApi({...pageParams}).then(res => {
    tableData.data = formatCascade(res.list || []);
  })
}

/** 新增，编辑弹框*/
const dialogData = reactive({
  isShow: false,
  span: 12
})
const defaultConfig = {
  value: 'id',
  label: 'name',
  checkStrictly: true
}
// 类型
const typeOptions = [
  {
    name: '菜单',
    id: 1,
  },
  {
    name: '按钮',
    id: 2,
  }
]
// 表单数据
let form = ref({
  type:1
})
// 打开弹框
const openFormDialog = (row?: any) => {
  if (row?.id) {
    getSysMenuApi(row.id).then(res => {
      form.value = res;
      form.value.parentIds=form.value.parentId?getCascadeParent(tableData.data,form.value.parentId):[];
    })
  }
  dialogData.isShow = true;
}
// 关闭弹框
const closeFormDialog = () => {
  dialogData.isShow = false;
  form.value={}
}
// 提交
const submit = () => {
  let data=form.value,params={}
  if(form.value.type===2){
    params={
      name: data.name,
      parentId: data.parentIds[data.parentIds.length-1],
      code: data.code,
      type: data.type,
      status: data.status,
      sort: data.sort,
    }
  }else{
    params={
      name: data.name,
      parentId: data.parentIds[data.parentIds.length-1],
      icon: data.icon,
      code: data.code,
      type: data.type,
      status: data.status,
      sort: data.sort,
      routeUrl: data.routeUrl,
      routeName: data.routeName,
      routeRedirect: data.routeRedirect,
      componentPath: data.componentPath,
      isShow: data.isShow,
      isCache: data.isCache,
      isLink: data.isLink,
      linkUrl: data.linkUrl
    }
  }
  if(data.id){
    updateSysMenuApi({id:data.id,...params}).then(res=>{
      ElMessage.success('操作成功');
      closeFormDialog();
      getTableList();
    })
  }else{
    addSysMenuApi(params).then(res=>{
      ElMessage.success('操作成功');
      closeFormDialog();
      getTableList();
    })
  }
}

getTableList();
</script>

<style lang="scss" scoped>

</style>
