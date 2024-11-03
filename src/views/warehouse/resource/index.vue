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
              :highlight-current="true"
              default-expand-all
              :current-node-key="defaultClassId"
              @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
<!--        科技论文搜索栏-->
        <el-form   :model="queryParams" ref="queryForm" size="default" :inline="true" v-show="showSearch" v-if="currentResourceType === '科技论文'"
                 label-width="68px">
          <el-form-item label="书籍作者" prop="ba">
            <el-input
                v-model="queryParams.ba"
                placeholder="请输入书籍作者"
                clearable
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
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
        <el-form   :model="queryParams" ref="queryForm" size="default" :inline="true" v-show="showSearch" v-if="currentResourceType === '专利技术'"
                 label-width="68px">
          <el-form-item label="公开号" prop="pub_no">
            <el-input
                v-model="queryParams.pub_no"
                placeholder="请输入公开（公告）号"
                clearable
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="发明人" prop="inventor">
            <el-input
                v-model="queryParams.inventor"
                placeholder="请输入发明人"
                clearable
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
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

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
                type="primary"
                plain
                icon="Plus"
                size="default"
                @click="handleAdd"
                v-hasPermi="['warehouse:resource:add']"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="default"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['warehouse:resource:edit']"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="success"
                plain
                icon="el-icon-delete"
                size="default"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['warehouse:resource:remove']"
            >删除
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="default"
                @click="handleExport"
                v-hasPermi="['warehouse:resource:export']"
            >导出
            </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"  :columns="columns"  :cacheName=cacheName></right-toolbar>
        </el-row>

        <el-table style="width: 100%"  v-loading="loading" :data="resourceList" @selection-change="handleSelectionChange" >
          <el-table-column fixed type="selection" width="45" align="center" />
          <el-table-column
              v-for="(column, index) in visibleNormalColumns"
              :key="index"
              :label="column.label"
              align="center"
              :prop="column.prop"
              :formatter="column.needFormat? timeFormat:null"
          >
          </el-table-column>

          <el-table-column fixed="right" width="80"  label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                           v-hasPermi="['warehouse:resource:edit']"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                           v-hasPermi="['warehouse:resource:remove']"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加或修改资源列表对话框 -->
