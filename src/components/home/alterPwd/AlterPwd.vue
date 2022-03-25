<template>
  <div>
    <el-form label-width="100px" style="margin:20px auto;width:40%;min-width:300px;" :model="ruleForm" status-icon
      :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item label="原密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model.number="ruleForm.newPass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkNewPass">
        <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updatePassword()">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入原密码'));
        } else {
          if (this.ruleForm.newPass != '') {
            this.$refs.ruleForm.validateField('newPass');
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm.checkNewPass != '') {
            this.$refs.ruleForm.validateField('checkNewPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          newPass: '',
          checkNewPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          checkNewPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      updatePassword() {
        this.$confirm('确定保存当前信息？')
          .then(_ => {
            this.$api.user.login.updatePassword({
              password: this.ruleForm.pass,
              newPassword: this.ruleForm.newPass
            }).then(res => {
              if (res.code == 200)
                this.$message.success("修改成功")
            })
          }).catch(_ => { });

      },
      reset() {
        this.ruleForm.pass = "";
        this.ruleForm.newPass = "";
        this.ruleForm.checkNewPass = "";
      }
    },
  }
</script>