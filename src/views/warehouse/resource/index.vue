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
        <el-form :model="queryParams" ref="queryForm" size="default" :inline="true" v-show="showSearch"
                 label-width="68px">
          <!--      <el-form-item label="入藏号" prop="ut">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ut"-->
          <!--          placeholder="请输入入藏号"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="文件名" prop="fn">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.fn"-->
          <!--          placeholder="请输入文件名"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="版本号" prop="vr">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.vr"-->
          <!--          placeholder="请输入版本号"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="类型标识符" prop="pt">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.pt"-->
          <!--          placeholder="请输入类型标识符"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <el-form-item label="书籍作者" prop="ba">
            <el-input
                v-model="queryParams.ba"
                placeholder="请输入书籍作者"
                clearable
                @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <!--      <el-form-item label="书籍团体作者" prop="gp">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.gp"-->
          <!--          placeholder="请输入书籍团体作者"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="编者" prop="be">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.be"-->
          <!--          placeholder="请输入编者"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="丛书标题" prop="se">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.se"-->
          <!--          placeholder="请输入丛书标题"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="丛书副标题" prop="bs">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.bs"-->
          <!--          placeholder="请输入丛书副标题"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="语种" prop="la">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.la"-->
          <!--          placeholder="请输入语种"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="文献类型" prop="dt">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.dt"-->
          <!--          placeholder="请输入文献类型"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="会议日期" prop="cy">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.cy"-->
          <!--          placeholder="请输入会议日期"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="会议地点" prop="cl">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.cl"-->
          <!--          placeholder="请输入会议地点"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="会议主办方" prop="ho">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ho"-->
          <!--          placeholder="请输入会议主办方"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="引用的参考文献数" prop="nr">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.nr"-->
          <!--          placeholder="请输入引用的参考文献数"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="Web of Science被引频次计数" prop="tc">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.tc"-->
          <!--          placeholder="请输入Web of Science被引频次计数"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="被引频次总数" prop="z9">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.z9"-->
          <!--          placeholder="请输入被引频次总数"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="出版商" prop="pu">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.pu"-->
          <!--          placeholder="请输入出版商"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="出版商所在城市" prop="pi">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.pi"-->
          <!--          placeholder="请输入出版商所在城市"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="国际标准期刊号 (ISSN)" prop="sn">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.sn"-->
          <!--          placeholder="请输入国际标准期刊号 (ISSN)"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
<!--          <el-form-item label="国际标准书号 (ISBN)" prop="bn">-->
<!--            <el-input-->
<!--                v-model="queryParams.bn"-->
<!--                placeholder="请输入国际标准书号 (ISBN)"-->
<!--                clearable-->
<!--                @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->
          <!--      <el-form-item label="来源文献名称缩写" prop="j9">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.j9"-->
          <!--          placeholder="请输入来源文献名称缩写"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="ISO来源文献名称缩写" prop="ji">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ji"-->
          <!--          placeholder="请输入ISO来源文献名称缩写"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="出版日期" prop="pd">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.pd"-->
          <!--          placeholder="请输入出版日期"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="出版年" prop="py">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.py"-->
          <!--          placeholder="请输入出版年"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="卷" prop="vl">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.vl"-->
          <!--          placeholder="请输入卷"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="期" prop="kIs">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.kIs"-->
          <!--          placeholder="请输入期"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="特刊" prop="si">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.si"-->
          <!--          placeholder="请输入特刊"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="子辑" prop="pn">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.pn"-->
          <!--          placeholder="请输入子辑"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="增刊" prop="su">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.su"-->
          <!--          placeholder="请输入增刊"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="开始页" prop="bp">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.bp"-->
          <!--          placeholder="请输入开始页"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="结束页" prop="ep">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ep"-->
          <!--          placeholder="请输入结束页"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="文献编号" prop="ar">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ar"-->
          <!--          placeholder="请输入文献编号"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="数字对象标识符 (DOI)" prop="di">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.di"-->
          <!--          placeholder="请输入数字对象标识符 (DOI)"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="书籍的数字对象标识符 (DOI)" prop="d2">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.d2"-->
          <!--          placeholder="请输入书籍的数字对象标识符 (DOI)"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="页数" prop="pg">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.pg"-->
          <!--          placeholder="请输入页数"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="章节数 (Book Citation Index)" prop="p2">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.p2"-->
          <!--          placeholder="请输入章节数 (Book Citation Index)"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="Web of Science类别" prop="wc">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.wc"-->
          <!--          placeholder="请输入Web of Science类别"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="学科类别" prop="sc">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.sc"-->
          <!--          placeholder="请输入学科类别"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="文献传递号" prop="ga">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ga"-->
          <!--          placeholder="请输入文献传递号"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="记录结束" prop="er">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.er"-->
          <!--          placeholder="请输入记录结束"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
          <!--      <el-form-item label="文件结束" prop="ef">-->
          <!--        <el-input-->
          <!--          v-model="queryParams.ef"-->
          <!--          placeholder="请输入文件结束"-->
          <!--          clearable-->
          <!--          @keyup.enter.native="handleQuery"-->
          <!--        />-->
          <!--      </el-form-item>-->
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
            v-for="(column,index) in visibleColumns"
            :key="index"
            :label="column.label"
            align="center"
            :prop="column.prop"
          ></el-table-column>
          <el-table-column fixed="right" width="80"  label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip content="修改" placement="top">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                           v-hasPermi="['swarehouse:resource:edit']"></el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                           v-hasPermi="['swarehouse:resource:remove']"></el-button>
              </el-tooltip>
              <!--          <el-tooltip-->
              <!--            size="default"-->
              <!--            type="text"-->
              <!--            icon="el-icon-delete"-->
              <!--            @click="handleDelete(scope.row)"-->
              <!--            v-hasPermi="['warehouse:resource:remove']"-->
              <!--          >删除</el-tooltip>-->
            </template>
          </el-table-column>
