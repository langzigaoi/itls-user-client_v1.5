
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
        { prop: "pubTime",label: "发布时间",minWidth: 100,align: "center",formatter: this.dateFormat},
        { prop: "startTime",label: "开始时间",minWidth: 100,align: "center",formatter: this.dateFormat},
        { prop: "endTime",label: "结束时间",minWidth: 100,align: "center",formatter: this.dateFormat},
        { prop: "isCompleted", label: "完成状态", minWidth: 100, align: "center", formatter: this.isCompleted },
      ],

      examFormVisible: false,
      examForm: {

      },
      
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
      this.$api.exam.examSummary.addSummary({examId:row.id});
      this.$refs.examDialog.openExamForm(row);
    },

    changeSummaryVisible(row) {
      console.log(row);
      
    },
  
   
    
  },
};
</script>
<style>
.outside {
  text-align: center;
}
</style>