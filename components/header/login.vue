<script setup lang="ts">
import { logout } from '~~/services/header';
import type { DropdownInstance } from 'element-plus'
const auth = useAuth();
const dropdownActionUser = ref<DropdownInstance>()
const openModal = (type = "") => {
  if (!type) return;
  _pushParamsRouter("type_modal_login", type);
};
const handleLogout = async() => {
  await auth.setInfo(null)
  await auth.logout()
  _keyLocalStorage({ type: 'SET', key: 'token', value: '' })
  _keyLocalStorage({ type: 'SET', key: 'refresh', value: '' })
  await logout()
}
const showDropdownActionUser = () => {
  if (!dropdownActionUser.value) return
  dropdownActionUser.value.handleOpen()
}
</script>

<template>
  <div class="flex flex-row items-center justify-center">
    <Icon
      v-show="!auth.infoUser"
      class="cursor-pointer"
      name="bi:person"
      size="20px"
      @click="openModal('sign-in')"
    />
    <el-dropdown ref="dropdownActionUser" trigger="contextmenu">
      <span v-show="auth.infoUser"
        @click="showDropdownActionUser()"
        class="el-dropdown-link">
        {{ auth?.infoUser?.userName || auth?.infoUser?.email || "" }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout()">
            <Icon
              class="mr-2"
              name="line-md:log-out"
              size="20px"
            />
            Đăng xuất
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- modal -->
    <HeaderModalLogin />
  </div>
</template>

<style lang="scss" scoped></style>
