<template>
  <div class="outside" style="padding: 30px">
    <!-- <el-row>
      <el-col :span="12" align="left">
        <el-form :inline="true">
          <el-button
            style="margin-left: 5px"
            size="mini"
            type="primary"
            @click="chandgeAddVisible"
            >新增</el-button
          >
        </el-form>
      </el-col>
    </el-row> -->

    <div style="">
      <el-form
        :model="itemListForm"
        ref="itemListForm"
        size="small"
        text-algin="center"
      >
        <el-form-item>
          <div style="width: 80%">
            <modifiable-table
              :data="itemListForm"
              :allEvaluateType="allEvaluateType"
              :allObjective="allObjective"
              :columnFlag="itemColumnFlag"
              @findPage="findPage"
              @open="handleitemListVisible"
            >
            </modifiable-table>
          </div>
        </el-form-item>
        <el-row>
          <div>
            <el-row type="flex" align="bottom" justify="center">
              <!-- <el-button size="mini" @click="closeItemListForm"
                >返回
              </el-button> -->
              <el-button type="primary" size="mini" @click="submitItemListForm"
                >保存
              </el-button>
            </el-row>
          </div>
        </el-row>
      </el-form>
    </div>

    <el-dialog
      top="5vh"
      align="center"
      title="详情"
      :visible.sync="itemListVisible"
      width="70%"
      style=""
      @close="closeItemListForm"
    >
      <div style="">
        <el-form
          :model="detailedListForm"
          ref="itemListForm"
          size="small"
          text-algin="center"
        >
          <el-form-item>
            <!-- <div style="width: 100%"> -->
              <modifiable-table
                :data="detailedListForm"
                :allEvaluateType="detailedEvaluateType"
                :allObjective="allObjective"
                :columnFlag="itemColumnFlag"
                @findPage="findPage"
              >
              </modifiable-table>
            <!-- </div> -->
          </el-form-item>
          <el-row>
            <div>
              <el-row type="flex" align="bottom" justify="center">
                <el-button size="mini" @click="closeItemListForm"
                  >返回
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="submitItemListForm"
                  >保存
                </el-button>
              </el-row>
            </div>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- <com-table
      :data="pageResults"
      :columns="columns"
      :delFlag="delFlag"
      :viewFlag="viewFlag"
      :editFlag="editFlag"
      @findPage="findPage"
      @findPersonPage="findPersonPage"
      @handleViewChange="handleViewChange"
      @handleEditChange="handleEditChange"
      @handleRemove="handleRemove"
      :flag="flag"
    ></com-table> -->

    <el-dialog
      top="5vh"
      align="center"
      title="新增"
      :visible.sync="addVisible"
      width="40%"
      style=""
    >
      <el-form ref="addForm" :model="addForm" :rules="addFormRules">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="14">
              <el-form-item label="考核项目" label-width="80px" prop="answer">
                <el-row type="flex">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="addForm.answer"
                    auto-complete="off"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="成绩占比"
                    label-width="80px"
                    prop="difficulty"
                    align="left"
                  >
                    <el-row type="flex">
                      <el-input-number
                        v-model="editForm.difficulty"
                        size="mini"
                        :precision="1"
                        :min="0"
                        :max="1"
                        :step="0.1"
                        controls-position="right"
                      ></el-input-number>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <div>
                  <el-row type="flex" align="bottom" justify="end">
                    <el-button size="mini" @click="closeAddForm"
                      >返回
                    </el-button>
                    <el-button type="primary" size="mini" @click="submitAdd"
                      >确定</el-button
                    >
                  </el-row>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      top="5vh"
      align="center"
      title="查看细分项目"
      :visible.sync="viewVisible"
      width="60%"
      style=""
    >
      <el-button
        style="float: left"
        size="mini"
        type="primary"
        @click="chandgeAddVisible"
        >新增</el-button
      >
      <com-table
        :data="pageResults"
        :columns="detailColumns"
        :delFlag="delFlag"
        :viewFlag="detildViewFlag"
        :editFlag="editFlag"
        @findPage="findPage"
        @findPersonPage="findPersonPage"
        @handleViewChange="handleViewChange"
        @handleEditChange="handleEditChange"
        @handleRemove="handleRemove"
        :flag="flag"
      ></com-table>
      <!-- <el-form
          ref="viewForm"
          :model="viewForm"
        >
          <div>
            <el-row type="flex" justify="center"> 
              <el-col :span="14">

                <el-form-item label="知识点" label-width="80px" prop="knowledgeState">
                  <el-row type="flex">
                    <el-input
                        v-model="viewForm.knowledgeName"
                        auto-complete="off"
                        size="mini"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="题干" label-width="80px" prop="title">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      :rows="4"
                      size="mini"
                      type="textarea"
                      v-model="viewForm.title"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="选项" label-width="80px" prop="options">
                    <el-row type="flex">
                        <el-input
                            type="textarea"
                            :rows="4"
                            v-model="viewForm.options"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>
                <el-form-item label="答案" label-width="80px" prop="answer">
                    <el-row type="flex">
                        <el-input
                            type="textarea"
                            :rows="4"
                            v-model="viewForm.answer"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>
                <el-form-item label="解析" label-width="80px" prop="analysis">
                    <el-row type="flex">
                        <el-input
                            type="textarea"
                            :rows="4"
                            v-model="viewForm.analysis"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                    </el-form-item>
                <el-form-item label="题目来源" label-width="80px" prop="markup">
                    <el-row type="flex">
                        <el-input
                            v-model="viewForm.markup"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="难易度" label-width="80px" prop="difficulty" align="left">
                            <el-row type="flex">
                                <el-input
                                    v-model="viewForm.difficulty"
                                    auto-complete="off"
                                    size="mini"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区分度" label-width="80px" prop="discrimination" align="left">
                            <el-row type="flex">
                                <el-input
                                    v-model="viewForm.discrimination"
                                    auto-complete="off"
                                    size="mini"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div>
                        <el-row type="flex" align="bottom" justify="end">
                            <el-button size="mini" @click="closeViewForm"
                            >返回
                            </el-button>
                        </el-row>
                    </div>
              </el-row>

              </el-col>       
            </el-row>
         </div>
        </el-form> -->
    </el-dialog>

    <el-dialog
      top="5vh"
      align="center"
      title="编辑"
      :visible.sync="editVisible"
      width="40%"
      style=""
    >
      <el-form ref="editForm" :model="editForm" :rules="addFormRules">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="14">
              <el-form-item label="考核项目" label-width="80px" prop="answer">
                <el-row type="flex">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="addForm.answer"
                    auto-complete="off"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="成绩占比"
                    label-width="80px"
                    prop="difficulty"
                    align="left"
                  >
                    <el-row type="flex">
                      <el-input-number
                        v-model="editForm.difficulty"
                        size="mini"
                        :precision="1"
                        :min="0"
                        :max="1"
                        :step="0.1"
                        controls-position="right"
                      ></el-input-number>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <div>
                  <el-row type="flex" align="bottom" justify="end">
                    <el-button size="mini" @click="closeEditForm"
                      >返回
                    </el-button>
                    <el-button type="primary" size="mini" @click="submitEdit"
                      >确定</el-button
                    >
                  </el-row>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import ComTable from "../../../common/ComTable.vue";
