<template>
  <div class="page-container" style="padding-left:60px">
    <!--工具栏-->
    <el-row type="flex" align="middle" justify="start" >
        <el-input
            style="heigth:20px; width:50%"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
        >
        </el-input>
    </el-row>
    
    <el-row style="margin-top:20px">
      
      <div class="custom-tree-container" >
        <el-tree
            ref="tree"
            :data="knowledgeTree"
            :filter-node-method="filterNode"
            :props="defaultProps"
            class="filter-tree"
            node-key="id"
            :expand-on-click-node="false"
            :default-expand-all="false"
        >
            <span slot-scope="{ node }">
              <span>{{ node.data.value }} {{ node.data.label }}</span>

              <span style="padding-left: 20px;">
                <el-button type="text" size="mini"
                  @click="handleAddKnowledge(node)">新增
                </el-button>

                <el-button type="text" size="mini"
                  @click="handleEditKnowledge(node)">编辑
                </el-button>

                <el-button type="text" size="mini"
                  @click="removeKnowledge(node)">删除
                </el-button>
              </span>
            </span>
        </el-tree>
      </div>
    </el-row>


    <!--新增编辑界面-->
    <el-dialog
        :title="operation ? '新增' : '编辑'"
        width="35%"
        :visible.sync="knowledgeVisible"
        :close-on-click-modal="false"
        @close="closeKnowledgeForm"
    >
      <el-row type="flex">
        <el-col :span="4"></el-col>
        <el-col :span="14">
          <el-form
              :model="knowledgeForm"
              label-width="120px"
              :rules="knowledgeFormRules"
              ref="knowledgeForm"
              :size="size"
              label-position="right"
          >
            <el-form-item label="节点层次" prop="nodeType" v-if="operation">
              <el-select
                  class="input"
                  v-model="knowledgeForm.nodeType"
                  placeholder="请选择"
              >
                <el-option
                    v-for="item in allNodeType"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input
                  v-model="knowledgeForm.name "
                  auto-complete="off"
                  class="input"
              ></el-input>
            </el-form-item>
            <el-form-item label="教学目标" prop="teachingGoal">
              <el-select
                  class="input"
                  v-model="knowledgeForm.teachingGoal"
                  placeholder="请选择"

              >
                <el-option
                    v-for="item in allTeachingGoal"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="难易度" prop="difficulty">
              <el-input-number
                  v-model="knowledgeForm.difficulty"
                  size="small" :precision="1" :min="0" :max="1"
                  class="input"
                  :step="0.1" controls-position="right"></el-input-number>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button
            @click.native="knowledgeVisible = false"
            @click="closeKnowledgeForm"
        >取消</el-button
        >
        <el-button
            type="primary"
            @click.native="submitKnowldgeForm"
            :loading="editLoading"
        >确定</el-button
        >
      </div>
    </el-dialog>


    </div>
</template>

