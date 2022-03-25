<template>
  <div>
    <br>
    <div align="center">
      <h2 style="color: black;">实验报告</h2>
      <!-- <router-link :to="{name:'GetPdf',query:{'id':this.$route.query.id}}" append>生成pdf</router-link>&nbsp;&nbsp;&nbsp; -->
      <el-button type="info" style="float: right;margin-right: 100px;" @click="getWord()">下载实验报告</el-button>
      <div class="report" style="width: 800px;">
        <div class="alltr">
          <div class="allth" style="line-height: 21px;">实验项目编号</div>
          <div style="width: 10%;" class="alltd">{{this.experiment.order}}</div>
          <div class="allth">实验名称</div>
          <div style="width: 50%;" class="alltd">{{this.experiment.name}}</div>
          <div class="allth">题目数量</div>
          <div class="alltd" style="width: 10%;border-right: none;">{{this.experiment.number}}</div>
        </div>
        <div class="alltr">
          <div class="allth">实验环境</div>
          <div class="alltd" style="width: 41%;">{{this.experiment.environment}}</div>
          <div class="allth">实验地点</div>
          <div class="alltd" style="width: 41%;border-right: none;">{{this.experiment.location}}</div>
        </div>
        <div class="alltr">
          <div class="allth">开始时间</div>
          <div class="alltd" style="width: 41%;">{{this.dateFormate(new Date(this.experiment.startTime))}}</div>
          <div class="allth">截止时间</div>
          <div class="alltd" style="width: 41%;border-right: none;">{{this.dateFormate(new
            Date(this.experiment.endTime))}}</div>
        </div>
        <div class="alltr">
          <div class="allth" style="line-height: 21px;">成绩公布时间</div>
          <div class="alltd" style="width: 41%;">{{this.dateFormate(new Date(this.experiment.pubTime))}}</div>
          <div class="allth">实验成绩</div>
          <div></div>
        </div>
        <div class="othertr">
          <div class="otherth">实验目的</div>
          <div class="othertd">{{this.experiment.object}}</div>
        </div>
        <div class="othertr">
          <div class="otherth">实验内容</div>
          <div class="othertd">
            <!-- <div v-for="option in this.experiment.experimentProblemList"> -->
              <div>
                <span style="font-weight: bold;">题目：</span>{{option.problemName}}<br>
                <span style="font-weight: bold;">内容：</span>{{option.problemDescription}}<br>
                <span style="font-weight: bold;">输入格式：</span>{{option.problemInputFormat}}<br>
                <span style="font-weight: bold;">输出格式：</span>{{option.problemOutputFormat}}<br>
                <span style="font-weight: bold;">样例输入：</span>{{option.problemSampleInput}}<br>
                <span style="font-weight: bold;">样例输出：</span>{{option.problemOutputFormat}}<br><br>
              </div>
            </div>
          </div>
        </div>
        <div class="othertr">
          <div class="otherth">实验过程与体会</div>
          <div class="othertd"></div>
        </div>
        <div class="othertr">
          <div class="otherth">总评</div>
          <div class="othertd"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        experiment: []
      }
    },
    mounted() {
      this.getExperimentInfo();
    },
    methods: {
      getExperimentInfo() {
        this.$api.experiment.experiment.getExperimentInfo({ id: this.$route.query.id }).then((res) => {
          this.experiment = res.data;
        })
      },
      getWord() {
        let url = "http://localhost:60101/course/experimentsetup/getWord?id=" + this.$route.query.id;
        window.location.href = url;
      }
    },
  }
</script>
<style scoped>
  .report {
    border: 2px solid;
  }

  .alltr {
    height: 42px;
    display: flex;
    border-bottom: 1px solid;
  }

  .othertr {
    display: flex;
    border-bottom: 1px solid;
  }

  .allth {
    width: 70px;
    height: 42px;
    line-height: 42px;
    border-right: 1px solid;
    font-weight: bold;
    color: #000;
  }

  .otherth {
    margin: auto 1px;
    width: 30px;
    font-weight: bold;
    color: #000;
  }

  .alltd {
    line-height: 42px;
    border-right: 1px solid;
    color: #000;
  }

  .othertd {
    border-left: 1px solid;
    width: 96%;
    padding: 10px;
    text-align: left;
    color: #000;
  }
</style>