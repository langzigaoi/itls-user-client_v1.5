<template>
  <div   
    v-loading="loading"
    element-loading-text="拼命评判中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-carousel
      ref="carousel"
      indicator-position="none"
      :autoplay="false"
      arrow="never"
      :loop="false"
    >
      <el-carousel-item v-for="(item, index) in programs" :key="item.problemId">
        <el-page-header @back="goBack" class="header"></el-page-header>
        <div class="title_div">
          <span class="title">{{ item.problemName }}</span>
          
          <div class="Problem_result"><span class="Problem_result_title">结果: </span><span class="Problem_result_ac" v-if="codeResult[index].submitResult != null">{{codeResult[index].submitResult}}</span></div>
          <el-select
            class="language_select"
            v-model="codeResult[index].mode"
            @change="languageChange"
            placeholder="选择编码语言"
            size="medium"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            class="theme_select"
            v-model="codeResult[index].theme"
            @change="themeChange"
            placeholder="选择主题"
            size="medium"
          >
            <el-option
              v-for="item in theme"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
 
        <el-card class="box-card1">
          <div class="bigbox">
            <div class="box">
              <div class="problemDescription">
                <h4>题目描述</h4>
                <div class="text">{{ item.problemDescription }}</div>
              </div>
              <div class="childrenbox">
                <h4>输入</h4>
                <div class="text">{{ item.problemInputFormat }}</div>
              </div>
              <div class="childrenbox">
                <h4>输出</h4>
                <div class="text">{{ item.problemOutputFormat }}</div>
              </div>
              <!-- <div class="childrenbox">
              <h4>输入样例</h4>
              <div class="text">{{ item.sampleInput }}</div>
            </div>
            <div class="childrenbox">
              <h4>输出样例</h4>
              <div class="text">{{ item.sampleOutput }}</div>
            </div> -->
              <div>提示</div>
              <div class="text">{{ item.problemhint }}</div>
            </div>
          </div>
        </el-card>
        <el-card class="box-card1 codeplace">
          <div class="submit-code">
            <codemirror
              v-model="codeResult[index].stuAnswer"
              :options="codeResult[index]"
            ></codemirror>
          </div>
        </el-card>
 
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-button
        icon="el-icon-s-fold"
        @click="ProblemList()"
        class="left_button"
        >题目列表</el-button
      >
      <el-button-group>
        <el-button icon="el-icon-arrow-left" @click="prevProblem()"
          >上一题</el-button
        >
        <el-button @click="nextProblem()"
          >下一题<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </el-button-group>
       
      <el-button
        icon="el-icon-circle-check"
        @click="submitAllProblem()"
        class="right_button allproblem"
        >提交全部
      </el-button>
      <el-button
        icon="el-icon-circle-check"
        @click="submitProblem()"
        >提交该题
      </el-button>
      <el-button
        icon="el-icon-circle-check"
        @click="saveProblem(currentPosition)"
        >保存
      </el-button>
    </div>
    <el-drawer
      title="题目列表"
      :visible.sync="isdrawer"
      direction="rtl"
      size="40%"
    >
      <el-table :data="issave" class="drawer_tab">
        <el-table-column
          property="problemName"
          label="题目"
          width="200"
        ></el-table-column>
        <el-table-column property="savename" label="保存" width="200">
          <!-- <el-button type="success" icon="el-icon-check" circle></el-button> -->
          <!-- <span class="saveicon" icon="el-icon-check"></span> -->
        </el-table-column>
        <el-table-column label="操作" width="200" class="button_do">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="enterProblem(scope.row.id)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              @click="submitProblem(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/javascript/javascript.js";
import axios from 'axios';
export default {
  name: "HomeworkDetail",
  components: {
    codemirror, // 代码框
  },
  data() {
    return {
      timer:undefined,//设置请求定时器全部提交
      timer1:undefined,//单个提交
      grads:0,//设定的分数
      code: "",
      programs: [],
      issave: [], // 用来判断题目是否保存
      isdrawer: false, // 控制抽屉是否显示
      ProblemProgNumber: [], //
      codeResult: [], // 用来保存编程结果：problemId,code,language
      homeworkTrace: {}, //保存当前被提交的作业
      homeResult: {},
      codeOption: [],
      currentPosition: 0,
      SubmissionResult:[],
      loading:false,
      cmOptions: {
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        tabSize: 1,
        highlightDifferences: true,
      },
      problemDetails: {},
      theme: [
        {
          value: "base16-light",
          label: "白天",
        },
        {
          value: "base16-dark",
          label: "黑夜",
        },
      ],
      options: [
        {
          value: "text/x-csrc",
          label: "C",
        },
        {
          value: "text/x-c++src",
          label: "C++",
        },
        {
          value: "text/x-java",
          label: "Java",
        },
        {
          value: "text/x-python",
          label: "Python",
        },
      ],
      value: "",
      textarea: "",
    };
  },
  mounted() {
    // 获取编程题目
    this.gethomeworkProblemProg();
    this.getHomeworkTrace();
    this.getHomeworkGrads();
  },
  beforeDestroy(){
     clearInterval(this.timer);
     clearInterval(this.timer1);
  },
  // 离开页面时销毁这个页面
  deactivated(){
    this.$destroy('homeworkdetail');
  },
  methods: {
    // 获取编程题分数
    getHomeworkGrads(){
      this.$api.student.gethomework.getHomeworkGrads({ sectionId: this.$route.query.sectionId })
      .then(res => {
        this.grads = res.data;
        console.log('分数');
        console.log(this.grads);
      })
    },
    // 获取编程题目
    gethomeworkProblemProg() {
      this.$api.student.gethomework
        .gethomeworkProblemProg({ sectionId: this.$route.query.sectionId })
        .then((res) => {
          this.programs = res.data;
          // 初始化是否保存列表
          for (let i = 0; i < this.programs.length; i++) {
            let item = {};
            item.id = i;
            item.problemId = this.programs[i].problemId;
            item.save = 0;
            item.problemName = this.programs[i].problemName;
            item.savename = "否";
            this.issave.push(item);
          }
          // 初始化编程结果
          for (let i = 0; i < this.programs.length; i++) {
            let item = {};
            item.id = i;
            item.problemId = this.programs[i].problemId;
            item.stuAnswer = "";
            item.mode = "text/x-csrc";
            item.theme = "base16-light";
            item.issubmit = false; // 是否已经提交，默认未提交
            item.lineNumbers = true;
            item.line = true;
            item.score = 0; // 默认分数为0
            item.submitResult = null; // 初始状态为空
            this.codeResult.push(item);
          }
          console.log("已经获取了编程题");
          this.getHomeworkTrace();
        });
    },
    // 获取保存的数据
    getHomeworkTrace() {
      this.$api.student.gethomework
        .getHomeworkTrace({
          stuNo: parseInt(this.$store.state.user.userInfo.userNo),
          homeworkId: this.$route.query.homeworkId,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data[0].problemId);
          console.log(this.codeResult[0].problemId);
          if (res.data.length != 0) {
            for (let i = 0; i < this.codeResult.length; i++) {
              for(let j=0;j<res.data.length;j++){
                  if (this.codeResult[i].problemId == res.data[j].problemId) {
                      this.codeResult[i].mode = res.data[j].mode;
                      this.codeResult[i].stuAnswer = res.data[j].stuAnswer;
                      this.codeResult[i].submitResult = res.data[j].submitResult;
                    console.log("获取答案");
                  }
                }
            }
            console.log(this.codeResult);
          }
        });
    },

    // 编程语言改变
    languageChange() {
      console.log(this.codeResult);
      // 将代码编辑器里面的设置做更改
    },

    themeChange() {},

    // 上一道题
    prevProblem() {
      this.$refs.carousel.prev();
      this.currentPosition--;
      if (this.currentPosition < 0) {
        this.currentPosition = 0;
      }
      // console.log(this.currentPosition);
    },

    // 下一道题
    nextProblem() {
      this.$refs.carousel.next();
      this.currentPosition++;
      if (this.currentPosition > this.programs.length - 1) {
        this.currentPosition = this.programs.length - 1;
      }
      // console.log(this.currentPosition);
    },

    // 题目列表
    ProblemList() {
      this.isdrawer = true;
    },

    // 题目列表里面点击进入跳转
    enterProblem(id) {
      this.$refs.carousel.setActiveItem(id);
      this.currentPosition = id;
      this.isdrawer = false;
    },

    // 将当前页面的代码保存
    saveProblem(index) {
      this.issave[index].savename = "是";
      this.homeworkTrace = this.codeResult[index];
      this.homeworkTrace.homeworkId = this.$route.query.homeworkId;
      this.homeworkTrace.stuNo = parseInt(
        this.$store.state.user.userInfo.userNo
      );
      console.log(this.homeworkTrace);
      this.$api.student.gethomework
        .saveHomeworkrecords(this.homeworkTrace)
        .then((res) => {
          this.Msg(res.msg);
        });
    },

    // 提交当前页面题目
    submitProblem(){
        this.loading = true;
        let getJudgeResult = {};
        getJudgeResult.problemId = this.codeResult[this.currentPosition].problemId;;
        getJudgeResult.uid = this.$store.state.user.userInfo.id;
        let createSubmission = {};
        createSubmission.code = this.codeResult[this.currentPosition].stuAnswer;
        createSubmission.languageSlug = this.codeResult[this.currentPosition].mode;
        createSubmission.problemId = this.codeResult[this.currentPosition].problemId;
        this.$api.problem.submission.createSubmission(createSubmission).then((res) => {
            if (res.code == 200) {
              console.log(res.data);
              this.timer1 = setInterval(() => {
                  this.$api.problem.submission.getJudgeResult(getJudgeResult).then(res => {
                    if(res.code == 200){
                      this.loading = false;
                      console.log("单个提交"+res.data);
                      this.codeResult[this.currentPosition].submitResult = res.data.resultname;
                      clearInterval(this.timer1);
                      let homeworkTrace = {};
                      homeworkTrace = this.codeResult[this.currentPosition];
                      homeworkTrace.homeworkId = this.$route.query.homeworkId;
                      homeworkTrace.stuNo = parseInt(this.$store.state.user.userInfo.userNo);
                      if(res.data.judgeResult != 'AC'){
                        homeworkTrace.score = 0;
                      }else homeworkTrace.score = this.grads;
                      homeworkTrace.submitResult = res.data.resultname;
                      this.$api.student.gethomework.insertHomeworkRecords(homeworkTrace)
                      .then(res =>{
                        this.Msg(res.msg);
                      })
                    }
                  })
              }, 3000);
            }
          })
          .catch((err) => {
            console.log("发送失败");
          });
    },

    // 提交全部代码
     submitAllProblem() {
      this.loading = true;
      let allresult = [];
      //使用promise.all处理多个调用
      const promise = this.codeResult.map((item) => {
        let createSubmission = {};
        createSubmission.code = item.stuAnswer;
        createSubmission.languageSlug = item.mode;
        createSubmission.problemId = item.problemId;
        this.$api.problem.submission
          .createSubmission(createSubmission)
          .then((res) => {
            if (res.code == 200) {
              console.log(res.data);
              allresult.push(res.data);
            }
          })
          .catch((err) => {
            console.log("发送失败");
          });
      });
      console.log(allresult);
      let problemIdStr = "";
      for(let i=0;i<this.codeResult.length;i++){
        problemIdStr = problemIdStr +this.codeResult[i].problemId + ",";
      }
      let getJudgeResult = {};
      getJudgeResult.problemIdStr = problemIdStr;
      getJudgeResult.uid = this.$store.state.user.userInfo.id;
      this.timer = setInterval(() => {
            this.$api.problem.submission
            .getJudgeResults(getJudgeResult)
            .then((res) => {
              this.SubmissionResult = res.data;
              if(this.SubmissionResult.length == this.codeResult.length){
                this.loading = false;
                clearInterval(this.timer);
                for(let i=0;i<this.codeResult.length;i++){
                    for(let j=0;j<this.SubmissionResult.length;j++){
                      if(this.SubmissionResult[j].problemId == this.codeResult[i].problemId){
                        if(this.SubmissionResult[j].submissionJudgeResult != 'AC'){
                          console.log(this.SubmissionResult[j].submissionJudgeResult);
                          this.codeResult[i].score = 0;
                        }else {
                          this.codeResult[i].score = this.grads;
                          }
                        this.codeResult[i].submitResult = this.SubmissionResult[i].judgeResultName;
                      }
                    }
                  console.log("更新分数后的code"+this.codeResult[i].score);
                }
                
               this.homeResult.homeworkTraces = this.codeResult;
               this.homeResult.homeworkTracesStr = JSON.stringify(this.codeResult);
               this.homeResult.homeworkId = this.$route.query.homeworkId;
               this.homeResult.stuNo = parseInt(this.$store.state.user.userInfo.userNo);
               this.$api.student.gethomework.insertAllHomeworkRecords(this.homeResult)
               .then(res =>{
                 if(res.code == 200){
                     this.$router.push({
                      path: "/studycourse/coursehomework"
                    });
                 }
               }).catch(err => {
                 console.log("插入失败");
               })
              }
            })
            .catch((err) => {
              console.log("获取失败");
            });
      }, 5000);
    },

    // 返回
    goBack() {
      this.$router.back();
    },
    submit() {
      let problemId = this.$route.query.id;
      if (!problemId) return;
      let data = {
        problemId: Number.parseInt(problemId),
        languageSlug: this.value,
        code: this.textarea,
      };
      this.$api.problem.program
        .submitCode(data)
        .then((res) => {
          this.refresh();
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refresh() {
      this.textarea = null;
    },
  },
};
</script>

<style>
.Problem_result{
  display: block;
  height: 40px;
  width: 250px;
  /* background-color: blue; */
  position: absolute;
  left: 350px;
  bottom: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  font-size: 16px;
}
.Problem_result_title{
  position: absolute;
  left: 1px;
  bottom: 10px;
}
.Problem_result_ac{
  position: absolute;
  left: 50px;
  bottom: 10px;
}
.header {
  margin-top: 15px;
}
.title_div {
  position: relative;
  height: 50px;
}
.title {
  font-size: 24px;
  position: absolute;
  left: 100px;
}
.language_select {
  position: absolute;
  bottom: 5px;
}
.theme_select {
  position: absolute;
  bottom: 5px;
  right: 240px;
}
span {
  margin-left: 20px;
}
.box {
  text-align: left;
  /* border: 1px solid #e8edf2; */
  /* background: #eaf0f5; */
  background-color: white;
  border-radius: 4px;
  margin-top: 30px;
  /* padding-top: 50px; */
  padding-left: 30px;
  padding-right: 50px;
  font-family: apple-system, BlinkMacSystemFont;
}
.childrenbox {
  margin-bottom: 20px;
  position: relative;
}
.problemDescription {
  width: 100%;
  position: relative;
}
.text {
  /* text-align: left; */
  font-size: 13px;
  position: relative;
  border-left: 2px solid #6e83e0;
  padding: 10px 0 10px 10px;
  margin: 0.8em 0;
  /* background: #fdfdfd; */
  background-color: #f5f5f5;
  word-break: break-word;
}
.submit-code {
  margin-top: 30px;
}
.submit-btn {
  margin-left: 100px;
}
.language-select {
  margin-bottom: 6px;
}
.CodeMirror {
  border: 1px solid #eee;
  height: 500px;
  text-align: left;
  width: 685px;
  position: absolute;
  left: 0;
  top: 0;
}
.el-carousel__item {
  overflow-y: auto;
  height: 600px;
  border-bottom: 2px black solid;
}
.el-carousel {
  height: 600px;
  overflow-y: hidden;
}
.box-card1 {
  width: 49%;
  float: left;
  /* margin-left: 30px; */
  height: 500px;
  overflow-y: auto;
  /* background: #eaf0f5; */
  position: relative;
  background-color: #fff;
}
.codeplace {
  width: 49%;
  height: 500px;
  overflow: hidden;
  float: left;
  position: relative;
}
.el-button-group {
  margin-right: 160px;
}
.drawer_tab {
  margin-left: 20px;
  text-align: center;
}
.left_button {
  float: left;
  margin-left: 30px;
  margin-right: 300px;
}
.right_button {
  float: right;
}
.allproblem {
  margin-right: 30px;
}
.thisproblem {
  margin-left: 400px;
}
.saveicon {
  width: 30px;
  height: 30px;
}
.button_do {
  text-align: center;
}
</style>