<template>
  <div>
    <el-dialog
      top="5vh"
      align="center"
      :visible.sync="examFormVisible"
      :show-close="false"
      :fullscreen="true"
      style=""
    >
      <div style="">
        <el-row>
          <el-col :span="12">
            <el-tabs
              v-model="itemTabFlag"
              style="width: 50%; float: left; font-size: 18px"
            >
              <el-tab-pane label="考试须知" name="0"></el-tab-pane>
              <el-tab-pane
                v-if="itemTab.choose == true"
                label="单选题"
                name="1"
              ></el-tab-pane>
              <el-tab-pane
                v-if="itemTab.program == true"
                label="编程题"
                name="2"
              ></el-tab-pane>
          </el-tabs>
          </el-col>

          <el-col :span="12">
            <CountDown v-if="this.summary.isCompleted == 0" :countTime="countTime" @handleTimeout="handleTimeout"></CountDown>
          </el-col>
          

        </el-row>
        

        <el-row>
          <!--考试须知-->
          <el-card class="card" v-if="itemTabFlag == 0">
            <div slot="header">
              <el-row>
                <el-col :span="24">
                  <h3>
                    【考试须知】{{ examForm.examName }}·{{
                      examForm.examTypeName
                    }}
                  </h3>
                  
                </el-col>
              </el-row>
            </div>

            <div class="examInfo">
              <el-row>
                <el-col :span="12" align="center">
                  <el-row class="row"> 考试内容： </el-row>
                  <el-row class="row"> 试卷总分： </el-row>
                  <el-row class="row"> 开始时间： </el-row>
                  <el-row class="row"> 结束时间： </el-row>
                  <el-row class="row"> 考试时长： </el-row>
                </el-col>

                <el-col :span="12" align="center">
                  <el-row class="row">
                    共{{ examForm.itemSize }}大题{{ examForm.num }}小题
                  </el-row>
                  <el-row class="row"> 共{{ examForm.fraction }}分 </el-row>
                  <el-row class="row">
                    {{ dateFormat(examForm.startTime) }}
                  </el-row>
                  <el-row class="row">
                    {{ dateFormat(examForm.endTime) }}
                  </el-row>
                  <el-row class="row">
                    {{examForm.duration}}分钟
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <!--单选题-->
          <el-card class="card" v-if="itemTabFlag == 1">
            <div slot="header">
              <el-row>
                <el-col :span="8" align="left">
                  <h4>
                    {{ indexFormat(itemList.choose.index) }}
                    {{ itemList.choose.problemTypeName }}
                    (本大题共{{ itemList.choose.num }}小题，共{{
                      itemList.choose.score
                    }}分)。
                  </h4>
                </el-col>
                <el-col :span="16" align="right">
                    
                </el-col>
              </el-row>
            </div>

            <div
              v-for="content in itemList.choose.contentList"
              :key="content.id"
              align="left"
            >
              <el-row>{{ content.indexNum }}.{{ content.choice.title }}</el-row>
              
              <el-radio-group v-model="content.answer">
                <div v-for="option in content.optionList" :key="option.index" align="left">
                    <el-row style="margin-top:15px">
                        <el-radio :label="option.index">{{option.title}}</el-radio>
                    </el-row>
                </div>
              </el-radio-group>


              <el-divider></el-divider>
            </div>
          </el-card>

          <!--编程题-->
          <el-card class="card" v-if="itemTabFlag == 2">
            <div slot="header" >
              <el-row>
                <el-col :span="8" align="left">
                  <h4>
                    {{ indexFormat(itemList.program.index)
                    }}{{ itemList.program.problemTypeName }}(本大题共{{
                      itemList.program.num
                    }}小题，共{{ itemList.program.score }}分)。
                  </h4>
                </el-col>
                <el-col :span="16">
                  
                </el-col>
              </el-row>
            </div>

            <div v-for="content in itemList.program.contentList" :key="content.id" 
              class="text item" style="text-align:left;">
              <div class="code">
                  <!-- <el-row style="height:60vh" > -->
                    <el-col :span="12" >
                      <!-- <div style="padding:20px; height:60vh"> -->
                        <h3>{{ content.indexNum }}.题目:{{ content.program.problemName }}</h3>
                        <br/>
                        <h4>题目描述:</h4>
                        <span>{{ content.program.problemDescription }}</span>
                        <br/>
                        <h4>输入格式:</h4>
                        <span>{{ content.program.problemInputFormat }}</span>
                        <br/>
                        <h4>输出格式:</h4>
                        <span>{{ content.program.problemOutputFormat }}</span>
                        <br/>
                      <!-- </div> -->   
                    </el-col>

                    <el-col :span="12">
                      <el-row>
                        <el-col :span="12">
                          <span style="font-size:5px">编程语言: </span>
                          <el-select 
                            style="width:60%" v-model="content.languageName" placeholder="选择编码语言" size="mini">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12">
                          <span style="font-size:5px ">主题: </span>
                          <el-select style="width:80%" 
                            v-model="cmOptions.theme" placeholder="选择主题" size="mini">
                            <el-option
                              v-for="item in theme"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                      <codemirror v-model="content.answer" :options="cmOptions"></codemirror>
                    </el-col>

              </div>
              <el-divider></el-divider>

            </div>
          </el-card>
        </el-row>

        <el-form
          :model="examForm"
          ref="examForm"
          size="small"
          text-algin="center"
        >
          <el-row>
            <el-button size="mini" v-if="this.summary.isCompleted == 1"
              @click="closeExamForm">离开 </el-button>
            <el-button size="mini" 
              type="danger"
              v-if="itemTabFlag != 0" 
              @click="doneSummary"
              :disabled="this.summary.isCompleted == 1">
              提交
            </el-button>            
          </el-row>
        </el-form>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import CountDown from "./CountDown.vue";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/javascript/javascript.js'

