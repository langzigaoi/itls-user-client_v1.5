<template>
  <div class="outside" style="padding: 30px">
    <el-row>
      <el-col align="left">
        <el-form>
          <el-button
            style="margin-left: 5px"
            size="mini"
            type="primary"
            :disabled="this.isRelease === 1"
            @click="openAddDialog"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="this.isRelease === 1 || this.isNull === 1"
            @click="batchRelease()"
            >发布
          </el-button>
        </el-form>
      </el-col>
    </el-row>

    <com-table
      :data="pageResults"
      :columns="columns"
      :showFlag="showFlag"
      :showOperation="true"
      :flag="'1'"
      :disableFlag="disableFlag"
      @findPage="findPage"
      @handleRemove="handleRemove"
      @handleEditChange="handleEditChange"
    ></com-table>

    <el-dialog
      title="添加课程目标"
      :visible.sync="addDialogVisible"
      width="700px"
      center
    >
    
      <el-form
        ref="addObjectiveForm"
        :model="addObjectiveForm"
        style="text-align: center"
      >
        <el-form-item label="目标类型" label-width="70px">
          <el-row type="flex">
            <el-select
              size="small"
              v-model="objectiveType"
              placeholder="请选择课程目标类型"
            >
              <el-option
                v-for="item in allObjectiveType"
                :key="item.value"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-row>
        </el-form-item>
        <el-form-item label="目标内容" label-width="70px">
          <el-row type="flex">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入课程目标内容"
              v-model="addtextarea"
            >
            </el-input>
          </el-row>
        </el-form-item>
        <div>
          <el-row type="flex" align="bottom" justify="end">
            <el-button size="mini" @click="addDialogVisible = false"
              >取 消</el-button
            >
            <el-button size="mini" type="primary" @click="addTarget"
              >确 定</el-button
            >
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      title="编辑课程目标"
      :visible.sync="updateDialogVisible"
      width="700px"
      center
    >
      <el-form
        ref="addObjectiveForm"
        :model="addObjectiveForm"
        style="text-align: center"
      >
        <el-form-item label="目标类型" label-width="70px">
          <el-row type="flex">
            <el-select
              size="small"
              v-model="editTypeId"
              placeholder="请选择课程目标类型"
            >
              <el-option
                v-for="item in allObjectiveType"
                :key="item.value"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-row>
        </el-form-item>
        <el-form-item label="目标内容" label-width="70px">
          <el-row type="flex">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="updatetextarea"
            >
            </el-input>
          </el-row>
        </el-form-item>
        <div>
          <el-row type="flex" align="bottom" justify="end">
            <el-button size="mini" @click="updateDialogVisible = false"
              >取 消</el-button
            >
            <el-button size="mini" type="primary" @click="updateTarget"
              >确 定</el-button
            >
          </el-row>
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
      pageResults: {}, //存放课程目标查询回来的所有信息
      columns: [
        {
          prop: "name",
          label: "课程目标 (最多可添加五条)",
          minWidth: 500,
          align: "center",
        },
        {
          prop: "objectiveTypeName",
          label: "目标类型",
          minWidth: 150,
          align: "center",
        },
      ],
      // 设置需显示和禁用的标记
      showFlag: {
        batchRemove: true,
        editObjective: true,
        removeObjective: true,
      },
      disableFlag: {
        editObjective: "",
        removeObjective: "",
        batchRemove: "",
      },
      addDialogVisible: false, //用于表示添加dialog显示与否
      updateDialogVisible: false, //用于表示编辑dialog显示与否
      addtextarea: "", //用于添加弹框
      updatetextarea: "", //用于更新弹框
      current: -1, //表示当前操作位置
      target: "", //用于存放修改的课程项目
      updateId: -1,
      isRelease: 0,
      isNull: 0,
      allObjectiveType: [], //课程目标类型
      objectiveType: "",
      addObjectiveForm: {},
      editTypeId:"",
    };
  },
  mounted() {
    this.findAllObjectiveType();
  },
  methods: {
    // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.$api.course.courseTarget
        .findAllTargets({
          cinstanceId: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
          // console.log(this.pageResults.content.length);
          if (this.pageResults.content.length != 0) {
            if (this.pageResults.content[0].isRelease == 1) {
              this.isRelease = 1;
              this.disableFlag.editObjective = true;
              this.disableFlag.batchRemove = true;
              this.disableFlag.removeObjective = true;
            }
          } else {
            this.isNull = 1;
          }
        })
        .then(data != null ? data.callback : "");
    },
    // 获取课程实例的课程目标所有类型
    findAllObjectiveType() {
      let objective = [];
      this.$api.metadata.objective.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          objective.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allObjectiveType = objective;
      });
    },
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.courseTarget
        .findAllTargets({
          cinstanceId: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
          if (this.pageResults.content.length != 0) {
            if (this.pageResults.content[0].isRelease == 1) {
              this.isRelease = 1;
              this.disableFlag.editObjective = true;
              this.disableFlag.batchRemove = true;
              this.disableFlag.removeObjective = true;
            }
          } else {
            this.isNull = 1;
          }
        });
    },
    // 打开增加课程目标的弹窗
    openAddDialog() {
      this.addtextarea = "";
      if (this.pageResults.content.length < 5) {
        this.addDialogVisible = true;
      } else {
        this.warnMsg("最多只能添加五条课程目标");
      }
    },
    // 打开编辑课程目标的弹窗
    handleEditChange(row) {
      this.updateDialogVisible = true;
      this.updateId = row.id;
      this.updatetextarea = JSON.parse(JSON.stringify(row.name));
      this.editTypeId = JSON.parse(JSON.stringify(row.objectiveTypeId));
    },
    // 确定修改课程目标
    updateTarget() {
      if (this.updatetextarea == null || this.updatetextarea == "") {
        this.warnMsg("课程目标不能为空");
      } else {
        this.$api.course.courseTarget
          .updateTarget({
            name: this.updatetextarea,
            id: this.updateId,
            type: this.editTypeId,
          })
          .then((res) => {
            this.succMsg(res.msg);
            this.updateDialogVisible = false;
            this.findCinstanceTargets();
          });
      }
    },
    // 删除课程目标
    handleRemove(data) {
      this.$api.course.courseTarget
        .delTarget(data.params)
        .then(data != null ? data.callback : "");
    },
    //批量发布课程目标
    batchRelease() {
      this.$confirm(
        "发布后所有课程目标将不能再进行编辑或者删除，也不能添加课程目标，确认发布吗？",
        "提示",
        {}
      )
        .then(() => {
          console.log(this.pageResults.content);
          this.$api.course.courseTarget
            .releaseTarget(this.pageResults.content)
            .then((res) => {
              if (res.msg == "发布成功") {
                this.$message({ message: res.msg, type: "success" });
                this.findCinstanceTargets();
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
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
        this.$api.course.courseTarget
          .addTarget({
            cinstance_id: this.$store.state.course.courseCinstanceId,
            name: this.addtextarea,
            type: this.objectiveType,
          })
          .then((res) => {
            this.succMsg(res.msg);
            this.addDialogVisible = false;
            this.isNull = 0;
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
.el-button--primary:disabled {
  background-color: #a0cbd1;
  border-color: #96d0da;
}
.el-button--default:hover {
  color: #61b6c4;
  border-color: #14889a;
}
</style>