<template>
  <el-form ref="searchFormRef" :model="formModel" inline>
    <el-form-item label="专利名称" prop="patentName">
      <el-input
          v-model="formModel.patentName"
          placeholder="请输入专利名称"
          clearable
          style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="专利号" prop="patentNumber">
      <el-input
          v-model="formModel.patentNumber"
          placeholder="请输入专利号"
          clearable
          style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="发明人" prop="inventor">
      <el-input
          v-model="formModel.inventor"
          placeholder="请输入发明人"
          clearable
          style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="申请人" prop="applicant">
      <el-input
          v-model="formModel.applicant"
          placeholder="请输入申请人"
          clearable
          style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="申请日期">
      <el-date-picker
          v-model="formModel.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
      <el-button icon="Refresh" @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const emit = defineEmits(['update:params', 'search', 'reset'])

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
})

const searchFormRef = ref()
const formModel = reactive({
  patentName: '',
  patentNumber: '',
  inventor: '',
  applicant: '',
  dateRange: []
})

watch(formModel, (newVal) => {
  emit('update:params', {
    ...newVal,
    startDate: newVal.dateRange?.[0],
    endDate: newVal.dateRange?.[1]
  })
}, { deep: true })

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  searchFormRef.value?.resetFields()
  emit('reset')
}
</script>