<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
              v-model="className"
              placeholder="请输入资源名称"
              clearable
              prefix-icon="Search"
              style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
              :data="classOptions"
              :props="{ label: 'label', children: 'children' }"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="classTreeRef"
              node-key="id"
              highlight-current
              default-expand-all
              @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
      <paper-resource></paper-resource>
      </el-col>
    </el-row>
  </div>
</template>


<script setup name="Resource">

import PaperResource from "../../../components/WareHouse/PaperResource.vue";
import {classTreeSelect} from "@/api/warehouse/class"
import {onMounted, reactive, ref, toRefs} from "vue";
const router = useRouter();
const { proxy } = getCurrentInstance();

const className = ref("");
const classOptions = ref(undefined);

const cacheName= "resource"

const columns=ref([]);

const loading = ref(true);
const ids = ref([]);
const single=ref(true);
const multiple=ref(true);
const showSearch=ref(true) ;
const total=ref(0);
const title=ref("");
const open=ref(false);
const dateRange=ref([]);
const data = reactive({
  form:{},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    id: null,
    ut: null,
    fn: null,
    vr: null,
    pt: null,
    au: null,
    af: null,
    ba: null,
    ca: null,
    gp: null,
    be: null,
    ti: null,
    so: null,
    se: null,
    bs: null,
    la: null,
    dt: null,
    ct: null,
    cy: null,
    cl: null,
    sp: null,
    ho: null,
    de: null,
    kId: null,
    ab: null,
    c1: null,
    rp: null,
    em: null,
    fu: null,
    fx: null,
    cr: null,
    nr: null,
    tc: null,
    z9: null,
    pu: null,
    pi: null,
    pa: null,
    sn: null,
    bn: null,
    j9: null,
    ji: null,
    pd: null,
    py: null,
    vl: null,
    kIs: null,
    si: null,
    pn: null,
    su: null,
    bp: null,
    ep: null,
    ar: null,
    di: null,
    d2: null,
    pg: null,
    p2: null,
    wc: null,
    sc: null,
    ga: null,
    er: null,
    ef: null,
    update_time:null,
    update_by:null
  },
  rules:{}

})
const {queryParams, form,rules} = toRefs(data)

const resourceClassId= ref(201);
onMounted(()=>{
  // @TODO 优化只存储visable选项
  // const cacheColumns = localStorage.getItem(cacheName);
  // if(cacheColumns && JSON.parse(cacheColumns) && JSON.parse(cacheColumns).length){
  //   console.info("get columns from cache")
  //   columns.value=JSON.parse(cacheColumns)
  // }else{
  //   columns.value=defaultColumns.value
  //   localStorage.setItem(cacheName, JSON.stringify(defaultColumns.value));d
  // }
});


/** 根据名称筛选部门树 */
watch(className, val => {
  proxy.$refs["classTreeRef"].filter(val);
});
/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.indexOf(value) !== -1;
};
function getClassTree() {
  classTreeSelect().then(response => {
    classOptions.value = response.data
  });
}

function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryForm")
  // @TODO
  proxy.$refs.classTreeRef.setCurrentKey(null);
  handleQuery();
}

function handleNodeClick(data) {
  // queryParams.value.classId = data.id;
  resourceClassId.value = data.id
  handleQuery();
}


getClassTree();

</script>