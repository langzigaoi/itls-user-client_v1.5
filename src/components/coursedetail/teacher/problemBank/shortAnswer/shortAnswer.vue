<template>
  <div class="outside" style="padding: 10px">
    <el-row>
      <el-col :span="16" align="left">
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
      <el-col :span="8">
        <el-form :inline="true" align="right">
          <el-cascader
            style="width: 150px"
            size="mini"
            placeholder="请选择知识点"
            :options="allKnowledge"
            :props="{ checkStrictly: true }"
            :clearable="true"
            @change="handleSearchKnowledge"
          ></el-cascader>
          <!-- <el-button
            style="margin-left:5px"
            size="mini"
            type="primary"
            @click= "findPage(null)"
            >查询</el-button
          > -->
          <el-button
            style="margin-left: 5px"
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
      :data="pageResults"
      :columns="columns"
      @findPage="findPage"
      @findPersonPage="findPersonPage"
      @handleViewChange="handleViewChange"
      @handleEditChange="handleEditChange"
      @handleRemove="handleRemove"
      :flag="flag"
      :showFlag="showFlag"
      :disableFlag="disableFlag"
    ></com-table>

    <el-dialog
      top="5vh"
      align="center"
      title="新增"
      :visible.sync="addVisible"
      width="60%"
      style=""
      @close="closeAddForm"
    >
      <el-form ref="addForm" :model="addForm" :rules="addFormRules">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="14">
              <el-form-item
                label="知识点"
                label-width="80px"
                prop="knowledgeId"
              >
                <el-row type="flex">
                  <el-cascader
                    size="mini"
                    style="width: 100%"
                    placeholder="请选择知识点"
                    v-model="addForm.knowledgeId"
                    :options="allKnowledge"
                    :props="{ checkStrictly: true }"
                    clearable
                  ></el-cascader>
                </el-row>
              </el-form-item>

              <el-form-item
                label="题干"
                label-width="80px"
                prop="title"
                required
              >
                <el-row type="flex">
                  <el-input
                    size="mini"
                    type="textarea"
                    :rows="4"
                    v-model="addForm.title"
                    @focus="inputClick(addForm, 'title')"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item
                label="答案"
                label-width="80px"
                prop="answer"
                required
              >
                <el-row type="flex">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="addForm.answer"
                    size="mini"
                    @focus="inputClick(addForm, 'answer')"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="解析" label-width="80px" prop="analysis">
                <el-row type="flex">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="addForm.analysis"
                    size="mini"
                    @focus="inputClick(addForm, 'analysis')"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="题目来源" label-width="80px" prop="markup">
                <el-row type="flex">
                  <el-input
                    v-model="addForm.markup"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="难易度"
                    label-width="80px"
                    prop="difficulty"
                    align="left"
                  >
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
                  <el-form-item
                    label="区分度"
                    label-width="80px"
                    prop="discrimination"
                    align="left"
                  >
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
                  <el-row type="flex" align="bottom" justify="center">
                    <el-button size="mini" @click="closeAddForm"
                      >返回
                    </el-button>
                    <el-button type="primary" size="mini" @click="submitAdd('addForm')"
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
            :visible.sync="contentEditor.dialogVisible"
            append-to-body
            :close-on-click-modal="false"
            style="width: 100%; height: 100%"
            :show-close="false"
            center
          >

            <vditor ref="contentEditor"  style="width:100%"/>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitVditor">确 定</el-button>
              <el-button @click="contentEditor.dialogVisible = false"
                >取 消</el-button
              >
            </span>
          </el-dialog>

    <el-dialog
      top="5vh"
      align="center"
      title="查看"
      :visible.sync="viewVisible"
      width="60%"
      style=""
      @close="closeViewForm"
    >
      <el-form ref="viewForm" :model="viewForm" onfocus="this.blur();">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="14">
              <el-form-item label="知识点" label-width="80px">
                <el-row type="flex">
                  <el-input
                    onfocus="this.blur();"
                    v-model="viewForm.knowledgeName"
                    auto-complete="off"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="题干" label-width="80px" prop="title">
                <el-row type="flex">
                  <el-input
                    onfocus="this.blur();"
                    style="textarea"
                    :rows="4"
                    size="mini"
                    type="textarea"
                    v-model="viewForm.title"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="答案" label-width="80px" prop="answer">
                <el-row type="flex">
                  <el-input
                    onfocus="this.blur();"
                    type="textarea"
                    :rows="4"
                    v-model="viewForm.answer"
                    auto-complete="off"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="解析" label-width="80px" prop="analysis">
                <el-row type="flex">
                  <el-input
                    onfocus="this.blur();"
                    type="textarea"
                    :rows="4"
                    v-model="viewForm.analysis"
                    auto-complete="off"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="题目来源" label-width="80px" prop="markup">
                <el-row type="flex">
                  <el-input
                    onfocus="this.blur();"
                    v-model="viewForm.markup"
                    auto-complete="off"
                    size="mini"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="难易度"
                    label-width="80px"
                    prop="difficulty"
                    align="left"
                  >
                    <el-row type="flex">
                      <el-input
                        v-model="viewForm.difficulty"
                        auto-complete="off"
                        size="mini"
                      ></el-input>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="区分度"
                    label-width="80px"
                    prop="discrimination"
                    align="left"
                  >
                    <el-row type="flex">
                      <el-input
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
                  <el-row type="flex" align="bottom" justify="center">
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
      @close="closeEditForm"
    >
      <el-form ref="editForm" :model="editForm" :rules="addFormRules">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="14">
              <el-form-item
                label="知识点"
                label-width="80px"
                prop="knowledgeId"
              >
                <el-row type="flex">
                  <el-cascader
                    ref="knowledge"
                    style="width: 100%"
                    size="mini"
                    v-model="editForm.knowledgeId"
                    placeholder="请选择知识点"
                    :options="allKnowledge"
                    :props="{ checkStrictly: true }"
                    clearable
                  ></el-cascader>
                </el-row>
              </el-form-item>
              <el-form-item
                label="题干"
                label-width="80px"
                prop="title"
                required
              >
                 <el-row type="flex">
                  <el-input
                    style="textarea"
                    size="mini"
                    type="textarea"
                    :rows="4"
                    v-model="editForm.title"
                    placeholder="请输入内容"
                    @focus="inputClick(editForm, 'title')"
                  ></el-input>
                 </el-row>
              </el-form-item>
              <el-form-item
                label="答案"
                label-width="80px"
                prop="answer"
                required
              >
                <el-row type="flex">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="editForm.answer"
                    auto-complete="off"
                    size="mini"
                    @focus="inputClick(editForm, 'answer')"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="解析" label-width="80px" prop="analysis">
                <el-row type="flex">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="editForm.analysis"
                    auto-complete="off"
                    size="mini"
                    @focus="inputClick(editForm, 'analysis')"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="题目来源" label-width="80px" prop="markup">
                <el-row type="flex">
                  <el-input
                    v-model="editForm.markup"
                    auto-complete="off"
                    size="mini"
                    placeholder="题目可来自考研，水平考试，等级考试，教材或其他"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="难易度"
                    label-width="80px"
                    prop="difficulty"
                    align="left"
                  >
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
                  <el-form-item
                    label="区分度"
                    label-width="80px"
                    prop="discrimination"
                    align="left"
                  >
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
                  <el-row type="flex" align="bottom" justify="center">
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
import ComTable from "../../../../common/ComTable.vue"

