<template>
  <el-upload
      :before-upload="beforeAvatarUpload"
      :http-request="uploadAvatar"
      :on-success="uploadSuccess"
      :show-file-list="false"
      class="uploader"
  >
    <img :style="customStyle" v-if="data.imageUrl" :src="data.imageUrl" class="uploader-img"/>
    <slot name="tip" v-else>
      <div class="uploader-default flex-center flex-column" :style="customStyle">
        <el-icon class="uploader-icon">
          <ele-upload-filled/>
        </el-icon>
        <div class="mt5">上传</div>
      </div>
    </slot>
  </el-upload>
</template>

<script lang="ts" setup>
import type {UploadProps, UploadRequestOptions} from 'element-plus'
import {ElMessage} from 'element-plus'
import {uploadApi} from "@/api";

// 上传文件类型
const typeList:Record<string, string[]>={
  image:['jpeg','jpg','png'],
  head:['jpeg','jpg','png'],
  word:['doc','docx'],
  excel:['xls','xlsx'],
  pdf:['pdf'],
}

const props = withDefaults(defineProps<{
  value: NullType<string>,
  customStyle?:any,
  size?:number
  type?:string
}>(), {
  value: '',
  type:'any',
  size:5,
  customStyle:{}
})
const emits = defineEmits<{
  (event: 'update:value', val: any): void
  (event: 'change', url: string): void
}>()

const data = reactive({
  imageUrl: computed({
    get: () => {
      return props.value
    },
    set: val => {
      emits('update:value', val);
    }
  })
})

const uploadSuccess: UploadProps['onSuccess'] = (
    response,
) => {
  data.imageUrl = response.url;
  emits('change', response.url);
}

// 上传头像
const uploadAvatar = (options: UploadRequestOptions) => {
  return uploadApi({
    file: options.file,
  },props.type)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const extension= rawFile.name.split('.').pop() as string;
  if(props.type!=='any'&&typeList[props.type].indexOf(extension)==-1){
      ElMessage.error('抱歉，文件格式不正确')
      return false;
  }else if (rawFile.size / 1024 / 1024 > props.size) {
    ElMessage.error(`抱歉，暂时不支持大于${props.size}M的文件上传`)
    return false;
  }
  return true
}

const onPreview: UploadProps['onPreview'] = (uploadFile) => {

}
</script>

<style lang="scss">

.uploader {
  .el-upload {
    border: 1px dashed var(--el-border-color);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    border-radius: 6px !important;

    &:hover {
      border-color: var(--el-color-primary);
    }
  }

  .uploader-img {
    width: 150px;
    height: 150px;
    display: block;
  }

  .uploader-default {
    color: #8c939d;
    width: 150px;
    height: 150px;
    font-size: 14px;
    .uploader-icon{
      font-size: 40px;
    }
  }
}


</style>
