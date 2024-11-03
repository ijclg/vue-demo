<template>
  <el-dialog
      :title="title"
      :model-value="modelValue"
      width="800px"
      append-to-body
      @close="handleClose"
  >
    <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item label="论文标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入论文标题" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="formData.author" placeholder="请输入作者" />
      </el-form-item>
      <el-form-item label="发表时间" prop="publishDate">
        <el-date-picker
            v-model="formData.publishDate"
            type="date"
            placeholder="请选择发表时间"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="期刊名称" prop="journal">
        <el-input v-model="formData.journal" placeholder="请输入期刊名称" />
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input
            v-model="formData.keywords"
            type="textarea"
            placeholder="请输入关键词，多个关键词用逗号分隔"
        />
      </el-form-item>
      <el-form-item label="摘要" prop="abstract">
        <el-input
            v-model="formData.abstract"
            type="textarea"
            :rows="4"
            placeholder="请输入论文摘要"
        />
      </el-form-item>
      <el-form-item label="DOI" prop="doi">
        <el-input v-model="formData.doi" placeholder="请输入DOI" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  form: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const formRef = ref()
const formData = reactive({
  title: '',
  author: '',
  publishDate: '',
  journal: '',
  keywords: '',
  abstract: '',
  doi: ''
})

// 表单校验规则
const rules = {
  title: [
    { required: true, message: '请输入论文标题', trigger: 'blur' }
  ],
  author: [
    { required: true, message: '请输入作者', trigger: 'blur' }
  ],
  publishDate: [
    { required: true, message: '请选择发表时间', trigger: 'change' }
  ],
  journal: [
    { required: true, message: '请输入期刊名称', trigger: 'blur' }
  ]
}

// 监听表单数据变化
watch(() => props.form, (newVal) => {
  Object.assign(formData, newVal)
}, { deep: true })

// 提交处理
const handleSubmit = async () => {
  await formRef.value?.validate()
  emit('submit', formData)
}

// 关闭处理
const handleClose = () => {
  formRef.value?.resetFields()
  emit('update:modelValue', false)
  emit('cancel')
}
</script>