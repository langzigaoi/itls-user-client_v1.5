<template>
    <div style="width:100%">
        <div v-if="showalterhomework" style="background:rgba(208,208,208,0.6);width:100%;height:100vh;position:fixed;top:0;left:0">
            <div :class="[this._isMobile() ? 'alterWorkDialogPhone' : 'alterWorkDialog']">
                <span style="float:right;margin-right:1%;margin-top:5px"><el-button @click="changeopen()" style="border:0;font-size:20px"  icon="el-icon-circle-close" ></el-button></span>
                <!-- <div style="font-size:1.1em;margin-top:3vh;margin-bottom:3vh;">修改作业ID: {{this.$route.query.id}}</div> -->
                <div style="font-size:1.1em;margin-top:3vh;margin-bottom:3vh;">修改知识点</div>
                <div style="margin-bottom:10vh">

                    <span style="display:inline-block;min-width:80px">名称</span><el-input v-model="konwledge.name" placeholder="请输入知识点内容" maxlength="50" style="width:70%"></el-input><br /><br/>
                    <span style="display:inline-block;min-width:80px">难度</span><el-rate style="display: inline-block;" v-model="konwledge.difficulty" :texts="difficultytext" show-text> </el-rate><br/><br/>
                    <span style="display:inline-block;min-width:80px">教学目标</span>
                    <el-select v-model="konwledge.teachingGoal" clearable placeholder="请选择">
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
                    <el-button @click="alteraknowledge()" type="primary">确认</el-button>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["currentNode"],
    data(){
        return{
            showalterhomework: false,
            difficultytext:[ '0.2', '0.4', '0.6', '0.8','1.0'], 
            rate:1,
            konwledge:{}, //修改前的知识点
            techinggoal: [ ], //教学目标

        }
    },
    // computed:{
    //     rate:{
    //        get: function(){
    //             return  this.currentNode.difficulty*5;
    //         },  
    //         set:function(newval){
    //             this.currentNode.difficulty = newval/5;
    //         }
    //     },
    // },
    watch:{
        showalterhomework(val){ //每次打开这个修改窗口都获取一个知识点进行填充
            //console.log("s",val.data.id)
            console.log("watch");
            if(val == true){
                this.getaKnowledge(this.currentNode.data.id);
                this.gettechgoal();
            }
                
            else
                this.konwledge = {};
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
        getaKnowledge(id){
          this.$api.knowledge.knowledge.findById({id: id}).then((res) => {
            this.konwledge = res.data.data;
            this.konwledge.difficulty = this.konwledge.difficulty*5; //难度转换
          })
        },
        alteraknowledge(){
          console.log(this.a)
          console.log("发送请求修改知识点");
          console.log("内容:",this.konwledge.name,"id:",this.konwledge.id,"难度",this.konwledge.difficulty/5,"用户id",this.userinfo.id);
          let data ={
                  name: this.konwledge.name,
                  kid: this.konwledge.id,
                  difficulty:this.konwledge.difficulty/5,
                  userId:this.userinfo.id,
                  teachingGoal:this.konwledge.teachingGoal,
                  courseId:this.konwledge.courseId
              }
          this.$api.knowledge.cpublic.revise(data).then((res) => {
            this.changeopen();
            this.Msg(res.data)
          })

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