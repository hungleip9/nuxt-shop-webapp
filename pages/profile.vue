<template>
  <div class="w-full h-full">
    <ProfileUploadAvatar v-model="ruleForm.imageFile" :firstImg="ruleForm.photo"/>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-row :gutter="10">
        <el-col :xs="24" :lg="12">
          <v-input
            v-model="ruleForm.fullName"
            prop="fullName"
            label="Họ và tên"
            @keydown.enter.prevent="submitForm()"
          />
        </el-col>
        <el-col :xs="24" :lg="12">
          <v-input
            v-model="ruleForm.address"
            prop="address"
            label="Địa chỉ"
            @keydown.enter.prevent="submitForm()"
          />
        </el-col>
        <el-col :xs="24" :lg="12">
          <v-input
            type="date"
            v-model="ruleForm.dateOfBirth"
            prop="dateOfBirth"
            label="Ngày sinh"
            @keydown.enter.prevent="submitForm()"
          />
        </el-col>
        <el-col :xs="24" :lg="12">
          <v-input
            v-model="ruleForm.idNumber"
            type="number"
            prop="idNumber"
            label="Căn cước công dân"
            @keydown.enter.prevent="submitForm()"
          />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :lg="16"></el-col>
        <el-col :xs="24" :lg="4" class="mb-4">
          <el-button class="w-full" @click="handleReset()">Hoàn tác</el-button>
        </el-col>
        <el-col :xs="24" :lg="4">
          <el-button
            class="w-full"
            type="primary"
            :loading="loadingBtn"
            @click="submitForm()"
          >
            Cập nhật
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { handleGetInfo, updateInfo } from '~~/services/header';
import type { ComponentSize, FormInstance } from "element-plus";
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const loadingBtn = ref(false);
const auth = useAuth()

interface RuleForm {
  address: string;
  dateOfBirth: string;
  fullName: string;
  idNumber: string;
  photo: string;
  imageFile: any
}
const ruleForm = reactive<RuleForm>({
  address: "",
  dateOfBirth: "",
  fullName: "",
  idNumber: "",
  photo: "",
  imageFile: null
});
watch(() => auth.infoUser, (info) => {
  mapingInfo()
})
onMounted(async () => {
  await handleGetInfo()
  mapingInfo()
})
const mapingInfo = () => {
  if (!auth.infoUser) return
  const {idNumber, address, dateOfBirth, fullName, photo} = auth.infoUser
  ruleForm.idNumber = idNumber || ''
  ruleForm.address = address || ''
  ruleForm.dateOfBirth = dateOfBirth || ''
  ruleForm.fullName = fullName || ''
  ruleForm.photo = photo || ''
}

const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (!valid) return;
    loadingBtn.value = true;
    let data = {...ruleForm}
    if (data.imageFile) {
      data.imageFile = data.imageFile.split(';base64,')[1]
    }
    await updateInfo(data).then(res => {
      const info = res?.data?.data?.info || null
      if (!info) return
      auth.setInfo(info)
    }).catch(e => {
      console.log('e: ', e)
    })
    loadingBtn.value = false;
  });
};
const handleReset = async () => {
  Object.assign(ruleForm, {
    address: "",
    dateOfBirth: "",
    fullName: "",
    idNumber: "",
    photo: "",
    imageFile: null
  });
};
</script>
<style scoped>
.grid-content {
  background-color: #99a9bf;
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 36px;
  color: white;
}
</style>
