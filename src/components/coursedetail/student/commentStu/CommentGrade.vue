<template>
	<div>
		hhaha
		<!-- 信息界面效果 -->
		<el-col>
			<div>
			<el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
			<el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
			<el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
			<el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
		</div>
		</el-col>
	</div>
</template>

<script>
export default {
	name: 'CommentGrade'
}
</script>

<style>

</style>