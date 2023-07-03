<template>
  <div v-if="dialogData.isShow">
    <el-dialog :model-value="true" destroy-on-close :title="dialogData.title" @close="closeDialog">
      <el-form ref="formRef" :rules="rules[form.type]" :model="form" :validate-on-rule-change="false"
               label-width="90px">
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
              <custom-tree-select v-model:value="form.parentId" :options="menuList" placeholder="请选择上级菜单"/>
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
</template>

<script lang="ts" setup>
import {addSysMenu, getAllSysMenuTreeList, getSysMenu, updateSysMenu} from "@/api/menu";
import {ElMessage, FormInstance} from "element-plus";

const formRef = ref<FormInstance>()

const emits = defineEmits<{
  (event: 'refresh'): void
}>()

// 菜单类型
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
const rules = {
  1: {
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
  2: {
    name: [
      {required: true, message: '请输入菜单名称'},
    ],
  },
  3: {
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
  if (formRef.value) formRef.value.resetFields();
}


const menuList = ref([])
// 获取所有菜单
const getTableList = () => {
  getAllSysMenuTreeList({}).then(res => {
    menuList.value = res || [];
  })
}

// 获取详情
const getDetails = (id: number | string) => {
  getSysMenu(id).then(res => {
    form.value = Object.assign({}, form.value, res);
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "新增",
  id: null,
})
// 打开弹框
const openDialog = async (row: any) => {
  dialogData.isShow = true;
  dialogData.title = '新增菜单';
  await getTableList();
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
      if (form.value.type === 1) {
        params = {
          name: data.name,
          parentId: data.parentId || 0,
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
          isHome:data.isHome
        }
      } else if (form.value.type === 2) {
        params = {
          name: data.name,
          parentId: data.parentId || 0,
          type: data.type,
          icon: data.icon,
          code: data.code,
          status: data.status,
          sort: data.sort,
          isLink: 1,
          isShow: true,
          linkUrl: data.linkUrl
        }
      } else {
        params = {
          name: data.name,
          parentId: data.parentId || 0,
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
          emits('refresh');
        })
      } else {
        addSysMenu(params).then(() => {
          ElMessage.success('操作成功');
          closeDialog();
          emits('refresh');
        })
      }
    }
  })

}

defineExpose({
  openDialog,
});
</script>

<style scoped>

</style>
