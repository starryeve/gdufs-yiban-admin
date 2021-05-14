<template>
  <div class="box">
    <div class="top">
      <span><img src="../assets/img/logo.png"
             alt=""></span>
      <div class="title">
        <div class="zn">广东外语外贸大学易班</div>
        <div class="en">“九个易”影像工作坊</div>
      </div>
    </div>
    <div class="nav">
      <el-menu :default-active="activeIndex"
               :router="true"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect">
        <el-menu-item index="/intro">工作室简介</el-menu-item>
        <el-menu-item index="/video">精彩视频管理</el-menu-item>
        <!-- <el-menu-item index="/activity">特色活动管理</el-menu-item> -->
      </el-menu>
    </div>
    <div class="main">
      <!-- 路由占位符 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    logout () {
      //清除token
      window.sessionStorage.clear();
      //跳转
      this.$router.push('/login')
    },

  }
}
</script>

<style lang="less" scoped>
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .top {
    height: 100px;
    padding: 20px 0px;
    background-image: url('../assets/img/bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    color: white;
    justify-content: flex-start;
    align-items: center;
    padding: 0 5%;
    letter-spacing: 5px;
    .title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      transform: translateX(20px);
      > .zn {
        font-size: 22px;
        padding: 0px;
        line-height: 1.5;
      }
      > .en {
        font-size: 14px;
        line-height: 1.5;
      }
    }
    img {
      width: 64px;
      height: 64px;
      line-height: 64px;
      font-size: 18px;
    }
  }

  .main {
    height: 100%;
  }
  .nav {
    display: flex;
    justify-content: center;
  }
</style>