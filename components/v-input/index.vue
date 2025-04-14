<script lang="ts" setup>
defineModel<string>("modelValue");
const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
});
const;
</script>

<template>
  <el-input
    v-model:value="modelValue"
    style="width: 240px"
    :placeholder="placeholder"
  />
</template>
