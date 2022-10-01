<template>
  <div>
    <div></div>

    <el-table ref="table" :data="data.content" :highlight-current-row="highlightCurrentRow"
      :show-overflow-tooltip="showOverflowTooltip" @selection-change="selectionChange"
      @current-change="handleCurrentChange" @select="selectItem" :row-key="getRowKeys" :border="border"
      :max-height="maxHeight" :size="size" :align="align" :stripe="stripe" style="width: 100%">
      <el-table-column type="selection" width="30" :reserve-selection="true"></el-table-column>

      <el-table-column type="index" width="50" label="序号" align="center" :index="indexMethod"></el-table-column>

      <el-table-column v-for="column in columns" header-align="center" :align="column.align" :prop="column.prop"
        :label="column.label" :width="column.width" :min-width="column.minWidth"
        :show-overflow-tooltip="column.overflow" :fixed="column.fixed" :key="column.prop" :type="column.type"
        :formatter="column.formatter" :sortable="column.sortable == null ? true : column.sortable">
      </el-table-column>

      <el-table-column label="操作" width="350" fixed="right" v-if="showOperation" header-align="center" align="center">
        <template slot-scope="scope">
          <!--公用-->
          <el-button size="mini" v-if="showFlag.view == true" :disabled="disableFlag.view == true"
            @click="view(scope.$index, scope.row)">查看</el-button>
          <!-- <h2>{{disableFlag.view}}</h2> -->

          <!--控制题库-->
          <el-button size="mini" type="primary" v-if="showFlag.editProblem == true && scope.row.status == '0'"
            :disabled="disableFlag.editProblem == true" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" v-if="showFlag.removeProblem == true && scope.row.status == '0'"
            :disabled="disableFlag.removeProblem == true" @click="remove(scope.$index, scope.row)">删除</el-button>

          <!--控制学生列表-->
          <el-button size="mini" type="danger" v-if="showFlag.removeStudent == true"
            :disabled="disableFlag.removeStudent == true" @click="remove(scope.$index, scope.row)">移除</el-button>

          <!--控制课程目标-->
          <el-button size="mini" type="primary" v-if="showFlag.editObjective == true"
            :disabled="disableFlag.editObjective == true" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" v-if="showFlag.removeObjective == true"
            :disabled="disableFlag.removeObjective == true" @click="remove(scope.$index, scope.row)">删除</el-button>

          <!--控制教学团队-->
          <el-button size="mini" type="primary" v-if="showFlag.editTeachingTeam == true"
            :disabled="disableFlag.editTeachingTeam == true" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" v-if="showFlag.removeTeachingTeam == true"
            :disabled="disableFlag.removeTeachingTeam == true" @click="remove(scope.$index, scope.row)">删除</el-button>

          <!--控制考试-->
          <!-- <el-row>
            <el-col> -->
              <el-button size="mini" v-if="showFlag.setupForm == true" :disabled="disableFlag.setupForm == true"
                @click="openSetupForm(scope.$index, scope.row)">试题设置</el-button>

              <el-button size="mini" v-if="showFlag.preview == true" :disabled="disableFlag.preview == true"
                @click="preview(scope.$index, scope.row)">
                预览
              </el-button>

              <el-button size="mini" type="primary" v-if="showFlag.pub == true"
                :disabled="disableFlag.pub == true || scope.row.isPub == 1" @click="pub(scope.$index, scope.row)">
                发布
              </el-button>

              <el-button size="mini" type="danger" v-if="showFlag.removeExam == true"
                :disabled="disableFlag.removeExam == true" @click="remove(scope.$index, scope.row)">删除</el-button>
            <!-- </el-col>
          </el-row> -->

          <!--控制学生考试页面-->
          <el-button style="width: 40%" size="mini" v-if="showFlag.startExam == true"
            :disabled="disableFlag.startExam == true" @click="startExam(scope.$index, scope.row)">开始考试
          </el-button>
          <el-button style="width: 40%" size="mini" v-if="showFlag.summary == true" type="primary"
            :disabled="disableFlag.summary == true" @click="summary(scope.$index, scope.row)">成绩查询
          </el-button>


        </template>
      </el-table-column>
    </el-table>

    <div class="toolbar" style="padding: 20px, 20px">
      <el-button :size="size" type="danger" @click="handleRemove(null)" :disabled="
        this.selections.length === 0 || disableFlag.batchRemove == true
      " style="float: left" v-if="showFlag.batchRemove == true">批量移除</el-button>

      <el-pagination layout="total, prev, pager, next, jumper " @current-change="refreshPageRequest"
        :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="data.totalSize"
        style="float: right">
      </el-pagination>
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
      default: 600,
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

    // 控制表格操作栏
    showOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    // 控制按钮显示、禁用；由调用本组件的页面按需传值控制显示或禁用
    showFlag: {
      type: Object,
      default: {
        default: () => ({
          // 公用
          view: false,
          // 批量操作
          batchRemove: false,
          // 学生列表
          removeStudent: false,
          //课程目标
          editObjective: false,
          removeObjective: false,
          //教学团队
          editTeachingTeam: false,
          removeTeachingTeam: false,
          // 题库
          editProblem: false,
          removeProblem: false,
          // 考试
          setupForm: false,
          infoForm: false,
          itemList: false,
          problemList: false,
          objectiveList: false,
          preview: false,
          pub: false,
          removeExam: false,
          // 学生考试
          startExam: false,
          summary: false,

        }),
      },
    },

    disableFlag: {
      type: Object,
      default: () => ({
        // 公用
        view: false,
        // 批量操作
        batchRemove: false,
        // 学生列表
        removeStudent: false,
        //课程目标
        editObjective: false,
        removeObjective: false,
        //教学团队
        editTeachingTeam: false,
        removeTeachingTeam: false,
        // 题库
        editProblem: false,
        removeProblem: false,
        // 考试
        setupForm: false,
        infoForm: false,
        itemList: false,
        problemList: false,
        objectiveList: false,
        preview: false,
        pub: false,
        removeExam: false,
        // 学生考试
        startExam: false,
        summary: false,

      }),
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
      transientSelections: [],

      // del: true,
    };
  },

  mounted() {
    if (this.flag == "1") {
      this.findPage();
    }
    if (this.flag == "2") {
      this.findPersonPage();
    }
  },

  methods: {
    // 自增排序
    indexMethod: function (index) {
      return index + 1;
    },
    // 分页查询
    findPage() {
      this.loading = true;
      let callback = (res) => {
        this.loading = false;
        // this.pageRequest.pageNum = 1;
      };
      this.$emit("findPage", {
        pageRequest: this.pageRequest,
        callback: callback,
      });
      // console.log(this.data);
    },
    findPersonPage() {
      this.loading = true;
      let callback = (res) => {
        this.loading = false;
        // console.log(res);
      };
      this.$emit("findPersonPage", {
        pageRequest: this.pageRequest,
        callback: callback,
      });
      // console.log(this.data);
    },
    // 选择切换
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", { val: val });
    },
    // 换页刷新
    refreshPageRequest(pageNum) {
      this.pageRequest.pageNum = pageNum;
      // console.log(this.pageRequest.pageNum);
      if (this.flag == "1") {
        this.findPage();
      }
      if (this.flag == "2") {
        this.findPersonPage();
      }
    },

    selectionChange(item) {
      // console.log(item);
      // console.log(item.length);
      this.selections = item;
      // console.log(this.selections);
      this.$emit("selectionChange", { selections: item });
      this.getSelectedId();
    },
    // 获取选中多选框的id
    getSelected() {
      let noList = this.selections.map((item) => item.stuNo).toString();
      // console.log(noList);
    },
    getSelectedId() {
      let problemIdList = this.selections.map((item) => {
        return {
          id: item.id,
          knowledgeName: item.knowledgeName,
        };
      });
      // console.log(problemIdList);
    },
    getRowKeys(row) {
      return row.id;
    },
    // 选题中使用
    selectItem(item) {
      // console.log(item);
      this.transientSelections = item;
      // console.log(this.transientSelections);
      this.handleSelections();
    },
    // 传递数据
    handleSelections() {
      this.$emit("handleSelections", this.transientSelections);
    },
    // 根据后台数据回显
    showSelections(list) {
      console.log(list);
      let itemList = list;
      // this.$nextTick(() => {
      for (var i in this.data.content) {
        if (itemList.indexOf(this.data.content[i].id) != -1) {
          this.$refs.table.toggleRowSelection(this.data.content[i], true);
        } else {
          this.$refs.table.toggleRowSelection(this.data.content[i], false);
        }
      }
    },
    // 清空复选框
    clearSelections() {
      // console.log(this.transientSelections);
      this.$refs.table.clearSelection();
    },

    // 单个删除
    remove(index, row) {
      let params = [];
      params.push(row);
      console.log(params);
      this.$confirm("确认移除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonClass: "conf",
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
        .catch(() => { });
    },
    //批量删除
    handleRemove(items) {
      console.log(this.columns);
      this.$confirm("确认移除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonClass: "conf",
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
        .catch(() => { });
    },

    view(index, row) {
      this.$emit("handleViewChange", row);
    },
    edit(index, row) {
      this.$emit("handleEditChange", row);
    },

    // 考试
    openSetupForm(index, row) {
      this.$emit("openSetupForm", row);
    },
    preview(index, row) {
      this.$emit("handlePreview", row);
    },
    pub(index, row) {
      this.$emit("handlePub", row);
    },

    // 学生考试
    startExam(index, row) {
      // console.log(row);
      var now = new Date().getTime();
      // if (now < row.startTime) {
      //   this.$message({
      //     message: "未开放考试",
      //     type: "error",
      //   });
      //   return null;
      // }
      // if (now > row.endTime) {
      //   this.$message({
      //     message: "考试已结束",
      //     type: "error",
      //   });
      //   return null;
      // }
      this.$emit("handleStartExam", row);
    },
    summary(index, row) {
      this.$emit("handleSummary", row);
    }
  },
};
</script>

<style >
.conf {
  background: #14889a !important;
  size: mini;
}

.el-button--primary:disabled {
  background-color: #a0cbd1;
  border-color: #96d0da;
}

.el-button--primary.is-disabled:hover {
  background-color: #a0cbd1;
  border-color: #a0cbd1;
}
</style>