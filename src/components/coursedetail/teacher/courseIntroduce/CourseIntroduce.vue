<template>
  <div class="outside" style="padding:10px ">
    <el-dialog
      title="编辑课程实例"
      width="60%"
      :visible.sync="editInstanceDialogVisible"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form
        ref="editInstanceForm"
        :model="editInstanceForm"
        :rules="addInstanceRules"
        style="text-align: center"
      >
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="5">
              <div>
                <el-upload
                  class="avatar-uploader"
                  :action="uploadimgurl"
                  :show-file-list="false"
                  :on-success="handleImageSuccess"
                  name="image"
                  with-credentials
                  :before-upload="beforeImageUpload"
                >
                  <img
                    v-if="editInstanceForm.image"
                    :src="editInstanceForm.image"
                    style="max-width: 100px"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    style="
                      min-width: 100px;
                      border: 1px solid #ccc;
                      min-height: 100px;
                      line-height: 100px;
                    "
                  ></i>
                </el-upload>
              </div>
            </el-col>

            <el-col :span="9">
              <el-form-item label="课程名称" label-width="70px">
                <el-row type="flex">
                  <el-input
                    disabled
                    style="width: 205px"
                    size="small"
                    v-model="editInstanceForm.courseName"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="主 讲 人" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 205px"
                    size="small"
                    v-model="editInstanceForm.lecturer"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="开始时间" label-width="70px">
                <el-row type="flex">
                  <el-date-picker
                    disabled
                    style="width: 205px"
                    size="small"
                    align="left"
                    v-model="editInstanceForm.startYear"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-row>
              </el-form-item>

              <el-form-item
                label="周 学 时"
                prop="hoursOfWeek"
                label-width="70px"
              >
                <el-row type="flex">
                  <el-input
                    style="width: 205px"
                    size="small"
                    v-model="editInstanceForm.hoursOfWeek"
                    placeholder="请输入周学时"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="需要编程" label-width="70px">
                <el-row type="flex">
                  <div>
                    <el-select
                      size="small"
                      v-model="editInstanceForm.isProgram"
                      placeholder="请选择"
                      @change="handleSelectIsProgram"
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
                  <el-select
                    size="small"
                    v-model="editInstanceForm.teachingTypeId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in allTeachingType"
                      :key="item.value"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-row>
              </el-form-item>

              <el-form-item label="学   期" label-width="70px">
                <el-row type="flex">
                  <div>
                    <el-select
                      disabled
                      size="small"
                      v-model="editInstanceForm.semester"
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
                    disabled
                    style="width: 205px"
                    size="small"
                    align="left"
                    v-model="editInstanceForm.endYear"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-row>
              </el-form-item>

              <el-form-item label="学分" prop="grade" label-width="70px">
                <el-row type="flex">
                  <el-input
                    style="width: 205px"
                    size="small"
                    v-model="editInstanceForm.grade"
                    placeholder="请输入学分"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="编程语言" label-width="70px">
                <el-row type="flex">
                  <div>
                    <el-select
                      :disabled="program"
                      multiple
                      size="small"
                      v-model="langlist"
                      @change="handleSelectLanguage"
                      placeholder="请选择"
                      clearable
                    >
                      <el-option
                        v-for="item in allLanguage"
                        :key="item.value"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
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
                    v-model="editInstanceForm.intro"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <div>
            <el-row type="flex" align="bottom" justify="end">
              <el-button size="mini" @click="closeEditInstanceForm"
                >返回
              </el-button>
              <el-button type="primary" size="mini" @click="submitEditInstance"
                >确定</el-button
              >
            </el-row>
          </div>
        </div>
      </el-form>
    </el-dialog>

    <!-- 展示 -->
    <div v-show="!isEdit" class="tcommonBox">
      <header>
      </header>
      <el-row>
        <el-col :span="5">
          <div>
            <el-avatar
              shape="square"
              fit="contain"
              :size="120"
              :src="courseInstance.image"
            ></el-avatar>
          </div>
        </el-col>

        <el-col :span="7">
          <el-row type="flex" class="el-row-margin">
            <div>
              <span>课程名称</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ courseInstance.courseName }}</span>
            </div>
          </el-row>

          <!-- <el-row>
            <div>
              <span>工号</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.no }}</span>
            </div>
          </el-row> -->

          <el-row type="flex" class="el-row-margin">
            <div>
              <span>主讲人</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ courseInstance.lecturer }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>起止日期</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ dateFormate(new Date(courseInstance.startYear)) }}</span
              >~<span>{{ dateFormate(new Date(courseInstance.endYear)) }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>周学时</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ courseInstance.hoursOfWeek }} 学时</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>需要编程</span>
              <el-divider direction="vertical"></el-divider>
              <span v-if="courseInstance.isProgram == 1">是</span>
              <span v-else>否</span>
            </div>
          </el-row>

          <div style="float: left">
            <el-button
              size="mini"
              type="primary"
              :disabled="this.courseInstance.isRelease === 1"
              @click="chandgeEditInstanceVisible()"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              :disabled="this.courseInstance.isRelease === 1"
              @click="releaseCinstance()"
              >发布
            </el-button>
          </div>
        </el-col>

        <el-col :span="12">
          <el-row class="el-row-margin">
            <div>
              <span>教学类型</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ courseInstance.teachingTypeName }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>学期</span>
              <el-divider direction="vertical"></el-divider>
              <span>第 {{ courseInstance.semester }} 学期</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>学分</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ courseInstance.grade }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>编程语言</span>
              <el-divider direction="vertical"></el-divider>
              <span v-for="(value, index) in languageList" :key="index"
                >&nbsp;{{ value.name }}语言
                <span v-if="index != languageList.length - 1">、</span>&nbsp;
              </span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>课程简介</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ courseInstance.intro }}</span>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { baseUrl, avatarUrl } from "@/utils/global";
