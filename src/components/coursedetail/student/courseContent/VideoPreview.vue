<template>
    <div>
        <el-dialog title="视频预览" top="3vh" :visible.sync="dialogVisible" width="60%" :destroy-on-close="true">
        <video width="100%" controls="autoplay" :src="path+'/course/resource/video?path='+videoPath" /> 
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            section:{
                cinstanceWeekId: null,
                title: null,
                content:null,
                knowledgeId: [],
                orderNum: null,
                pptId: [],
                videoId:[],
                path:""
            },
            knowledges: [],
        }
    },
    props:{
      videoPath:"",
    },
    mounted(){
        // this.getAllKnowledge();
        this.getpath();
    },
    watch:{
        dialogVisible(){
            
        }
    },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      },
    },
    methods:{
      changedialogVisible(){
          this.dialogVisible = !this.dialogVisible;
      },
      getpath(){
        this.path = this.global.baseUrl;
      }

      

    }
}
</script>
<style scoped>

</style>