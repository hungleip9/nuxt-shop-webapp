<template>
  <el-dialog
    v-model="dialogVisible"
    :title="titleModal"
    width="300px"
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
      <v-input
        v-if="typeModal == 'sign-up' || typeModal == 'forgotpassword'"
        v-model="ruleForm.passwordConfirm"
        prop="passwordConfirm"
        label="Nhập lại mật khẩu"
        type="password"
        @keydown.enter.prevent="submitForm()"
      />
      <v-input
        v-if="typeModal == 'sign-up'"
        v-model="ruleForm.email"
        type="text"
        prop="email"
        label="Email"
        @keydown.enter.prevent="submitForm()"
      />
      <v-input
        v-if="typeModal == 'sign-up'"
        v-model="ruleForm.userName"
        type="text"
        prop="userName"
        label="Tên tài khoản"
        @keydown.enter.prevent="submitForm()"
      />
    </el-form>
    <div class="grid grid-flow-col gap-1">
      <a
        class="btn label"
        v-if="typeModal != 'sign-in'"
        @click="handleChangeType('sign-in')"
      >
        Đăng nhập
      </a>
      <a
        class="btn label"
        v-if="typeModal != 'sign-up'"
        @click="handleChangeType('sign-up')"
      >
        Đăng ký
      </a>
      <a
        class="btn label"
        v-if="typeModal != 'forgotpassword'"
        @click="handleChangeType('forgotpassword')"
      >
        Quên mật khẩu
      </a>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Thoát</el-button>
        <el-button type="primary" :loading="loadingBtn" @click="submitForm()">
          {{ textBtn }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { login, signup, fotgot } from "~~/services/header";
import { ElMessage } from "element-plus";
const auth = useAuth();
interface RuleForm {
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  email: string;
  userName: string;
}
const dialogVisible = ref(false);
const loadingBtn = ref(false);
const ruleForm = reactive<RuleForm>({
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
  email: "",
  userName: "",
});
const route = useRoute();
const rules = reactive<FormRules<RuleForm>>({
  phoneNumber: [
    {
      required: true,
      message: "Bạn chưa nhập số điện thoại",
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => {
        if (value && !phoneRegex.test(value)) {
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
  ],
  passwordConfirm: [
    {
      required: true,
      message: "Vui lòng nhập lại mật khẩu",
      trigger: "change",
    },
    {
      validator: (rule, value, callback) => {
        if (value != ruleForm.password) {
          callback(new Error("Nhập lại mật khẩu không khớp!"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  email: [
    { required: true, message: "Vui lòng nhập email", trigger: "change" },
    {
      validator: (rule, value, callback) => {
        if (value && !emailRegex.test(value)) {
          callback(new Error("Email không đúng định dạng"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  userName: [
    {
      required: true,
      message: "Vui lòng nhập tên tài khoản",
      trigger: "change",
    },
  ],
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
  if (typeModal.value == "forgotpassword") {
    return "Quên mật khẩu";
  }
  return "";
});
const textBtn = computed(() => {
  if (typeModal.value == "sign-in") {
    return "Đăng nhập";
  }
  if (typeModal.value == "sign-up") {
    return "Đăng ký";
  }
  if (typeModal.value == "forgotpassword") {
    return "Lấy lại mật khẩu";
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
    if (!valid) return;
    loadingBtn.value = true;
    if (typeModal.value == "sign-in") {
      await handleLogin();
    }
    if (typeModal.value == "sign-up") {
      await handleSignUp();
    }
    if (typeModal.value == "forgotpassword") {
      await handleForgetPassword();
    }
  });
};
const handleLogin = async () => {
  const data = {
    phoneNumber: ruleForm.phoneNumber,
    password: ruleForm.password,
  };
  await login(data)
    .then((res) => {
      const token = res?.data?.data?.token || "";
      const refresh = res?.data?.data?.refresh || "";
      const info = res?.data?.data?.info || null;
      _keyLocalStorage({
        type: "SET",
        key: "token",
        value: token,
      });
      auth.login();
      _keyLocalStorage({
        type: "SET",
        key: "refresh",
        value: refresh,
      });
      auth.setInfo(info);
      ElMessage({
        message: "Đăng nhập thành công!",
        type: "success",
      });
      dialogVisible.value = false;
    })
    .catch((e) => {
      ElMessage({
        message: `${e?.response?.data?.messages || ""}`,
        type: "error",
      });
      loadingBtn.value = false;
    });
};
const handleSignUp = async () => {
  const data = {
    userName: ruleForm.userName,
    phoneNumber: ruleForm.phoneNumber,
    email: ruleForm.email,
    password: ruleForm.password,
  };
  await signup(data)
    .then((res) => {
      const token = res?.data?.data?.token || "";
      const refresh = res?.data?.data?.refresh || "";
      const info = res?.data?.data?.info || null;
      _keyLocalStorage({
        type: "SET",
        key: "token",
        value: token,
      });
      auth.login();
      _keyLocalStorage({
        type: "SET",
        key: "refresh",
        value: refresh,
      });
      auth.setInfo(info);
      ElMessage({
        message: "Đăng ký thành công!",
        type: "success",
      });
      dialogVisible.value = false;
    })
    .catch((e) => {
      ElMessage({
        message: `${e?.response?.data?.messages || ""}`,
        type: "error",
      });
      loadingBtn.value = false;
    });
};
const handleForgetPassword = async () => {
  const data = {
    phoneNumber: ruleForm.phoneNumber,
    password: ruleForm.password,
  };
  await fotgot(data)
    .then(async (res) => {
      const mess = res?.data?.messages || ''
      await ElMessage({
        message: mess,
        type: "success",
      });
      handleChangeType('sign-in')
    })
    .catch((e) => {
      ElMessage({
        message: `${e?.response?.data?.messages || ""}`,
        type: "error",
      });
      loadingBtn.value = false;
    });
};
const close = async () => {
  loadingBtn.value = false;
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
async function handleChangeType(str: string) {
  await _pushParamsRouter("type_modal_login", str);
  resetForm();
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  display: inline-block !important;
  &:hover {
    color: var(--el-menu-active-color);
  }
  &:nth-child(1) {
    text-align: left;
  }
  &:nth-child(2) {
    text-align: right;
  }
  &:nth-child(3) {
    text-align: right;
  }
}
</style>
