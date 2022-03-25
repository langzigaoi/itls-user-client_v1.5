<template>

  <div id="BeginTest">
    <el-dialog
      top="5vh"
      align="left"
      title="测验"
      :append-to-body="true"
      :visible.sync="diaVisible"
      width="80%"
      style="">

    <div class="TestTitle">
      <!-- {{ this.$route.query.TestTitle }} -->
      {{ this.query.TestTitle }}
    </div>
    <!-- <problem-choice-item
      ref=""
      v-for="(item, index) in ProblemChoiceList"
      :key="index"
      :problemitem="item.problemChoices"
      :itemindex="index"
      :compute="compute"
      :problemgrades="item.grades"
      @isProblem="getTestresult"
    ></problem-choice-item> -->

    <el-table  :data="ProblemChoiceList" style="overflow: scroll width: 100%;" >
          <!-- <el-table-column prop="choiceProblemId" label="id" min-width="10%"> </el-table-column> -->
          <el-table-column label="题号" min-width="10%"> 
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column prop="problemChoices[0].title" label="题目" min-width="40%"> </el-table-column>
          <!-- <el-table-column  prop="problemChoices[0].options" label="选项" min-width="25%"></el-table-column> -->
          <el-table-column  label="选项"  min-width="25%">
              <template slot-scope="scope">
                <el-radio-group v-model="ansRadio[scope.$index]" @change="radioChange(scope.row.choiceProblemId)">
                  <!-- <el-radio   :label="'A'" > A</el-radio>
                  <el-radio   :label="'B'"> B</el-radio>
                  <el-radio   :label="'C'"> C</el-radio>
                  <el-radio   :label="'D'"> D</el-radio> -->
                  <el-radio v-for="(item,index) in scope.row.problemChoices[0].ops" :label="index+1">{{item}}</el-radio>
                </el-radio-group>
              </template>
          </el-table-column>
          <!-- <div>
              <el-radio-group v-model="radio">
              <div class="racss" v-for="(option,index) in problemitem[0].options)" :key="index"><el-radio :label=index >
                  {{String.fromCharCode(index+65)}}<span style="font-weight:700">: </span>{{option.option}}</el-radio>
              </div>
              </el-radio-group>
          </div> -->
          
    </el-table>

    <!-- <el-button type="primary" @click="storeAnswer">保存答案</el-button> -->
    <el-button type="success" @click="getProblemnumber" :disabled="isSubmit == 1">提交</el-button>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :append-to-body="true">
      <span>是否提交?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="iscorrect">取 消</el-button>
        <el-button type="primary" @click="correct">确 定</el-button>
      </span>
    </el-dialog>
    </el-dialog>
  </div>



</template>

