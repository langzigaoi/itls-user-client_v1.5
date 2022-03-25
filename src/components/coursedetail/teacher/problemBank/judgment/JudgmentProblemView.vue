<template>
  <div style="margin-top:2vh; margin-bottom:30vh; text-align:left; padding-left:20px;" >
        <!-- 判断题{{courseId}} -->
        <el-button @click="$refs.addDialog.changeDialogVisible()">新增题目</el-button>
        <el-button @click="$refs.useractionLog.changedialogVisible()" :courseId.sync="courseId" v-if="haveValue">操作记录</el-button>
        <add-dialog :courseId="courseId" ref="addDialog" updateList="updateList"></add-dialog>
        <judgment-problem-list :courseId.sync="courseId" ref="listDialog" v-if="haveValue" > </judgment-problem-list>
        <judgment-problem-actionLog ref="useractionLog" :courseId="courseId" ></judgment-problem-actionLog>
    </div>
</template>

<script>
import addDialog from './JudgmentProblemAdd.vue' //增加的弹框
import judgmentProblemList from './JudgmentProblemList.vue'
import judgmentProblemActionLog from './JudgmentProblemActionLog.vue'
export default {
    components:{addDialog, judgmentProblemActionLog, judgmentProblemList},
    data() {
        return {
            courseId: null,
            haveValue: false
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

<style>

</style>