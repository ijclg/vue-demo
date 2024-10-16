<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="default" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="资源名称" prop="className">
        <el-input
          v-model="queryParams.className"
          placeholder="请输入资源名称"
          clearable
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="资源状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择资源分类状态" clearable style="width: 200px">
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
	    <el-button type="primary" icon="Search" size="default" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh"  size="default" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['warehouse:class:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="Sort"
          size="default"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="classList"
      row-key="classId"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
<!--      <el-table-column label="父资源id" prop="parentId" />-->
      <el-table-column label="资源名称" align="center" prop="className" />
      <el-table-column label="资源ID" align="center" prop="classId" />
      <el-table-column label="显示顺序" align="center" prop="orderNum" />
      <el-table-column label="资源状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            size="primary"
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['warehouse:class:edit']"
          >修改</el-button>
          <el-button
            size="primary"
            type="text"
            icon="Plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['warehouse:class:add']"
          >新增</el-button>
          <el-button
            size="primary"
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['warehouse:class:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改资源分类对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="父资源" prop="parentId">-->
<!--          <treeselect v-model="form.parentId" :options="classOptions" :normalizer="normalizer" placeholder="请选择父资源id" />-->
<!--        </el-form-item>-->
        <el-form-item label="父资源">
          <el-tree-select
              v-model="form.parentId"
              :data="classOptions"
              :props="{ value: 'classId', label: 'className', children: 'children' }"
              value-key="classId"
              placeholder="请选择父资源"
              check-strictly
          />
        </el-form-item>

        <el-form-item label="资源名称" prop="className">
          <el-input v-model="form.className" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="请输入显示顺序" />
        </el-form-item>
        <el-form-item label="资源状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="删除标志" prop="delFlag">-->
<!--          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup name="Class">
import { getToken } from "@/utils/auth";
import { listClass, getClass, delClass, addClass, updateClass } from "@/api/warehouse/class";
const router = useRouter();
const { proxy } = getCurrentInstance();
const { sys_normal_disable, sys_user_sex } = proxy.useDict("sys_normal_disable", "sys_user_sex");

// const classList = ref([]);
// const loading = ref(true);

</script>


<script>
// import { listClass, getClass, delClass, addClass, updateClass } from "@/api/warehouse/class";
// import Treeselect from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Class",
  dicts: ['sys_normal_disable'],
  components: {
    // Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 资源分类表格数据
      classList: [],
      // 资源分类树选项
      classOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        parentId: null,
        className: null,
        orderNum: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询资源分类列表 */
    getList() {
      this.loading = true;
      listClass(this.queryParams).then(response => {
        this.classList = this.handleTree(response.data, "classId", "parentId");
        this.loading = false;
      });
    },
    /** 转换资源分类数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.classId,
        label: node.className,
        children: node.children
      };
    },
	/** 查询资源分类下拉树结构 */
    getTreeselect() {
      listClass().then(response => {
        this.classOptions = [];
        const data = { classId: 0, className: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "classId", "parentId");
        this.classOptions.push(data);
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
        classId: null,
        parentId: null,
        ancestors: null,
        className: null,
        orderNum: null,
        status: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.classId) {
        this.form.parentId = row.classId;
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加资源分类";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentId = row.parentId;
      }
      getClass(row.classId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改资源分类";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.classId != null) {
            updateClass(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addClass(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除资源分类编号为"' + row.classId + '"的数据项？').then(function() {
        return delClass(row.classId);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
