<template>
    <div >
        <!-- 课程介绍{{this.$store.state.courseCinstanceId}}{{this.$store.state.user.userInfoinfo}} -->
        <!-- {{courseInstance}} -->
        <!-- 编辑 -->
        <div v-show="isEdit" class="tcommonBox">
            <header>
                <h1>
                        
                </h1>
            </header>
            <section>
                <ul class="userInfoBox">
                    <li class="avatarlist">
                        <span class="leftTitle">封面</span>
                        <div class="avatar-uploader">
                           <el-upload
                              class="avatar-uploader"
                              action="itls/OssUpload/image"
                              name="image"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                               <el-avatar  v-if="courseInstance.image" :size="90" :src="courseInstance.image" > </el-avatar>
                              <!-- <img v-if="courseInstance.image" :src="courseInstance.image" class="avatar"> -->
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                              <div slot="tip" class="el-upload__tip">点击上传，只能上传jpg/png文件，且不超过1mb</div>
                            </el-upload>
                        </div>
                    </li>
                   <li class="username">
                        <span class="leftTitle">课程名</span>
                        <span>{{courseInstance.courseName}}</span>
                    </li>
                    <!-- <li>
                        <span class="leftTitle">教师</span>
                        <span>{{courseInstance.teacherName}}</span>
                    </li> -->
                    <li>
                        <span class="leftTitle">课程介绍</span>
                        <!-- <span>{{courseInstance.intro}}</span> -->
                        <el-input  type="textarea" v-model="courseInstance.intro" placeholder="介绍"></el-input>
                    </li>
                    <!-- <li>
                        <span class="leftTitle">课程目标</span>
                        <el-input  type="textarea" v-model="courseInstance.courseGoalDesc" placeholder="介绍"></el-input>
                        <span>{{courseInstance.courseGoalDesc}}</span>
                    </li> -->
                    <li>
                        <span class="leftTitle">教学类型</span>
                        <span>{{courseInstance.teachingTypeName}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">周学时</span>
                        <span>{{courseInstance.hoursOfWeek}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">学分</span>
                        <span>{{courseInstance.grade}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">起止时间</span>
                        <span>{{dateFormate(new Date(courseInstance.startYear))}}</span>~<span>{{dateFormate(new Date(courseInstance.endYear))}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">学期</span>
                        <span>{{courseInstance.semester}}</span>
                    </li>
                    
                    <li>
                        <span class="leftTitle">创建时间</span>
                        <span>{{dateTimeFormate(new Date(courseInstance.createTime))}}</span>
                    </li>
                    <li v-if="ishas">
                        <span class="leftTitle">编程语言</span>
                        <span v-for="(language,index) in languageList" :key="index">&nbsp;{{language}}
                            <span v-if="index!=languageList.length-1">、</span>&nbsp;
                        </span>
                        <!-- <div style="display: inline-block">
                            <el-checkbox-group v-model="checkLanguage">
                                <el-checkbox v-for="(language, index) in allLanguage" :key="index" :label="language.name">{{language.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div> -->
                    </li>
                   
                </ul>
                <div class=" saveInfobtn">
                    <a class="tcolors-bg" href="javascript:void(0);" @click="isEdit=!isEdit">返 回</a>
                    <a class="tcolors-bg" href="javascript:void(0);" @click="saveInfo">保 存</a>
                </div>
            </section>
        </div>
        <!-- 展示 -->
        <div v-show="!isEdit" class="tcommonBox">
            <header>
                <h1>
                        课程介绍
                    <span class="gotoEdit" @click="isedit()"><i class="fa fa-wa fa-edit"></i>编辑</span>
                </h1>

            </header>
            <section>
                <ul class="userInfoBox">
                    <li class="avatarlist">
                        <span class="leftTitle">封面</span>
                        <div class="avatar-uploader">
                            <el-avatar :size="90" :src="courseInstance.image" > </el-avatar>
                        </div>
                    </li>
                    <!-- <li>
                        <span class="leftTitle">编号</span>
                        <span>{{courseInstance.id}}</span>
                    </li> -->
                    <li class="username">
                        <span class="leftTitle">课程名</span>
                        <span>{{courseInstance.courseName}}</span>
                    </li>
                    <!-- <li>
                        <span class="leftTitle">教师</span>
                        <span>{{courseInstance.teacherName}}</span>
                    </li> -->
                    <li>
                        <span class="leftTitle">课程介绍</span>
                        <span>{{courseInstance.intro}}</span>
                    </li>
                     <!-- <li>
                        <span class="leftTitle">课程目标</span>
                        <span>{{courseInstance.courseGoalDesc}}</span>
                    </li> -->
                    <li>
                        <span class="leftTitle">教学类型</span>
                        <span>{{courseInstance.teachingTypeName}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">周学时</span>
                        <span>{{courseInstance.hoursOfWeek}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">学分</span>
                        <span>{{courseInstance.grade}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">起止时间</span>
                        <span>{{dateFormate(new Date(courseInstance.startYear))}}</span>~<span>{{dateFormate(new Date(courseInstance.endYear))}}</span>
                    </li>
                    <li>
                        <span class="leftTitle">学期</span>
                        <span>{{courseInstance.semester}}</span>
                    </li>
                    
                    <li>
                        <span class="leftTitle">创建时间</span>
                        <span>{{dateTimeFormate(new Date(courseInstance.createTime))}}</span>
                    </li>
                    <li v-if="ishas">
                        <span class="leftTitle">编程语言</span>
                        <span v-for="(language,index) in languageList" :key="index">&nbsp;{{language}}
                            <span v-if="index!=languageList.length-1">、</span>&nbsp;
                        </span>
                    </li>
                    <!-- <li>
                        <span class="leftTitle">课程题型</span>
                        <span v-for="(problemType,index) in courseProblemTypeList" :key="index">&nbsp;{{problemType}}
                            <span v-if="index!=courseProblemTypeList.length-1">、</span>&nbsp;
                        </span>
                        &nbsp;&nbsp;
                        <el-button type="info" icon="el-icon-edit" @click="dialogTableVisible = true" size="mini" style="margin-left: 3vh">编辑</el-button>
                        
                    </li> -->
                </ul>
                <el-dialog title="修改课程题型 " :visible.sync="dialogTableVisible">
                    <el-checkbox-group v-model="courseProblem">
                      <el-checkbox label="单选题"></el-checkbox>
                      <el-checkbox label="多选题"></el-checkbox>
                      <el-checkbox label="判断题"></el-checkbox>
                      <el-checkbox label="填空题"></el-checkbox>
                      <el-checkbox label="应用题"></el-checkbox>
                      <el-checkbox label="简答题"></el-checkbox>
                      <el-checkbox label="编程题"></el-checkbox>
                      <el-checkbox label="讨论题"></el-checkbox>
                      <el-checkbox label="实践题"></el-checkbox>
                    </el-checkbox-group>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="visable">取 消</el-button>
                        <el-button type="primary" @click="update">确定</el-button>
                    </span>
                </el-dialog>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            courseInstance:{}, //一个课程实例
            isEdit:false,
            dialogTableVisible: false,
            courseProblem: [],
            problemList: [],
            ishas: false,
            languageList: [],
            allLanguage: [],
            checkLanguage: [],
        }
    },
    mounted(){
        this.findACourseInstance();
        this.findAllLanguage();
    },
    computed: {
    //   courseProblemTypeList() {
    //     this.courseProblem = this.$store.state.course.courseProblemTypeList;
    //     return this.$store.state.course.courseProblemTypeList;
    //   },
     },
    methods:{
        isedit() {
            this.isEdit= true
            this.checkLanguage = this.languageList
        },
        //上传成功
        handleAvatarSuccess(res, file) {
            console.log("上传成功的回调",res);
            if(res.ok){
                this.courseInstance.image = res.data;
            }
        },
        beforeAvatarUpload(file) {
            console.log("提交之前",file.type)
            const isJPG = file.type === 'image/jpeg'||'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
            //return false;
        },
        //获取课程实例详情
        findACourseInstance(){
          this.$api.course.cinstance.findCourseInstance({id: this.$store.state.course.courseCinstanceId}).then((res) => {
            this.courseInstance = res.data;
            console.log(this.courseInstance);
            this.findCinstanceProblem(this.courseInstance.courseId);
            this.findCinstanceLanguage(this.courseInstance.id);
          }).catch(err =>{
            this.courseInstance = {};
          })
        },
        // 获取课程题型
        findCinstanceProblem(id) {
            this.$api.course.courseProblemType.findCourseProblemType(id).then( res => {
                this.problemList = res.data
                if(this.problemList.indexOf("编程题")!= -1) {
                    this.ishas = true
                }
            })
        },
        // 获取所有编程语言
        findAllLanguage() {
            this.$api.course.language.findAllLanguage().then( res => {
                this.allLanguage = res.data
            })
        },
        // 获取课程编程语言
        findCinstanceLanguage(id) {
            this.$api.course.language.findCinstanceLanguage({cid: id}).then( res => {
                this.languageList = res.data
            })
        },
        // 修改课程编程语言
        updateCinstanceLanguage() {
            let cinstanceLanguage = []
            for (let index = 0; index < this.checkLanguage.length; index++) {
                for (let i = 0; i < this.allLanguage.length; i++) {
                if(this.checkLanguage[index] == this.allLanguage[i].name) {
                    cinstanceLanguage.push({cinstanceId: this.courseInstance.id, languageId: this.allLanguage[i].id})
                }
                }
            }
            console.log(cinstanceLanguage);
            this.$api.course.language.updateCinstanceLanguage(cinstanceLanguage).then( res => {
                if(res.msg=="修改成功") {
                    this.succMsg('修改成功')
                    this.findACourseInstance()
                }
            })
        },
        //修改课程实例
        saveInfo(){
            if(this.checkLanguage.length == 0) {
                this.$warnMsg("编程语言不能为空")
                return
            }
            console.log("修改",this.courseInstance);
            this.$api.course.cinstance.updateInstance(this.courseInstance).then((res) => {
                // this.findACourseInstance();
                // this.Msg(res.data);
                // this.updateCinstanceLanguage()
                this.isEdit = !this.isEdit; //修改为查看状态，关闭修改状态
            })
            
        },
        visable() {
            this.dialogTableVisible = false;
        },
        update() {
            //更新、修改课程实例题型
            var courseProblemType = [];
            for(var key in this.courseProblem) {
                if(this.courseProblem[key]=='单选题') {
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:1})
                }else if (this.courseProblem[key]=='多选题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:2})
                }else if (this.courseProblem[key]=='判断题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:3})
                }else if (this.courseProblem[key]=='填空题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:4})
                }else if (this.courseProblem[key]=='应用题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:5})
                }else if (this.courseProblem[key]=='简答题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:6})
                }else if (this.courseProblem[key]=='编程题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:7})
                }else if (this.courseProblem[key]=='讨论题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:8})
                }else if (this.courseProblem[key]=='实践题'){
                courseProblemType.push({course_id:this.courseInstance.id,problem_type_id:9})
                }
            }
            console.log(courseProblemType);
            this.$api.course.courseProblemType.updateCourseProblemType(courseProblemType).then((res) => {
                this.succMsg(res.msg)
                this.dialogTableVisible = false;
                this.$api.course.courseProblemType.findCourseProblemType(this.courseInstance.id).then((res1) => {
                    this.$store.commit("setcourseProblemTypeList", res1.data);
                })
          })
        }
    }
}
</script>
<style scoped>
.tcommonBox{
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    position: relative;
    background: #fff;
    padding:15px;
    border-radius: 5px;
    font-size: 15px;
    text-align: left;
    margin-top: 5px;
}
.el-textarea__inner:focus{
    border-color: #14889a;
}
.el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input__inner:focus {
    border-color: #14889a;
}
.el-select .el-input.is-focus .el-input__inner:focus{
    border-color: #14889a;
}
.tcommonBox h1 {
    margin: 10px 0;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
}
/* .userInfoBox .avatarlist{
    position: relative;
    text-align: left;
} */
userInfoBox li {
    text-align: left;
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
    top:0;
    left:0;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
.gotoEdit{
    font-size: 15px;
    float:right;
    cursor: pointer;
    color:#999;
}
.gotoEdit:hover {
    color:#333;
}
/*个人设置*/

.userInfoBox .leftTitle{
    display: inline-block;
    width:100px;
    padding: 10px 0;
}
.userInfoBox .rightInner{
    display: inline-block;
    max-width: calc(100% - 140px);
    vertical-align: top;
}
.userInfoBox li{
    padding:10px;
    border-bottom: 1px solid #ddd;
}
.userInfoBox li:last-child{
    border-bottom: 1px solid transparent;
}
.userInfoBox  .el-input,.userInfoBox  .el-textarea{
    max-width:300px;
    min-width: 100px;
}

.userInfoBox .el-input__inner{
    border-radius: 4px;
}
.userInfoBox  .el-textarea{
    vertical-align: top;
}
.saveInfobtn{
    margin: 20px 0;
    text-align: center;
}
.saveInfobtn a{
    color:#000;
    padding:6px 20px;
    margin:5px 10px;
    border-radius: 5px;
    font-size: 14px;
}
.userInfoBox .fa-asterisk{
    color: #DF2050;
}
</style>