<template>
    <div style="margin-top:2vh; margin-bottom:30vh; text-align:left; padding-left:20px;" >
        <!-- 选择题{{courseId}} -->
        <el-button type="primary" @click="$refs.addDialog.changeDialogVisible()">新增题目</el-button>
        <el-button type="primary" @click="$refs.useractionLog.changedialogVisible()" :courseId.sync="courseId" v-if="haveValue">操作记录</el-button>
        <!-- <router-link class="addbtn"  :to="{path: '/problemBank/ChoiceExcel', query: {courseId: courseId}}">导入导出文件</router-link> -->
        <add-dialog :courseId="courseId" ref="addDialog" updateList="updateList"></add-dialog>
        <choice-pro-list :courseId.sync="courseId" ref="listDialog" v-if="haveValue" > </choice-pro-list>
        <choice-problem-actionLog ref="useractionLog" :courseId="courseId" ></choice-problem-actionLog>
    </div>
</template>
<script>
import addDialog from './ChoiceProblemAdd' //增加的弹框
import choiceProList from './ChoiceProblemList' //选择题列表
import ChoiceProblemActionLog from './ChoiceProblemActionLog'
export default {
    components:{addDialog,choiceProList,ChoiceProblemActionLog},
    data() {
        return {    
          courseId: null,
          haveValue: false
        //   currentProblem:null, //当前问题 传给修改的子组件
        }
    },
    created(){
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
        
    }
}
</script>
<style scoped>
.addbtn {
    
    /* display: inline-block; */
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: rgb(255, 255, 255);
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
.el-button--primary {
    color: #FFF;
    background-color: #14889a;
    border-color: #14889a;
}
.el-button--primary:hover {
  background-color: #61b6c4;
  border-color: #61b6c4;
}
.el-button--primary:focus {
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--default:hover {
  color: #14889a;
  border-color: #14889a;
}
</style>