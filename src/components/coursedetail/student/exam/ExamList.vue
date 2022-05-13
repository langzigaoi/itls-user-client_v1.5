
<template>
  <div class="outside" style="padding: 10px">
    <el-row>
      <el-col :span="14">
        <el-tabs
              v-model="typeFlag"
              type="card"
              @tab-click="handleChangeTypeFlag"
              class="mlef-20"
            >
              <el-tab-pane label="期末考试" name="1"></el-tab-pane>
              <el-tab-pane label="其他考试" name="2"></el-tab-pane>
            </el-tabs>
      </el-col>

      <!-- <el-col :span="10" align="center">
        <el-cascader
          style="width: 150px; margin-left: 10px"
          size="mini"
          placeholder="请选择范围"
          :options="allKnowledge"
          :props="{ checkStrictly: true }"
          @change="handleSearchChapter"
          :clearable="true"
        ></el-cascader>
  
        <el-button
          style="margin-left: 5px"
          size="mini"
          type="primary"
          @click="chandgeAddVisible"
          >新增</el-button
        >
      </el-col> -->
    </el-row>

    <!--考试列表-->
    <com-table
      :data="pageResults"
      :columns="columns"
      :flag="'2'"
      @findPersonPage="findPersonPage"
      :showFlag="examList.showFlag"
      :disableFlag="examList.disableFlag"
      @handleRemove="handleRemove"
      @openInfoForm="changeInfoFormVisible"
      @openItemList="changeItemListVisible"
      @openProblemList="handleGenerateChange"
      @openObjectiveList="changeObjectiveListVisible"
      @handlePreview="handlePreview"
      @handlePub="handlePub"

    >
    </com-table>
    

    <el-dialog
      align="center"
      :visible.sync="addVisible"
      width="40%"
      style=""
      @close="closeAddForm"
    >
      <el-form ref="addForm" :model="addForm" :rules="addFormRules">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="7"></el-col>
            <el-col :span="18">
              <el-form-item label="标题" label-width="80px" prop="examName">
                <el-row type="flex">
                  <el-input
                    style="width: 205px"
                    size="mini"
                    v-model="addForm.examName"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item label="类型" label-width="80px" prop="examTypeId">
                <el-row type="flex">
                  <el-select
                    size="small"
                    v-model="addForm.examTypeId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in allExamType"
                      :key="item.value"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-row>
              </el-form-item>

              <el-form-item label="范围" label-width="80px" prop="knowledgeId">
                <el-row type="flex">
                  <el-cascader
                    ref="knowledge"
                    :show-all-levels="false"
                    size="mini"
                    style="width: 205px"
                    v-model="addForm.knowledgeId"
                    placeholder="请选择第一级菜单中的选项"
                    :options="allKnowledge"
                    multi
                    :props="{
                      checkStrictly: true,
                      emitPath: false,
                      multiple: true,
                    }"
                    clearable
                  ></el-cascader>
                </el-row>
              </el-form-item>

              <el-form-item
                label="开始时间"
                label-width="80px"
                prop="startTime"
              >
                <el-row type="flex">
                  <el-date-picker
                    style="width: 205px"
                    size="small"
                    align="left"
                    v-model="addForm.startTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-row>
              </el-form-item>
              <el-form-item label="结束时间" label-width="80px" prop="endTime">
                <el-row type="flex">
                  <el-date-picker
                    style="width: 205px"
                    size="small"
                    align="left"
                    v-model="addForm.endTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <el-row type="flex" align="bottom" justify="end">
                <el-button size="mini" @click="closeAddForm">返回 </el-button>
                <el-button type="primary" size="mini" @click="submitAdd"
                  >保存并离开</el-button
                >
              </el-row>
            </div>
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      top="5vh"
      align="center"
      title="1.考试信息设置"
      :visible.sync="infoFormVisible"
      width="50%"
      style=""
      @close="closeInfoForm"
    >
      <el-form ref="infoForm" :model="infoForm" :rules="addFormRules">
        <div>
          <el-row type="flex" justify="center">
            <el-col :span="7"></el-col>
            <el-col :span="18">
              <el-form-item label="标题" label-width="80px" prop="examName">
                <el-row type="flex">
                  <el-input
                    style="width: 205px"
                    size="mini"
                    v-model="infoForm.examName"
                    placeholder="请输入内容"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="类型" label-width="80px" prop="examTypeId">
                <el-row type="flex">
                  <el-select
                    size="mini"
                    v-model="infoForm.examTypeId"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in allExamType"
                      :key="item.value"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-row>
              </el-form-item>
              <el-form-item label="范围" label-width="80px" prop="knowledgeId">
                <el-row type="flex">
                  <el-cascader
                    ref="knowledge"
                    :show-all-levels="false"
                    size="mini"
                    style="width: 205px"
                    v-model="infoForm.knowledgeId"
                    placeholder="请选择第一级菜单中的选项"
                    :options="allKnowledge"
                    multi
                    :props="{
                      checkStrictly: true,
                      emitPath: false,
                      multiple: true,
                    }"
                    clearable
                  ></el-cascader>
                </el-row>
              </el-form-item>
              <el-form-item label="总题数" label-width="80px" prop="examName">
                <el-row type="flex">
                  <el-input
                    disabled
                    style="width: 205px"
                    size="mini"
                    v-model="infoForm.num"
                    placeholder="数目为空,请尽快组卷"
                  ></el-input>
                </el-row>
              </el-form-item>
              <el-form-item label="总分" label-width="80px" prop="examName">
                <el-row type="flex">
                  <el-input
                    disabled
                    style="width: 205px"
                    size="mini"
                    v-model="infoForm.fraction"
                    placeholder="数目为空,请尽快组卷"
                  ></el-input>
                </el-row>
              </el-form-item>

              <el-form-item
                label="开始时间"
                label-width="80px"
                prop="startTime"
              >
                <el-row type="flex">
                  <el-date-picker
                    style="width: 205px"
                    size="small"
                    align="left"
                    v-model="infoForm.startTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-row>
              </el-form-item>
              <el-form-item label="结束时间" label-width="80px" prop="endTime">
                <el-row type="flex">
                  <el-date-picker
                    style="width: 205px"
                    size="small"
                    align="left"
                    v-model="infoForm.endTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div>
              <el-row type="flex" align="bottom" justify="center">
                <el-button size="mini" @click="closeInfoForm">返回 </el-button>
                <el-button type="primary" size="mini" @click="submitInfoForm"
                  >保存
                </el-button>
              </el-row>
            </div>
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <!--2.题型列表-->
    <el-dialog
      top="5vh"
      align="center"
      title="2.题型设置"
      :visible.sync="itemListVisible"
      width="70%"
      style=""
      @close="closeItemListForm"
    >
      <div style="">
        <el-form :model="itemListForm" ref="itemListForm" size="small" text-algin="center">
          <el-form-item >
              <div style="width:80%">
                <modifiable-table
                  :data="itemListForm"
                  :allProblemType= "allProblemType"
                  :columnFlag= "itemColumnFlag"
                  @findPage="findItemList"
                  >
                </modifiable-table>
            </div>
          </el-form-item>
          <el-row>
              <div>
                <el-row type="flex" align="bottom" justify="center">
                  <el-button size="mini" @click="closeItemListForm">返回 </el-button>
                  <el-button type="primary" size="mini" @click="submitItemListForm"
                    >保存
                  </el-button>
                </el-row>
              </div>
          </el-row>

        </el-form>
      </div>
    </el-dialog>


    <!--3.题目设置-第一层-->
    <el-dialog
      top="5vh"
      align="center"
      title="3.题目设置"
      :visible.sync="generateVisible"
      width="70%"
      style=""
      @close="closeGenerateForm">
      <div style="">
        <el-form :model="viewItemForm" ref="viewItemForm" size="small" text-algin="center">
          <el-form-item >
              <div style="width:80%">
                <modifiable-table
                  :data="viewItemForm"
                  :columnFlag= "typeColumnFlag"
                  @open="changeProblemListVisible"
                  @handlePreviewChange="handlePreviewChange"
                  >
                </modifiable-table>
            </div>
          </el-form-item>

          <el-row>
              <div>
                <el-row type="flex" align="bottom" justify="center">
                  <el-button size="mini" @click="closeGenerateForm">返回 </el-button>
                  <!-- <el-button type="primary" size="mini" @click="closeGenerateForm"
                    >保存
                  </el-button> -->
                </el-row>
              </div>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <!--预览题型下的题目-->
    <el-dialog
      top="5vh"
      align="center"
      width="70%"
      :visible.sync="previewProblemListVisible"
      @close="closePreviewProblemListForm"
    >        
    <el-form :model="previewProblemListForm" ref="previewProblemListForm" size="small" text-algin="center">
        <el-form-item>
          <el-row type="flex" justify="center">
            <h2>{{previewProblemListForm.problemTypeName}}列表</h2>
          </el-row>
        </el-form-item>
        
        <el-form-item >
            <div style="width:80%">
              <modifiable-table
                :data="previewProblemListForm"
                :columnFlag= "problemColumnFlag"
                :showOperation="false"
                >
              </modifiable-table>
          </div>
        </el-form-item>

        <el-row>
          <div>
            <el-row type="flex" align="bottom" justify="center">
              <el-button size="mini" @click="closePreviewProblemListForm">返回 </el-button>
                  <!-- <el-button type="primary" size="mini" @click="closeGenerateForm"
                    >保存
                  </el-button> -->
            </el-row>
          </div>
        </el-row>
      </el-form>

    </el-dialog>

    <!--题目列表页面-第二层-->
    <el-dialog
      top="5vh"
      align="center"
      :visible.sync="problemListVisible"
      width="70%"
      @close="closeProblemListForm"
    >
      <el-form :model="problemListForm" ref="problemListForm" size="small" text-algin="center">
        <el-form-item>
          <el-row type="flex" justify="center">
            <h2>{{problemListForm.name}}列表</h2>
          </el-row>
        </el-form-item>
        <el-form-item >
            <div style="width:80%">
              <modifiable-table
                :data="problemListForm"
                :allProblemType= "allProblemType"
                :columnFlag= "listColumnFlag"
                @open="openProblemInfo"
                @choose="changeAllProblemVisible"
              >
              </modifiable-table>
          </div>
        </el-form-item>


        <el-row>
            <div>
              <el-row type="flex" align="middle" justify="center" >
                <el-button size="mini" @click="closeProblemListForm">返回 </el-button>
                <el-button type="primary" size="mini" @click="submitProblemList"
                  >保存
                </el-button>
                <h5 >
                  (需选 {{problemListForm.num}} 题,已选 {{problemListForm.tableData.length}} 题)
                </h5>
              </el-row>
            </div>
        </el-row>

      </el-form>
    </el-dialog>

    <!--选题页面-第三层-->
    <el-dialog
      align="center"
      :visible.sync="allProblemVisible"
      width="80%"
    >
      <el-form ref="allProblemForm" :model="allProblemForm" >
        <div>
          <el-row>
            <el-col :span="15" align="left">
              <el-select 
                  v-model="selectedKnowledge"
                  @change="handleSelectedKnowledge"
                  size="mini"
                  clearable>
                <el-option
                    v-for="item in knowledgeOption"
                    :key="item.id"
                    :label="item.chapterName"
                    :value="item.chapterId"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row>
            <com-table 
              ref="problemTable"
              :data="allProblemForm.tableData"
              :columns="problemColumns"
              :showOperation = false
              :flag="'1'"
              :showFlag="allProblem.showFlag"
              @findPage="findProblemPage"
              @handleSelections="handleAllProblemSelect"
              :selected= "selected"
            >
            </com-table>
          </el-row>

          <el-row>
            <div>
              <el-row type="flex" align="middle" justify="center">
                <el-button size="mini" @click="closeAllProblemForm">取消 </el-button>
                <el-button type="primary" size="mini" @click="submitAllProblem"
                  >提交
                </el-button>
                <h5 >
                  (需选 {{problemListForm.num}} 题,已选 {{problemListForm.tableData.length}} 题)
                </h5>
              </el-row>
            </div>
        </el-row>
        </div>
      </el-form>
    </el-dialog>

    <!--双向细目表-->
    <el-dialog
      top="5vh"
      align="center"
      title="4.双向细目"
      :visible.sync="objectiveListVisible"
      width="70%"
      @close="closeObjectiveList"
    >
      <el-form :model="objectiveListForm" ref="objectiveListForm" size="small" text-algin="center">
        
        <el-form-item >
            <div style="width:80%">
              <modifiable-table
                :data="objectiveListForm"
                :allProblemType= "allProblemType"
                :columnFlag= "objColumnFlag"
                :allObjective="allObjective"
                @open="openProblemInfo"
                @choose="changeAllProblemVisible">
              </modifiable-table>
          </div>
        </el-form-item>

        <el-row>
            <div>
              <el-row type="flex" align="middle" justify="center" >
                <el-button size="mini" @click="closeObjectiveList">返回 </el-button>
                <el-button type="primary" size="mini" @click="submitObjectiveList"
                  >保存
                </el-button>
                
              </el-row>
            </div>
        </el-row>

      </el-form>
    </el-dialog>


    <!--单个题目展示弹框-->
    <el-dialog
      top="5vh"
      align="center"
      :visible.sync="viewProblemVisible"
      width="70%"
      style=""
      @close="closeViewProblemForm"
    >
        <el-form
          ref="viewProblemForm"
          :model="viewProblemForm"
        >
          <div >
            <el-row type="flex" justify="center"> 
              <el-col :span="14">

                <el-form-item label="知识点" label-width="80px"  
                  v-if="viewProblemForm.knowledgeName">
                  <el-row type="flex">
                    <el-input
                        onfocus="this.blur();"
                        v-model="viewProblemForm.knowledgeName"
                        auto-complete="off"
                        size="mini"
                    ></el-input>
                  </el-row>
                </el-form-item>


                <!--选择题特有字段-->
                <el-form-item v-if="viewProblemForm.title" 
                    label="题干" label-width="80px" prop="title">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      :rows="4"
                      size="mini"
                      type="textarea"
                      v-model="viewProblemForm.title"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="选项" label-width="80px" prop="options" 
                            v-if="viewProblemForm.options">
                    <el-row type="flex">
                        <el-input
                            onfocus="this.blur();"
                            type="textarea"
                            :rows="4"
                            v-model="viewProblemForm.options"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>
                <el-form-item label="答案" label-width="80px" prop="answer" 
                            v-if="viewProblemForm.answer">
                    <el-row type="flex">
                        <el-input
                            onfocus="this.blur();"
                            type="textarea"
                            :rows="4"
                            v-model="viewProblemForm.answer"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>
                <el-form-item label="解析" label-width="80px" prop="analysis" 
                            v-if="viewProblemForm.analysis">
                    <el-row type="flex">
                        <el-input
                            onfocus="this.blur();"
                            type="textarea"
                            :rows="4"
                            v-model="viewProblemForm.analysis"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>

                <!--编程题特有字段-->
                <el-form-item label="名称" label-width="80px" prop="problemName" 
                      v-if="viewProblemForm.problemName">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      size="mini"
                      v-model="viewProblemForm.problemName"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="题干" label-width="80px" prop="problemDescription"  
                      v-if="viewProblemForm.problemDescription">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewProblemForm.problemDescription"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入格式" label-width="80px" prop="problemInputFormat" 
                      v-if="viewProblemForm.problemInputFormat">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewProblemForm.problemInputFormat"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输入样例" label-width="80px" prop="problemSampleInput" 
                      v-if="viewProblemForm.problemSampleInput">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewProblemForm.problemSampleInput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                <el-form-item label="输出样例" label-width="80px" prop="problemSampleOutput" 
                      v-if="viewProblemForm.problemSampleOutput">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewProblemForm.problemSampleOutput"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
                
                <el-form-item label="提示" label-width="80px" prop="problemHint" 
                      v-if="viewProblemForm.problemHint">
                  <el-row type="flex">
                    <el-input
                      onfocus="this.blur();"
                      style="textarea"
                      size="mini"
                      type="textarea"
                      :rows="4"
                      v-model="viewProblemForm.problemHint"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间限制" label-width="80px" prop="problemTimeLimit" 
                                v-if="viewProblemForm.problemTimeLimit">
                            <el-row type="flex">
                                <el-input
                                onfocus="this.blur();"
                                style="width:65%; "
                                size="mini"
                                v-model="viewProblemForm.problemTimeLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内存限制" label-width="80px" prop="problemMemoryLimit" 
                                v-if="viewProblemForm.problemMemoryLimit">
                            <el-row type="flex">
                                <el-input
                                onfocus="this.blur();"
                                style="width:65%; "
                                size="mini"
                                v-model="viewProblemForm.problemMemoryLimit"
                                placeholder="请输入内容"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item label="题目来源" label-width="80px" prop="markup" 
                            v-if="viewProblemForm.markup">
                    <el-row type="flex">
                        <el-input
                            onfocus="this.blur();"
                            v-model="viewProblemForm.markup"
                            auto-complete="off"
                            size="mini"
                        ></el-input>
                    </el-row>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="难易度" label-width="80px" prop="difficulty" align="left" 
                                    v-if="viewProblemForm.difficulty">
                            <el-row type="flex">
                                <el-input
                                    v-model="viewProblemForm.difficulty"
                                    auto-complete="off"
                                    size="mini"
                                ></el-input>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="区分度" label-width="80px" prop="discrimination" align="left" 
                                    v-if="viewProblemForm.discrimination">
                            <el-row type="flex">
                                <el-input
                                    v-model="viewProblemForm.discrimination"
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
                            <el-button size="mini" type="primary" @click="closeViewProblemForm"
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


  </div>
