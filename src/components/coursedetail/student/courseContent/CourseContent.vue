<template>
  <div class="container">
    <p class="Content_title">课程内容</p>
    <el-collapse v-if="courseInstance.isPub == 1" accordion v-loading="loading">
   
      <el-collapse-item
        v-for="(week, index1) in weeks"
        :key="week.id"
        :name="index1"
      >
        <template slot="title">
          <span style="font-weight: 700; font-size: 1.2em; padding-right: 10px"
            >第{{ week.title }}周
          </span>
          {{ week.content }}
        </template>
        <div
          class="section"
          v-for="section in week.cinstanceSections"
          :key="section.id"
        >
          <el-card class="box-card" v-show="section.isPublic == 1">
            <div slot="header" class="clearfix">
              <div>
                <span style="font-weight: 700; font-size: 1em; padding-right: 10px">{{ section.title }}</span>
                {{ section.content }}
                <p style="float: right" v-if="section.isPublic === 0">
                  <el-button
                    type="warning"
                    @click="pub(section.id, section.cinstanceWeekId)"
                    icon="el-icon-check"
                    >发布</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-edit"
                    @click="altersection(section.id)"
                    >修改</el-button
                  >
                  <!-- <el-button type="warning" icon="el-icon-delete" circle></el-button> -->
                </p>
              </div>
            </div>
            <div class="boxbody">
              <div>
                <span class="section_content_title">教学内容:</span>
                <span
                  class="section_content_text"
                  
                  v-for="knowledge in section.knowledges"
                  :key="knowledge.id"
                >
                  {{ knowledge.name }}
                </span>
              </div>
              <div>
                <span class="section_content_title">教学重点:</span>
                <span
                  class="section_content_text"
                  v-for="knowledge in section.importantKnowledges"
                  :key="knowledge.id"
                >
                  {{ knowledge.name }}
                </span>
              </div>
              <div>
                <span class="section_content_title">教学难点:</span>
                <span
                  class="section_content_text"
                  v-for="knowledge in section.difficultKnowledges"
                  :key="knowledge.id"
                >
                  {{ knowledge.name }}
                </span>
              </div>
              <div>
                <span class="section_content_title">教学ppt:</span>
                <el-button
                  @click="ShowPPT(section.pptId)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >查看PPT</el-button>
              </div>
              <div>
                 <span class="section_content_title">教学视频:</span>
                 <el-button
                  @click="ShowVideo(section.videoId)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >查看视频</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!-- <el-button type="primary" @click="addsection(week.id)">添加一节</el-button> -->
      </el-collapse-item>
      <!-- <el-button type="success" @click="addweek">添加一周</el-button> -->
       <el-dialog
        title="课件"
        :visible.sync="PPTVisible"
        width="60%"
      >
      <el-table
      :data="currentPPTresource"
      height="500"
      border
      style="width: 100%"
    >
   
    <el-table-column
        class="problemItem"
        type="index"
        label="序号"
        min-width="15%"
        align="center"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        prop="fileName"
        label="PPT"
        min-width="25%"
        align="center"
        v-show="currentPPTresource.customFileName != null"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        label="操作"
        min-width="30%"
        align="center"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="previewPdf(scope.row.path)">浏览</el-button>
        <el-button type="success"  @click="download(scope.row.path)">下载</el-button>
      </template> 
      </el-table-column>
       <el-table-column
        class="problemItem"
        label="评价"
        min-width="30%"
        align="center"
      >
      <template slot-scope="scope">
      <el-rate v-model="scope.row.score" :disabled ="scope.row.score != -1"  @change="evaluate($event,scope.row.id)"> </el-rate>
      </template>
      </el-table-column>
    </el-table>
      </el-dialog>

       <el-dialog
        title="视频"
        :visible.sync="videoVisible"
        width="60%"
      >
      <el-table
      :data="currentVideoresource"
      height="500"
      border
      style="width: 100%"
    >
   
    <el-table-column
        class="problemItem"
        type="index"
        label="序号"
        min-width="15%"
        align="center"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        prop="fileName"
        label="视频"
        min-width="25%"
        align="center"
        v-show="currentVideoresource.customFileName != null"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        label="操作"
        min-width="30%"
        align="center"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="previewVideo(scope.row.path)">播放</el-button>
        <el-button type="success"  @click="download(scope.row.path)">下载</el-button>
      </template> 
      </el-table-column>
       <el-table-column
        class="problemItem"
        label="评价"
        min-width="30%"
        align="center"
      >
      <template slot-scope="scope">
      <el-rate v-model="scope.row.score" :disabled ="scope.row.score != -1"  @change="evaluate($event,scope.row.id)"> </el-rate>
      </template>
      </el-table-column>
    </el-table>
      </el-dialog>
      <video-preview
        ref="videoPreview"
        :videoPath="currentVideoPath"
      ></video-preview>
       <!-- <el-dialog
        title="视频学习"
        :visible.sync="videoVisible"
        width="60%"
        
      >
    <el-select v-model="currentVideoPath" placeholder="请选择" @change="videoChange()">
    <el-option
      v-for="(item,index) in currentVideoresource"
      :key="index"
      :label="item.customFileName"
      :value="item.path">
    </el-option>
  </el-select>
      <video-preview
        ref="videoPreview"
        :videoPath="currentVideoPath"
      ></video-preview>
      </el-dialog> -->
    </el-collapse>
    <div v-if="courseInstance.isPub == 0">正在审核中...</div>
    <div v-if="courseInstance.isPub == -1">审核未通过...</div>
  </div>
