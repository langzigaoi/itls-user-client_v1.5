<template>
  <div class="tcommonBox">
    <header>
      <h1>课程目标</h1>
    </header>
    <section style="width: 90%; margin: 2% auto">
      <el-card>
        <div slot="header" class="clearfix">
          <span> </span>
          <el-button size="mini" type="primary" @click="openAddDialog"
            >添加</el-button
          >
        </div>
        <el-table
          :data="allinfo"
          style="width: 100%"
          :row-style="{ height: '70px' }"
        >
          <el-table-column label="课程目标 (最多可添加五条)" width="1000">
            <template slot-scope="scope">
              <i class="el-icon-star-on"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="openUpdateDialog(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="deleteObj(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-dialog
        title="添加课程目标"
        :visible.sync="addDialogVisible"
        width="500px"
        center
      >
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="addtextarea"
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="addDialogVisible = false"
            >取 消</el-button
          >
          <el-button size="mini" type="primary" @click="addTarget"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="编辑课程目标"
        :visible.sync="updateDialogVisible"
        width="500px"
        center
      >
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="updatetextarea"
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="updateDialogVisible = false"
            >取 消</el-button
          >
          <el-button size="mini" type="primary" @click="updateTarget"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allinfo: [], //存放课程目标查询回来的所有信息
      targets: [], //所有课程目标
      addDialogVisible: false, //用于表示添加dialog显示与否
      updateDialogVisible: false, //用于表示编辑dialog显示与否
      addtextarea: "", //用于添加弹框
      updatetextarea: "", //用于更新弹框
      current: -1, //表示当前操作位置
      target: "", //用于存放修改的课程项目
      current1: -1, //表示当前修改位置
      updateId: -1,
    };
  },
  mounted() {
    this.findCinstanceTargets();
  },
  methods: {
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.target
        .findAllTargets({
          cinstance_id: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.allinfo = res.data;
        });
    },
    // 打开增加课程目标的弹窗
    openAddDialog() {
      this.addtextarea = "";
      this.addDialogVisible = true;
    },
    // 打开编辑课程目标的弹窗
    openUpdateDialog(index, row) {
      this.updatetextarea = row.name;
      this.updateId = row.id;
      this.updateDialogVisible = true;
    },
    // 确定修改课程目标
    updateTarget() {
      console.log(this.updatetextarea);
      if (this.updatetextarea == null || this.updatetextarea == "") {
        this.warnMsg("课程目标不能为空");
      } else {
        this.$api.course.target
          .updateTarget({ name: this.updatetextarea, id: this.updateId })
          .then((res) => {
            this.succMsg(res.msg);
            this.updateDialogVisible = false;
            this.findCinstanceTargets();
          });
      }
    },
    // 删除课程目标
    deleteObj(index, row) {
      this.$confirm("确认删除吗？", "提示", {})
        .then(() => {
          this.$api.course.target.delTarget({ id: row.id }).then((res) => {
            this.succMsg(res.msg);
            this.findCinstanceTargets();
          });
        })
        .catch(() => {});
    },
    // 添加课程目标
    addTarget() {
      console.log(this.addtextarea);
      if (this.addtextarea == null || this.addtextarea == "") {
        this.warnMsg("课程目标不能为空");
      } else {
        this.$api.course.target
          .addTarget({
            cinstance_id: this.$store.state.course.courseCinstanceId,
            name: this.addtextarea,
          })
          .then((res) => {
            this.succMsg(res.msg);
            this.addDialogVisible = false;
            this.findCinstanceTargets();
          });
      }
    },
  },
};
</script>

<style scoped>
.el-button--text {
  color: #14889a;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.tcommonBox {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 40px;
  font-size: 15px;
  text-align: left;
  margin-top: 5px;
}
.tcommonBox h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
}
/* 更改element-UI按钮样式 */
.el-button--primary {
  color: #fff;
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--primary:hover {
  background-color: #61b6c4;
  border-color: #61b6c4;
}
.el-button--primary:focus {
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--default:hover {
  color: #14889a;
  border-color: #14889a;
}
.el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input.is-focus .el-input__inner:focus {
  border-color: #14889a;
}
.el-select-dropdown__item.selected {
  color: #14889a;
  font-weight: 700;
}
</style>