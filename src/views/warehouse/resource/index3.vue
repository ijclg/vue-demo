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
        <!-- 使用动态组件切换不同资源类型的内容 -->
<!--        <component-->
<!--            :is="currentComponent"-->
<!--            :query-params="queryParams"-->
<!--            :loading="loading"-->
<!--            :columns="columns"-->
<!--            :date-range="dateRange"-->
<!--            @search="handleSearch"-->
<!--            @reset="handleReset"-->
<!--            @selection-change="handleSelectionChange"-->
<!--        />-->
<!--        <PaperResource></PaperResource>-->
        <paper-resource-test></paper-resource-test>
      </el-col>
    </el-row>

    <!-- 添加或修改资源列表对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="paperFormRef" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="批次号" prop="id">-->
<!--          <el-input v-model="form.id" placeholder="请输入批次号"/>-->
<!--        </el-form-item>-->
        <el-form-item label="入藏号" prop="ut">
          <el-input v-model="form.ut" placeholder="请输入入藏号"/>
        </el-form-item>
        <el-form-item label="文件名" prop="fn">
          <el-input v-model="form.fn" placeholder="请输入文件名"/>
        </el-form-item>
        <el-form-item label="版本号" prop="vr">
          <el-input v-model="form.vr" placeholder="请输入版本号"/>
        </el-form-item>
        <el-form-item label="类型标识符" prop="pt">
          <el-input v-model="form.pt" placeholder="请输入类型标识符"/>
        </el-form-item>
        <el-form-item label="作者" prop="au">
          <el-input v-model="form.au" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="作者全名" prop="af">
          <el-input v-model="form.af" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="书籍作者" prop="ba">
          <el-input v-model="form.ba" placeholder="请输入书籍作者"/>
        </el-form-item>
        <el-form-item label="团体作者" prop="ca">
          <el-input v-model="form.ca" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="书籍团体作者" prop="gp">
          <el-input v-model="form.gp" placeholder="请输入书籍团体作者"/>
        </el-form-item>
        <el-form-item label="编者" prop="be">
          <el-input v-model="form.be" placeholder="请输入编者"/>
        </el-form-item>
        <el-form-item label="文献标题" prop="ti">
          <el-input v-model="form.ti" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="出版物名称" prop="so">
          <el-input v-model="form.so" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="丛书标题" prop="se">
          <el-input v-model="form.se" placeholder="请输入丛书标题"/>
        </el-form-item>
        <el-form-item label="丛书副标题" prop="bs">
          <el-input v-model="form.bs" placeholder="请输入丛书副标题"/>
        </el-form-item>
        <el-form-item label="语种" prop="la">
          <el-input v-model="form.la" placeholder="请输入语种"/>
        </el-form-item>
        <el-form-item label="文献类型" prop="dt">
          <el-input v-model="form.dt" placeholder="请输入文献类型"/>
        </el-form-item>
        <el-form-item label="会议标题" prop="ct">
          <el-input v-model="form.ct" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="会议日期" prop="cy">
          <el-input v-model="form.cy" placeholder="请输入会议日期"/>
        </el-form-item>
        <el-form-item label="会议地点" prop="cl">
          <el-input v-model="form.cl" placeholder="请输入会议地点"/>
        </el-form-item>
        <el-form-item label="会议赞助方" prop="sp">
          <el-input v-model="form.sp" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="会议主办方" prop="ho">
          <el-input v-model="form.ho" placeholder="请输入会议主办方"/>
        </el-form-item>
        <el-form-item label="作者关键词" prop="de">
          <el-input v-model="form.de" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="扩展关键词" prop="kId">
          <el-input v-model="form.kId" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="摘要" prop="ab">
          <el-input v-model="form.ab" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="作者地址" prop="c1">
          <el-input v-model="form.c1" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="通讯作者地址" prop="rp">
          <el-input v-model="form.rp" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="电子邮件地址" prop="em">
          <el-input v-model="form.em" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="基金资助机构和授权号" prop="fu">
          <el-input v-model="form.fu" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="基金资助正文" prop="fx">
          <el-input v-model="form.fx" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="引用的参考文献" prop="cr">
          <el-input v-model="form.cr" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="引用的参考文献数" prop="nr">
          <el-input v-model="form.nr" placeholder="请输入引用的参考文献数"/>
        </el-form-item>
        <el-form-item label="Web of Science被引频次计数" prop="tc">
          <el-input v-model="form.tc" placeholder="请输入Web of Science被引频次计数"/>
        </el-form-item>
        <el-form-item label="被引频次总数" prop="z9">
          <el-input v-model="form.z9" placeholder="请输入被引频次总数"/>
        </el-form-item>
        <el-form-item label="出版商" prop="pu">
          <el-input v-model="form.pu" placeholder="请输入出版商"/>
        </el-form-item>
        <el-form-item label="出版商所在城市" prop="pi">
          <el-input v-model="form.pi" placeholder="请输入出版商所在城市"/>
        </el-form-item>
        <el-form-item label="出版商地址" prop="pa">
          <el-input v-model="form.pa" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="国际标准期刊号 (ISSN)" prop="sn">
          <el-input v-model="form.sn" placeholder="请输入国际标准期刊号 (ISSN)"/>
        </el-form-item>
        <el-form-item label="国际标准书号 (ISBN)" prop="bn">
          <el-input v-model="form.bn" placeholder="请输入国际标准书号 (ISBN)"/>
        </el-form-item>
        <el-form-item label="来源文献名称缩写" prop="j9">
          <el-input v-model="form.j9" placeholder="请输入来源文献名称缩写"/>
        </el-form-item>
        <el-form-item label="ISO来源文献名称缩写" prop="ji">
          <el-input v-model="form.ji" placeholder="请输入ISO来源文献名称缩写"/>
        </el-form-item>
        <el-form-item label="出版日期" prop="pd">
          <el-input v-model="form.pd" placeholder="请输入出版日期"/>
        </el-form-item>
        <el-form-item label="出版年" prop="py">
          <el-input v-model="form.py" placeholder="请输入出版年"/>
        </el-form-item>
        <el-form-item label="卷" prop="vl">
          <el-input v-model="form.vl" placeholder="请输入卷"/>
        </el-form-item>
        <el-form-item label="期" prop="kIs">
          <el-input v-model="form.kIs" placeholder="请输入期"/>
        </el-form-item>
        <el-form-item label="特刊" prop="si">
          <el-input v-model="form.si" placeholder="请输入特刊"/>
        </el-form-item>
        <el-form-item label="子辑" prop="pn">
          <el-input v-model="form.pn" placeholder="请输入子辑"/>
        </el-form-item>
        <el-form-item label="增刊" prop="su">
          <el-input v-model="form.su" placeholder="请输入增刊"/>
        </el-form-item>
        <el-form-item label="开始页" prop="bp">
          <el-input v-model="form.bp" placeholder="请输入开始页"/>
        </el-form-item>
        <el-form-item label="结束页" prop="ep">
          <el-input v-model="form.ep" placeholder="请输入结束页"/>
        </el-form-item>
        <el-form-item label="文献编号" prop="ar">
          <el-input v-model="form.ar" placeholder="请输入文献编号"/>
        </el-form-item>
        <el-form-item label="数字对象标识符 (DOI)" prop="di">
          <el-input v-model="form.di" placeholder="请输入数字对象标识符 (DOI)"/>
        </el-form-item>
        <el-form-item label="书籍的数字对象标识符 (DOI)" prop="d2">
          <el-input v-model="form.d2" placeholder="请输入书籍的数字对象标识符 (DOI)"/>
        </el-form-item>
        <el-form-item label="页数" prop="pg">
          <el-input v-model="form.pg" placeholder="请输入页数"/>
        </el-form-item>
        <el-form-item label="章节数 (Book Citation Index)" prop="p2">
          <el-input v-model="form.p2" placeholder="请输入章节数 (Book Citation Index)"/>
        </el-form-item>
        <el-form-item label="Web of Science类别" prop="wc">
          <el-input v-model="form.wc" placeholder="请输入Web of Science类别"/>
        </el-form-item>
        <el-form-item label="学科类别" prop="sc">
          <el-input v-model="form.sc" placeholder="请输入学科类别"/>
        </el-form-item>
        <el-form-item label="文献传递号" prop="ga">
          <el-input v-model="form.ga" placeholder="请输入文献传递号"/>
        </el-form-item>
        <el-form-item label="记录结束" prop="er">
          <el-input v-model="form.er" placeholder="请输入记录结束"/>
        </el-form-item>
        <el-form-item label="文件结束" prop="ef">
          <el-input v-model="form.ef" placeholder="请输入文件结束"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script setup name="Resource">
