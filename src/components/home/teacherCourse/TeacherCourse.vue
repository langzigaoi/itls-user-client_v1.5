<template>
<div>
  <!-- <el-container>
    
    <el-main> -->
      <!-- <div class="page-container"> -->
        <!--工具栏-->
        <el-row>
          <el-col :span="12" align="right">
            <el-tabs
              v-model="isPub"
              type="card"
              @tab-click="getAllInstance"
              class="mlef-20"
            >
              <el-tab-pane label="待审核" name="0"></el-tab-pane>
              <el-tab-pane label="我的课程" name="1"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="12">
            <el-form :inline="true" :model="filters">
              <el-form-item>
                <el-input
                  size="small"
                  v-model="filters.name"
                  placeholder="名称"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="mini" type="primary">查询</el-button>
              </el-form-item>

              <el-form-item>
                <el-button
                  size="mini"
                  type="primary"
                  @click="chandgeAddInstanceVisible"
                  >新增</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-card
          class="box-card"
          style="padding: 0"
          :body-style="{ padding: '15px' }"
          v-for="(item, index) in tableFliter"
          :key="index"
        >
          <div class="card-header" align="center">
            <div class="fl-left" style="width: 60%; padding-top: 5px">
              <!-- <h3 class="clear-pm">{{ item.courseName }}</h3> -->
            </div>
          </div>

          <div class="card-body">
            <div style="width: 100%">
              <el-image
                :src="item.image"
                fit="fill"
                style="height: 180px"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </div>
            <div style="width: 80%" align="left">
              <el-row >
                <el-col :span="10">
                  <el-row>
                    <div class="details-lable">课程名称:</div>
                  </el-row>
                  <!-- <el-row>
                    <div class="details-lable">课程简介:</div>
                  </el-row> -->
                  <el-row>
                    <div class="details-lable">申请时间:</div>
                  </el-row>
                </el-col>

                <el-col :span="14">
                  <el-row>
                    <div class="details-lable">{{ item.courseName }}</div>
                  </el-row>
                  <!-- <el-row>
                    <div class="details-lable">{{ item.intro }}</div>
                  </el-row> -->
                  <el-row>
                    <div class="time">"{{ time(item.createTime) }}"</div>
                  </el-row>
                </el-col>
              </el-row>
            </div>

            <div class="card-footer">
              <div style="float: right; padding: 3px 0" type="text">
                <el-button
                  v-show="isPub == 0 "
                  size="mini"
                  type="primary"
                  @click="chandgeEditInstanceVisible(item)"
                >编辑</el-button>
                <el-button
                  v-show="isPub == 1"
                  size="mini"
                  type="primary"
                  @click="handleInto(item)"
                >进入课程</el-button>
                <el-button
                  v-show="isPub == 0"
                  size="mini"
                  type="danger"
                  @click="handleDelete(item)"
                >删除</el-button>
        
              </div>
            </div>
          </div>

        </el-card>
      <!-- </div> -->

      <!-- 编辑课程实例-->
      <el-dialog
        title="编辑课程实例"
        width="60%"
        :visible.sync="editInstanceDialogVisible"
        :close-on-click-modal="false"
        destroy-on-close
      >
        <el-form
          ref="editInstanceForm"
          :model="editInstanceForm"
          :rules="editInstanceRules"
          style="text-align:center"
          
        >
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="5">
                <div>
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadimgurl"
                    :show-file-list="false"
                    :on-success="handleEditImageSuccess"
                    name="image"
                    with-credentials
                    :before-upload="beforeImageUpload"
                  >
                    <img
                      v-if="editInstanceForm.image"
                      :src="editInstanceForm.image"
                      style="max-width: 100px"
                      class="avatar"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                      style="
                        min-width: 100px;
                        border: 1px solid #ccc;
                        min-height: 100px;
                        line-height: 100px;
                      "
                    ></i>
                  </el-upload>
                </div>
              </el-col>

              <el-col :span="9">
                <el-form-item label="课程名称" label-width="80px" prop="courseId">
                  <el-row type="flex">
                    <el-select
                      disabled
                      style="width: 205px"
                      size="small"
                      v-model="editInstanceForm.courseId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in allCourse"
                        :key="item.value"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                    
                  </el-row>
                </el-form-item>

                <el-form-item label="主 讲 人" label-width="80px" prop="lecturer">
                  <el-row type="flex">
                    <el-input
                      style="width: 205px"
                      size="small"
                      v-model="editInstanceForm.lecturer"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-form-item label="开始时间" label-width="80px" prop="startYear">
                  <el-row type="flex">
                    <el-date-picker
                      disabled
                      style="width: 205px"
                      size="small"
                      align="left"
                      v-model="editInstanceForm.startYear"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </el-row>
                </el-form-item>

                <el-form-item
                  label="周 学 时"
                  prop="hoursOfWeek"
                  label-width="80px"
                >
                  <el-row type="flex">
                    <el-input
                      style="width: 205px"
                      size="small"
                      v-model="editInstanceForm.hoursOfWeek"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-form-item label="需要编程" label-width="80px" prop="isProgram">
                  <el-row type="flex">
                    <div>
                      <el-select
                        size="small"
                        v-model="editInstanceForm.isProgram"
                        placeholder="请选择"
                        @change="handleSelectIsProgram"
                      >
                        <el-option
                          v-for="item in programOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-row>
                </el-form-item>

                
              </el-col>

              <el-col :span="10">
                <!-- <el-form-item  label-width="70px">
                  <el-row type="flex">
                    <el-button type="text" @click="chandgeAddCourseVisible"
                      >没有想要的课程？请点击</el-button
                    >
                  </el-row>
                </el-form-item>  -->

                <el-form-item label="教学类型" label-width="80px" prop="teachingTypeId">
                  <el-row type="flex">
                    <el-select
                      size="small"
                      v-model="editInstanceForm.teachingTypeId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in allTeachingType"
                        :key="item.value"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-row>
                </el-form-item>

                <el-form-item label="学期" label-width="80px" prop="semester">
                  <el-row type="flex">
                    <div>
                      <el-select
                        disabled
                        size="small"
                        v-model="editInstanceForm.semester"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in semesterOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-row>
                </el-form-item>

                <el-form-item label="结束时间" label-width="80px" prop="endYear">
                  <el-row type="flex">
                    <el-date-picker
                      disabled
                      style="width: 205px"
                      size="small"
                      align="left"
                      v-model="editInstanceForm.endYear"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </el-row>
                </el-form-item>
              
                <el-form-item label="学分" label-width="80px" prop="grade" >
                
                  <el-row type="flex">
                    <el-input
                      style="width: 205px"
                      size="small"
                      v-model="editInstanceForm.grade"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-form-item label="编程语言" label-width="80px"   >
                  <el-row type="flex">
                    <div>
                      <el-select
                       :disabled="editInstanceForm.isProgram == 0"
                        multiple
                        size="small"
                        v-model="langlist"
                        @change="handleSelectLanguage"
                        placeholder="请选择"
                        clearable
                      >
                        <el-option
                          v-for="item in allLanguage"
                          :key="item.value"
                          :label="item.value"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-row>
                </el-form-item>

              </el-col>
            </el-row>

            <el-row type="flex" justify="center">
              <el-col :span="5"></el-col>
              <el-col :span="19">
                <el-form-item label="课程简介" label-width="80px" prop="intro">
                  <el-row type="flex">
                    <el-input
                      style="width: 570px"
                      size="small"
                      type="textarea"
                      :rows="4"
                      v-model="editInstanceForm.intro"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <div>
              <el-row type="flex" align="bottom" justify="end">
                <el-button size="mini" @click="closeEditInstanceForm"
                  >返回
                </el-button>
                <el-button type="primary" size="mini" @click="submitEditInstance"
                  >确定</el-button
                >
              </el-row>
            </div>
          </div>
        </el-form>
      </el-dialog>


      <!-- 增加课程实例-->
      <el-dialog
        title="课程申请"
        width="60%"
        :visible.sync="addInstanceDialogVisible"
        :close-on-click-modal="false"
        destroy-on-close
      >
        <el-form
          ref="addInstanceInform"
          :model="addInstanceInform"
          :rules="addInstanceRules"
        >
          <div>
            <el-row type="flex" justify="center">
              <el-col :span="5">
                <div>
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadimgurl"
                    :show-file-list="false"
                    :on-success="handleAddImageSuccess"
                    name="image"
                    with-credentials
                    :before-upload="beforeImageUpload"
                  >
                    <img
                      v-if="addInstanceInform.image"
                      :src="addInstanceInform.image"
                      style="max-width: 100px"
                      class="avatar"
                    />
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                      style="
                        min-width: 100px;
                        border: 1px solid #ccc;
                        min-height: 100px;
                        line-height: 100px;
                      "
                    ></i>
                  </el-upload>
                </div>
              </el-col>

              <el-col :span="9">
                <el-form-item label="课程名称" label-width="80px" prop="courseId">
                  <el-row type="flex">
                    <el-select
                      style="width: 205px"
                      size="small"
                      v-model="addInstanceInform.courseId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in allCourse"
                        :key="item.value"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                    <!-- <el-tooltip
                      class="item"
                      effect="dark"
                      content="没有想要的课程？请点击"
                      placement="right-start"
                    > -->
                      <el-button
                        type="text"
                        @click="chandgeAddCourseVisible"
                      >
                      <i class="el-icon-info" ></i>
                      
                      </el-button>
                    <!-- </el-tooltip> -->
                  </el-row>
                </el-form-item>

                <el-form-item label="主讲人" label-width="80px" prop="lecturer">
                  <el-row type="flex">
                    <el-input
                      style="width: 205px"
                      size="small"
                      v-model="addInstanceInform.lecturer"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-form-item label="开始时间" label-width="80px" prop="startYear">
                  <el-row type="flex">
                    <el-date-picker
                      style="width: 205px"
                      size="small"
                      align="left"
                      v-model="addInstanceInform.startYear"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </el-row>
                </el-form-item>

                <el-form-item label="周学时" prop="hoursOfWeek" label-width="80px" >
                  <el-row type="flex">
                    <el-input
                      style="width: 205px"
                      size="small"
                      v-model="addInstanceInform.hoursOfWeek"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-form-item label="需要编程" label-width="80px" prop="isProgram">
                  <el-row type="flex">
                    <div>
                      <el-select
                        size="small"
                        v-model="addInstanceInform.isProgram"
                        placeholder="请选择"
                        @change="handleSelectIsProgram"
                      >
                        <el-option
                          v-for="item in programOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-row>
                </el-form-item>

              </el-col>

              <el-col :span="10">
                <!-- <el-form-item  label-width="70px">
                  <el-row type="flex">
                    <el-button type="text" @click="chandgeAddCourseVisible"
                      >没有想要的课程？请点击</el-button
                    >
                  </el-row>
                </el-form-item>  -->

                <el-form-item label="教学类型" label-width="80px" prop="teachingTypeId">
                  <el-row type="flex">
                    <el-select
                      size="small"
                      v-model="addInstanceInform.teachingTypeId"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in allTeachingType"
                        :key="item.value"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-row>
                </el-form-item>

                <el-form-item label="学期" label-width="80px" prop="semester">
                  <el-row type="flex">
                    <div>
                      <el-select
                        size="small"
                        v-model="addInstanceInform.semester"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in semesterOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-row>
                </el-form-item>

                <el-form-item label="结束时间" label-width="80px" prop="endYear">
                  <el-row type="flex">
                    <el-date-picker
                      style="width: 205px"
                      size="small"
                      align="left"
                      v-model="addInstanceInform.endYear"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    >
                    </el-date-picker>
                  </el-row>
                </el-form-item>

                <el-form-item label="学分" label-width="80px"  prop="grade">
                  <el-row type="flex">
                    <el-input
                      style="width: 205px"
                      size="small"
                      v-model="addInstanceInform.grade"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>

                <el-form-item label="编程语言" label-width="80px" prop="langlist">
                  <el-row type="flex">
                    <div>
                      <el-select
                       :disabled="program"
                        multiple
                        size="small"
                        v-model="langlist"
                        @change="handleSelectLanguage"
                        placeholder="请选择"
                        clearable
                      >
                        <el-option
                          v-for="item in allLanguage"
                          :key="item.value"
                          :label="item.value"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </el-row>
                </el-form-item>

              </el-col>
            </el-row>

          
            <el-row type="flex" justify="center">

              <el-col :span="5">
              </el-col>

              <el-col :span="19">
                 <el-form-item label="课程简介" label-width="80px" prop="intro">
                  <el-row type="flex">
                    <el-input
                      style="width: 570px"
                      size="small"
                      type="textarea"
                      :rows="4"
                      v-model="addInstanceInform.intro"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>

            <div>
              <el-row type="flex" align="bottom" justify="end">
                <el-button size="mini" @click="closeAddInstanceVisible"
                  >返回
                </el-button>
                <el-button type="primary" size="mini" @click="submitAddInstance"
                  >确定</el-button
                >
              </el-row>
            </div>
          </div>
        </el-form>
      </el-dialog>

      <!-- 增加课程-->
      <el-dialog
        title="申请新课程"
        width="60%"
        :visible.sync="addCourseDialogVisible"
        :close-on-click-modal="false"
        destroy-on-close
        
      >
        <el-form ref="courseForm" :model="addCourseInform" :rules="addCourseRules">
          <el-row type="flex" align="middle" justify="center">
            <el-col :span="12">
              <!-- <el-form-item label="" label-width="80px">
                {{viewForm.name}}
            </el-form-item> -->
              <el-form-item label="课程名称" label-width="80px" prop="name">
                <el-input
                  style="width:205px"
                  size="small"
                  v-model="addCourseInform.name"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程层次" label-width="80px" prop="level">
                <el-select
                  size="small"
                  v-model="addCourseInform.level"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in allLevel"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="课程方向" label-width="80px" prop="type1Id">
                <el-select
                  size="small"
                  v-model="addCourseInform.type1Id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in allDirection"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="课程要求" label-width="80px" prop="type2Id">
                <el-select
                  size="small"
                  v-model="addCourseInform.type2Id"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in ALLRequirement"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
            <el-row type="flex" align="bottom" justify="end">
              <el-button size="mini" @click="closeAddCourseVisible"
                >返回
              </el-button>
              <el-button type="primary" size="mini" @click="submitAddCourse"
                >确定</el-button
              >
            </el-row>
          </div>
        </el-form>
      </el-dialog>

      <!-- </el-main>
    </el-container> -->
  </div>
