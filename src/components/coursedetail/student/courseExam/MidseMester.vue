<template lang="">
  <div id="UnitExam">
    <div class="exam-title">
      <span>期中考试</span>
    </div>
    <div class="exam">
      <el-collapse v-model="activeNames" @change="handleChange">
        <div class="exam-content" v-for="(item, index) in examInfoList" :key="index">
          <div v-if="item.fraction != 0">
            <div class="unitName">
              <span class="unitChapter">期中考试</span>&nbsp;
              <span class="unitEndTime">截止时间:{{dateFormate(new Date(item.endTime))}}</span>
              <el-button type="success" class="enterExam" :disabled="score[index] != null" @click="DoMidseMesterExam(item.id,item.examName)">进入考试</el-button>
              <span class="score" v-show="score[index] != null">考试成绩:{{score[index]}}</span>
            </div>
          
            <el-collapse-item :title="courseName">
              <div class="info_show">
                <div class="info_item">
                  <div class="f-f1">截至时间:</div>
                  <div class="f-f1 right">
                    <div class="j-submitTime">
                      {{
                        dateToMinutes(
                          new Date(item.endTime)
                        )
                      }}
                    </div>
                    <div class="gray">
                      请务必在截止时间之前提交，截止时间后的提交不再计分
                    </div>
                  </div>
                </div>

                <div class="info_item">
                  <div class="f-f1">考试范围:</div>
                  <div class="f-f1 right">
                    <div class="j-submitTime">
                      {{item.startRange}}—{{item.endRange}}
                    </div>
                    <div class="gray">
                      请务必在在指定的时间内认真答题
                    </div>
                  </div>
                </div>

                <div class="info_item">
                  <div class="f-f1">有效分数</div>
                  <div class="f-f1 right">
                    <div class="j-validScore">
                      <!-- 0.00 -->
                      0.00/{{
                        item.fraction
                      }}.00
                    </div>
                    <div class="gray">
                      你的考试系统都会为你计分,希望你以自己最好的状态取得好成绩
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </div>
        </div>
      </el-collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: "UnitExam",
  data() {
    return {
      activeNames: "1",
      examInfoList: [],
      courseName: "",
      scoreInfo: [],
      score: [],
      examId: [],
    };
  },
  mounted() {
    //获取课程信息
    this.getPubExamInfo();
    //获取课程名称
    this.getCourseName();
  },
  methods: {
    handleChange() {},
    getPubExamInfo() {
      this.$api.exam.midsemester
        .getPubExamInfo({
          insId: this.$store.state.course.courseCinstanceId,
          examType: 1,
        })
        .then((res) => {
          this.examInfoList = res.data;
          console.log(res.data);
          console.log(this.examInfoList);
          for (let i = 0; i < this.examInfoList.length; i++) {
            this.examId[i] = this.examInfoList[i].id;
            console.log(this.examId);
          }
          this.getExamScore();
        })
        .catch((err) => {
          console.log("数据获取失败");
        });
    },
    //获取课程名称
    getCourseName() {
      this.$api.exam.midsemester
        .getCourseName({ insId: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseName = res.data;
          // console.log(this.courseName);
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    getExamScore() {
      let newExamId = "";
      for (let i = 0; i < this.examId.length; i++) {
        newExamId = newExamId + this.examId[i] + ",";
      }
      newExamId = newExamId.substring(0, newExamId.lastIndexOf(","));
      this.$api.exam.examtrace
        .getScore({
          examId: newExamId,
          stuNo: this.$store.state.user.userInfo.userNo,
        })
        .then((res) => {
          this.scoreInfo = res.data;
          console.log(res.data);
          for (let i = 0; i < this.examInfoList.length; i++) {
            this.score[i] = this.scoreInfo[i].score;
          }
          console.log(this.score);
        })
        .catch((err) => {
          console.log("查询失败");
        });
    },
    DoMidseMesterExam(id, examName) {
      this.$router.push({
        path: "/studycourse/beginUnitExam",
        query: {
          id: id,
          name: examName,
        },
      });
    },
  },
};
</script>
<style>
#UnitExam {
  margin: 0 auto;
  width: 90%;
  text-align: left;
}
.exam {
  margin-top: 30px;
}
.exam-content {
  margin-top: 60px;
}
.exam-title {
  text-align: center;
  font-size: 30px;
}
.unitName .unitChapter {
  font-size: 25px;
}
.unitName .unitEndTime {
  font-size: 15px;
  color: #999;
  margin-left: 20px;
}
.unitName .enterExam {
  float: right;
}
.el-collapse-item__header {
  font-size: 16px;
  margin-left: 50px;
}
.el-collapse-item__header:hover {
  color: #00c758;
}
.info_show {
  margin-left: 60px;
  margin-top: 15px;
}

.info_item {
  width: 100%;
  height: 80px;
}

.info_item .f-f1 {
  float: left;
}

.gray {
  color: gray;
}

.right {
  margin-left: 30px;
}
</style>