import ModifiableTable from "./ModifiableTable .vue";
export default {
  components: {
    ComTable,
    ModifiableTable,
  },

  data() {
    return {
      itemListForm: {
        tableData: [],
      },
      detailedListForm: {
        tableData: [],
      },
      itemColumnFlag: {
        problemType: true,
        num: true,
        score: true,
        addButton: true,
        delButton: true,
        problemButton: true,
      },
      //考核类型设置
      allEvaluateType: [
        { id: "1", value: "期末考试" },
        // { id: "2", value: "测验" },
        // { id: "3", value: "作业" },
        // { id: "4", value: "实验" },
        { id: "5", value: "过程评价" },
      ],
      detailedEvaluateType:[
        { id: "2", value: "测验" },
        { id: "3", value: "作业" },
        { id: "4", value: "实验" },
        { id: "4", value: "考勤" },
        { id: "4", value: "单元考试" },
      ],
      //评价目标
      allObjective: [],
      itemListVisible: false,
      record: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResults: {},
      courseCinstanceId: "",
      flag: "1",
      findFlag: "0",

      statu: "",
      knowledgeId: "",
      knowledgeState: "",
      allKnowledge: [],
      columns: [
        {
          prop: "courseName",
          label: "考核项目",
          minWidth: 150,
          align: "center",
        },
        {
          prop: "knowledgeName",
          label: "成绩占比",
          minWidth: 150,
          align: "center",
        },
      ],
      detailColumns: [
        {
          prop: "courseName",
          label: "考核项目",
          minWidth: 150,
          align: "center",
        },
        {
          prop: "knowledgeName",
          label: "成绩占比",
          minWidth: 150,
          align: "center",
        },
      ],

      addVisible: false,
      addForm: {},
      addFormRules: {
        knowledgeState: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        options: [{ required: true, message: "请输入", trigger: "blur" }],
        answer: [{ required: true, message: "请输入", trigger: "blur" }],
        analysis: [{ required: true, message: "请输入", trigger: "blur" }],
        markup: [{ required: true, message: "请输入", trigger: "blur" }],
        difficulty: [{ required: true, message: "请选择", trigger: "blur" }],
        discrimination: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },

      delFlag: true,

      viewFlag: true,
      detildViewFlag: false,
      viewVisible: false,
      viewForm: {},

      editFlag: true,
      editVisible: false,
      editForm: {},
    };
  },
  mounted() {
    this.findCinstanceTargets();
  },
  methods: {
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.courseTarget
        .findAllTargets({
          cinstanceId: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.allObjective = res.data.content;
        });
    },
    handleAllProblemType(list) {
      // console.log(list);
      let suggests = [];
      this.$api.course.courseProblemType
        .findByCid({ courseId: this.$store.state.course.courseId })
        .then((res) => {
          // console.log(res);
          for (let index = 0; index < res.data.length; index++) {
            suggests.push({
              value: res.data[index].problemTypeName,
              id: res.data[index].problemTypeId,
              disabled: false,
            });
          }
          // console.log(suggests);
          if (list !== undefined && list != null && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < suggests.length; j++) {
                if (list[i].problemTypeId == suggests[j].id) {
                  suggests[j].disabled = true;
                }
              }
            }
          }
          this.allProblemType = JSON.parse(JSON.stringify(suggests));
        });
    },
    closeItemListForm() {
      this.itemListForm = {
        tableData: [],
      };
      this.itemListVisible = false;
      this.itemColumnFlag.problemButton = true;
    },
    submitItemListForm() {
      //校验
      console.log(this.itemListForm);
      console.log(this.itemListForm.tableData);
      let suggests = JSON.parse(JSON.stringify(this.itemListForm.tableData));
      for (let m = 0; m < suggests.length; m++) {
        if (
          suggests[m].problemTypeId == null ||
          suggests[m].problemTypeId == "" ||
          suggests[m].problemTypeId == undefined ||
          suggests[m].num == null ||
          suggests[m].num == "" ||
          suggests[m].num == undefined ||
          !/^[1-9]\d*$/.test(suggests[m].num) ||
          suggests[m].score == null ||
          suggests[m].score == "" ||
          suggests[m].score == undefined ||
          !/^[1-9]\d*$/.test(suggests[m].score)
        ) {
          this.$message({
            message: "请检查表格信息",
            type: "error",
          });
          return null;
        }
      }
      // 插入examId，处理参数
      for (let i = 0; i < this.itemListForm.tableData.length; i++) {
        this.itemListForm.tableData[i].examId = this.examId;
      }
      let params = JSON.parse(JSON.stringify(this.itemListForm.tableData));
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.$api.exam.examItem
          .update(params)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.findItemList();
            }
          })
          .catch((err) => {
            this.closeItemListForm();
          });
      });
    },
    dateFormat(row, column) {
      return this.time(row.lastUpdateTime);
    },

    handleChangeFlag() {
      if (this.flag == "1") {
        this.editFlag = false;
        this.delFlag = false;
        this.findPage(null);
      }
      if (this.flag == "2") {
        this.editFlag = true;
        this.delFlag = true;
        this.findPersonPage(null);
      }
    },
    // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "courseId", value: this.$store.state.course.courseId },
        { name: "knowledgeId", value: this.knowledgeId },
      ];
      // console.log(this.pageRequest);
      // this.$api.problem.choice
      //   .findPage(this.pageRequest)
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data !== null) {
      //       this.pageResults = res.data;
      //     }
      //   })
      //   .then(data != null ? data.callback : "");
    },
    // 个人分页数据
    findPersonPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "courseId", value: this.$store.state.course.courseId },
        { name: "knowledgeId", value: this.knowledgeId },
        { name: "status", value: this.statu },
      ];
      this.$api.problem.choice
        .findPersonPage(this.pageRequest)
        .then((res) => {
          if (res.data == null) {
            this.pageResults = {};
          }
          if (res.data !== null) {
            // console.log(res.data);
            this.pageResults = res.data;
          }
          console.log(res.data);
          // console.log(this.pageResults);
        })
        .then(data != null ? data.callback : "");
    },

    handleSelect(item) {
      if (
        item === undefined ||
        item === null ||
        item === "" ||
        item.length === 0
      ) {
        this.knowledgeId = "";
      }
      // console.log(item);
      console.log(item[item.length - 1]);
      this.knowledgeId = item[item.length - 1];
      console.log(this.knowledgeId);
    },

    findPageByCondition() {
      this.flag = "1";
      this.findPage(null);
      this.knowledgeId = "";
    },

    chandgeAddVisible() {
      this.addVisible = !this.addVisible;
    },
    closeAddForm() {
      this.addVisible = false;
      this.$refs.addForm.resetFields();
      this.knowledgeId = "";
      (this.knowledgeState = ""), (this.addForm = {});
    },
    submitAdd() {
      console.log(this.addForm);
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        let params = Object.assign({}, this.addForm);
        params.courseId = this.$store.state.course.courseId;
        params.knowledgeId = this.knowledgeId;
        // console.log(params);
        this.$api.problem.choice.add(params).then((res) => {
          if (res.code == 200) {
            this.$message({ message: "操作成功", type: "success" });
            this.closeAddForm();
            this.flag = "2";
            this.handleChangeFlag();

            // this.$refs.getAllAudit()
          } else {
            this.$message({
              message: "操作失败, " + res.msg,
              type: "error",
            });
          }
        });
      });
    },

    handleViewChange(row) {
      this.viewVisible = true;
      console.log(row);
      this.viewForm = JSON.parse(JSON.stringify(row));
    },
    closeViewForm() {
      this.viewVisible = false;
      this.viewForm = {};
    },

    handleitemListVisible(row) {
      this.itemListVisible = true;
      this.itemColumnFlag.problemButton = false;
      // console.log(row.knowledgeName);
      // this.editForm = JSON.parse(JSON.stringify(row));
    },
    handleEditChange(row) {
      this.editVisible = true;
      // console.log(row.knowledgeName);
      this.editForm = JSON.parse(JSON.stringify(row));
    },
    closeEditForm() {
      this.editVisible = false;
      this.$refs.editForm.resetFields();
      this.knowledgeId = "";
      (this.knowledgeState = ""), (this.editForm = {});
    },
    submitEdit() {
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        let params = Object.assign({}, this.editForm);
        params.courseId = this.$store.state.course.courseId;
        params.knowledgeId = this.knowledgeId;
        // console.log(params);
        this.$api.problem.choice.update(params).then((res) => {
          if (res.code == 200) {
            this.$message({ message: "操作成功", type: "success" });
            this.closeEditForm();
            this.flag = "2";
            this.handleChangeFlag();
            // this.$refs.getAllAudit()
          } else {
            this.$message({
              message: "操作失败, " + res.msg,
              type: "error",
            });
          }
        });
      });
    },

    handleRemove(data) {
      console.log(data.params);
      this.$api.problem.choice
        .del(data.params)
        .then(data != null ? data.callback : "");
    },
  },
};
</script>
<style>
.outside {
  text-align: center;
}
</style>