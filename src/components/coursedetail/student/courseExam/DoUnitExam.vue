<template>
  <div id="doUnitExam">
    <div class="exam-title">
      <span>{{ this.$route.query.name }}</span>
    </div>
    <div class="problems">
      <!-- 选择题 -->
      <span class="choicetype">一、选择题</span>
      <div class="choices" v-for="(item, index) in choices" :key="index" >
        <div class="choice-title">
          <span class="itemindex">{{ index + 1 }}.</span>
          <!-- 分值 -->
          <span class="itemtitle">({{ examInfo.choicePoint }}分) </span>
          <!-- 标题 -->
          <span class="itemtitle">{{ item.title }}</span>
        </div>
        <div class="choice-content">
          <el-radio-group v-model="radio[index]">
            <div
              class="racss"
              v-for="(option, number) in JSON.parse(item.options)"
              :key="number"
            >
              <el-radio :label="number">
                {{ String.fromCharCode(number + 65) + "."}}
                <span style="font-weight: 700" class="option">
                  {{option.option}}
                </span>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <!-- 编程题 -->
      <span class="progtype">二、编程题</span>
      <div class="progs" v-for="(prog, amount) in progs" :key="prog.problemId">
        <div class="prog-content">
          <div class="title">
            <span class="progitemindex">{{ amount + examInfo.choiceNum + 1 }}.</span>
            <span class="progitemindex">题目:{{ prog.problemName }}</span>
            <span>({{ examInfo.progPoint }}分)</span><br />
          </div>

          <div class="content">
            <span>题目描述:</span>
            <span>{{ prog.problemDescription }}</span
            ><br />
            <span>输入格式:</span>
            <span>{{ prog.problemInputFormat }}</span
            ><br />
            <span>输出格式:</span>
            <span>{{ prog.problemOutputFormat }}</span
            ><br />
          </div>
        </div>
        <div class="title_div">
          <span class="language">选择编程语言:</span>
          <el-select class="language_select" v-model="codeResult[amount].mode" @change="languageChange" placeholder="选择编码语言" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="bgcolor">选择背景:</span>
          <el-select class="theme_select" v-model="codeResult[amount].theme" @change="themeChange" placeholder="选择主题" size="mini">
            <el-option
              v-for="item in theme"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="submit-code">
          <codemirror v-model="codeResult[amount].stuAnswer" :options="codeResult[amount]"></codemirror>
        </div>
      </div>
    </div>
    <div class="subBtn"><el-button type="success" @click="submit">提交答案</el-button></div>
    
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/javascript/javascript.js'

