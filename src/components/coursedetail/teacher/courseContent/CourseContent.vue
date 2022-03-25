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
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div>
                <span
                  style="font-weight: 700; font-size: 1em; padding-right: 10px"
                  >{{ section.title }}</span
                >
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
                  @click="ShowPPT(section.pptId, section.id)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >查看PPT</el-button
                >
                <!-- <el-button
                  @click="pptUpload(section.id)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >上传PPT</el-button
                > -->
                <!-- <span
                  class="section_content_text download"
                  v-for="ppt in section.pptSource"
                  :key="ppt.id"
                >
                  <span>{{ ppt.customFileName }}</span>
                  <span class="hovershow" style="">
                    <span @click="previewPdf(ppt.path)" class="actionbtn"
                      >预览</span
                    >
                    <span @click="download(ppt.path)" class="actionbtn"
                      >下载</span
                    >
                  </span>
                </span> -->
              </div>
              <div>
                <span class="section_content_title">教学视频:</span>
                <el-button
                  @click="ShowVideo(section.videoId, section.id)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >查看视频</el-button
                >
                <!-- <span
                  class="section_content_text download"
                  v-for="video in section.videoIdSource"
                  :key="video.id"
                >
                  <span>{{ video.fileName }}</span>
                  <span>{{ video.customFileName }}</span>
                  <span class="hovershow" style="">
                    <span @click="videoPreview(video.path)" class="actionbtn"
                      >预览</span
                    >
                    <span @click="download(video.path)" class="actionbtn"
                      >下载</span
                    >
                  </span>
                  @click="toAddCourseTest(section.id)" 
                </span> -->
              </div>
              <div>
                <span class="section_content_title">测验:</span>
                <!-- 将该讲的id作为路由跳转参数 -->
                <!-- @click="$refs.addCourseTest[index1].changeDialogVisible(section.id)" -->
                <el-button
                  @click="toAddCourseTest(index1, section.id)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >添加测验</el-button
                >
              </div>
              <div>
                <span class="section_content_title">作业:</span>
                <el-button
                  @click="showShortAnser(index1, section.id)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >添加作业</el-button
                >
                <el-button
                  @click="toAddCourseHomework(index1, section.id)"
                  icon="el-icon-circle-plus-outline"
                  class="test"
                  >添加编程作业</el-button
                >
              </div>
              <div>
                <span class="section_content_title">讨论</span>
                <!-- <p class="smallitem download " v-for="video in section.videoIdSource" :key="video.id">
                                    <span @click="videoPreview(video.path)">{{video.fileName}}</span>
                                   
                                </p> -->
              </div>

              <!-- <p>时间:{{dateTimeFormate(new Date(section.time))}}</p> -->
            </div>
          </el-card>
          <!-- <p><span style="font-weight:700;font-size:1.2em;padding-right:10px">{{section.title}}</span>
                     {{section.content}}
                     </p>
                    <p>知识点:{{knowledgesToString(section.knowledges)}}</p>
                    <p>ppt:
                        <span class="download" v-for="ppt in section.pptSource" :key="ppt.id">
                            <a  @click="download(ppt.path)">{{ppt.fileName}}</a>
                        </span>
                    </p>
                    <p>video:
                        <span class="download" v-for="video in section.videoIdSource" :key="video.id">
                            <a target="_blank" @click="download(video.path)">{{video.fileName}}</a>
                        </span>
                    </p>
                    <p>时间:{{dateTimeFormate(new Date(section.time))}}</p> -->
        </div>
        <!-- <el-button type="primary" @click="addsection(week.id)">添加一节</el-button> -->
      </el-collapse-item>
      <!-- <el-button type="success" @click="addweek">添加一周</el-button> -->
      <el-dialog :visible.sync="PPTVisible" width="60%">
        <div slot="title">
          课件
          <span>
            <!-- @click="previewPdf(scope.row.path)"此方法无用，在此只是为了不报错先占个位置 -->
            <el-button type="primary" @click="pptUpload()">上传</el-button>
            <el-button type="primary" @click="deleteAllPPT()"
              >批量删除</el-button
            >
            <el-button type="primary" @click="releaseAllPPT()"
              >批量发布</el-button
            >
          </span>
        </div>

        <el-table
          :data="currentPPTresource"
          height="500px"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="10%" align="center">
          </el-table-column>

          <el-table-column
            class="problemItem"
            type="index"
            label="序号"
            min-width="15%"
            align="center"
          >
          </el-table-column>
          <!-- v-show="currentPPTresource.customFileName != null" -->
          <el-table-column
            class="problemItem"
            prop="fileName"
            label="PPT"
            min-width="20%"
            align="center"
          >
          </el-table-column>

          <el-table-column
            class="problemItem"
            label="操作"
            min-width="35%"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="previewPdf(scope.row.path)"
                >浏览</el-button
              >
              <el-button type="success" @click="download(scope.row.path)"
                >下载</el-button
              >
              <el-button type="warning" @click="resReleasePPT(scope.row.id)"
                >发布</el-button
              >
              <el-button
                type="danger"
                @click="resDeletePPT(scope.row.id, scope.row.sectionid)"
                >删除</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            class="problemItem"
            label="评价详情"
            min-width="20%"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="pptassess(scope.row.id)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
      align="left"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 300, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="problemList.length"
    >
    </el-pagination> -->
      </el-dialog>

      <el-dialog title="评价总览" :visible.sync="pptassessVisible" width="20%">
        <span>评价总人数{{ passess.count }}</span
        ><br />
        <el-rate v-model="five" disabled></el-rate
        ><span>{{ passess.five }}人</span><br />
        <el-rate v-model="four" disabled></el-rate
        ><span>{{ passess.four }}人</span><br />
        <el-rate v-model="three" disabled></el-rate
        ><span>{{ passess.three }}人</span><br />
        <el-rate v-model="two" disabled></el-rate
        ><span>{{ passess.two }}人</span><br />
        <el-rate v-model="one" disabled></el-rate
        ><span>{{ passess.one }}人</span><br />
        <el-button type="primary" @click="pptassessVisible = false"
          >确 定</el-button
        >
      </el-dialog>

      <el-dialog title="视频预览" :visible.sync="videoVisible" width="60%">
        <div slot="title">
          视频
          <span>
            <!-- @click="previewPdf(scope.row.path)"此方法无用，在此只是为了不报错先占个位置 -->
            <el-button type="primary" @click="videoUpload()">上传</el-button>
            <el-button type="primary" @click="deleteAllVideo()"
              >批量删除</el-button
            >
            <el-button type="primary" @click="releaseAllVideo()"
              >批量发布</el-button
            >
          </span>
        </div>
        <el-table
          :data="currentVideoresource"
          height="500px"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="10%" align="center">
          </el-table-column>
          <el-table-column
            class="problemItem"
            type="index"
            label="序号"
            min-width="15%"
            align="center"
          >
          </el-table-column>
          <!-- v-show="currentPPTresource.customFileName != null" -->
          <el-table-column
            class="problemItem"
            prop="fileName"
            label="视频"
            min-width="20%"
            align="center"
          >
          </el-table-column>

          <el-table-column
            class="problemItem"
            label="操作"
            min-width="35%"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="videoPreview(scope.row.path)"
                >播放</el-button
              >
              <el-button type="success" @click="download(scope.row.path)"
                >下载</el-button
              >
              <el-button type="warning" @click="resReleaseVideo(scope.row.id)"
                >发布</el-button
              >
              <el-button
                type="danger"
                @click="resDeleteVideo(scope.row.id, scope.row.sectionid)"
                >删除</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            class="problemItem"
            label="评价详情"
            min-width="20%"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="videoassess(scope.row.id)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-table-column
            class="problemItem"
            prop="id"
            label="序号"
            min-width="15%"
            align="center"
            sortable
          >
          </el-table-column>
          <el-table-column
            class="problemItem"
            prop="customFileName"
            label="video名称"
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
              <el-button type="primary" @click="videoPreview(scope.row.path)"
                >浏览</el-button
              >
              <el-button type="success" @click="download(scope.row.path)"
                >下载</el-button
              >
              <el-button type="warning" @click="releasePPT(scope.row.path)"
                >发布</el-button
              >
              <el-button type="danger" @click="videoPreview(scope.row.path)"
                >删除</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            class="problemItem"
            label="评价"
            min-width="30%"
            align="center"
          >
          </el-table-column>
        </el-table> -->
      </el-dialog>

      <add-section-dialog
        ref="addsection"
        @getAllweeks="getAllweeks"
        :weekId="weekId"
        :courseInstance="courseInstance"
      ></add-section-dialog>
      <add-week-dialog
        ref="addweek"
        @getAllweeks="getAllweeks"
        :courseInstance="courseInstance"
      ></add-week-dialog>
      <alter-section-dialog
        ref="altersection"
        @getAllweeks="getAllweeks"
        :sectionId="sectionId"
        :courseInstance="courseInstance"
      ></alter-section-dialog>
      <ppt-upload
        ref="pptUpload"
        @getAllweeks="getAllweeks"
        :sectionId="this.sectionId"
        :courseInstance="courseInstance"
      />
      <video-upload
        ref="videoUpload"
        @getAllweeks="getAllweeks"
        :sectionId="this.sectionId"
        :courseInstance="courseInstance"
      />
      <video-preview
        ref="videoPreview"
        :videoPath="currentVideoPath"
      ></video-preview>
    </el-collapse>
    <div v-if="courseInstance.isPub == 0">正在审核中...</div>
    <div v-if="courseInstance.isPub == -1">审核未通过...</div>
    <!-- <pdf-preview></pdf-preview> -->
    <add-course-test
      ref="addCourseTest"
      changeDialogVisible="changeDialogVisible"
    />
    <alter-course-test
      ref="alterCourseTest"
      changeDialogVisible="changeDialogVisible"
    />
    <add-course-homework
      ref="addCourseHomework"
      changeDialogVisible="changeDialogVisible"
    />
    <alter-course-homework
      ref="alterCourseHomework"
      changeDialogVisible="changeDialogVisible"
    />
    <short-anser ref="shortAnser"
      changeDialogVisible="changeDialogVisible" />
  </div>
