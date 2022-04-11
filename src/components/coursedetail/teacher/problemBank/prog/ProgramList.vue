<template>
  <div class="outside" style="padding:10px " >

      <el-row>
          <el-col :span="12" align="right">
            <el-tabs
              v-model="flag"
              type="card"
              @tab-click="handleChangeFlag"
              class="mlef-20"
            >
              <el-tab-pane label="题库" name="1"></el-tab-pane>
              <el-tab-pane label="我的申请" name="2"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="12">
            <el-form :inline="true" >   
                <el-cascader
                    style="width: 150px; margin-left: 0px"
                    size="mini"
                    v-model="knowledgeState"
                    placeholder="请选择知识点"
                    :options="allKnowledge"
                    :props="{ checkStrictly: true }"
                    @change="handleSelect"
                    :clearable="true"
                ></el-cascader> 
                <el-button
                  style="margin-left:5px"
                  size="mini"
                  type="primary"
                  @click= "findPageByCondition"
                  >查询</el-button
                >
                <el-button
                  style="margin-left:5px"
                  size="mini"
                  type="primary"
                  @click="chandgeAddVisible"
                  >新增</el-button
                >
        
                <!-- <el-button
                  size="mini"
                  type="primary"
                  @click="chandgeAddExamVisible"
                  >新增</el-button
                > -->
            </el-form>
          </el-col>
        </el-row>

    <com-table
      :data = "pageResults"
      :columns = "columns"
      :delFlag = "delFlag"
      :viewFlag = "viewFlag"
      :editFlag = "editFlag"
      @findPage = "findPage"
      @findPersonPage = "findPersonPage"
      @handleViewChange = "handleViewChange"
      @handleEditChange = "handleEditChange"
      @handleRemove = "handleRemove"
      :flag = "flag"
    ></com-table>

    <el-dialog
      top="5vh"
      align="center"
      title="新增"
      :visible.sync="addVisible"
      width="60%"
      style=""
    >
        <el-form
          ref="addForm"
          :model="addForm"
          :rules="addFormRules"
        >
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="14">
                <el-form-item label="知识点" label-width="80px" prop="knowledgeState">
                  <el-row type="flex">
                    <el-cascader
                        size="mini"
                        style="width: 100%"
                        v-model="knowledgeState"
                        placeholder="请选择知识点"
                        :options="allKnowledge"
                        :props="{ checkStrictly: true }"
                        @change="handleSelect"
                        clearable
                    ></el-cascader>
                  </el-row>
                </el-form-item>
                <el-form-item label="名称" label-width="80px" prop="problemName">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      v-model="addForm.problemName"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="题干" label-width="80px" prop="problemDescription">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="addForm.problemDescription"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入格式" label-width="80px" prop="problemInputFormat">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="addForm.problemInputFormat"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入样例" label-width="80px" prop="problemSampleInput">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="addForm.problemSampleInput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输出样例" label-width="80px" prop="problemSampleOutput">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="addForm.problemSampleOutput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                
                <el-form-item label="提示" label-width="80px" prop="problemHint">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="addForm.problemHint"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间限制" label-width="80px" prop="problemTimeLimit">
                            <el-row type="flex">
                                <el-input
                                style="width:65%; "
                                size="mini"
                                v-model="addForm.problemTimeLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内存限制" label-width="80px" prop="problemMemoryLimit">
                            <el-row type="flex">
                                <el-input
                                style="width:65%; "
                                size="mini"
                                v-model="addForm.problemMemoryLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="难易度" label-width="80px" prop="difficulty" align="left">
                            <el-row type="flex">
                                <el-input-number
                                    v-model="addForm.difficulty"
                                    size="mini"
                                    :precision="1"
                                    :min="0"
                                    :max="1"
                                    :step="0.1"
                                    controls-position="right"
                                ></el-input-number>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区分度" label-width="80px" prop="discrimination" align="left">
                            <el-row type="flex">
                                <el-input-number
                                    v-model="addForm.discrimination"
                                    size="mini"
                                    :precision="1"
                                    :min="0"
                                    :max="1"
                                    :step="0.1"
                                    controls-position="right"
                                ></el-input-number>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <div>
                        <el-row type="flex" align="bottom" justify="end">
                            <el-button size="mini" @click="closeAddForm"
                            >返回
                            </el-button>
                            <el-button type="primary" size="mini" @click="submitAdd"
                            >确定</el-button
                            >
                        </el-row>
                    </div>
              </el-row>

              </el-col>
            </el-row>
         </div>
        </el-form>
    </el-dialog>

    <el-dialog
      top="5vh"
      align="center"
      title="查看"
      :visible.sync="viewVisible"
      width="60%"
      style=""
    >
        <el-form
          ref="viewForm"
          :model="viewForm"
        >
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="14">
                <el-form-item label="知识点" label-width="80px" prop="knowledgeState">
                  <el-row type="flex">
                    <el-input
                        v-model="viewForm.knowledgeName"
                        auto-complete="off"
                        size="mini"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="名称" label-width="80px" prop="problemName">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      v-model="viewForm.problemName"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="题干" label-width="80px" prop="problemDescription">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewForm.problemDescription"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入格式" label-width="80px" prop="problemInputFormat">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewForm.problemInputFormat"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入样例" label-width="80px" prop="problemSampleInput">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewForm.problemSampleInput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输出样例" label-width="80px" prop="problemSampleOutput">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewForm.problemSampleOutput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                
                <el-form-item label="提示" label-width="80px" prop="problemHint">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewForm.problemHint"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间限制" label-width="80px" prop="problemTimeLimit">
                            <el-row type="flex">
                                <el-input
                                style="width:65%; "
                                size="mini"
                                v-model="viewForm.problemTimeLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内存限制" label-width="80px" prop="problemMemoryLimit">
                            <el-row type="flex">
                                <el-input
                                style="width:65%; "
                                size="mini"
                                v-model="viewForm.problemMemoryLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="难易度" label-width="80px" prop="difficulty" align="left">
                            <el-row type="flex">
                                 <el-input
                                    style="width:65%; "
                                    v-model="viewForm.difficulty"
                                    auto-complete="off"
                                    size="mini"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区分度" label-width="80px" prop="discrimination" align="left">
                            <el-row type="flex">
                                <el-input
                                    style="width:65%; "
                                    v-model="viewForm.discrimination"
                                    auto-complete="off"
                                    size="mini"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <div>
                        <el-row type="flex" align="bottom" justify="end">
                            <el-button size="mini" @click="closeViewForm"
                            >返回
                            </el-button>
                        </el-row>
                    </div>
              </el-row>

              </el-col>
            </el-row>
         </div>
        </el-form>
    </el-dialog>

    <el-dialog
      top="5vh"
      align="center"
      title="编辑"
      :visible.sync="editVisible"
      width="60%"
      style=""
    >
        <el-form
          ref="editForm"
          :model="editForm"
          :rules="addFormRules"
        >
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="14">
                <el-form-item label="知识点" label-width="80px" prop="knowledgeState">
                  <el-row type="flex">
                    <el-cascader
                        size="mini"
                        style="width: 100%"
                        v-model="knowledgeState"
                        placeholder="请选择知识点"
                        :options="allKnowledge"
                        :props="{ checkStrictly: true }"
                        @change="handleSelect"
                        clearable
                    ></el-cascader>
                  </el-row>
                </el-form-item>
                <el-form-item label="名称" label-width="80px" prop="problemName">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      v-model="editForm.problemName"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="题干" label-width="80px" prop="problemDescription">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="editForm.problemDescription"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入格式" label-width="80px" prop="problemInputFormat">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="editForm.problemInputFormat"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入样例" label-width="80px" prop="problemSampleInput">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="editForm.problemSampleInput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输出样例" label-width="80px" prop="problemSampleOutput">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="editForm.problemSampleOutput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                
                <el-form-item label="提示" label-width="80px" prop="problemHint">
                  <el-row type="flex">
                    <el-input
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="editForm.problemHint"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间限制" label-width="80px" prop="problemTimeLimit">
                            <el-row type="flex">
                                <el-input
                                style="width:65%; "
                                size="mini"
                                v-model="editForm.problemTimeLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内存限制" label-width="80px" prop="problemMemoryLimit">
                            <el-row type="flex">
                                <el-input
                                style="width:65%; "
                                size="mini"
                                v-model="editForm.problemMemoryLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="难易度" label-width="80px" prop="difficulty" align="left">
                            <el-row type="flex">
                                <el-input-number
                                    v-model="editForm.difficulty"
                                    size="mini"
                                    :precision="1"
                                    :min="0"
                                    :max="1"
                                    :step="0.1"
                                    controls-position="right"
                                ></el-input-number>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区分度" label-width="80px" prop="discrimination" align="left">
                            <el-row type="flex">
                                <el-input-number
                                    v-model="editForm.discrimination"
                                    size="mini"
                                    :precision="1"
                                    :min="0"
                                    :max="1"
                                    :step="0.1"
                                    controls-position="right"
                                ></el-input-number>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <div>
                        <el-row type="flex" align="bottom" justify="end">
                            <el-button size="mini" @click="closeEditForm"
                            >返回
                            </el-button>
                            <el-button type="primary" size="mini" @click="submitEdit"
                            >确定</el-button
                            >
                        </el-row>
                    </div>
              </el-row>

              </el-col>
            </el-row>
         </div>
        </el-form>
    </el-dialog>

    
    

  </div>
