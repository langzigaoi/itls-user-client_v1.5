<template>
	<div class="outside" style="padding:50px ">
		<el-row>
			<el-col align="left">
				<el-form>
					<el-form-item>
						<el-button size="mini" type="primary" @click="handleModelDownload">模板下载</el-button>
						<el-button size="mini" type="primary" @click="handleFileUpload">批量导入</el-button>
					</el-form-item>
					<!-- </el-button> -->
				</el-form>
			</el-col>
		</el-row>
		<com-table :data="pageResults" :columns="columns" :showOperation="true" @findPage="findPage" @handleRemove="handleRemove"
		 :showFlag="showFlag"></com-table>
		<el-dialog title="批量导入" ref="uploadFrom" :visible.sync="FileUploadDialogFormVisible" destroy-on-close>
			<el-form :model="uploadForm">
				<el-form-item label-width="120px" align="left">
					<el-upload style="margin-left: 0.5%" ref="upload" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
					 :before-remove="beforeRemove" :on-change="handleChange" :auto-upload="false">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传xlsx、xls文件</div>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="FileUploadDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleUploadSure">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import ComTable from '../../../common/ComTable.vue';

	export default {
		components: {
			ComTable
		},
		data() {
			return {
				record: {},
				pageRequest: {
					pageNum: 1,
					pageSize: 10
				},
				pageResults: {},
				FileUploadDialogFormVisible: false, //上传对话框控制
				uploadForm: {
					fileList: null,
				},
				columns: [{
						prop: "stuNo",
						label: "学号",
						minWidth: 150,
						align: "center"
					},
					{
						prop: "name",
						label: "名字",
						minWidth: 150,
						align: "center"
					},
				],
				selections: [],
				multipleSelection: [],
				// 设置需显示和禁用的标记
				showFlag: {
					batchRemove: true,
					removeStudent: true,
				},
				// disableFlag:{
				//   // view: true,
				// },
			};
		},
		methods: {
			// 分页查询
			findPage(data) {
				if (data !== null) {
					this.pageRequest = data.pageRequest;
				}
				this.pageRequest.params = [{
					name: "cinstanceId",
					value: this.$store.state.course.courseCinstanceId
				}, ];
				// console.log(this.pageRequest);
				this.$api.course.choosing
					.findPage(this.pageRequest)
					.then((res) => {
						// console.log(res.data);
						this.pageResults = res.data;
						// console.log(this.pageResults);
					})
					.then(data != null ? data.callback : "");
			},
			handleChange(file, fileList) {
				console.log(file.name.substring(file.name.lastIndexOf(".") + 1));
				if (
					file.name.substring(file.name.lastIndexOf(".") + 1) === "xlsx" ||
					file.name.substring(file.name.lastIndexOf(".") + 1) === "xls"
				) {
					this.uploadForm.fileList = file.raw;
				} else {
					this.$refs.upload.clearFiles();
					this.$message.error("文件类型错误！");
				}
			},
			// 删除
			handleRemove(data) {
				// console.log("diaodaole");
				console.log(data.params);
				this.$api.course.choosing.remove(data.params)
					.then(data != null ? data.callback : "");
			},
			handleFileUpload() {
				this.uploadForm = {
					fileList: null,
				};
				this.FileUploadDialogFormVisible = true;
			},
			handleUploadSure() {
				console.log(this.uploadForm.courseId); //这个courseId打印不出来，获取不到
				console.log(this.uploadForm.fileList);
				this.handleFile(true);
			},
			handleModelDownload() {
				this.$api.course.choosing.model().then((res) => {
					if (res.code == 200) {
						this.$message({
							message: "模板下载成功！",
							type: "success"
						});
					} else {
						this.$message({
							message: "模板下载失败！",
							type: "error",
						});
					}
				});
			},
			handleFile(isMySelf) {
				if (!isMySelf) {
					return;
				}
				let fileFormData = new FormData();
				// fileFormData.append("courseId", this.uploadForm.courseId);
				// 添加参数
				let cinstanceId = this.$store.state.course.courseCinstanceId;
				console.log(cinstanceId);
				fileFormData.append("file", this.uploadForm.fileList);
				fileFormData.append("cinstanceId", cinstanceId);
				this.$api.course.choosing.bulkImportByCid(fileFormData).then((res) => {
					console.log(res);
					if (res.code != 200) {
						this.$message({
							message: res.message,
							type: "error",
						});

						this.FileUploadDialogFormVisible = true;
					} else {
						this.$message({
							message: res.message,
							type: "success"
						});
						this.findPage;
						// this.initColumns();
						this.FileUploadDialogFormVisible = false;
						console.log(FileUploadDialogFormVisible);
					}
				});
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${file.name}？`);
			},

		},
		filters: {
			isAssistantFilter(isAssistant) {
				if (isAssistant == 1) return "助教";
				else if (isAssistant == 0) return "学生";
				else if (isAssistant == "主讲") {
					return "主讲";
				} else if (isAssistant == "开课教师") {
					return "开课教师";
				}
			},
		},
		mounted() {
			// this.findInfoByCid();
			// this.findPage();
		},
	};
</script>
<style scoped>
	.outside {
		text-align: center;
	}
</style>