<!--    <el-dialog :title="title" v-model="open" width="500px" append-to-body>-->
<!--      <el-form ref="dialogFormRef" :model="form" :rules="rules" label-width="80px">-->
<!--        &lt;!&ndash;        <el-form-item label="批次号" prop="id">&ndash;&gt;-->
<!--        &lt;!&ndash;          <el-input v-model="form.id" placeholder="请输入批次号"/>&ndash;&gt;-->
<!--        &lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="入藏号" prop="ut">-->
<!--          <el-input v-model="form.ut" placeholder="请输入入藏号"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文件名" prop="fn">-->
<!--          <el-input v-model="form.fn" placeholder="请输入文件名"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="版本号" prop="vr">-->
<!--          <el-input v-model="form.vr" placeholder="请输入版本号"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="类型标识符" prop="pt">-->
<!--          <el-input v-model="form.pt" placeholder="请输入类型标识符"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="作者" prop="au">-->
<!--          <el-input v-model="form.au" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="作者全名" prop="af">-->
<!--          <el-input v-model="form.af" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="书籍作者" prop="ba">-->
<!--          <el-input v-model="form.ba" placeholder="请输入书籍作者"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="团体作者" prop="ca">-->
<!--          <el-input v-model="form.ca" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="书籍团体作者" prop="gp">-->
<!--          <el-input v-model="form.gp" placeholder="请输入书籍团体作者"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="编者" prop="be">-->
<!--          <el-input v-model="form.be" placeholder="请输入编者"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文献标题" prop="ti">-->
<!--          <el-input v-model="form.ti" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出版物名称" prop="so">-->
<!--          <el-input v-model="form.so" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="丛书标题" prop="se">-->
<!--          <el-input v-model="form.se" placeholder="请输入丛书标题"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="丛书副标题" prop="bs">-->
<!--          <el-input v-model="form.bs" placeholder="请输入丛书副标题"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="语种" prop="la">-->
<!--          <el-input v-model="form.la" placeholder="请输入语种"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文献类型" prop="dt">-->
<!--          <el-input v-model="form.dt" placeholder="请输入文献类型"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会议标题" prop="ct">-->
<!--          <el-input v-model="form.ct" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会议日期" prop="cy">-->
<!--          <el-input v-model="form.cy" placeholder="请输入会议日期"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会议地点" prop="cl">-->
<!--          <el-input v-model="form.cl" placeholder="请输入会议地点"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会议赞助方" prop="sp">-->
<!--          <el-input v-model="form.sp" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="会议主办方" prop="ho">-->
<!--          <el-input v-model="form.ho" placeholder="请输入会议主办方"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="作者关键词" prop="de">-->
<!--          <el-input v-model="form.de" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="扩展关键词" prop="kId">-->
<!--          <el-input v-model="form.kId" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="摘要" prop="ab">-->
<!--          <el-input v-model="form.ab" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="作者地址" prop="c1">-->
<!--          <el-input v-model="form.c1" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="通讯作者地址" prop="rp">-->
<!--          <el-input v-model="form.rp" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="电子邮件地址" prop="em">-->
<!--          <el-input v-model="form.em" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="基金资助机构和授权号" prop="fu">-->
<!--          <el-input v-model="form.fu" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="基金资助正文" prop="fx">-->
<!--          <el-input v-model="form.fx" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="引用的参考文献" prop="cr">-->
<!--          <el-input v-model="form.cr" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="引用的参考文献数" prop="nr">-->
<!--          <el-input v-model="form.nr" placeholder="请输入引用的参考文献数"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Web of Science被引频次计数" prop="tc">-->
<!--          <el-input v-model="form.tc" placeholder="请输入Web of Science被引频次计数"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="被引频次总数" prop="z9">-->
<!--          <el-input v-model="form.z9" placeholder="请输入被引频次总数"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出版商" prop="pu">-->
<!--          <el-input v-model="form.pu" placeholder="请输入出版商"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出版商所在城市" prop="pi">-->
<!--          <el-input v-model="form.pi" placeholder="请输入出版商所在城市"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出版商地址" prop="pa">-->
<!--          <el-input v-model="form.pa" type="textarea" placeholder="请输入内容"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="国际标准期刊号 (ISSN)" prop="sn">-->
<!--          <el-input v-model="form.sn" placeholder="请输入国际标准期刊号 (ISSN)"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="国际标准书号 (ISBN)" prop="bn">-->
<!--          <el-input v-model="form.bn" placeholder="请输入国际标准书号 (ISBN)"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="来源文献名称缩写" prop="j9">-->
<!--          <el-input v-model="form.j9" placeholder="请输入来源文献名称缩写"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="ISO来源文献名称缩写" prop="ji">-->
<!--          <el-input v-model="form.ji" placeholder="请输入ISO来源文献名称缩写"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出版日期" prop="pd">-->
<!--          <el-input v-model="form.pd" placeholder="请输入出版日期"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="出版年" prop="py">-->
<!--          <el-input v-model="form.py" placeholder="请输入出版年"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="卷" prop="vl">-->
<!--          <el-input v-model="form.vl" placeholder="请输入卷"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="期" prop="kIs">-->
<!--          <el-input v-model="form.kIs" placeholder="请输入期"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="特刊" prop="si">-->
<!--          <el-input v-model="form.si" placeholder="请输入特刊"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="子辑" prop="pn">-->
<!--          <el-input v-model="form.pn" placeholder="请输入子辑"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="增刊" prop="su">-->
<!--          <el-input v-model="form.su" placeholder="请输入增刊"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="开始页" prop="bp">-->
<!--          <el-input v-model="form.bp" placeholder="请输入开始页"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="结束页" prop="ep">-->
<!--          <el-input v-model="form.ep" placeholder="请输入结束页"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文献编号" prop="ar">-->
<!--          <el-input v-model="form.ar" placeholder="请输入文献编号"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数字对象标识符 (DOI)" prop="di">-->
<!--          <el-input v-model="form.di" placeholder="请输入数字对象标识符 (DOI)"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="书籍的数字对象标识符 (DOI)" prop="d2">-->
<!--          <el-input v-model="form.d2" placeholder="请输入书籍的数字对象标识符 (DOI)"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="页数" prop="pg">-->
<!--          <el-input v-model="form.pg" placeholder="请输入页数"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="章节数 (Book Citation Index)" prop="p2">-->
<!--          <el-input v-model="form.p2" placeholder="请输入章节数 (Book Citation Index)"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Web of Science类别" prop="wc">-->
<!--          <el-input v-model="form.wc" placeholder="请输入Web of Science类别"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学科类别" prop="sc">-->
<!--          <el-input v-model="form.sc" placeholder="请输入学科类别"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文献传递号" prop="ga">-->
<!--          <el-input v-model="form.ga" placeholder="请输入文献传递号"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="记录结束" prop="er">-->
<!--          <el-input v-model="form.er" placeholder="请输入记录结束"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文件结束" prop="ef">-->
<!--          <el-input v-model="form.ef" placeholder="请输入文件结束"/>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="dialogFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item
            v-for="(item, index) in dialogFormItems"
            :key="index"
            :label="item.label"
            :prop="item.prop"
        >
          <el-input
              v-model="form[item.prop]"
              :placeholder="item.placeholder"
              :type="item.type || 'text'"
          />
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
import {computed, nextTick, onMounted, reactive, ref, toRefs} from "vue";
import {parseTime} from "../../../utils/ruoyi";
const router = useRouter();
const { proxy } = getCurrentInstance();

const className = ref("");
const classOptions = ref([]);


