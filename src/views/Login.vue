<template>
  <div class="login_container">
    <div class="left">
      <img src="../assets/img/login.png"
           alt="" />
    </div>
    <div class="right">
      <div class="title">
        <p>广东外语外贸大学易班</p>
        <p>管理端</p>
      </div>
      <el-form ref="form"
               class="form"
               :model="loginForm"
               :rules="loginFormRules"
               aria-required="false"
               @keyup.enter.native="login">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    type="password"
                    placeholder=密码></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button class="btn"
                     type="primary"
                     @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login () {
      this.$refs.form.validate(async (valid) => {

        if (!valid) return;
        try {
          const { data: { status, data } }
            = await this.$http.post(
              "/login",
              this.loginForm
            );
          if (status !== 1) {
            return this.$message.error("账号或密码错误");
          }
          window.sessionStorage.setItem("token", data.token);
          this.$router.push("/index");
          this.$message.success("登录成功");
        } catch (err) {
          console.log(err);
          return this.$message.error('网站错误')
        }



      });
    },
  },
};
</script>

<style lang="less">
  .login_container {
    // background-color: antiquewhite;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 440px;
      width: 400px;
    }

    .right {
      padding: 0 50px;
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 20px;
        p {
          text-align: center;
          font-size: 30px;
          color: #5997fd;
          margin: 10px 0px;
        }
        .form {
          display: flex;
          justify-content: center;
        }
      }
    }

    .btns {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      .btn {
        width: 120px;

        border-radius: 10px;
        letter-spacing: 3px;
        font-size: 18px;
      }
    }
  }
</style>