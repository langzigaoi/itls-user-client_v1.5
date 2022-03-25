<template> <!-- 添加课程实例的弹框 -->
    <div class="container1">
       <el-dialog
            title="添加课程实例"
            :visible.sync="addcoursedialogVisible"
            top="0"
           >
        <el-form ref="form"  :model="cinstance" label-width="80px">

          <el-row  type="flex" style="margin-left:10%; " >
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <el-form-item label="课程名">
                    <el-select v-model="cinstance.courseId" filterable placeholder="请选择" @change="courseChange   ">
                      <el-option
                        v-for="item in courseList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="20"><div class="grid-content bg-purple">
                  <el-form-item label="教学类型">
                    <el-select v-model="cinstance.teachingTypeId" filterable placeholder="请选择">
                        <el-option
                        v-for="item in techinggoalList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
          </el-row> 

          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-form-item label="学期">
                        <el-select v-model="cinstance.semester" filterable placeholder="请选择">
                            <el-option
                            v-for="item in semester"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-form-item label="周学时">
                        <el-input v-model="cinstance.hoursOfWeek" placeholder="请输入整数" style="width:100%"></el-input>
                    </el-form-item>
                </div>
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                    <el-form-item label="学分">
                      <el-input v-model="cinstance.grade" placeholder="请输入整数"></el-input>
                    </el-form-item>
                </div>
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="起止时间">
                    <el-date-picker
                        v-model="daterange"
                        type="daterange"
                        @change="selectTimeRang"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    <!-- <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="cinstance.startYear" ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" start-placeholder="2020-02-10" v-model="cinstance.endYear" ></el-date-picker>
                    </el-col> -->
                  </el-form-item>
                </div>
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                  <el-form-item label="课程介绍">
                    <el-input type="textarea" rows="4" v-model="cinstance.intro"></el-input>
                  </el-form-item>
                </div>
              </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="20">
                <div class="grid-content bg-purple">
                   <el-form-item label="课程目标">
                      <el-input type="textarea" rows="4" v-model="cinstance.courseGoalDesc"></el-input>
                   </el-form-item>
                </div>
              </el-col>
          </el-row>
          <el-row type="flex"  style="margin-left: 10%">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="编程题">
                  <div style="width: 120px">
                    <el-radio v-model="cinstance.isProgram" label=0>否</el-radio>
                    <el-radio v-model="cinstance.isProgram" label=1>是</el-radio>
                  </div>
                  
                </el-form-item>
              </div>
              <div v-if="cinstance.isProgram==1" style="width: 400px">
                <el-form-item label="请选择">
                  <el-checkbox-group v-model="checkLanguage">
                    <el-checkbox v-for="(language, index) in allLanguage" :key="index" :label="language.id">{{language.name}}</el-checkbox>
                、</el-checkbox-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" style="margin-left: 10%">
              <el-col :span="6">
                <div class="grid-content bg-purple" >
                  <el-form-item label="图片">
                     <!--   图片{{userinfo}} -->
                    <el-upload
                          class="avatar-uploader"
                          :action="uploadimgurl"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          name="image"
                          with-credentials
                          :before-upload="beforeAvatarUpload">
                          <img v-if="cinstance.image" :src="cinstance.image" style="max-width:200px" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon " style="min-width:100px;border:1px solid #ccc;min-height:100px;line-height:100px" ></i>
                      </el-upload>                                                         
                  </el-form-item>
                </div>
              </el-col>
          </el-row>
               
            
            
           
            <!-- <el-form-item label="主讲人">
                <el-input v-model="cinstance.lecturer"></el-input>
            </el-form-item>
            <el-form-item label="教师id">
                <el-input v-model="cinstance.teacherNo"></el-input>
            </el-form-item> -->
            
            
            
            
            <!-- <el-form-item>
                <el-button type="primary" @click="submit()">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item> -->
        </el-form>

        <el-row type="flex" class="row-bg last-row" justify="center">
          <el-col :span="6">
            <div class="grid-content bg-purple">
            <div slot="footer" class="dialog-footer" style="width: 400px">
              <el-button @click="changevisable">取 消</el-button>
              <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
            </div>
          </el-col>
        </el-row>
        
    </el-dialog>
    
    
    </div>