const defaultPaperColumns= ref([
  { key: -1, label: `ID`,  visible: true , prop:`id`},
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
const defaultPatentColumns = ref([
  { key: -1, label: `ID`,  visible: true , prop:`id`},
  { key: 0, label: "专利类型", visible: true, prop: "patentType" },
  { key: 1, label: "公开（公告）号", visible: true, prop: "pubNo" },
  { key: 2, label: "公开（公告）日", visible: true, prop: "pubDate", needFormat: true },
  { key: 3, label: "申请人", visible: true, prop: "applicant" },
  { key: 4, label: "发明人", visible: true, prop: "inventor" },
  { key: 5, label: "标题 (中文)", visible: true, prop: "titleZh" },
  { key: 6, label: "标题 (英文)", visible: true, prop: "titleEng" },
  { key: 7, label: "摘要 (中文)", visible: true, prop: "abZh" },
  { key: 8, label: "摘要 (英文)", visible: true, prop: "abEng" },
  { key: 9, label: "申请号", visible: true, prop: "appNo" },
  { key: 10, label: "申请日", visible: true, prop: "appDate", needFormat: true },
  { key: 11, label: "公开类型", visible: true, prop: "pubType" },
  { key: 12, label: "公开国别", visible: true, prop: "country" },
  { key: 13, label: "链接到incoPat", visible: true, prop: "incoPatLink" },
  { key: 14, label: "标题（小语种原文）", visible: true, prop: "titleOrig" },
  { key: 15, label: "摘要（小语种原文）", visible: true, prop: "abOrig" },
  { key: 16, label: "首项权利要求", visible: true, prop: "firstClaim" },
  { key: 17, label: "首权翻译", visible: true, prop: "claimTranslation" },
  { key: 18, label: "独立权利要求", visible: true, prop: "indClaims" },
  { key: 19, label: "权利要求数量", visible: true, prop: "claimCount" },
  { key: 20, label: "独立权利要求数量", visible: true, prop: "indClaimCount" },
  { key: 21, label: "从属权利要求数量", visible: true, prop: "depClaimCount" },
  { key: 22, label: "文献页数", visible: true, prop: "docPages" },
  { key: 23, label: "首权字数", visible: true, prop: "firstClaimWords" },
  { key: 24, label: "质权人", visible: true, prop: "pledgee" },
  { key: 25, label: "当前质权人", visible: true, prop: "currentPledgee" },
  { key: 26, label: "诉讼次数", visible: true, prop: "litigationCount" },
  { key: 27, label: "原告", visible: true, prop: "plaintiff" },
  { key: 28, label: "被告", visible: true, prop: "defendant" },
  { key: 29, label: "诉讼类型", visible: true, prop: "litigationType" },
  { key: 30, label: "法庭", visible: true, prop: "court" },
  { key: 31, label: "海关备案", visible: true, prop: "customsRecord" },
  { key: 32, label: "复审决定日", visible: true, prop: "reexamDecDate", needFormat: true },
  { key: 33, label: "无效决定日", visible: true, prop: "invalidDecDate", needFormat: true },
  { key: 34, label: "口审日期", visible: true, prop: "hearingDate", needFormat: true },
  { key: 35, label: "法律事件", visible: true, prop: "legalEvent" },
  { key: 36, label: "复审请求日", visible: true, prop: "reexamReqDate", needFormat: true },
  { key: 37, label: "许可合同备案号", visible: true, prop: "licenseRegNo" },
  { key: 38, label: "质押号", visible: true, prop: "pledgeNo" },
  { key: 39, label: "转让登记号", visible: true, prop: "transferRegNo" },
  { key: 40, label: "转让登记日", visible: true, prop: "transferRegDate", needFormat: true },
  { key: 41, label: "首次公开号", visible: true, prop: "firstPubNo" },
  { key: 42, label: "首次公开日", visible: true, prop: "firstPubDate", needFormat: true },
  { key: 43, label: "授权公告号", visible: true, prop: "grantPubNo" },
  { key: 44, label: "授权公告日", visible: true, prop: "grantPubDate", needFormat: true },
  { key: 45, label: "实质审查生效日", visible: true, prop: "substantiveExamDate", needFormat: true },
  { key: 46, label: "提出实审时长", visible: true, prop: "substantiveExamDur" },
  { key: 47, label: "审查时长", visible: true, prop: "examDuration" },
  { key: 48, label: "失效日", visible: true, prop: "expiryDate", needFormat: true },
  { key: 49, label: "专利寿命（月）", visible: true, prop: "patentLifetimeMonths" },
  { key: 50, label: "标准类型", visible: true, prop: "standardType" },
  { key: 51, label: "标准项目", visible: true, prop: "standardProject" },
  { key: 52, label: "标准号", visible: true, prop: "standardNo" },
  { key: 53, label: "合享价值度", visible: true, prop: "hexinValue" },
  { key: 54, label: "技术稳定性", visible: true, prop: "techStability" },
  { key: 55, label: "技术先进性", visible: true, prop: "techAdvancement" },
  { key: 56, label: "保护范围", visible: true, prop: "protectionScope" },
  { key: 57, label: "文献种类代码", visible: true, prop: "docTypeCode" },
  { key: 58, label: "预估到期日", visible: true, prop: "estimatedExpiryDate", needFormat: true },
  { key: 59, label: "创建者", visible: true, prop: "createBy" },
  { key: 60, label: "创建时间", visible: true, prop: "createTime", needFormat: true },
  { key: 61, label: "更新者", visible: true, prop: "updateBy" },
  { key: 62, label: "更新时间", visible: true, prop: "updateTime", needFormat: true }
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
const currentResourceType = ref("科技论文");
const defaultClassId=201;
const currentClassId=ref(201);
const paperFormItems = [
  { label: "入藏号", prop: "ut", placeholder: "请输入入藏号" },
  { label: "文件名", prop: "fn", placeholder: "请输入文件名" },
  { label: "版本号", prop: "vr", placeholder: "请输入版本号" },
  { label: "类型标识符", prop: "pt", placeholder: "请输入类型标识符" },
  { label: "作者", prop: "au", placeholder: "请输入内容", type: "textarea" },
  { label: "作者全名", prop: "af", placeholder: "请输入内容", type: "textarea" },
  { label: "书籍作者", prop: "ba", placeholder: "请输入书籍作者" },
  { label: "团体作者", prop: "ca", placeholder: "请输入内容", type: "textarea" },
  { label: "书籍团体作者", prop: "gp", placeholder: "请输入书籍团体作者" },
  { label: "编者", prop: "be", placeholder: "请输入编者" },
  { label: "文献标题", prop: "ti", placeholder: "请输入内容", type: "textarea" },
  { label: "出版物名称", prop: "so", placeholder: "请输入内容", type: "textarea" },
  { label: "丛书标题", prop: "se", placeholder: "请输入丛书标题" },
  { label: "丛书副标题", prop: "bs", placeholder: "请输入丛书副标题" },
  { label: "语种", prop: "la", placeholder: "请输入语种" },
  { label: "文献类型", prop: "dt", placeholder: "请输入文献类型" },
  { label: "会议标题", prop: "ct", placeholder: "请输入内容", type: "textarea" },
  { label: "会议日期", prop: "cy", placeholder: "请输入会议日期" },
  { label: "会议地点", prop: "cl", placeholder: "请输入会议地点" },
  { label: "会议赞助方", prop: "sp", placeholder: "请输入内容", type: "textarea" },
  { label: "会议主办方", prop: "ho", placeholder: "请输入会议主办方" },
  { label: "作者关键词", prop: "de", placeholder: "请输入内容", type: "textarea" },
  { label: "扩展关键词", prop: "kId", placeholder: "请输入内容", type: "textarea" },
  { label: "摘要", prop: "ab", placeholder: "请输入内容", type: "textarea" },
  { label: "作者地址", prop: "c1", placeholder: "请输入内容", type: "textarea" },
  { label: "通讯作者地址", prop: "rp", placeholder: "请输入内容", type: "textarea" },
  { label: "电子邮件地址", prop: "em", placeholder: "请输入内容", type: "textarea" },
  { label: "基金资助机构和授权号", prop: "fu", placeholder: "请输入内容", type: "textarea" },
  { label: "基金资助正文", prop: "fx", placeholder: "请输入内容", type: "textarea" },
  { label: "引用的参考文献", prop: "cr", placeholder: "请输入内容", type: "textarea" },
  { label: "引用的参考文献数", prop: "nr", placeholder: "请输入引用的参考文献数" },
  { label: "Web of Science被引频次计数", prop: "tc", placeholder: "请输入Web of Science被引频次计数" },
  { label: "被引频次总数", prop: "z9", placeholder: "请输入被引频次总数" },
  { label: "出版商", prop: "pu", placeholder: "请输入出版商" },
  { label: "出版商所在城市", prop: "pi", placeholder: "请输入出版商所在城市" },
  { label: "出版商地址", prop: "pa", placeholder: "请输入内容", type: "textarea" },
  { label: "国际标准期刊号 (ISSN)", prop: "sn", placeholder: "请输入国际标准期刊号 (ISSN)" },
  { label: "国际标准书号 (ISBN)", prop: "bn", placeholder: "请输入国际标准书号 (ISBN)" },
  { label: "来源文献名称缩写", prop: "j9", placeholder: "请输入来源文献名称缩写" },
  { label: "ISO来源文献名称缩写", prop: "ji", placeholder: "请输入ISO来源文献名称缩写" },
  { label: "出版日期", prop: "pd", placeholder: "请输入出版日期" },
  { label: "出版年", prop: "py", placeholder: "请输入出版年" },
  { label: "卷", prop: "vl", placeholder: "请输入卷" },
  { label: "期", prop: "kIs", placeholder: "请输入期" },
  { label: "特刊", prop: "si", placeholder: "请输入特刊" },
  { label: "子辑", prop: "pn", placeholder: "请输入子辑" },
  { label: "增刊", prop: "su", placeholder: "请输入增刊" },
  { label: "开始页", prop: "bp", placeholder: "请输入开始页" },
  { label: "结束页", prop: "ep", placeholder: "请输入结束页" },
  { label: "文献编号", prop: "ar", placeholder: "请输入文献编号" },
  { label: "数字对象标识符 (DOI)", prop: "di", placeholder: "请输入数字对象标识符 (DOI)" },
  { label: "书籍的数字对象标识符 (DOI)", prop: "d2", placeholder: "请输入书籍的数字对象标识符 (DOI)" },
  { label: "页数", prop: "pg", placeholder: "请输入页数" },
  { label: "章节数 (Book Citation Index)", prop: "p2", placeholder: "请输入章节数 (Book Citation Index)" },
  { label: "Web of Science类别", prop: "wc", placeholder: "请输入Web of Science类别" },
  { label: "学科类别", prop: "sc", placeholder: "请输入学科类别" },
  { label: "文献传递号", prop: "ga", placeholder: "请输入文献传递号" },
  { label: "记录结束", prop: "er", placeholder: "请输入记录结束" },
  { label: "文件结束", prop: "ef", placeholder: "请输入文件结束" }
];
const patentFormItems = [
  { label: "专利类型", prop: "patentType", placeholder: "请输入专利类型" },
  { label: "公开（公告）号", prop: "pubNo", placeholder: "请输入公开（公告）号" },
  { label: "公开（公告）日", prop: "pubDate", placeholder: "请输入公开（公告日", type: "date" },
  { label: "申请人", prop: "applicant", placeholder: "请输入申请人", type: "textarea" },
  { label: "发明人", prop: "inventor", placeholder: "请输入发明人", type: "textarea" },
  { label: "标题 (中文)", prop: "titleZh", placeholder: "请输入标题 (中文)" },
  { label: "标题 (英文)", prop: "titleEng", placeholder: "请输入标题 (英文)" },
  { label: "摘要 (中文)", prop: "abZh", placeholder: "请输入摘要 (中文)", type: "textarea" },
  { label: "摘要 (英文)", prop: "abEng", placeholder: "请输入摘要 (英文)", type: "textarea" },
  { label: "申请号", prop: "appNo", placeholder: "请输入申请号" },
  { label: "申请日", prop: "appDate", placeholder: "请输入申请日", type: "date" },
  { label: "公开类型", prop: "pubType", placeholder: "请输入公开类型" },
  { label: "公开国别", prop: "country", placeholder: "请输入公开国别" },
  { label: "链接到incoPat", prop: "incoPatLink", placeholder: "请输入链接到incoPat" },
  { label: "标题（小语种原文）", prop: "titleOrig", placeholder: "请输入标题（小语种原文）" },
  { label: "摘要（小语种原文）", prop: "abOrig", placeholder: "请输入摘要（小语种原文）", type: "textarea" },
  { label: "首项权利要求", prop: "firstClaim", placeholder: "请输入首项权利要求", type: "textarea" },
  { label: "首权翻译", prop: "claimTranslation", placeholder: "请输入首权翻译", type: "textarea" },
  { label: "独立权利要求", prop: "indClaims", placeholder: "请输入独立权利要求", type: "textarea" },
  { label: "权利要求数量", prop: "claimCount", placeholder: "请输入权利要求数量", type: "number" },
  { label: "独立权利要求数量", prop: "indClaimCount", placeholder: "请输入独立权利要求数量", type: "number" },
  { label: "从属权利要求数量", prop: "depClaimCount", placeholder: "请输入从属权利要求数量", type: "number" },
  { label: "文献页数", prop: "docPages", placeholder: "请输入文献页数", type: "number" },
  { label: "首权字数", prop: "firstClaimWords", placeholder: "请输入首权字数", type: "number" },
  { label: "技术功效句", prop: "techEffect", placeholder: "请输入技术功效句", type: "textarea" },
  { label: "技术功效短语", prop: "techEffectPhrase", placeholder: "请输入技术功效短语", type: "textarea" },
  { label: "技术功效1级", prop: "techEffectLvl1", placeholder: "请输入技术功效1级" },
  { label: "技术功效2级", prop: "techEffectLvl2", placeholder: "请输入技术功效2级" },
  { label: "技术功效3级", prop: "techEffectLvl3", placeholder: "请输入技术功效3级" },
  { label: "技术功效TRIZ参数", prop: "techTrizParam", placeholder: "请输入技术功效TRIZ参数" },
  { label: "IPC主分类", prop: "ipcMain", placeholder: "请输入IPC主分类" },
  { label: "IPC", prop: "ipc", placeholder: "请输入IPC" },
  { label: "洛迦诺分类号", prop: "locarnoClass", placeholder: "请输入洛迦诺分类号" },
  { label: "EC", prop: "ecClass", placeholder: "请输入EC" },
  { label: "CPC", prop: "cpcClass", placeholder: "请输入CPC" },
  { label: "UC", prop: "ucClass", placeholder: "请输入UC" },
  { label: "FI", prop: "fiClass", placeholder: "请输入FI" },
  { label: "F-term", prop: "fTerm", placeholder: "请输入F-term" },
  { label: "国民经济分类", prop: "econClass", placeholder: "请输入国民经济分类" },
  { label: "新兴产业分类", prop: "emergingIndClass", placeholder: "请输入新兴产业分类" },
  { label: "申请人(翻译)", prop: "applicantTranslation", placeholder: "请输入申请人(翻译)" },
  { label: "申请人(其他)", prop: "applicantOther", placeholder: "请输入申请人(其他)" },
  { label: "标准化申请人", prop: "stdApplicant", placeholder: "请输入标准化申请人" },
  { label: "标准化当前权利人", prop: "stdCurrentApplicant", placeholder: "请输入标准化当前权利人" },
  { label: "当前权利人", prop: "currentApplicant", placeholder: "请输入当前权利人" },
  { label: "第一申请人", prop: "firstApplicant", placeholder: "请输入第一申请人" },
  { label: "申请人数量", prop: "applicantCount", placeholder: "请输入申请人数量", type: "number" },
  { label: "申请人类型", prop: "applicantType", placeholder: "请输入申请人类型" },
  { label: "申请人国别代码", prop: "applicantCountryCode", placeholder: "请输入申请人国别代码" },
  { label: "申请人地址", prop: "applicantAddr", placeholder: "请输入申请人地址", type: "textarea" },
  { label: "申请人地址(其他)", prop: "applicantAddrOther", placeholder: "请输入申请人地址(其他)", type: "textarea" },
  { label: "申请人省市代码", prop: "applicantCityCode", placeholder: "请输入申请人省市代码" },
  { label: "中国申请人地市", prop: "cnApplicantCity", placeholder: "请输入中国申请人地市" },
  { label: "中国申请人区县", prop: "cnApplicantCounty", placeholder: "请输入中国申请人区县" },
  { label: "当前专利权人地址", prop: "currentApplicantAddr", placeholder: "请输入当前专利权人地址", type: "textarea" },
  { label: "工商别名", prop: "regAlias", placeholder: "请输入工商别名" },
  { label: "工商英文名", prop: "regEnglishName", placeholder: "请输入工商英文名" },
  { label: "工商注册地址", prop: "regAddr", placeholder: "请输入工商注册地址", type: "textarea" },
  { label: "工商公司类型", prop: "regCompanyType", placeholder: "请输入工商公司类型" },
  { label: "工商成立日期", prop: "regFoundingDate", placeholder: "请输入工商成立日期", type: "datetime" },
  { label: "工商统一社会信用代码", prop: "regCreditCode", placeholder: "请输入工商统一社会信用代码" },
  { label: "工商注册号", prop: "regNo", placeholder: "请输入工商注册号" },
  { label: "工商上市代码", prop: "regListingCode", placeholder: "请输入工商上市代码" },
  { label: "工商企业状态", prop: "regStatus", placeholder: "请输入工商企业状态" },

  { label: "第一发明人", prop: "firstInventor", placeholder: "请输入第一发明人" },
  { label: "发明(设计)人(其他)", prop: "inventorOther", placeholder: "请输入发明(设计)人(其他)", type: "textarea" },
  { label: "当前发明人名称", prop: "currentInventor", placeholder: "请输入当前发明人名称" },
  { label: "发明人数量", prop: "inventorCount", placeholder: "请输入发明��数量", type: "number" },
  { label: "发明人国别", prop: "inventorCountry", placeholder: "请输入发明人国别" },
  { label: "发明人地址", prop: "inventorAddr", placeholder: "请输入发明人地址", type: "textarea" },
  { label: "发明(设计)人地址（其他）", prop: "inventorAddrOther", placeholder: "请输入发明(设计)人地址（其他）", type: "textarea" },
  { label: "代理机构", prop: "agency", placeholder: "请输入代理机构" },
  { label: "代理人", prop: "agent", placeholder: "请输入代理人" },
  { label: "审查员", prop: "examiner", placeholder: "请输入审查员" },
  { label: "受让人地址", prop: "transferee_addr", placeholder: "请输入受让人地址", type: "textarea" },
  { label: "引证专利", prop: "cited_patent", placeholder: "请输入引证专利", type: "textarea" },
  { label: "被引证专利", prop: "cited_by_patent", placeholder: "请输入被引证专利", type: "textarea" },
  { label: "家族引证", prop: "family_citations", placeholder: "请输入家族引证", type: "textarea" },
  { label: "家族被引证", prop: "family_cited_by", placeholder: "请输入家族被引证", type: "textarea" },
  { label: "引证申请人", prop: "citing_applicant", placeholder: "请输入引证申请人", type: "textarea" },
  { label: "被引证申请人", prop: "cited_by_applicant", placeholder: "请输入被引证申请人", type: "textarea" },
  { label: "家族引证申请人", prop: "family_citing_applicant", placeholder: "请输入家族引证申请人", type: "textarea" },
  { label: "家族被引证申请人", prop: "family_cited_by_applicant", placeholder: "请输入家族被引证申请人", type: "textarea" },
  { label: "引证次数", prop: "citation_count", placeholder: "请输入引证次数", type: "number" },
  { label: "被引证次数", prop: "cited_by_count", placeholder: "请输入被引证次数", type: "number" },
  { label: "家族引证次数", prop: "family_citation_count", placeholder: "请输入家族引证次数", type: "number" },
  { label: "家族被引证次数", prop: "family_cited_by_count", placeholder: "请输入家族被引证次数", type: "number" },
  { label: "引证科技文献", prop: "citing_lit", placeholder: "请输入引证科技文献", type: "textarea" },
  { label: "被引证国别(forward)", prop: "cited_country", placeholder: "请输入被引证国别(forward)" },
  { label: "引证类别", prop: "citation_type", placeholder: "请输入引证类别" },
  { label: "简单同族", prop: "simple_family", placeholder: "请输入简单同族", type: "textarea" },
  { label: "扩展同族", prop: "extended_family", placeholder: "请输入扩展同族", type: "textarea" },
  { label: "DocDB同族", prop: "docdb_family", placeholder: "请输入DocDB同族", type: "textarea" },
  { label: "简单同族ID", prop: "simple_family_id", placeholder: "请输入简单同族ID" },
  { label: "扩展同族ID", prop: "extended_family_id", placeholder: "请输入扩展同族ID" },
  { label: "DocDB同族ID", prop: "docdb_family_id", placeholder: "请输入DocDB同族ID" },

  { label: "简单同族个数", prop: "simpleFamilyCount", placeholder: "请输入简单同族个数", type: "number" },
  { label: "扩展同族个数", prop: "extendedFamilyCount", placeholder: "请输入扩展同族个数", type: "number" },
  { label: "DocDB同族个数", prop: "docDBFamilyCount", placeholder: "请输入DocDB同族个数", type: "number" },
  { label: "同族国家/地区", prop: "familyCountry", placeholder: "请输入同族国家/地区", type: "textarea" },
  { label: "优先权信息", prop: "priorityInfo", placeholder: "请输入优先权信息", type: "textarea" },
  { label: "优先权号", prop: "priorityNo", placeholder: "请输入优先权号" },
  { label: "优先权日", prop: "priorityDate", placeholder: "请输入优先权日", type: "date" },
  { label: "最早优先权日", prop: "earliestPriorityDate", placeholder: "请输入最早优先权日", type: "date" },
  { label: "优先权国别", prop: "priorityCountry", placeholder: "请输入优先权国别" },
  { label: "PCT国际申请号", prop: "pctAppNo", placeholder: "请输入PCT国际申请号" },
  { label: "PCT国际公布号", prop: "pctPubNo", placeholder: "请输入PCT国际公布号" },
  { label: "PCT进入国家阶段日", prop: "pctNationalPhaseDate", placeholder: "请输入PCT进入国家阶段日", type: "date" },
  { label: "母案", prop: "parentCase", placeholder: "请输入母案" },
  { label: "分案", prop: "divisionalCase", placeholder: "请输入分案" },
  { label: "一案双申", prop: "dualApp", placeholder: "请输入一案双申" },
  { label: "专利有效性", prop: "patentValidity", placeholder: "请输入专利有效性" },
  { label: "当前法律状态", prop: "currentLegalStatus", placeholder: "请输入当前法律状态" },
  { label: "法律状态", prop: "legalStatus", placeholder: "请输入法律状态" },
  { label: "法律文书日期", prop: "legalDocDate", placeholder: "请输入法律文书日期", type: "datetime" },
  { label: "法律文书编号", prop: "legalDocNo", placeholder: "请输入法律文书编号" },
  { label: "复审请求人", prop: "reexamRequestor", placeholder: "请输入复审请求人" },
  { label: "无效请求人", prop: "invalidRequestor", placeholder: "请输入无效请求人" },
  { label: "复审决定", prop: "reexamDecision", placeholder: "请输入复审决定" },
  { label: "复审无效决定日", prop: "reexamInvalidDate", placeholder: "请输入复审无效决定日", type: "date" },
  { label: "复审无效法律依据", prop: "reexamInvalidBasis", placeholder: "请输入复审无效法律依据" },
  { label: "转让次数", prop: "transferCount", placeholder: "请输入转让次数", type: "number" },
  { label: "转让执行日", prop: "transferExecDate", placeholder: "请输入转让执行日", type: "date" },
  { label: "转让人", prop: "transferor", placeholder: "请输入转让人" },
  { label: "转让人类型", prop: "transferorType", placeholder: "请输入转让人类型" },
  { label: "受让人", prop: "transferee", placeholder: "请输入受让人" },
  { label: "受让人类型", prop: "transfereeType", placeholder: "请输入受让人类型" },
  { label: "标准受让人", prop: "stdTransferee", placeholder: "请输入标准受让人" },
  { label: "许可次数", prop: "licenseCount", placeholder: "请输入许可次数", type: "number" },
  { label: "许可合同备案日期", prop: "licenseRegDate", placeholder: "请输入许可合同备案日期", type: "datetime" },
  { label: "许可人", prop: "licensor", placeholder: "请输入许可人" },
  { label: "许可人类型", prop: "licensorType", placeholder: "请输入许可人类型" },
  { label: "被许可人", prop: "licensee", placeholder: "请输入被许可人" },
  { label: "被许可人类型", prop: "licenseeType", placeholder: "请输入被许可人类型" },
  { label: "当前被许可人", prop: "currentLicensee", placeholder: "请输入当前被许可人" },
  { label: "许可类型", prop: "licenseType", placeholder: "请输入许可类型" },
  { label: "质押次数", prop: "pledgeCount", placeholder: "请输入质押次数", type: "number" },
  { label: "质押期限", prop: "pledgePeriod", placeholder: "请输入质押期限" },
  { label: "出质人", prop: "pledger", placeholder: "请输入出质人" },
  { label: "质权人", prop: "pledgee", placeholder: "请输入质权人" },
  { label: "当前质权人", prop: "currentPledgee", placeholder: "请输入当前质权人" },
  { label: "诉讼次数", prop: "litigationCount", placeholder: "请输入诉讼次数", type: "number" },
  { label: "原告", prop: "plaintiff", placeholder: "请输入原告" },
  { label: "被告", prop: "defendant", placeholder: "请输入被告" },
  { label: "诉讼类型", prop: "litigationType", placeholder: "请输入诉讼类型" },
  { label: "法庭", prop: "court", placeholder: "请输入法庭" },
  { label: "海关备案", prop: "customsRecord", placeholder: "请输入海关备案" },
  { label: "复审决定日", prop: "reexamDecDate", placeholder: "请输入复审决定日", type: "date" },
  { label: "无效决定日", prop: "invalidDecDate", placeholder: "请输入无效决定日", type: "date" },
  { label: "口审日期", prop: "hearingDate", placeholder: "请输入口审日期", type: "date" },
  { label: "法律事件", prop: "legalEvent", placeholder: "请输入法律事件" },
  { label: "复审请求日", prop: "reexamReqDate", placeholder: "请输入复审请求日", type: "date" },
  { label: "许可合同备案号", prop: "licenseRegNo", placeholder: "请输入许可合同备案号" },
  { label: "质押号", prop: "pledgeNo", placeholder: "请输入质押号" },
  { label: "转让登记号", prop: "transferRegNo", placeholder: "请输入转让登记号" },
  { label: "转让登记日", prop: "transferRegDate", placeholder: "请输入转让登记日", type: "date" },
  { label: "首次公开号", prop: "firstPubNo", placeholder: "请输入首次公开号" },
  { label: "首次公开日", prop: "firstPubDate", placeholder: "请输入首次公开日", type: "date" },
  { label: "授权公告号", prop: "grantPubNo", placeholder: "请输入授权公告号" },
  { label: "授权公告日", prop: "grantPubDate", placeholder: "请输入授权公告日", type: "date" },
  { label: "实质审查生效日", prop: "substantiveExamDate", placeholder: "请输入实质审查生效日", type: "date" },
  { label: "提出实审时长", prop: "substantiveExamDur", placeholder: "请输入提出实审时长", type: "number" },
  { label: "审查时长", prop: "examDuration", placeholder: "请输入审查时长", type: "number" },
  { label: "失效日", prop: "expiryDate", placeholder: "请输入失效日", type: "date" },
  { label: "专利寿命（月）", prop: "patentLifetimeMonths", placeholder: "请输入专利寿命（月）", type: "number" },
  { label: "标准类型",prop: "standardType", placeholder: "请输入标准类型" },
  { label: "标准项目", prop: "standardProject", placeholder: "请输入标准项目" },
  { label: "标准号", prop: "standardNo", placeholder: "请输入标准号" },
  { label: "合享价值度", prop: "hexinValue", placeholder: "请输入合享价值度", type: "number" },
  { label: "技术稳定性", prop: "techStability", placeholder: "请输入技术稳定性", type: "number" },
  { label: "技术先进性", prop: "techAdvancement", placeholder: "请输入技术先进性", type: "number" },
  { label: "保护范围", prop: "protectionScope", placeholder: "请输入保护范围", type: "number" },
  { label: "文献种类代码", prop: "docTypeCode", placeholder: "请输入文献种类代码" },
  { label: "预估到期日", prop: "estimatedExpiryDate", placeholder: "请输入预估到期日", type: "date" },
];

const data = reactive({
  form:{
    classId:201
  },
  paperQueryParams: {
    pageNum: 1,
    pageSize: 10,
    id: null,
    au: null,
    ba: null,
    update_time:null,
    update_by:null,
    classId:201
  },
  patentQueryParams: {
    pageNum: 1,
    pageSize: 10,
    id: null,
    pub_no: null,
    inventor: null,
    update_time:null,
    update_by:null,
    classId:202
  },
  rules:{}

})
const { form,rules} = toRefs(data)

const queryParams = computed(() => {
  return currentResourceType.value === '科技论文' ? data.paperQueryParams : data.patentQueryParams;
});
const dialogFormItems = computed(() => {
  return currentResourceType.value === '科技论文' ? paperFormItems : patentFormItems;
});
const defaultColumns = computed(() => {
  return currentResourceType.value === '科技论文' ? defaultPaperColumns : defaultPatentColumns;
});

const cacheName= computed(() => {
  return "resource-"+currentResourceType.value;
});

onMounted(()=>{
  // @TODO 优化只存储visable选项
  // const cacheColumns = localStorage.getItem(cacheName);
  // if(cacheColumns && JSON.parse(cacheColumns) && JSON.parse(cacheColumns).length){
  //   console.info("get columns from cache")
  //   columns.value=JSON.parse(cacheColumns)
  // }else{
  //   columns.value=defaultColumns.value
  //   localStorage.setItem(cacheName, JSON.stringify(defaultColumns.value));
  // }

  getList();
  getClassTree();
  initColumns();
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

watch(currentResourceType, () => {
  initColumns();
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
  // var cacheName = currentResourceType.value;
  // const cacheColumns = localStorage.getItem(cacheName);
  // if(cacheColumns && JSON.parse(cacheColumns) && JSON.parse(cacheColumns).length){
  //   console.info("get columns from cache")
  //   // columns.value=JSON.parse(cacheColumns)
  // }else{
  //   // columns.value=defaultPatentColumns.value
  //   localStorage.setItem(cacheName, JSON.stringify(defaultPaperColumns.value));
  // }
  columns.value= currentResourceType.value === '科技论文' ? defaultPaperColumns.value : defaultPatentColumns.value;
  console.info("initcolumns")
}
function getList() {
  resourceList.value=null;
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
  // form.value = {
  //   id: null,
  //   ut: null,
  //   fn: null,
  //   vr: null,
  //   pt: null,
  //   au: null,
  //   af: null,
  //   ba: null,
  //   ca: null,
  //   gp: null,
  //   be: null,
  //   ti: null,
  //   so: null,
  //   se: null,
  //   bs: null,
  //   la: null,
  //   dt: null,
  //   ct: null,
  //   cy: null,
  //   cl: null,
  //   sp: null,
  //   ho: null,
  //   de: null,
  //   kId: null,
  //   ab: null,
  //   c1: null,
  //   rp: null,
  //   em: null,
  //   fu: null,
  //   fx: null,
  //   cr: null,
  //   nr: null,
  //   tc: null,
  //   z9: null,
  //   pu: null,
  //   pi: null,
  //   pa: null,
  //   sn: null,
  //   bn: null,
  //   j9: null,
  //   ji: null,
  //   pd: null,
  //   py: null,
  //   vl: null,
  //   kIs: null,
  //   si: null,
  //   pn: null,
  //   su: null,
  //   bp: null,
  //   ep: null,
  //   ar: null,
  //   di: null,
  //   d2: null,
  //   pg: null,
  //   p2: null,
  //   wc: null,
  //   sc: null,
  //   ga: null,
  //   er: null,
  //   ef: null
  // };
  for (const key in form.value) {
    if (form.value.hasOwnProperty(key)) {
      form.value[key] = null;
    }
  }
  proxy.resetForm("dialogFormRef");
}
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
function resetQuery() {
  proxy.resetForm("queryForm")
  proxy.$refs.classTreeRef.setCurrentKey(defaultClassId);
  handleQuery();
}

function handleNodeClick(data) {
  console.info("handle node click",data)
  currentResourceType.value=data.label;
  queryParams.value.classId = data.id;
  form.value.classId = data.id;
  currentClassId.value = data.id;
  handleQuery();
}

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
  console.info("handleupdate",currentClassId.value)
  getResource(id, currentClassId.value).then(response => {
    form.value = response.data;
    title.value = "修改资源列表";
    open.value = true;
  });
}

function submitForm() {
  proxy.$refs["dialogFormRef"].validate((valid) => {
    if (valid) {
      if(form.value.id!=null){
        console.info("updateResource")
        form.value.classId=currentClassId.value;
        console.info(form.value)
        updateResource(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      }else {
        console.info("addResource")
        form.value.classId=currentClassId.value;
        console.info(form.value)
        addResource(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

function handleDelete(row) {
  const id = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除资源列表编号为"' + id + '"的数据项？').then(function() {
    return delResource(id, currentClassId.value);
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

// nextTick(()=>{
//   console.info("nextTick")
//   proxy.$refs.classTreeRef.setCurrentKey(201);
// })
</script>