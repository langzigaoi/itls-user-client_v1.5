<template>
  <el-container>
    <span class="tool-bar"> </span>
    
    
    <el-main class="main">
    
      <el-row>
        <el-col :span="5">
          <div>
            <el-avatar :size="120" :src="info.avatar"></el-avatar>
          </div>

          <!-- <el-row type="flex" align="middle" justify="center">
            <div>
              
              <span>{{ info.name }}</span>
            </div>
          </el-row> -->
        </el-col>

        <el-col :span="7">
          <el-row type="flex" class="el-row-margin">
            <div>
              <span>姓名</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.name }}</span>
            </div>
          </el-row>

          <!-- <el-row>
            <div>
              <span>工号</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.no }}</span>
            </div>
          </el-row> -->

          <el-row type="flex" class="el-row-margin">
            <div>
              <span>昵称</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.nickName }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>性别</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.sex }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>出生日期</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.birthday }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>入学时间</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.entranceYear }}</span>
            </div>
          </el-row>

          <div style="float: left">
            <el-button
              size="mini"
              type="primary"
              @click="handleInfoFormVisible"
            >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handlePasswdVisible"
            >修改密码
            </el-button>
          </div>
        </el-col>

        <el-col :span="12">
          <el-row class="el-row-margin">
            <div>
              <span>学号</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.no }}</span>
            </div>
          </el-row>

          <!-- <el-row class="el-row-margin">
            <div>
              <span>职称</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.titleName }}</span>
            </div>
          </el-row> -->

          <el-row class="el-row-margin">
            <div>
              <span>电话</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.telNum }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>邮箱</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.email }}</span>
            </div>
          </el-row>

          <el-row class="el-row-margin">
            <div>
              <span>简介</span>
              <el-divider direction="vertical"></el-divider>
              <span>{{ info.intro }}</span>
            </div>
          </el-row>
        </el-col>
        <!-- <el-col :span="4"> </el-col> -->
      </el-row>
    </el-main>

    <el-dialog
      width="80%"
      title=""
      ref="editInfoFrom"
      :visible.sync="editInfoFormVisible"
      destroy-on-close
    >
      <el-form ref="infoForm" :model="infoForm" :rules="infoFormRules">
        <el-row>
          <el-col :span="5">
            <div>
              <el-upload
                class="avatar-uploader"
                :action="uploadimgurl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                name="image"
                with-credentials
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="infoForm.avatar"
                  :src="infoForm.avatar"
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
            <!-- <el-row type="flex" align="middle" justify="center">
              <div>
                <span>{{ infoForm.name }}</span>
              </div>
            </el-row> -->
            
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" label-width="70px">
              <el-row type="flex">
                <div>
                  <el-input
                    :disabled="true"
                    v-model="infoForm.name"
                    placeholder="请输入姓名"
                  ></el-input>
                </div>
              </el-row>
            </el-form-item>
            <!-- <el-form-item label="工号" label-width="70px">
            <el-row>
              <div>
                <el-input :disabled="true" v-model="infoForm.no"></el-input>
              </div>
            </el-row>
          </el-form-item> -->
            <el-form-item label="昵称" label-width="70px">
              <el-row type="flex" style="el-row">
                <div>
                  <el-input
                    v-model="infoForm.nickName"
                    placeholder="请输入昵称"
                  ></el-input>
                </div>
              </el-row>
            </el-form-item>

            <el-form-item label="性别" label-width="70px">
              <el-row>
                <div>
                  <el-select
                    size="small"
                    v-model="infoForm.sex"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-row>
            </el-form-item>

            <el-form-item label="出生日期" label-width="70px">
              <el-row type="flex">
                <el-date-picker
                  align="left"
                  style="width: 205px"
                  v-model="infoForm.birthday"
                  
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-row>
            </el-form-item>

            <el-form-item label="入学时间">
              <el-row>
                <el-date-picker
                  align="left"
                  style="width: 205px"
                  v-model="infoForm.entranceYear"
                  
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-row>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号">
              <el-row type="flex">
                <div>
                  <el-input :disabled="true" v-model="infoForm.no"></el-input>
                </div>
              </el-row>
            </el-form-item>

            <!-- <el-form-item label="职称">
              <el-row>
                <el-select
                  size="small"
                  v-model="infoForm.titleName"
                  placeholder="请选择"
                  @change="handleTitleSelect"
                >
                  <el-option
                    v-for="item in allTitle"
                    :key="item.value"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item> -->

            <el-form-item label="电话" prop="telNum">
              <el-row>
                <div>
                  <el-input
                    v-model="infoForm.telNum"
                    placeholder="请输入电话"
                  ></el-input>
                </div>
              </el-row>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-row>
                <div>
                  <el-input
                    v-model="infoForm.email"
                    placeholder="请输入邮箱"
                  ></el-input>
                </div>
              </el-row>
            </el-form-item>

            <el-form-item label="简介">
              <el-row>
                <div>
                  <el-input
                    class="el-input-text"
                    width="520px"
                    maxlength="30"
                    show-word-limit
                    type="textarea"
                    :rows="3"
                    v-model="infoForm.intro"
                    placeholder="请输入个人简介"
                  ></el-input>
                </div>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <!-- <el-row type="flex" align="bottom" justify="end"> -->
          <el-button
            size="mini"
            @click="handleInfoFormVisible"
          >取消
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="submitInfoForm"
          >确定
          </el-button>
          <!-- </el-row> -->
        </div>
      </el-form>
    </el-dialog>

    <el-dialog title="修改密码" width="40%" :visible.sync="editPasswdVisible" :close-on-click-modal="false" 
    :modal="false" align="center" 
     >
      <el-form :model="updatePwdDataForm" label-width="100px"  style="width:60% "  :rules="updatePwdDataFormRules" ref="updatePwdDataForm" >
        <el-form-item label="原密码" prop="password" >
          <el-input v-model="updatePwdDataForm.password" type="password" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="updatePwdDataForm.newPassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="comfirmPassword">
          <el-input v-model="updatePwdDataForm.comfirmPassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      
      <div>
          <!-- <el-row type="flex" align="bottom" justify="end"> -->
          <el-button
            size="mini"
            @click="handlePasswdVisible"
          >取消
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="submitPasswdForm"
          >确定
          </el-button>
          <!-- </el-row> -->
        </div>
    </el-dialog>

   
  </el-container>


