<template>
  <div class="outside" style="padding: 50px">
    <el-row>
      <el-col :span="12" align="right">
        <el-tabs>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <el-form :inline="true">
          <el-cascader
                    style="width: 150px; margin-left: 0px"
                    size="mini"
                    placeholder=""
                ></el-cascader> 
                <el-button
                  style="margin-left:5px"
                  size="mini"
                  type="primary"
                  @click="search"
                  >查询</el-button
                >
          <el-button
            style="margin-left: 5px"
            size="mini"
            type="primary"
            @click="openAddDialog"
            >新增</el-button
          >
        </el-form>
      </el-col>
    </el-row>

    <com-table
      :data="pageResults"
      :columns="columns"
      :delFlag="true"
      :editFlag="true"
      :showOperation="true"
      @findPage="findPage"
      @handleRemove="handleRemove"
      @handleEditChange="handleEditChange"
    ></com-table>

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
  </div>
</template>

<script>
import ComTable from "../../../common/ComTable.vue";

export default {
  components: {
    ComTable,
  },
  data() {
    return {
      pageResults: {},
      columns: [
        {
          prop: "name",
          label: "课程目标 (最多可添加五条)",
          minWidth: 150,
          align: "center",
        },
      ],

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
    // this.findCinstanceTargets();
  },
  methods: {
    // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.$api.course.target
        .findAllTargets({
          cinstance_id: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
        })
        .then(data != null ? data.callback : "");
    },
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.target
        .findAllTargets({
          cinstance_id: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
        });
    },
    // 打开增加课程目标的弹窗
    openAddDialog() {
      this.addtextarea = "";
      this.addDialogVisible = true;
    },
    // 打开编辑课程目标的弹窗
     handleEditChange(row) {
        this.updateDialogVisible = true;
        this.updateId = row.id;
        this.updatetextarea = JSON.parse(JSON.stringify(row.name));
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
    handleRemove(data) {
      this.$api.course.target
        .delTarget(data.params)
        .then(data != null ? data.callback : "");
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
    search(){
    }
  },
};
</script>

<style scoped>
.outside {
  text-align: center;
}
</style>