<!--          <el-table-column fixed type="selection" width="45" align="center" />-->
<!--          <el-table-column label="记录唯一标识符" align="center" prop="id"/>-->
<!--          <el-table-column label="入藏号" align="center" prop="ut"/>-->
<!--          <el-table-column label="文件名" align="center" prop="fn"/>-->
<!--          <el-table-column label="版本号" align="center" prop="vr"/>-->
<!--          <el-table-column label="类型标识符" align="center" prop="pt"/>-->
<!--          <el-table-column label="作者" align="center" prop="au"/>-->
<!--          <el-table-column label="作者全名" align="center" prop="af"/>-->
<!--          <el-table-column label="书籍作者" align="center" prop="ba"/>-->
<!--          <el-table-column label="团体作者" align="center" prop="ca"/>-->
<!--          <el-table-column label="书籍团体作者" align="center" prop="gp"/>-->
<!--          <el-table-column label="编者" align="center" prop="be"/>-->
<!--          <el-table-column label="文献标题" align="center" prop="ti"/>-->
<!--          <el-table-column label="出版物名称" align="center" prop="so"/>-->
<!--          <el-table-column label="丛书标题" align="center" prop="se"/>-->
<!--          <el-table-column label="丛书副标题" align="center" prop="bs"/>-->
<!--          <el-table-column label="语种" align="center" prop="la"/>-->
<!--          <el-table-column label="文献类型" align="center" prop="dt"/>-->
<!--          <el-table-column label="会议标题" align="center" prop="ct"/>-->
<!--          <el-table-column label="会议日期" align="center" prop="cy"/>-->
<!--          <el-table-column label="会议地点" align="center" prop="cl"/>-->
<!--          <el-table-column label="会议赞助方" align="center" prop="sp"/>-->
<!--          <el-table-column label="会议主办方" align="center" prop="ho"/>-->
<!--          <el-table-column label="作者关键词" align="center" prop="de"/>-->
<!--          <el-table-column label="扩展关键词" align="center" prop="kId"/>-->
<!--          <el-table-column label="摘要" align="center" prop="ab"/>-->
<!--          <el-table-column label="作者地址" align="center" prop="c1"/>-->
<!--          <el-table-column label="通讯作者地址" align="center" prop="rp"/>-->
<!--          <el-table-column label="电子邮件地址" align="center" prop="em"/>-->
<!--          <el-table-column label="基金资助机构和授权号" align="center" prop="fu"/>-->
<!--          <el-table-column label="基金资助正文" align="center" prop="fx"/>-->
<!--          <el-table-column label="引用的参考文献" align="center" prop="cr"/>-->
<!--          <el-table-column label="引用的参考文献数" align="center" prop="nr"/>-->
<!--          <el-table-column label="Web of Science被引频次计数" align="center" prop="tc"/>-->
<!--          <el-table-column label="被引频次总数" align="center" prop="z9"/>-->
<!--          <el-table-column label="出版商" align="center" prop="pu"/>-->
<!--          <el-table-column label="出版商所在城市" align="center" prop="pi"/>-->
<!--          <el-table-column label="出版商地址" align="center" prop="pa"/>-->
<!--          <el-table-column label="国际标准期刊号 (ISSN)" align="center" prop="sn"/>-->
<!--          <el-table-column label="国际标准书号 (ISBN)" align="center" prop="bn"/>-->
<!--          <el-table-column label="来源文献名称缩写" align="center" prop="j9"/>-->
<!--          <el-table-column label="ISO来源文献名称缩写" align="center" prop="ji"/>-->
<!--          <el-table-column label="出版日期" align="center" prop="pd"/>-->
<!--          <el-table-column label="出版年" align="center" prop="py"/>-->
<!--          <el-table-column label="卷" align="center" prop="vl"/>-->
<!--          <el-table-column label="期" align="center" prop="kIs"/>-->
<!--          <el-table-column label="特刊" align="center" prop="si"/>-->
<!--          <el-table-column label="子辑" align="center" prop="pn"/>-->
<!--          <el-table-column label="增刊" align="center" prop="su"/>-->
<!--          <el-table-column label="开始页" align="center" prop="bp"/>-->
<!--          <el-table-column label="结束页" align="center" prop="ep"/>-->
<!--          <el-table-column label="文献编号" align="center" prop="ar"/>-->
<!--          <el-table-column label="数字对象标识符 (DOI)" align="center" prop="di"/>-->
<!--          <el-table-column label="书籍的数字对象标识符 (DOI)" align="center" prop="d2"/>-->
<!--          <el-table-column label="页数" align="center" prop="pg"/>-->
<!--          <el-table-column label="章节数 (Book Citation Index)" align="center" prop="p2"/>-->
<!--          <el-table-column label="Web of Science类别" align="center" prop="wc"/>-->
<!--          <el-table-column label="学科类别" align="center" prop="sc"/>-->
<!--          <el-table-column label="文献传递号" align="center" prop="ga"/>-->
<!--          <el-table-column label="记录结束" align="center" prop="er"/>-->
<!--          <el-table-column label="文件结束" align="center" prop="ef"/>-->
<!--          <el-table-column fixed="right" width="80"  label="操作" align="center" class-name="small-padding fixed-width">-->
<!--            <template #default="scope">-->
<!--              <el-tooltip content="修改" placement="top">-->
<!--                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"-->
<!--                           v-hasPermi="['swarehouse:resource:edit']"></el-button>-->
<!--              </el-tooltip>-->
<!--              <el-tooltip content="删除" placement="top">-->
<!--                <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"-->
<!--                           v-hasPermi="['swarehouse:resource:remove']"></el-button>-->
<!--              </el-tooltip>-->
<!--              &lt;!&ndash;          <el-tooltip&ndash;&gt;-->
<!--              &lt;!&ndash;            size="default"&ndash;&gt;-->
<!--              &lt;!&ndash;            type="text"&ndash;&gt;-->
<!--              &lt;!&ndash;            icon="el-icon-delete"&ndash;&gt;-->
<!--              &lt;!&ndash;            @click="handleDelete(scope.row)"&ndash;&gt;-->
<!--              &lt;!&ndash;            v-hasPermi="['warehouse:resource:remove']"&ndash;&gt;-->
<!--              &lt;!&ndash;          >删除</el-tooltip>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
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
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
import {onMounted, ref} from "vue";

