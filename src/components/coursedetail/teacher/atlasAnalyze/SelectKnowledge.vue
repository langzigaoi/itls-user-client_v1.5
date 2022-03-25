<template>
    <div v-on:click="hidePanel">
        <div style="padding:10px;font-weight:600;text-align:left">
           选择知识点测试{{selectedOptions}}
            <el-cascader :options="knowledegs" :props="optionProps" :show-all-levels="false" v-model="selectedOptions" filterable clearable>
            </el-cascader>
        </div>
         <div style="display: grid;grid-template-columns: auto 300px ">
            <el-tree
            v-loading="loading"
            :data="knowledegs"
            node-key="id"
            style="min-height:50vh"
            show-checkbox
            ref="tree"
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
                <span class="el-item-name" @click="consolelog(node)">{{ node.label }}</span>{{node.data.id}}
                <!-- <span class="node-text">{{ data.id }}</span> -->
            </span>
            </el-tree>
            <div>
                <el-button type="primary" @click="getCheckedNodes">获取选中知识点</el-button>
                <el-button @click="resetChecked">清空</el-button>
                <p style="word-wrap:break-word;">
                    <span v-for="node in selectedNode" :key="node.id">{{node.id}},</span>
                </p>
            </div>
         </div>
            
    </div>
</template>

<script>
  export default {
    data() {
            return {
                knowledegs: [],
                loading:false,
                courseid:null,
                selectedNode:[],
                optionProps:{ 
                    // label: 'name', 
                    value:'id',
                    // children:'child',
                    checkStrictly : true ,
                    filterable:true,
                    'show-all-levels': false, //仅显示最后一级
                },
                selectedOptions:null,
                
            };
        },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    mounted(){
          this.getcourseid(this.$store.state.course.courseCinstanceId)
      },
    methods: {
        //获取选中知识点
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
            this.selectedNode = (this.$refs.tree.getCheckedNodes());
        },
        //清空选中知识点
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
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
          //this.loading = true;
          this.$api.knowledge.knowledge.findByCourseId({courseId: courseid}).then((res) => {
            console.log(res)
            this.knowledegs = res.data;
            this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
            this.loading = false;
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
.el-tree-node__content {
    margin-top: 15px;
}
.el-tree-node__label {
    border: 1.5px solid #ccc;
    padding: 2px;
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