export default {
  data() {
    return {



      infoForm: {},
      // 编辑页面显示标记
      editInfoFormVisible: false,
      courseInstance: {}, //一个课程实例
      isEdit: false,
      allTitle: [],
      dialogTableVisible: false,
      courseProblem: [],
      problemList: [],
      
      // 时间选择器
      pickerOptions: {
        disabledDate(time) {},
      },
      // 上传路径
      uploadimgurl: "",
      defaultAvatar: "",
      ishas: false,
      languageList: [],
      checkLanguage: [],
      program: false,
      infoFormRules: {
        telNum: [{ validator: this.checkTel, trigger: "blur" }],
        email: [{ validator: this.checkEmail, trigger: "blur" }],
      },

      isPub: "1",
      // 课程实例数据
      allIstance: [],
      tableData: [],
      filters: {
        name: "",
      },
      uploadimgurl: "",
      // 课程数据
      allCourse: [],
      allLevel: [],
      allDirection: [],
      ALLRequirement: [],
      allTeachingType: [],
      allLanguage: [],
      // 新增课程表单
      addCourseInform: [],
      addCourseDialogVisible: false,
      // 新增课程实例表单
      addInstanceDialogVisible: false,
      addInstanceInform: {
        image: null,
      },
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
      langlist: [],
      langlistCheck: [],
      program: false,
      cinstanceLanguage: [],
      // 时间选择器
      pickerOptions: {},
      addInstanceRules: {
        hoursOfWeek: [{ validator: this.checkHoursOfWeek, trigger: "blur" }],
        grade: [{ validator: this.checkGrade, trigger: "blur" }],
      },
      // 编辑课程实例
      editInstanceDialogVisible: false,
      editInstanceForm: {},
      editInstanceRules: {},
    };
  },

  mounted() {
    this.findACourseInstance();
    this.findAllLanguage();
    this.uploadimgurl = `${baseUrl}/OssUpload/image`;
    this.findAllTeachingType();
  },
  computed: {
    tableFliter() {
      return this.tableData.filter((item) => {
        return (
          String(item.courseName).toLowerCase().indexOf(this.filters.name) > -1
        );
      });
    },
  },
  methods: {
    //自增序列
    indexMethod(index) {
      return index + 1;
    },

    isedit() {
      this.isEdit = true;
      this.checkLanguage = this.languageList;
    },
    handleInfoFormVisible() {
      this.editInfoFormVisible = !this.editInfoFormVisible;
    },
    // 封面上传
    beforeImageUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleImageSuccess(res, file) {
      // this.addInstanceInform.avatar = URL.createObjectURL(file.raw);
      console.log("上传成功的回调", res);
      this.addInstanceInform.image = res.data;
      console.log(this.addInstanceInform.image);
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      console.log("上传成功的回调", res);
      if (res.ok) {
        this.courseInstance.image = res.data;
      }
    },
    handleTitleSelect(item) {
      this.infoForm.title = item;
      // console.log(item);
    },

    handleSelectIsProgram(item) {
      // console.log(this.addInstanceInform.isProgram);
      console.log(item);
      if (item == "1") {
        this.program = false;
      } else {
        this.program = true;
      }
    },
    // 编辑课程实例
    chandgeEditInstanceVisible(item) {
      // console.log(item.id);
      this.findLanguageByCid(this.courseInstance.id);
      this.editInstanceForm = this.courseInstance;
      this.editInstanceDialogVisible = true;
    },
    // 回显用
    findLanguageByCid(cid) {
      this.$api.course.language
        .findCinstanceLanguage({ cid: cid })
        .then((res) => {
          let data = res.data;
          let list = [];
          for (let index = 0; index < data.length; index++) {
            list.push(data[index].id);
          }
          // console.log(list);
          this.langlist = list;
        });
    },
    //发布课程实例
    releaseCinstance() {
      this.$confirm("发布后将不能再进行编辑，确认发布吗？", "提示", {}).then(
        () => {
          this.$api.course.cinstance
            .release({ id: this.$store.state.course.courseCinstanceId })
            .then((res) => {
              if (res.msg == "发布成功") {
                this.$message({ message: res.msg, type: "success" });
                this.findACourseInstance();
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
        }
      );
    },
    // 获取课程编程语言
    findCinstanceLanguage(id) {
      this.$api.course.language
        .findCinstanceLanguage({ cid: id })
        .then((res) => {
          this.languageList = res.data;
        });
    },
    closeEditInstanceForm() {
      this.editInstanceForm = {};
      this.langlist = [];
      this.editInstanceDialogVisible = false;
    },
    beforeAvatarUpload(file) {
      console.log("提交之前", file.type);
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      // this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
      //return false;
    },
    handleSelectLanguage(value) {
      console.log(value);
      this.langlist = value;
      // console.log(this.langlist);
    },
    findAllTeachingType() {
      let suggests = [];
      this.$api.metadata.type.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allTeachingType = suggests;
      });
    },
    handleCourseSelect(item) {
      this.addInstanceInform.course = item;
      console.log(item);
    },
    //获取课程实例详情
    findACourseInstance() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseInstance = res.data;
          this.findCinstanceProblem(this.courseInstance.courseId);
          this.findCinstanceLanguage(this.courseInstance.id);
        })
        .catch((err) => {
          this.courseInstance = {};
        });
    },
    // 获取课程题型
    findCinstanceProblem(id) {
      this.$api.course.courseProblemType
        .findCourseProblemType(id)
        .then((res) => {
          this.problemList = res.data;
          if (this.problemList.indexOf("编程题") != -1) {
            this.ishas = true;
          }
        });
    },
    // 获取所有编程语言
    findAllLanguage() {
      console.log("in");
      let suggests = [];
      this.$api.course.language.findAllLanguage().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allLanguage = suggests;
      });
    },

    // 修改课程编程语言
    updateCinstanceLanguage() {
      let cinstanceLanguage = [];
      for (let index = 0; index < this.checkLanguage.length; index++) {
        for (let i = 0; i < this.allLanguage.length; i++) {
          if (this.checkLanguage[index] == this.allLanguage[i].name) {
            cinstanceLanguage.push({
              cinstanceId: this.courseInstance.id,
              languageId: this.allLanguage[i].id,
            });
          }
        }
      }
      console.log(cinstanceLanguage);
      this.$api.course.language
        .updateCinstanceLanguage(cinstanceLanguage)
        .then((res) => {
          if (res.msg == "修改成功") {
            this.succMsg("修改成功");
            this.findACourseInstance();
          }
        });
    },
    submitLanguage(cid) {
      let list = [];
      for (let index = 0; index < this.langlist.length; index++) {
        list.push({ cinstanceId: cid, languageId: this.langlist[index] });
      }
      console.log(list);
      this.$api.course.language.addCinstanceLanguage(list).then((res) => {});
    },
    handleInto(item) {
      console.log(item);
      let path = "/course";
      let id = item.id;
      this.$router.push({
        path: path,
        query: {
          id: id,
        },
      });
    },
    submitEditInstance() {
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.editLoading = true;
        let params = Object.assign({}, this.editInstanceForm);
        this.$api.course.cinstance.updateInstance(params).then((res) => {
          this.editLoading = false;
          this.submitLanguage(this.editInstanceForm.id);
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // this.getAllInstance();
            this.findACourseInstance();
            this.closeEditInstanceForm();
          } else {
            this.$message({
              message: "修改失败, " + res.msg,
              type: "error",
            });
          }
        });
      });
    },
    // 编辑
    submitInfoForm: function () {
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.infoForm);

            this.$api.user.selfCenter.save(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.getInfo();
                this.$message({ message: "操作成功", type: "success" });
                this.handleInfoFormVisible();
                this.$refs["infoForm"].resetFields();
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },
    //修改课程实例
    saveInfo() {
      if (this.checkLanguage.length == 0) {
        this.$warnMsg("编程语言不能为空");
        return;
      }
      console.log("修改", this.courseInstance);
      this.$api.course.cinstance
        .updateInstance(this.courseInstance)
        .then((res) => {
          // this.findACourseInstance();
          // this.Msg(res.data);
          // this.updateCinstanceLanguage()
          this.isEdit = !this.isEdit; //修改为查看状态，关闭修改状态
        });
    },
    visable() {
      this.dialogTableVisible = false;
    },
    update() {
      //更新、修改课程实例题型
      var courseProblemType = [];
      for (var key in this.courseProblem) {
        if (this.courseProblem[key] == "单选题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 1,
          });
        } else if (this.courseProblem[key] == "多选题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 2,
          });
        } else if (this.courseProblem[key] == "判断题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 3,
          });
        } else if (this.courseProblem[key] == "填空题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 4,
          });
        } else if (this.courseProblem[key] == "应用题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 5,
          });
        } else if (this.courseProblem[key] == "简答题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 6,
          });
        } else if (this.courseProblem[key] == "编程题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 7,
          });
        } else if (this.courseProblem[key] == "讨论题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 8,
          });
        } else if (this.courseProblem[key] == "实践题") {
          courseProblemType.push({
            course_id: this.courseInstance.id,
            problem_type_id: 9,
          });
        }
      }
      this.$api.course.courseProblemType
        .updateCourseProblemType(courseProblemType)
        .then((res) => {
          this.succMsg(res.msg);
          this.dialogTableVisible = false;
          this.$api.course.courseProblemType
            .findCourseProblemType(this.courseInstance.id)
            .then((res1) => {
              this.$store.commit("setcourseProblemTypeList", res1.data);
            });
        });
    },
  },
};
</script>
<style scoped>
.outside{
  text-align: center;
}


