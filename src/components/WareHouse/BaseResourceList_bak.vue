<template>
  <div class="resource-list">
    <!-- 搜索表单 -->
    <slot name="search-form"></slot>

    <!-- 操作按钮 -->
    <slot name="toolbar"></slot>

    <!-- 数据表格 -->
    <el-table
        v-loading="loading"
        :data="data"
        @selection-change="sendSelectionChange"
    >
      <el-table-column type="selection" width="45" align="center" />
      <template v-for="column in visibleColumns" :key="column.prop">
        <el-table-column
            :label="column.label"
            :prop="column.prop"
            align="center"
            :formatter="column.needFormat ? timeFormat : null"
        />
      </template>
      <el-table-column fixed="right" width="80"  label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-tooltip content="修改" placement="top">
            <el-button link type="primary" icon="Edit" @click="sendHandleUpdate(scope.row)"
                       v-hasPermi="['warehouse:resource:edit']"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button link type="primary" icon="Delete" @click="sendHandleDelete(scope.row)"
                       v-hasPermi="['warehouse:resource:remove']"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {parseTime} from "../../utils/ruoyi";

const props = defineProps({
  loading: Boolean,
  data: Array,
  columns: Array,
})

const emit = defineEmits(['selection-change', 'pagination', 'update:currentPage', 'update:pageSize'])

const visibleColumns = computed(() => {
  return props.columns.filter(col => col.visible)
})

const timeFormat = (row, column) => {
  return parseTime(row[column.property])
}

const sendSelectionChange = (selection) => {
  emit('selection-change', selection)
}

const sendHandleUpdate = (row) => {
  emit('handleUpdate', row)
}
const sendHandleDelete = (row) => {
  emit('handleDelete', row)
}
</script>