import {getToken} from "@/utils/auth";
import {
  listResource,
  getResource,
  delResource,
  addResource,
  updateResource
} from "@/api/warehouse/resource";

import {classTreeSelect} from "@/api/warehouse/class"
import {computed, onMounted, reactive, ref, toRefs} from "vue";
import {parseTime} from "../../../utils/ruoyi";
import PaperResource from "../../../components/WareHouse/PaperResource.vue";
import PatentResource from "../../../components/WareHouse/PatentResource.vue";
import PaperResourceTest from "../../../components/WareHouse/PaperResourceTest.vue";
const router = useRouter();
const { proxy } = getCurrentInstance();

const className = ref("");
const classOptions = ref(undefined);

const cacheName= "resource"
const defaultColumns= ref([
  { key: 63, label: `ID`,  visible: true , prop:`id`},
  { key: 0, label: `入藏号`,  visible: true ,prop:`ut`},
  { key: 1, label: `文件名`,  visible: true ,prop:`fn`},
  { key: 2, label: `版本号`,  visible: true ,prop:`vr`},
  { key: 3, label: `类型标识符`,  visible: true ,prop:`pt`},
  { key: 4, label: `作者`,  visible: true ,prop:`au`},
  { key: 5, label: `作者全名`,  visible: true ,prop:`af`},
  { key: 6, label: `书籍作者`,  visible: true ,prop:`ba`},
  { key: 7, label: `团体作者`,  visible: true ,prop:`ca`},
  { key: 8, label: `书籍团体作者`,  visible: true ,prop:`gp`},
  { key: 9, label: `编者`,  visible: true ,prop:`be`},
  { key: 10, label: `文献标题`,  visible: true ,prop:`ti`},
  { key: 11, label: `出版物名称`,  visible: true ,prop:`so`},
  { key: 12, label: `丛书标题`,  visible: true ,prop:`se`},
  { key: 13, label: `丛书副标题`,  visible: true ,prop:`bs`},
  { key: 14, label: `语种`,  visible: true ,prop:`la`},
  { key: 15, label: `文献类型`,  visible: true ,prop:`dt`},
  { key: 16, label: `会议标题`,  visible: true ,prop:`ct`},
  { key: 17, label: `会议日期`,  visible: true ,prop:`cy`},
  { key: 18, label: `会议地点`,  visible: true ,prop:`cl`},
  { key: 19, label: `会议赞助方`,  visible: true ,prop:`sp`},
  { key: 20, label: `会议主办方`,  visible: true ,prop:`ho`},
  { key: 21, label: `作者关键词`,  visible: true ,prop:`de`},
  { key: 22, label: `扩展关键词`,  visible: true ,prop:`kId`},
  { key: 23, label: `摘要`,  visible: true ,prop:`ab`},
  { key: 24, label: `作者地址`,  visible: true ,prop:`c1`},
  { key: 25, label: `通讯作者地址`,  visible: true ,prop:`rp`},
  { key: 26, label: `电子邮件地址`,  visible: true ,prop:`em`},
  { key: 27, label: `基金资助机构和授权号`,  visible: true ,prop:`fu`},
  { key: 28, label: `基金资助正文`,  visible: true ,prop:`fx`},
  { key: 29, label: `引用的参考文献`,  visible: true ,prop:`cr`},
  { key: 30, label: `引用的参考文献数`,  visible: true ,prop:`nr`},
  { key: 31, label: `Web of Science被引频次计数`,  visible: true ,prop:`tc`},
  { key: 32, label: `被引频次总数`,  visible: true ,prop:`z9`},
  { key: 33, label: `出版商`,  visible: true ,prop:`pu`},
  { key: 34, label: `出版商所在城市`,  visible: true ,prop:`pi`},
  { key: 35, label: `出版商地址`,  visible: true ,prop:`pa`},
  { key: 36, label: `国际标准期刊号 (ISSN)`,  visible: true ,prop:`sn`},
  { key: 37, label: `国际标准书号 (ISBN)`,  visible: true ,prop:`bn`},
  { key: 38, label: `来源文献名称缩写`,visible: true,prop: `j9`},
  { key: 39, label: `ISO来源文献名称缩写`,visible: true,prop: `ji`},
  { key: 40, label: `出版日期`,visible: true,prop: `pd`},
  { key: 41, label: `出版年`,visible: true,prop: `py`},
  { key: 42, label: `卷`,visible: true,prop: `vl`},
  { key: 43, label: `期`,visible: true,prop: `kIs`},
  { key: 44, label: `特刊`,visible: true,prop: `si`},
  { key: 45, label: `子辑`,visible: true,prop: `pn`},
  { key: 46, label: `增刊`,visible: true,prop: `su`},
  { key: 47, label: `开始页`,visible: true,prop: `bp`},
  { key: 48, label: `结束页`,visible: true,prop: `ep`},
  { key: 49, label: `文献编号`,visible: true,prop: `ar`},
  { key: 50, label: `数字对象标识符 (DOI)`,visible: true,prop: `di`},
  { key: 51, label: `书籍的数字对象标识符 (DOI)`,visible: true,prop: `d2`},
  { key: 52, label: `页数`,visible: true,prop: `pg`},
  { key: 53, label: `章节数 (Book Citation Index)`,visible: true,prop: `p2`},
  { key: 54, label: `Web of Science类别`,visible: true,prop: `wc`},
  { key: 55, label: `学科类别`,visible: true,prop: `sc`},
  { key: 56, label: `文献传递号`,visible: true,prop: `ga`},
  { key: 57, label: `记录结束`,visible: true,prop: `er`},
  { key: 58, label: `文件结束`,visible: true,prop: `ef`},
  { key: 59, label: `创建人`,visible: true,prop: `createBy`},
  { key: 60, label: `创建时间`,visible: true,prop: `createTime`, needFormat: true},
  { key: 61, label: `修改人`,visible: true,prop: `updateBy`},
  { key: 62, label: `修改时间`,visible: true,prop: `updateTime`,needFormat: true}
]);