export default {
  components: {
    codemirror,
    CountDown,
  },
  props: {},
  data() {
    return {
      pageRequest: { pageNum: 1, pageSize: 10 },
      loading: true,
      examFormVisible: false,

      examForm: {
        itemSize: null,
      },
      summary: {
        isCompleted: 0,
        remainingTime: null,
      },

      itemTabFlag: 0,
      itemTab: {
        choose: false,
        program: false,
      },
      itemList: {
        choose: {},
        program: {},
      },

      contentList: [],
      countTime: {
        minute: null,
        second: null
      },

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
          label: "明亮",
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
        {
          value: "text/x-HTML",
          label: "HTML"
        }
      ],
    };
  },
  mounted() {
    // this.findSummary();
  },
  created() {
    // this.findSummary();
  },
  methods: {
    indexFormat(index) {
      switch (index) {
        case 1:
          return "一、";
        case 2:
          return "二、";
        case 3:
          return "三、";
        case 4:
          return "四、";
        case 5:
          return "五、";
        case 6:
          return "六、";
      }
    },
    dateFormat(timeStamp) {
      return this.timeByMinutes(timeStamp);
    },

    async openExamForm(exam) {
      this.examForm = JSON.parse(JSON.stringify(exam));
      console.log(this.examForm);
      await this.findSummary(this.examForm.id);
      await this.findItemList(this.examForm.id);
      // console.log(this.itemList.program);
      this.examFormVisible = true;
    },

    async findSummary(examId) {
      this.$api.exam.examSummary.findSummary({examId:examId}).then((res) =>{
        console.log(res);
        this.summary.isCompleted = res.data.isCompleted;
        this.summary.remainingTime = res.data.remainingTime;
        // 倒计时时间
        // this.countTime.minute = res.data.remainingTime;
        if (this.summary.isCompleted != 1 ) {
          this.countTime.minute = res.data.remainingTime;
          this.countTime.second = 0;
        }



      })
    },
    closeExamForm() {
      this.examForm = {};
      this.itemList = {
        choose: {},
        program: {},
      };
      this.itemTab ={
        choose: false,
        program: false,
      };
      this.examFormVisible = false;

      this.countTime.minute = 999; 
    },

    async findItemList(examId) {
      this.pageRequest.params = [{ name: "examId", value: examId }];
      await this.$api.exam.examItem.findList(this.pageRequest).then(async (res) => {
        if (res.data != null) {
          // console.log(res.data.content);
          // 循环查询结果，获取题型list
          let suggests = res.data.content;
          let index = 0;
          let indexNum = 0;

          for (let i = 0; i < suggests.length; i++) {
            index = index + 1;
            // console.log(suggests[i]);
            if (suggests[i].problemTypeName == "单选题") {
              suggests[i].index = index;
               await this.$api.exam.examContent.findStudentContent({ itemId: suggests[i].id }).then((res) => {
                suggests[i].contentList = res.data;
                // console.log(res.data);
                // console.log(suggests[i].contentLis);
                // 处理选项
                var sep = ["A.","B.","C.","D.","E.","F.","G.",]
                for (let m = 0; m < suggests[i].contentList.length; m++) {
                  let optionString =  suggests[i].contentList[m].choice.options.toString();
                  let optionList = [];
                  for (let n = 0; n < sep.length; n++) {
                    var list = this.splitString(optionString,sep[n]);
                    if(n != 0 ) {
                      optionList.push({title: sep[n-1]+list[0].trim(), index:sep[n-1].replace(".","")});
                    }
                    if (list.length != 1) {
                      optionString = list[1];
                    } else {
                      break
                    }
                  }
                  // console.log(optionList);
                  suggests[i].contentList[m].optionList = optionList;
                  indexNum = indexNum +1;
                  // console.log("单选"+indexNum);
                  suggests[i].contentList[m].indexNum = indexNum;
                }
                this.itemList.choose = JSON.parse(JSON.stringify(suggests[i]));
                // console.log(this.itemList.choose);
              })
              this.itemTab.choose = true;
              this.examForm.itemSize = index;
              continue;
            }

            if (suggests[i].problemTypeName == "编程题") {
              suggests[i].index = index;
              await this.$api.exam.examContent.findStudentContent({ itemId: suggests[i].id }).then((res) => {
                suggests[i].contentList = res.data;
                  for (let m = 0; m < suggests[i].contentList.length; m++) {
                    indexNum = indexNum +1;
                    suggests[i].contentList[m].indexNum = indexNum;
                    // console.log("编程"+indexNum);
                  }
                  this.itemList.program = JSON.parse(JSON.stringify(suggests[i]));
                  // console.log(this.itemList.program);
              });
              this.itemTab.program = true;
              this.examForm.itemSize = index;
              continue;
            }
          }
        }
      }).catch((err) =>{})
    },

    doneSummary() {
      console.log(this.itemList.choose.contentList);
      let examId = this.examForm.id;
      // 构造traceList
      let traceList = [];
      // 处理选择题
      if (this.itemTab.choose == true && this.itemList.choose.contentList != null && this.itemList.choose.contentList != undefined) {
        for (let i = 0; i < this.itemList.choose.contentList.length; i++) {
          traceList.push({
            contentId: this.itemList.choose.contentList[i].id,
            answer: this.itemList.choose.contentList[i].answer,
          })
        }
      }
      // 处理编程题
      if (this.itemTab.program == true && this.itemList.program.contentList != null && this.itemList.program.contentList != undefined) {
        for (let i = 0; i < this.itemList.program.contentList.length; i++) {
          traceList.push({
            problemId: this.itemList.program.contentList[i].problemId,
            contentId: this.itemList.program.contentList[i].id,
            answer: this.itemList.program.contentList[i].answer,
            languageName: this.itemList.program.contentList[i].languageName,
          })
        }
      }
      console.log(traceList);
      this.$confirm("提交后不可修改, 确认提交吗？", "提示", {}).then(() => {
        this.$api.exam.examTrace.edit(traceList).then((res) =>{
          // console.log(res);
          if (res.code == 200) {
            this.$message({ message: "提交成功", type: "success" });
            // 处理examSummary
            let data = {
              examId: examId,
              remainingTime: this.summary.remainingTime,
            }
            this.$api.exam.examSummary.doneSummary(data).then((res) =>{
              // console.log(res);
              this.closeExamForm();
            })
          }
          
        }).catch((err) => { });
      })

    },

    handleTimeout() {
      this.$alert("考试结束, 点击确定提交答案", "提示", {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.handleTimeoutSummary();
      }).catch(() =>{
        this.handleTimeoutSummary();
      })
    },
    async handleTimeoutSummary() {
      console.log(this.itemList.choose.contentList);
      let examId = this.examForm.id;
      // 构造traceList
      let traceList = [];
      // 处理选择题
      if (this.itemTab.choose == true && this.itemList.choose.contentList != null && this.itemList.choose.contentList != undefined) {
        for (let i = 0; i < this.itemList.choose.contentList.length; i++) {
          traceList.push({
            contentId: this.itemList.choose.contentList[i].id,
            answer: this.itemList.choose.contentList[i].answer,
          })
        }
      }
      // 处理编程题
      if (this.itemTab.program == true && this.itemList.program.contentList != null && this.itemList.program.contentList != undefined) {
        for (let i = 0; i < this.itemList.program.contentList.length; i++) {
          traceList.push({
            problemId: this.itemList.program.contentList[i].problemId,
            contentId: this.itemList.program.contentList[i].id,
            answer: this.itemList.program.contentList[i].answer,
            languageName: this.itemList.program.contentList[i].languageName,
          })
        }
      }
      console.log(traceList);
      this.$api.exam.examTrace.edit(traceList).then((res) =>{
        // console.log(res);
        if (res.code == 200) {
          let data = {
            examId: examId,
            remainingTime: this.summary.remainingTime,
          }
          this.$api.exam.examSummary.doneSummary(data).then((res) =>{
            // console.log(res);
            this.closeExamForm();
          })
        }
      }).catch((err) =>{})
    },



  },
};
</script>
<style>
.outside {
  text-align: center;
}
.card {
  width: 100%;
  border: 1px solid #e4e7ed;
}
.card .el-card__header {
  height: 8vh;
}
.card .el-card__body {
  height: 63vh;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y: auto;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: none;
}
.examInfo {
  font-size: 18px;
  color: rgb(15, 16, 16);
  margin-top: 100px;
  width: 300px;
}
.el-divider--horizontal {
  width: 50%;
}

.row {
  height: 25px;
}

.code {
  text-align: left;
  width: 85%;
  height: 61vh;
  /* border: 1px solid #e4e7ed; */
  overflow: hidden;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

</style>