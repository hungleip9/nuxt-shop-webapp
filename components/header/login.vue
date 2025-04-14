<script setup lang="ts">
  const dialogVisible = ref(false)
  const from = ref({
    name: ''
  })
</script>

<template>
  <div>
    <Icon class="cursor-pointer" name="bi:person" size="20px" @click="dialogVisible = true"/>
    <!-- modal -->
    <el-dialog
    v-model="dialogVisible"
    title="Đăng nhập"
    width="70vw"
    align-center
    >
      <div>
        <v-input v-model="from.name"/>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Thoát</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Đăng nhập
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>