import Vditor from "../../../../Vditor/index.vue"


export default {
  components: {
    ComTable,

    Vditor,
  },

  mounted() {
    this.allKnowledge = JSON.parse(
        JSON.stringify(this.$store.state.course.knowledge)
    );
    console.log(this.allKnowledge);
  },
  data() {
    return {

      record: {},
      pageRequest: {pageNum: 1, pageSize: 10},
      pageResults: {},
      courseCinstanceId: "",
      flag: "1",
      findFlag: "0",
      statu: "",
      allKnowledge: [],
      knowledgeId: "",
      columns: [],
      allColumns: [
        {
          prop: "knowledgeName",
          label: "知识点",
          minWidth: 150,
          align: "center",
        },
        {prop: "title", label: "题干", minWidth: 250, align: "center"},
      ],
      personColumns: [
        // { prop: "courseName", label: "课程", minWidth: 150, align: "center" },
        {
          prop: "knowledgeName",
          label: "知识点",
          minWidth: 150,
          align: "center",
        },
        {prop: "title", label: "题干", minWidth: 250, align: "center"},
        {
          prop: "lastUpdateTime",
          label: "最后修改时间",
          minWidth: 150,
          align: "center",
          formatter: this.dateFormat,
        },
        {
          prop: "status",
          label: "状态",
          minWidth: 250,
          align: "center",
          formatter: this.getStatu,
        },
        // { prop: "", label: "", minWidth: 150, align: "center" },
      ],

      addVisible: false,
      addForm: {
        knowledgeId: [],
      },
      addFormRules: {
        knowledgeId: [{required: true, message: "请选择", trigger: "blur"}],
        title: [{required: true, message: "请输入", trigger: "blur"}],
        answer: [{required: true, message: "请输入", trigger: "blur"}],
        analysis: [{required: true, message: "请输入", trigger: "blur"}],
        markup: [{required: true, message: "请输入", trigger: "blur"}],
        difficulty: [{required: true, message: "请选择", trigger: "blur"}],
        discrimination: [
          {required: true, message: "请选择", trigger: "blur"},
        ],
      },

      // 设置需显示和禁用的标记
      showFlag: {
        view: true,
        batchRemove: false,
        editProblem: true,
        removeProblem: true,
      },
      disableFlag: {
        batchRemove: true,
      },
      viewVisible: false,
      viewForm: {},
      editVisible: false,
      editForm: {
        knowledgeId: [],
      },

      contentEditor: {
        dialogVisible: false,
        object: null,
        parameterName: '',
        instance: null,
      },

    };
  },

  methods: {
    // 编辑器相关
    // editorReady(instance) {
    //   console.log("调用了");
    //   this.contentEditor.instance = instance
    //   let currentContent = this.contentEditor.object[this.contentEditor.parameterName]
    //   console.log(currentContent);
    //   this.contentEditor.instance.setContent(currentContent)
    //   // 光标定位到editor
    //   this.contentEditor.instance.focus(true)
    // },
    inputClick(object, parameterName) {
      // 原表单项信息赋给vditor的contentEditor对象参数，用于定位与回显
      this.contentEditor.object = object
      this.contentEditor.parameterName = parameterName
      // 显示vditor对话框
      this.contentEditor.dialogVisible = true
      // 设置延时回显，否则对话框中内容未完全加载完时执行下面函数会报错
      setTimeout(() => {
        // 当参数不为undefined时，判断为编辑操作，进行内容回显
        if (this.contentEditor.object[this.contentEditor.parameterName] != undefined) {
          this.$refs.contentEditor.setValue(this.contentEditor.object[this.contentEditor.parameterName])
        }
        // 参数为undefined，操作为新增，值设置为""
        else {
          this.$refs.contentEditor.setValue("")
        }
      }, 10);
    },
    submitVditor() {
      // 获取编辑器内容
      let content = this.$refs.contentEditor.getValue()
      // console.log(content);
      // 将编辑器中内容赋值给对应表单项
      // this.contentEditor.object = {}
      // this.contentEditor.object[this.contentEditor.parameterName] = content
      this.$set(this.contentEditor.object, this.contentEditor.parameterName, content)
      this.contentEditor.dialogVisible = false
    },


    dateFormat(row, column) {
      return this.time(row[column.property]);
    },
    getStatu(row) {
      if (row.status == "0") {
        return "待审核";
      }
      if (row.status == "1") {
        return "已审核";
      }
      if (row.status == "-1") {
        return "已驳回";
      }
    },

    handleSearchKnowledge(item) {
      console.log(item);
      if (
          item === undefined ||
          item === null ||
          item === "" ||
          item.length === 0
      ) {
        this.knowledgeId = "";
      } else {
        this.knowledgeId = item[item.length - 1];
      }
      console.log(this.knowledgeId);

      this.flag = "1";
      this.handleChangeFlag();
    },
    handleChangeFlag() {
      if (this.flag == "1") {
        this.showFlag.batchRemove = false;
        this.findPage(null);
      }
      if (this.flag == "2") {
        this.showFlag.batchRemove = true;
        this.disableFlag.batchRemove = false;
        this.findPersonPage(null);
      }
    },
    // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        {name: "courseId", value: this.$store.state.course.courseId},
        {name: "knowledgeId", value: this.knowledgeId},
      ];
      // console.log(this.pageRequest);
      this.$api.problem.shortAnswer
          .findPage(this.pageRequest)

          .then((res) => {
            console.log(res.data);
            if (res.data !== null) {
              this.columns = [...this.allColumns];
              this.pageResults = res.data;
            }
          })
          .catch((err) => {
            this.knowledgeId = "";
            // this.findPage(null);
          })
          .then(data != null ? data.callback : "");
    },
    // 个人分页数据
    findPersonPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        {name: "courseId", value: this.$store.state.course.courseId},
        {name: "knowledgeId", value: ""},
        {name: "status", value: this.statu},
      ];
      this.$api.problem.shortAnswer
          .findPersonPage(this.pageRequest)
          .then((res) => {
            if (res.data == null) {
              this.pageResults = {};
            }
            if (res.data !== null) {
              // console.log(res.data);
              // console.log(this.personColumns);
              this.columns = [...this.personColumns];
              // console.log(this.columns);
              this.pageResults = res.data;
            }
            console.log(res.data);
            console.log(this.pageResults);
          })
          .catch((err) => {
          })
          .then(data != null ? data.callback : "");
    },

    chandgeAddVisible() {
       console.log(this.addForm);
      this.addVisible = !this.addVisible;
    },
    closeAddForm() {
      this.addVisible = false;
      this.$refs.addForm.resetFields();
      this.addForm = {};
    },
    submitAdd(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.addForm);
            params.courseId = this.$store.state.course.courseId;
            // 从addForm.knowledgeId中取选中的值 单选 则只有一个值
            params.knowledgeId = this.addForm.knowledgeId[0];
            // console.log(params);
            this.$api.problem.shortAnswer
                .add(params)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({message: "操作成功", type: "success"});
                    this.closeAddForm();
                    this.flag = "2";
                    this.handleChangeFlag();
                    // this.$refs.getAllAudit()
                  } else {
                    this.$message({
                      message: "操作失败, " + res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((err) => {
                });
          });
        } else {
          // callback();
        }
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
      this.editForm = JSON.parse(JSON.stringify(row));
      // console.log(this.editForm);
    },
    closeEditForm() {
      this.editVisible = false;
      this.$refs.editForm.resetFields();
      this.editForm = {};
    },
    submitEdit() {
      console.log(this.editForm.knowledgeId);
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.editForm);
            params.courseId = this.$store.state.course.courseId;
            // 从addForm.knowledgeId中取选中的值 单选 则只有一个值
            params.knowledgeId = this.editForm.knowledgeId[0];
            // console.log(params);
            this.$api.problem.shortAnswer
                .update(params)
                .then((res) => {
                  if (res.code == 200) {
                    this.$message({message: "操作成功", type: "success"});
                    this.closeEditForm();
                    this.flag = "2";
                    this.handleChangeFlag();
                    // this.$refs.getAllAudit()
                  } else {
                    this.$message({
                      message: "操作失败, " + res.msg,
                      type: "error",
                    });
                  }
                })
                .catch((err) => {
                });
          });
        }
      });
    },

    handleRemove(data) {
      console.log(data.params);
      this.$api.problem.shortAnswer
          .del(data.params)
          .then(data != null ? data.callback : "");
    },
  }
};

</script>

<style>
.outside {
  text-align: center;
}
</style>
