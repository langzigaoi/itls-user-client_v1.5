<template>
    <div v-on:click="hidePanel">
        <div style="padding:10px;font-weight:600;text-align:left">
            <!-- https://echarts.apache.org/zh/api.html#events -->
            <!-- 课程名：<span>{{this.$route.query.}}</span>&nbsp;&nbsp;&nbsp;&nbsp;   -->
             <el-button @click="handleCloselogdia" type="primary" >我的记录</el-button>
        </div>
         <el-tree
            v-loading="loading"
            :data="knowledegs"
            node-key="id"
            style="min-height:50vh"
            @node-drag-start="handleDragStart" 
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            @node-contextmenu="contextmenu"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
             <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="el-item-name">{{ node.label }}</span>
                <!-- <span class="node-text">{{ data.id }}</span> -->
            </span>
            </el-tree>

            <div id="mymean" v-show="menu">
                 <!-- -->
                <el-menu
                    id="menu"
                    text-color="#000"
                    @select="handleSelect">
                     <!-- <el-popover placement="right" width="200" trigger="hover">
                        <el-input type="text" v-model="newName" placeholder="请输入修改后的知识点"></el-input>
                        <div class="bittombut">
                            <el-button @click="alterNode()" size="mini" round>确认</el-button>
                        </div>
                        <el-menu-item slot="reference" index="1" class="menuItem">
                            <span slot="title">修改</span>
                        </el-menu-item>
                      </el-popover>
                    <el-popover placement="right" width="200" trigger="hover">
                        <el-input type="text" v-model="newName" placeholder="请输入要添加的知识点"></el-input>
                        <div class="bittombut">
                            <el-button  @click="appendchild()" size="mini" round>确认</el-button>
                        </div>
                        <el-menu-item slot="reference"  index="2" class="menuItem">
                            <span slot="title">添加子级</span>
                        </el-menu-item>
                    </el-popover>
                     <el-popover placement="right" width="200" trigger="hover">
                        <el-input type="text" v-model="newName" placeholder="请输入要添加的知识点"></el-input>
                        <div class="bittombut">
                            <el-button @click="append()" size="mini" round>确认</el-button>
                        </div>
                        <el-menu-item slot="reference"  index="3" class="menuItem">
                            <span slot="title">添加同级</span>
                        </el-menu-item>
                    </el-popover> -->
                     <el-menu-item index="1" class="menuItem">
                        <span slot="title" >修改</span>
                    </el-menu-item>
                    <el-menu-item index="2" class="menuItem">
                        <span slot="title">添加子级</span>
                    </el-menu-item>
                    <el-menu-item index="3" class="menuItem">
                        <span slot="title">添加同级</span>
                    </el-menu-item>                    
                    <el-menu-item index="4" class="menuItem">
                        <span slot="title">删除</span>
                    </el-menu-item>
                    <el-menu-item index="5" class="menuItem">
                        <span slot="title">取消</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <el-dialog title="修改记录" width="80%" :visible.sync="logVisible" :before-close="handleCloselogdia" top="8vh">
               <Knowledge-log ref="userklog"></Knowledge-log >
            </el-dialog>
            <Alter-knowledge ref="alterknowledge" @findallknowledge="findallknowledge" :currentNode="currentNode"></Alter-knowledge>
            <Add-knowledge :type="type" ref="addknowledge" @findallknowledge="findallknowledge" :currentNode="currentNode" :courseId="this.courseid"></Add-knowledge>
    </div>
</template>

