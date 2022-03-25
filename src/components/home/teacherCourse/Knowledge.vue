<template>
    <div v-on:click="hidePanel">
        <div style="padding:10px;font-weight:600">
            <!-- https://echarts.apache.org/zh/api.html#events -->
            <!-- 课程名：<span>{{this.$route.query.}}</span>&nbsp;&nbsp;&nbsp;&nbsp;   -->
             <el-button @click="handleCloselogdia" type="primary" >我的记录</el-button>
             <el-button @click="refresh"><i class="el-icon-refresh"></i></el-button>
        </div>
         <el-tree
            v-loading="loading"
            :data="knowledegs"
            node-key="id"
            :default-expand-all = "true"
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
                <span class="el-item-name">{{ node.label }}</span>{{node.data.id}} 
                <!-- <span class="el-item-name-action"><span>上移</span><span>下移</span></span> -->
                <!-- <span class="node-text">{{ data.id }}</span> -->
            </span>
            </el-tree>

            <div id="mymean" v-show="menu">
                 <!-- -->
                <el-menu
                    id="menu"
                    text-color="#000"
                    @select="handleSelect">
                     <el-menu-item index="1" class="menuItem">
                        <span slot="title" >修改</span>
                    </el-menu-item>
                    <el-menu-item index="2" class="menuItem">
                        <span slot="title">添加子级</span>
                    </el-menu-item>
                    <el-menu-item index="3" class="menuItem">
                        <span slot="title">添加同级</span>
                    </el-menu-item> 
                    <el-menu-item index="6" class="menuItem">
                        <span slot="title">上移</span>
                    </el-menu-item> 
                    <el-menu-item index="7" class="menuItem">
                        <span slot="title">下移</span>
                    </el-menu-item>                    
                    <el-menu-item index="4" class="menuItem">
                        <span slot="title">删除</span>
                    </el-menu-item>
                    <el-menu-item index="5" class="menuItem">
                        <span slot="title">取消</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <el-dialog title="修改记录" width="80%" :visible.sync="logVisible" :before-close="handleCloselogdia" top="8vh" 
                
            >
               <Knowledge-log ref="userklog"></Knowledge-log >
            </el-dialog>
            
            <Alter-knowledge ref="alterknowledge" @findallknowledge="findallknowledge" :currentNode="currentNode"></Alter-knowledge>
            <Add-knowledge :type="type" ref="addknowledge" @findallknowledge="findallknowledge" :currentNode="currentNode" :courseId="this.$route.params.courseid"></Add-knowledge>
    </div>
</template>

