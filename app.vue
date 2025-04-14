<script setup lang="ts">
if (import.meta.server) {
  useSeoMeta({
    title: 'NuxtShop Coffee',
    ogTitle: 'NuxtShop Coffee',
    description: 'Cà phê ngon số 1 Việt Name.',
    ogDescription: 'Cà phê ngon số 1 Việt Name.',
  })
}
</script>
<template>
  <div>
    <el-button @click="ElMessage('hello')">button</el-button>
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
    <LazyElButton type="warning">lazy button</LazyElButton>
  </div>
</template>
