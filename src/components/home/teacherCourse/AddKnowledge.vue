<template>
    <div style="width:100%">
        <div v-if="showalterhomework" style="background:rgba(208,208,208,0.6);width:100%;height:100vh;position:fixed;top:0;left:0">
            <div :class="[this._isMobile() ? 'alterWorkDialogPhone' : 'alterWorkDialog']">
                <span style="float:right;margin-right:1%;margin-top:5px"><el-button @click="changeopen()" style="border:0;font-size:20px"  icon="el-icon-circle-close" ></el-button></span>
                <div style="font-size:1.1em;margin-top:3vh;margin-bottom:3vh;">添加知识点</div>
                <div style="margin-bottom:10vh">
                    <span style="display:inline-block;min-width:80px">名称</span><el-input v-model="currentKnowledge.name" placeholder="请输入知识点内容" maxlength="50" style="width:70%"></el-input><br /><br/>
                    <span style="display:inline-block;min-width:80px">难度</span><el-rate style="display: inline-block;" v-model="currentKnowledge.rate" :texts="difficultytext" show-text> </el-rate><br/><br/>
                    <span style="display:inline-block;min-width:80px">教学目标</span><el-select v-model="techinggoalvalue" clearable placeholder="请选择">
                    <el-option
                        v-for="item in techinggoal"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div><br/>
                <div style="position: absolute; bottom: 4%;right:4%">
                    <el-button @click="changeopen()" type="warning">取消</el-button>
                    <el-button @click="addaknowledge()" type="primary">确认</el-button>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["currentNode","type","courseId"], //currentNode为被点击的节点
    data(){
        return{
            currentKnowledge:{//要添加的知识点
                name:null,
                rate:0.2
            }, 
            showalterhomework: false,
            difficultytext:[ '0.2', '0.4', '0.6', '0.8','1.0'],
            techinggoal: [ ], //教学目标
            techinggoalvalue: ''   //选中教学目标的id

        }
    },
    watch:{
        showalterhomework(val){ //每次打开这个窗口都获取教学目标
            console.log("watch");
            if(val == true){
               this.gettechgoal();
            }
                
            else
                this.techinggoal = [];
        }
    },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    methods:{
        gettechgoal(){
          this.$api.metadata.goal.findAll().then((res) => {
            this.techinggoal = res.data;
          })
        },
        addaknowledge(){ //返回的是一个数组，最外层数组只有一个元素 就是deep==1的那个
            if(!this.currentKnowledge.name || !this.currentKnowledge.rate){
                this.errMsg("请填写完整");
                return
            }

            if(this.currentNode.parent.data.length && this.type === 1){ //deep=1的这个知识点不能添加同级
                this.errMsg("该知识点不能添加同级")
                return;
            }

            if(this.currentNode.parent.data.length){ //条件成立说明是deep==1 的一个知识点 只能添加子集
                console.log("数组");
                var parentId = this.currentNode.parent.data[0].id;
                var orderId = this.currentNode.parent.data[0].children.length+1;
            } else{ //不是deep=1的知识点
                var parentId = this.currentNode.data.id;
                if(this.type===0){ //添加子集
                    var orderId = this.currentNode.data.children.length+1;
                }
                else{ //添加同级
                    var orderId = this.currentNode.parent.data.children.length+1;
                }
            }
            
            console.log("发送请求添加知识点");
            console.log("父节点",this.currentNode.parent)
            console.log("父节点的id",parentId)
            console.log("父节点的deep",this.currentNode.parent.level+2)
            console.log("课程id",this.$route.query.courseid)
            // console.log("内容:",this.currentKnowledge.name,"被点击节点id:",this.currentNode.data.id,"类型tpye：",this.type,"难度：",this.currentKnowledge.rate/5);
            console.log(this.$route.query.courseid);
            if(!parentId){
                this.errMsg("父节点获取失败");
                return
            }
            //type=0 子级 type=1 同级
            // this.$emit('findallknowledge',this.$route.query.courseid);   //调用父组件重新获取知识点
            // console.log("orderId",orderId)
            // return
            if(this.type==0){ //添加子级
              let data = {
                  courseId: this.$route.query.courseid,
                  difficulty: this.currentKnowledge.rate/5,
                  name:this.currentKnowledge.name,
                  parentId:parentId,
                  userId:this.userinfo.id,
                  teachingGoal:this.techinggoalvalue,
                  deep:this.currentNode.parent.level+2+1,
                  orderId:orderId
              };
              this.$api.knowledge.cpublic.add(data).then((res) => {
                this.Msg(res.data)
              })
            }
            else if(this.type==1){ //添加同级
              let data ={
                  courseId: this.$route.query.courseid,
                  difficulty: this.currentKnowledge.rate/5,
                  name:this.currentKnowledge.name,
                  parentId:this.currentNode.parent.data.id,
                  userId:parentId,
                  teachingGoal:this.techinggoalvalue,
                  deep:this.currentNode.parent.level+2,
                  orderId:orderId
              }
              this.$api.knowledge.cpublic.add(data).then((res) => {
                this.Msg(res.data)
              })
            }
            this.changeopen();
            this.currentKnowledge.name = null;
            this.currentKnowledge.rate = 0.2;

        },
         _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        changeopen(){
            this.showalterhomework= !this.showalterhomework;
        }
    }
}
</script>

<style scope>
/* 手机端样式 */
.alterWorkDialogPhone {
    width: 98%;
    margin: 0 auto;
    background-color: #FFF;
    position: fixed;
    top: 5vh;
    /* height: 95vh; */
    right: 0;
    /* bottom:20vh; */
    left: 0;
    overflow: auto;
    z-index: 2020;
    border-radius: 6px;
    opacity:1;
    font-weight: 700;
    font-family: "宋体";
    text-align: left;
    padding-left: 1%;

}
/* PC端样式 */
.alterWorkDialog {
    width: 40%;
    margin: 0 auto;
    background-color: #FFF;
    position: fixed;
    top: 15vh;
    /* height: 50vh; */
    right: 0;
    /* bottom: 20vh; */
    left: 0;
    overflow: auto;
    z-index: 2020;
    border-radius: 6px;
     opacity:1;
     font-weight: 700;
     font-family: "宋体";
     text-align: left;
     padding-left: 1%;
     
}
</style>