const columns=ref([]);

const loading = ref(true);
const ids = ref([]);
const single=ref(true);
const multiple=ref(true);
const showSearch=ref(true) ;
const total=ref(0);
const resourceList=ref([]);
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
const currentResourceType = ref(201) // paper | patent

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
const visibleNormalColumns = computed(() => {
  return columns.value.filter(item => item.visible);
});
const timeFormat = (row, column, cellValue, index) => {
  return parseTime(row[column.property])
};

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
function initColumns(){
  const cacheColumns = localStorage.getItem(cacheName);
  if(cacheColumns && JSON.parse(cacheColumns) && JSON.parse(cacheColumns).length){
    console.info("get columns from cache")
    columns.value=JSON.parse(cacheColumns)
  }else{
    columns.value=defaultColumns.value
    localStorage.setItem(cacheName, JSON.stringify(defaultColumns.value));
  }
}
function getList() {
  loading.value = true;
  listResource(proxy.addDateRange(queryParams.value, dateRange.value)).then(response => {
    resourceList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}
function cancel() {
  open.value = false;
  reset();
}
function reset() {
  form.value = {
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
    ef: null
  };
  proxy.resetForm("paperFormRef");
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryForm")
  proxy.$refs.classTreeRef.setCurrentKey(null);
  handleQuery();
}

function handleNodeClick(data) {
  queryParams.value.classId = data.id;
  console.info(data.id) //201
  console.info("handleNodeClick")
  handleQuery();
}
// 计算当前应该显示的组件
const currentComponent = computed(() => {
  // return currentResourceType.value === 201 ? PaperResource : PatentResource
  return PaperResource
})


function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}

function handleAdd() {
  reset();
  title.value = "添加资源列表";
  open.value = true;
}
function handleUpdate(row) {
  reset()
  const id = row.id || ids.value
  getResource(id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改资源列表";
  });
}

function submitForm() {
  proxy.$refs["paperFormRef"].validate((valid) => {
    if (valid) {
      if(form.value.id!=null){
        updateResource(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
    }else {
      addResource(form.value).then(response => {
        proxy.$modal.msgSuccess("新增成功");
        open.value = false;
        getList()

      });
    }
  }
  });
}

function handleDelete(row) {
  const id = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除资源列表编号为"' + id + '"的数据项？').then(function() {
    return delResource(id);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}
function handleExport() {
  proxy.download("warehouse/resource/export", {
    ...queryParams.value
  }, `resource_${new Date().getTime()}.xlsx`);
}
getList();
getClassTree();
initColumns();

</script>