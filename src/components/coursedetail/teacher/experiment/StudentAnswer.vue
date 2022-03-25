<template lang="">
  <div align="center">
    <br>
    <el-page-header @back="goBack" content="完成详情"></el-page-header>
    <h2 v-show="this.headTip">该学生暂未完成实验</h2>
    <div style="width: 900px; text-align: left;">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :key="index" :name="index" v-for="(item,index) in studentAnswerList">
          <template slot="title">
            <span style="font-weight: bolder;padding-inline-start: 2em; font-size: 16px;">{{index+1}} </span>
            <span class="title" :title="item.problemName">{{item.problemName}}</span>
            <span class="description" style="
            width:600px;
            overflow:hidden;
            color: grey;
            text-overflow:ellipsis;
            white-space:nowrap;
            word-break:keep-all;
            display:block;" :title="item.problemDescription">
              {{item.problemDescription}}</span>
            <span class="description" style="width: 180px;"><span style="font-weight: bold;">得分:</span><span
                style="color: red; font-weight: bold; font-size: 24px;">
                {{item.score}}</span></span><br>
          </template>
          <div style="margin: 0 12px;">
            <span class="description"><span style="font-weight: bold;">描述:
              </span>{{item.problemDescription}}</span><br>
            <span class="description"><span style="font-weight: bold;">语言:
              </span>{{item.languageName}}</span><br>
            <span class="description"><span style="font-weight: bold;">答案:
              </span>{{item.problemSampleInput}}</span><br>
            <el-input type="textarea" v-model="item.stuAnswer" autosize :disabled="true" resize="none">
            </el-input>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        stuNo: this.$route.query.stuNo,
        experimentId: this.$route.query.experimentId,
        studentAnswerList: [],
        activeName: '1',
        headTip: false
      }
    },
    mounted() {
      this.getStudentAnswer();
    },
    methods: {
      goBack() {
        this.$router.push({
          path: "/course/experimentCompletion",
        })
      },
      getStudentAnswer() {
        this.$api.experiment.experiment.getStudentAnswer({
          stuNo: this.stuNo,
          experimentId: this.experimentId
        }).then(res => {
          this.studentAnswerList = res.data;
          if (this.studentAnswerList.length == 0) this.headTip = true;
        })
      },
    },
  }
</script>
<style scoped>
  .title {
    font-weight: 1000;
    /* font-family: '宋体'; */
    font-size: 16px;
    width: 150px;
    padding-inline-start: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    display: block;
  }

  .description {
    font-weight: 300;
    font-family: '宋体';
    font-size: 14px;
    /* text-indent: 2em; */
    padding-inline-start: 2em;
  }

  .el-textarea.is-disabled>>>.el-textarea__inner {
    color: #000;
  }
</style>