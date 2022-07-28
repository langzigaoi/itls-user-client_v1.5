<template>
  <div>
    <div>
      <el-row type="flex" align="bottom" justify="start">
      </el-row>
    </div>

    <el-table
      ref="table"
      :data="data.tableData"
      :highlight-current-row="highlightCurrentRow"
      :border="border"
      :show-overflow-tooltip="showOverflowTooltip"
      :max-height="maxHeight"
      :size="size"
      :align="align"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"

      style="width: 100%"
      :stripe="stripe"
    >

      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
        :index="indexMethod"
      ></el-table-column>

      <!--题目设置-->
      <el-table-column
        prop="problemTypeName"
        label="类型"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="分值(本类型总分值)"
      >
      </el-table-column>

    

      <el-table-column
        label="操作"
        width="200"
        fixed="right"
        v-if="showOperation"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">

          <el-button
            @click="preview(scope.$index, scope.row)"
            size="mini"
          >
            预览
          </el-button>
          <el-button
            @click="open(scope.$index, scope.row)"
            size="mini"
            type="primary"
          >
            题目列表
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <div class="toolbar" style="padding: 20px, 20px">
      <el-row type="flex" align="bottom" justify="end">
        <el-col :span="12">
          <el-pagination
            layout="total, prev, pager, next, jumper "
            @current-change="refreshPageRequest"
            :current-page="pageRequest.pageNum"
            :page-size="pageRequest.pageSize"
            :total="data.totalSize"
            style="float: right"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array, // 表格列配置
    data: {}, // 表格分页数据

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
      default: 500,
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

    allProblemType: {
      type: Array,
      default: () => [],
    },
    allObjective: {
      type: Array,
      default: () => [{ lable: null, value: null, id: null }],
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

      select: [],
    };
  },

  mounted() {
    this.findPage();
  },

  methods: {

    //根据选项id获取标签
    findLableById(id, list) {
      // console.log(id, list);
      let lable = "";
      for (let index = 0; index < list.length; index++) {
        if (list[index].id == id) {
          lable = list[index].value;
        }
      }
      // console.log(lable);
      return lable;
    },

    // 自增排序
    indexMethod(index) {
      return index + 1;
    },

    open(index, row) {
      // console.log(row);
      this.$emit("open", row);
    },
    preview(index, row) {
      this.$emit("handlePreviewChange", row);
    },


    // 分页查询
    findPage() {
      this.loading = true;
      let callback = (res) => {
        this.loading = false;
      };
      this.$emit("findPage", {
        pageRequest: this.pageRequest,
        callback: callback,
      });
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
      let noList = this.selections.map((item) => item.stuNo).toString();
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

  },
};
</script>

<style >
.conf {
  background: #14889a !important;
  size: mini;
}

.popper{
  max-width: 40%;
}

</style>