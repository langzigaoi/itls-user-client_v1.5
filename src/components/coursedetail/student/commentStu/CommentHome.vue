<template>
	<div>
		<button class="count" @click="$refs.postDialog.changePostQuestionDialogVisible()">发帖</button>
		<router-link class="count" to="/studycourse/commentgrade">课程讨论信息</router-link>
		<!-- <comment-pro-list :tag="tag" ref="listDialog" @changeAlterCommentVisible="changeAlterCommentVisible"></comment-pro-list> -->
		<button class="count" >评论max</button>
		<button class="count" >宠爱max</button>
		<button class="count" >浏览max</button>
		<post-dialog ref="postDialog" :courseId="courseId"></post-dialog>
		<!-- <comment-pro-list :courseId="courseId" ref="listDialog" @changeAlterACommmentDialogVisible="changeAlterACommmentDialogVisible"></comment-pro-list> -->
		<comment-pro-list :courseId="courseId" ref="listDialog" ></comment-pro-list>
	</div>

</template>

<script>
import CommitQuestion from './CommitQuestion'
import postDialog from './PostQuestion' 
import commentProList from './CommentAction'

export default {
		name: 'CommentHome',
		data() {
			return {
				currentComment:null,
				courseId:null,
			}
		},
		components: {
			CommitQuestion,
			postDialog,
			commentProList,
		},
		methods:{
			// changeAlterAProblemDialogVisible(problem){
      //       this.currentComment = problem;
      //       // console.log(this.currentProblem,"111111")
      //       this.$refs.alterDialog.changeAlterAProblemDialogVisible()
      //   },
			getcourseId(cinstanceId){
				this.$api.course.cinstance.findCourseInstance({id: cinstanceId}).then((res) => {
					this.courseId = res.data.courseId;
					console.log("asd",this.courseId);
				}).catch(err =>{
					this.courseInstance = {};
				})
			},
			updateList(){
					console.log("调用刷新列表")
					this.$refs.listDialog.getAll();
			},
		},
		mounted(){
        this.getcourseId(this.$store.state.course.courseCinstanceId); //先通过课程实例id查课程id 
    },
}
</script>

<style>
.count {
    
    /* display: inline-block; */
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
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