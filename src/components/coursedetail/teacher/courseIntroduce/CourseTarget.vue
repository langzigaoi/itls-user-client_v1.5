<template>
  <div class="tcommonBox">
    <header>
      <h1>课程目标</h1>
    </header>
    <section style="width: 90%; margin: 2% auto" @mouseleave="mouseleave()">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程目标</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog">添加</el-button>
        </div>
        <!-- 显示课程目标 -->
        <div v-for="(item, index) in allinfo" :key="index" class="text item" 
          style="border-bottom: 1px solid #ddd; margin: 2%; text-indent: 2em; line-height: 40px" 
          @mouseenter="showDelBtn(index)" 
          @mouseleave="hideDelBtn(index)">
          <span >
            <!-- 课程目标编辑 -->
            <div v-if="index == current1 && isEdit">
              {{index+1}}、<el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="target"
                style="width: 80%">
              </el-input>
              <div style="margin: 0 30%">
                  <el-button @click="current1 = -1">取 消</el-button>
                  <el-button type="primary" @click="updateTarget(index)">确 定</el-button>
              </div>
            </div>
            <div v-else>
              {{index+1}}、{{item.name }}
              <i class="fa fa-trash" v-if="hover && index==current" style="color: red; cursor: pointer;" @click="deleteObj(index)"></i>
              <i class="fa fa-edit" v-if="hover && index==current" style="color: green; cursor: pointer" @click="editObj(index)"></i>
            </div>
          </span>
        </div>
      </el-card>
      <el-dialog
        title="添加"
        :visible.sync="DialogVisible"
        width="500px"
        center>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTarget">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allinfo: [], //存放课程目标查询回来的所有信息
      targets: [], //所有课程目标
      DialogVisible: false, //用于表示dialog显示与否
      textarea: '', //用于
      hover: false, //用于鼠标悬浮时显示
      current: -1, //表示当前操作位置
      isEdit: false, //是否编辑
      target: '', //用于存放修改的课程项目
      current1: -1, //表示当前修改位置
    }
  },
  mounted(){
        this.findCinstanceTargets();
  },
  methods: {
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.target.findAllTargets({cinstance_id: this.$store.state.course.courseCinstanceId}).then( res => {
        // console.log(res.data);
        this.allinfo = res.data
      })
    },
    //显示鼠标悬浮时的样式
    showDelBtn(index) {
      this.current = index
      this.hover = true
    },
    //隐藏鼠标悬浮时的样式
    hideDelBtn(index) {
      this.current = index
      this.hover = false
    },
    // 鼠标按下编辑课程目标
    editObj(index){
      this.target = this.allinfo[index].name
      this.current1 = index
      this.isEdit = true
    },
    // 鼠标离开课程目标显示块元素
    mouseleave() {
      // this.current1 = -1
    },
    // 确定修改课程目标
    updateTarget(index) {
      console.log(this.target);
      if(this.target == this.allinfo[index].name) {
        this.isEdit = false
        return
      }else if(this.target == null || this.target =='') {
        this.warnMsg('课程目标不能为空')
      }else {
        this.$api.course.target.updateTarget({name: this.target, id: this.allinfo[index].id}).then( res => {
        this.succMsg(res.msg)
        this.isEdit = false
        this.findCinstanceTargets()
      })
      }
    },
    // 删除课程目标
    deleteObj(index) {
      this.$api.course.target.delTarget({id: this.allinfo[index].id}).then( res => {
        this.succMsg(res.msg)
        this.findCinstanceTargets()
      })
    },
    // 打开增加课程目标的弹窗
    openDialog() {
      this.textarea = ''
      this.DialogVisible = true
    },
    // 添加课程目标
    addTarget() {
      console.log(this.textarea);
      if(this.textarea == null || this.textarea == '') {
        this.warnMsg('课程目标不能为空')
      }else {
        this.$api.course.target.addTarget({cinstance_id: this.$store.state.course.courseCinstanceId, name: this.textarea}).then( res => {
          this.succMsg(res.msg)
          this.DialogVisible = false
          this.findCinstanceTargets()
        })
      }
    }
  }
}
</script>

<style scoped>
.el-button--text {
    color: #14889a;
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
.tcommonBox{
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding:15px;
  border-radius: 5px;
  margin-bottom: 40px;
  font-size: 15px;
  text-align: left;
  margin-top: 5px;
}
.tcommonBox h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
}
</style>