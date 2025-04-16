<template>
  <el-dialog
    v-model="dialogVisible"
    :title="titleModal"
    width="70vw"
    align-center
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
    >
      <v-input
        v-model="ruleForm.phoneNumber"
        maxlength="11"
        type="number"
        prop="phoneNumber"
        label="Số điện thoại"
        @keydown.enter.prevent="submitForm()"
      />
      <v-input
        v-model="ruleForm.password"
        prop="password"
        label="Mật khẩu"
        type="password"
         @keydown.enter.prevent="submitForm()"
      />
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Thoát</el-button>
        <el-button
          type="primary"
          :loading="loadingBtn"
          @click="submitForm()">
          Đăng nhập
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { login, handleGetInfo } from '~~/services/header';
const auth = useAuth()
interface RuleForm {
  phoneNumber: string;
  password: string
}
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
const route = useRoute();
const dialogVisible = ref(false);
const loadingBtn = ref(false)
const ruleForm = reactive<RuleForm>({
  phoneNumber: "",
  password: ""
});
const rules = reactive<FormRules<RuleForm>>({
  phoneNumber: [
    { required: true, message: "Bạn chưa nhập số điện thoại", trigger: "change" },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("Số điện thoại không được để trống"));
        } else if (!phoneRegex.test(value)) {
          callback(new Error("Số điện thoại không đúng định dạng"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  password: [
  { required: true, message: "Vui lòng nhập mật khẩu", trigger: "change" },
  ]
});
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const typeModal = computed(() => {
  return route.query["type_modal_login"]
    ? `${route.query["type_modal_login"]}`
    : "";
});
const titleModal = computed(() => {
  if (typeModal.value == "sign-in") {
    return "Đăng nhập";
  }
  if (typeModal.value == "sign-up") {
    return "Đăng ký";
  }
  return "";
});
watch(
  () => typeModal.value,
  (val) => {
    handleOpenModal();
  }
);
onMounted(() => {
  handleOpenModal();
});
const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (!valid) return
    loadingBtn.value = true
    if (typeModal.value == 'sign-in') {
      await handleLogin()
    }
  });
};
const handleLogin = async () => {
  await login(ruleForm).then(res => {
    _keyLocalStorage({ type: 'SET', key: 'token', value: res.data.data.token })
    auth.login()
    _keyLocalStorage({ type: 'SET', key: 'refresh', value: res.data.data.refresh })
    handleGetInfo()
    dialogVisible.value = false
  }).catch(e => {
    console.log(e)
    loadingBtn.value = false
  })
}
const close = async () => {
  loadingBtn.value = false
  await _deleteParamsRouter(["type_modal_login"]);
  resetForm();
};
const handleOpenModal = () => {
  if (!typeModal.value) {
    dialogVisible.value = false;
    return;
  }
  dialogVisible.value = true;
};
const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};
</script>

<style lang="scss" scoped></style>
