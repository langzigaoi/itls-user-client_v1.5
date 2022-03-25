<template>
    <div>
        <el-dialog title="添加周" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <p>标题 <el-input v-model="week.title" placeholder="请输入标题"></el-input></p>
            <p>介绍 <el-input v-model="week.content" placeholder="请输入介绍"></el-input></p>
            <p>排序 <el-input v-model="week.orderNum" placeholder="请输入排序，越小越靠前"></el-input></p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
  export default {
      props:["courseInstance"],
    data() {
      return {
        dialogVisible: false,
        week:{
            cinstanceId: null,
            content: null,
            orderNum: 1,
            title: null,
        }
      };
    },
    methods: {
      submit(){
          this.week.cinstanceId = this.courseInstance.id;
          console.log("提交",this.week);
          this.$api.course.week.insert(this.week).then((res) => {
            this.Msg(res.data);
            this.changedialogVisible();
            this.week = {};
            this.$emit('getAllweeks');
          })
      },
      changedialogVisible(){
          this.dialogVisible = !this.dialogVisible;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>