</template>
<script>
import ComTable from "../../../common/ComTable.vue";
import ModifiableTable from './ModifiableTable .vue';

export default {
  components: {
    ComTable,
    ModifiableTable,
  },
  data() {
    return {
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResults: {},
      // findPersonPage参数
      courseCinstanceId: "",
      chapterId: "",
      isPub: "",
      typeFlag: "2",

      examId: "",

      //考试列表
      examList: {
        showFlag:{
          infoForm: true,
          itemList: true,
          problemList: true,
          preview: true,
          pub: true,
          removeExam: true,
        },
        disableFlag:{
          infoForm: false,
          itemList: false,
          problemList: false,
          pub: false,
          removeExam: false,
        },
      },
      // 添加考试信息
      allExamType: [],
      allKnowledge: [],
      addVisible: false,
      addForm: {
        knowledgeId: [],
      },
      addFormRules: {
        examName: [{ required: true, message: "请输入", trigger: "blur" }],
        examTypeId: [{ required: true, message: "请选择", trigger: "blur" }],
        knowledgeId: [{ required: true, message: "请选择", trigger: "blur" }],
        startTime: [{ required: true, message: "请选择", trigger: "blur" }],
        endTime: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      // 信息设置
      infoFormVisible: false,
      infoForm: {
        knowledgeId: [],
      },
      // 题型设置
      allProblemType: [],
      itemColumnFlag:{
        problemType: true,
        num: true,
        score: true,
        addButton: true,
        delButton: true,
      },
      itemListVisible: false,
      itemListForm: {
        tableData: [],
      },

      // 题目设置
      knowledgeOption: [],
      selectedKnowledge: "",
      allKnowledgeString: "",
      knowledgeString: "",
      generateVisible: false,
      generateForm: {
        type: "",
      },
      viewItemForm:{
        tableData:[],
      },
      // 选中的题目列表
      problemListVisible: false,
      problemListForm: {
        name: "",
        tableData: [
        ],
      },
      typeColumnFlag:{
        viewProblemType: true,
        viewNum: true,
        viewScore: true,
        openButton: true,
        previewItemList: true,
      },
      listColumnFlag:{
        knowledgeName: true,
        title: true,
        singleScore: true,
        selectButton: true,
        problemButton: true,
        total:true,
        delButton:true,
      },
      //预览题型下的题目
      previewProblemListVisible: false,
      previewProblemListForm: {
        problemTypeName:"",
        tableData:[],
      },
      problemColumnFlag:{
        previewKnowledgeName: true,
        previewTitle: true,
      },
      // 所有题目列表
      columns: [
        { prop: "examName", label: "标题", minWidth: 150, align: "center" },
        { prop: "examTypeName", label: "类型", minWidth: 150, align: "center" },
        // { prop: "num", label: "总题数", minWidth: 100, align: "center", formatter: this.getIsGenerate },
        // { prop: "fraction", label: "总分", minWidth: 100, align: "center", formatter: this.getIsGenerate },
        { prop: "list", label: "范围", minWidth: 250, align: "center" },
        {
          prop: "startTime",
          label: "开始时间",
          minWidth: 150,
          align: "center",
          formatter: this.dateFormat,
        },
        {
          prop: "endTime",
          label: "结束时间",
          minWidth: 150,
          align: "center",
          formatter: this.dateFormat,
        },
        {
          prop: "isPub",
          label: "状态",
          minWidth: 250,
          align: "center",
          formatter: this.getIsPub,
        },
      ],
      chapterList: [],
      pickerOptions: {},

      allProblemVisible: false,
      allProblemForm: {
        tableData: [
        ],
      },
      allProblem: {
        showFlag:{},
      },
      selected: [],
      problemColumns: [],
      choiceColumns: [
        { prop: "knowledgeName", label: "知识点", minWidth: 150, align: "center" },
        { prop: "title", label: "题干", minWidth: 250, align: "center" },
        { prop: "id", label: "id", minWidth: 250, align: "center" },    
      ],
      programColumns: [
         { prop: "knowledgeName", label: "知识点", minWidth: 150, align: "center" },
         { prop: "problemId", label: "problemId", minWidth: 250, align: "center" },
      ],

      // 查看单个题目表单
      viewProblemVisible: false,
      viewProblemForm: {
      },

      // 双向细目表
      objectiveListVisible: false,
      objectiveListForm: {
        tableData:[],
      },
      objColumnFlag:{
        problemButton: true,

        objProblemTypeName: true,
        objKnowledgeName: true,
        objScore: true,
        objObjective: true,

      },
      allObjective:[],


    };
  },
  mounted() {
    this.allKnowledge = JSON.parse(JSON.stringify(this.$store.state.course.knowledge));
    this.findAllExamType();
    this.findAllProblemType();
    this.findAllObjectiveType();

  },
  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
  },
  methods: {
    // 元数据及处理
    getIsPub(row) {
      if (row.isPub == "0") {
        return "待发布";
      }
      if (row.isPub == "1") {
        return "已发布";
      }
    },
    getIsGenerate(row) {
      if (row.num == "" || row.num == null ||
          row.num == undefined ||
          row.fraction == ""|| row.fraction == null ||
          row.fraction == undefined) {
        return "空(请组卷)";
      }
    },
    // 元数据查询
    findAllExamType() {
      let suggests = [];
      this.$api.metadata.examType.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allExamType = suggests;
      });
    },
    dateFormat(row, column) {
      return this.time(row.lastUpdateTime);
    },
    indexMethod: function (index) {
      return index + 1;
    },

    handleChangeTypeFlag(){
      if( this.typeFlag == "1") {
        // 期末考试
            this.findPersonPage(null);
      }
      if( this.typeFlag == "2") {
        // 非期末考试
            this.findPersonPage(null);
      }

    },
    // 分页查询
    findPersonPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "insId", value: this.$store.state.course.courseCinstanceId },
        { name: "chapterId", value: this.chapterId },
        { name: "isPub", value: this.isPub },
        { name: "typeFlag", value: this.typeFlag}
      ];
      console.log(this.pageRequest.params);
      this.$api.exam.examSetup
        .findPersonPage(this.pageRequest)
        .then((res) => {
          // console.log(res.data);
          if (res.data !== null) {
            let pageResults = res.data;
            for (let i = 0; i < pageResults.content.length; i++) {
              let clist = [];
              for (
                let j = 0;
                j < pageResults.content[i].chapterOfList.length;
                j++
              ) {
                clist.push(
                  pageResults.content[i].chapterOfList[j].chapterName,
                  ";"
                );
                pageResults.content[i].list = JSON.parse(JSON.stringify(clist));
              }
            }
            this.pageResults = pageResults;
            console.log(this.pageResults.content);
            // console.log(this.pageResults.content[0].chapterOfList[0].chapterName);
          }
          if (res.data == null) {
            this.$message({
              message: res.msg,
              type: "error",
            });
            this.pageResults = [];
            console.log(this.pageResults.content);
            // console.log(this.pageResults.content[0].chapterOfList[0].chapterName);
          }

        })
        .then(data != null ? data.callback : "");
    },
    // 条件查询PersonPage
    handleSearchChapter(item) {
      console.log(item);
      if (item === undefined ||item === null ||item === "" ||item.length === 0) 
      {
        this.chapterId = "";
      } else {
        this.chapterId = item[item.length - 1];
      }
      console.log(this.chapterId);
      this.findPersonPage(null);
    },

    // 添加考试信息
    chandgeAddVisible() {
      this.addVisible = true;
    },
    closeAddForm() {
      this.addVisible = false;
      this.$refs.addForm.resetFields();
      this.addForm = {};
    },
    submitAdd() {
      for (let index = 0; index < this.addForm.knowledgeId.length; index++) {
        console.log(this.addForm.knowledgeId[index]);
        this.chapterList.push({ chapterId: this.addForm.knowledgeId[index] });
      }
      console.log(this.chapterList);
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.addForm);
            params.insId = this.$store.state.course.courseCinstanceId;
            params.chapterOfList = this.chapterList;
            console.log(params);
            this.$api.exam.examSetup
              .add(params)
              .then((res) => {
                if (res.code == 200) {
                  this.$message({
                    message: "保存成功，请尽快组卷",
                    type: "success",
                  });
                  this.findPersonPage(null);
                  this.closeAddForm();
                  // this.flag = "2"
                  // this.$refs.getAllAudit()
                } else {
                  this.$message({
                    message: "操作失败, " + res.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                this.chapterList = [];
              });
          });
        }
      });
    },
    // 删除
    handleRemove(data) {
      console.log(data.params);
      this.$api.exam.examSetup
        .del(data.params)
        .then(data != null ? data.callback : "");
    },

    // 信息设置
    changeInfoFormVisible(row) {
      this.infoForm = JSON.parse(JSON.stringify(row));
      console.log(row.chapterOfList);
      // 所选考试范围回显
      let chapterList = [];
      for (let index = 0; index < row.chapterOfList.length; index++) {
        chapterList.push(parseInt(row.chapterOfList[index].chapterId));
      }
      console.log(chapterList);
      this.infoForm.knowledgeId = chapterList;
      this.infoFormVisible = true;
    },
    closeInfoForm() {
      this.infoFormVisible = false;
      this.$refs.infoForm.resetFields();
      this.infoForm = {};
    },
    submitInfoForm() {
      for (let index = 0; index < this.infoForm.knowledgeId.length; index++) {
        console.log(this.infoForm.knowledgeId[index]);
        this.chapterList.push({ chapterId: this.infoForm.knowledgeId[index] });
      }
      console.log(this.chapterList);
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.infoForm);
            params.insId = this.$store.state.course.courseCinstanceId;
            params.chapterOfList = this.chapterList;
            console.log(params);
            this.$api.exam.examSetup
              .update(params)
              .then((res) => {
                if (res.code == 200) {
                  this.$message({
                    message: "保存成功，请尽快组卷",
                    type: "success",
                  });
                  this.findPersonPage(null);
                  this.closeInfoForm();
                } else {
                  this.$message({
                    message: "操作失败, " + res.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                this.chapterList = [];
              });
          });
        }
      });
    },

    // 题型设置
    findAllProblemType() {
      // 未处理所有选项
      let suggests = [];
      this.$api.course.courseProblemType
        .findByCid({ courseId: this.$store.state.course.courseId })
        .then((res) => {
          // console.log(res);
          for (let index = 0; index < res.data.length; index++) {
            suggests.push({
              value: res.data[index].problemTypeName,
              id: res.data[index].problemTypeId,
              disabled: false,
            });
          }
          // console.log(suggests);
          this.allProblemType = suggests;
        });
    },
    handleAllProblemType(list) {
      // console.log(list);
      let suggests = [];
      this.$api.course.courseProblemType
        .findByCid({ courseId: this.$store.state.course.courseId })
        .then((res) => {
          // console.log(res);
          for (let index = 0; index < res.data.length; index++) {
            suggests.push({
              value: res.data[index].problemTypeName,
              id: res.data[index].problemTypeId,
              disabled: false,
            });
          }
          // console.log(suggests);
          if (list !==undefined && list != null  && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < suggests.length; j++) {
                if (list[i].problemTypeId == suggests[j].id ) {
                  suggests[j].disabled = true;
                }
              }
            }
          }
          this.allProblemType = JSON.parse(JSON.stringify(suggests))     
      });
    },
    findItemList(){
       this.pageRequest.params = [{ name: "examId", value: this.examId },];
       this.$api.exam.examItem.findList(this.pageRequest)
        .then((res) => {
          // console.log(res);
          if (res.data != null) {
            console.log(res.data);
            this.itemListForm.tableData = res.data.content;
            console.log();
            // 题型选择栏禁用项处理
            this.handleAllProblemType(this.itemListForm.tableData);
          }
       })
    },
    changeItemListVisible(row) {
      console.log(row);
      //item项回显
      this.examId = row.id;
      this.pageRequest.params = [{ name: "examId", value: this.examId },];
       this.$api.exam.examItem.findList(this.pageRequest)
        .then((res) => {
          // console.log(res);
          if (res.data != null) {
            console.log(res.data);
            this.itemListForm.tableData = res.data.content;
            this.itemListForm.totalSize = res.data.totalSize;
            // 题型选择栏禁用项处理
            this.handleAllProblemType(this.itemListForm.tableData);
          }
       }).catch((err) => {})
       this.itemListVisible = true;
      },
    closeItemListForm() {
      this.itemListForm = {
        tableData: [],
      }
      this.itemListVisible = false;
    },
    submitItemListForm() {
       //校验
      console.log(this.itemListForm);
      console.log(this.itemListForm.tableData);
      let suggests = JSON.parse(JSON.stringify(this.itemListForm.tableData));
      for (let m = 0; m < suggests.length; m++) {
        
        if (suggests[m].problemTypeId == null || suggests[m].problemTypeId == "" ||
            suggests[m].problemTypeId == undefined ||
            suggests[m].num == null || suggests[m].num == "" ||
            suggests[m].num == undefined || !/^[1-9]\d*$/.test(suggests[m].num) ||
            suggests[m].score == null || suggests[m].score == "" ||
            suggests[m].score == undefined || !/^[1-9]\d*$/.test(suggests[m].score) 
        ) {
            this.$message({
              message: "请检查表格信息" ,
              type: "error",
            });
            return null;
          }
       }
        // 插入examId，处理参数
        for (let i = 0; i < this.itemListForm.tableData.length; i++) {
          this.itemListForm.tableData[i].examId = this.examId;
        }
        let params = JSON.parse(JSON.stringify(this.itemListForm.tableData));
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.$api.exam.examItem.update(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.findItemList();
            }
          })
          .catch((err) => {
            this.closeItemListForm();
            })
        });
      
    },

    // 题目设置
    handleGenerateChange(row) {
      console.log(row);
      //item项回显
      this.examId = row.id;
      this.pageRequest.params = [{ name: "examId", value: this.examId },];
       this.$api.exam.examItem.findList(this.pageRequest)
        .then((res) => {
          // console.log(res);
          if (res.data != null) {
            console.log(res.data);
            this.viewItemForm.tableData = res.data.content;
            this.viewItemForm.totalSize = res.data.totalSize;
            this.generateForm = JSON.parse(JSON.stringify(row))
            console.log(this.generateForm);
            //处理章节查询参数
            this.knowledgeOption = this.generateForm.chapterOfList;
            let knowledgeString = "";
            for (let index = 0; index < this.knowledgeOption.length; index++) {
              knowledgeString = knowledgeString + this.knowledgeOption[index].chapterId + ','
            }
            this.allKnowledgeString = knowledgeString;
            console.log(this.allKnowledgeString);
          }
          this.generateVisible = true;
       }).catch((err) => {})
    },
    closeGenerateForm() {
      this.generateVisible = false;
      this.viewItemForm={
        tableData: [],
      };
      this.generateForm = {};
    },
    // 预览题型下所有题目 itemId -> problemList
    handlePreviewChange(row) {
      console.log(row);
      this.previewProblemListForm.problemTypeName = row.problemTypeName;
      let itemId = row.id;
      this.$api.exam.examContent.findProblemList({itemId:itemId}).then((res) =>{
        console.log(res.data);

        let m = 0;

        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            m++;
            if (res.data[i].problemTypeName == "单选题") {
              let content = {};
              content.id = res.data[i].id;
              content.index = m;
              content.knowledgeName = res.data[i].knowledgeName;
              content.title = res.data[i].choice.title;
              this.previewProblemListForm.tableData.push(content);
            }
            if (res.data[i].problemTypeName == "编程题") {
              let content = {};
              content.id = res.data[i].id;
              content.index = m;
              content.knowledgeName = res.data[i].knowledgeName;
              content.title = res.data[i].program.problemDescription;
              this.previewProblemListForm.tableData.push(content);

            }
          }
          console.log(this.previewProblemListForm.tableData);
        }
      })




      this.previewProblemListVisible = true;


    },
    closePreviewProblemListForm() {
      this.previewProblemListVisible = false;
      this.previewProblemListForm = {
        tableData:[],
      };

    },


    changeProblemListVisible(row) {
        console.log(row);
   
        this.problemListForm.name = row.problemTypeName;
        this.problemListForm.id = row.problemTypeId;
        this.problemListForm.num = row.num;
        this.problemListForm.score = row.score;
        this.problemListForm.itemId = row.id;
        this.problemListForm.examId = row.examId;
          
        if (row.id != "" && row.id != null && row.id != undefined) {
          this.pageRequest.params = [{ name: "itemId", value: row.id },];
          this.$api.exam.examContent.findList(this.pageRequest)
            .then((res) => {
              console.log(res);
              if (res.data != null) {
                console.log(res.data);
                this.problemListForm.tableData = res.data.content;
              }
          })
        }
        //显示对话框
        this.problemListVisible = true;
        console.log(this.problemListForm);
    },
    closeProblemListForm() {
      this.problemListVisible = false;
      this.problemListForm = {
        tableData: [
        ],
      };
    },
    submitProblemList() {
      console.log(this.problemListForm.tableData);

      let score = 0;
      for (let index = 0; index < this.problemListForm.tableData.length; index++) {
         let s= this.problemListForm.tableData[index].score;
         score = score + s;
      }
      console.log("当前各题分数总和"+ score);
      console.log("预设分值"+ this.problemListForm.score);

      if (this.problemListForm.score != score) {
        this.$message({
          message: "请核对各题分数总和与题型分值是否一致" ,
          type: "error",
        });
      } else {
        console.log(this.problemListForm);
        console.log(this.problemListForm.tableData);
        console.log(this.itemListForm.tableData);
        
        let params = [];
        for (let i = 0; i < this.problemListForm.tableData.length; i++) {
          params.push({
            itemId: this.problemListForm.itemId,
            problemId: this.problemListForm.tableData[i].id,
            problemTypeId: this.problemListForm.id,
            score: this.problemListForm.tableData[i].score,
            knowledgeName: this.problemListForm.tableData[i].knowledgeName,
            examId: this.problemListForm.examId,
          })
        }
        console.log(params);

        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.$api.exam.examContent.update(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.problemListVisible = false;
            }
          })
          .catch((err) => {
          })
        });

        console.log(this.itemListForm.tableData);
        console.log(this.generateForm);
        this.clearSelections();
        
      }

    },


    handleSelectedKnowledge(item) {
      console.log(item);
      if (item == "" || item == null || item == undefined) {
        this.knowledgeString = this.allKnowledgeString;
      } else {
        this.knowledgeString = item;
      }
      //区分题型
      this.findProblemPage(null);

    },
    findProblemPage(data) {
      //按题型选择相应方法查询
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "courseId", value: this.$store.state.course.courseId },
        { name: "knowledgeString", value: this.knowledgeString },
        // { name: "knowledgeId", value: [] },
      ];
      // 根据表单获取当前题型
      let lable = this.problemListForm.name;
      console.log(lable);
      if (lable == "单选题") {
        this.$api.problem.choice
        .findByKid(this.pageRequest)
        .then((res) => {
            if(res.data !== null) {
                this.problemColumns = [...this.choiceColumns]
                console.log(res.data);
                this.allProblemForm.tableData = res.data;           
            }  
            console.log(this.knowledgeOption);
        }).catch(err => {
              this.selectedKnowledge = "";
              // this.knowledgeString = "";
              // this.findPage(null);
        })
        .then(data != null ? data.callback : "");
      }
      if (lable == "编程题") {
        this.$api.problem.prog.findByKid(this.pageRequest)
        .then((res) => {
            if(res.data !== null) {
                this.problemColumns = [...this.programColumns]
                console.log(res.data);
                this.allProblemForm.tableData = res.data;           
            }  
            // console.log(this.knowledgeOption);
        }).catch(err => {
              this.selectedKnowledge = "";
              // this.knowledgeString = "";
              // this.findPage(null);
        })
        .then(data != null ? data.callback : "");
      } 
      // console.log(this.pageRequest);
    },
    showSelections(list) {
      this.$refs.problemTable.showSelections(list);
    },

    changeAllProblemVisible() {
      console.log(this.allProblemType);
      console.log(this.generateForm);
      console.log(this.itemListForm);
      console.log(this.problemListForm);

      console.log(this.knowledgeOption);
      console.log(this.generateForm.chapterOfList);

      // 调用查询题目页面方法
      this.knowledgeString = this.allKnowledgeString
      console.log(this.knowledgeString);
      this.findProblemPage(null);
      // 已有题目在选题表格中的回显
      console.log(this.problemListForm.tableData);
      let selected = [];
      for (let i = 0; i < this.problemListForm.tableData.length; i++) {
        selected.push(parseInt(this.problemListForm.tableData[i].problemId));
      }
      console.log(selected);
      this.allProblemVisible = true;
      this.showSelections(selected);
    },
    handleAllProblemSelect(suggests){
      console.log(this.problemListForm.num);
      for (let index = 0; index < suggests.length; index++) {
        suggests[index].score = this.problemListForm.score/suggests.length
      }
      this.problemListForm.tableData =JSON.parse(JSON.stringify(suggests));
      console.log(this.problemListForm.tableData);
      console.log(this.problemListForm.tableData.length);
    },
    clearSelections() {
      this.$refs.problemTable.clearSelections();
    },

    closeAllProblemForm() {
      console.log(this.allProblemForm);
      this.pageRequest.params = [{ name: "itemId", value: this.problemListForm.itemId },];
      this.$api.exam.examContent.findList(this.pageRequest)
        .then((res) => {
          console.log(res);
          if (res.data != null) {
            console.log(res.data);
            this.problemListForm.tableData = res.data.content;
            console.log();
          }
      })
      // 清除组件内选中项
      this.clearSelections();
      // 清除表格数据
      this.problemListForm.tableData = []
      this.allProblemVisible = false;
    },

    submitAllProblem() {
      // 校验
      if( this.problemListForm.num != this.problemListForm.tableData.length
        ) {
        this.$message({
          message: "请按规定数量选题" ,
          type: "error",
        });
      } else {
        this.allProblemVisible = false;
      }
    },


    // 双向细目页面
    findAllObjectiveType() {
      let suggests = [];
      this.$api.course.courseTarget
      .findAllTargets({cinstanceId: this.$store.state.course.courseCinstanceId})
      .then((res) => {
          console.log(res);
          for (let index = 0; index < res.data.content.length; index++) {
            suggests.push({
              value: res.data.content[index].name,
              id: res.data.content[index].id,
              lable: res.data.content[index].objectiveTypeName
            });
          }
          this.allObjective = JSON.parse(JSON.stringify(suggests));
          console.log(this.allObjective);
        });
    },
    changeObjectiveListVisible(row) {
      console.log(row);
      let examId = row.id;

      this.pageRequest.params = [{ name: "examId", value: examId },];
      this.$api.exam.examContent.findByExamId(this.pageRequest).then((res) => {
        console.log(res.data);
        if(res.data !== null) {
          this.objectiveListForm = res.data;
          this.objectiveListForm.tableData = this.objectiveListForm.content;
          console.log(this.objectiveListForm.tableData);
        } 
        this.objectiveListVisible = true;
      }).catch(err => {})

    },
    closeObjectiveList() {
      this.objectiveListForm = {
        tableData:[]
      };
      this.objectiveListVisible = false;
    },
    submitObjectiveList() {
      console.log(this.objectiveListForm.tableData);

      let params = JSON.parse(JSON.stringify(this.objectiveListForm.tableData))

      for (let i = 0; i < params.length; i++) {
        if (params[i].objectiveId == null ||
            params[i].objectiveId == "" ||
            params[i].objectiveId == undefined) 
         {
            this.$message({
              message: "请填写完整" ,
              type: "error",
            }) 
            return null;
         }
      }
      console.log(params);
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.$api.exam.examContent.updateObj(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              // this.problemListVisible = false;
            }
          })
          .catch((err) => {
          })
        });
    },

    // 预览全部
    handlePreview(row) {
      console.log(row);
      let url = this.global.baseUrl + '/exam/setup/pdf?examId='
      // console.log(url);
      window.open( url+ row.id)
    },

    // 发布
    handlePub(row) {
      console.log(row);
      let examId = row.id;
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.$api.exam.examSetup.pub({examId:examId}).then((res) =>{
          if (res.code == 200) {
            this.$message({message: res.msg,type: "success",});
            this.findPersonPage(null);
          }
        })
        .catch((err) =>{})
      })
    },

    openProblemInfo(row) {
      console.log(row);

      let problemTypeId = row.problemTypeId;
      let problemId = row.problemId;

      if (problemTypeId == 1) {
        // 选择题
        this.$api.problem.choice.findById({id:problemId}).then((res) => {
          console.log(res.data);
          if (res.data != null) {
            this.viewProblemForm = JSON.parse(JSON.stringify(res.data))
            this.viewProblemVisible = true;
          }    
        }) 
      }
      if (problemTypeId == 7) {
        // 编程题
        this.$api.problem.prog.findById({id:problemId}).then((res) =>{
          console.log(res.data);
          if (res.data != null) {
            this.viewProblemForm = JSON.parse(JSON.stringify(res.data))
            this.viewProblemVisible = true;
          }
        })
      }

      
    },
    closeViewProblemForm() {
      this.viewProblemVisible = false;
      this.viewProblemForm = {};
    },




    
  },
};
</script>
<style>
.outside {
  text-align: center;
}
</style>