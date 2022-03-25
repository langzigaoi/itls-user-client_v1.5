<template>
  <el-dialog
    top="5vh"
    align="left"
    title=""
    :visible.sync="diaVisible"
    :append-to-body="true"
    :destroy-on-close="true"
    width="80%"
    style=""
  >
  <div style=" margin-left: 10px;">
      <!-- <el-page-header @back="goBack" class="header"></el-page-header> -->
        <header align="left" class="altertest">测验预览和修改</header>
        <el-form ref="form" :inline="true" :model="cInstanceSectionTest" label-width="100px">
            <div class="grid-content bg-purple" align="left">
              <el-form-item label="开始时间">
                <el-date-picker v-model="cInstanceSectionTest.startTime" type="datetime"  placeholder="选择开始时间"> </el-date-picker>
              </el-form-item>
              <el-form-item label="截至时间">
                <el-date-picker v-model="cInstanceSectionTest.endTime" type="datetime"  placeholder="选择截至时间"> </el-date-picker>
              </el-form-item>
              <el-form-item label="发布成绩时间">
                <el-date-picker v-model="cInstanceSectionTest.pubGradeTime" type="datetime"  placeholder="选择发布时间"> </el-date-picker>
              </el-form-item>
              
              <el-form-item label="标题">
                  <el-input  v-model="cInstanceSectionTest.title"></el-input>
              </el-form-item>
              <el-form-item>
                  <!-- <el-button @click="update" type="primary" :disabled="cInstanceSectionTest.isPub">修改</el-button> -->
                  <el-button type="danger" @click="deleteTest">删除</el-button>
                  <!-- <el-button type="danger" @click="changeAddProblemdialogVisible" :disabled="cInstanceSectionTest.isPub">添加</el-button> -->
                  <el-button type="success" @click="release" :disabled="cInstanceSectionTest.isPub == 1">发布</el-button>
              </el-form-item>
           
          </div>
        </el-form>
        <!-- .slice((currentPage-1)*pageSize,currentPage*pageSize) -->
        <el-table  :data="cInstanceSectionTest.listCInstanceSectionTestProblem.slice((currentPage-1)*pageSize,currentPage*pageSize)"  height="400" border style="overflow: scroll;width: 100%;" >
          <el-table-column type="index" label="ID" width="60"> </el-table-column>
          <el-table-column prop="problemChoice.title" label="题干" width="520"> </el-table-column>
          <el-table-column  prop="problemChoice.options" label="选项" width="400">
              <template slot-scope="scope">
                    <p>
                       {{scope.row.problemChoice.options.split("@").join(" ")}}
                    </p>
                </template>   
          </el-table-column>
          <el-table-column prop="problemChoice.answer" label="答案" width="120">
                <!-- <template slot-scope="scope">
                  {{JSON.parse(scope.row.problemChoice.options)[scope.row.problemChoice.answer].option}}
              </template>    -->
          </el-table-column> 
          <!-- <el-table-column prop="problemChoice.analysis" label="解析" width="120"> </el-table-column>  -->
          <!-- <el-table-column prop="problemChoice.difficulty" label="难度" width="120"> </el-table-column>  -->
          <el-table-column label="操作" width="240">
              <template slot-scope="scope">
                  <el-button @click="getProInfo(scope.$index)"  size="mini" type="primary">查看</el-button>
                  <el-button @click="deleteAProblem(scope.row.problemChoice.id)"  size="mini" type="danger" :disabled="cInstanceSectionTest.isPub == 1">删除</el-button>

              </template>
          </el-table-column>
      </el-table>
      <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :page-count="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="cInstanceSectionTest.listCInstanceSectionTestProblem.length"
    >
    </el-pagination>
     
      <el-dialog title="题目详情" :append-to-body="true" :visible.sync="optiondetails" width="60%">
        <span>题目：{{this.opdetail.title}}</span><br><br>
        <span>选项：{{this.opdetail.options}}</span>
      </el-dialog>


      <el-dialog title="添加题目"  :visible.sync="addProblemdialogVisible" width="60%" align="left">
        <!-- <div >每题的分数  <el-input style="width:100px" v-model="addGrades"></el-input></div> -->
        请选择知识点
        <el-select style="width:500px;height:100%" v-model="aaa" multiple @change="selectProblemChoice" placeholder="请选择知识点">
            <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
        <el-table  :data="problemList" @selection-change="handleSelectionChange" border style="overflow: scroll;width: 100%;height:300px" v-loading="loading">
            <el-table-column type="selection" width="80"> </el-table-column>
            <el-table-column prop="title" label="题干" width="300"> </el-table-column>
            <el-table-column prop="options" label="选项" width="320">
                <!-- <template slot-scope="scope">
                    <p v-for="(option,index) in JSON.parse(scope.row.options)" :key="option.id">
                      {{String.fromCharCode(index+65)}}<span style="font-weight:700">:</span>{{option.option}}
                    </p>
                </template>    -->
            </el-table-column>
            <el-table-column prop="answer" label="答案" width="190">
                 <!-- <template slot-scope="scope">
                    {{JSON.parse(scope.row.options)[scope.row.answer].option}}
                </template>    -->
            </el-table-column> 
            <el-table-column prop="analysis" label="解析" width="190"> </el-table-column> 
            <el-table-column prop="difficulty" label="难度" width="120"> </el-table-column> 
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addProblemdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProblem">确 定</el-button>
        </span>
      </el-dialog>
  </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AlterCourseTest",
  data() {
    return {
      diaVisible:false,
      loading:false,
      optiondetails:false,
      aaa:'',
      knowledges:[],
      cInstanceSectionTest:{}, //获取到的测试详情
      addProblemdialogVisible:false, //控制添加题目的弹框出现与否
      selectedPproblemList:[],
      problemList:[], //添加题目是获取到的题目列表
      addGrades:'', //添加题目的的每题分数
      currentPage: 1, // 当前是第几页
      pageCount: 0,
      pageSize: 10, // 每一页的大小
      opdetail:{},
    }
  },
  mounted(){
    //  let sectionId = this.$route.query.sectionId;
    //  console.log("节的id",sectionId)
    //  if(!sectionId){this.errMsg("路径非法");this.$router.go(-1);return;}
    //  this.cInstanceSectionTest.sectionId = sectionId;
    //  this.getAllKnowledge();
    //  this.selectCInstanceSectionTestBySectionId();
  },
  methods:{
    changeDialogVisible(id) {
    this.diaVisible = !this.diaVisible;
    this.cInstanceSectionTest.sectionId = id;
    this.getAllKnowledge();
    this.selectCInstanceSectionTestBySectionId();
      
    },

    getProInfo(index){
      this.opdetail.title = this.cInstanceSectionTest.listCInstanceSectionTestProblem[index].problemChoice.title;
      this.opdetail.options = this.cInstanceSectionTest.listCInstanceSectionTestProblem[index].problemChoice.options.split("@").join(" ");
      this.optiondetails = !this.optiondetails;
    },
    changeAddProblemdialogVisible(){
      this.addProblemdialogVisible = !this.addProblemdialogVisible;
    },
    //获取测试详情
    selectCInstanceSectionTestBySectionId(){
       this.$api.course.sectiontest.selectCInstanceSectionTestBySectionId({ sectionId: this.cInstanceSectionTest.sectionId })
       .then(res =>{
         console.log(res);
         this.cInstanceSectionTest = res.data;
         this.pageCount = this.cInstanceSectionTest.listCInstanceSectionTestProblem.length / this.pageSize;
         this.handleCurrentChange(1);
       })
    },
    //获取所有的知识点
    getAllKnowledge(){
      this.$api.knowledge.knowledge.selectByDeep({deep: 3}).then((res) => {
        // console.log(res);
        this.knowledges = res.data;
        //转换数据进行显示
        this.knowledges.forEach(element => {
            element.id = element.id.toString(); //转成字符类型 el-select 初始值设置问题
        });
        })
    },
    //获取知识点对应的题目
    selectProblemChoice(ids) {
      console.log(ids);
      ids = ids.toString();
      this.loading = true;
       this.$api.problem.choice.findProblemChoice({node:ids}).then((res) => {
         console.log("获取到的题目",res);
         this.problemList = res.data;
         this.loading = false;
        }).catch(err =>{
          this.loading = false;
        })
    },
    //选择题目改变
    handleSelectionChange(val){
      console.log("选择的题目改变",val);
      this.selectedPproblemList= val;
    },
    //在弹框中确认添加题目
    addProblem(){
      if(isNaN(this.addGrades) ||!this.addGrades){
        this.errMsg("分值填写有误");
        return
      }
      // console.log("要添加的题目",this.selectedPproblemList);
      var problemList = [];
      for(let i=0; i<this.selectedPproblemList.length; i++){
        let problem = {
          choiceProblemId:'',
          grades:0,
          testId:this.cInstanceSectionTest.id,
        }
        problem.choiceProblemId = this.selectedPproblemList[i].id;
        // problem.grades = this.addGrades;
        problem.grades = 10;
        problemList.push(problem)
      }
      console.log("要添加的题目",problemList);
      this.$api.course.sectiontest.insertProblemList(problemList)
      .then((res) => {
         this.Msg(res.msg);
         if(res.code=200){
          this.changeAddProblemdialogVisible();
          this.selectCInstanceSectionTestBySectionId()
         }
      });

    },
     //控制当前的每页val条
    handleSizeChange(pagesizes) {
      this.pageSize = pagesizes;
    },
    // 当前val页
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
    },
    //修改测验的信息
    update(){
      if(!this.cInstanceSectionTest.pubGradeTime || !this.cInstanceSectionTest.startTime || !this.cInstanceSectionTest.endTime){
        this.errMsg("请选择时间");
        return
      }

      if((new Date(this.cInstanceSectionTest.startTime)).getTime() > (new Date(this.cInstanceSectionTest.endTime)).getTime()){
        this.errMsg("开始时间晚于结束时间");
        return
      }
      console.log("提交",this.cInstanceSectionTest);
      this.$api.course.sectiontest.update(this.cInstanceSectionTest)
      .then((res) => {
         this.Msg(res.msg);
         if(res.code=200){
           this.selectCInstanceSectionTestBySectionId();
         }
      });
    },
    // 发布测验
    release(){
      //  this.$api.course.sectiontest.updateisPub({sectionId:this.$route.query.sectionId})
       this.$api.course.sectiontest.updateisPub({sectionId:this.cInstanceSectionTest.sectionId})
       .then(res => {
         this.cInstanceSectionTest.isPub = 1;
          this.Msg(res.msg);
          // this.diaVisible = false;
        //  this.$router.push("/course/courseContent");
       })
    },
    //删除测验
    deleteTest(){
      this.cInstanceSectionTest.isdelete = 1;
      this.$api.course.sectiontest.update(this.cInstanceSectionTest)
      .then((res) => {
         this.Msg(res.msg);
         this.diaVisible = false;
        //  if(res.code=200){
        //    this.$router.push("/course/courseContent");
        //  }
      });
    },
    //删除测试的一个题目
    deleteAProblem(testProblemId){
      this.$api.course.sectiontest.deleteAProblem({testId:this.cInstanceSectionTest.id,testProblemId:testProblemId})
      .then((res) => {
         this.Msg(res.msg);
         if(res.code=200){
           this.selectCInstanceSectionTestBySectionId();
         }
      });
    },
     // 返回
    // goBack() {
    //   this.$router.back();
    // },
  }
}
</script>

<style>
.altertest{
  margin: 30px 0 20px 30px;
}
</style>