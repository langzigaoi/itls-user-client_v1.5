
// 完成——暂时（多个测试用例）
<template>
<!-- https://blog.csdn.net/freya_dr/article/details/100610784 解决input 无法输入-->
    <div>
        <el-dialog top="5vh" align="left" title="修改题目" :visible.sync="alterAProblemDialogVisible" width="80%" >
            <p class="flex">
                <span class="title">知识点*</span>
                    <el-cascader :options="knowledegs" :props="optionProps" :show-all-levels="false" v-model="problemProg.knowledgeId" filterable clearable> </el-cascader>
                <span class="title" style="margin-right:0px; margin-left:50px">难易度*</span>
                    <el-input-number :min="0" :max="1" v-model="problemProg.difficulty" :step="0.1"></el-input-number>
            </p>
            <p class="flex">
                <span class="title">题干*</span>
                <el-input  type="textarea" placeholder="请输入题干" v-model="problemProg.problemName"> </el-input>
            </p>
            <p class="flex">
                <span class="title">题目描述*</span>
                <el-input type="textarea" placeholder="请输入题目描述" v-model="problemProg.problemDescription"> </el-input>
            </p>
            <p class="flex">
                <span class="title" style="margin-right:10px">最大运行时间*</span>
                    <el-input-number :min="0" v-model="problemProg.problemTimeLimit" :step="1"></el-input-number>
                <span class="title" style="margin-right:10px; margin-left:50px">最大运行内存*</span>
                    <el-input-number :min="0" v-model="problemProg.problemMemoryLimit" :step="1"></el-input-number>
            </p>
            <p class="flex">
                <span class="title">输入格式*</span>
                <el-input type="textarea" placeholder="请输入输入格式" v-model="problemProg.problemInputFormat"> </el-input>
            </p>
            <p class="flex">
                <span class="title">输出格式*</span>
                <el-input type="textarea" placeholder="请输入输出格式" v-model="problemProg.problemOutputFormat"> </el-input>
            </p>
            <p class="flex">
                <span class="title">样例输入*</span>
                <el-input type="textarea" placeholder="请输入样例输入" v-model="problemProg.problemSampleInput"> </el-input>
            </p>
            <p class="flex">
                <span class="title">样例输出*</span>
                <el-input type="textarea" placeholder="请输入样例输出" v-model="problemProg.problemSampleOutput"> </el-input>
            </p>
            <p class="flex">
                <span class="title">提示</span>
                <el-input type="textarea" placeholder="请输入提示" v-model="problemProg.problemHint"> </el-input>
            </p>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="alterAProblemDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterAProblem">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
// import ProgProblemAlterVue from '../application/ProgProblemAlter.vue';
export default {
    props:['courseId','problemProgFormal'],
    data() {
        return {
            alterAProblemDialogVisible:false, //控制新增题目弹框的实现
            knowledegs:[], //所有知识点
            radio1:'',
            optionProps:{  //选择知识点的配置项
                    // label: 'name', 
                    value:'id',
                    // children:'child',
                    checkStrictly : true ,
                    filterable:true,
                    'show-all-levels': false, //仅显示最后一级
            },
            problemProg:{
                id:null,
                problemProgId:null,
                courseId:null,  //课程id
                knowledgeId:null, //知识点ID
                problemName:null,
                problemTimeLimit:0,
                problemMemoryLimit:0,
                problemDescription:null,
                problemInputFormat:null,
                problemOutputFormat:null,
                problemSampleInput:null,
                problemSampleOutput:null,
                problemHint:null,
                difficulty:0.5, //难易度
            } ,
        }
    },
    mounted(){

    },
    methods:{
        forceUpdate(e){
            this.$forceUpdate()
        },
        refreshData(){
            this.problemProg.knowledgeId = this.problemProg.courseId = this.problemProg.difficulty = null;
            this.problemProg.problem = null;
        },
        //改变弹框的显示
        changeAlterAProblemDialogVisible(){
            this.alterAProblemDialogVisible =  !this.alterAProblemDialogVisible;
        },
        //从知识点的id数组获取最后一个知识点id
        getKnowledgeId(list){
            console.log(list)
            return list[list.length-1]
        },
        //修改题目
        alterAProblem(){
            this.problemProg.id = null;
            this.problemProg.courseId = this.courseId;
            this.problemProg.progId = this.problemProg.problemId;
            if(this.problemProg.knowledgeId.length) //重新选择了知识点就是一个数组 否则是一个数字
                this.problemProg.knowledgeId = this.getKnowledgeId(this.problemProg.knowledgeId); //获取选中的知识点id
            
            if(!this.problemProg.courseId || !this.problemProg.knowledgeId || !this.problemProg.difficulty ||
                !this.problemProg.problemName || !this.problemProg.problemTimeLimit || !this.problemProg.problemMemoryLimit ||
                !this.problemProg.problemDescription || !this.problemProg.problemInputFormat || !this.problemProg.problemOutputFormat ||
                !this.problemProg.problemSampleInput || !this.problemProg.problemSampleOutput){
                this.errMsg("请填写完整")
                return
            }
            this.$api.problem.prog.alter(this.problemProg).then((res) => {
              this.refreshData(); //清空输入框
              this.$emit('updateList')
              this.changeAlterAProblemDialogVisible();
              this.Msg(res.msg)
            })

        },
        //通过课程id查找所有知识点   
        findallknowledge(){
          console.log("获取所有知识点使用的课程id",this.courseId)
          this.$api.knowledge.knowledge.findByCourseId({courseId: this.courseId}).then((res) => {
            console.log(res)
            this.knowledegs = res.data;
            this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
          })
        },
        
    },
    watch:{
        alterAProblemDialogVisible(val){
            if(val){
                this.findallknowledge(); //查询所有知识点 
                this.problemProg = JSON.parse(JSON.stringify(this.problemProgFormal.problem));
                console.log('problemProgFormal', this.problemProgFormal)
                this.problemProg.difficulty = this.problemProgFormal.difficulty;
                this.problemProg.knowledgeId = this.problemProgFormal.knowledgeId;
                this.problemProg.problemProgId = this.problemProgFormal.id;
                this.problemProg.userId = this.problemProgFormal.userId;
                this.problemProg.isDelete = this.problemProgFormal.isDelete;
            }
        },
        problemProgFormal(val){

        }
    }
}
</script>

<style scope>
.flex {
    display:flex;
    margin: 10px;
    flex-basis: auto; 
    align-items: center;   /* // 垂直居中 */
    /*justify-content: center;  // 水平居中*/
}

.title {
    min-width: 80px;
}
.flex button {
    margin:0 5px;
    background-color: #F1F3F4;
}
</style>