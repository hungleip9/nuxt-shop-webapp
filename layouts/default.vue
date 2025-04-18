<script lang="ts" setup>
const isCollapse = _useCookie('isCollapse') as any;
const isSmallScreen = useMediaQuery('(max-width: 768px)')
watch(isSmallScreen, (isSmall) => {
  if (isSmall) {
    isCollapse.value = true;
  }
}, { immediate: true });
</script>

<template>
  <el-container class="layout-container-demo w-full h-full">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <template #title>Menu 1</template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Menu 2</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><icon-menu /></el-icon>
        <template #title>Menu 3</template>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header class="box-header">
        <Header @showHide="isCollapse = !isCollapse"/>
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
