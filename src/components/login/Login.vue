<template>
  <div>
    <el-form
      :model="loginForm"
      :rules="fieldRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <span class="tool-bar"> </span>
      <h2 class="title" style="padding-left: 22px">系统登录</h2>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="loginForm.account"
          auto-complete="off"
          placeholder="学号/工号"
          prop="account"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
          prop="password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-col :span="12">
          <el-form-item>
            <el-input
              v-model="loginForm.captcha"
              placeholder="验证码, 单击图片刷新"
              style="width: 100%"
              prop="captch"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">&nbsp;</el-col>
        <el-col :span="11">
          <el-form-item>
            <img
              style="width: 120px; height: 40px"
              class="pointer"
              :src="loginForm.src"
              @click="refreshCaptcha"
            />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-checkbox v-model="checked" @change="isChecked"
            >记住密码</el-checkbox>
        </el-col>
        <el-col :span="12">
          <router-link
          style="color: #14889A; text-decoration: underline;"
          to="/register">去注册</router-link>
        </el-col>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 48%" @click="login()"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>


</template>
<script>
import verification from "../common/Verification";
export default {
  components: { verification },
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
        captcha: "",
        src: "",
      },
      fieldRules:{
        account: [{ required: true }],
        password: [{ required: true }],
        captcha: [{ required: true }],
      },

      verification: null,
      identifyCode: null,
      checked: localStorage.getItem("isChecked") === "true" ? true : false,
    };
  },
  mounted() {
    // 清空本地缓存的用户数据
    localStorage.setItem("uInfo", "");
    console.log(Boolean(localStorage.getItem("isChecked")));
    // console.log( + '---' + this.checked);
    // this.checked = ;
    this.refreshCaptcha();
    if (
      this.notEmptyN(localStorage.getItem("cn")) &&
      this.notEmptyN(localStorage.getItem("cb"))
    ) {
      this.loginForm.account = this.uncompile(localStorage.getItem("cn"));
      this.loginForm.password = this.uncompile(localStorage.getItem("cb"));
      // this.checked=true;
    }
  },
  methods: {
    isChecked(val) {
      console.log(val);
      localStorage.removeItem("isChecked");
      localStorage.setItem("isChecked", val);
      console.log(localStorage.getItem("isChecked"));
    },
    //获取验证码
    refreshCaptcha: function () {
      this.$api.user.login.captcha().then((res) => {
        this.loginForm.src = res.data;

        // 测试用
        // this.loginForm.captcha = res.msg;
      });
    },
    login() {
      if (!this.loginForm.account || !this.loginForm.password) {
        this.warnMsg("请填写完整");
        return;
      }
      let data = {
        account: this.loginForm.account,
        password: this.loginForm.password,
        captcha: this.loginForm.captcha,
      };
      this.$api.user.login.login(data).then((res) => {
        this.$message("登录成功！");
        if (this.checked) {
          localStorage.setItem("cn", this.compile(this.loginForm.account));
          localStorage.setItem("cb", this.compile(this.loginForm.password));
        } else {
          localStorage.removeItem("cn");
          localStorage.removeItem("cb");
        }
        this.$store.commit("recoverUserData", data);
        localStorage.setItem("uInfo", JSON.stringify(res.data));
        if(res.data.principal.identity == 1) {
          this.$router.push("/home/studentselfcenter");
        }
        this.$router.push("/home/teacherselfcenter");
      });
    },
    _isMobile() {
      //判断是手机还是PC
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    compile(code) {
      var c = String.fromCharCode(code.charCodeAt(0) + code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
      }
      return escape(c);
    },
    uncompile(code) {
      code = unescape(code);
      var c = String.fromCharCode(code.charCodeAt(0) - code.length);
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
      }
      return c;
    },
  },
};
</script>


<style >
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}

.el-button--primary {
  color: #fff;
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--primary:hover {
  background-color: #61b6c4;
  border-color: #61b6c4;
}
.el-button--primary:focus {
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--default:hover {
  color: #14889a;
  border-color: #14889a;
}
.el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input.is-focus .el-input__inner:focus {
  border-color: #14889a;
}
.el-select-dropdown__item.selected {
  color: #14889a;
  font-weight: 700;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #14889a;
  border-color: #14889a;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #14889a;
}
.loginbar {
  /* 颜色渐变 */
  background-image: linear-gradient(
    to bottom right,
    rgb(255, 255, 255),
    rgb(255, 255, 255)
  );
  /* background-color: #9966CC; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100vh;
}
.titlediv {
  margin: 12vh 0 8vh 0;
  /* position: relative; */
}
.loginform {
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  width: 40%;
  margin: 0 auto;
  padding: 10px 0;
  box-shadow: 0px 5px 10px #ccc;
}
.loginform p {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: left; /**左对齐 */
}
.captcha {
  width: 80%;
  display: flex;
  margin: 0 auto;
}

/* 登录按钮那一行 */
.loginform p:last-child {
  position: relative;
  align-items: flex-end;
  justify-content: center; /**左对齐 */
}
.loginform p span {
  min-width: 80px;
}
</style>
