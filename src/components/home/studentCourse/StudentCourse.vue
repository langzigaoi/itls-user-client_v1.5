<template>
  <div>
        <!--工具栏-->
        <el-row>
          <el-col :span="12" align="right">
            <el-tabs
              v-model="flag"
              type="card"
              @tab-click="handleFind"
              class="mlef-20"
            >
              <el-tab-pane label="课程广场" name="0"></el-tab-pane>
              <el-tab-pane label="我的课程" name="1"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="12">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-input
                  size="small"
                  v-model="filters.name"
                  placeholder="名称"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="mini" type="primary">查询</el-button>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>

        <el-card
          class="box-card"
          style="padding: 0"
          :body-style="{ padding: '15px' }"
          v-for="(item, index) in tableFliter"
          :key="index"
        >
          <div class="card-header" align="center">
            <div class="fl-left" style="width: 60%; padding-top: 5px">
              </div>
          </div>

          <div class="card-body">
            <div style="width: 50%">
              <el-image
                :src="item.image"
                fit="fill"
                style="width: 250px; height: 180px"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </div>
            <div style="width: 80%" align="left">
              <el-row >
                <el-col :span="10">
                  <el-row>
                    <div class="details-lable">课程名称:</div>
                  </el-row>
                  <el-row>
                    <div class="details-lable"> 主讲人:</div>
                  </el-row>
                  <el-row>
                    <div class="details-lable">开始时间:</div>
                  </el-row>
                </el-col>

                <el-col :span="14">
                  <el-row>
                    <div class="details-lable">{{ item.courseName }}</div>
                  </el-row>
                  <el-row>
                    <div class="details-lable">{{ item.teacherName }}</div>
                  </el-row>
                  <el-row>
                    <div class="time">"{{ time(item.startYear) }}"</div>
                  </el-row>
                </el-col>
              </el-row>
            </div>

            <div class="card-footer">
              <div style="float: right; padding: 3px 0" type="text">
                <el-button
                  v-show="flag == 0 "
                  size="mini"
                  type="primary"
                  @click="chandgeViewVisible(item)"
                >详情</el-button>
                <el-button
                  v-show="flag == 1"
                  size="mini"
                  type="primary"
                  @click="handleInto(item)"
                >进入课程</el-button>
                <!-- <el-button
                  v-show="isPub == 0"
                  size="mini"
                  type="danger"
                  @click="handleDelete(item)"
                >删除</el-button> -->
        
              </div>
            </div>

            <!-- 编辑课程实例-->
            <el-dialog
              title="课程详情"
              width="60%"
              :visible.sync="viewVisible"
              :close-on-click-modal="false"
              destroy-on-close
            >
              <el-form
                ref="viewCinstanceForm"
                :model="viewCinstanceForm"
                style="text-align:center"
                
              >
                <div>
                  <el-row type="flex" justify="center">
                    <el-col :span="5">
                      <div>
                          <img
                            v-if="viewCinstanceForm.image"
                            :src="viewCinstanceForm.image"
                            style="max-width: 100px"
                            class="avatar"
                          />                         
                      </div>
                    </el-col>

                    <el-col :span="9">
                      <el-form-item label="课程名称" label-width="70px">
                        <el-row type="flex">
                          <el-input 
                          style="width: 205px"
                            size="small"
                            v-model="viewCinstanceForm.courseName">
                          </el-input>
                        </el-row>
                      </el-form-item>

                      <el-form-item label="主 讲 人" label-width="70px">
                        <el-row type="flex">
                          <el-input
                            style="width: 205px"
                            size="small"
                            v-model="viewCinstanceForm.teacherName"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-row>
                      </el-form-item>

                      <el-form-item label="开始时间" label-width="70px">
                        <el-row type="flex">
                          <el-date-picker
                            style="width: 205px"
                            size="small"
                            align="left"
                            v-model="viewCinstanceForm.startYear"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-row>
                      </el-form-item>

                      <el-form-item
                        label="周学时"
                        label-width="70px"
                      >
                        <el-row type="flex">
                          <el-input
                            style="width: 205px"
                            size="small"
                            v-model="viewCinstanceForm.hoursOfWeek"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-row>
                      </el-form-item>
                
                      <el-form-item label="需要编程" label-width="70px">
                        <el-row type="flex">
                          <div>
                        
                            <el-select
                              size="small"
                              v-model="viewCinstanceForm.isProgram"
                              placeholder="请选择"
                              @change="changeIsProgram()"
                            >
                              <el-option
                                v-for="item in programOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </div>
                        </el-row>
                      </el-form-item>
                     
                    </el-col>

                    <el-col :span="10">
                  
                      <el-form-item label="教学类型" label-width="70px">
                        <el-row type="flex">
                          <el-input 
                            style="width: 205px"
                            size="small"
                            v-model="viewCinstanceForm.teachingTypeName">
                          </el-input>
                         
                        </el-row>
                      </el-form-item>

                      <el-form-item label="学期" label-width="70px">
                        <el-row type="flex">
                          <div>
                            <el-select
                              size="small"
                              v-model="viewCinstanceForm.semester"
                              placeholder="请选择"
                            >
                              <el-option
                                v-for="item in semesterOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              >
                              </el-option>
                            </el-select>
                          </div>
                        </el-row>
                      </el-form-item>

                      <el-form-item label="结束时间" label-width="70px">
                        <el-row type="flex">
                          <el-date-picker
                            style="width: 205px"
                            size="small"
                            align="left"
                            v-model="viewCinstanceForm.endYear"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </el-row>
                      </el-form-item>
                    
                      <el-form-item label="学分"  label-width="70px" >
                        <el-row type="flex">
                          <el-input
                            style="width: 205px"
                            size="small"
                            v-model="viewCinstanceForm.grade"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-row>
                      </el-form-item>

                      <el-form-item label="编程语言" label-width="70px">
                        <el-row type="flex">                         
                          <el-input
                              size="small"
                              style="width: 205px"
                              v-model="lang"
                            >
                          </el-input>
                          
                        </el-row>
                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row type="flex" justify="center">
                    <el-col :span="5"></el-col>
                    <el-col :span="19">
                      <el-form-item label="课程简介" label-width="70px">
                        <el-row type="flex">
                          <el-input
                            style="width: 570px"
                            size="small"
                            type="textarea"
                            :rows="4"
                            v-model="viewCinstanceForm.intro"
                            placeholder="请输入内容"
                          ></el-input>
                        </el-row>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div>
                    <el-row type="flex" align="bottom" justify="end">
                      <el-button size="mini" @click="closeView"
                        >返回
                      </el-button>
                      <el-button type="primary" size="mini" @click="handleChoose(item)"
                        >选课</el-button
                      >
                    </el-row>
                  </div>
                </div>
              </el-form>
            </el-dialog>


          </div>

        </el-card>

    
  </div>

