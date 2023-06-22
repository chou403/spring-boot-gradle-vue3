<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="菜单名称">
            <el-input v-model="queryForm.name" placeholder="请输入菜单名称"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="权限编码">
            <el-input v-model="queryForm.code" placeholder="请输入权限编码"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="路由">
            <el-input v-model="queryForm.routeUrl" placeholder="请输入路由"/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="菜单类型">
            <el-select v-model="queryForm.type" placeholder="请选择菜单类型">
              <el-option label="导航菜单" :value="1" />
              <el-option label="菜单" :value="2" />
              <el-option label="权限" :value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label-width="0">
            <el-button type="primary" @click="onSearch">
              <el-icon>
                <ele-search/>
              </el-icon>
              <span class="search-btn__left">查询</span>
            </el-button>
            <el-button @click="onReset">
              <el-icon>
                <ele-refresh/>
              </el-icon>
              <span class="search-btn__left">重置</span>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--    新 增-->
    <div class="table-btn-box mb10">
      <el-button type="primary" @click="openDialog">
        <el-icon class="mr5">
          <ele-circle-plus/>
        </el-icon>
        新 增
      </el-button>
    </div>
    <!--    表格-->
    <el-table :data="tableData.data" border style="width: 100%" row-key="id" :expand-row-keys="expandRowKeys">
      <el-table-column prop="name" label="菜单名称" align="center" width="300">
        <template #default="scope">
          <div class="flex-inline flex item-center">
            <template v-if="scope.row.icon?.indexOf('local')>=0">
              <SvgIcon :name="scope.row.icon"/>
            </template>
            <el-icon v-else>
              <component :is="scope.row.icon"></component>
            </el-icon>
            <span class="ml3">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="权限标识" align="center" width="150"/>
      <el-table-column prop="type" label="类型" align="center" >
        <template #default="scope">
          <el-tag v-if="scope.row.type===1" disable-transitions>菜单</el-tag>
          <el-tag v-else-if="scope.row.type===2" type="success" disable-transitions>外链</el-tag>
          <el-tag v-else type="warning" disable-transitions>权限</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="routeUrl" label="路由" align="center"/>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status===true" type="success" disable-transitions>启用</el-tag>
          <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"/>
      <el-table-column prop="createTime" label="创建时间" align="center" width="200"/>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template #default="{row}">
          <el-button link type="primary" @click="openDialog(row)">
            修改
          </el-button>
          <el-button @click="delTable(row)" link type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    添加，编辑弹框-->
    <div v-if="dialogData.isShow">
      <el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
        <el-form ref="formRef" :rules="rules[form.type]" :model="form" :validate-on-rule-change="false" label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="类型">
                <el-radio-group v-model="form.type" @change="changeType">
                  <el-radio-button v-for="(item,index) in typeOptions" :key="index" :label="item.id">
                    {{ item.name }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级菜单">
                <custom-cascader v-model:value="form.parentId" :options="tableData.data" placeholder="请选择上级菜单"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序" prop="sort">
                <el-input v-model="form.sort" type="number" placeholder="请输入排序"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限标识" prop="code">
                <el-input v-model="form.code" placeholder="请输入权限标识"/>
              </el-form-item>
            </el-col>
            <!--                  外链-->
            <template v-if="form.type===2">
              <el-col :span="12">
                <el-form-item label="图标">
                  <custom-icon-input v-model:value="form.icon"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="外链菜单" prop="name">
                  <el-input v-model="form.name" placeholder="请输入外链菜单名称"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="链接地址" prop="name">
                  <el-input v-model="form.linkUrl" placeholder="请输入链接地址"/>
                </el-form-item>
              </el-col>
            </template>
            <!--                  权限-->
            <template v-else-if="form.type===3">
              <el-col :span="12">
                <el-form-item label="权限名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入权限名称"/>
                </el-form-item>
              </el-col>

            </template>
            <!--                  菜单-->
            <template v-else>
              <el-col :span="12">
                <el-form-item label="菜单名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入菜单名称（如：菜单管理）"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路由路径" prop="routeUrl">
                  <el-input v-model="form.routeUrl" placeholder="请输入路由路径（如：/menu）"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路由名称" prop="routeName">
                  <el-input v-model="form.routeName" placeholder="请输入路由名称（如：Menu）"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路由重定向">
                  <el-input v-model="form.routeRedirect" placeholder="请输入路由重定向（如：/system）"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="页面路径" prop="componentPath">
                  <el-input v-model="form.componentPath" placeholder="请输入页面路径（如：system/menu/index）"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="图标">
                  <custom-icon-input v-model:value="form.icon"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否显示">
                  <el-radio-group v-model="form.isShow">
                    <el-radio :label="true" border>是</el-radio>
                    <el-radio :label="false" border>否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否缓存">
                  <el-radio-group v-model="form.isCache">
                    <el-radio :label="true" border>是</el-radio>
                    <el-radio :label="false" border>否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否首页">
                  <el-radio-group v-model="form.isHome">
                    <el-radio :label="true" border>是</el-radio>
                    <el-radio :label="false" border>否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="12">
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
            <el-button type="primary" @click="submit">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
import {getCascadeParent} from "@/utils";
import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
import {addSysMenu, deleteSysMenu, getAllSysMenuTreeList, getSysMenu, updateSysMenu} from "@/api/menu";
import SvgIcon from '@/components/SvgIcon/index.vue'

const formRef = ref<FormInstance>()


/** 查询*/
let queryForm = ref({})
// 查询
const onSearch = () => {
  getTableList();
}
// 查询
const onReset = () => {
  queryForm.value = {}
  getTableList();
}

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 默认展开第一级
const expandRowKeys=computed(()=>{
  return tableData.data.map((p:any)=>p.id)
})
// 获取表格列表
const getTableList = () => {
  getAllSysMenuTreeList({...queryForm.value}).then(res => {
    tableData.data = res || [];
  })
}
/** 删除*/
const delTable = (row: any) => {
  ElMessageBox.confirm(
      '是否确认删除本条数据？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(() => {
        deleteSysMenu(row.id).then(() => {
          ElMessage.success('删除成功');
          getTableList();
        })
      }).catch(() => {
  })
}


