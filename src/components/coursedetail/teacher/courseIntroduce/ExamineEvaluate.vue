<template>
  <div class="outside" style="padding: 30px">
    <div style="">
      <el-form
        :model="itemListForm"
        ref="itemListForm"
        size="small"
        text-algin="center"
      >
        <el-form-item>
          <div style="width: 100%">
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
      width="80%"
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
            <div style="width: 90%">
              <modifiable-table
                :data="detailedListForm"
                :allEvaluateType="detailedEvaluateType"
                :allObjective="allObjective"
                :columnFlag="detailedListFlag"
                @findPage="findDetailedPage"
              >
              </modifiable-table>
            </div>
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
                  @click="submitDetailedItemListForm"
                  >保存
                </el-button>
              </el-row>
            </div>
          </el-row>
        </el-form>
      </div>
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
        showType: true,
      },
      detailedListFlag: {
        num: true,
        addButton: true,
        delButton: true,
        detailedType: true,
        disabledObject: true,
        detailedScore: true,
      },
      //考核类型
      allEvaluateType: [],
      //详情考核类型
      detailedEvaluateType: [],
      //评价目标
      allObjective: [],
      itemListVisible: false,
      record: {},
      //分页数据
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResults: {},
      //父级考核评价id
      evaluationId: 0,
      courseCinstanceId: "",
      flag: "1",
      findFlag: "0",

      statu: "",
      knowledgeState: "",
      columns: [
        {
          prop: "courseName",
          label: "类别",
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
          label: "类别",
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
    this.findAllEvaluateType();
  },
  methods: {
    // 分页查询
    findPage() {
      this.pageRequest.params = [
        {
          name: "cinstanceId",
          value: this.$store.state.course.courseCinstanceId,
        },
      ];
      this.$api.course.courseEvaluation
        .findPage(this.pageRequest)
        .then((res) => {
          if (res.data !== null) {
            this.itemListForm.tableData = res.data.content;
            this.itemListForm.totalSize = res.data.totalSize;
            this.itemListForm.totalPages = res.data.totalPages;
            // 题型选择栏禁用项处理
            this.handleAllEvaluateType(this.itemListForm.tableData);
          }
        });
    },
    // 分页详情考核评价查询
    findDetailedPage() {
      this.pageRequest.params = [
        {
          name: "evaluationId",
          value: this.evaluationId,
        },
      ];
      this.$api.course.courseEvaluation
        .findDetailedPage(this.pageRequest)
        .then((res) => {
          if (res.data !== null) {
            this.detailedListForm.tableData = res.data.content;
            this.detailedListForm.totalSize = res.data.totalSize;
            this.detailedListForm.totalPages = res.data.totalPages;
            // 题型选择栏禁用项处理
            this.handleDetailedEvaluateType(this.detailedListForm.tableData);
          }
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
          this.allObjective = res.data.content;
        });
    },
    //处理详情类型禁用选项
    handleDetailedEvaluateType(list) {
      // console.log(list);
      let suggests = [];
      // this.$api.course.courseProblemType
      //   .findByCid({ courseId: this.$store.state.course.courseId })
      //   .then((res) => {
      // console.log(res);
      for (let index = 0; index < this.detailedEvaluateType.length; index++) {
        suggests.push({
          typeName: this.detailedEvaluateType[index].typeName,
          typeId: this.detailedEvaluateType[index].typeId,
          disabled: false,
        });
      }
      // console.log(suggests);
      if (list !== undefined && list != null && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < suggests.length; j++) {
            if (list[i].typeId == suggests[j].typeId) {
              suggests[j].disabled = true;
            }
          }
        }
      }
      this.detailedEvaluateType = JSON.parse(JSON.stringify(suggests));
      // });
    },
    //处理父级类型禁用选项
    handleAllEvaluateType(list) {
      // console.log(list);
      let suggests = [];
      // this.$api.course.courseProblemType
      //   .findByCid({ courseId: this.$store.state.course.courseId })
      //   .then((res) => {
      // console.log(res);
      for (let index = 0; index < this.allEvaluateType.length; index++) {
        suggests.push({
          typeName: this.allEvaluateType[index].typeName,
          typeId: this.allEvaluateType[index].typeId,
          disabled: false,
        });
      }
      // console.log(suggests);
      if (list !== undefined && list != null && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < suggests.length; j++) {
            if (list[i].typeId == suggests[j].typeId) {
              suggests[j].disabled = true;
            }
          }
        }
      }
      this.allEvaluateType = JSON.parse(JSON.stringify(suggests));
      // });
    },

    // 获取课程实例的考核评价所有类型
    findAllEvaluateType() {
      let evaluateType = [];
      this.$api.metadata.evaluation.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          evaluateType.push({
            typeName: res.data[index].name,
            typeId: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allEvaluateType = evaluateType;
      });
    },
    // 获取课程实例的考核评价详细类型
    findDetailedEvaluateType() {
      let evaluateType = [];
      this.$api.metadata.evaluationDetailed.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          evaluateType.push({
            typeName: res.data[index].name,
            typeId: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.detailedEvaluateType = evaluateType;
      });
    },
    submitItemListForm() {
      // 校验
      let suggests = JSON.parse(JSON.stringify(this.itemListForm.tableData));
      let num = 0;
      if (suggests.length == 0) {
        this.$message({
          message: "表格不能为空",
          type: "error",
        });
        return null;
      }
      for (let m = 0; m < suggests.length; m++) {
        if (
          suggests[m].proportion == null ||
          suggests[m].proportion == "" ||
          suggests[m].proportion == undefined ||
          !/^[1-9]\d*$/.test(suggests[m].proportion) ||
          suggests[m].typeId == null ||
          suggests[m].typeId == "" ||
          suggests[m].typeId == undefined
        ) {
          this.$message({
            message: "表格不能为空且分数占比只能为数字",
            type: "error",
          });
          return null;
        }
        num += parseInt(suggests[m].proportion);
      }
      console.log(num);
      if (num != 100) {
        this.$message({
          message: "分数占比之和只能为100",
          type: "error",
        });
        return null;
      }
      // 插入courseCinstanceId，处理参数
      for (let i = 0; i < this.itemListForm.tableData.length; i++) {
        this.itemListForm.tableData[i].cinstanceId =
          this.$store.state.course.courseCinstanceId;
      }
      console.log(this.itemListForm.tableData);
      let params = JSON.parse(JSON.stringify(this.itemListForm.tableData));
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.$api.course.courseEvaluation
          .saveEvaluation(params)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.findPage();
            }
          })
          .catch((err) => {
            this.closeItemListForm();
          });
      });
    },
    submitDetailedItemListForm() {
      // 校验
      let suggests = JSON.parse(
        JSON.stringify(this.detailedListForm.tableData)
      );
      let num = 0;
      if (suggests.length == 0) {
        this.$message({
          message: "表格不能为空",
          type: "error",
        });
        return null;
      }
      for (let m = 0; m < suggests.length; m++) {
        if (
          suggests[m].proportion == null ||
          suggests[m].proportion == "" ||
          suggests[m].proportion == undefined ||
          !/^[1-9]\d*$/.test(suggests[m].proportion) ||
          suggests[m].typeId == null ||
          suggests[m].typeId == "" ||
          suggests[m].typeId == undefined
        ) {
          this.$message({
            message: "表格不能为空且分数占比只能为数字",
            type: "error",
          });
          return null;
        }
        num += parseInt(suggests[m].proportion);
      }
      console.log(num);
      if (num != 100) {
        this.$message({
          message: "分数占比之和只能为100",
          type: "error",
        });
        return null;
      }
      // 插入evaluationId，处理参数
      for (let i = 0; i < this.detailedListForm.tableData.length; i++) {
        this.detailedListForm.tableData[i].evaluationId = this.evaluationId;
      }
      console.log(this.detailedListForm.tableData);
      let params = JSON.parse(JSON.stringify(this.detailedListForm.tableData));
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.$api.course.courseEvaluation
          .saveDetailedEvaluation(params)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.findDetailedPage();
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
        this.findPage();
      }
      if (this.flag == "2") {
        this.editFlag = true;
        this.delFlag = true;
        this.findPersonPage(null);
      }
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
      this.findPage();
      this.knowledgeId = "";
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

    //打开窗口
    handleitemListVisible(row) {
      this.itemListVisible = true;
      this.evaluationId = row.id;
      this.findDetailedEvaluateType();
      this.findDetailedPage();
      // console.log(row.id);
      // this.editForm = JSON.parse(JSON.stringify(row));
    },

    closeItemListForm() {
      this.detailedListForm = {
        tableData: [],
      };
      this.itemListVisible = false;
    },
    handleEditChange(row) {
      this.editVisible = true;
      // console.log(row.knowledgeName);
      this.editForm = JSON.parse(JSON.stringify(row));
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