</template>
<script>
import { time, isInterger, isEmail } from "@/utils/global-functions";

export default {
  data() {
    return {
      pageRequest: { pageNum: 1, pageSize: 9 },
      pageResult: {},
      filters: {
        name: "",
      },
      tableData: [],
      courseId: null,
      flag: "1",

      viewVisible: false,
      viewCinstanceForm:{},
      langlist: [],
      lang: "",
      semesterOptions: [
        {
          value: 1,
          label: "第一学期",
        },
        {
          value: 2,
          label: "第二学期",
        },
      ],
      programOptions: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],


    };
  },
  computed: {
    tableFliter() {
      return this.tableData.filter((item) => {
        return (
          String(item.courseName).toLowerCase().indexOf(this.filters.name) > -1
        );
      });
    },

    userinfo() {
      return this.$store.state.user.userInfo;
    },
    cinstanceInfo() {
      return this.$store.state.searchCourse.cinstanceInfo;
    },
  },
  mounted() {
    this.handleFind();

  },
  methods: {
    // 获取分页数据
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "courseId", value: this.courseId },
        
      ];
      this.$api.course.cinstance.findList(this.pageRequest).then((res) => {
        this.pageResult = res.data;
        
        let list = [];
        for (let index = 0; index < res.data.content.length; index++) {
          console.log(res.data.content[index].id);
          list.push(res.data.content[index])
        }
        console.log(list);
        this.tableData = list;
      })
      .then(data != null ? data.callback : "");
    },
    // 个人课程实例数据
    findCinstance() {
      this.$api.course.cinstance.findAllCourseInstance().then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      })
      .catch((err) =>{
        this.tableData = [];
      })
        
    },
    handleFind() {
      // console.log(this.flag);
      if(this.flag == "0") {
        this.findPage(null);
      } 
      if(this.flag == "1") {
        this.findCinstance();
      }
    },

    // 查询实例对应的语言
    findLanguageByCid(cid){
      this.$api.course.language.findCinstanceLanguage({cid: cid}).then((res) => {
      let data = res.data
      let list = [];
      for (let index = 0; index < data.length; index++) {
        list.push(data[index].name)
      };
      // this.langlist = list;
      this.lang = list.join(',');
      })
    },
    chandgeViewVisible(item) {
      this.findLanguageByCid(item.id)
      this.viewCinstanceForm = JSON.parse(JSON.stringify(item));
      this.viewVisible = !this.viewVisible;

    },  
    closeView() {
      this.viewCinstanceForm = {};
      this.langlist = [];
      this.viewVisible = false;
    },

    handleChoose(item) {
      console.log(item.id);
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.$api.course.choosing.chooseCourseInstance( {cinstanceId: item.id} )
          .then((res) => {
            // this.findCinstance();
            this.$message({
              message: "选择成功",
              type: "success",
            });
            this.closeView();
          })
          .catch((err) => {
            this.$message.error();
          });
        
      });
    },

    handleInto(item) {
      console.log(item);
      let path = "/studycourse"
      let id = item.id
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      })

    },



  },
};
</script>
<style >
.box-card {
  width: 300px;
  height: 100%;
  margin-right: 50px;
  margin-bottom: 30px;
  border-radius: 4px;
  float: left;
}

.time {
  font-style: normal;
  font: bolder;
  margin: 2px;
  /* font-size: 13px; */
  color: #999;
}
.details-lable{
}


</style>