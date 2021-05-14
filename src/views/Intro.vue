<template>
  <div class="intro-wrap">
    <el-form class="form"
             label-width="100px">
      <el-form-item title="title"
                    label="简介标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="详细内容">
        <wang-editor v-model="form.intro"></wang-editor>
      </el-form-item>
      <el-form-item label="">
        <div class="form-btns">
          <el-button @click="modifyIntro">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import WangEditor from '../components/WangEditor.vue'

export default {
  name: 'Intro',
  components: {
    WangEditor
  },
  data () {
    return {
      // option: {
      //   height: 400
      // },
      form: {
        title: '',
        intro: ''
      }

    }
  },
  methods: {
    async getIntro () {
      try {
        const { data: res } = await this.$http({
          method: 'get',
          url: '/intro'
        })
        if (res.status !== 1) return this.$message.error("获取失败");
        this.form.intro = res.data.info
        this.form.title = res.data.title

      } catch (err) {
        console.log(err);
      }
    },
    async modifyIntro () {

      this.$dialog({
        title: '修改工作室简介',
        message: '请确认是否修改工作室简介'
      }).then(async () => {
        console.log('是');
        try {
          const { data: { status, data } } = await this.$http({
            method: 'put',
            url: '/modifyIntro',
            data: {
              title: this.form.title,
              info: this.form.intro
            }
          })
          if (status === 1) {
            this.getIntro()
            return this.$message.success('修改成功')
          } else {
            return this.$message.error('修改成功')
          }
        } catch (err) {
          console.log(err);
        }
      }, () => {
        console.log('网络错误');
      })



    }

  }
  ,
  mounted () {
    this.getIntro()
  }
} 
</script>

<style lang="less">
  .intro-wrap {
    width: 870px;
    margin: 10px auto 0;
    .form-btns {
      text-align: center;
    }
  }
</style>
