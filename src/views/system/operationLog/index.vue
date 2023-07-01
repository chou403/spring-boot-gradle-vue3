<template>
  <el-card shadow="never" class="card-box">
    <!--    查询-->
    <el-form :model="queryForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="模块名称">
            <el-input v-model="queryForm.moduleName" placeholder="请输入模块名称" clearable/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="请求路径">
            <el-input v-model="queryForm.requestUrl" placeholder="请输入请求路径" clearable/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="日志名称">
            <el-input v-model="queryForm.logName" placeholder="请输入日志名称" clearable/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="操作人">
            <el-input v-model="queryForm.username" placeholder="请输入操作人" clearable/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="日志类型">
            <el-select v-model="queryForm.logType" placeholder="请选择日志类型" clearable>
              <el-option v-for="(item,index) in system_status.logType" :key="index" :label="item.label" :value="index"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="响应状态">
            <el-select v-model="queryForm.responseSuccess" placeholder="请选择响应状态" clearable>
              <el-option label="成功" :value="true"/>
              <el-option label="失败" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="请求人IP">
            <el-input v-model="queryForm.requestIp" placeholder="请输入请求人IP" clearable/>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="8" :xl="6">
          <el-form-item label="创建时间">
            <custom-date-picker type="daterange" v-model:startDate="queryForm.createStartTime"
                                v-model:endDate="queryForm.createEndTime" clearable start-placeholder="开始时间"
                                end-placeholder="结束时间"/>
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
    <!--    表格-->
    <el-table :data="tableData.data" border style="width: 100%" row-key="id" @sort-change="sortChange">
      <el-table-column prop="moduleName" label="模块名称" align="center"/>
      <el-table-column prop="logName" label="日志名称" width="230">
        <template #default="{row}">
          <el-tooltip :content="`${row.requestMethod} ${row.requestUrl}`">
            <span>{{ row.logName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="logType" label="日志类型" align="center">
        <template #default="{row}">
          <span>{{ system_status.logType[row.logType].label }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="responseSuccess" label="响应状态" align="center">
        <template #default="{row}">
          <custom-tag :type="system_status.responseSuccess[row.responseSuccess].type">
            {{ system_status.responseSuccess[row.responseSuccess].label }}
          </custom-tag>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="操作人" align="center"/>
      <el-table-column prop="requestIp" label="请求IP" align="center" width="150">
        <template #default="{row}">
          <el-tooltip :content="row.requestMethod">
            <span>{{ row.requestIp }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="diffTimeDesc" label="耗时" align="center" sortable="custom"/>
      <el-table-column prop="createTime" label="创建时间" align="center"  sortable="custom" width="180"/>
      <el-table-column label="操作" fixed="right" align="center">
        <template #default="{ row }">
          <el-button link type="primary" @click="openDialog(row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <CustomPagination v-model:currentPage="pageData.pageIndex" v-model:pageSize="pageData.pageSize"
                      :total="pageData.total" @changePage="changePage"/>
    <!--    详情弹框-->
    <div v-if="dialogData.isShow">
      <el-dialog :model-value="true" destroy-on-close title="日志详情" @close="closeDialog">
        <div>
          <div class="details-item">
            <div class="label">日志链路ID</div>
            <div class="content">{{ form.traceId }}</div>
          </div>
          <div class="details-item">
            <div class="label">模块名称</div>
            <div class="content">{{ form.moduleName }}</div>
          </div>
          <div class="details-item">
            <div class="label">用户信息</div>
            <div class="content">{{ form.username }} {{ form.requestIp }} {{ form.ipAreaDesc }}</div>
          </div>
          <div class="details-item">
            <div class="label">请求路径</div>
            <div class="content">{{ form.requestMethod }} {{ form.requestUrl }}</div>
          </div>
          <div class="details-item">
            <div class="label">请求参数</div>
            <div class="content">{{ form.requestParam }}</div>
          </div>
          <div class="details-item">
            <div class="label">日志名称</div>
            <div class="content">{{ form.logName }}</div>
          </div>
          <div class="details-item">
            <div class="label">日志类型</div>
            <div class="content">{{ system_status.logType[form.logType]?.label }}</div>
          </div>
          <div class="details-item">
            <div class="label">响应信息</div>
            <div class="content">
              <custom-tag :type="system_status.responseSuccess[form.responseSuccess]?.type">
                {{ system_status.responseSuccess[form.responseSuccess]?.label }}
              </custom-tag>
              {{ form.responseCode }} {{ form.responseMessage }}
            </div>
          </div>
          <div class="details-item">
            <div class="label">用户环境</div>
            <div class="content">{{ system_status.isMobile[form.isMobile]?.label }} {{ form.platformName }} {{
                form.browserName
              }}
            </div>
          </div>
          <div class="details-item">
            <div class="label">请求时间</div>
            <div class="content">{{ form.requestTime }} ~ {{ form.responseTime }}</div>
          </div>
          <div class="details-item">
            <div class="label">请求耗时</div>
            <div class="content">{{ form.diffTimeDesc }}</div>
          </div>
          <div v-if="form.exceptionName" class="details-item">
            <div class="label">异常类</div>
            <div class="content">{{ form.exceptionName }}</div>
          </div>
          <div v-if="form.exceptionMessage" class="details-item">
            <div class="label">异常信息</div>
            <div class="content">
              <el-input v-model="form.exceptionMessage" :autosize="{ minRows: 2, maxRows: 15 }"
                        type="textarea" disabled/>
            </div>
          </div>
        </div>
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
import {getSysLog, getSysLogList,} from "@/api/log";
import {system_status} from "@/utils/status";
import {FormInstance} from 'element-plus'


const formRef = ref<FormInstance>()

/** 查询*/
let queryForm = ref({})
// 查询
const onSearch = () => {
  pageData.pageIndex = 1;
  getTableList();
}
// 重置
const onReset = () => {
  queryForm.value = {}
  pageData.pageIndex = 1;
  getTableList();
}

/** 分页*/
// 分页数据
const pageData = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0
})
// 翻页
const changePage = (page: number) => {
  pageData.pageIndex = page;
  getTableList();
}

/** 表格*/
// 表格数据
const tableData = reactive({
  data: [],
})
// 获取表格列表
const getTableList = () => {
  getSysLogList({...pageData, ...queryForm.value, orderBy: {...orderBy.value}}).then(res => {
    tableData.data = res.list || [];
    pageData.total = res.total;
  })
}
/** 排序*/
const orderBy = ref({})
// 排序
const sortChange = ({column, prop, order}) => {
  console.log(121,order,column,prop)
  if (order) {
    if(prop==="diffTimeDesc"){
      orderBy.value.column = "diff_time";
    }else if(prop==="createTime"){
      orderBy.value.column = "create_time";
    }
    orderBy.value.asc = order === "ascending";
  } else {
    orderBy.value = {}
  }

  pageData.pageIndex = 1;
  getTableList();
}

/** 添加，编辑*/
// 表单
let form: any = ref({});

// 获取详情
const getDetails = (id: number | string) => {
  getSysLog(id).then(res => {
    form.value = Object.assign({}, form.value, res);
  })
}
// 弹框数据
const dialogData = reactive({
  isShow: false,
  title: "操作日志详情",
  id: null,
})
// 打开弹框
const openDialog = async (row: any) => {
  dialogData.isShow = true;
  if (row?.id) {
    getDetails(row.id);
  }
}
// 关闭弹框
const closeDialog = () => {
  dialogData.isShow = false;
  dialogData.id = null;
  form.value = {};
}
// 提交
const submit = async () => {
  closeDialog();
}

getTableList();
</script>
<style lang="scss" scoped>
.label {
  flex:0 0 100px;
  padding: 10px;
  border-right: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.details-item{
  width: 100%;
  display: flex;
  border: 1px solid #eee;
  border-bottom: none;
  &:last-child{
    border-bottom: 1px solid #eee;
  }
}
.content {
  flex:auto;
  padding: 10px;
  word-break: break-all;
}
</style>
