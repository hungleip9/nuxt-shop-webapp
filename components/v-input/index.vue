<script lang="ts" setup>
const model = defineModel()
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Nhập'
  },
  maxlength: {
    type: null,
  },
  minlength: {
    type: null,
  },
  type: {
    type: String,
    default: 'text' //text, number, textarea
  },
  decimal: {
    type: Boolean,
    default: false
  },
  autosize: {
    type: null,
    default: { minRows: 2, maxRows: 4 }
  }
});
const typeMap = ref('text')
watch(() => props.type, () => {
  if (props.type != 'textarea') {
    typeMap.value = 'text'
    return
  }
  typeMap.value = 'textarea'
})
onMounted(() => {
  if (props.type != 'textarea') {
    typeMap.value = 'text'
    return
  }
  typeMap.value = 'textarea'
})
function onlyNumber (event: any) {
  if (props.type != 'number') return
  let keyCode = event.keyCode ? event.keyCode : event.which
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && event.code != 'Enter') {
    event.preventDefault()
  }
  if (event.key === '.' && !props.decimal) {
    event.preventDefault()
  }
}
</script>

<template>
  <el-input
    v-model="model"
    style="width: 240px"
    :maxlength="maxlength"
    :minlength="minlength"
    :placeholder="placeholder"
    :type="typeMap"
    :autosize="autosize"
    @keypress="onlyNumber($event)"
  />
</template>