<script>
import ProblemChoiceItem from "./ChildComponent/ProblemChoiceItem.vue";
export default {
  name: "BeginTest",
  data() {
    return {
      isSubmit:0,
      test:'1',
      query:{
        sectionId:null,
        TestTitle:null,
      },
      diaVisible: false,
      dialogVisible: false,
      ProblemChoiceList: null,
      userId:0,
      testId:0,
      compute: 0,
      1: 0,
      2: 0,
      count: 0,
      storeAns:null,
      ansRadio: null,
      ansop:null,
      proIdList:[],
      stuRecords:{
        stuNo:null,
        testId:0,
        proId:[],
        stuAns:[],
      },
      testRec:[],
      TestResult: {
        score: 0,
        testId: 0,
        stuNo: 0,
        TestTraces: [],
      },
    };
  },
  components: {
    ProblemChoiceItem,
  },
  mounted() {
    // this.getProblem();
    // this.getStudentId();
    // this.ansRadio = this.stuAns;
  },
  methods: {

     // 改变弹框的显示
      changeDialogVisible(sectionId,testTitle) {
      this.diaVisible = !this.diaVisible;
      this.query.sectionId = sectionId;
      this.query.TestTitle = testTitle;
      this.getProblem();
      this.getStudentId();
      this.ansRadio = this.stuAns;
     
      // console.log(this.getAns());
      },
    //字符串分割
    getAns(str){
      let op = str.split('@');
      return op;
    },

    //保存答案
    storeAnswer(){
      this.storeAns = this.ansRadio;

    },
    radioChange(choiceProblemId){
      // console.log(choiceProblemId);
      console.log(this.ansRadio);
    },
    getStudentId(){
      this.$api.student.getTest
        .getStudentId({
          id: this.$store.state.user.userInfo.id
        })
        .then((res) => {
          this.Msg(res.msg);
          this.userId = res.data;
        });
    },
    getProblem() {
      this.proIdList=[],
      // console.log(this.$route.query.sectionId);
      console.log(this.query.sectionId);
      this.$api.student.getTest
        .getTestProblem({
          // sectionId: this.$route.query.sectionId,
          sectionId: this.query.sectionId,
        })
        .then((res) => {
          this.ProblemChoiceList = res.data;
          for (let index = 0; index < this.ProblemChoiceList.length; index++) {
            let ops = this.ProblemChoiceList[index].problemChoices[0].options.split("@");
            this.ProblemChoiceList[index].problemChoices[0].ops = ops;   //存储分割好的选项
          }
          console.log(this.ProblemChoiceList);
          this.testId = this.ProblemChoiceList[0].testId;
          this.length2 = this.ProblemChoiceList.length;
          let ansRadio = [];
          for (let index = 0; index < this.ProblemChoiceList.length; index++) {
            ansRadio.push("");
            this.proIdList.push(this.ProblemChoiceList[index].choiceProblemId);
          }
          this.ansRadio = ansRadio
          // console.log(this.ansRadio);
          // console.log(this.proIdList);
          // console.log(this.userId);
          // console.log(this.testId);
        });
        
    },
    getProblemnumber() {
      // this.stuRecords={};
      // this.compute = 1;
      // // this.TestResult.testId = this.ProblemChoiceList[0].testId;
      // // this.TestResult.stuNo =  this.userId;
      this.dialogVisible = true;
      // // this.stuRecords.push(this.userId);
      // // this.stuRecords.push(this.testId);
      // // this.stuRecords.push(this.proIdList);
      // // this.stuRecords.push(this.ansRadio);
      // this.stuRecords.stuNo = this.userId;
      // this.stuRecords.testId = this.testId;
      // this.stuRecords.proIdList = this.proIdList;
      // for (let index = 0; index < this.ansRadio.length; index++) {
      //   switch(this.ansRadio[index]){
      //     case 1:
      //       this.ansRadio[index] = "A";
      //       break;
      //     case 2:
      //       this.ansRadio[index] = "B";
      //       break;
      //     case 3:
      //       this.ansRadio[index] = "C";
      //       break;
      //     case 4:
      //       this.ansRadio[index] = "D";
      //       break;
      //     case 5:
      //       this.ansRadio[index] = "E";
      //       break;
      //     case 6:
      //       this.ansRadio[index] = "F";
      //       break;
      //     default:
      //       this.ansRadio[index] = "M";    //选项设定为6个，M代表错误选项
      //       break;
      //   }
      // }
      // this.stuRecords.ansList = this.ansRadio;
      // console.log(this.stuRecords);
    },
    iscorrect() {
      this.dialogVisible = false;
      // this.compute = 0;
      // this.stuRecords={};
    },
    correct() {
      this.dialogVisible = false;

      //原getProblemnumber()内容
      this.stuRecords={};
      this.compute = 1;
      // this.TestResult.testId = this.ProblemChoiceList[0].testId;
      // this.TestResult.stuNo =  this.userId;
      //this.dialogVisible = true;
      // this.stuRecords.push(this.userId);
      // this.stuRecords.push(this.testId);
      // this.stuRecords.push(this.proIdList);
      // this.stuRecords.push(this.ansRadio);
      this.stuRecords.stuNo = this.userId;
      this.stuRecords.testId = this.testId;
      this.stuRecords.proIdList = this.proIdList;
      for (let index = 0; index < this.ansRadio.length; index++) {
        switch(this.ansRadio[index]){
          case 1:
            this.ansRadio[index] = "A";
            break;
          case 2:
            this.ansRadio[index] = "B";
            break;
          case 3:
            this.ansRadio[index] = "C";
            break;
          case 4:
            this.ansRadio[index] = "D";
            break;
          case 5:
            this.ansRadio[index] = "E";
            break;
          case 6:
            this.ansRadio[index] = "F";
            break;
          default:
            this.ansRadio[index] = "M";    //选项设定为6个，M代表错误选项
            break;
        }
      }
      this.stuRecords.ansList = this.ansRadio;
      // console.log(this.stuRecords);
      // for (let i = 0; i < this.TestResult.TestTraces.length; i++) {
      //   this.count = this.count + this.TestResult.TestTraces[i].score;
      // }
      // this.TestResult.score = this.count;
      // console.log(this.count);
      // console.log(this.TestResult);
      // this.TestResult.testTracesStr = JSON.stringify(this.TestResult.TestTraces);
      // this.$api.student.getTest.testRecords(this.TestResult)
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "提交成功!",
      //     });
      //     this.$router.push({
      //       path: "/studycourse/coursestudenttest"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "提交失败",
      //     });
      //   });
        //  this.testRec = JSON.stringify(this.stuRecords);
        //  console.log(this.testRec);
        //  console.log(JSON.parseArray(this.testRec));
        console.log(this.stuRecords);
         this.$api.student.getTest.testStuRecords(this.stuRecords).then(() => {
          this.isSubmit = 1;
          this.diaVisible = false;
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.$router.push({
            path: "/studycourse/coursestudenttest"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "提交失败",
          });
        });
    },
    getTestresult(grades, problemId, resultradio) {
      let item = {};
      item.problemId = problemId;
      item.score = grades;
      item.stuAnswer = resultradio;
      this.TestResult.TestTraces.push(item);
      console.log(this.TestResult.TestTraces);
      this.length1++;
    },
  },
};
</script>

<style>
#BeginTest {
  margin-left: 30px;
  width:100%;
  text-align: left;
}
</style>