const router = useRouter();
const {proxy} = getCurrentInstance();
const {sys_normal_disable, sys_user_sex} = proxy.useDict("sys_normal_disable", "sys_user_sex");

const className = ref("");
const classOptions = ref(undefined);

const cacheName= "resource"
const defaultColumns= ref([
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
]);

const columns=ref([]);
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
const visibleColumns = computed(() => {
  return columns.value.filter(item => item.visible);
});


/** 根据名称筛选部门树 */
watch(className, val => {
  proxy.$refs["classTreeRef"].filter(val);
});

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
getClassTree();
initColumns();

</script>
<script>
// import {listResource, getResource, delResource, addResource, updateResource} from "@/api/warehouse/resource";

export default {
  name: "Resource",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 资源列表表格数据
      resourceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  computed:{

  },
  created() {
    this.getList();
    // console.info("created")
    // var cacheName="resource"
    // var cache=localStorage.getItem(cacheName)
    // console.info(cache)
    // if (cache && JSON.parse(cache) && JSON.parse(cache).length)
    // {
    //   console.info("get cache")
    //   this.columns.value = JSON.parse(localStorage.getItem(cacheName))
    // } else
    // {
    //   //this.getColumns();
    //   localStorage.setItem(this.cacheName, JSON.stringify(this.columns))
    // }
  },
  methods: {
    /** 查询资源列表列表 */
    getList() {
      this.loading = true;
      listResource(this.queryParams).then(response => {
        this.resourceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
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
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      proxy.$refs.classTreeRef.setCurrentKey(null);
      this.handleQuery();
    },
    handleNodeClick(data) {
      this.queryParams.classId = data.id;
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加资源列表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getResource(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改资源列表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateResource(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addResource(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除资源列表编号为"' + ids + '"的数据项？').then(function () {
        return delResource(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('warehouse/resource/export', {
        ...this.queryParams
      }, `resource_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
