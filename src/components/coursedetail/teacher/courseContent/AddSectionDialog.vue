<template>
    <div>
        
        <el-dialog title="添加小讲" top="3vh" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
            <div >
                <!-- <h3>{{section.title}}</h3> -->
                <p>标题 <el-input v-model="section.title" placeholder="请输入标题"></el-input></p>
                <p>介绍 <el-input v-model="section.content" placeholder="请输入介绍"></el-input></p>
                <p>排序 <el-input v-model="section.orderNum" placeholder="请输入排序，越小越靠前"></el-input></p>
                <p>资源</p>
                <div class="resource">
                    <p class="headtitle"> 知识点{{section.kIds}}</p>
                    <p class="headtitle"> PPT{{section.pptUrl}}</p>
                    <p class="headtitle"> Video{{section.videoUrl}}</p>
                    <p>
                        <el-select style="width:100%;height:100%" v-model="section.knowledgeId" multiple placeholder="请选择知识点">
                            <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                        </el-select>
                    </p>
                    <p>
                        <el-upload
                            style="width:100%"
                            class="upload-demo"
                            :action="getUploadUrl(1)"
                            :on-change="handleChange"
                            :on-success="handlePptSuccess"
                            :on-error = "uploadError"
                            :file-list="section.pptUrl">
                            <el-button  size="small" type="primary">点击上传ppt</el-button>
                        </el-upload>
                    </p>
                    <p><el-upload
                            style="width:100%"
                            class="upload-demo"
                            :action="getUploadUrl(2)"
                            :on-change="handleChange"
                            :on-success="handleVideoSuccess"
                            :on-error = "uploadError"
                            :file-list="section.videoUrl">
                            <el-button  size="small" type="primary">点击上传video</el-button>
                        </el-upload>
                    </p>
                </div>{{weekId}}
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>
<script>
export default {
    props:["courseInstance","weekId"],
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
                videoId:[]
            },
            //  section:{ //一小讲
            //     title:"小讲的名称", //第几讲
            //     kId:[],
            //     pptUrl:[],
            //     videoUrl:[]
            // },
            //所有知识点
            knowledges: [],
        }
    },
    mounted(){
        this.getAllKnowledge();
    },
    watch:{
        dialogVisible(){
            this.getAllKnowledge();
        }
    },
    computed:{
      userinfo(){
       return this.$store.state.user.userInfo;
      },
    },
    methods:{
      submit(){
          if(!this.section.title ||!this.section.content){
              this.warnMsg("请填写完整");
              return false;
          }
          let submitsection =JSON.parse(JSON.stringify( this.section));
          submitsection.cinstanceWeekId = this.weekId;
          submitsection.pptId = submitsection.pptId.toString() =="" ? '0' : submitsection.pptId.toString();
          submitsection.knowledgeId = submitsection.knowledgeId.toString() =="" ? '0' : submitsection.knowledgeId.toString();
          submitsection.videoId = submitsection.videoId.toString() =="" ? '0' : submitsection.videoId.toString();
          console.log("提交",submitsection,this.section);
          this.$api.course.section.insert(submitsection).then((res) => {
            this.changedialogVisible();
            this.section={};
            this.section = {
                cinstanceWeekId: null,
                  title: null,
                  content:null,
                  knowledgeId: [],
                  orderNum: null,
                  pptId: [],
                  videoId:[]
            };
            this.$emit('getAllweeks');
        });
         
      },
      //获取上传的url
      getUploadUrl(type){  
            return this.global.baseUrl+"/cInstanceResource/file?type="+type+"&userId="+this.userinfo.id+"&dirName="+this.courseInstance.courseName+this.courseInstance.id;
      },
      //获取所有的知识点
      getAllKnowledge(){
          this.$api.knowledge.knowledge.findByCourseId({deep: 3}).then((res) => {
            console.log(res);
              this.knowledges = res.data;
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
      },
      uploadError(){
          this.errMsg("上传失败");
      },
      //上传文件的回调
        handleChange(file, fileList){
            // console.log("handleChange",file, fileList)
            // console.log(this.weeks);
            // if(file)
        },
        //ppt上传成功
        handlePptSuccess(res) { 
            console.log("上传ppt成功的回调",res);
            if(res.isok){
                this.section.pptId.push(res.data.id)
            }
            else {
                // this.errMsg(res.data)
            }
        },
         //handleVideoSuccess上传成功
        handleVideoSuccess(res) { 
            console.log("上传成功video的回调",res);
            if(res.isok){
                this.section.videoId.push(res.data.id)
            }
            else {
                // this.errMsg(res.data)
            }
        },

    }
}
</script>
<style scoped>
.resource {
    display: grid;
    grid-template-columns: auto auto auto;
	border: 1px solid #ccc;
	text-align: center;
}
.resource p {
    border: 1px solid #ccc;
}
.headtitle {
    font-weight: 700;
    padding: 5px 0;
    font-size: 1.2em;
}
.width100 {
    width: 100%;
}
</style>