/** 添加，编辑*/
// 类型
const typeOptions = [
  {
    name: '菜单',
    id: 1,
  },
  {
    name: '外链',
    id: 2,
  },
  {
    name: '权限',
    id: 3,
  },
]
// 表单
let form: any = ref({
  type: 1,
  isCache: false,
  isShow: true,
  isHome: false,
  status: true
})
// 效验规则
const rules={
  1:{
    name: [
      {required: true, message: '请输入菜单名称'},
    ],
    sort: [
      {required: true, message: '请输入排序'},
    ],
    code: [
      {required: true, message: '请输入权限标识'},
    ],
    routeUrl: [
      {required: true, message: '请输入路由路径'},
    ],
    routeName: [
      {required: true, message: '请输入路由名称'},
    ],
    componentPath: [
      {required: true, message: '请输入页面路径'},
    ],
  },
  2:{
    name: [
      {required: true, message: '请输入菜单名称'},
    ],
  },
  3:{
    name: [
      {required: true, message: '请输入权限名称'},
    ],
    code: [
      {required: true, message: '请输入权限标识'},
    ],
  }
}

// 选择类型
const changeType = () => {
  if(formRef.value)formRef.value.resetFields();
}

// 获取详情
const getDetails = (id: number | string) => {
  getSysMenu(id).then(res => {
    form.value = Object.assign({}, form.value, res);
    form.value.parentIds = getCascadeParent(tableData.data, form.value.parentId)
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "新增",
  id: null,
})
// 打开弹框
const openDialog = (row: any) => {
  dialogData.isShow = true;
  dialogData.title = '新增菜单';
  if (row?.id) {
    dialogData.id = row.id;
    dialogData.title = '编辑菜单';
    getDetails(row.id);
  }
}
// 关闭弹框
const closeDialog = () => {
  dialogData.isShow = false;
  dialogData.id = null;
  form.value = {
    type: 1,
    isCache: false,
    isShow: false,
    status: true
  };
}
// 提交
const submit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      let data = form.value, params = {}
      if(form.value.type === 1) {
        params = {
          name: data.name,
          parentId: data.parentId||0,
          icon: data.icon,
          type: data.type,
          code: data.code,
          status: data.status,
          sort: data.sort,
          routeUrl: data.routeUrl,
          routeName: data.routeName,
          routeRedirect: data.routeRedirect,
          componentPath: data.componentPath,
          isShow: data.isShow,
          isCache: data.isCache,
        }
      }else if (form.value.type === 2) {
        params = {
          name: data.name,
          parentId: data.parentId||0,
          type: data.type,
          icon: data.icon,
          code: data.code,
          status: data.status,
          sort: data.sort,
          isLink:1,
          isShow:true,
          linkUrl:data.linkUrl
        }
      } else {
        params = {
          name: data.name,
          parentId: data.parentId||0,
          code: data.code,
          type: data.type,
          status: data.status,
          sort: data.sort,
        }
      }
      if (data.id) {
        updateSysMenu({id: data.id, ...params}).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      } else {
        addSysMenu(params).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          getTableList();
        })
      }
    }
  })

}

getTableList();
</script>
<style></style>
