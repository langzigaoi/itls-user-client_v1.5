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
      :showFlag="showFlag"
      :showOperation="true"
      :flag="'1'"
      @findPage="findPage"
      @handleRemove="handleRemove"
      @handleEditChange="handleEditChange"
    ></com-table>

    <!-- 添加弹框 -->
    <el-dialog
      title="添加助教"
      width="500px"
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false"
      destroy-on-close
      center
    >
      <el-form ref="addForm" :model="addForm" style="text-align: center">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item label="职工号" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="addForm.no"
                    placeholder="请输入职工号"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="姓名" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="addForm.name"
                    placeholder="请输入姓名"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="职位" label-width="70px">
                <el-row type="flex">
                  <el-select
                    size="small"
                    v-model="addForm.position"
                    placeholder="请选择职位"
                  >
                    <el-option
                      v-for="item in allAssistantType"
                      :key="item.value"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-row>
              </el-form-item>
              <el-form-item label="电话" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="addForm.telNum"
                    placeholder="请输入电话"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="邮箱" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="addForm.email"
                    placeholder="请输入邮箱"
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

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑助教信息"
      :visible.sync="updateDialogVisible"
      width="500px"
      center
    >
      <el-form ref="editForm" :model="editForm" style="text-align: center">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="16">
              <el-form-item label="职工号" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="editForm.no"
                    placeholder="请输入职工号"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="姓名" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="editForm.name"
                    placeholder="请输入姓名"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="职位" label-width="70px">
                <el-row type="flex">
                  <el-select
                    size="small"
                    v-model="editForm.position"
                    placeholder="请选择职位"
                  >
                    <el-option
                      v-for="item in allAssistantType"
                      :key="item.value"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-row>
              </el-form-item>
              <el-form-item label="电话" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="editForm.telNum"
                    placeholder="请输入电话"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="邮箱" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 220px"
                    size="small"
                    v-model="editForm.email"
                    placeholder="请输入邮箱"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <div>
            <el-row type="flex" align="bottom" justify="end">
              <el-button size="mini" @click="updateDialogVisible = false"
                >返回
              </el-button>
              <el-button type="primary" size="mini" @click="updateTeamMember"
                >确定</el-button
              >
            </el-row>
          </div>
        </div>
      </el-form>
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
      editForm: {}, //存放编辑表格所有信息
      addForm: {}, //存放添加表格所有信息
      columns: [
        { prop: "no", label: "职工号", minWidth: 150, align: "center" },
        { prop: "name", label: "姓名", minWidth: 150, align: "center" },
        { prop: "position", label: "职位", minWidth: 150, align: "center" },
        { prop: "telNum", label: "电话", minWidth: 150, align: "center" },
        { prop: "email", label: "邮箱", minWidth: 150, align: "center" },
      ],

      // 设置需显示和禁用的标记
      showFlag: {
        batchRemove: true,
        editTeachingTeam: true,
        removeTeachingTeam: true,
      },
      disableFlag: {
        editTeachingTeam: "",
        removeTeachingTeam: "",
        batchRemove: "",
      },
      addDialogVisible: false, //用于表示添加dialog显示与否
      updateDialogVisible: false, //用于表示编辑dialog显示与否
      addtextarea: "", //用于添加弹框
      updatetextarea: "", //用于更新弹框
      current: -1, //表示当前操作位置
      target: "", //用于存放修改的课程项目
      updateId: -1,
      allAssistantType: ["助教"],
    };
  },
  mounted() {},
  methods: {
    // 分页查询全部助教信息
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.$api.course.teachingTeam
        .findAllAssistant({
          cinstanceId: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
        })
        .then(data != null ? data.callback : "");
    },
    // 获取全部助教信息
    findAllAssistant() {
      this.$api.course.teachingTeam
        .findAllAssistant({
          cinstanceId: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
        });
    },
    // 打开增加课程目标的弹窗
    openAddDialog() {
      this.addDialogVisible = true;
    },
    // 打开编辑课程目标的弹窗
    handleEditChange(row) {
      this.updateDialogVisible = true;
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    // 确定修改课程目标
    updateTeamMember() {
      let data = Object.assign({}, this.editForm);
      this.$api.course.teachingTeam
        .updateAssistant(data)
        .then((res) => {
          this.succMsg(res.msg);
          this.updateDialogVisible = false;
          this.findAllAssistant();
        });
    },
    // 删除课程目标
    handleRemove(data) {
      let ids = data.params.map((item) => {return item.id})
      console.log("hhh",ids.toString())
      this.$api.course.teachingTeam
        .delTarget({IDs: ids.toString()})
        .then(data != null ? data.callback : "");
    },
    // 添加课程目标
    addTeamMember() {
      this.addForm.position="助教";
      this.addForm.cinstanceId=this.$store.state.course.courseCinstanceId;
      let data = Object.assign({}, this.addForm);
      this.$api.course.teachingTeam
        .addAssistant(data)
        .then((res) => {
          this.succMsg(res.msg);
          this.addDialogVisible = false;
          this.findAllAssistant();
        });
    },
  },
};
</script>

<style scoped>
.outside {
  text-align: center;
}
</style>