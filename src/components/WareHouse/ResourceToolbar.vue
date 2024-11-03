<template>
  <el-row :gutter="10" class="mb8">
    <el-col :span="1.5">
      <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
      >新增</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="disabled.single"
          @click="handleEdit"
      >修改</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="disabled.multiple"
          @click="handleDelete"
      >删除</el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
      >导出</el-button>
    </el-col>
  </el-row>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Object,
    default: () => ({
      single: true,
      multiple: true
    })
  }
})

const emit = defineEmits(['add', 'edit', 'delete', 'export'])

const handleAdd = () => {
  emit('add')
}

const handleEdit = () => {
  emit('edit')
}

const handleDelete = () => {
  emit('delete')
}

const handleExport = () => {
  emit('export')
}
</script>