<script>
import AlterKnowledge from "./AlterKnowledge"
import AddKnowledge from "./AddKnowledge"
import KnowledgeLog from "./KnowledgeLogUser"
  export default {
    components:{AlterKnowledge,AddKnowledge,KnowledgeLog},
    data() {
            return {
                knowledegs: [ ],
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
            };
        },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    mounted(){
          console.log("课程id",this.$route.query.courseid); //课程的id
          //这里获取所有的知识点
          this.findallknowledge(this.$route.query.courseid)
          //对后端出传过来的数据进行属性名的替换
          //this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
      },
    methods: {
        //节点被点击是输出节点信息 用于测试
        //这里要搜索出两个节点之间的节点
        /*
        思路：首先把开始节点到deep=2的那个节点之间的节点找出
            然后在deep=2那一层的节点一个一个遍历子节点
            把结束节点到deep=2的那个节点之间的节点找出   
            把开始和结束节点对应的deep=2的节点中间的节点遍历子节点 
        */
        consolelog(node){
            console.log(node); //开始节点 

             //实现了 把开始节点到deep=2的那个节点的节点找出
            do{
                console.log(node.label)
                node = node.nextSibling;    
            }while((node.nextSibling && node.level===4))
            console.log(node.label);
            node = node.parent; //deep=3
            console.log(node.label);
            while(node.nextSibling){ //deep=3有上一个节点时候
                node = node.nextSibling;
                this.dispchild(node)
            }
            node = node.parent; // deep=2
            console.log(node.label);
            console.log(node) // 这个节点为被点击开始节点回退到deep=2的节点


            // //实现了 把结束节点到deep=2的那个节点的节点找出
            // do{
            //     console.log(node.label)
            //     node = node.previousSibling;    
            // }while((node.previousSibling && node.level===4))
            // console.log(node.label);
            // node = node.parent; //deep=3
            // console.log(node.label);
            // while(node.previousSibling){ //deep=3有上一个节点时候
            //     node = node.previousSibling;
            //     this.dispchild(node)
            // }
            // node = node.parent; // deep=2
            // console.log(node.label);
            // console.log(node) // 这个节点为被点击结束节点回退到deep=2的节点
        },
        //刷新 重新加载知识点
        refresh(){
            this.findallknowledge(this.$route.query.courseid)
        },  
        //可以输出传入节点的所有子节点 包括自己
        dispchild(node){
            if(node.level==1)
                return
            if(node.childNodes.length){
                console.log(node.childNodes.length)
                for(let i=0; i<node.childNodes.length; i++){
                    this.dispchild(node.childNodes[i]);
                }
            }
            console.log(node.label)
        },
        //关系修改记录的弹框
        handleCloselogdia(){
            this.logVisible = !this.logVisible;
            if(this.logVisible) this.$refs.userklog.updategetuserlog();
        },
         //节点被右键 显示菜单
        contextmenu(event,knowledge,Node,a){ //共四个参数，依次为：event、传递给data属性的数组中该节点所对应的对象、节点对应的Node、节点组件本身。
            //  this.currentNode = Node.data; //保存当前节点信息，传给子组件
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
            else if(index == 2){  //添加子级
                this.type=0;
                this.appendchild();
            }
            else if(index == 3){  //添加同级
                this.type=1;
                this.append();
            }
            else if(index ==4){  //删除
                this.deleteNode(this.currentNode.data.id);
            }
            else if(index == 5){ //取消
                this.cancelmean();
            }
            else if(index == 6){ //上移
                console.log("上移");
                this.nodeOrderUp(this.currentNode);
            }
            else if(index == 7){ //下移
                console.log("下移")
                this.nodeOrderDown(this.currentNode);
            }
           
        },
        /*
        节点排序的实现
        前端把节点的id和对应的orderId传给后端（多组），后端直接根据id修改orderId
        */ 
        //节点排序上移
        nodeOrderUp(node){
            if(!node.previousSibling){
                this.errMsg("不能上移");
                this.cancelmean();
                return
            }
            //  交换两个节点的orderId 放到数组传给后端
            var clickNodeOrderId = node.data.orderId;
            var listKnowledge=[];
            listKnowledge.push(node.data);
            listKnowledge[0].orderId = node.previousSibling.data.orderId;
            listKnowledge.push(node.previousSibling.data)
            listKnowledge[1].orderId = clickNodeOrderId;
            //console.log(listKnowledge)
            this.$api.knowledge.knowledge.updateOrderIdById(listKnowledge).then((res) => {
              this.Msg(res.data.msg)
              this.refresh()
              this.cancelmean();
            })
           
        },
        //节点排序下移
        nodeOrderDown(node){
            if(!node.nextSibling){
                this.errMsg("不能下移");
                this.cancelmean();
                return
            }
            //  交换两个节点的orderId 放到数组传给后端
            var clickNodeOrderId = node.data.orderId;
            var listKnowledge=[];
            listKnowledge.push(node.data);
            listKnowledge[0].orderId = node.nextSibling.data.orderId;
            listKnowledge.push(node.nextSibling.data)
            listKnowledge[1].orderId = clickNodeOrderId;
            //console.log(listKnowledge)
            this.$api.knowledge.knowledge.updateOrderIdById(listKnowledge).then((res) => {
              this.Msg(res.data.msg)
              this.refresh()
              this.cancelmean();
            })
        },
        //修改节点
        alterNode(){
            this.$refs.alterknowledge.changeopen(); //显示修改界面
            this.menu = false;  //菜单关闭
        },
        //添加子节点
        appendchild() {
            this.$refs.addknowledge.changeopen(); //显示修改界面
            this.menu = false;  //菜单关闭
        },
        //添加同级节点
        append() {
            this.$refs.addknowledge.changeopen(); //显示修改界面
            this.menu = false;  //菜单关闭
        },
        //通过id删除知识点
        deleteNode(id){
            console.log("知识点的id",id,"用户id",this.$store.state.user.userInfo.id);
            this.$api.knowledge.cpublic.remove({kid:id, userId:this.$store.state.user.userInfo.id,courseId:this.$route.query.courseid}).then((res) => {
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
      //通过课程id查找所有知识点   后端没有把根节点查出来 20210108我自己改了查出来了
      findallknowledge(courseid){
          console.log("获取所有知识点")
          this.loading = true;
          this.$api.knowledge.knowledge.findByCourseId({courseId: courseid}).then((res) => {
            console.log(res)
             this.knowledegs = res.data;
             this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
             this.loading = false;
          }).catch(err => {
            this.loading = false;
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
.el-item-name:hover .el-item-name-action{
    font-size: 1.4em;
    color: red;
}
.el-item-name-action{
    font-size: 1.2em;
    color: red;
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