</template>
<script>
import {time, isEmail, isMobile} from "@/utils/global-functions"
import { baseUrl, avatarUrl } from "@/utils/global";
export default {
  data() {
    return {
      info: [],
      infoForm: [],
      sexOptions: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      // 编辑页面显示标记
      editInfoFormVisible: false,
      allTitle: [],
      // 时间选择器
      pickerOptions: {
        disabledDate(time) {},
      },
      // 上传路径
      uploadimgurl: "",
      defaultAvatar: "",

      infoFormRules: {
        telNum: [{ validator: this.checkTel, trigger: "blur" }],
        email: [{ validator: this.checkEmail, trigger: "blur" }],
      },
      editPasswdVisible: false,
      updatePwdDataForm: {
        	password: '',
				  newPassword: '',
			  	comfirmPassword: ''
      },
      updatePwdDataFormRules: {
				password: [
					{ required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
					{ required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        comfirmPassword: [
					{ required: true, message: '请确认密码', trigger: 'blur' }
				]
			},
    
      
    };
  },

  methods: {
    // 时间格式化
    dateFormat: function (date) {
      return this.time(date);
    },
    getInfo() {
      this.$api.user.selfCenter.getUsrUser().then((res) => {
        console.log(res);
        // 时间处理
        res.data.birthday = this.dateFormat(res.data.birthday);
        res.data.entranceYear = this.dateFormat(res.data.entranceYear);
        // 设置默认头像
        if (res.data.avatar == '' || res.data.avatar == null|| res.data.avatar == undefined ) {
          res.data.avatar = this.defaultAvatar;
          }

        this.info = JSON.parse(JSON.stringify(res.data));
        if (res.code == 200) this.loading = false;
        this.infoForm = JSON.parse(JSON.stringify(this.info));
        console.log(this.info);
        if (res.code == 200) this.loading = false;
      });
    },

    // 编辑
    submitInfoForm: function () {
      console.log(654654);
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.infoForm);
           
            this.$api.user.selfCenter.save(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.getInfo();
                this.$message({ message: "操作成功", type: "success" });
                this.handleInfoFormVisible();
                this.$refs["infoForm"].resetFields();
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

    handleInfoFormVisible() {
      this.editInfoFormVisible = !this.editInfoFormVisible;
    },

    findAllTitle() {
      let suggests = [];
      this.$api.metadata.title.findAll().then((res) => {
        console.log(res);
        for (let index = 0; index < res.data.length; index++) {
          suggests.push({
            value: res.data[index].name,
            id: res.data[index].id,
          });
        }
        this.allTitle = suggests;
      });
    },

    handleAvatarSuccess(res, file) {
      console.log("上传成功的回调", res);
      this.infoForm.avatar = res.data;
      console.log(this.infoForm);
    },

    handleTitleSelect(item) {
      this.infoForm.title = item;
      console.log(item);
    },

    handleAvatarSuccess(res, file) {
      console.log("上传成功的回调", res);
      this.infoForm.avatar = res.data;
      console.log(this.infoForm);
    },
    beforeAvatarUpload(file) {
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

     checkTel(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        // console.log(isMobile(value));
        if (this.isMobile(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
          // console.log(888);
        }
      }
    },
    checkEmail(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        // console.log(isEmail(value));
        if (this.isEmail(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的邮箱"));
          // console.log(888);
        }
      }
    },

    handlePasswdVisible() {
      this.editPasswdVisible = !this.editPasswdVisible;
    },

    submitPasswdForm() {
			this.$refs.updatePwdDataForm.validate((valid) => {
				if (valid) {
          if(this.updatePwdDataForm.newPassword != this.updatePwdDataForm.comfirmPassword) {
            this.$message({message: '新密码与确认新密码不一致', type: 'error'})
            return
          }
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.updatePwdLoading = true
						let params = {password:this.updatePwdDataForm.password, newPassword:this.updatePwdDataForm.newPassword}
						this.$api.user.selfCenter.updatePassword(params).then((res) => {
							this.updatePwdLoading = false
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
                this.$refs['updatePwdDataForm'].resetFields()
							} 
              if (res.code == 400 ) {
                this.$message({message: '操作失败, ' + res.msg, type: 'error'})
							}
              this.handlePasswdVisible();

						})
					})
				}
			})
		},


   
  },
  mounted() {
    this.findAllTitle();
    this.defaultAvatar = `${avatarUrl}`;
    this.getInfo();
    this.uploadimgurl = `${baseUrl}/OssUpload/image`;
  },
};
</script>


<style scoped>
.main {
  margin-top: 100px;
}

.el-input-text {
  width: 108%;
}

.el-input {
  width: 100%;
}

.el-row {
  /* margin-bottom: 30px; */
  display: flex;
  flex-wrap: wrap;
}

.el-form-item {
  margin-bottom: 35px;
}
.el-form-item__error {
  text-align: center;
}
.el-row-margin {
  margin-bottom: 40px;
}
</style>