<template lang="">
  <div id="StudentTest">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-table :data="sectionInfoList" style="width: 100%" :header-cell-style="{textAlign:'center'}"
      :cell-style="{ textAlign: 'center' }">
      <el-table-column type="index" min-width="5%" label="序号" align="center" :index="indexMethod">
      </el-table-column>
      <el-table-column prop="testTitle" label="测验名称" min-width="20%" >
      </el-table-column>
      <el-table-column prop="title" label="测验所属章节" min-width="20%" >
      </el-table-column>
      <el-table-column  prop="endTime" label="截止时间" min-width="20%" >
        <template slot-scope="scope">
          {{dateToMinutes(new Date(scope.row.endTime))}}
          </template>
      </el-table-column>
      <el-table-column prop="score" label="测验得分" min-width="15%" >
        <template slot-scope="scope"  >
          <span v-if="scope.row.score != -1">{{scope.row.score}}</span>
          <span v-else-if="scope.row.score == -1 && scope.row.endTime < NowDate.getTime()">测验时间已过</span>
          <span v-else>未完成</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="20%" >
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary"  
            @click="$refs.beginTest.changeDialogVisible(scope.row.sectionId,scope.row.title)"
            :disabled="scope.row.endTime < NowDate.getTime() || scope.row.score != -1">测试</el-button>
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

        <!-- <div v-if="item.totalValues != null">
          <div class="sectionName">
            <span>测试{{index+1}}</span>
            <span>{{ item.title }}</span>&nbsp;
            <span class="homeworkendtime" v-if="item.endTime > NowDate.getTime()" 
              >截至时间：
              {{
                dateToMinutes(new Date(item.endTime))
              }}</span>
            <span class="homeworkendtime" v-else>测试时间已过</span> -->

           <!-- 新增查看功能-->

            <!-- <el-button-group style="float:right">
            <el-button
              type="primary"
              round = "ture"
              class="enterhomework"
              @click="Dohomework(item.sectionId,item.title)"
              
              >查看</el-button
            > -->
            <!-- <el-button
              type="success"
              round = "ture"
              class="enterhomework"
              @click="Dohomework(item.sectionId,item.title)"
              :disabled="item.endTime < NowDate.getTime() || item.score != -1"
              >测试</el-button
            > -->
            <!-- </el-button-group>
             <span class="endscore homeworkendtime" v-show="item.score != -1">测验得分:{{item.score}}分</span>
          </div>  -->
          <!-- <el-collapse-item :title="item.testTitle">
            <div class="info_show">
              <div class="info_item">
                <div class="f-f1">截至时间</div>
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
                <div class="f-f1">有效分数</div>
                <div class="f-f1 right">
                  <div class="j-validScore">
                    <!-- {{item.score}}/{{
                      item.totalValues
                    }}.00 -->
                    <!-- {{item.score}}/{{item.totalValues}}
                  </div>
                  <div class="gray">
                    你的测验系统都会为你计分,希望你以自己最好的状态取得好成绩
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item> --> 
        <!-- </div>
      </div> -->
     
    </el-collapse>
    <begin-test ref="beginTest" changeDialogVisible="changeDialogVisible"/>
  </div>
</template>
<script>
import beginTest from './BeginTest.vue'
export default {
  name: "CourseStudentTest",
  components: {
     beginTest
    },
  data() {
    return {
      activeNames: "1",
      sectionStr:"",
      sectionInfoList: {},
      Nowtime:undefined, // 当前时间
    };
  },
  mounted() {
   this.sectionInfo();
  //  this.getSectionTestScore();
  this.setTime();
  },
  methods: {
    setTime(){
      var NowDate = new Date();
      this.NowDate = NowDate;
      // console.log(dateToMinutes(new Date(item.endTime)));
      console.log(this.NowDate.getTime());
    },
     sectionInfo(){
      this.$api.student.getTest.gettestinfo({
        courseId: this.$store.state.course.courseCinstanceId,
      })
      .then((res) => {
        this.sectionInfoList = res.data;
        console.log(this.sectionInfoList);
        // this.sectionInfoList = this.sectionInfoList.length;
        for(let i=0;i<this.sectionInfoList.length;i++){
          this.sectionStr = this.sectionStr + this.sectionInfoList[i].sectionId + ",";
        }
        this.$api.student.getTest.getSectionTestScore({
          sectionStr:this.sectionStr,
          stuNo:parseInt(this.$store.state.user.userInfo.userNo)
          })
        .then((res) => {
          let i = 0;
          for(let item in this.sectionInfoList){
            this.sectionInfoList[item].score = res.data[item];
          }
        })
      });
    },
     getSectionTestScore(){
       console.log(this.sectionInfoList);
      for(let i=0;i<this.sectionInfoList;i++){
          this.sectionStr = this.sectionStr + this.sectionInfoList[i].sectionId + ",";
        }
        console.log(this.sectionStr);
        this.$api.student.getTest.getSectionTestScore({
          sectionStr:this.sectionStr,
          stuNo:parseInt(this.$store.state.user.userInfo.userNo)
          })
        .then((res) => {
          console.log(res.data);
        })
    },
    // 表格序号
    indexMethod: function (index) {
      return index + 1;
    },
    handleChange() {},
     // 返回
    goBack() {
      this.$router.back();
    },
    Dohomework(sectionId,TestTitle) {
      this.$router.push({
        path: "/studycourse/begintest",
        query: { sectionId: sectionId,
                 TestTitle:TestTitle
         },
      });
    },
  },
};
</script>
<style>

#StudentTest {
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
.enterhomework,.endscore {
  float: right;
}
.endscore{
  margin-right: 15px;
  margin-top: 3px;
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