<script>
import AlterKnowledge from "../../../home/teacherCourse/AlterKnowledge"
import AddKnowledge from "../../../home/teacherCourse/AddKnowledge"
import KnowledgeLog from "../../../home/teacherCourse/KnowledgeLogUser"
  export default {
    components:{AlterKnowledge,AddKnowledge,KnowledgeLog},

    data() {
            return {
                knowledegs: [],
                loading:true,
                currentNode:{ //当前节点
                }, 
                type:0,  //0添加子级 1添加同级
                menu:false,   //控制右键菜单的显示
                newName:null, //输入框中新的name值
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                logVisible:false, //修改记录的弹框
                courseid:null,
            };
        },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    mounted(){
          //console.log("课程id",this.$route.query.courseid); //课程的id
          //这里获取所有的知识点
          //this.findallknowledge(this.$route.query.courseid)
          this.getcourseid(this.$store.state.course.courseCinstanceId)
          //console.log(this.courseId)
          //对后端出传过来的数据进行属性名的替换
          //this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
      },
    methods: {
        //关系修改记录的弹框
        handleCloselogdia(){
            this.logVisible = !this.logVisible;
            if(this.logVisible) this.$refs.userklog.updategetuserlog();
        },
         //节点被右键 显示菜单
        contextmenu(event,knowledge,Node,a){ //共四个参数，依次为：event、传递给data属性的数组中该节点所对应的对象、节点对应的Node、节点组件本身。
             //this.currentNode = Node.data; //保存当前节点信息，传给子组件
             this.currentNode = Node; //保存当前节点信息，传给子组件
             this.menu=true//让菜单显示
             //控制弹出菜单的位置，在点击的地方
             let mymenu = document.getElementById('mymean')
             //console.log(document.body.clientHeight,event.y) ;//屏幕高度
             let dy = 15;
             if(document.body.clientHeight - event.y<280)
              dy = -180;
             mymenu.style = "position: fixed; left: " + (event.x) + 'px' + "; top: " + (event.y +dy) + 'px; z-index: 999; cursor:pointer;';
        },
        //关闭右键出来的菜单
        cancelmean(){
             this.menu = false;  //菜单关闭
        },
        //右键的菜单，进行选择
        handleSelect(index){
            console.log("当前节点",this.currentNode);
            if(index == 1){  //修改
                this.alterNode();
            }
            if(index == 2){  //添加子级
                this.type=0;
                this.appendchild();
            }
            if(index == 3){  //添加同级
                this.type=1;
                this.append();
            }
            if(index ==4){  //删除
                // console.log('进行删除');
                // let parent = this.currentNode.parent;
                // let children = parent.data.children || parent.data;
                // let index = children.findIndex(d => d.id === this.currentNode.data.id);
                // children.splice(index, 1); 
                // this.menu = false;  //菜单关闭
                this.deleteNode(this.currentNode.data.id);
            }
            if(index == 5){ //取消
                this.cancelmean();
            }
           
        },
        //修改节点
        alterNode(){
            // console.log('进行修改操作');
            this.$refs.alterknowledge.changeopen(); //显示修改界面
            this.menu = false;  //菜单关闭
            //this.$emit('changeopen');
            // if(this.newName == null){
            //     this.$message('请输入完整！');
            //     return 
            // }
            // console.log('修改');
            // console.log( this.currentNode.data.label);
            // this.currentNode.data.label = this.newName;
            // this.newName = null;
            // this.menu = false;  //菜单关闭
        },
        //添加子节点
        appendchild() {
            this.$refs.addknowledge.changeopen(); //显示修改界面
            this.menu = false;  //菜单关闭
            // let data  =this.currentNode.data;
            // const newChild = { id: 100, label: this.newName, children: [] }; //新的节点
            // if (!data.children) {
            //     this.$set(data, 'children', []);
            // }
            // data.children.unshift(newChild);
            // this.newName = null;
            // this.menu = false;  //菜单关闭
        },
        //添加同级节点
        append() {
            this.$refs.addknowledge.changeopen(); //显示修改界面
            this.menu = false;  //菜单关闭
            // if(this.newName == null){
            //     this.$message('请输入完整！');
            //     return 
            // }
            // if(this.currentNode.level == 1){
            //     this.$message("拒绝操作");
            //     return 
            // }   
            // let len = this.currentNode.parent.data.children.;
            // for(var i=0; i<len; i++){
            //     if(this.currentNode.parent.data.children[i].id == this.currentNode.data.id)
            //     break;
            // }
            // const newNode = { id: i, label: this.newName, children: [] };  //新的节点
            // this.currentNode.parent.data.children.splice(i+1,0,newNode);
            // this.newName = null;
            // this.menu = false;  //菜单关闭
        },
        //通过id删除知识点
        deleteNode(id){
            console.log("知识点的id",id,"用户id",this.$store.state.user.userInfo.id);
            this.$api.knowledge.cpublic.remove({kid:id, userId:this.$store.state.user.userInfo.id,courseId:courseid}).then((res) => {
              this.menu = false;  //菜单关闭
            })
        },

        //节点被点击时
        handclick(obj,node,a){ // 三个参数，传递给data属性的数组中该节点所对应的对象、节点对应的Node、节点组件本身。
            console.log(a.$vnode)
            obj.label = '被点击了';  
        },
        hidePanel(event){
            console.log("点击事件")
            let sp = document.getElementById("mymean");
            if(sp && !sp.contains(event.target)){
                    this.cancelmean();
            }
        },
        
        
        //取消输入框
        // cancelhover(){
        //     this.
        // },
        
      handleDragStart(node, ev) {
        console.log('drag start', node.id);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },
      //通过课程id查找所有知识点   后端没有把根节点查出来
      findallknowledge(courseid){
          console.log("获取所有知识点",courseid)
          this.loading = true;
          this.$api.knowledge.knowledge.findByCourseId({courseId: courseid}).then((res) => {
            console.log(res)
            this.knowledegs = res.data;
            this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
          }).catch(err => {
            this.loading = false;
          })
      },
      //通过课程实例id查课程id 11-27
        getcourseid(cinstanceId){
          this.$api.course.cinstance.findCourseInstance({id:cinstanceId}).then((res) => {
            console.log(res.data.courseId)
            this.courseid = res.data.courseId?res.data.courseId:null;
            this.findallknowledge(res.data.courseId) 
          })
        }

    },
    



  };
</script>
<style >
.el-button--primary {
  color: #fff;
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
.el-tree-node__content {
    margin-top: 15px;
}
.el-tree-node__label {
    border: 1.5px solid #ccc;
    padding: 2px;
}
.el-item-name {
    color:#111;
    font-weight: 500;
    margin: 10px 0;
}
/* 弹出菜单的样式 */
.bittombut {
    margin-top: 8px;
    text-align: right;
}
.el-menu {
    /* border: 1px solid #ccc; */
    box-shadow: 3px 3px 5px #ccc; 
}
/* 节点内容的样式 */
.node-text {
   border: 1px solid #ccc; 
   padding: 5px;
}
</style>