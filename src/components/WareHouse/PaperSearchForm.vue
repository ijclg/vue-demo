<template>
  <el-form :model="queryParams" ref="queryForm" size="default" :inline="true" v-show="showSearch"
           label-width="68px">
    <el-form-item label="书籍作者" prop="ba">
      <el-input
          v-model="queryParams.ba"
          placeholder="请输入书籍作者"
          clearable
          @keyup.enter.native="handleQuery"
      />
    </el-form-item>
    <!--          <el-form-item label="修改时间" prop="update_time">-->
    <el-form-item label="修改时间" style="width: 308px">
      <el-date-picker clearable
                      v-model="dateRange"
                      type="daterange"
                      value-format="YYYY-MM-DD"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="修改人" prop="update_by">
      <el-input
          v-model="queryParams.update_by"
          placeholder="请输入修改人"
          clearable
          @keyup.enter.native="handleQuery"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="Search" size="default" @click="handleQuery">搜索</el-button>
      <el-button icon="Refresh" size="default" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const emit = defineEmits(['update:params', 'search', 'reset'])

const props = defineProps({
  params: {
    type: Object,
    queryParams:Object,
    showSearch: Boolean,
    dateRange: Array,
    default: () => ({})
  }
})


</script>