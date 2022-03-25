<template>
  <div class="tcommonBox">
    <header>
      <h1>课程目标</h1>
    </header>
    <section style="width: 90%; margin: 2% auto">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>课程目标</span>
        </div>
        <div v-for="(item, index) in allinfo" :key="index" class="text item" 
          style="border-bottom: 1px solid #ddd; margin: 2%; text-indent: 2em"
        >
          {{index+1}}、{{item.name}}
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allinfo: [],
    }
  },
   mounted(){
        this.findCinstanceTargets();
  },
  methods: {
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.target.findAllTargets({cinstance_id: this.$store.state.course.courseCinstanceId}).then( res => {
        this.allinfo = res.data
      })
    },
  }
}
</script>

<style scoped>
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