<template>
    <div style="margin-top:2vh; margin-bottom:30vh; text-align:left; padding-left:20px;">
        <!-- 编程题{{courseId}} -->
        <el-button @click="$refs.addDialog.changeDialogVisible()">新增题目</el-button>
        <el-button @click="$refs.useractionLog.changedialogVisible()">操作记录</el-button>
        <!-- <router-link class="addbtn"  :to="{path: '/problemBank/ProgExcel', query: {courseId: courseId}}">导入导出文件</router-link> -->
        <add-dialog :courseId="courseId" ref="addDialog" updateList="updateList"></add-dialog>
        <prog-pro-list ref="listDialog" :courseId.sync="courseId" v-if="haveValue"  > </prog-pro-list>
        <check-dialog :problemProgFormal="currentProblem" :courseId="courseId" @updateList="updateList"  ref="checkDialog"></check-dialog>
        <prog-problem-actionLog ref="useractionLog"></prog-problem-actionLog>
        
    </div>
</template>
<script>
import addDialog from './ProgProblemAdd' //增加的弹框
import progProList from './ProgProblemList' //选择题列表
import checkDialog from './ProgProblemCheck' // 查看题目
import ProgProblemActionLog from './ProgProblemActionLog'
export default {
    components:{addDialog,progProList,checkDialog,ProgProblemActionLog},
    data() {
        return {    
          courseId:"",
          currentProblem:null, //当前问题 传给修改的子组件
        }
    },
    mounted(){
        this.getcourseId(this.$store.state.course.courseCinstanceId); //先通过课程实例id查课程id 
    },
    methods:{

        //通过课程实例id查课程id 
        async getcourseId(cinstanceId){
            this.$api.course.cinstance.findCourseInstance({id: cinstanceId}).then((res) => {
            this.courseId = res.data.courseId;
            if (this.courseId !== null) {
                this.haveValue = true
            }
            console.log(this.courseId);
          }).catch(err =>{
            this.courseInstance = {};
          })
        },
        // //通过课程实例id查课程id 
        // getcourseId(cinstanceId){
        //   this.$api.course.cinstance.findCourseInstance({id: cinstanceId}).then((res) => {
        //     this.courseId = res.data.courseId;
        //     console.log(this,courseId);
        //   }).catch(err =>{
        //     this.courseInstance = {};
        //   })
        // },
        //写好给list子组件调用的 list把要修改的题目传给alter组建
        changeAlterAProblemDialogVisible(problem){
            this.currentProblem = problem;
            this.$refs.alterDialog.changeAlterAProblemDialogVisible()
        },
        checkAlterAProblemDialogVisible(problem){
            this.currentProblem = problem;
            this.$refs.checkDialog.checkAlterAProblemDialogVisible()
        },
        //写好给alter组建调用的 later成功后要刷新list列表
        updateList(){
            console.log("调用刷新列表")
            this.$refs.listDialog.getAllList();
        },

        
    }
}
</script>
<style scoped>
.addbtn {
    
    /* display: inline-block; */
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    float: left;
    
}
</style>