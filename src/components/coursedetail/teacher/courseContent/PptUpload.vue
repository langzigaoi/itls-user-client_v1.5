<template>
    <div>
        <el-dialog title="PPT上传" top="3vh" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <!-- {{global}} -->
            <div >
                
                <!-- <p>介绍 <el-input v-model="section.content" placeholder="请输入介绍"></el-input></p>
                
                <p>教学内容
                    <el-select style="width:100%;height:100%" v-model="section.knowledgeId" multiple placeholder="请选择知识点">
                        <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </p>
                <p>教学重点
                    <el-select style="width:100%;height:100%" v-model="section.importantKnowledgeId" multiple placeholder="请选择知识点">
                        <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </p>
                <p>教学难点
                    <el-select style="width:100%;height:100%" v-model="section.difficultKnowledgeId" multiple placeholder="请选择知识点">
                        <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                    </el-select>
                </p> -->
                <!-- 每次文件列表有变化，把文件列表先存起来，后面提交的时候再把文件的id提取出来 -->
                 <!-- 使用手挡上传，输入完文件名后再上传,可以使用这个组件直接上传不用使用axios调用接口 -->
                <p>PPT
                    <el-upload
                        :on-change="handleChange"
                        accept=".pdf,.ppt,.pptx"
                        style="width:100%"
                        class="upload-demo"
                        :action="getUploadUrl(1)"
                        :on-success="handlePptSuccess"
                        :on-remove="onRemovePpt"
                        :on-error = "uploadError"
                        :before-upload = "pptBeforeUpload"
                        :auto-upload="false"
                         ref="uploadppt"
                         with-credentials
                        :file-list="fileList">
                        <el-button  size="small" type="primary">点击上传ppt</el-button>
                    </el-upload>
                </p>
                <!-- <p>视频
                    <el-upload
                    ref="uploadvideo"
                        :on-change="handleChange"
                        accept=".pdf,.ppt,.pptx"
                        style="width:100%"
                        class="upload-demo"
                        :action="getUploadUrl(2)"
                        :on-remove="onRemoveVideo"
                        :on-error = "uploadError"
                        :auto-upload="false"
                        :on-success="handleVideoSuccess"
                        with-credentials
                        :file-list="section.videoIdSource">
                        <el-button  size="small" type="primary">点击上传video</el-button>
                    </el-upload>
                </p> -->

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
            
        </el-dialog>

        <!-- <p>文件名 <el-input v-model="customFileName" placeholder="请输入文件名"></el-input></p><br /> -->
        <!-- 上传完成后显示这个 -->
        <el-dialog  style="z-index:2300" width="60%" title="请输入文件名" :visible.sync="customFileNameDialog" :close-on-click-modal="false">
            <p>文件名
                <el-select @change="fileNameChange" filterable  style="width:100%;height:100%" v-model="customFileName"  placeholder="请选择知识点">
                    <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="`${item.name},${item.id}`"> </el-option>
                </el-select>
            </p>
            <el-button type="primary" @click="uploadFile()">上传</el-button>
        </el-dialog>
        
        
        
    </div>
