<template>
  <div>
    <el-table
      :data="data"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      v-loading="loading"
      :border="border"
      :show-overflow-tooltip="showOverflowTooltip"
      :max-height="maxHeight"
      :size="size"
      :align="align"
      style="width: 100%"
      :stripe="stripe"
    >
      <el-table-column
        type="selection"
        width="40"
        v-if="showBatchDelete & showOperation"
      ></el-table-column>

      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
        :index="indexMethod"
      ></el-table-column>

      <el-table-column
        v-for="column in columns"
        header-align="center"
        :align="column.align"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :key="column.prop"
        :type="column.type"
        :formatter="column.formatter"
        :sortable="column.sortable == null ? true : column.sortable"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        width="350"
        fixed="right"
        v-if="showOperation"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button 
            size="mini" 
            type="danger" 
            @click="handleDelete(scope.$index, scope.row)"
          >退选 </el-button>




        </template>

      </el-table-column>


    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      columns: Array, // 表格列配置
      data: {}, // 表格分页数据
      permsEdit: String,
      permsPass: String, // 编辑权限标识
      permsReject: String,
      permsDelete: String, // 删除权限标识
      size: {
        // 尺寸样式
        type: String,
        default: "mini",
      },
      align: {
        // 文本对齐方式
        type: String,
        default: "left",
      },
      maxHeight: {
        // 表格最大高度
        type: Number,
        default: 500
      },
      showOperation: {
        // 是否显示操作组件
        type: Boolean,
        default: true,
      },
      border: {
        // 是否显示边框
        type: Boolean,
        default: false,
      },
      stripe: {
        // 是否显示斑马线
        type: Boolean,
        default: true,
      },
      highlightCurrentRow: {
        // // 是否高亮当前行
        type: Boolean,
        default: true,
      },
      showOverflowTooltip: {
        // 是否单行显示
        type: Boolean,
        default: true,
      },
      showBatchDelete: {
        // 是否显示操作组件
        type: Boolean,
        default: true,
      },
      status: {
        type: String,
        default: "",
      },
      problemType: {
        type: String,
        default: "",
      },
    },

    data() {
      return {
        // 分页信息
        pageRequest: {
          pageNum: 1,
          pageSize: 10,
        },
        loading: false, // 加载标识
        selections: [], // 列表选中列
        // status:""
      };
    },
    methods: {
      // 分页查询
      findPage: function () {
        this.loading = true;
        let callback = (res) => {
          this.loading = false;
        };
        this.$emit("findPage", {
          pageRequest: this.pageRequest,
          callback: callback,
        });
        // console.log(s);
      },
      // 选择切换
      selectionChange: function (selections) {
        this.selections = selections;
        this.$emit("selectionChange", { selections: selections });
      },
      // 选择切换
      handleCurrentChange: function (val) {
        this.$emit("handleCurrentChange", { val: val });
      },
      // 换页刷新
      refreshPageRequest: function (pageNum) {
        this.pageRequest.pageNum = pageNum;
        console.log(this.pageRequest.pageNum);
        this.findPage();
      },
      // 编辑
      handleEdit: function (index, row) {
        this.$emit("handleEdit", { index: index, row: row });
      },

      // 批量通过
      handleBatchPass: function () {
        let ids = this.selections.map((item) => item.id).toString();
        this.pass(ids);
      },
      // 通过
      handlePass: function (index, row) {
        this.pass(row.id);
      },
      pass: function (ids) {
        this.$confirm("确认通过选中记录吗？", "提示", {
          type: "warning",
        })
          .then(() => {
            let params = [];
            let idArray = (ids + "").split(",");
            for (var i = 0; i < idArray.length; i++) {
              params.push({ id: idArray[i] });
            }
            this.loading = true;
            let callback = (res) => {
              if (res.code == 200) {
                this.$message({ message: "审核成功", type: "success" });
                this.findPage();
              } else {
                this.$message({ message: "操作失败, " + res.msg, type: "error" });
              }
              this.loading = false;
            };
            this.$emit("handlePass", { params: params, callback: callback });
          })
          .catch(() => {});
      },

      // 批量驳回
      handleBatchReject: function () {
        let ids = this.selections.map((item) => item.id).toString();
        this.reject(ids);
      },
      // 驳回
      handleReject: function (index, row) {
        this.reject(row.id);
      },
      reject: function (ids) {
        this.$confirm("确认驳回选中记录吗？", "提示", {
          type: "warning",
        })
          .then(() => {
            let params = [];
            let idArray = (ids + "").split(",");
            for (var i = 0; i < idArray.length; i++) {
              params.push({ id: idArray[i] });
            }
            this.loading = true;
            let callback = (res) => {
              if (res.code == 200) {
                this.$message({ message: "驳回成功", type: "success" });
                this.findPage();
              } else {
                this.$message({ message: "操作失败, " + res.msg, type: "error" });
              }
              this.loading = false;
            };
            this.$emit("handleReject", { params: params, callback: callback });
          })
          .catch(() => {});
      },

      // 删除
      handleDelete: function (index, row) {
        this.delete(row.id);
      },
      // 批量删除
      handleBatchDelete: function () {
        let ids = this.selections.map((item) => item.id).toString();
        this.delete(ids);
      },
      // 删除操作
      delete: function (ids) {
        this.$confirm("确认删除选中记录吗？", "提示", {
          type: "warning",
        })
          .then(() => {
            let params = [];
            let idArray = (ids + "").split(",");
            for (var i = 0; i < idArray.length; i++) {
              params.push({ id: idArray[i] });
            }
            this.loading = true;
            let callback = (res) => {
              if (res.code == 200) {
                this.$message({ message: "删除成功", type: "success" });
                this.findPage();
              } else {
                this.$message({ message: "操作失败, " + res.msg, type: "error" });
              }
              this.loading = false;
            };
            this.$emit("handleDelete", { params: params, callback: callback });
          })
          .catch(() => {});
      },
      indexMethod: function (index) {
        return index + 1;
      },

      //测试用例相关
      handleViewCheckpoint: function (id) {
        this.$emit("handleViewCheckpoint", { id: id });
      },


    },
  };
</script>

<style scoped>
</style>