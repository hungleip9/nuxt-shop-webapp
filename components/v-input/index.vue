<script lang="ts" setup>
const model = defineModel();
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  prop: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  maxlength: {
    type: null,
  },
  minlength: {
    type: null,
  },
  type: {
    type: String,
    default: "text", //text, number, textarea
  },
  decimal: {
    type: Boolean,
    default: false,
  },
  autosize: {
    type: null,
    default: { minRows: 2, maxRows: 4 },
  },
  rules: {
    type: null,
  },
});
const typeMap = ref("text");
watch(
  () => props.type,
  () => {
    if (props.type == "number") {
      typeMap.value = "text";
      return;
    }
    typeMap.value = props.type;
  }
);
onMounted(() => {
  if (props.type == "number") {
    typeMap.value = "text";
    return;
  }
  typeMap.value = props.type;
});
function onlyNumber(event: any) {
  if (props.type != "number") return;
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if (
    (keyCode < 48 || keyCode > 57) &&
    keyCode !== 46 &&
    event.code != "Enter"
  ) {
    event.preventDefault();
  }
  if (event.key === "." && !props.decimal) {
    event.preventDefault();
  }
}
</script>

<template>
  <el-form-item :label="label" label-position="top" :prop="prop" :rules="rules">
    <el-input
      v-if="props.type != 'date'"
      v-model="model"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="
        placeholder ? placeholder : `Nhập ${label ? label.toLowerCase() : ''}`
      "
      :type="typeMap"
      :autosize="autosize"
      :show-password="typeMap == 'password'"
      @keypress="onlyNumber($event)"
    />
    <el-date-picker
      v-else
      style="width: 100%!important;"
      v-model="model"
      type="date"
      :placeholder="
        placeholder ? placeholder : `Nhập ${label ? label.toLowerCase() : ''}`
      "
      :size="'default'"
      format="DD-MM-YYYY"
      value-format="X"
    />
  </el-form-item>
</template>
