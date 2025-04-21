<script lang="ts" setup>
const isCollapse = _useCookie("isCollapse") as any;
const isSmallScreen = useMediaQuery("(max-width: 768px)");
const route = useRoute();
watch(
  isSmallScreen,
  (isSmall) => {
    if (isSmall) {
      isCollapse.value = true;
    }
  },
  { immediate: true }
);
</script>

<template>
  <el-container class="layout-container-demo w-full h-full">
    <el-menu
      :default-active="route.path"
      class="el-menu-demo"
      :collapse="isCollapse"
    >
      <el-menu-item index="/" @click="navigateTo('/')">
        <el-icon><icon-menu /></el-icon>
        <template #title>Trang chủ</template>
      </el-menu-item>
      <el-menu-item index="/demo" @click="navigateTo('/demo')">
        <el-icon><icon-menu /></el-icon>
        <template #title>Demo</template>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header class="box-header">
        <Header @showHide="isCollapse = !isCollapse" />
      </el-header>
      <el-main> <slot /> </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.box-header {
  border-bottom: 1px solid var(--el-menu-border-color);
}
</style>
