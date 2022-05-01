<template>
  <div class="outside" style="padding: 30px">
    <el-row>
      <el-col align="left">
        <el-form>
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

     <!-- 添加弹框 -->
    <el-dialog
      title="编辑课程实例"
      width="60%"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form
        ref="pageResults"
        :model="pageResults"
        style="text-align: center"
      >
        <div>
          <el-row type="flex" justify="center">

            <el-col :span="9">
              <el-form-item label="职工号" label-width="70px">
                <el-row type="flex">
                  <el-input
                    disabled
                    style="width: 205px"
                    size="small"
                    v-model="pageResults.no"
                    placeholder="请输入职工号"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="姓名" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 205px"
                    size="small"
                    v-model="pageResults.name"
                    placeholder="姓名"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item
                label="周 学 时"
                prop="hoursOfWeek"
                label-width="70px"
              >
                <el-row type="flex">
                  <el-input
                    disabled
                    style="width: 205px"
                    size="small"
                    v-model="pageResults.hoursOfWeek"
                    placeholder="请输入周学时"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="5"></el-col>
            <el-col :span="19">
              <el-form-item label="课程简介" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 570px"
                    size="small"
                    type="textarea"
                    :rows="4"
                    v-model="pageResults.intro"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <div>
            <el-row type="flex" align="bottom" justify="end">
              <el-button size="mini" @click="addDialogVisible = false"
                >返回
              </el-button>
              <el-button type="primary" size="mini" @click="addTeamMember"
                >确定</el-button
              >
            </el-row>
          </div>
        </div>
      </el-form>
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
      pageResults: {}, //存放教学团队查回来的的所有信息
      columns: [
        { prop: "no", label: "职工号", minWidth: 150, align: "center" },
        { prop: "name", label: "姓名", minWidth: 150, align: "center" },
        { prop: "position", label: "职位", minWidth: 150, align: "center" },
        { prop: "tel_num", label: "电话", minWidth: 150, align: "center" },
        { prop: "email", label: "邮箱", minWidth: 150, align: "center" },
      ],

      targets: [], //所有课程目标
      addDialogVisible: false, //用于表示添加dialog显示与否
      updateDialogVisible: false, //用于表示编辑dialog显示与否
      addtextarea: "", //用于添加弹框
      updatetextarea: "", //用于更新弹框
      current: -1, //表示当前操作位置
      target: "", //用于存放修改的课程项目
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
    addTeamMember() {
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
.outside {
  text-align: center;
}
</style>