</template>
<script>
import { time, isInterger, isEmail } from "@/utils/global-functions";
import { baseUrl } from "@/utils/global";

export default {
  data() {
    return {
      isPub: "1",
      // 课程实例数据
      allIstance: [],
      tableData: [],
      filters: {
        name: "",
      },
      uploadimgurl: "",
      // 课程数据
      allCourse: [],
      allLevel: [],
      allDirection: [],
      ALLRequirement: [],
      allTeachingType: [],
      allLanguage: [],
      // 新增课程表单
      addCourseInform: [],
      addCourseDialogVisible: false,
      // 新增课程实例表单
      addInstanceDialogVisible: false,
      addInstanceInform: {
        image: null,
      },
      semesterOptions: [
        {
          value: 1,
          label: "第一学期",
        },
        {
          value: 2,
          label: "第二学期",
        },
      ],
      programOptions: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
      langlist: [],
      langlistCheck: [],
      program: false,
      cinstanceLanguage: [],
      // 时间选择器
      pickerOptions: {
      },
      addInstanceRules: {
        courseId: [{required: true, message: "请选择", trigger: "blur"}],
        lecturer: [{required: true, message: "请选择", trigger: "blur"}],
        startYear: [{required: true, message: "请选择", trigger: "blur"}],
        endYear: [{required: true, message: "请选择", trigger: "blur"}],
        isProgram: [{required: true, message: "请选择", trigger: "blur"}],
        teachingTypeId: [{required: true, message: "请选择", trigger: "blur"}],
        semester: [{required: true, message: "请选择", trigger: "blur"}],
        // langlist: [{required: true, message: "请选择", trigger: "blur"}],
        intro: [{required: true, message: "请输入", trigger: "blur"}],

        hoursOfWeek: [{required: true, validator: this.checkHoursOfWeek, trigger: "blur" }],
        grade: [{required: true, validator: this.checkGrade, trigger: "blur" }],
      },
      addCourseRules: {
        name: [{required: true, message: "请选择", trigger: "blur"}],
        level: [{required: true, message: "请选择", trigger: "blur"}],
        type1Id: [{required: true, message: "请选择", trigger: "blur"}],
        type2Id: [{required: true, message: "请选择", trigger: "blur"}],
      },
      // 编辑课程实例
      editInstanceDialogVisible: false,
      editInstanceForm: {},
      editInstanceRules: {
        courseId: [{required: true, message: "请选择", trigger: "blur"}],
        lecturer: [{required: true, message: "请选择", trigger: "blur"}],
        startYear: [{required: true, message: "请选择", trigger: "blur"}],
        endYear: [{required: true, message: "请选择", trigger: "blur"}],
        isProgram: [{required: true, message: "请选择", trigger: "blur"}],
        teachingTypeId: [{required: true, message: "请选择", trigger: "blur"}],
        semester: [{required: true, message: "请选择", trigger: "blur"}],
        intro: [{required: true, message: "请输入", trigger: "blur"}],

        hoursOfWeek: [{required: true, validator: this.checkHoursOfWeek, trigger: "blur" }],
        grade: [{required: true, validator: this.checkGrade, trigger: "blur" }],
      },
      


    };
  },

  computed: {
    tableFliter() {
      return this.tableData.filter((item) => {
        return (
          String(item.courseName).toLowerCase().indexOf(this.filters.name) > -1
        );
      });
    },
    
  },

  mounted() {
    this.getAllInstance();
    this.getAllCourse();
    this.findAllLevel();
    this.findAllDirection();
    this.findAllRequirement();
    this.findAllTeachingType();
    this.findAllLanguage();
    this.uploadimgurl = `${baseUrl}/OssUpload/image`;
  },
  methods: {
    //自增序列
    indexMethod(index) {
      return index + 1;
    },
    //获取所有课程实例
    getAllInstance() {
      // console.log(this.isPub);
      this.loading = true;
      this.$api.course.cinstance
        .findAllCourseInstance({ isPub: this.isPub })
        .then((res) => {
          // console.log(res.data);
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.tableData = [];
        });
    },
    //获取所有课程
    getAllCourse() {
      let suggests = [];
      this.$api.course.course.findAllCourse().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allCourse = suggests;
      });
    },
    handleCourseSelect(item) {
      this.addInstanceInform.course = item;
      // console.log(item);
    },
    // 课程实例
    chandgeAddInstanceVisible() {
      // this.addInstanceInform = {
      //   avatar: null,
      // };
      this.addInstanceDialogVisible = !this.addInstanceDialogVisible;
    },
    // 关闭表单 清空表单项
    closeAddInstanceVisible() {
      this.addInstanceInform = {
        image: null,
      };
      this.program = false;
      this.addInstanceDialogVisible = !this.addInstanceDialogVisible;
    },
    // 封面上传
    beforeImageUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAddImageSuccess(res, file) {
      // this.addInstanceInform.avatar = URL.createObjectURL(file.raw);
      console.log("上传成功的回调", res);
      this.addInstanceInform.image = res.data;
      // console.log(this.addInstanceInform.image);
    },
    handleEditImageSuccess(res, file) {
      // this.addInstanceInform.avatar = URL.createObjectURL(file.raw);
      console.log("上传成功的回调", res);
      this.editInstanceForm.image = res.data;
      // console.log(this.addInstanceInform.image);
    },
    findAllTeachingType() {
      let suggests = [];
      this.$api.metadata.type.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allTeachingType = suggests;
      });
    },
    checkHoursOfWeek(rule, value, callback) {
      // console.log(value);
      if (!value) {
        callback();
      } 
      if (this.isInterger(value) && value > 0 ) {
          callback();
      }
      return callback(new Error("请输入大于0的整数"));
    },

    checkGrade(rule, value, callback) {
      // console.log(value);
      if (!value) {
        callback();
      } 
      if (value%0.5 ==0 && value > 0) {
          callback(); 
      }
      return callback(new Error("请输入0.5的倍数"));
    },

    submitAddInstance() {
      this.$refs['addInstanceInform'].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.addInstanceInform);
            this.$api.course.cinstance.add(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                // console.log(res.data);
                let cid = res.data;
                this.submitLanguage(cid);
                this.$message({
                  message: "申请成功,等待审核中···",
                  type: "success",
                });
                this.chandgeAddInstanceVisible();
                this.addCourseInform = [];
                this.getAllInstance();
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },

    // 增加课程
    chandgeAddCourseVisible() {
      this.addCourseDialogVisible = !this.addCourseDialogVisible;
    },
    closeAddCourseVisible() {
    this.addCourseDialogVisible = false;
    this.addCourseInform = {};
    },
    submitAddCourse() {
      this.$refs['courseForm'].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.addCourseInform);
            this.$api.course.course.add(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.$message({
                  message: "申请成功,等待审核中···",
                  type: "success",
                });
                this.closeAddCourseVisible();
                this.chandgeAddCourseVisible();
                this.closeAddInstanceVisible();
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },
    // 课程层次 本科等
    findAllLevel() {
      let suggests = [];
      this.$api.metadata.level.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allLevel = suggests;
      });
    },
    // 课程方向 人工智能等
    findAllDirection() {
      let suggests = [];
      this.$api.metadata.direction.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allDirection = suggests;
      });
    },
    // 课程要求（必修等）
    findAllRequirement() {
      let suggests = [];
      this.$api.metadata.require.findAll().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.ALLRequirement = suggests;
      });
    },
    findAllLanguage() {
      console.log("in");
      let suggests = [];
      this.$api.course.language.findAllLanguage().then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        // console.log(suggests);
        this.allLanguage = suggests;
      });
    },

    handleSelectIsProgram(item) {
      // console.log(this.addInstanceInform.isProgram);
      console.log(item);
      if(item == "1") {
        this.program = false;
      } else {
        this.program = true;
      }
    },
    handleSelectLanguage(value) {
      // console.log(value);
      this.langlist = value;
      // console.log(this.langlist);
      
    },
    // 回显用
    findLanguageByCid(cid){
      this.$api.course.language.findCinstanceLanguage({cid: cid}).then((res) => {
      let data = res.data
      let list = [];
      for (let index = 0; index < data.length; index++) {
        list.push(data[index].id)
      };
      // console.log(list);
      this.langlist = list;
      })
    },
    submitLanguage(cid) {
      let list = [];
      for (let index = 0; index < this.langlist.length; index++) {
        list.push({cinstanceId: cid, languageId: this.langlist[index]})
      };
      // console.log(list);
      this.$api.course.language.addCinstanceLanguage(list).then((res) => {
      })
    
    },
    // 删除未审核的课程实例
    handleDelete(item) {
      this.$confirm("确认删除吗？", "提示", {}).then(() => {
        this.editLoading = true;
        this.$api.course.cinstance.del({id:item.id}).then((res) => {
          this.editLoading = false;
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getAllInstance();
          } else {
            this.$message({
              message: "操作失败, " + res.msg,
              type: "error",
            });
          }
        });
      });

    },

    // 编辑课程实例
    chandgeEditInstanceVisible(item) {
      // console.log(item.id);
      this.findLanguageByCid(item.id);
      this.editInstanceForm = JSON.parse(JSON.stringify(item));
      this.editInstanceDialogVisible = true;
    },
    closeEditInstanceForm() {
      this.editInstanceForm = {};
      this.langlist = [];
      this.editInstanceDialogVisible = false;
    },

    submitEditInstance() {
      // console.log(this.editInstanceForm);
      this.$refs['editInstanceForm'].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.editInstanceForm);
            this.$api.course.cinstance.updateInstance(params).then((res) => {
              this.editLoading = false;
              if (this.editInstanceForm.isProgram == 1) {
                this.submitLanguage(this.editInstanceForm.id);
              }
              if (res.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.getAllInstance();
                this.closeEditInstanceForm();
              } else {
                this.$message({
                  message: "修改失败, " + res.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },

    handleInto(item) {
      // console.log(item);
      let path = "/course"
      let id = item.id
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      })
    },
  }
};
</script>
<style >
.box-card {
  width: 300px;
  height: 100%;
  margin-right: 50px;
  margin-bottom: 30px;
  border-radius: 4px;
  float: left;
}

.card-header {
  padding: 5px;
  overflow: hidden;
}

.card-body {
  width: 100%;
  overflow: hidden;
}

.card-footer {
  padding: 0px;
  overflow: hidden;
  float: right;
}

.el-input-text {
  width: 65%;
}

.details-lable {
  font-style: normal;
  color: #3d3838;
  font: bolder;
  margin: 2px;
  height: 20px;
}
.details-content {
  font-style: normal;
  color: #000000;
  margin: 2px;
}

.time {
  font-style: normal;
  font: bolder;
  margin: 2px;
  /* font-size: 13px; */
  color: #999;
}

.el-form-item label:after {
        content: "";
        display: inline-block;
        width: 100%;
}
.el-form-item__label {
        text-align: justify;
        height: 50px;
}
    



</style>