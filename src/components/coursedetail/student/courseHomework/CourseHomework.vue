<template>
  <div id="CourseHomework">
    <el-collapse v-model="activeNames" @change="handleChange">

       <el-table :data="sectionInfoList" style="width: 100%" :header-cell-style="{textAlign:'center'}"
      :cell-style="{ textAlign: 'center' }">
      <el-table-column type="index" min-width="5%" label="序号" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="cinstanceSectionHomework.title" label="作业名称" min-width="15%" >
      </el-table-column>
      <el-table-column prop="title" label="作业所属章节" min-width="10%" >
      </el-table-column>
      <el-table-column prop="cinstanceSectionHomework.number" label="题目数量" min-width="10%" >
      </el-table-column>
      <el-table-column prop="cinstanceSectionHomework.pointsPerP" label="每题分数" min-width="10%" >
      </el-table-column>
      <el-table-column  prop="cinstanceSectionHomework.endTime" label="截止时间" min-width="20%" >
        <template slot-scope="scope">
          {{dateToMinutes(new Date(scope.row.cinstanceSectionHomework.endTime))}}
          </template>
      </el-table-column>
      <el-table-column prop="totalScore" label="测验得分" min-width="10%" >
        <template slot-scope="scope"  >
          <span v-if="scope.row.totalScore != -1">{{scope.row.totalScore}}</span>
          <span v-else-if="scope.row.totalScore == -1 && scope.row.cinstanceSectionHomework.endTime < NowDate.getTime()">测验时间已过</span>
          <span v-else>未完成</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="20%" >
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary"  
            @click="Dohomework(scope.row.sectionId,scope.row.cinstanceSectionHomework.id)"
            :disabled="scope.row.cinstanceSectionHomework.endTime < NowDate.getTime() || scope.row.totalScore != -1"
            >测试</el-button>
            <!-- <el-button  type="success" >查看</el-button> -->
          </el-button-group>
        </template>
      </el-table-column>
      </el-table>
      <!-- <div
        class="homework_content"
        v-for="(item, index) in sectionInfoList"
        :key="index"
      > -->
      <!-- <span>第{{index+1}}次作业</span>
        <div v-if="item.cinstanceSectionHomework != null">
          <div class="sectionName">
            <span>{{ item.title }}</span>&nbsp;
            <span class="homeworkendtime" v-if="item.cinstanceSectionHomework.endTime > NowDate.getTime()"
              >截至时间：
              {{
                dateToMinutes(new Date(item.cinstanceSectionHomework.endTime))
              }}</span
            >
            <span class="homeworkendtime" v-else>测试时间已过</span>
            <el-button
              type="success"
              class="enterhomework"
              @click="Dohomework(item.sectionId,item.cinstanceSectionHomework.id)"
              :disabled="item.cinstanceSectionHomework.endTime < NowDate.getTime() || item.totalScore != -1"
              >进入测试</el-button
            > -->
             <!-- <span class="endscore homeworkendtime" v-show="item.totalScore != -1">测验得分:{{item.totalScore}}分</span>
          </div> -->
          <!-- <el-collapse-item :title="item.cinstanceSectionHomework.title">
            <div class="info_show">
              <div class="info_item">
                <div class="f-f1">截至时间</div>
                <div class="f-f1 right">
                  <div class="j-submitTime">
                    {{
                      dateToMinutes(
                        new Date(item.cinstanceSectionHomework.endTime)
                      )
                    }}
                  </div>
                  <div class="gray">
                    请务必在截止时间之前提交，截止时间后的提交不再计分
                  </div>
                </div> -->
              <!-- </div>
              <div class="info_item">
                <div class="f-f1">有效分数</div>
                <div class="f-f1 right">
                  <div class="j-validScore">
                    {{item.totalScore}}/{{
                      item.cinstanceSectionHomework.number *
                      item.cinstanceSectionHomework.pointsPerP
                    }}.00
                  </div>
                  <div class="gray">
                    你的测验系统都会为你计分,希望你以自己最好的状态取得好成绩
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </div>
      </div> -->
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "CourseHomework",
  data() {
    return {
      activeNames: "1",
      Nowtime:undefined, // 当前时间
      // sectionInfoList: {
      //   type: Object,
      //   default() {
      //     return {};
      //   },
      // },
      sectionInfoList:null,
    };
  },
  mounted() {
    // console.log(this.$store.state.course.courseCinstanceId);
    this.$api.student.gethomework.getSectionHomework({
        courseId: this.$store.state.course.courseCinstanceId,
      })
      .then((res) => {
        this.sectionInfoList = res.data;
        // console.log(this.sectionInfoList);
      });
      this.setTime();
  },
  methods: {
    setTime(){
      var NowDate = new Date();
      this.NowDate = NowDate;
      // console.log(this.NowDate.getTime());
    },
    indexMethod: function (index) {
      return index + 1;
    },
    handleChange() {},
    Dohomework(sectionId,homeworkId) {
      // console.log(homeworkId);
      // 进入准备作业页面
      this.$router.push({
        path: '/studycourse/homeworkdetail',
        query: {
          sectionId:sectionId,
          homeworkId:homeworkId
        }
      });
    },
  },
};
</script>

<style>
.enterhomework,.endscore {
  float: right;
}
.endscore{
  margin-right: 15px;
  margin-top: 3px;
}
#CourseHomework {
  margin-left: 30px;
  width: 100%;
  text-align: left;
}

.homework_content {
  margin-top: 20px;
}

.homework-title {
  margin: 30px auto;
  font-size: 18px;
}
.sectionName {
  margin-bottom: 15px;
  margin-top: 50px;
  font-size: 16px;
}
.el-collapse-item__header {
  font-size: 16px;
}
.enterhomework {
  float: right;
}
.el-collapse-item__header {
  width: 97%;
  margin-left: 40px;
}

.el-collapse {
  border-bottom: 0px;
}

.homeworkendtime {
  font-size: 14px;
  margin-left: 10px;
}

.info_show{
  margin-left: 60px;
  margin-top: 15px;
}

.info_item{
  width: 100%;
  height: 80px;
  
}

.info_item .f-f1{
  float: left;
}

.gray{
  color: gray;
}

.right{
  margin-left: 30px;
}
</style>