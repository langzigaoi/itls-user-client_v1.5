<template lang="">
  <div style="margin-left: 10px; margin-top: 10px; text-align: left;">
       
    <el-row :gutter="10">
      <el-col :span="2">
        <el-button type="" title="添加实验" @click="$refs.addExperiment.changeDialogVisible()">添加实验</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="" title="查看完成情况" @click="$refs.experimentCompletion.changeDialogVisible()">查看完成情况</el-button>
      </el-col>
    </el-row>

    <add-experiment ref="addExperiment" changeDialogVisible="changeDialogVisible" @getAllExperiment="getAllExperiment"></add-experiment>
    <!-- <add-experiment ref="addExperiment" changeDialogVisible="changeDialogVisible"></add-experiment>
    <view-experiment-dialog ref="viewexperiment" ></view-experiment-dialog>
    <experiment-completion ref="experimentCompletion" changeDialogVisible="changeDialogVisible"></experiment-completion> -->

    <el-table :data="experimentList" style="width: 100%;" :header-cell-style="{textAlign:'center'}"
      :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="order" label="实验序号" width="100" sortable>
      </el-table-column>
      <el-table-column prop="name" label="实验名称" width="150" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="location" label="实验地点" width="150" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="startTime" label="实验开始时间" width="250" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{dateTimeFormate(new Date(scope.row.startTime))}}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="实验截止时间" width="250" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{dateTimeFormate(new Date(scope.row.endTime))}}
        </template>
      </el-table-column>
      <el-table-column prop="isPub" label="状态" width="150">
        <template slot-scope="scope">
          <div>{{scope.row.isPub | isPubFilter}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270" fixed="right">
        <template slot-scope="scope">
          <el-button-group style="width:500px">
            <el-button size="small" @click="viewExperiment(scope.row.id)">查看</el-button>
            <el-button size="small" type="primary" :disabled="Boolean(scope.row.isPub)" @click="$refs.updateExperiment.changeDialogVisible(scope.row.id)">修改</el-button>
            <update-experiment ref="updateExperiment" changeDialogVisible="changeDialogVisible" @getAllExperiment="getAllExperiment"></update-experiment>
            <el-button size="small" type="success" :disabled="Boolean(scope.row.isPub)" @click="updateIsPub(scope.row.id, 1)">发布</el-button>
            <el-button size="small" type="danger" :disabled="Boolean(scope.row.isPub)" @click="deleteExp(scope.row.id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <add-experiment ref="addExperiment" changeDialogVisible="changeDialogVisible"></add-experiment>
    <view-experiment-dialog ref="viewexperiment" ></view-experiment-dialog>
    <experiment-completion ref="experimentCompletion" changeDialogVisible="changeDialogVisible"></experiment-completion>






    <!-- <top-bar :tabItems="tabItems" :btnItems="tabBtnItems" style="margin-tap: 10px; margin-right: 12px !important;"
             @btnClick0="$refs.addExperiment.changeDialogVisible()"
             @btnClick1="$refs.experimentCompletion.changeDialogVisible()">
      <div slot="right-from-select" style="width: 150px"></div>
      <div slot="right-from-cascader" style="width: 150px"></div>
    </top-bar>
    <au-table
      :columns="columns"
      :data="experimentList"
      border
      :btnItems="tableBtnItems"
      @btnClick0="viewExperiment1"
    ></au-table> -->

  </div>
</template>
<script>
  import AddExperiment from './AddExperiment.vue' //增加-弹框
  import ViewExperimentDialog from './ViewExperimentDialog.vue'
  import ExperimentCompletion from './ExperimentCompletion.vue'
  import UpdateExperiment from './UpdateExperiment.vue'
  // import TopBar from '@/components/common/table/TopBar.vue'
  // import AuTable from '@/components/common/table/AuTable.vue'
  export default {
    components: { AddExperiment, ViewExperimentDialog, ExperimentCompletion, UpdateExperiment}, //, TopBar,  AuTable
    data() {
      return {
        tabItems: ['课程实验'],
        tabBtnItems:[{
          icon: "el-icon-plus",
          label: "添加实验",
          type: "primary",
          disabled: false,
          size: 'medium'
        },
        {
          icon: "el-icon-search",
          label: "查看完成情况",
          type: "primary",
          disabled: false,
          size: 'medium'
        }],
        columns: [
        {prop: "name", label: "实验名称", minWidth: 150, align: "center" },
        {prop: "location", label: "实验地点", minWidth: 150, align: "center" },
        {prop: "startTime", label: "实验开始时间", minWidth: 150, align: "center" },
        {prop: "endTime", label: "实验截止时间", minWidth: 150, align: "center" },
        {prop: "isPub", label: "状态", minWidth: 150, align: "center" }
      ],
      tableBtnItems: [
        {
          icon: "",
          label: "查看",
          type: "default",
          size: "mini",
          disabled: false,
        },
        {
          icon: "",
          label: "修改",
          type: "primary",
          size: "mini",
          disabled: [['isPub'],[1]],
        },
        {
          icon: "",
          label: "发布",
          type: "success",
          size: "mini",
          disabled: [['isPub'],[1]],
        },
        {
          icon: "",
          label: "删除",
          type: "danger",
          size: "mini",
          disabled: [['isPub'],[1]],
        }
      ],
      data:[],
        experiment: {
          id: '',
          code: '',
          insId: '',
          order: '',
          name: '',
          object: '',
          environment: '',
          location: '',
          startTime: '',
          endTime: '',
          number: '',
          pointsPerP: '',
          pubTime: '',
          isPub: '',
          problemId: [],
          knowledgeIds: ''
        },
        experimentList: null,
      }
    },
    filters: {
      isPubFilter(isPub) {
        if (isPub == 1)
          return '已发布';
        else if (isPub == 0) {
          return '未发布';
        }
      }
    },
    methods: {
      getAllExperiment() {
        console.log("2");
        this.$api.experiment.experiment.searchAll({ insId: this.$store.state.course.courseCinstanceId }).then((res) => {
          this.experimentList = res.data
          console.log(this.experimentList);
        })
      },
      updateIsPub(id, ispub) {
        this.experiment.id = id;
        this.experiment.isPub = ispub;
        console.log(this.experiment);
        this.$api.experiment.experiment.updateIsPub(this.experiment).then((res) => {
          if (res.code == 200 && ispub == 1) {
            this.getAllExperiment();
            this.$message.success("发布成功");
          }
          else if (res.code == 200 && ispub == 0) {
            this.getAllExperiment();
            this.$message.success("取消发布成功");
          }
          else this.$message.error("操作失败");
        })
      },
      viewExperiment(index) {
        this.$refs.viewexperiment.changevisible();
        this.$refs.viewexperiment.getExperimentInfo(index);
      },
      viewExperiment1(scope) {
        let index = scope.row.id
        this.$refs.viewexperiment.changevisible();
        this.$refs.viewexperiment.getExperimentInfo(index);
      },
      toCompletion() {
        this.$router.push({
          path: "/course/experimentCompletion"
        })
      },
      deleteExp(id) {
        this.$confirm("确定删除该实验？")
        .then((_) => {
          console.log(id);
          this.$api.experiment.experiment.deleteExp({id: id}).then((res) => {
            if (res.code == 200) {
              this.getAllExperiment();
              this.$message.success("删除成功");
            }
          })
        })
      },

    },
    mounted() {
      this.getAllExperiment();
    },
  }
</script>