</template>
<script>
import videoPreview from "@/components/coursedetail/student/courseContent/VideoPreview";
import Axios from 'axios';
export default {
  components: {
    videoPreview,
  },
  data() {
    return {
      ratedialog:false,
      loading: true,
      value2:null,       //ppt评分值
      difficultytext:[2,4,6,8,10],
      strtest:'1,2,3',
      courseInstance: {}, //当前课程实例
      knowledgeId:[1,2,3],
      weeks: [], //
      weekId: null, //暂时保存要添加的节的父weekid
      sectionId: 5, //暂时保存要修改的section
      currentVideoPath: null, //暂时保存要播放的视频path
      addcoursedialogVisible: false, //点击测验按钮出现弹窗
      currentPPTresource:[],
      //保存当前正在预览的资源信息
      currentVideoresource:[],
      PPTVisible:false, // 控制ppt预览的弹框显示
      videoVisible:false,
      // questionList:{},//讨论帖子
    };
  },
  mounted() {
    this.findACourseInstance();
  },
  methods: {

    evaluate(value,resourceId){
      // console.log(value);
      // console.log(resourceId);
      console.log(this.$store.state.user.userInfo.userNo);
      this.$api.course.resource.assess({resource_id:resourceId,score:value,user_id:this.$store.state.user.userInfo.userNo}).then((res) => {
        
      })
    },

    // 添加测验
    toAddCourseTest(id) {
      console.log(id);
      this.$api.course.sectiontest
        .checkHasTest({ sectionId: id })
        .then((res) => {
          console.log("检查是否有测试的结果", res);
          if (res.data != 0) {
            //已经有测试就跳转到测试详情界面
            this.$router.push({
              path: "/course/alterCourseTest",
              query: { sectionId: id },
            });
          } else {
            this.$router.push({
              //没有测试就跳转到添加测试界面
              path: "/course/addCourseTest",
              query: { sectionId: id },
            });
          }
        });
    },
    // 
    videoChange(){
      console.log(this.currentvideopath);

    },
    previewVideo(path){
      this.currentVideoPath = path;
      console.log("视频预览" + this.currentVideoPath);
      this.$refs.videoPreview.changedialogVisible();
    },
    // 添加作业
    toAddCourseHomework(id) {
      console.log(id);
      this.$api.course.sectionhomework
        .checkHasHomework({ sectionId: id })
        .then((res) => {
          console.log("检查是否有作业", res);
          if (res.data != 0) {
            this.$router.push({
              path: "/course/alterCourseHomework",
              query: { sectionId: id },
            });
          } else {
            this.$router.push({
              path: "/course/AddCourseHomework",
              query: { sectionId: id },
            });
          }
        });
    },
     // 对PPT进行预览
    ShowPPT(str){
      // {resourceIdList:this.knowledgeId}
      console.log(this.$store.state.user.userInfo.userNo);
      // console.log(str);
      this.$api.course.resource.searchPPT({rec:str,stuNo:this.$store.state.user.userInfo.userNo}).then((res) => {
      this.currentPPTresource = res.data
      console.log(this.currentPPTresource);
      })
      this.PPTVisible = true 
      },
    // 对video进行预览
    ShowVideo(str){
      // this.currentVideoresource = video;
      // this.currentVideoPath = this.currentVideoresource[0].path;
      // this.videoVisible = true;
      console.log(this.$store.state.user.userInfo.userNo);
      // console.log(str);
      this.$api.course.resource.searchVideo({rec:str,stuNo:this.$store.state.user.userInfo.userNo}).then((res) => {
      this.currentVideoresource = res.data
      console.log(this.currentVideoresource);
      })
      this.videoVisible = true 
    },
    getAllweeks() {
      this.loading = true;
      this.$api.course.week
        .selectAll({ cinstanceId: this.courseInstance.id })
        .then((res) => {
          console.log(res);
          this.weeks = res.data;
          console.log(this.weeks);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    //预览视频
    videoPreview(path) {
      this.currentVideoPath = path;
      this.$refs.videoPreview.changedialogVisible();
    },
    //预览ppt
    previewPdf(path) {
      const url ="/course/resource/previewPdf?path=" + encodeURIComponent(path);
      window.open(this.global.baseUrl + url);
    },
    //下载
    download(path) {
      const url =
        "/course/resource/download?path=" + encodeURIComponent(path);
      window.open(this.global.baseUrl + url);
    },
    //获取课程实例详情
    findACourseInstance() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          console.log(res);
          this.courseInstance = res.data;
          this.getAllweeks();
        });
    },
    //发布一个节
    pub(sectionId, weekId) {
      console.log(sectionId, weekId);
      this.$api.course.section
        .pub({ sectionId: sectionId, weekId: weekId })
        .then((res) => {
          this.getAllweeks();
          this.Msg(res.data.data);
        });
    },
    //修改节
    altersection(sectionId) {
      this.sectionId = sectionId;
      this.$refs.altersection.changedialogVisible();
    },
    //添加节
    addsection(weekId) {
      this.weekId = weekId;
      this.$refs.addsection.changedialogVisible();
    },
    //添加周
    addweek() {
      this.$refs.addweek.changedialogVisible();
    },
    //上传文件的回调
    handleChange(file, fileList) {
      console.log("handleChange", file, fileList);
      console.log(this.weeks);
    },
  },
};
</script>
<style scoped>
.container span{
  margin: 0;
}
.Content_title{
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 24px;
  font-weight: 700;
}
.courseInstance_content{
  margin-top: 50px;
}
.box-card {
  background-color: #fff;
}
.boxbody div {
  margin: 10px 0;
  font-weight: 700;
}
.smallitem {
  color: #fff;
  background-color: #67c23a;
  padding: 5px 8px;
  margin: 5px 3px;
  border-radius: 4px;
  font-weight: 500;
  word-break: normal;
  display: inline-block;
}
.download {
  cursor: pointer;
  /* color: #007ACC; */
  /* text-decoration: underline; */
  position: relative;
}
.hovershow {
  display: none;
}
/* hover时候显示预览和下载 */
.download:hover .hovershow {
  padding: 2px 1px;
  display: flex;
  text-align: center;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: -1px;
}

.actionbtn {
  text-align: center;
  /* display: inline-block; */
  width: 50%;
  /* line-height: 100%; */
  height: 100%;
  color: #384259;
  font-weight: 700;
  font-size: 1.1em;
}
.actionbtn:hover {
  background-color: #ECF5FF;
}

/* 给测试按钮加样式 */
.test{
  font-size: 13px;
}

.section_content_text{
  padding: 6px 8px;
  margin-right:20px;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  font-size: 12px;
  /* background-color: #D9D9D9; */
  font-family: Arial;
  /* background-color:#85ce61; */
}
.section_content_title{
  font-size: 15px;
  margin-right: 20px;
}

.el-button{
  padding: 11px 5px;
}

</style>