</template>
<script>
import ComTable from '../../../../common/ComTable.vue';

export default {
    components: {
        ComTable
    },
    mounted() {
      this.allKnowledge = JSON.parse(JSON.stringify( this.$store.state.course.knowledge));
      console.log(this.allKnowledge);
    },
    data() {
    return {
        record: {},
        pageRequest: { pageNum: 1, pageSize: 10 },
        pageResults: {},
        courseCinstanceId: "",
        flag: "1",
        findFlag: "0",
        
        statu: "",
        knowledgeId: "",
        knowledgeState: "",
        allKnowledge: [],
        columns: [
            { prop: "courseName", label: "课程", minWidth: 150, align: "center" },
            { prop: "knowledgeName", label: "知识点", minWidth: 150, align: "center" },
            { prop: "problemName", label: "名称", minWidth: 250, align: "center" },
            { prop: "problemDescription", label: "题干", minWidth: 250, align: "center" },
            { prop: "problemInputFormat", label: "输入格式", minWidth: 250, align: "center" },
            { prop: "problemOutputFormat", label: "输出格式", minWidth: 250, align: "center" },
            { prop: "problemSampleInput", label: "输入样例", minWidth: 250, align: "center" },
            { prop: "problemSampleOutput", label: "输出样例", minWidth: 250, align: "center" },
            { prop: "problemTimeLimit", label: "时间限制", minWidth: 250, align: "center" },
            { prop: "problemMemoryLimit", label: "内存限制", minWidth: 250, align: "center" },
            { prop: "problemHint", label: "提示", minWidth: 250, align: "center" },
            { prop: "lastUpdateTime", label: "最后修改时间", minWidth: 150, 
              align: "center", formatter: this.dateFormat }
            // { prop: "", label: "", minWidth: 150, align: "center" },

        ],

        addVisible: false,
        addForm: {},
        addFormRules: {
                knowledgeState: [{required: true, message: "请选择", trigger: "blur"}],
                problemName: [{required: true, message: "请输入", trigger: "blur"}],
                problemDescription: [{required: true, message: "请输入", trigger: "blur"}],
                problemInputFormat: [{required: true, message: "请输入", trigger: "blur"}],
                problemSampleInput: [{required: true, message: "请输入", trigger: "blur"}],   
                problemSampleOutput: [{required: true, message: "请输入", trigger: "blur"}],
                problemTimeLimit: [{required: true, message: "请输入", trigger: "blur"}],
                problemMemoryLimit: [{required: true, message: "请输入", trigger: "blur"}],
                problemHint: [{required: true, message: "请输入", trigger: "blur"}],

                difficulty: [{required: true, message: "请选择", trigger: "blur"}],
                discrimination: [{required: true, message: "请选择", trigger: "blur"}],
            },

        delFlag: false,

        viewFlag: true,
        viewVisible: false,
        viewForm: {},

        editFlag: false,
        editVisible: false,
        editForm: {},

    };
  },
  methods: {
    dateFormat(row, column) {
        return this.time(row.lastUpdateTime)        
    },
    
    handleChangeFlag() {
        if( this.flag == "1") {
            this.editFlag = false;
            this.delFlag = false;
            this.findPage(null);
        }
        if( this.flag == "2") {
            this.editFlag = true;
            this.delFlag = true;
            this.findPersonPage(null);
        }
    },
    // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "courseId", value: this.$store.state.course.courseId },
        { name: "knowledgeId", value: this.knowledgeId },
      ];
      // console.log(this.pageRequest);
      this.$api.problem.prog
        .findPage(this.pageRequest)
        .then((res) => {
            console.log(res.data);
            if(res.data !== null) {
                this.pageResults = res.data;
            }
        })
        .then(data != null ? data.callback : "");
    },
    // 个人分页数据
    findPersonPage(data) {
        if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "courseId", value: this.$store.state.course.courseId },
        { name: "knowledgeId", value: this.knowledgeId },
        { name: "status", value: this.statu },
      ];
      this.$api.problem.prog
        .findPerPage(this.pageRequest)
        .then((res) => {
            if(res.data == null) {
                this.pageResults = {};
            }
            if(res.data !== null) {
                // console.log(res.data);
                this.pageResults = res.data;
            }
            console.log(res.data);
          // console.log(this.pageResults);
        })
        .then(data != null ? data.callback : "");
    },

    handleSelect(item) {
        if (
        item === undefined ||
        item === null ||
        item === "" ||
        item.length === 0
      ) {
        this.knowledgeId = "";
      }
      // console.log(item);
      console.log(item[item.length - 1]);
      this.knowledgeId = item[item.length - 1];
      console.log(this.knowledgeId);
    },

    findPageByCondition() {
        this.flag = "1";
        this.findPage(null);
        this.knowledgeId = "";
    },

    chandgeAddVisible() {
        this.addVisible = !this.addVisible;
    },
    closeAddForm() {
        this.addVisible = false;
        this.$refs.addForm.resetFields();
        this.knowledgeId = "";
        this.knowledgeState = "",
        this.addForm = {};
    },
    submitAdd() {
        console.log(this.addForm)
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.addForm);
            params.courseId =  this.$store.state.course.courseId;
            params.knowledgeId = this.knowledgeId;
            // console.log(params);
            this.$api.problem.prog.add(params).then((res) => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.closeAddForm();
                this.flag = "2"
                this.handleChangeFlag();
                
                // this.$refs.getAllAudit()
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
        });
    },

    handleViewChange(row) {
        this.viewVisible = true;
        console.log(row);
        this.viewForm = JSON.parse(JSON.stringify(row));
    },
    closeViewForm() {
        this.viewVisible = false;
        this.viewForm = {};
    },

    handleEditChange(row) {
        this.editVisible = true;
        // console.log(row.knowledgeName);
        this.editForm = JSON.parse(JSON.stringify(row));
    },
    closeEditForm() {
        this.editVisible = false;
        this.$refs.editForm.resetFields();
        this.knowledgeId = "";
        this.knowledgeState = "",
        this.editForm = {}
    },
    submitEdit() {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.editForm);
            params.courseId =  this.$store.state.course.courseId;
            params.knowledgeId = this.knowledgeId;
            // console.log(params);
            this.$api.problem.prog.update(params).then((res) => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.closeEditForm();
                this.flag = "2"
                this.handleChangeFlag();
                // this.$refs.getAllAudit()
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
        });

    },

    handleRemove(data){
        console.log(data.params);
        this.$api.problem.prog.del(data.params)
        .then(data != null ? data.callback : "");
        
        
    },

    

    

  },
  
};
</script>
<style>
.outside{
  text-align: center;
}


</style>