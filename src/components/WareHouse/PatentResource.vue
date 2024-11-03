<template>
  <base-resource-list
      :loading="loading"
      :data="patentList"
      :columns="patentColumns"
      :total="total"
      @selection-change="handleSelectionChange"
  >
    <template #search-form>
      <patent-search-form
          v-model:params="searchParams"
          @search="handleSearch"
          @reset="handleReset"
      />
    </template>

    <!-- 其他模板插槽 -->
  </base-resource-list>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { listPatent, getPatent, addPatent, updatePatent, delPatent } from '@/api/warehouse/patent'
import BaseResourceList from './BaseResourceList.vue'
import PatentSearchForm from './PatentSearchForm.vue'
import ResourceToolbar from './ResourceToolbar.vue'
import PatentDialog from './PatentDialog.vue'

// 组件逻辑...
</script>