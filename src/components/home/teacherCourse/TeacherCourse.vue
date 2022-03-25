<template>
  <div class="parent">
    <div>
      <!-- 添加课程的弹框 -->
      <el-button type="primary" @click="visable">添加课程</el-button>

      <el-dialog title="添加课程 " :visible.sync="adddialogVisible">
        <el-form :model="course">
          <el-form-item label="课程名称" :label-width="formLabelWidth">
            <div @mouseenter="showHide()" @mouseleave="hideHide()">
              <el-input v-model="course.name" autocomplete="off"></el-input>
              <div v-show="isshow == true">
                <el-table :data="allCourseInfo" :max-height="hight">
                  <el-table-column type="index" :index="indexMethod">
                  </el-table-column>
                  <el-table-column prop="name" label="已有课程" width="180">
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="180"
                  >
                  </el-table-column>
                </el-table>
                <!-- <span>已有课程：</span>
                  <p v-for=" item in allCourseInfo" :key="item.name">{{item.name}}</p> -->
              </div>
            </div>
          </el-form-item>
          <el-form-item label="课程类型" :label-width="formLabelWidth">
            <el-select v-model="type1" placeholder="请选择课程类型">
              <el-option value="数学类">数学类</el-option>
              <el-option value="算法类">算法类</el-option>
              <el-option value="程序设计类">程序设计类</el-option>
              <el-option value="人工智能类">人工智能类</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选修类型" :label-width="formLabelWidth">
            <el-select v-model="type2" placeholder="请选择选修类型">
              <el-option value="必修课">必修课</el-option>
              <el-option value="选修课">选修课</el-option>
              <el-option value="限选课">限选课</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选课层次" :label-width="formLabelWidth">
            <el-select v-model="level" placeholder="请选择课程层次">
              <el-option value="幼儿园">幼儿园</el-option>
              <el-option value="小学">小学</el-option>
              <el-option value="初中">初中</el-option>
              <el-option value="高中">高中</el-option>
              <el-option value="专科">专科</el-option>
              <el-option value="本科">本科</el-option>
              <el-option value="硕士研究生">硕士研究生</el-option>
              <el-option value="博士研究生">博士研究生</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
        </div> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="visable">取 消</el-button>
          <el-button type="primary" @click="add()">确定</el-button>
        </span>
      </el-dialog>

      <el-divider></el-divider>

      <el-button
        @click="changevisable"
        type="primary"
        v-if="hasKey('home:teacherCourse:add')"
        >开设课程</el-button
      >
      <!-- <el-button @click="changeLogVisable()" type="info">课程实例记录</el-button> -->
      <!-- 添加课程实例的弹框 -->
      <add-course ref="addCourse"></add-course>
      <!-- 添加课程实例的记录 -->
      <addCourseCinstanceLog
        ref="AddCourseCinstanceLog"
      ></addCourseCinstanceLog>
    </div>
    <div>
      <!-- <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>即将开始课程</span>
                    <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'课程 ' + o }}
                </div>
            </el-card>

            
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>正在进行课程</span>
                    <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'课程 ' + o }}
                </div>
            </el-card>

            <el-card class="box-card" v-loading="loading">
                <div slot="header" class="clearfix">
                    <span>已完成课程</span>
                    <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button>
                </div>
                <div v-for="course in courses" :key="course.id" class="text item">
                    {{ course.name }} 
                    <router-link :to="{path:'knowledge',query:{courseid:course.id,:course.name}}" append>图谱编辑</router-link>
                    <router-link :to="'auditKnowledge'" append>图谱审核</router-link>
                    <router-link :to="{name:'course',params:{'courseid':course.id}}" append>教学编辑</router-link>
                    <router-link to="knowledge" append>题库编辑</router-link>
                </div>
            </el-card> -->

      <el-card class="box-card" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>课程实例</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button> -->
        </div>
        <div class="griddiv">
          <!--  @click="toOtherPath('/course', course.id)" -->
          <div
            class="grid"
            v-for="course in coursescistance"
            :key="course.id"
            @click="toOtherPath('/course', course.id)"
          >
            <!-- <p class="delete">删除</p> -->
            <!-- <p class="status"> {{coursescistanceStatus(course.isPub)}}</p> -->
            <img :src="course.image" alt="" />

            <div class="gridtext">
              <p>
                {{ course.courseName }}
                <!-- {{ coursescistanceStatus(course.isPub) }} -->
              </p>
              <!-- <router-link
                :to="{
                  path: 'knowledge',
                  query: { courseid: course.courseId, coursename: course.name },
                }"
                append
                >图谱编辑
              </router-link>
              <router-link
                :to="{ name: 'course', query: { id: course.id } }"
                append
                >教学编辑
              </router-link>
              <router-link 
              :to="{name: 'problemBank', query: {id: course.id} }" 
              append
              >题库编辑</router-link> -->
            </div>
          </div>
          <!-- <div>1</div> -->
        </div>
        <!-- <div v-for="course in coursescistance" :key="course.id" class="text item">
                    <img :src="course.courseImage" />
                    {{ course. }} 
                    <router-link :to="{path:'knowledge',query:{courseid:course.courseId,:course.name}}" append>图谱编辑</router-link>
                    <router-link :to="'auditKnowledge'" append>图谱审核</router-link>
                    <router-link :to="{name:'course',params:{'courseid':course.courseId}}" append>教学编辑</router-link>
                    <router-link to="knowledge" append>题库编辑</router-link>
                   {{coursescistanceStatus(course.isPub)}}
                </div> -->
      </el-card>
      <!-- <el-card class="box-card" v-loading="loading">
                <div slot="header" class="clearfix">
                    <span>审核通过课程</span>
                    <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button>
                </div>
                <div v-for="course in courses" :key="course.id" class="text item">
                    {{ course.name }} 
                    <router-link :to="{path:'knowledge',query:{courseid:course.id,:course.name}}" append>图谱编辑</router-link>
                    <router-link :to="'auditKnowledge'" append>图谱审核</router-link>
                    <router-link :to="{name:'course',params:{'courseid':course.id}}" append>教学编辑</router-link>
                    <router-link to="knowledge" append>题库编辑</router-link>
                </div>
            </el-card> -->
    </div>
    <router-view class="kid"></router-view>
  </div>
