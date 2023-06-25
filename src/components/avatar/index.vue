<template>
  <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadAvatar"
  >
    <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar"/>
    <el-icon v-else class="avatar-uploader-icon">
      <ele-plus/>
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import type {UploadProps, UploadRequestOptions} from 'element-plus'
import {ElMessage} from 'element-plus'
import {uploadLocal} from "@/api";


const props = withDefaults(defineProps<{
  value: string,
}>(), {
  value:''
})

const emits = defineEmits<{
  (event: 'update:value', name: any): void
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
    uploadFile
) => {
  console.log(response, data.imageUrl)
  // fileList = URL.createObjectURL(uploadFile.raw!)
  data.imageUrl = response;
}

// 上传头像
const uploadAvatar = (options: UploadRequestOptions) => {
  return uploadLocal({
    multipartFile: options.file
  })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader .el-upload{
  border-radius: 50% !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
}
</style>
