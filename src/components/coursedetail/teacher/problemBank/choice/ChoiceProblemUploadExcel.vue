<template>

    <div style="margin-top:3vh;">
        <div >

            <el-upload
                style="float:left; width:120px; height:60px; margin-right: 10px; margin-left: 10px"
                action=""
                accept=".xlsx, .xls"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handle"
            >
                <el-button class="addbtn" type="primary" slot="trigger">选取文件数据</el-button>
                
            </el-upload>
            <el-button class="addbtn" type="success"  @click="upload">导入数据库</el-button>
            <el-button class="addbtn" type="success"  @click="downloadExcel()">EXCEL模板下载</el-button>
            <el-button class="addbtn" type="success"  @click="download()">下载PDF</el-button>
                        
            
		
        </div>
        <el-table height="50px"  :data="problemList" style="overflow: scroll;width: 100%;max-height:70vh;min-height:70vh;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="题干:">
							<span>{{ props.row.title }}</span>
						</el-form-item><hr><br>
						<el-form-item label="选项:">
							<div v-for="(item, i) in JSON.parse(props.row.options)" :key="item">
								<span>{{String.fromCharCode(65 + i)}}.{{item.option}}</span>
							</div>
						</el-form-item><hr><br>
						<el-form-item label="答案:">
							<span>{{props.row.answer| answerFilters}}</span>
						</el-form-item><hr><br>
						<el-form-item label="分析:">
							<span>{{ props.row.analysis }}</span>
						</el-form-item><hr><br>
						<el-form-item label="难易度:">
							<span>{{ props.row.difficulty }}</span>
						</el-form-item><hr><br>
					</el-form>
				</template>
			</el-table-column>
			
			<el-table-column prop="title" label="题干" width="300%" :formatter="stateFormat"> </el-table-column>
			<el-table-column prop="options" label="选项" width="300%" :formatter="stateFormat"> </el-table-column>
			<el-table-column label="答案" prop="" width="100%"> 
				<template slot-scope="scope">
					<span>{{scope.row.answer| answerFilters}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="analysis" label="分析" width="300%" :formatter="stateFormat"> </el-table-column>
			<el-table-column prop="difficulty" label="难度" width="100%" :formatter="stateFormat"> </el-table-column>
			
		</el-table>

    </div>


</template>



<script>
import xlsx from 'xlsx'
import {readFile} from '../../../../../utils/file';
export default{



    data() {
        return {
            courseId:0,
			userId: 0,
            problemList:[], 
			knowledge:[],
            file: '',
            path:'D:\\1.pdf'
        }
    },
    created(){
        this.courseId = this.$route.query.courseId,
        this.findknowledge()
    },
	computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
	filters:{
        answerFilters(answer){
            if(answer==0){
                return "A";
            }
			if(answer==1){
                return "B";
            }
            if(answer==2){
                 return "C";
            }
            if(answer==3){
                 return "D";
            }
        }
    },
    methods:{

        async handle(res) {

            this.problemList = new Array;


			if (!this.userinfo.id) {
				this.errMsg("获取当前用户失败");
            	return
			}
			this.findknowledge();
			this.userId = this.userinfo.id;
            let file = res.raw;
            if(!file) return;
            let data = await readFile(file);

            let wordBook = xlsx.read(data, {type: "binary"}),
                wordSheet =  wordBook.Sheets[wordBook.SheetNames[0]];
            data = xlsx.utils.sheet_to_json(wordSheet);
			data.forEach(element => {
				let options = JSON.parse(element.options);

				try {
					this.knowledge.forEach(result => {
						if (element.knowledgeName == result.name) {
							this.problemList.push({courseId: this.courseId, knowledgeId: result.id, title: element.title, options: element.options, answer: element.answer, analysis: element.analysis, 
								difficulty: element.difficulty, isDelete: element.is_delete, userId: this.userId, action: 1, pass: 1 ,
                                id: 0, code: null, status:1, problemChoiceId:0, actionUserId: 0, knowledge: null});
								throw new Error("LoopTerminates");
						}
					})
				} catch (e) {
					if (e.message !== "LoopTerminates") throw e;
				}
				
				
			})


        },
		upload() {

            let flag = true;
            if (this.problemList.length == 0) {
                this.Msg("未找到数据");
                return;
            }
			this.problemList.forEach(element => {
				this.$api.problem.choice.AdminAudit(element).then((res) => {
					if (res.code != 200) {
                        flag = false
                    }
				})
			});
            if (flag) {
                this.Msg("导入成功");
            }
		},
        download(){
            let url = "/problem/choice/downloadPdf?courseId=" + this.courseId;
            // console.log(url);
            window.open(this.global.baseUrl + url);
        },
        downloadExcel() {
            let url = "/problem/choice/downloadExcel";
            // console.log(url);
            window.open(this.global.baseUrl + url);
        },

        findknowledge(){
          this.$api.knowledge.knowledge.findAllByCourse({courseId: this.courseId}).then((res) => {
				console.log(res)
				this.knowledge = res.data.data;
			});
        },
		// 格式化表格消息内容
        stateFormat(row, column, cellValue) {
			// console.log(row , column , cellValue)
			if (!cellValue) return "";
			if (cellValue.length > 20) {
				//最长固定显示38个字符
				return cellValue.slice(0, 20) + "...";
			}
			return cellValue;
        },
    },
}
</script>
<style   scoped>
.el-table::before {
    height: 0px;
 }
 .addbtn {
    
    /* display: inline-block; */
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    float: left;
    
}
</style>