export default {
  components: {
    codemirror, // 代码框
  },
  data() {
    return {
      choices: [], //选择题
      progs: [], //编程题
      examInfo: [], //考试信息
      choiceGrade: 0, //选择题的分数
      radio: [],
      id: "", //考试的id
      progGrade: 0 , //编程题的总成绩
      choiceResult: {
        examId: null,
        stuNo: null,
        problemId: null,
        stuAnswer: null,
        score: null
      },
      codeResult: [],
      examResult: {
        stuNo: "",
        examId: "",
        score: ""
      }, //考试的结果
      SubmissionResult:[],
      cmOptions: {
        mode: "text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        tabSize: 1,
        highlightDifferences: true
      },
      theme:[
         {
          value: "base16-light",
          label: "base16-light",
        },
        {
          value: "base16-dark",
          label: "base16-dark",
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
        {
          value: "text/x-HTML",
          label: "HTML"
        }
      ],
    };
  },
  mounted() {
    this.getExamChoice();
    this.getExamProg();
    this.getExamInfo();
  },
  methods: {
    //获取选择题
    getExamChoice() {
      console.log(this.$route.query.id);
      this.$api.exam.midsemester
        .getExamChoice({ id: this.$route.query.id })
        .then((res) => {
          this.choices = res.data;
          console.log(this.choices);
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    //获取编程题
    getExamProg() {
      this.$api.exam.midsemester
        .getExamProg({ id: this.$route.query.id })
        .then((res) => {
          this.progs = res.data;
          // 初始化编程结果
          for (let i = 0; i < this.progs.length; i++) {
            let prog = {};
            prog.id = i;
            prog.problemId = this.progs[i].problemId;
            prog.stuAnswer = "";   //保存编辑器里的答案
            prog.mode = "text/x-csrc";
            prog.theme = "base16-light";
            prog.issubmit = false; // 是否已经提交，默认未提交
            prog.lineNumbers = true;
            prog.line = true;
            prog.score = 0; // 默认分数为0
            this.codeResult.push(prog);
          }
          console.log(this.progs);
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    //考试的详细信息
    getExamInfo() {
      this.id = this.$route.query.id;
      this.$api.exam.midsemester
        .getNewExamInfo({ id: this.$route.query.id })
        .then((res) => {
          this.examInfo = res.data;
          // console.log(res.data);
          console.log("考试的详细信息");
          console.log(this.examInfo);
          console.log(this.$route.query.id);
        })
        .catch((err) => {
          console.log("数据获取失败");
        });
    },
    submit() {
      //选择题的总得分
      for(let i=0; i < this.choices.length; i++){
        if(this.radio[i] == this.choices[i].answer){
          this.choiceGrade = this.choiceGrade + parseInt(this.examInfo.choicePoint);
        }else {
          this.choiceGrade = this.choiceGrade + 0;
        }
      }
      //将每道选择题的记录插入到数据库中
      for(let i=0; i < this.choices.length; i++){
        console.log(this.choiceResult);
        this.choiceResult.examId = this.$route.query.id;
        this.choiceResult.stuNo = this.$store.state.user.userInfo.userNo;
        this.choiceResult.problemId = this.choices[i].id;
        if(this.radio[i] == this.choices[i].answer){
          this.choiceResult.score = this.examInfo.choicePoint;
        }else {
          this.choiceResult.score = 0;
        }
        this.choiceResult.stuAnswer = String.fromCharCode(this.radio[i] + 65);
        this.$api.exam.examtrace
          .insertChoiceTrace({examId:this.choiceResult.examId, stuNo: this.choiceResult.stuNo, problemId: this.choiceResult.problemId,
          score: this.choiceResult.score,stuAnswer: this.choiceResult.stuAnswer})
          .then((res) => {
            console.log("添加成功");
          })
          .catch((err) => {
            console.log("添加失败");
          })
      }

      //编程题的评判结果
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
            console.log(res.data);
            this.SubmissionResult = res.data;
            if(this.SubmissionResult.length == this.codeResult.length){
            clearInterval(this.timer);
            for(let i=0;i<this.codeResult.length;i++){
                for(let j=0;j<this.SubmissionResult.length;j++){
                  if(this.SubmissionResult[j].problemId = this.codeResult[i].problemId){
                    this.codeResult[i].score = this.SubmissionResult[i].submissionJudgeScore;
                  }
                }
                console.log(this.codeResult);
                console.log(this.id)
                this.codeResult[i].id = this.id;
                this.codeResult[i].stuNo = this.$store.state.user.userInfo.userNo
                this.$api.exam.examtrace
                  .insertExamTrace(this.codeResult[i])
                  .then((res) => {
                    console.log("编程题记录插入成功");
                  })
                  .catch((err) => {
                    console.log("插入失败");
                  })
                this.progGrade = this.progGrade + this.codeResult[i].score;
                console.log(this.progGrade);
              }
              this.examResult.stuNo = this.$store.state.user.userInfo.userNo;
              this.examResult.examId = this.id;
              this.examResult.score = this.choiceGrade + this.progGrade;
              this.$api.exam.examtrace
                .insertExamSummary(this.examResult)
                .then((res) => {
                  console.log("总成绩插入成功");
                  if(res.code == 200){
                    this.$router.push({
                      path: "/studycourse/unitexam",
                    });
                  }
                })
                .catch((err) => {
                  console.log("总成绩插入失败");
                })
            }
          })
          .catch((err) => {
            console.log("获取评判结果失败");
          })
        }, 2000);
          //差人总成绩
          // this.examResult.stuNo = this.$store.state.user.userInfo.userNo;
          // this.examResult.examId = this.$route.query.id;
          // this.examResult.score = this.choiceGrade + this.progGrade;
          // this.$api.exam.examtrace
          //   .insertExamSummary(this.examResult)
          //   .then((res) => {
          //     console.log("总成绩插入成功");
          //     if(res.code == 200){
          //       this.$router.push({
          //         path: "/studycourse/unitexam",
          //       });
          //     }
          //   })
          //   .catch((err) => {
          //     console.log("总成绩插入失败");
          //   })
        
          
    },
    languageChange(){
      // 将代码编辑器里面的设置做更改
    },
    themeChange(){

    },

  },
};
</script>
  
<style>
#doUnitExam {
  margin-left: 30px;
  width: 80%;
  height: 100%;
  text-align: left;
  /* background-color: red; */
}
.choicetype {
  margin-left: 80px;
  font-size: 20px;
}
.progtype {
  margin-left: 80px;
  font-size: 20px;
}
.choices {
  margin-left: 80px;
}
.progs {
  margin-left: 80px;
}
.progs .progtitle {
  margin-left: 60px;
}
.exam-title {
  text-align: center;
  font-size: 30px;
  margin-top: 20px;
}
.racss {
  margin: 20px 10px;
}
.racss .option {
  margin-left: 20px;
}
.ProblemChoiceItem {
  margin: 30px 0;
}
.progitemindex {
  margin-right: 20px;
}
.itemtitle {
  font-size: 16px;
}
.title {
  width: 100%;
  height: 20%;
}
.content {
  /* text-indent: 10%; */
  width: 80%;
  /* background-color: red; */
  letter-spacing: 2px;
  margin-left: 60px;
}
.content span:nth-child(1) {
  font-weight: bold;
  color: red;
}
.content span:nth-child(4) {
  font-weight: bold;
  color: red;
}
.content span:nth-child(7) {
  font-weight: bold;
  color: red;
}
.tool-bar {
  top: 20px;
  margin: 30px 2px 0px 20px;
  margin-left: 60px;
 }
 .subBtn{
  /* width: 100%; */
  height: 50px;
  text-align: center;
  margin-left: 28%;
  margin-top: 5%;
 }
 .subBtn .el-button{
   position: absolute;
   margin-top: 5px;
 }
 .title_div{
  position: relative;
  height: 50px;
}
.language_select{
  position: absolute;
  bottom:5px;
  left: 15%;
}
.theme_select{
  position: absolute;
  bottom:5px;
  right: 280px;
}
.language{
  position: relative;
  top: 20px;
  left: 60px;
  font-weight: 700;
}
.bgcolor{
  position: relative;
  top: 20px;
  left: 43%;
  font-weight: 700;
}
.CodeMirror {
  border: 1px solid #eee;
  height: 500px;
  text-align: left;
  width: 80%;
  left: 5%;
  font-family: Arial, monospace;
  font-size: 16px;
}
</style>