<script>
  export default {
    components:{

    },

    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
    },

    data() {
            return {
              size: "small",
              knowledgeTree: [],
              allTeachingGoal: [],
              allNodeType: [
                {id: 1, value: "同级"},
                {id: 2, value: "下一级"},
              ],

              filterText: "",
              defaultProps: {
                children: "children",
                label: "label",
              },

              knowledgeVisible: false,
              knowledgeForm: {},
              knowledgeFormRules: {
                name: [{ required: true, message: "请输入名称", trigger: "blur" }],
                teachingGoal: [{ required: true, message: "请选择教学目标", trigger: "blur" }],

                difficulty: [{ required: true, message: "请输入难易度", trigger: "blur" }],
                nodeType: [{ required: true, message: "请选择节点类型", trigger: "blur" }],

              },
              editLoading: false,
              operation: true,

              courseId: null,

            };
        },

    mounted(){
      this.courseId = this.$store.state.course.courseId
      this.loadAllTeachingGoal();
      this.getKnowledge(this.courseId);
      },
    methods: {
      loadAllTeachingGoal() {
        let suggests = [];
        this.$api.metadata.goal.findAll().then((res) => {
          console.log(res);
          for (let index = 0; index < res.data.length; index++) {
            suggests.push({
              value: res.data[index].name,
              id: res.data[index].id,
            });
          }
        });
        this.allTeachingGoal = suggests;
      },
      querySearch(queryString, cb) {
        var suggests = this.allCourse;
        var results = queryString
            ? suggests.filter(this.createFilter(queryString))
            : suggests;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 知识点新增、编辑、删除
      handleTeachingGoalSelect(item) {
        console.log(item);
        this.knowledgeForm.teachingGoal = item;

      },
      handleAddKnowledge(node) {
        this.operation = true;
        this.knowledgeVisible = true;
        this.knowledgeForm.rootId = node.data.value;
        this.knowledgeForm.rootParentId = node.data.parentId;
        this.knowledgeForm.rootLevel = node.level
        this.knowledgeForm.courseId = this.courseId
      },
      handleEditKnowledge(node) {
        console.log(node);
        this.operation = false;
        this.$api.knowledge.knowledge.find({id: node.data.value}).then((res) =>{
          console.log(res);
          this.knowledgeForm = res.data;
          this.knowledgeForm.kid = node.data.value;
          this.knowledgeVisible = true;
        })

      },

      closeKnowledgeForm() {
        this.knowledgeForm = {};
        this.$refs.knowledgeForm.resetFields();
        this.knowledgeVisible = false;
      },
      submitKnowldgeForm() {
        this.$refs.knowledgeForm.validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              if (this.operation == true) {

                if (this.knowledgeForm.nodeType == 1) {
                  this.knowledgeForm.deep = this.knowledgeForm.rootLevel + 1
                  this.knowledgeForm.parentId = this.knowledgeForm.srootParentId;
                } else if (this.knowledgeForm.nodeType == 2) {
                  this.knowledgeForm.deep = this.knowledgeForm.rootLevel + 2;
                  this.knowledgeForm.parentId = this.knowledgeForm.rootId;
                }
                console.log(this.knowledgeForm);
                this.$api.knowledge.pub.add(this.knowledgeForm).then((res) =>{
                  console.log(res);
                  if (res.code == 200) {
                    this.getKnowledge(this.courseId);
                    this.$message({ message: "申请成功", type: "success" });
                    this.closeKnowledgeForm();
                  }
                })
              }
              else if (this.operation == false) {
                console.log(this.knowledgeForm);
                this.$api.knowledge.pub.revise(this.knowledgeForm).then((res) =>{
                  console.log(res);
                  if (res.code == 200) {
                    this.getKnowledge(this.courseId);
                    this.$message({ message: "申请成功", type: "success" });
                    this.closeKnowledgeForm();
                  }
                })
              }
            })

          }
        })
      },

      removeKnowledge(node) {
        console.log(node);
        this.$confirm("确认删除吗？", "提示", {}).then(() => {
          this.$api.knowledge.pub.remove({kid: node.data.value}).then((res) =>{
            console.log(res);
            if (res.code == 200) {
              this.getKnowledge(this.courseId);
              this.$message({ message: "申请成功", type: "success" });
            } else {
              this.$message({ message: res.msg, type: "error" });
            }
          })
        })
      },

      // 知识点处理
      getChildren(parentId, arr) {
        let array = [];
        for (let index = 0; index < arr.length; index++) {
          if (arr[index].parentId === parentId) {
            array.push(arr[index]);
          }
        }
        return array;
      },
      beChildren(arr1, arr2) {
        let k = 0;
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr1[i].length; j++) {
            if (arr2[k] !== [] && arr2[k] !== undefined && arr2[k].length !== 0) {
              arr1[i][j].children = arr2[k];
            }
            k++;
          }
        }
        // console.log(arr1);
        return arr1;
      },
      async getKnowledge(params) {
        console.log(params);
        let deep1 = [];
        let deep2 = [];
        let deep3 = [];
        let deep4 = [];
        let deep5 = [];
        let deep6 = [];
        await this.$api.knowledge.knowledge
            .findList({ courseId: params })
            .then((res) => {
              console.log(res);
              let data = res.data;
              for (let index = 0; index < data.length; index++) {
                if (data[index].deep == 1) {
                  deep1.push({
                    value: data[index].id,
                    label: data[index].name,
                    parentId: data[index].parentId,
                  });
                } else if (data[index].deep == 2) {
                  deep2.push({
                    value: data[index].id,
                    label: data[index].name,
                    parentId: data[index].parentId,
                  });
                } else if (data[index].deep == 3) {
                  deep3.push({
                    value: data[index].id,
                    label: data[index].name,
                    parentId: data[index].parentId,
                  });
                } else if (data[index].deep == 4) {
                  deep4.push({
                    value: data[index].id,
                    label: data[index].name,
                    parentId: data[index].parentId,
                  });
                } else if (data[index].deep == 5) {
                  deep5.push({
                    value: data[index].id,
                    label: data[index].name,
                    parentId: data[index].parentId,
                  });
                } else if (data[index].deep == 6) {
                  deep6.push({
                    value: data[index].id,
                    label: data[index].name,
                    parentId: data[index].parentId,
                  });
                }
              }
            });
        let newDeep2 = [];
        for (let index = 0; index < deep2.length; index++) {
          newDeep2.push(this.getChildren(deep2[index].value, deep3));
        }
        // console.log(newDeep2);
        let newDeep3 = [];
        for (let index = 0; index < deep3.length; index++) {
          newDeep3.push(this.getChildren(deep3[index].value, deep4));
        }
        // console.log(newDeep3);
        let newDeep4 = [];
        for (let index = 0; index < deep4.length; index++) {
          newDeep4.push(this.getChildren(deep4[index].value, deep5));
        }
        // console.log(newDeep4);
        let newDeep5 = [];
        for (let index = 0; index < deep5.length; index++) {
          newDeep5.push(this.getChildren(deep5[index].value, deep6));
        }
        // console.log(newDeep5);
        // let finalArry = []
        // for (let index = 0; index < deep2.length; index++) {
        //   finalArry.push()
        // }
        newDeep4 = this.beChildren(newDeep4, newDeep5);
        newDeep3 = this.beChildren(newDeep3, newDeep4);
        newDeep2 = this.beChildren(newDeep2, newDeep3);
        // console.log(newDeep2);
        for (let index = 0; index < newDeep2.length; index++) {
          deep2[index].children = newDeep2[index];
        }
        console.log(deep2);
        this.knowledgeTree = deep2;
      },
    },
  };
</script>
<style scoped>
.input{
  width: 160px;
}
</style>
