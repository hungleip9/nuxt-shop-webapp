<script lang="ts" setup>
const isCollapse = _useCookie('isCollapse') as any;
const isSmallScreen = useMediaQuery('(max-width: 768px)')
const config = useRuntimeConfig();
// console.log('config.public.baseUrlNews: ', config.public.BASE_API);
watch(isSmallScreen, (isSmall) => {
  if (isSmall) {
    isCollapse.value = true;
  }
}, { immediate: true });
</script>

<template>
  <el-container class="layout-container-demo w-full h-full">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header class="box-header">
        <Header @showHide="isCollapse = !isCollapse"/>
      </el-header>
      <el-main> main </el-main>
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