.tcommonBox {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: left;
  margin-top: 15px;
}
.el-input-text {
  width: 108%;
}

.el-input {
  width: 100%;
}
.el-row {
  /* margin-bottom: 30px; */
  display: flex;
  flex-wrap: wrap;
}

.el-form-item {
  margin-bottom: 35px;
}
.el-form-item__error {
  text-align: center;
}
.el-row-margin {
  margin-bottom: 60px;
}
.el-textarea__inner:focus {
  border-color: #14889a;
}
.el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input.is-focus .el-input__inner:focus {
  border-color: #14889a;
}
.tcommonBox h1 {
  margin: 15px 850px 19px 19px;
  font-size: 25px;
  font-weight: 700;
  text-align: left;
  line-height: 30px;
  padding-bottom: 25px;
}
/* .userInfoBox .avatarlist{
    position: relative;
    text-align: left;
} */
userInfoBox li {
  text-align: left;
  float: left;
}
.avatar-uploader {
  display: inline-block;
  vertical-align: top;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
.gotoEdit {
  font-size: 15px;
  float: right;
  cursor: pointer;
  color: #999;
}
.gotoEdit:hover {
  color: #333;
}
/*个人设置*/

.userInfoBox .leftTitle {
  display: inline-block;
  width: 100px;
  padding: 10px 0;
}
.userInfoBox .rightInner {
  display: inline-block;
  max-width: calc(100% - 140px);
  vertical-align: top;
}
.userInfoBox li {
  padding: 22px;
  border-bottom: 1px #ddd;
  float: left;
  width: 500px;
}
.userInfoBox li:last-child {
  border-bottom: 1px solid transparent;
}
.userInfoBox .el-input,
.userInfoBox .el-textarea {
  max-width: 300px;
  min-width: 100px;
}

.userInfoBox .el-input__inner {
  border-radius: 4px;
}
.userInfoBox .el-textarea {
  vertical-align: top;
}
.saveInfobtn {
  margin: 20px 0;
  text-align: center;
}
.saveInfobtn a {
  color: #000;
  padding: 6px 20px;
  margin: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
.userInfoBox .fa-asterisk {
  color: #df2050;
}
header {
  border-top: 1px;
}
</style>