</template>
<script>
import addCourse from "./AddCourseCinstance.vue"; //添加课程实例
import AddCourseCinstanceLog from "./AddCourseCinstanceLog.vue"; //添加课程实例的记录
export default {
  components: { addCourse, AddCourseCinstanceLog },
  data() {
    return {
      course: {
        name: null,
        type1Id: null, //课程类型
        type2Id: null, //选课类型
        level: null, //课程层次
        teacherNo: null,
      },
      type1: null,
      type2: null,
      level: null,
      courses: [
        // {
        //     id: 1,
        //     code: null,
        //     name: "C语言程序设计",
        //     type1Id: null,
        //     type2Id: null,
        //     level: null,
        //     kid: null,
        // }
      ],
      //cinstancepub0:[], //待审核课程实例
      //cinstancepub1:[], //审核通过课程实例
      formLabelWidth: "80px",
      adddialogVisible: false,
      coursescistance: [],
      loading: true,
      isshow: false,
      allCourseInfo: [], //所有课程信息
      hight: 150,
      // courseProblemTypeList: [],
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.user.userInfo;
    },
  },
  mounted() {
    this.getcoursescinstance();
    this.getAllCourse();
    // this.getcourses();
  },
  methods: {
    //自增序列
    indexMethod(index) {
      return index + 1;
    },
    //课程实例审核状态
    coursescistanceStatus(ispub) {
      if (ispub === -1) {
        return "未通过";
      }
      if (ispub === 0) return "待审核";
      if (ispub === 1) return "已通过";
    },
    //获取所有课程
    getAllCourse() {
      this.$api.course.course.findAllCourse().then((res) => {
        let result = res.data;
        for (let index = 0; index < res.data.length; index++) {
          result[index].createTime = this.dateTimeFormate(
            new Date(res.data[index].createTime)
          );
        }
        this.allCourseInfo = result;
      });
    },
    //获取所有课程实例
    getcoursescinstance() {
      this.loading = true;
      this.$api.course.cinstance
        .findAllCourseInstance({ teacherNo: this.userinfo.id })
        .then((res) => {
          this.coursescistance = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.coursescistance = [];
        });
    },
    //鼠标移入时显示
    showHide() {
      this.isshow = true;
    },
    //鼠标移出时隐藏
    hideHide() {
      // this.isshow = false
    },
    //添加课程
    add() {
      switch (this.type1) {
        case "数学类":
          this.course.type1Id = 1;
          break;
        case "算法类":
          this.course.type1Id = 2;
          break;
        case "程序设计类":
          this.course.type1Id = 3;
          break;
        case "人工智能类":
          this.course.type1Id = 4;
          break;
      }
      switch (this.type2) {
        case "必修课":
          this.course.type2Id = 1;
          break;
        case "选修课":
          this.course.type2Id = 2;
          break;
        case "限选课":
          this.course.type2Id = 3;
          break;
      }
      switch (this.level) {
        case "幼儿园":
          this.course.level = 1;
          break;
        case "小学":
          this.course.level = 2;
          break;
        case "初中":
          this.course.level = 3;
          break;
        case "高中":
          this.course.level = 4;
          break;
        case "专科":
          this.course.level = 5;
          break;
        case "本科":
          this.course.level = 6;
          break;
        case "硕士研究生":
          this.course.level = 7;
          break;
        case "博士研究生":
          this.course.level = 8;
          break;
      }
      console.log(this.course);
      this.course.teacherNo = this.userinfo.userNo;
      for (let key in this.course) {
        if (this.course[key] == null) {
          this.warnMsg("请填写完整!");
          return;
        }
      }
      console.log(this.course);
      this.$api.course.course
        .add(this.course)
        .then((res) => {
          console.log("添加成功");
          this.$message({
            message: "添加成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("添加失败");
        });
    },
    //改变添加课程shili 的弹框显示 调用子组件
    changevisable() {
      this.$refs.addCourse.changevisable();
    },
    //改变添加课程实例记录的弹框显示
    changeLogVisable() {
      this.$refs.AddCourseCinstanceLog.handleClosecinstanceLogdia();
    },
    visable() {
      this.adddialogVisible = !this.adddialogVisible;
    },
    toOtherPath(path, id) {
      // this.$api.course.courseProblemType.findCourseProblemType(id).then((res1) => {
      //   this.$store.commit("setcourseProblemTypeList", res1.data);
      // })
      this.$router.push({
        path: path,
        query: {
          id: id,
        },
      });
    },
  },
};
</script>
<style >

.box-card {
  margin-top: 10px;
  text-align: left;
  background-color: #f7f7f7;
}
.parent {
  position: relative;
  text-align: left;
  padding-top: 20px;
}
.kid {
  position: absolute;
  top: 20px;
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5vh;
}
.griddiv {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(auto-fill, 200px);
  grid-row-gap: 30px; /* 行间距 */
  grid-column-gap: 50px; /* 列间距 */
}
.grid {
  position: relative;
  min-height: 200px;
  min-width: 250px;
  border: 15px solid #f3f4f6;
  /* box-shadow: 5px 5px 16px 0 rgba(0,0,0,0.2); */
  overflow: hidden;
  transition: all ease-in 1s;
}
.grid:hover {
  /* box-shadow: 15px 10px 16px 0 rgba(0,0,0,0.3); */
  box-shadow: 5px 4px 16px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
.grid .delete {
  font-weight: 700;
  cursor: pointer;
  top: 4px;
  left: 4px;
  position: absolute;
  display: none;
}
.grid .status {
  font-weight: 700;
  /* cursor: pointer; */
  top: 4px;
  right: 4px;
  position: absolute;
}
.grid img {
  z-index: 1;
  width: 100%;
  height: 100%;
}
.gridtext {
  position: absolute;
  /* z-index:2; */
  width: 100%;
  bottom: 0;
  /* padding: 5px; */
  background-color: rgba(255, 255, 255, 0.473);
  padding: 5px 0;
  font-weight: 500;
  color: rgb(255, 255, 255);
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.gridtext a {
  color: #000;
  font-size: 0.9em;
  font-weight: 700;
  font-family: "宋体", "Times New Roman", Times, serif;
}
.grid:hover .delete {
  display: block;
}
</style>