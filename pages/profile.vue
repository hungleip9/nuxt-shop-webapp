<template>
  <div class="w-full h-full">
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
            v-model="ruleForm.email"
            prop="email"
            label="Email"
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
            v-model="ruleForm.dateOfBirth"
            prop="dateOfBirth"
            label="Ngày sinh"
            @keydown.enter.prevent="submitForm()"
          />
        </el-col>
        <el-col :xs="24" :lg="12">
          <v-input
            v-model="ruleForm.idNumber"
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
            Cap nhật
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance } from "element-plus";
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const loadingBtn = ref(false);
interface RuleForm {
  address: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  idNumber: string;
}
const ruleForm = reactive<RuleForm>({
  address: "",
  dateOfBirth: "",
  email: "",
  fullName: "",
  idNumber: "",
});

const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (!valid) return;
    loadingBtn.value = true;
    console.log('ruleForm: ', ruleForm)
    loadingBtn.value = false;
  });
};
const handleReset = async () => {
  Object.assign(ruleForm, {
    address: "",
    dateOfBirth: "",
    email: "",
    fullName: "",
    idNumber: "",
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
