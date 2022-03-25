<template>
    <div class="container">
        <el-collapse  accordion>
            <el-collapse-item v-for="(item,index1) in weeks" :key="item.index" :title="'第'+item.index+'周'" :name="index1">
                <template s slot="title">
                   <h2>第{{item.index}}周</h2>
                </template>
                <div v-for="section in item.week" :key="section.id">
                    <h3>第{{section.sectionName}}讲</h3>
                   <div class="resource">
                        <p class="headtitle"> 知识点{{section.kIds}}</p>
                        <p class="headtitle"> PPT{{section.pptUrl}}</p>
                        <p class="headtitle"> Video{{section.videoUrl}}</p>
                        <p>
                            <el-select style="width:100%;height:100%" v-model="section.kIds" multiple placeholder="请选择知识点">
                                <el-option v-for="item in knowledges" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                            </el-select>
                        </p>
                        <p>
                            <el-upload
                                style="width:100%"
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="handleChange"
                                :file-list="section.pptUrl">
                                <el-button  size="small" type="primary">点击上传ppt</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">上传提示</div> -->
                            </el-upload>
                        </p>
                        <p><el-upload
                                style="width:100%"
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="handleChange"
                                :file-list="section.videoUrl">
                                <el-button  size="small" type="primary">点击上传video</el-button>
                            </el-upload>
                        </p>
                   </div>
                </div>
                <el-button @click="addsection(index1)">添加节</el-button>
            </el-collapse-item>
            <el-button @click="addweek">添加周</el-button>
        </el-collapse>
        <add-section-dialog ref="addsection" :courseInstance="courseInstance"></add-section-dialog>
        <add-week-dialog ref="addweek" :courseInstance="courseInstance" ></add-week-dialog>
    </div>
</template>
<script>
import AddSectionDialog from "./AddSectionDialog"
import addWeekDialog from "./AddWeekDialog"
export default {
    components:{AddSectionDialog,addWeekDialog},
    data() {
        return {
            courseInstance:{}, //课程实例信息
            weeks:[
                {
                    index:1, //第几周
                    week:[
                        {
                            sectionName:1, //第几讲
                            kId:[],
                            pptUrl:[],
                            videoUrl:[]
                        },{
                            sectionName:2,
                            kId:1,
                             pptUrl:[],
                            videoUrl:[]
                        }
                    ]
                },
                {
                    index:2,
                    week:[
                        {
                            section:1,
                            kId:[],
                            pptUrl:[],
                            videoUrl:[]
                        },{
                            section:2,
                            kId:[],
                            pptUrl:[],
                            videoUrl:[]
                        }
                    ]
                },
            ],
            //所有知识点
            knowledges: [{
                id: '1',
                name: 'C语言简介'
                }, {
                id: '2',
                name: '认识算法'
                }, {
                id: '3',
                name: '算法的顺序结构'
                }, {
                id: '4',
                name: '算法的选择结构'
                }, {
                id: '5',
                name: '算法的循环结构'
                }
            ],
            
        }
    },
    mounted(){
    this.findACourseInstance(); 
    },
    methods:{
        //获取课程实例详情
        findACourseInstance(){
          this.$api.course.cinstance.findCourseInstance({id: this.$store.state.course.courseCinstanceId}).then((res) => {
            this.courseInstance = res.data;
          }).catch(err =>{
            this.courseInstance = {};
          })
        },
        //添加节
        addsection(index1){
            // this.weeks[index1].week.push({
            //     sectionName:this.weeks[index1].week.+1,
            //     kId:1,
            //     pptUrl:[],
            //     videoUrl:[]
            // })
            this.$refs.addsection.changedialogVisible();
        },
        //添加周
        addweek(){
            this.$refs.addweek.changedialogVisible();
            // this.weeks.push({
            //         index:this.weeks.+1,
            //         week:[
            //             {
            //                 sectionName:"第一讲",
            //                 kId:[],
            //                 pptUrl:[],
            //                 videoUrl:[]
            //             },{
            //                 sectionName:"第二讲",
            //                 kId:1,
            //                  pptUrl:[],
            //                 videoUrl:[]
            //             }
            //         ]
            // })
        },
        //上传文件的回调
        handleChange(file, fileList){
            console.log("handleChange",file, fileList)
            console.log(this.weeks)
        }
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