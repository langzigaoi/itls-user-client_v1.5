<template>
  <div style="margin-left: 10px; text-align: left;">
    <br>
    <view-experiment-dialog ref="viewexperiment"></view-experiment-dialog>
    <el-table :data="experimentList" style="width: 100%" :header-cell-style="{textAlign:'center'}"
      :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="order" label="实验序号" width="100" sortable>
      </el-table-column>
      <el-table-column prop="name" label="实验名称" width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="object" label="实验目的" width="120" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="environment" label="实验环境" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="location" label="实验地点" width="80" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="startTime" label="实验开始时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{dateTimeFormate(new Date(scope.row.startTime))}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="实验截止时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{dateTimeFormate(new Date(scope.row.endTime))}}
        </template>
      </el-table-column>
      <el-table-column prop="isComplete" label="状态">
        <template slot-scope="scope">
          {{scope.row.isComplete | isCompleteFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分数"  width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button icon="el-icon-search" circle title="查看" @click="viewExperiment(scope.row.id)"></el-button>
            <el-button type="info" round title="已结束" v-if="!checkendTime(scope.row.endTime)"
              @click="toExperiment(scope.row)">已结束</el-button>
            <el-button type="primary" round title="进入实验" @click="toExperiment(scope.row)"
              v-if="!checkStartTime(scope.row.startTime)&&checkendTime(scope.row.endTime)">进入实验</el-button>
            <el-button type="warning" round title="未开始" v-if="checkStartTime(scope.row.startTime)"
              :disabled="checkStartTime(scope.row.startTime)">未开始</el-button>
          </el-button-group><br>
          <span style="color:#ababab; font-size: 12px; cursor: pointer;" v-show="checkScore(scope.row.score)"
            @click="downloadReport(scope.row.id)" ><u>下载实验报告</u></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import ViewExperimentDialog from './ViewExperimentDialog.vue'
  import { baseUrl } from '@/utils/global'
  export default {
    name: 'CourseExperiment',
    components: {
      ViewExperimentDialog
    },
    data() {
      return {
        stuNo: '',
        experimentTrace: {
          id: '',
          experimentId: '',
          problemId: [],
          stuNo: '',
          stuAnswe: '',
          score: '',
          isComplete: ''
        },
        experimentList: [],
      }
    },
    filters: {
      isCompleteFilter(isComplete) {
        if (isComplete == 1)
          return '已完成';
        else {
          return '未完成';
        }
      }
    },
    mounted() {
      var userInfo = localStorage.getItem('uInfo');
      if (userInfo) userInfo = JSON.parse(userInfo);
      this.stuNo = userInfo.principal.no;
      this.searchAll();
    },
    methods: {
      searchAll() {
        this.$api.experiment.experimentStu.searchAll({
          insId: this.$store.state.course.courseCinstanceId,
          stuNo: this.stuNo
        }).then((res) => {
          this.experimentList = res.data;
        })
      },
      checkendTime(endTime) {
        const nowTime = new Date().getTime();
        return endTime >= nowTime
      },
      checkStartTime(startTime) {
        const nowTime = new Date().getTime();
        return startTime >= nowTime;
      },
      checkPubTime(pubTime) {
        const nowTime = new Date().getTime();
        return pubTime >= nowTime;
      },
      checkScore(score) {
        if (score == null) {
          return false
        }
        return true
      },
      toExperiment(index) {
        this.$router.push({
          path: "/studycourse/viewExperiment",
          query: {
            id: index.id,
            stuNo: this.stuNo,
            isabled: this.checkendTime(index.endTime),
            pointsPerP: index.pointsPerP
          },
        })
      },
      viewExperiment(index) {
        // this.$router.push({
        //   path: "/course/viewExperiment",
        //   query: { id: index },
        // })
        this.$refs.viewexperiment.changevisible();
        this.$refs.viewexperiment.getExperimentInfo(index);
      },
      downloadReport(id) {
        let url = baseUrl + "/student/experiment/getPdf?id=" + id + "&stuNo=" + this.stuNo;
        window.location.href = url;
      }
    },
  }
</script>
<style lang="" scoped>

</style>