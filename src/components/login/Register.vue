<template>
    <div>
        <!-- 注册框 -->
        <div class="registerbar">
            <div class="titledivreg">
                <p class="TitleBig">程 序 设 计 智 能 教 学 系 统</p>
            </div>
            <form class="registerform" :style="!this._isMobile() ? 'width:40%' : 'width:80%'">
                 <div style="border-bottom:2px solid #ccc;" class="titleMiddle">注册</div><br /><br /><br />
                <p><span>姓名</span><el-input v-model="name" placeholder="请输入姓名"></el-input></p><br />
                <p><span>学号</span><el-input v-model="no" placeholder="请输入职工号"></el-input></p><br />
                <p><span>密码</span><el-input type="password" v-model="password" placeholder="请输入密码"></el-input></p><br />
                <p><span>手机号</span><el-input v-model="telephone" placeholder="请输入手机号"></el-input></p><br />
                <p><span>身份</span>
                  <el-select v-model="role" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                 </el-select>
                </p><br />
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
                <p><el-button type="primary" @click="register()" style="cursor: pointer;color: #fff;background-size: 200%;width:60%;background-image:linear-gradient(120deg,#4834d4,#7ed6df,#4834d4);transition: .5s;" >注册</el-button>
                    <router-link style="position: absolute;bottom: 0;right:0" to="/login">去登录</router-link></p>
            </form>

            
            
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name:null,
            no:null,
            password:null,
            telephone:null,
            role:null,
            identity:'',
            identitysrc:'',
            options: [{
                value: '1',
                label: '教师'
                }, {
                value: '2',
                label: '学生'
                }],
        }
    },
    methods:{
        //获取验证码
        refreshCaptcha: function () {
        this.$api.user.login.captcha().then((res) => {
            this.identitysrc = res.data;

            // 测试用
            this.identity = res.msg;
            })
        },
        register(){
          if(!this.name || !this.no || !this.telephone || !this.password ){
              this.warnMsg('请填写完整')
              return;
          }
          const telreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
          if (!telreg.test(this.telephone)) {
              this.warnMsg('手机号有误')
              return;
          }
        //   let data = {
        //         name: this.name,
        //         no: this.no,
        //         password: this.password,
        //         telNum: this.telephone,
        //         // type: this.role, //用户类型：0 管理员 1 教师 2 学生
        //         identity:this.identity
        //     }
         let data = `?name= ${this.name}
                &no=${this.no}
                &password= ${this.password}
                &telNum=${this.telephone}
                &identity=${this.role}`
          this.$api.user.login.register(data).then((res) => {
              this.$message(res.msg);
              this.$router.push('/login');
          });          
        },
        _isMobile() { //判断是手机还是PC
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        }
        
        

    }
}
</script>
<style >
.registerbar {
    background-image: linear-gradient(to bottom right, blue , yellow);  
    /* background-color: #9966CC; */
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;  
    width: 100%;
    height: 100vh;
}  

.titledivreg {
    margin: 12vh 0 8vh 0;
   
}   
.registerform {
       border-radius: 10px 10px 0 0 ;
    background-color: #defcf9;
    width: 40%;
    margin: 0 auto;
    padding: 10px 0; 
    
}
.registerform p  {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items:center;
    justify-content:left ;  /**左对齐 */
}
/* 注册按钮那一行 */
.registerform p:last-child  {
    position: relative;
    align-items:flex-end;
    justify-content:center ;  /**左对齐 */
}

.registerform p span{
    min-width: 80px;
}


</style>