</template>
<script>
import AddSectionDialog from "./AddSectionDialog";
import addWeekDialog from "./AddWeekDialog";
import alterSectionDialog from "./AlterSectionDialog";
import videoPreview from "./VideoPreview";
import addCourseTest from "./courseTest/AddCourseTest.vue";
import alterCourseTest from "./courseTest/AlterCourseTest.vue";
import addCourseHomework from "./courseHomework/AddCourseHomework.vue";
import alterCourseHomework from "./courseHomework/AlterCourseHomework.vue";
import ShortAnser from "./courseHomework/ShortAnser.vue";
import pptUpload from "./PptUpload";
import videoUpload from "./VideoUpload";
// import pdfPreview from './PdfPreview.vue'
export default {
  components: {
    AddSectionDialog,
    addWeekDialog,
    alterSectionDialog,
    videoPreview,
    addCourseTest,
    alterCourseTest,
    addCourseHomework,
    alterCourseHomework,
    pptUpload,
    videoUpload,
    ShortAnser
  },
  data() {
    return {
      five: 5,
      four: 4,
      three: 3,
      two: 2,
      one: 1,
      pptassessVisible: false,
      dialogVisible: false,
      pptSource: false,
      customFileNameDialog: false,
      value2: 6,
      difficultytext: ["2", "4", "6", "8", "10"],
      loading: true,
      courseInstance: {}, //当前课程实例
      weeks: [], //
      weekId: null, //暂时保存要添加的节的父weekid
      sectionId: null, //暂时保存要修改的section
      multipleSelection: [], //保存要删除的资源数据
      sectionIds: [], //保持要删除的资源ID
      knowledgeId: [1, 2, 3],
      currentVideoPath: null, //暂时保存要播放的视频path
      addcoursedialogVisible: false, //点击测验按钮出现弹窗
      currentPPTresource: [], //保存当前正在预览的资源信息
      currentVideoresource: [],
      passess: {
        assess: [],
        count: 0,
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0,
      }, //ppt评价数据
      PPTVisible: false, // 控制ppt预览的弹框显示
      videoVisible: false,
      pptId: null,
      // questionList:{},//讨论帖子
    };
  },
  mounted() {
    this.findACourseInstance();
  },
  filters: {
    isPubFilter(isPub) {
      if (isPub == 1) return "已发布";
      else if (isPub != 1) {
        return "未发布";
      }
    },
  },
  methods: {
    //     handleSizeChange(pagesizes) {
    //       //每页的大小
    //       // console.log(pagesizes);
    //       this.pageSize = pagesizes;
    //     },
    //     //
    //     handleCurrentChange(currentChange) {
    //       //当前页
    //       // console.log(currentChange);
    //       this.currentPage = currentChange;
    //     },
    pptUpload() {
      this.$refs.pptUpload.changedialogVisible();
    },
    videoUpload() {
      this.$refs.videoUpload.changedialogVisible();
    },
    pptassess(str) {
      this.passess.assess = [];
      this.passess.count = 0;
      this.passess.five = 0;
      this.passess.four = 0;
      this.passess.three = 0;
      this.passess.two = 0;
      this.passess.one = 0;
      this.$api.course.resource.pptAssess({ pptId: str }).then((res) => {
        this.passess.assess = res.data;
        this.passess.count = this.passess.assess.length;
        for (let index = 0; index < this.passess.assess.length; index++) {
          if (this.passess.assess[index].score == 5) {
            this.passess.five = this.passess.five + 1;
          } else if (this.passess.assess[index].score == 4) {
            this.passess.four = this.passess.four + 1;
          } else if (this.passess.assess[index].score == 3) {
            this.passess.three = this.passess.three + 1;
          } else if (this.passess.assess[index].score == 2) {
            this.passess.two = this.passess.two + 1;
          } else if (this.passess.assess[index].score == 1) {
            this.passess.one = this.passess.one + 1;
          }
        }
        console.log(this.passess);
      });
      this.pptassessVisible = !this.pptassessVisible;
    },
    videoassess(str) {
      this.passess.assess = [];
      this.passess.count = 0;
      this.passess.five = 0;
      this.passess.four = 0;
      this.passess.three = 0;
      this.passess.two = 0;
      this.passess.one = 0;
      this.$api.course.resource.videoAssess({ videoId: str }).then((res) => {
        this.passess.assess = res.data;
        this.passess.count = this.passess.assess.length;
        for (let index = 0; index < this.passess.assess.length; index++) {
          if (this.passess.assess[index].score == 5) {
            this.passess.five = this.passess.five + 1;
          } else if (this.passess.assess[index].score == 4) {
            this.passess.four = this.passess.four + 1;
          } else if (this.passess.assess[index].score == 3) {
            this.passess.three = this.passess.three + 1;
          } else if (this.passess.assess[index].score == 2) {
            this.passess.two = this.passess.two + 1;
          } else if (this.passess.assess[index].score == 1) {
            this.passess.one = this.passess.one + 1;
          }
        }
        console.log(this.passess);
      });
      this.pptassessVisible = !this.pptassessVisible;
    },
    //选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除ppt
    deleteAllPPT() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.sectionIds.push(this.multipleSelection[i].id);
      }
      var secid = this.multipleSelection[0].sectionid;
      this.sectionIds.push(secid);
      var arr = this.sectionIds;
      console.log(arr);
      this.sectionIds = [];
      this.$api.course.resource
        .deleteAllPPT({ resourceIdList: arr })
        .then((res) => {
          console.log(res);
          alert("删除成功！");
          this.$api.course.resource
            .getpptId({ section_id: this.sectionId })
            .then((res) => {
              let tid = res.data;
              this.ShowPPT(tid, this.sectionId);
            });
        });
    },
    //批量删除video
    deleteAllVideo() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.sectionIds.push(this.multipleSelection[i].id);
      }
      var secid = this.multipleSelection[0].sectionid;
      this.sectionIds.push(secid);
      var arr = this.sectionIds;
      console.log(arr);
      this.sectionIds = [];
      this.$api.course.resource
        .deleteAllVideo({ resourceIdList: arr })
        .then((res) => {
          console.log(res);
          alert("删除成功！");
          this.$api.course.resource
            .getvideoId({ section_id: this.sectionId })
            .then((res) => {
              let tid = res.data;
              this.ShowVideo(tid, this.sectionId);
            });
        });
    },
    //批量发布PPT
    releaseAllPPT() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.sectionIds.push(this.multipleSelection[i].id);
      }
      var arr = this.sectionIds;
      //console.log(arr);
      this.sectionIds = [];
      this.$api.course.resource
        .releaseAll({ resourceIdList: arr })
        .then((res) => {
          alert("发布成功！");
          this.$api.course.resource
            .getpptId({ section_id: this.sectionId })
            .then((res) => {
              let tid = res.data;
              this.ShowPPT(tid, this.sectionId);
            });
        });
    },
    //批量发布Video
    releaseAllVideo() {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.sectionIds.push(this.multipleSelection[i].id);
      }
      var arr = this.sectionIds;
      //console.log(arr);
      this.sectionIds = [];
      this.$api.course.resource
        .releaseAll({ resourceIdList: arr })
        .then((res) => {
          alert("发布成功！");
          this.$api.course.resource
            .getvideoId({ section_id: this.sectionId })
            .then((res) => {
              let tid = res.data;
              this.ShowVideo(tid, this.sectionId);
            });
        });
    },
    // 添加测验
    toAddCourseTest(index1, id) {
      console.log(this.$refs.alterCourseTest);
      console.log(this.$refs.addCourseTest);
      this.$api.course.sectiontest
        .checkHasTest({ sectionId: id })
        .then((res) => {
          console.log("检查是否有测试的结果", res);
          if (res.data != 0) {
            //已经有测试就跳转到测试详情界面
            // this.$router.push({
            //   path: "/course/alterCourseTest",
            //   query: { sectionId: id },
            // });
            this.$refs.alterCourseTest.changeDialogVisible(id);
          } else {
            // this.$router.push({
            //   //没有测试就跳转到添加测试界面
            //   path: "/course/addCourseTest",
            //   query: { sectionId: id },

            // });
            this.$refs.addCourseTest.changeDialogVisible(id);
          }
        });
    },
    //添加作业
    showShortAnser(index, id) {
      console.log(id);
      this.$refs.shortAnser.changeDialogVisible(id)
    },
    // 添加编程作业
    toAddCourseHomework(index1, id) {
      // console.log(id);
      this.$api.course.sectionhomework
        .checkHasHomework({ sectionId: id })
        .then((res) => {
          console.log("检查是否有作业", res);
          if (res.data != 0) {
            // this.$router.push({
            //   path: "/course/alterCourseHomework",
            //   query: { sectionId: id },
            // });
            this.$refs.alterCourseHomework.changeDialogVisible(id);
          } else {
            // this.$router.push({
            //   path: "/course/AddCourseHomework",
            //   query: { sectionId: id },
            // });
            this.$refs.addCourseHomework.changeDialogVisible(id);
          }
        });
    },
    // 对PPT进行预览
    ShowPPT(str, id) {
      // this.sectionIds = [];
      // console.log(str);
      //console.log(this.section.knowledges);
      this.sectionId = id;
      if (str == "") {
        this.$message("该节暂无PPT资源！");
      } else {
        this.$api.course.resource.searchPPTS({ rec: str }).then((res) => {
          this.currentPPTresource = res.data;
          for (let index = 0; index < this.currentPPTresource.length; index++) {
            this.currentPPTresource[index].sectionid = id;
          }
          // console.log(this.currentPPTresource);
        });
      }
      this.PPTVisible = true;
      // }
    },
    // 对video进行预览
    ShowVideo(str, id) {
      this.sectionId = id;
      // this.currentVideoresource = video;
      if (str == "") {
        this.$message("该节暂无Video资源！");
      } else {
        this.$api.course.resource.searchVideos({ rec: str }).then((res) => {
          this.currentVideoresource = res.data;
          for (
            let index = 0;
            index < this.currentVideoresource.length;
            index++
          ) {
            this.currentVideoresource[index].sectionid = id;
          }
          console.log(this.currentVideoresource);
        });
      }
      this.videoVisible = true;
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
      console.log("视频预览" + this.currentVideoPath);
      this.$refs.videoPreview.changedialogVisible();
    },
    //预览ppt
    previewPdf(path) {
      const url =
        "/course/resource/previewPdf?path=" + encodeURIComponent(path);
      window.open(this.global.baseUrl + url);
    },
    //发布PPT
    resReleasePPT(str) {
      console.log(str),
        this.$api.course.resource
          .resourceRelease({ resource_id: str })
          .then((res) => {
            alert("发布成功！");
            this.$api.course.resource
              .getpptId({ section_id: this.sectionId })
              .then((res) => {
                let tid = res.data;
                this.ShowPPT(tid, this.sectionId);
              });
          });
    },
    //发布Video
    resReleaseVideo(str) {
      console.log(str),
        this.$api.course.resource
          .resourceRelease({ resource_id: str })
          .then((res) => {
            alert("发布成功！");
            this.$api.course.resource
              .getvideoId({ section_id: this.sectionId })
              .then((res) => {
                let tid = res.data;
                this.ShowVideo(tid, this.sectionId);
              });
          });
    },
    //删除PPT
    resDeletePPT(str, sectionid) {
      // console.log(str), console.log(sectionid);
      this.$api.course.resource
        .resourceDeletePPT({ resource_id: str, section_id: sectionid })
        .then((res) => {
          alert("删除成功！");
          this.$api.course.resource
            .getpptId({ section_id: sectionid })
            .then((res) => {
              let tid = res.data;
              this.ShowPPT(tid, sectionid);
            });
          // this.ShowPPT(tid,sectionid);
        });
    },
    resDeleteVideo(str, sectionid) {
      // console.log(str), console.log(sectionid);
      this.$api.course.resource
        .resourceDeleteVideo({ resource_id: str, section_id: sectionid })
        .then((res) => {
          alert("删除成功！");
          this.$api.course.resource
            .getvideoId({ section_id: sectionid })
            .then((res) => {
              let tid = res.data;
              this.ShowVideo(tid, sectionid);
            });
          // this.ShowPPT(tid,sectionid);
        });
    },
    //下载
    download(path) {
      const url = "/course/resource/download?path=" + encodeURIComponent(path);
      window.open(this.global.baseUrl + url);
    },
    //获取课程实例详情
    findACourseInstance() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
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
.container span {
  margin: 0;
}
.Content_title {
  margin-bottom: 20px;
  margin-top: 30px;
  font-size: 24px;
  font-weight: 700;
}
.courseInstance_content {
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
  background-color: #ecf5ff;
}

/* 给测试按钮加样式 */
.test {
  font-size: 13px;
  line-height: 3px;
}

.section_content_text {
  padding: 6px 8px;
  margin-right: 20px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  font-size: 12px;
  /* background-color: #D9D9D9; */
  font-family: Arial;
  /* background-color:#85ce61; */
}
.section_content_title {
  font-size: 15px;
  display: inline-block;
  padding-right: 10px;
}

.el-button {
  padding: 11px 5px;
}
</style>