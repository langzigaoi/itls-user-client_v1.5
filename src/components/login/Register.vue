<template>
  <div>
    <!-- 注册框 -->
    <div class="registerbar">
      <form
        class="registerform"
      >
        <h2 class="title" style="padding-left: 22px">用户注册</h2>
        <p>
          <span>姓名</span
          ><el-input v-model="name" placeholder="请输入姓名"></el-input>
        </p>
        <br />
        <p>
          <span>学号</span
          ><el-input v-model="no" placeholder="请输入职工号"></el-input>
        </p>
        <br />
        <p>
          <span>密码</span
          ><el-input
            type="password"
            v-model="password"
            placeholder="请输入密码"
          ></el-input>
        </p>
        <br />
        <p>
          <span>手机号</span
          ><el-input v-model="telephone" placeholder="请输入手机号"></el-input>
        </p>
        <br />
        <p>
          <span>身份</span>
          <el-select v-model="identity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
        <br />
        <!-- <p>
                    <span>验证码</span
                    ><el-input
                        v-model="identity"
                        style="width: 40%"
                        placeholder="请输入验证码"
                    ></el-input
                    >&nbsp;
                    <img
                        style="width: 120px; height: 40px"
                        class="pointer"
                        :src="identitysrc"
                        @click="refreshCaptcha"
                    />
                </p> -->
        <p>
          <el-button type="primary" @click="register()" style="width: 48%"
            >注册</el-button
          >
          <el-col :span="10">
            <router-link
              style="color: #14889a; text-decoration: underline"
              to="/login"
              >去登录</router-link
            >
          </el-col>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      name: null,
      no: null,
      password: null,
      telephone: null,
      role: null,
      identity: "",
      identitysrc: "",
      options: [
        {
          value: "1",
          label: "学生",
        },
        {
          value: "2",
          label: "教师",
        },
      ],
    };
  },
  methods: {
    //获取验证码
    refreshCaptcha: function () {
      this.$api.user.login.captcha().then((res) => {
        this.identitysrc = res.data;

        // 测试用
        this.identity = res.msg;
      });
    },
  
    register() {
      if (!this.name || !this.no || !this.telephone || !this.password) {
        this.warnMsg("请填写完整");
        return;
      }
      const telreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!telreg.test(this.telephone)) {
        this.warnMsg("手机号有误");
        return;
      }
      let data = {
        name: this.name,
        no: this.no,
        password: this.password,
        telNum: this.telephone,
        // type: this.role, //用户类型：0 管理员 1 教师 2 学生
        identity: this.identity,
      };
      //  let data = `?name= ${this.name}
      //         &no=${this.no}
      //         &password= ${this.password}
      //         &telNum=${this.telephone}
      //         &identity=${this.role}`
      this.$api.user.login.register(data).then((res) => {
        this.$message(res.msg);
        this.$router.push("/login");
      });
    },
    _isMobile() {
      //判断是手机还是PC
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>
<style >
.registerbar {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 450px;
  /* padding: 35px 35px 15px 35px; */
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.el-link.el-link--primary:hover {
  color: #fff;
}

.el-link.el-link--primary {
  color: #14889a;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    /* padding: 0 10 0 15px; */
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.el-input--suffix .el-input__inner {
    padding-right: 0px;
}
.titledivreg {
  margin: 12vh 0 8vh 0;
}
.registerform {
  border-radius: 10px 10px 0 0;
  /* background-color: #defcf9; */
  width: 100%;
  margin: 0 auto;
  padding: 20px 0px 30px 0px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.registerform p {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: left; /**左对齐 */
}
/* 注册按钮那一行 */
.registerform p:last-child {
  position: relative;
  align-items: flex-end;
  margin-left: 22%;
}

.registerform p span {
  min-width: 80px;
}
</style>