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
							<span>{{ props.row.problemName }}</span>
						</el-form-item><hr><br>
						<el-form-item label="题目详情:">
							<span>{{ props.row.problemDescription }}</span>
						</el-form-item><hr><br>
						<el-form-item label="最大运行时间:">
							<span>{{ props.row.problemTimeLimit }}MS</span>
						</el-form-item><span style="width:20%;"/>
						<el-form-item label="最大运行内存:">
							<span>{{ props.row.problemMemoryLimit }}K</span>
						</el-form-item><hr><br>
						<el-form-item label="输入格式:">
							<span>{{ props.row.problemInputFormat }}</span>
						</el-form-item><hr><br>
						<el-form-item label="输出格式:">
							<span>{{ props.row.problemOutputFormat }}</span>
						</el-form-item><hr><br>
						<el-form-item label="输入样例:">
							<span>{{ props.row.problemSampleInput }}</span>
						</el-form-item><hr><br>
						<el-form-item label="输出样例:">
							<span>{{ props.row.problemSampleInput }}</span>
						</el-form-item><hr><br>
						<el-form-item label="答案/提示:">
							<span>{{ props.row.problemHint }}</span>
						</el-form-item><hr><br>
						<el-form-item label="难度:">
							<span>{{ props.row.difficulty }}</span>
						</el-form-item><hr><br>
					</el-form>
				</template>
			</el-table-column>
			
			<el-table-column prop="problemName" label="题干" width="300%" :formatter="stateFormat"> </el-table-column>
			<el-table-column prop="problemDescription" label="题目详情" width="300%" :formatter="stateFormat"> </el-table-column>
			<el-table-column label="输入格式" prop="problemInputFormat" width="300%" :formatter="stateFormat"> </el-table-column>
			<el-table-column prop="problemOutputFormat" label="输出格式" width="300%" :formatter="stateFormat"> </el-table-column>
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
        // 过滤器
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

            console.log(data)
            
            // 数据处理
			data.forEach(element => {

				try {
					this.knowledge.forEach(result => {
						if (element.knowledge == result.name) {
							this.problemList.push({id: 0, code: '', progId: 0, courseId: 2, course: null, knowledgeId: result.id, knowledge: null, problemIsPublic: 1, problemName: element.problemName,
                            problemTimeLimit: element.problemTimeLimit, problemMemoryLimit: element.problemMemoryLimit, problemDescription: element.problemDescription,
                            problemInputFormat: element.problemInputFormat, problemOutputFormat: element.problemOutputFormat,
                            problemSampleInput: element.problemSampleInput, problemSampleOutput: element.problemSampleOutput,
                            problemHint: element.problemHint, difficulty: element.difficulty, isDelete: 0, userId: this.userId, status:0,
                            action: 1, actionUserId: this.userId, pass: 1, difficultyDegree: element.difficulty});
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


            // console.log(this.problemList[0]);
            // this.$api.problem.prog.AdminAudit(this.problemList[0]).then((res) => {
            //     console.log(res);
            // })

			this.problemList.forEach(element => {
				this.$api.problem.prog.AdminAudit(element).then((res) => {
					if (res.code != 200) {
                        flag = false
                    }
				})
			});
            if (flag) {
                this.Msg("导入成功");
            }
		},
        // 实现
        download(){
            let url = "/problem/prog/downloadPdf?courseId=" + this.courseId;
            // console.log(url);
            window.open(this.global.baseUrl + url);
        },
        downloadExcel() {
            let url = "/problem/prog/downloadExcel";
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
