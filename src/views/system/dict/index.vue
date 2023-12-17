<template>
  <div>
    <el-row :gutter="5">
      <!--      字典类型-->
      <el-col :span="6">
        <el-card shadow="never">
          <!--       新增-->
          <el-button type="primary" @click="openDictTypeDialog">
            <el-icon class="mr5">
              <ele-circle-plus/>
            </el-icon>
            新 增
          </el-button>
          <!--       类型搜索-->
          <el-input v-model="dictTypeData.params.keyword" clearable @clear="getSysDictTypeList"
                    @change="getSysDictTypeList" class="mt10" placeholder="输入字典类型名称搜索">
            <template #prefix>
              <el-icon>
                <ele-search/>
              </el-icon>
            </template>
          </el-input>
          <!--        字典类型列表-->
          <div class="dict-type-list mt10 mb10">
            <template v-if="dictTypeData.data.length>0">
              <div v-for="item in dictTypeData.data" :class="tableConfig.initParam?.dictCode===item.id?'selected':''"
                   class="dict-type-item flex-between" @click="pickDictType(item.code)">
                <span>{{ item.name }}</span>
                <span class="color-info font12">{{ item.code }}</span>
                <div v-if="item.isSystem" class="dict-type-operation">
                  <el-tooltip
                      content="系统字典类型，无法修改"
                      placement="top"
                  >
                    <el-button size="small" disabled @click="openDictTypeDialog(item)">
                      <el-icon>
                        <ele-edit/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                      content="系统字典类型，无法删除"
                      placement="top"
                  >
                    <el-button size="small" disabled @click="delDictType(item)">
                      <el-icon>
                        <ele-delete/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
                <div v-else class="dict-type-operation">
                  <el-button size="small" @click="openDictTypeDialog(item)">
                    <el-icon>
                      <ele-edit/>
                    </el-icon>
                  </el-button>
                  <el-button size="small" @click="delDictType(item)">
                    <el-icon>
                      <ele-delete/>
                    </el-icon>
                  </el-button>
                </div>
              </div>
            </template>
            <div v-else class="color-info font12 mt30 flex flex-center">暂无数据</div>
          </div>
        </el-card>
      </el-col>
      <!--    字典数据  -->
      <el-col :span="18">
        <el-card shadow="never">
          <!--       新增-->
          <el-button v-if="tableConfig.initParam?.dictCode&&tableConfig.initParam?.dictCode!=='0'" type="primary"
                     @click="openDictDialog" class="mb10">
            <el-icon class="mr5">
              <ele-circle-plus/>
            </el-icon>
            新 增
          </el-button>
          <custom-table :columns="columns" :data="tableData" :initParam="dictTypeData.initParam">
            <template #status="{row}">
              <el-tag v-if="row.status" type="success" disable-transitions>启用</el-tag>
              <el-tag v-else type="danger" disable-transitions>禁用</el-tag>
            </template>
            <template #operation="{ row }">
              <el-button link type="primary" @click="openDictDialog(row)">
                修改
              </el-button>
              <el-button @click="delDict(row)" link type="danger">
                删除
              </el-button>
            </template>
          </custom-table>
          <custom-pagination :total="pagination.total" :currentPage="pagination.pageIndex"
          :pageSize="pagination.pageSize" @changePage="changePage" @changeSize="changeSize"/>
        </el-card>
      </el-col>
    </el-row>

    <!--    字典列表：添加，编辑弹框-->
    <DictDialog ref="dictDialogRef" :dictCode="tableConfig.initParam?.dictCode" :typeList="dictTypeData.data" @refresh="getTableData"/>

    <!--    字典类型：添加，编辑弹框-->
    <DictTypeDialog ref="dictTypeDialogRef" @refresh="getSysDictTypeList"/>
  </div>
</template>
<script lang="ts" setup>
import DictTypeDialog from "./components/DictTypeDialog.vue";
import DictDialog from "./components/DictDialog.vue";
import {getSysDictPageApi,deleteSysDictApi, deleteSysDictTypeApi, getSysDictTypeListApi} from "@/api/dict";
import {delTable} from "@/utils/table";
import useTable from "@/components/Custom/CustomTable/useTable";
import {getCourseTypeTreeListApi} from "@/api/course";

/**
 * 字典列表
 * */
const dictDialogRef = ref();
// 表格列信息
const columns = [
  {
    prop: 'label',
    label: '名称',
  },
  {
    prop: 'dictCode',
    label: '类型',
  },
  {
    prop: 'value',
    label: '数据值',
  },
  {
    prop: 'sort',
    label: '排序',
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'status',
    label: '状态',
    isCustom: true,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width:170,
  },
  {
    prop: 'operation',
    label: '操作',
    isCustom: true,
    fixed: 'right',
    width: 120
  },
]

// 打开字典列表弹框
function openDictDialog(data = {}) {
  dictDialogRef.value.openDialog(data);
}

const tableConfig=reactive({
  request: getSysDictPageApi,
  initParam: {
    dictCode: ''
  },
  immediate:false,
})
// 获取表格数据
const {tableData,search,pagination, getTableData,changePage,changeSize} = useTable(tableConfig)

// 删除字典列表
function delDict(row: any) {
  delTable({
    id: row.id,
    request: deleteSysDictApi,
    callback: () => {
      getTableData();
    }
  })
}


/**
 * 字典类型
 * */
const dictTypeDialogRef = ref();
// 字典类型数据
const dictTypeData = reactive({
  data: [],
  params: {
    pageSize: 9999,
    keyword: ''
  }
})

// 获取字典类型列表
function getSysDictTypeList() {
  getSysDictTypeListApi(dictTypeData.params).then(res => {
    dictTypeData.data = res || []
  })
}

// 打开字典类型弹框
function openDictTypeDialog(data = {}) {
  dictTypeDialogRef.value.openDialog(data);
}

// 删除字典类型
function delDictType(row: any) {
  delTable({
    id: row.id,
    request: deleteSysDictTypeApi,
    callback: () => {
      getSysDictTypeList();
    }
  })
}

// 选择字典类型
function pickDictType(code: string) {
  tableConfig.initParam.dictCode = code;
  getTableData();
}


getSysDictTypeList();
</script>
<style lang="scss" scoped>
.dict-type-list {
  height: calc(100vh - 230px);
  overflow-y: auto;

  .dict-type-item {
    cursor: pointer;
    padding: 0 10px;
    height: 30px;
    position: relative;

    &.selected {
      background-color: #eaeefe;
    }

    &:hover {
      background-color: #f5f7fa;

      .dict-type-operation {
        display: flex;
        align-items: center;
      }
    }

    .dict-type-operation {
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 10;
      height: 100%;
      background-color: #f5f7fa;
      display: none;
    }
  }
}
</style>
