<template>
  <div align="center">
    <div class="header">
      <span><i class="el-icon-s-tools" style="margin-left: 25px;"></i>语言</span>
      <el-select v-model="mode" placeholder="请选择语言" style="margin-left: 8px" size="small">
        <el-option v-for="item in languages" :key="item.label" :label="item.label" :value="item.mode">
        </el-option>
      </el-select>
      <span><i class="el-icon-view" style="margin-left: 30px"></i>主题</span>
      <el-select v-model="options.theme" placeholder="请选择主题" style="margin-left: 8px" size="small">
        <el-option v-for="item in themes" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button style="margin-left: 25px;" type="primary" size="small" v-show="isabled" @click="save">保存</el-button>
      <el-button style="margin-left: 25px;" type="success" size="small" @click="submit" v-show="isabled">提交</el-button>
    </div>
    <div class="edit">
      <codemirror ref="codem" align="left" v-model="code" :options="options"></codemirror>
    </div><br>
    <el-input type="textarea" v-model="result" :disabled="true" resize="none" autosize>
    </el-input><br>
  </div>
</template>

<script>
  // 引入codemirror编辑器组件
  import { codemirror } from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css' // 核心样式
  import '../../../../assets/js/setting.js'
  export default {
    name: 'CodeEdit',
    components: { codemirror },
    // 父组件将试题id传入该子组件
    props: {
      problemId: {
        type: undefined
      },
      submitInfo: {
        type: Object
      },
      isabled: {
        type: Boolean,
        default: false
      },
      pointsPerP: {
        type: undefined
      }
    },
    data() {
      return {
        min: 0,
        max: 6,
        result: "",
        code: "",
        options: {
          // mode:'text/x-csrc',
          tabSize: 2, // 缩进格式
          theme: 'darcula', // 主题，对应主题库 JS 需要提前引入
          lineNumbers: true, // 显示行号
          matchBrackets: true, //括号匹配
          line: true,
          styleActiveLine: true, // 高亮选中行
          foldGutter: true, //块槽
          hintOptions: {
            completeSingle: true // 当匹配只有一项的时候是否自动补全
          }
        },
        // 语言
        languages: [
          {
            mode: "text/x-csrc",
            label: "C",
          },
          {
            mode: "text/x-c++src",
            label: "C++",
          },
          {
            mode: "text/x-java",
            label: "Java",
          },
          {
            mode: "text/x-python",
            label: "Python",
          }
        ],
        mode: undefined,  //选中的语言
        //主题
        themes: ['rubyblue', '3024-day', '3024-night', 'solarized', 'zenburn', 'icecoder', 'darcula'],
        submissionId: undefined,
        timer: undefined
      };
    },
    mounted() {
      this.getExperimentTrace();
    },
    methods: {
      save() {
        // 未选择语言则提醒
        if (this.mode === undefined) {
          this.$notify.error({
            title: '错误',
            message: '请选择语言类型！',
            offset: 100,
          });
          return
        }
        // 代码为空则提醒
        if (this.code === "") {
          this.$notify.error({
            title: '错误',
            message: '不能提交空代码',
            offset: 100,
          });
          return
        }
        // 否则收集提交数据
        let submission = {
          experimentId: this.submitInfo.experimentId,
          problemId: this.problemId,
          stuNo: this.submitInfo.stuNo,
          languageName: this.mode,
          stuAnswer: this.code
        }
        this.$api.experiment.experimentStu.insertIntoExperimentTrace(submission).then(res => {
          console.log(res);
          if (res.code == 200)
            this.$message.success("保存成功");
          else this.$message.error("保存失败");
        })
      },
      saveAll() {
        let submission = {
          experimentId: this.submitInfo.experimentId,
          problemId: this.problemId,
          stuNo: this.submitInfo.stuNo,
          languageName: this.mode,
          stuAnswer: this.code
        }
        this.$api.experiment.experimentStu.insertIntoExperimentTrace(submission).then(res => {
          console.log(res);
        })
      },
      submit() {
        if (this.mode === undefined) {
          this.$notify.error({
            title: '错误',
            message: '请选择语言类型！',
            offset: 100,
          });
          return
        }
        // 代码为空则提醒
        if (this.code === "") {
          this.$notify.error({
            title: '错误',
            message: '不能提交空代码',
            offset: 100,
          });
          return
        }
        clearInterval(this.timer);
        this.min = 0;
        // 否则收集提交数据
        let submission = {
          experimentId: this.submitInfo.experimentId,
          problemId: this.problemId,
          stuNo: this.submitInfo.stuNo,
          languageName: this.mode,
          stuAnswer: this.code
        }
        this.$api.experiment.experimentStu.insertIntoExperimentTrace(submission).then(res => {
          if (res.code == 200) {
            let submission = {
              problemId: this.problemId,
              languageSlug: this.mode,
              code: this.code
            }
            this.$api.judger.judger.createSubmission(submission).then(res => {
              if (res.code == 200) {
                this.$message.success("提交成功");
                this.timer = setInterval(() => {
                  this.getJudgeResult();
                  this.min++;
                  if (this.min == this.max) {
                    clearInterval(this.timer)
                    this.result = "服务器超时，请稍后······"
                  }
                }, 3000);
              }
              else this.$message.error("提交失败");
            })
          }
          else this.$message.error("提交失败");
        })
      },
      submitAll() {
        clearInterval(this.timer);
        this.min = 0;
        let submission = {
          experimentId: this.submitInfo.experimentId,
          problemId: this.problemId,
          stuNo: this.submitInfo.stuNo,
          languageName: this.mode,
          stuAnswer: this.code
        }
        this.$api.experiment.experimentStu.insertIntoExperimentTrace(submission).then(res => {
          if (res.code == 200) {
            let submission = {
              problemId: this.problemId,
              languageSlug: this.mode,
              code: this.code
            }
            this.$api.judger.judger.createSubmission(submission).then(res => {
              if (res.code == 200) {
                this.timer = setInterval(() => {
                  this.getJudgeResult();
                  this.min++;
                  if (this.min == this.max) {
                    clearInterval(this.timer)
                    this.result = "服务器超时，请稍后······"
                  }
                }, 3000);
              }
            })
          }
        })
      },
      getJudgeResult() {
        let postInfo = {
          problemId: this.problemId,
          uid: this.$store.state.user.userInfo.id,
        };
        let scoreInfo = {
          experimentId: this.submitInfo.experimentId,
          problemId: this.problemId,
          stuNo: this.submitInfo.stuNo,
          score: this.pointsPerP
        };
        this.$api.judger.judger.getJudgeResult(postInfo).then(res => {
          console.log(res);
          // console.log(res.data.judgeResult);
          // this.result = JSON.stringify(res.data);
          this.result = "评测结果：" + res.data.resultname
          if (res.data.judgeResult != "PD")
            clearInterval(this.timer)
          if (res.data.judgeResult == "AC") {
            this.$api.experiment.experimentStu.updateScore(scoreInfo).then(res => {
              console.log(res);
            })
          }
          else if (res.data.judgeResult == "WA" || res.data.judgeResult == "CE") {
            scoreInfo.score = 0;
            this.$api.experiment.experimentStu.updateScore(scoreInfo).then(res => {
              console.log(res);
            })
          }
          this.$api.experiment.experimentStu.insertIntoExperimentSummary(scoreInfo);
        })
      },
      getExperimentTrace() {
        this.$api.experiment.experimentStu.getExperimentTrace({
          experimentId: this.submitInfo.experimentId,
          problemId: this.problemId,
          stuNo: this.submitInfo.stuNo
        }).then(res => {
          if (res.data != null) {
            this.code = res.data.stuAnswer;
            this.mode = res.data.languageName;
          }
        })
      },
    },
    Destroyed() {
      clearInterval(this.timer)
    }
  };
</script>

<style scoped>
  .header {
    text-align: left;
  }

  .edit {
    font-size: 18px;
    line-height: 120%;
    text-align: left;
    margin-top: 6px;
    overflow-y: hidden !important;
  }

  .el-textarea.is-disabled>>>.el-textarea__inner {
    color: #000;
  }
</style>