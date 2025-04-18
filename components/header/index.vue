<script setup lang="ts">
import { handleGetInfo } from '~~/services/header';
const emit = defineEmits(["showHide"]);
const colorMode = useColorMode()
const loading = ref(true)
const isCollapse = _useCookie('isCollapse') as any;
onMounted(async () => {
  loading.value = true
  await handleGetInfo()
  loading.value = false
})
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="w-full h-full flex flex-row items-center justify-between">
    <div class="flex-1 flex flex-row items-center">
      <el-icon class="mr-2 cursor-pointer" :size="25" @click="emit('showHide')">
        <fold v-show="!isCollapse"/>
        <expand v-show="isCollapse"/>
      </el-icon>
      <NuxtLink :to="'/'">
        <span class="cursor-pointer">Header</span>
      </NuxtLink>
    </div>
    <client-only>
      <div class="flex flex-row items-center justify-center">
        <HeaderLogin v-show="!loading"/>
        <div class="flex flex-row items-center justify-center ml-2">
          <Icon v-if="colorMode.value === 'dark'"
            name="line-md:sun-rising-loop"
            class="cursor-pointer"
            size="20px"
            @click="toggleColorMode()" />
          <Icon v-else
            name="line-md:sunny-outline-to-moon-loop-transition"
            class="cursor-pointer"
            size="20px"
            @click="toggleColorMode()" />
        </div>
      </div>
    </client-only>
  </div>
</template>

<style lang="scss" scoped></style>
