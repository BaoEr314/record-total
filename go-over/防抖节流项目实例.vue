<template>
  <div class="login">
    <!-- <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles> -->
    <!-- 登录面板 -->
    <div class="login-box">
      <div class="login-box-title">后台管理系统</div>
      <div class="login-box-from">
        <!-- 测试 -->
        <div style="margin-bottom: 10px">
          <el-input v-model="inputVal"></el-input>
          <el-button type="primary" @click="getcode" v-if="codeShow"
            >获取验证码</el-button
          >
          <el-button type="primary" v-if="!codeShow"
            >{{ count }}秒后重试</el-button
          >
        </div>
        <el-form :model="form" :rules="rules" ref="form" class="demo-ruleform">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入登录账号"
              size="medium"
              ><el-button slot="prepend" icon="el-icon-user"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              show-password
              size="medium"
            >
              <el-button slot="prepend" icon="el-icon-key"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              style="width: 100%"
              @click="submitform('form')"
              >立即登录</el-button
            >
          </el-form-item>
          <el-form-item>
             <el-button
              type="primary"
              size="medium"
              style="width: 100%"
              @click="submit"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { local, debounce, debounced, throttle,throttled } from "@/utils/utils";
import { validatorPassword } from "../../utils/validator";
import { menudata } from "../../commondata/menu";
import { login } from "@/utils/api";
let timer = null;
export default {
  data() {
    return {
      loading: false, //登陆状态
      form: {
        // 登陆表单
        username: "",
        password: "",
      },
      rules: {
        //登陆验证规则
        username: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            // validator: validatorPassword,
            validator: "",
          },
        ],
      },
      timer: null,
      inputVal: "",
      codeShow: true,
      count: "",
      timer1: null,
      flag: true,
      timer2: "",
    };
  },
  watch: {
    // inputVal() {
    //   console.log("timer6666===", timer);
    //   if (timer) {
    //     clearTimeout(timer);
    //   }
    //   console.log("timer===", timer);
    //   timer = setTimeout(() => {
    //     console.log(this.inputVal);
    //   }, 5000);
    //   console.log("lasttimer===", timer);
    // },
    // wait时间后执行
    inputVal: debounce(function () {
      console.log("this.inputVal===", this.inputVal);
    }, 1000),
    //  先立即执行，再等wait秒
    // inputVal:(debounced(function(){
    //     console.log('this.inputVal===',this.inputVal)
    // },1000)),
  },
  methods: {
    getcode() {
      const TIME_COUNT = 10;
      if (!this.timer1) {
        this.codeShow = false;
        this.count = TIME_COUNT;
        // console.log("this.count===", this.count);
        this.timer1 = setInterval(() => {
          if (this.count > 0) {
            this.count--;
            // console.log("this.count111===", this.count);
          } else {
            this.codeShow = true;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
    },
    // 节流
    submit:throttle(function(){console.log('点击了===')},2000),
    // submit:throttled(function(){console.log('点击了===')},2000),
    submitform(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return;
        }
        // local.set("accessToken", "lsy");
        // local.set("menu", JSON.stringify(menudata));
        // this.$store.dispatch("addMenu", {
        //   menudata: menudata,
        //   router: this.$router,
        // });
        // this.$router.push("/");
        login({
          password: this.form.password,
          username: this.form.username,
        }).then(({ success, data, msg }) => {
          // console.log("data==", data);
          if (data) {
            local.set("accessToken", data.access_token);
            local.set("account", JSON.stringify(data));
            local.set("menu", JSON.stringify(menudata));
            // this.$store.dispatch('clearMenu_data')
            this.$store.dispatch("addMenu", {
              menudata: menudata,
              router: this.$router,
            });
            this.$router.push("/");
            // var obj = window.localStorage;
            // var size = obj.getItem("menu").length;
            // console.log("当前已用存储：" + (size / 1024).toFixed(2) + "KB");
          }
        });
      });
    },
  },
};
</script>
 
<style lang="stylus" scoped>
@import '../../assets/css/tool.styl';

.login {
  wh(100%, 100%);
  position: relative;

  .login-bg {
    wh(100%, 100%);
    background: #3E3E3E;
    background-image: url('../../assets/images/login.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .login-box {
    wh(350px, auto);
    background: hsla(0, 0%, 100%, 0.3);
    border-radius: 5px;
    box-shadow: 0 0 2px #f7f7f7;
    border: 1px solid #f7f7f7;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -175px;
    margin-top: -150px;

    .login-box-title {
      line-height: 50px;
      sc(20px, #ffffff);
      text-align: center;
      border-bottom: 1px solid #ffffff;
    }

    .login-box-from {
      wh(100%, auto);
      padding: 30px;
      box-sizing: border-box;
    }
  }
}
</style>