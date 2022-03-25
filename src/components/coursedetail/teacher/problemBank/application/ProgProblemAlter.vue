<template>
<!-- https://blog.csdn.net/freya_dr/article/details/100610784 解决input 无法输入-->
    <div>
        <el-dialog top="5vh" align="left" title="修改题目" :visible.sync="alterAProblemDialogVisible" width="80%" >
            <p class="flex">
                <span class="title">知识点*{{courseId}}</span>
                <el-cascader :options="knowledegs" :props="optionProps" :show-all-levels="false" v-model="problemProg.knowledgeId" filterable clearable> </el-cascader>
                <span style="margin:0 20px">难度</span>
                 <el-input-number :min="0" :max="1" v-model="problemProg.difficulty" :step="0.1"></el-input-number>
            </p>
            <p class="flex">
                <span class="title">题干*</span>
                <el-input  type="textarea" placeholder="请输入题干" v-model="problemProg.title"> </el-input>
            </p>
            <p class="flex">
                <span class="title">解析</span>
                <el-input type="textarea" placeholder="请输入解析" v-model="problemProg.analysis"> </el-input>
            </p>
            <p class="flex" v-for="(option,index) in problemProg.optionsArr" :key="index">
                <span class="title">选项*</span>
                <el-input  type="textarea"  placeholder="请输入选项" v-model="option.option" @input="forceUpdate($event)"> </el-input>
                <el-button  @click="removeOption(option)">删除</el-button>
                <el-radio v-model="problemProg.answer" :label="index+''" border>设为答案{{index}}</el-radio>
            </p>
            <el-button @click="addOption" type="danger">新增选项</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="alterAProblemDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="alterAProblem">确 定</el-button>
            </span>{{problemProg.optionsArr}}
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:['courseId','problemProgFormal'],
    data() {
        return {
            alterAProblemDialogVisible:false, //控制新增题目弹框的实现
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
                knowledgeId:null, //知识点ID
                title:null,  //题干
                optionsArr:[{  option:'1' },{  option:'2' },{  option:'3' },{  option:'4' }], //数组形式暂时存放选项 后面json处理放到options里面
                options:[], //选项 Json解析
                answer:null, //答案 
                analysis:null,  //解析
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
        //添加成功后清空数据框
        refreshData(){
            //this.knowledgeId = this.title = this.analysis = this.options =  null;
            this.optionsArr = [{  option:'' },{  option:'' },{  option:'' },{  option:'' }];
        },
        //新增一个选项
        addOption(){
            this.problemProg.optionsArr.push({
                option: ''
            });
            this.forceUpdate()
        },
        //删除一个选项
        removeOption(options){
            if( this.problemProg.optionsArr.length<=1){
                this.errMsg("不能删除");
                return
            }
            var index = this.problemProg.optionsArr.indexOf(options)
            if (index !== -1) {
                this.problemProg.optionsArr.splice(index, 1)
            }  
            this.forceUpdate()
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
             console.log(this.problemProg.knowledgeId);
            if(!this.problemProg.courseId || !this.problemProg.knowledgeId || !this.problemProg.title){
                this.errMsg("请填写完整")
                return
            }
            
            if(this.problemProg.answer === null){
                this.errMsg("请选择答案")
                return
            }
            //console.log(this.getKnowledgeId(this.problemProg.knowledgeId))
            if(this.problemProg.knowledgeId.length) //重新选择了知识点就是一个数组 否则是一个数字
                this.problemProg.knowledgeId = this.getKnowledgeId(this.problemProg.knowledgeId); //获取选中的知识点id
            this.problemProg.options = JSON.stringify(this.problemProg.optionsArr); //使用JSON压缩
            console.log(this.problemProg);
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
            //console.log(val);
            if(val){
                this.findallknowledge(); //查询所有知识点 
                
                console.log("watch",this.problemProgFormal)
                 this.problemProg = {};
                this.problemProg = JSON.parse(JSON.stringify(this.problemProgFormal))
                this.problemProg.optionsArr = JSON.parse(this.problemProg.options);
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
    min-width: 60px;
}
.flex button {
    margin:0 5px;
    background-color: #F1F3F4;
}
</style>