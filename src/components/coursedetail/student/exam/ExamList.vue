
<template>
  <div class="outside" style="padding: 10px">
    <el-row>
      <el-col :span="14">
        <el-tabs
              v-model="typeFlag"
              type="card"
              @tab-click="handleChangeTypeFlag"
              class="mlef-20"
            >
              <el-tab-pane label="期末考试" name="1"></el-tab-pane>
              <el-tab-pane label="其他考试" name="2"></el-tab-pane>
            </el-tabs>
      </el-col>

    
    </el-row>

    <!--考试列表-->
    <com-table
      :data="pageResults"
      :columns="columns"
      :flag="'2'"
      @findPersonPage="findPersonPage"
      :showFlag="examList.showFlag"
      :disableFlag="examList.disableFlag"
      @handleStartExam="changeStartExamVisible"
      @handleSummary="changeSummaryVisible"
    >
    </com-table>

    <exam-dialog
      ref="examDialog"
    ></exam-dialog>

    <el-dialog
      top="5vh"
      align="center"
      :visible.sync="examSummaryVisible"
      width="40%"
      style=""
      @close="closeExamSummaryForm"
      title="成绩查询"
    >
    <el-form ref="examSummaryForm" :model="examSummaryForm" label-width="50px"  >
      <el-form-item align="center">
        <el-row>
          <el-col :span="10" align="center">
            <el-row>
              学号: 
            </el-row>
            <el-row>
              成绩: 
            </el-row>
            <el-row>
              状态: 
            </el-row>
          </el-col>
          <el-col :span="14" align="left">
            <el-row>
              {{examSummaryForm.stuNo}}
            </el-row>
            <el-row>
              {{examSummaryForm.score}}
              <el-tooltip effect="dark" class="item" content="对成绩有疑问请联系任课老师" placement="top-start">
                <i class="el-icon-info" style="color:#14889A"></i>
              </el-tooltip>
            </el-row>
            <el-row>
              {{completeFormat(examSummaryForm.isCompleted)}}
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>
      <el-button type="primary" size="mini" @click="closeExamSummaryForm">确定</el-button>
    </el-form>

    </el-dialog>
  
  </div>
</template>
<script>
import ComTable from "../../../common/ComTable.vue";
import ExamDialog from './ExamDialog.vue';

export default {
  components: {
    ComTable,
    ExamDialog,
  },
  data() {
    return {
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResults: {},
      // findPersonPage参数
      courseCinstanceId: "",
      chapterId: "",
      isPub: "",
      typeFlag: "2",

      examId: "",

      //考试列表
      examList: {
        showFlag:{
          startExam: true,
          summary: true,
        },
        disableFlag:{},
      },

      columns: [
        { prop: "examName", label: "标题", minWidth: 150, align: "center" },
        { prop: "examTypeName", label: "类型", minWidth: 150, align: "center" },
        // { prop: "num", label: "总题数", minWidth: 100, align: "center", formatter: this.getIsGenerate },
        // { prop: "fraction", label: "总分", minWidth: 100, align: "center", formatter: this.getIsGenerate },
        // { prop: "list", label: "范围", minWidth: 250, align: "center" },
        { prop: "resultPubTime",label: "成绩公布时间",minWidth: 110,align: "center",formatter: this.dateFormat},
        { prop: "startTime",label: "开始时间",minWidth: 110,align: "center",formatter: this.dateFormat},
        { prop: "endTime",label: "结束时间",minWidth: 110,align: "center",formatter: this.dateFormat},
        { prop: "isCompleted", label: "完成状态", minWidth: 100, align: "center", formatter: this.isCompleted },
      ],

      examFormVisible: false,
      examForm: {},

      examSummaryVisible: false,
      examSummaryForm: {},
      
    };
  },
  mounted() {

  },
  created() {
    
  },
  methods: {

    isCompleted(row, column) {
      if (row[column.property] == 0) {
        return "未完成";
      } else {
        return "已完成";
      }
    },
    completeFormat(flag) {
      if (flag == 0) {
        return "缺考";
      }
      if(flag == 1) {
        return "正常"
      }
    },
    dateFormat(row, column) {
      return this.timeByMinutes(row[column.property]);
    },

    handleChangeTypeFlag(){
      this.findPersonPage(null);
    },
    // 分页查询
    findPersonPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "insId", value: this.$store.state.course.courseCinstanceId },
      ];
      // console.log(this.pageRequest.params);
      this.$api.exam.examSetup
        .studentPage(this.pageRequest)
        .then((res) => {
          // console.log(res.data);
          if (res.data !== null) {
            let suggest = JSON.parse(JSON.stringify(res.data.content));
            let pageResults = {
              pageNum: 1,
              pageSize: 10,
              totalPages: null,
              totalSize: null,
              content: []
            };

            for (let i = 0; i < suggest.length; i++) {
              if (this.typeFlag == "1") {
                if (suggest[i].examTypeName == "期末考试") {
                  pageResults.content.push(suggest[i]);
                }
              }
              if (this.typeFlag == "2") {
                if (suggest[i].examTypeName != "期末考试") {
                  pageResults.content.push(suggest[i]);
                }
              }
            }
            pageResults.totalSize = pageResults.content.length;
            pageResults.totalPages = Math.ceil(pageResults.totalSize/pageResults.pageSize);
            // console.log(pageResults);
            for (let i = 0; i < pageResults.content.length; i++) {
              let clist = [];
              for (let j = 0;j < pageResults.content[i].chapterOfList.length;j++) {
                clist.push(
                  pageResults.content[i].chapterOfList[j].chapterName,";"
                );
                pageResults.content[i].list = JSON.parse(JSON.stringify(clist));
              }
            }
            this.pageResults = pageResults;
          }
          if (res.data == null) {
            this.$message({message: res.msg, type: "error" });
            this.pageResults = [];
          }
        })
        .then(data != null ? data.callback : "");
    },

    changeStartExamVisible(row) {
      console.log(row);
      let startTime = row.startTime;
      console.log(startTime);
      let endTime = row.endTime;
      let now = Date.parse(new Date());
      console.log(now);
      if (now < startTime ) {
        this.$message({ message: "考试未开始", type: "warning" });
        return null;
      }
      if(now > endTime ) {
        this.$message({ message: "考试已结束", type: "warning" });
        return null;
      }
      this.$api.exam.examSummary.addSummary({examId:row.id});
      this.$refs.examDialog.openExamForm(row);
    },

    changeSummaryVisible(row) {
      let examId = row.id;
      this.$api.exam.examSummary.findSummaryResult({examId: examId}).then((res) =>{
        console.log(res);
        if (res.code == 200) {
          this.examSummaryForm = JSON.parse(JSON.stringify(res.data));
          this.examSummaryVisible = true;
        }
      })
      
    },
    closeExamSummaryForm() {
      this.examSummaryForm = {};
      this.examSummaryVisible = false;

    },
  
   
    
  },
};
</script>
<style>
.outside {
  text-align: center;
}
</style>