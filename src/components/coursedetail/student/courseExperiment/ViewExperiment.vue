<template lang="stuve">
  <div>
    <br>
    <el-page-header @back="goBack" content="实验内容"></el-page-header>
    <div align="left">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :key="index" :name="index" v-for="(item,index) in problemList" class="problem">
          <template slot="title">
            <span style="font-weight: bolder;padding-inline-start: 2em;">{{index+1}}、</span>
            <span class="title">{{item.problemName}}</span>
            <span class="description" style="
              width:600px;
              overflow:hidden;
              color: grey;
              text-overflow:ellipsis;
              white-space:nowrap;
              word-break:keep-all;
              display:block;">
              {{item.problemDescription}}</span>
          </template>
          <div style="margin: 0 12px;">
            <span class="description"><span style="font-weight: bold;">描述:
              </span>{{item.problemDescription}}</span><br>
            <span class="description"><span style="font-weight: bold;">输入格式:
              </span>{{item.problemInputFormat}}</span><br>
            <span class="description"><span style="font-weight: bold;">输出格式:
              </span>{{item.problemOutputFormat}}</span><br>
            <span class="description" style="font-weight: bold;">样例输入:</span><br>
            <el-input type="textarea" v-model="item.problemSampleInput" :disabled="true" resize="none" autosize>
            </el-input><br>
            <span class="description" style="font-weight: bold;">样例输出:</span><br>
            <el-input type="textarea" v-model="item.problemSampleOutput" :disabled="true" resize="none" autosize>
            </el-input><br>
            <span class="description" style="font-weight: bold;">提示: </span><br>
            <el-input type="textarea" v-model="item.problemHint" :disabled="true" resize="none" autosize>
            </el-input><br><br>
            <code-edit ref="codeEditRef" :problemId="item.problemId" :submitInfo="submitInfo" :isabled="isabled"
              :pointsPerP="pointsPerP">
            </code-edit>
          </div>
        </el-collapse-item>
      </el-collapse>
      <br>
      <div align="center" style="width: 70%;margin: auto;">
        <el-button-group>
          <el-button type="success" round @click="submitExperiment()" v-show="isabled">全部提交</el-button>
          <el-button type="primary" round @click="saveAllExperiment()" v-show="isabled">全部保存</el-button>
        </el-button-group>
      </div>
      <br>
    </div>
  </div>
</template>
<script>
  import CodeEdit from './CodeEdit.vue';
  export default {
    components: { CodeEdit },
    data() {
      return {
        id: undefined, //试题id
        isabled: "",
        activeName: '0',
        problemList: [],
        submitInfo: {
          experimentId: this.$route.query.id,
          stuNo: this.$route.query.stuNo,
          problemId: '',
          stuAnswer: ''
        },
        pointsPerP: this.$route.query.pointsPerP
      }
    },
    mounted() {
      this.getExperimentInfo();
      this.checkIsabled();
    },
    methods: {
      // handleChange(val) {
      //   console.log(val);
      //   this.activeName = val;
      // },
      goBack() {
        this.$router.push({
          path: "/studycourse/courseExperiment",
        })
      },
      checkIsabled() {
        if (this.$route.query.isabled == "false")
          this.isabled = false;
        else this.isabled = true;
      },
      getExperimentInfo() {
        console.log(888);
        this.$api.experiment.experimentStu.getExperimentInfo({ id: this.$route.query.id }).then((res) => {
          this.problemList = res.data.experimentProblemStuList;
          console.log(this.problemList);
        })
      },
      submitExperiment() {
        for (let i = 0; i < this.$refs.codeEditRef.length; i++)
          this.$refs.codeEditRef[i].submitAll();
        this.$message.success("提交成功");
        let summaryInfo = {
          experimentId: this.$route.query.id,
          stuNo: this.$route.query.stuNo,
          score: ""
        }
        this.$api.experiment.experimentStu.insertIntoExperimentSummary(summaryInfo).then(res => {
          console.log(res);
        })
        this.$api.experiment.experimentStu.updateExperimentComplete({
          stuNo: this.$route.query.stuNo,
          experimentId: this.$route.query.id,
          isComplete: 1
        }).then(res => {
          console.log(res);
          this.$router.push({
            path: "/studycourse/courseExperiment",
          })
        });
        // for (let i = 0; i < this.problemList.length; i++) {
        //   this.$api.experiment.experimentStu.updateIsComplete({
        //     stuNo: this.$route.query.stuNo,
        //     experimentId: this.$route.query.id,
        //     problemId: this.problemList[i].problemId
        //   }
        //   ).then(res => {
        //     this.$router.push({
        //       path: "/studycourse/courseExperiment",
        //     })
        //   })
        // }
      },
      saveAllExperiment() {
        for (let i = 0; i < this.$refs.codeEditRef.length; i++)
          this.$refs.codeEditRef[i].saveAll();
        this.$message.success("保存成功");
      },
    },
  }
</script>
<style scoped>
  .problem {
    width: 70%;
    border: 3px solid#987cb9;
    margin: 10px auto;
  }

  .title {
    font-weight: 1000;
    color: #003399;
    /* font-family: '宋体'; */
    font-size: 16px;
  }

  .description {
    font-weight: 300;
    font-family: '宋体';
    font-size: 14px;
    /* text-indent: 2em; */
    padding-inline-start: 2em;
  }

  .el-textarea {
    padding-inline-start: 2em;
    width: 70%;
  }

  .el-textarea.is-disabled>>>.el-textarea__inner {
    color: #000;
  }
</style>