<template>
  <div>
    <div >
      <!-- <el-button
        :size="size"
        type="primary"
        @click="handleAdd()"
        style="float: left"
        v-if="showBatchDelete & showOperation"
      >批量导入</el-button> -->
      
      
    </div>

    <el-table
      :data="data.content"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      v-loading="loading"
      :border="border"
      :show-overflow-tooltip="showOverflowTooltip"
      :max-height="maxHeight"
      :size="size"
      :align="align"
      :delFlag="delFlag"
      :viewFlag="viewFlag"
      :editFlag="editFlag"

      style="width: 100%"
      :stripe="stripe"
    >
      <el-table-column
        type="selection"
        width="30"
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
        width="250"
        fixed="right"
        v-if="showOperation"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-button 
            size="mini" 
            type="primary" 
            v-if=" viewFlag == true "
            @click="view(scope.$index, scope.row)"
          >查看</el-button>
          <el-button 
            size="mini" 
            type="primary" 
            v-if=" editFlag == true "
            @click="edit(scope.$index, scope.row)"
          >编辑</el-button>

          <el-button 
            size="mini" 
            type="danger" 
            v-if=" delFlag == true "
            @click="remove(scope.$index, scope.row)"
          >移除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="toolbar"  style="padding: 20px, 20px">
      <el-button
        :size="size"
        type="danger"
        @click="handleRemove(null)"
        :disabled="this.selections.length === 0"
        style="float: left"
        v-if="delFlag == true"
      >批量移除</el-button>

      <el-pagination
        layout="total, prev, pager, next, jumper "
        @current-change="refreshPageRequest"
        :current-page="pageRequest.pageNum"
        :page-size="pageRequest.pageSize"
        :total="data.totalSize"
        style="float: right"
      >
      </el-pagination>
    </div>

   





  </div>
</template>

<script>
  export default {
    props: {
      columns: Array, // 表格列配置
      data: { }, // 表格分页数据
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
      
      // 控制操控页面（全部 或 个人）
      flag: {
        type: String,
        default: "1",
      },
      delFlag: {
        type: Boolean,
        default: false,
      },
      viewFlag: {
        type: Boolean,
        default: false,
      },
      editFlag: {
        type: Boolean,
        default: false,
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

      
      };
    },
    
    mounted() {
      this.findPage();
    },

    methods: {
      // 自增排序
      indexMethod: function (index) {
        return index + 1;
      },
      // 分页查询
      findPage () {
        this.loading = true;
        let callback = (res) => {       
          this.loading = false;
          // console.log(res);
        };
        this.$emit("findPage", { pageRequest: this.pageRequest, callback: callback,});
        // console.log(this.data);
      },

      findPersonPage () {
        this.loading = true;
        let callback = (res) => {       
          this.loading = false;
          // console.log(res);
        };
        this.$emit("findPersonPage", { pageRequest: this.pageRequest, callback: callback,});
        // console.log(this.data);
      },

      // 选择切换
      selectionChange: function (item) {
        this.selections = item;
        // console.log(item);
        this.$emit("selectionChange", { selections: item });
        // this.getSelected();
      },
      // 获取选中多选框的id
      getSelected() {
        let noList = this.selections.map((item) => item.stuNo).toString()
        console.log(noList);
      },
      // 选择切换
      handleCurrentChange(val) {
        this.$emit("handleCurrentChange", { val: val });
      },
      // 换页刷新
      refreshPageRequest(pageNum) {
        this.pageRequest.pageNum = pageNum;
        console.log(this.pageRequest.pageNum);
        this.findPage();
      },

      view(index, row) {
        this.$emit("handleViewChange", row );
      },

      edit(index, row) {
        this.$emit("handleEditChange", row );
      },

      // 单个删除
      remove(index, row) {
        let params = [];
        params.push(row);
        console.log(params);
        this.$confirm("确认移除选中记录吗？", "提示", {
          type: "warning",
          confirmButtonClass:"conf",
        })
          .then(() => {
            this.loading = true;
            let callback = (res) => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                // console.log(this.flag);
                if (this.flag == "1") {
                  this.findPage();
                }
                if (this.flag == "2") {
                  this.findPersonPage();
                }
              } else {
                this.$message({ message: "操作失败, " + res.msg, type: "error" });
              }
              this.loading = false;
            };
            this.$emit("handleRemove", { params: params, callback: callback });
          })
          .catch(() => {});
      },
      //批量删除
      handleRemove(items) {
        this.$confirm("确认移除选中记录吗？", "提示", {
          type: "warning",
          confirmButtonClass:"conf",
          
        })
          .then(() => {
            let params = [];
            params = this.selections;
            console.log(params);
            this.loading = true;
            let callback = (res) => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                if (this.flag == "1") {
                  this.findPage();
                }
                if (this.flag == "2") {
                  this.findPersonPage();
                }
              } else {
                this.$message({ message: "操作失败, " + res.msg, type: "error" });
              }
              this.loading = false;
            };
            this.$emit("handleRemove", { params: params, callback: callback });
          })
          .catch(() => {});
      },



      
      
    },
  };
</script>

<style >
.conf{
  background: #14889A !important;
  ;
  size: mini;
  
}



</style>