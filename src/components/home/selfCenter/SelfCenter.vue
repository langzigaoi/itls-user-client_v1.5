<template>
  <div>
    <!-- {{userinfo}} -->
    <!-- <p>姓名:<span>{{userinfo.name}}</span></p>
        <p>手机号:<span></span>{{userinfo.telNum}}</p>
        <p>注册时间:<span>{{this.dateTimeFormate(new Date(userinfo.registerDate))}}</span></p>
        <p>isAdmin:<span>{{userinfo.isAdmin}}</span></p> -->
    <div class="infoForm" v-loading="loading">
      <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="100px" class="demo-infoForm">
        <el-form-item label="头像" prop="avatar">
          <!-- <el-avatar shape="square" :size="100" :src="infoForm.avatar"></el-avatar> -->
          <el-upload class="avatar-uploader" :action="uploadimgurl" :show-file-list="false"
            :on-success="handleAvatarSuccess" name="image" with-credentials :before-upload="beforeAvatarUpload">
            <img v-if="infoForm.avatar" :src="infoForm.avatar" style="max-width:200px" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon "
              style="min-width:100px;border:1px solid #ccc;min-height:100px;line-height:100px"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="infoForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="no">
          {{infoForm.no}}
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          {{infoForm.name}}
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="infoForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学年份" prop="entranceYear">
          <el-date-picker type="date" placeholder="选择入学日期" v-model="infoForm.entranceYear"></el-date-picker>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker type="date" placeholder="选择出生日期" v-model="infoForm.birthday"></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="专业" prop="majorId">
          <el-input v-model="infoForm.majorId"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classId">
          <el-input v-model="infoForm.classId"></el-input>
        </el-form-item> -->
        <el-form-item label="电话" prop="telNum">
          <el-input v-model="infoForm.telNum"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="infoForm.email"></el-input>
        </el-form-item>
        <!-- <el-form-item label="注册时间" prop="createDate">
          <p style="color: #999999;">{{this.dateFormate(new Date(infoForm.createTime))}}</p>
          <el-input v-model="infoForm.register_date" :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="个人简介" prop="intro">
          <el-input type="textarea" v-model="infoForm.intro"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm('infoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { baseUrl } from '@/utils/global'
  export default {
    data() {
      return {
        loading: true,
        uploadimgurl: '',
        infoForm: {
          /* nickName: '12346',
          no: '2001',
          name: '李四',
          sex: '男',
          entrance_year: '2016-09-01',
          birthday: '1999-12-12',
          major_id: '1',
          class_id: '1',
          tel_num: '12345678910',
          email: '123456789@qq.com',
          register_date: '2020-08-03',
          intro: '' */
        },
        rules: {
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          entrance_year: [
            { type: 'date', required: true, message: '请选择入学日期', trigger: 'change' }
          ],
          birthday: [
            { type: 'date', message: '请选择时间', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      getInfo() {
        this.$api.user.selfCenter.getUsrUser().then(res => {
          this.infoForm = res.data;
          if (res.code == 200)
            this.loading = false;
        })
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
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formName) {
        this.$confirm('确定保存当前信息？')
          .then(_ => {
            this.$api.user.selfCenter.save(this.infoForm).then(res => {
              if (res.code == 200) {
                this.$message.success("保存成功")
                this.getInfo();
              }
            })
          }).catch(_ => { });
      },
      resetForm() {
        this.getInfo();
      },
    },
    mounted() {
      this.getInfo();
      this.uploadimgurl = `${baseUrl}/OssUpload/image`
    },
  }
</script>

<style lang="scss" scoped>
  .el-input select{
    border-color: #14889a;
  }
  .infoForm .demo-infoForm {
    text-align: left;
    margin-top: 30px;
  }

  .infoForm .demo-infoForm .el-form-item {
    margin-bottom: 10px;
  }

  .infoForm .demo-infoForm .el-input {
    width: 15%;
    min-width: 150px;
  }

  .infoForm .demo-infoForm .el-input__inner {
    height: 30px;
  }

  .infoForm .demo-infoForm .el-select .el-input {
    width: 20%;
    min-width: 70px;
  }

  .infoForm .demo-infoForm .el-textarea {
    width: 40%;
    min-width: 150px;
  }

  .infoForm .demo-infoForm .el-date-editor {
    width: 15%;
  }

  .infoForm .demo-infoForm .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .infoForm .demo-infoForm .avatar-uploader .el-upload:hover {
    border-color: #14889a;
  }

  .infoForm .demo-infoForm .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .infoForm .demo-infoForm .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>