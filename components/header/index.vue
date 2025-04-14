<script setup lang="ts">
const emit = defineEmits(["showHide"]);
const colorMode = useColorMode()
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="w-full h-full flex flex-row items-center justify-between">
    <div class="flex-1">
      <span @click="emit('showHide')" class="cursor-pointer">Header</span>
    </div>
    <client-only>
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
    </client-only>
  </div>
</template>

<style lang="scss" scoped></style>