</template>
<script>
export default {
    //把要修改的section传过来
    props:["courseInstance","sectionId","weekId"],
    data() {
        return {
            dialogVisible: false,
            section:{}, // 用来存储上传的pdf 和video
            knowledges: [],
            customFileNameDialog:false,  //自定义文件名的框
            customFileName :null , //自定义文件名 就是知识点的名字
            customFileName1:null , //没用  
            knowledgeId:null , //关联知识点的id
            fileList:[],
            pptSource:[],
        }
    },
    watch:{
        dialogVisible(){
            if(this.dialogVisible){
                this.getSection();
            }
        }
    },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      },
    },
    methods:{
        //点击后 手动上传文件 
        uploadFile(){
            console.log(this.$data)
            if(!this.customFileName){
                console.log("自定义文件名为空");
                this.errMsg("请选择文件名")
                return;
            }
            // 调用组件方法上传给服务器
            this.$refs.uploadppt.submit();
            // this.$refs.uploadvideo.submit();
        },
     //选择文件名就是知识点 的时候触发 这时候要给customFileName和knowledgeId赋值
     fileNameChange(value){ //value包括name和id
         console.log(value);
         this.customFileName = value.split(',')[0];
         this.knowledgeId = value.split(',')[1];
         console.log(this.customFileName,this.knowledgeId)
     },

     // 将修改的东西提交
      submit(){
        //   let submitsection = JSON.parse(JSON.stringify(this.section)); 
        //   console.log("提交的东西"+submitsection.videoIdSource)
        //   submitsection.importantKnowledgeId = !submitsection.importantKnowledgeId ? '' : submitsection.importantKnowledgeId.toString();
        //   submitsection.difficultKnowledgeId = !submitsection.difficultKnowledgeId ? '' : submitsection.difficultKnowledgeId.toString();
        //   submitsection.knowledgeId = !submitsection.knowledgeId ? '' : submitsection.knowledgeId.toString();
        //   处理ppt的id
          let pptId = [];
        //   submitsection.pptSource.forEach(item =>{
        //       if(item.id) //有id代表是原来上传的文件
        //         submitsection.pptId.push(item.id)
        //       else //后面上传的文件
        //          submitsection.pptId.push(item.response.data.id)
        //   })
              this.pptSource.forEach(item =>{
              if(item.id) //有id代表是原来上传的文件
                pptId.push(item.id)
              else //后面上传的文件
                pptId.push(item.response.data.id)
          })
          
          let pptid = pptId.toString();
          console.log(pptid);
         //处理video的id
        //   submitsection.videoId = [];
        //   submitsection.videoIdSource.forEach(item =>{
        //       if(item.id) //有id代表是原来上传的文件
        //         submitsection.videoId.push(item.id)
        //       else //后面上传的文件
        //          submitsection.videoId.push(item.response.data.id)
        //   })
        //   submitsection.videoId = submitsection.videoId.toString();
        //   console.log("提交",submitsection); 
        //   //发请求 

        //   this.$api.course.section.updateSection(submitsection).then((res) => {
        //     this.changedialogVisible();
        //     this.$emit('getAllweeks');
        //     this.Msg(res.msg);
        //   })
            this.$api.course.section.updatepptid({pptId:pptid,sectionid:this.sectionId}).then((res) => {
            this.changedialogVisible();
            this.$emit('getAllweeks');
            this.Msg(res.msg);
          })
        
      },

      //获取上传的url
      getUploadUrl(type){  
            // 将参数拼接生成url
            const url =this.global.baseUrl+ "/course/resource/file?knowledgeId="+this.knowledgeId+"&customFileName="+this.customFileName+"&type="+type+"&userId="+this.userinfo.id+"&dirName="+this.courseInstance.courseName+this.courseInstance.id;
            
            return url
      },

     //获取所有的知识点
      getAllKnowledge(){
        this.$api.knowledge.knowledge.selectByDeepAndCinstance({
          deep: 3,
          courseId:this.$store.state.course.courseCinstanceId
        }).then((res) => {
          console.log(res.code);
          this.knowledges = res.data.data;
          console.log(this.knowledges);
          //转换数据进行显示
          this.knowledges.forEach(element => {
              element.id = element.id.toString(); //转成字符类型 el-select 初始值设置问题
          });
        //   if( this.section.knowledgeId)
        //     this.section.knowledgeId = this.section.knowledgeId.split(",");
        //   if( this.section.importantKnowledgeId)
        //     this.section.importantKnowledgeId = this.section.importantKnowledgeId.split(",");
        //   if( this.section.difficultKnowledgeId)  
        //       this.section.difficultKnowledgeId = this.section.difficultKnowledgeId.split(",");
          
            this.section.pptSource.forEach(element =>{
                element.name = element.fileName
            })

            this.section.videoIdSource.forEach(element =>{
                element.name = element.fileName
            })
          })
      },
      //获取节
      getSection(){
        this.$api.course.section.selectById({id:this.sectionId}).then((res) => {
          this.section = res.data;
          this.getAllKnowledge();
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

      // 添加文件、上传成功时调用
      handleChange(file, fileList){
          console.log("handleChange",file);
          if(file.status == "ready") //只有是上传文件时候才显示输入文件名的框
            {
                // this.customFileName = file.name.split(".")[0];
                this.customFileNameDialog = true;
            }
      },
      //ppt上传前填写文件名
      pptBeforeUpload(){
          console.log("上传前的回调");
        //   this.customFileNameDialog = true;
         
           return true;
      },
      //上传失败的回调
      uploadError(){
          this.errMsg("上传失败");
          console.log("上传失败");
      },
      //ppt移除的回调
        onRemovePpt(file, fileList){
            console.log("onRemovePpt",fileList);
             this.section.pptSource = fileList;
        },
        //video移除的回调
        // onRemoveVideo(file, fileList){
        //     console.log("onRemoveVideo",fileList);
        //     this.section.videoIdSource = fileList;
        // },

        //ppt上传成功 关闭输入文件名的弹框
        handlePptSuccess(res, file, fileList) { 
            console.log("Success",fileList);
            // this.section.pptSource = fileList;
            if(res.code==200){
                // this.section.pptSource = fileList;
                // console.log(this.section.pptSource);
                this.pptSource = fileList;
               // this.section.pptId = this.section.pptId +","+res.data.id;
                this.customFileNameDialog = false;
            }
            else {
                 this.errMsg(res.msg)
            }
        },
         //handleVideoSuccess上传成功
        // handleVideoSuccess(res, file, fileList) { 
        //     console.log("Success",fileList);
        //     this.section.videoIdSource = fileList;
        //     console.log(file);
        //     if(res.code == 200){
        //         this.section.videoIdSource = fileList;
        //         //this.section.videoId.push(res.data.id)
        //         this.customFileNameDialog = false;
        //     }
        //     else {
        //          this.errMsg(res.data)
        //     }
        // },

    }
}
</script>
<style scoped>


.headtitle {
    font-weight: 700;
    padding: 5px 0;
    font-size: 1.2em;
}
.width100 {
    width: 100%;
}
</style>