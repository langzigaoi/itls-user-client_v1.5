<template>
  <div>
    <div>
      <el-row type="flex" align="bottom" justify="start">
        <el-button
          size="mini"
          type="primary"
          @click="addRow(data.tableData)"
          v-if="columnFlag.addButton == true"
        >
          新增
        </el-button>
        <el-button
          @click="choose"
          size="mini"
          type="primary"
          v-if="columnFlag.selectButton == true"
        >
          选题
        </el-button>
      </el-row>
    </div>

    <el-table
      ref="table"
      :data="data.tableData"
      :highlight-current-row="highlightCurrentRow"
      :border="border"
      :show-overflow-tooltip="showOverflowTooltip"
      :max-height="maxHeight"
      :size="size"
      :align="align"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      :columnFlag="columnFlag"
      :allProblemType="allProblemType"
      style="width: 100%"
      :stripe="stripe"
    >
      <!-- <el-table-column
        type="selection"
        width="30"
        v-if="showBatchDelete & showOperation"
      ></el-table-column> -->

      <el-table-column
        type="index"
        width="50"
        label="序号"
        align="center"
        :index="indexMethod"
      ></el-table-column>

      <!--题型设置-->
      <el-table-column
        prop="problemType"
        label="类型"
        v-if="columnFlag.problemType == true"
      >
        <template scope="scope">
          <el-select
            ref="selectLable"
            v-model="scope.row.problemTypeId"
            @click.native="beforeChangeProblemType(scope.$index, scope.row)"
            @change="changeProblemType(scope.row)"
          >
            <el-option
              v-for="item in allProblemType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="数量" v-if="columnFlag.num == true">
        <template scope="scope">
          <el-input size="mini" v-model="scope.row.num"> </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="分值(本类型总分值)"
        v-if="columnFlag.score == true"
      >
        <template scope="scope">
          <el-input size="mini" v-model="scope.row.score"> </el-input>
        </template>
      </el-table-column>

      <!--题目设置-->
      <el-table-column
        prop="id"
        label="类型"
        v-if="columnFlag.viewProblemType == true"
      >
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        v-if="columnFlag.viewNum == true"
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="分值(本类型总分值)"
        v-if="columnFlag.viewScore == true"
      >
      </el-table-column>

      <el-table-column
        prop="knowledgeName"
        label="知识点"
        v-if="columnFlag.previewKnowledgeName == true"
      >
      </el-table-column>
      <el-table-column
        width="400"
        prop="title"
        label="题干"
        v-if="columnFlag.previewTitle == true"
      >
      </el-table-column>


      <el-table-column
        prop="knowledgeName"
        label="知识点"
        v-if="columnFlag.knowledgeName == true"
      >
        <template scope="scope">
          <el-input size="mini" v-model="scope.row.knowledgeName"> </el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="分值"
        v-if="columnFlag.singleScore == true"
      >
        <template scope="scope">
          <el-input size="mini" v-model="scope.row.score"> </el-input>
        </template>
      </el-table-column>

      <!--双向细目-->
      <el-table-column
        prop="problemTypeName"
        label="类型"
        v-if="columnFlag.objProblemTypeName"
      >
      </el-table-column>
      <el-table-column
        prop="knowledgeName"
        label="知识点"
        v-if="columnFlag.objKnowledgeName"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="score" label="分值" v-if="columnFlag.objScore">
      </el-table-column>
      <el-table-column
        prop="problemType"
        label="目标"
        v-if="columnFlag.objObjective == true"
        width="300"
      >
        <template scope="scope">
          <el-select 
          popper-class="popper"           
          v-model="scope.row.objectiveId">
            <el-option
              v-for="item in allObjective"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            <!-- <el-row>
              <el-col :span="20">
                <div style="width:100%; overflow:hidden; text-overflow: ellipsis; display:inline-block">
                    {{ item.value }}
                </div>
              </el-col>
              <el-col :span="4" align="right">
                  <el-tag>{{ item.lable }}目标</el-tag>
              </el-col>
            </el-row> -->
            
            
              <!-- <span style="float: right; color: #8492a6; font-size: 13px">
              <el-tag >{{ item.lable }}目标</el-tag>
              </span>  -->
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="200"
        fixed="right"
        v-if="showOperation"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">

          <el-button
            @click="preview(scope.$index, scope.row)"
            size="mini"
            v-if="columnFlag.previewItemList == true"
          >
            预览
          </el-button>
          <el-button
            @click="open(scope.$index, scope.row)"
            size="mini"
            type="primary"
            v-if="columnFlag.openButton == true"
          >
            题目列表
          </el-button>

          <el-button
            @click="open(scope.$index, scope.row)"
            size="mini"
            v-if="columnFlag.problemButton == true"
          >
            详情
          </el-button>

          <!--公用-->
          <el-button
            @click.native.prevent="deleteRow(scope.$index, data.tableData)"
            size="mini"
            type="danger"
            v-if="columnFlag.delButton == true"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="toolbar" style="padding: 20px, 20px">
      <el-row type="flex" align="bottom" justify="end">
        <el-col :span="12">
          <el-pagination
            layout="total, prev, pager, next, jumper "
            @current-change="refreshPageRequest"
            :current-page="pageRequest.pageNum"
            :page-size="pageRequest.pageSize"
            :total="data.totalSize"
            style="float: right"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array, // 表格列配置
    data: {}, // 表格分页数据

    size: {
      // 尺寸样式
      type: String,
      default: "mini",
    },
    align: {
      // 文本对齐方式
      type: String,
      default: "left",
    },
    maxHeight: {
      // 表格最大高度
      type: Number,
      default: 500,
    },
    showOperation: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    border: {
      // 是否显示边框
      type: Boolean,
      default: false,
    },
    stripe: {
      // 是否显示斑马线
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: {
      // // 是否高亮当前行
      type: Boolean,
      default: true,
    },
    showOverflowTooltip: {
      // 是否单行显示
      type: Boolean,
      default: true,
    },
    showBatchDelete: {
      // 是否显示操作组件
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "",
    },
    problemType: {
      type: String,
      default: "",
    },

    // 控制操控页面（全部 或 个人）
    flag: {
      type: String,
      default: "1",
    },

    allProblemType: {
      type: Array,
      default: () => [],
    },
    allObjective: {
      type: Array,
      default: () => [{ lable: null, value: null, id: null }],
    },

    columnFlag: {
      type: Object,
      default: () => ({
        addButton: false,
        selectButton: false,
        openButton: false,
        problemButton: false,
        delButton: false,

        problemType: false,
        num: false,
        score: false,

        previewItemList: false,

        viewProblemType: false,
        viewNum: false,
        viewScore: false,
        previewKnowledgeName: false,
        previewTitle: false,
        knowledgeName: false,
        singleScore: false,

        objProblemTypeName: false,
        objKnowledgeName: false,
        objScore: false,
        objObjective: false,
      }),
    },
  },

  data() {
    return {
      // 分页信息
      pageRequest: {
        pageNum: 1,
        pageSize: 10,
      },
      loading: false, // 加载标识
      selections: [], // 列表选中列

      select: [],
    };
  },

  mounted() {
    this.findPage();
    // this.findAllProblemType()
  },

  methods: {
    // cleanAllProblemType() {

    // },
    //题目类型选择栏相关
    getType(id, suggests) {
      console.log("拿出来");
      for (let index = 0; index < suggests.length; index++) {
        if (suggests[index].id == id) {
          suggests[index].disabled = true;
        }
      }
      return suggests;
    },
    putType(lastid, suggests) {
      console.log("放回去");
      for (let index = 0; index < suggests.length; index++) {
        if (suggests[index].id == lastid) {
          suggests[index].disabled = false;
        }
      }
      return suggests;
    },
    //根据选项id获取标签
    findLableById(id, list) {
      // console.log(id, list);
      let lable = "";
      for (let index = 0; index < list.length; index++) {
        if (list[index].id == id) {
          lable = list[index].value;
        }
      }
      // console.log(lable);
      return lable;
    },
    beforeChangeProblemType(index, row) {
      // console.log(row);
      row.lastProblemTypeId = row.problemTypeId;
      console.log(row);
    },
    changeProblemType(row) {
      console.log(row);
      let id = row.problemTypeId;
      let lastid = row.lastProblemTypeId;
      let suggests = this.allProblemType;
      // 获取选中题型的lable
      row.problemTypeName = this.findLableById(id, suggests);
      // console.log(row);
      if (id != "" && id != null && id != undefined) {
        console.log("拿出来");
        suggests = this.getType(id, suggests);
      }
      if (lastid != "" && lastid != null && lastid != undefined) {
        console.log("放回去");
        suggests = this.putType(lastid, suggests);
      }
    },

    // 表格行操作：增减
    addRow(tableData) {
      console.log(tableData);
      console.log(this.allProblemType);
      tableData.push({});
      console.log(this.data);
    },
    deleteRow(index, rows) {
      // 恢复被禁用的选项
      console.log(rows[index]);
      if (rows[index].problemTypeId != "") {
        let suggests = [...this.allProblemType];
        this.putType(rows[index].problemTypeId, suggests);
      }
      // 删除该行
      rows.splice(index, 1);
      console.log(this.data);
    },

    // 自增排序
    indexMethod(index) {
      // console.log('索引数下标',index)
      // let nowPage = this.pageParams.pageIndex; //当前第几页，根据组件取值即可
      // let nowLimit = this.pageParams.pageSize; //当前每页显示几条，根据组件取值即可
      // return index + 1 + (nowPage - 1) * nowLimit ;
      return index + 1;
    },

    choose() {
      this.$emit("choose");
    },
    open(index, row) {
      // console.log(row);
      this.$emit("open", row);
    },

    view(index, row) {
      this.$emit("handleViewChange", row);
    },
    edit(index, row) {
      this.$emit("handleEditChange", row);
    },

    preview(index, row) {
      this.$emit("handlePreviewChange", row);
    },

    // 分页查询
    findPage() {
      this.loading = true;
      let callback = (res) => {
        this.loading = false;
      };
      this.$emit("findPage", {
        pageRequest: this.pageRequest,
        callback: callback,
      });
      // console.log(this.data);
    },

    // 选择切换
    selectionChange: function (item) {
      this.selections = item;
      // console.log(item);
      this.$emit("selectionChange", { selections: item });
      // this.getSelected();
    },
    // 获取选中多选框的id
    getSelected() {
      let noList = this.selections.map((item) => item.stuNo).toString();
      console.log(noList);
    },
    // 选择切换
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", { val: val });
    },
    // 换页刷新
    refreshPageRequest(pageNum) {
      this.pageRequest.pageNum = pageNum;
      console.log(this.pageRequest.pageNum);
      this.findPage();
    },

    // 单个删除
    remove(index, row) {
      let params = [];
      params.push(row);
      console.log(params);
      this.$confirm("确认移除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonClass: "conf",
      })
        .then(() => {
          this.loading = true;
          let callback = (res) => {
            if (res.code == 200) {
              this.$message({ message: "操作成功", type: "success" });
              this.findPage();
            } else {
              this.$message({ message: "操作失败, " + res.msg, type: "error" });
            }
            this.loading = false;
          };
          this.$emit("handleRemove", { params: params, callback: callback });
        })
        .catch(() => {});
    },
    //批量删除
    handleRemove(items) {
      console.log(this.columns);

      this.$confirm("确认移除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonClass: "conf",
      })
        .then(() => {
          let params = [];
          params = this.selections;
          console.log(params);
          this.loading = true;
          let callback = (res) => {
            if (res.code == 200) {
              this.$message({ message: "操作成功", type: "success" });
              this.findPage();
            } else {
              this.$message({ message: "操作失败, " + res.msg, type: "error" });
            }
            this.loading = false;
          };
          this.$emit("handleRemove", { params: params, callback: callback });
        })
        .catch(() => {});
    },
  },
};
</script>

<style >
.conf {
  background: #14889a !important;
  size: mini;
}

.popper{
  max-width: 40%;
}

</style>