</template>
<script>
import { baseUrl } from '@/utils/global'
export default {
    data() {
        return {
           // datePickerTime:null,
           uploadimgurl :'',
            daterange:null,
            addcoursedialogVisible:false,
            semester:[
                  {
                    id: 1,
                    name: "第一学期"
                    },
                     {
                    id: 2,
                    name: "第二学期"
                    },
            ], //学期
            techinggoalList:[], //教学目标
            courseList:[], //所有课程
            cinstance:{ //课程实例
                courseId:null,
                teachingTypeId:null,
                hoursOfWeek:null,
                grade:null,
                lecturer:null,
                teacherNo:null,
                startYear:null,
                endYear:null,
                semester:null,
                intro:null,
                image:null,
                courseGoalDesc:null,// 课程目标
                isProgram: -1, //判断是否有编程题
            }, 
            courseProblemTypeList: [],//课程题型
            courseCinstanceId: -1,
            allLanguage: [],
            checkLanguage: [],
        }
    },
     computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    mounted(){
        this.getAllCourse();
        this.getAllTechgoal();
        console.log("baseUrl",baseUrl);
        this.uploadimgurl=`${baseUrl}/OssUpload/image`
        this.findAllLanguage()
    },
    methods:{
        selectTimeRang(dateRange){
            this.cinstance.startYear = dateRange[0];
            this.cinstance.endYear = dateRange[1];
            console.log(dateRange)
        },
        // 获取所有编程语言
        findAllLanguage() {
            this.$api.course.language.findAllLanguage().then( res => {
                this.allLanguage = res.data
            })
        },
        //改变添加课程的弹框显示
        changevisable(){
            this.addcoursedialogVisible = !this.addcoursedialogVisible;
            this.checkLanguage = []
        },
        getAllCourse(){
          this.$api.course.course.findAllCourse().then((res) => {
            this.courseList = res.data;
          }).catch(err =>{
            this.courseList = [];
          })
        },
        //获取所有教学目标
        getAllTechgoal(){
          this.$api.metadata.type.findAll().then((res) => {
            this.techinggoalList = res.data;
          }).catch(err =>{
            this.techinggoalList = [];
          })
        },
        //选择了课程，把课程图片显示出来
        courseChange(value){
            console.log("选中课程"+value);
            for(let i=0;i<this.courseList.length; i++){
                console.log(this.courseList[i])
                if(this.courseList[i].id === value){
                    // this.cinstance.image =this.courseList[i].image;
                }
            }
        },
        // 添加课程编程语言
        addCinstanceLanguage(id) {
            let cinstanceLanguage = []
            for (let index = 0; index < this.checkLanguage.length; index++) {
                cinstanceLanguage.push({cinstanceId: id, languageId: this.checkLanguage[index]})
            }
            console.log(cinstanceLanguage);
            this.$api.course.language.addCinstanceLanguage(cinstanceLanguage).then( res => {
                if(res.msg=="添加成功") {
                    this.succMsg('添加成功')
                }
            })
        },
        //提交
        submit(){
            this.cinstance.lecturer = this.userinfo.userNo;
            this.cinstance.teacherNo = this.userinfo.id;
            for(let key  in this.cinstance){
                     console.log(key)
                    console.log(this.cinstance[key])
                    if(this.cinstance[key]==null ||this.cinstance[key]==-1){
                        this.warnMsg("请填写完整！");
                        return 
                    }
            }
            if(this.cinstance.isProgram == 1 && this.checkLanguage ==[]) {
              this.warnMsg("请填写完整！");
                        return 
            }
            console.log("填写的信息",this.cinstance);
            this.$api.course.cinstance.add(this.cinstance).then((res) => {
              console.log(res);
              this.courseCinstanceId = res.data.id
              if( res.data.isProgram == 1) {
                this.addCinstanceLanguage(res.data.id);
              }
              //关闭弹框
              this.changevisable();
            })
            
        },
        // addCourseProblemType() {
          
        //   console.log("填写的信息");
        //   var formData = new FormData();
        //   var courseProblemTypeStr = JSON.stringify(courseProblemType)
        //   formData.append("courseProblemType", courseProblemTypeStr)
        //   this.$api.course.courseProblemType.addCourseProblemType(formData).then((res) => {
        //     this.$message.succMsg("创建成功")
        //   }).catch((err) => {
        //   this.$message.error("插入失败")
        //   })
        // },
        //上传成功
        handleAvatarSuccess(res, file) {
            console.log("上传成功的回调",res);
            // if(res.ok){
                this.cinstance.image = res.data;
            // }
        },
        beforeAvatarUpload(file) {
            console.log("提交之前")
            //const isJPG = file.type === 'image/jpeg';
            const isJPG = true;
            const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
    
    }
}
</script>
<style scope>
.el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input__inner:focus {
    border-color: #14889a;
}
.el-select .el-input.is-focus .el-input__inner:focus{
    border-color: #14889a;
}
.el-row{
  border-color: 14889a;
}
.container1{
  /* max-width: 80%; */
  margin:0 auto;
  padding:0 1px;
  
}
.el-row {
    margin-bottom: 0px;
  }
.last-row {
  margin-bottom: 10px;
}
@media screen and  (max-width:800px){
  .container1{
      max-width: 100%!important;
      margin:0 auto;
  }
}
</style>