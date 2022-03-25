
// 完成——暂时（多个测试用例）
<template>
<!-- https://blog.csdn.net/freya_dr/article/details/100610784 解决input 无法输入-->
    <div>
        <el-dialog top="5vh" align="left" title="查看题目" :visible.sync="checkAProblemDialogVisible" width="80%" >
            <p class="flex">
                <span class="title">知识点*</span>
                <!-- <span :v-model="problemProg.knowledge.name"></span> -->
                    <el-input disabled="true" v-model="problemProg.knowledge.name" style="width:200px"></el-input>
                <span class="title" style="margin-right:0px; margin-left:50px">难易度*</span>
                    <el-input disabled="true" v-model="problemProg.difficulty" style="width:200px"></el-input>
            </p>
            <p class="flex">
                <span class="title">题干*</span>
                <el-input disabled="true" type="textarea" placeholder="请输入题干" v-model="problemProg.problem.problemName"> </el-input>
            </p>
            <p class="flex">
                <span class="title">题目描述*</span>
                <el-input disabled="true"  type="textarea" placeholder="请输入题目描述" v-model="problemProg.problem.problemDescription"> </el-input>
            </p>
            <p class="flex">
                <span class="title" style="margin-right:10px">最大运行时间*</span>
                    <el-input disabled="true" v-model="problemProg.problem.problemTimeLimit" style="width:200px"></el-input>
                <span class="title" style="margin-right:10px; margin-left:50px">最大运行内存*</span>
                    <el-input disabled="true" v-model="problemProg.problem.problemMemoryLimit" style="width:200px"></el-input>
            </p>
            <p class="flex">
                <span class="title">输入格式*</span>
                <el-input disabled="true"  type="textarea" placeholder="请输入输入格式" v-model="problemProg.problem.problemInputFormat"> </el-input>
            </p>
            <p class="flex">
                <span class="title">输出格式*</span>
                <el-input disabled="true"  type="textarea" placeholder="请输入输出格式" v-model="problemProg.problem.problemOutputFormat"> </el-input>
            </p>
            <p class="flex">
                <span class="title">样例输入*</span>
                <el-input disabled="true"  type="textarea" placeholder="请输入样例输入" v-model="problemProg.problem.problemSampleInput"> </el-input>
            </p>
            <p class="flex">
                <span class="title">样例输出*</span>
                <el-input disabled="true"  type="textarea" placeholder="请输入样例输出" v-model="problemProg.problem.problemSampleOutput"> </el-input>
            </p>
            <p class="flex">
                <span class="title">提示</span>
                <el-input disabled="true"  type="textarea" placeholder="请输入提示" v-model="problemProg.problem.problemHint"> </el-input>
            </p>

        </el-dialog>
    </div>
</template>
<script>
export default {
    props:['courseId','problemProgFormal'],
    data() {
        return {
            checkAProblemDialogVisible:false, //控制新增题目弹框的实现
            knowledegs:[], //所有知识点
            optionProps:{  //选择知识点的配置项
                    // label: 'name', 
                    value:'id',
                    // children:'child',
                    checkStrictly : true ,
                    filterable:true,
                    'show-all-levels': false, //仅显示最后一级
            },
            radio1:'',
            problemProg:{
                courseId:null,  //课程id
                knowledge:[
                    {name:null},
                ],
                knowledgeId:null, //知识点ID
                problem:[
                    {problemName:null},
                    {problemTimeLimit:0},
                    {problemMemoryLimit:0},
                    {problemDescription:null},
                    {problemInputFormat:null},
                    {problemOutputFormat:null},
                    {problemSampleInput:null},
                    {problemSampleOutput:null},
                    {problemHint:null}
                ],
                difficulty:0.5, //难易度
            } 
        }
    },
    mounted(){

    },
    methods:{
        forceUpdate(e){
            this.$forceUpdate()
        },
        //改变弹框的显示
        checkAlterAProblemDialogVisible(){
            this.checkAProblemDialogVisible =  !this.checkAProblemDialogVisible;
        },
        //从知识点的id数组获取最后一个知识点id
        getKnowledgeId(list){
            console.log(list)
            return list[list.length-1]
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
        checkAProblemDialogVisible(val){
            if(val){
                this.findallknowledge(); //查询所有知识点 
                
                console.log("watch",this.problemProgFormal)
                this.problemProg = {};
                this.problemProg = JSON.parse(JSON.stringify(this.problemProgFormal))
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