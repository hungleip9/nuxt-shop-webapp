<template>
  <div class="avatar-upload mb-2">
    Avatar
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      accept="image/png,image/jpeg,image/jpg,image/gif"
    >
      <div class="avatar-container">
        <img v-if="imageUrl || firstImg" :src="imageUrl ? imageUrl : firstImg" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
        
        <!-- Action buttons that appear on hover -->
        <div class="box-action-btn">
          <div v-if="imageUrl || firstImg" class="action-buttons">
            <div class="action-icon preview-icon" @click.stop="openPreview">
              <el-icon :size="18"><ZoomIn /></el-icon>
            </div>
            <div class="action-icon delete-icon" @click.stop="removeImage">
              <el-icon :size="18"><Delete /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </el-upload>

    <!-- Preview Dialog -->
    <el-dialog v-model="previewVisible" title="Image Preview" width="700px">
      <img :src="imageUrl ? imageUrl : firstImg" class="preview-image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadFiles, UploadProps } from 'element-plus'
const props = defineProps({
  firstImg: {
    type: String,
    default: "",
  }
})

const imageUrl = defineModel() as any
const file = ref<File | null>(null)
const previewVisible = ref(false)

const handleChange: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const rawFile = uploadFile.raw as File
  
  // Validate file type
  const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(rawFile.type)
  if (!isValidType) {
    ElMessage.error('Avatar must be JPG, PNG or GIF!')
    return
  }
  
  // Validate file size (2MB)
  const isLt2M = rawFile.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('Avatar size must be less than 2MB!')
    return
  }
  
  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(rawFile)
  
  file.value = rawFile
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile: File) => {
  return false
}

const removeImage = () => {
  imageUrl.value = ''
  file.value = null
}

const openPreview = () => {
  previewVisible.value = true
}
</script>

<style lang="scss" scoped>
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar-container {
  position: relative;
  width: 148px;
  height: 148px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  text-align: center;
}
.box-action-btn {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: var(--el-overlay-color-lighter);
  transition: opacity var(--el-transition-duration);
  &:hover {
    opacity: 1;
  }
  .action-buttons {
    position: absolute;
    top: 50%; /* Đưa lên giữa theo chiều dọc */
    left: 50%; /* Đưa vào giữa theo chiều ngang */
    transform: translate(-50%, -50%); /* Căn chính xác tâm */
    display: flex;
    gap: 10px; /* Tăng khoảng cách giữa các icon */
  }
}

.action-icon {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.preview-icon:hover {
  background-color: rgba(32, 160, 255, 0.8);
}

.delete-icon:hover {
  background-color: rgba(245, 108, 108, 0.8);
}

.avatar-container:hover .action-icon {
  opacity: 1;
}

.avatar-actions {
  margin-top: 12px;
}

.avatar-hint {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  text-align: center;
  margin-top: 8px;
}

.preview-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}

:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}
</style>