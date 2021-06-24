<template>
  <div class="my-progress">
    <vue-awesome-progress :circle-width="4"
                          :line-width="8"
                          :duration="0.6"
                          :font-size="24"
                          :percentage="percent"
                          :circle-radius="80"
                          use-gradient
                          fontColor="#5997FD" />
    <!-- <div class="btns__wrapper">
      <button @click="decrease">-</button>
      <button @click="increase">+</button>
    </div> -->
  </div>
</template>

<script>
import VueAwesomeProgress from "vue-awesome-progress"
export default {
  name: "MyProgress",
  components: {
    VueAwesomeProgress
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },

  computed: {
    // 格式化文字
    formatPeople (percentage) {
      return Math.round(percentage) + '%'
    }
  },
  methods: {


    // 修改进度条的进度，只需要修改绑定的percentage属性的值即可
    increase () {
      this.percent += 10;
      if (this.percent > 100) {
        this.percent = 100;
      }
    },
    decrease () {
      this.percent -= 10;
      if (this.percent < 0) {
        this.percent = 0;
      }
    }
  }
}
</script>

<style lang="less">
  .my-progress {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3000;
    background-color: rgb(0 0 0 / 70%);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }
</style>