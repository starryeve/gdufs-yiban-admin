<template>
  <div class="vid-wrap">
    <div class="vid-header">
      <div class="left">上传</div>
      <div class="right"
           @click="goBack"
           style="cursor:pointer">返回</div>
    </div>
    <el-form class="form"
             label-width="auto">
      <el-form-item title="title"
                    label="视频标题">
        <el-input v-model="form.title"
                  placeholder="请输入视频标题"></el-input>
      </el-form-item>
      <el-form-item label="视频简介"
                    placeholder="请输入视频简介">
        <wang-editor v-model="form.intro"></wang-editor>
      </el-form-item>
      <el-form-item title="poster"
                    label="视频封面">
        <my-upload :file-list="poster"
                   :on-change="handlePosterChange"
                   :accept="'.jpeg,.jpg,.png'"
                   :tip="'上传封面仅支持扩展名.jpeg, .jpg, 或.png, 且大小不超过 10 M' "
                   :size='10'>
          <template slot="my-file__area">
            <el-image class="poster"
                      v-if="form.posterUrl"
                      :src="form.posterUrl"></el-image>
            <div v-else
                 class="poster-bg"></div>
          </template>
          <template slot="my-upload__area">
            <div class="vid-btn">
              上传
            </div>
          </template>
        </my-upload>
      </el-form-item>
      <el-form-item title="video"
                    label="视频内容">
        <my-upload :file-list="video"
                   :on-change="handleVideoChange"
                   :accept="'.mp4'"
                   :tip="'上传视频仅支持扩展名.mp4, 且大小不超过 60 G' "
                   :size='61440'>
          <template slot="my-file__area">
            <video class="video"
                   v-if="form.videoUrl"
                   controls="controls"
                   :src="form.videoUrl">
            </video>
            <div v-else
                 class="video-bg"></div>
          </template>
          <template slot="my-upload__area">
            <div class="vid-btn">
              上传
            </div>
          </template>
        </my-upload>
      </el-form-item>
      <el-form-item label="">
        <div class="form-btns">
          <el-button @click="addVideo">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>

import TcVod from 'vod-js-sdk-v6'
import WangEditor from '../components/WangEditor.vue'
import MyUpload from '../components/MyUpload.vue';
import { requiredValidator } from '../utils/validate';
export default {
  components: {
    WangEditor,
    MyUpload
  },
  data () {
    return {
      form: {
        intro: '上传视频测试01__简介',
        title: '上传视频测试01',
        video: '',
        poster: '',
        videoUrl: '',
        posterUrl: '',
        fileId: ''
      },
      uploader: null,
      video: [],
      poster: [],
      signature: ''
    }

  },
  methods: {

    async getSignature () {
      try {
        const { data: { data: { sign } } } = await this.$http({
          method: 'get',
          url: '/getSign'
        })
        console.log(sign);
        this.$loading.startLoading()
        return sign
      } catch (err) {
        console.log(err);
      }
    },
    handlePosterChange (fileList) {
      this.poster = [...fileList]

      if (this.poster[0]) {
        this.form.poster = this.poster[0]
        this.form.posterUrl = this.poster[0].url
      } else {
        this.form.poster = this.form.posterUrl = ''
      }
    },
    handleVideoChange (fileList) {
      console.log('videoList', fileList);
      this.video = [...fileList]
      if (this.video[0]) {
        this.form.videoUrl = ''
        this.form.video = this.video[0]
        this.form.videoUrl = this.video[0].url
      } else {
        this.form.video = this.form.videoUrl = ''
      }
    },

    async uploadVideo () {

      this.$loading.startLoading()
      return new Promise((resolve, reject) => {
        const tcVod = new TcVod({
          getSignature: this.getSignature
        })
        this.upload = tcVod.upload({
          mediaFile: this.form.video,
        })

        this.upload.on('media_progress', (info) => {

          const percent = parseFloat(info.percent).toFixed(2) * 100;
          console.log(percent);
        })

        this.upload.done().then((res) => {
          const { fileId } = res


          this.form.fileId = fileId
          this.$loading.endLoading()
          resolve(res)
        }).catch((err) => {
          this.$loading.endLoading()
          reject(err)

        })
      })


    },


    async addVideo () {
      if (!requiredValidator(this.form, ['fileId'])) {
        return this.$message.error('请检查是否填写完整')
      }
      this.$dialog({
        title: '上传视频',
        message: '请确认上述视频和信息无误'
      }).then(async () => {

        try {
          const res1 = await this.uploadVideo()
          console.log(res1);
          this.$loading.endLoading()
          const formData = new FormData()
          formData.append('title', this.form.title)
          formData.append('cover', this.form.poster)
          formData.append('fileId', this.form.fileId)
          formData.append('brief', this.form.intro)


          const { data: { data, status } } = await this.$http({
            url: '/addNewVideo',
            method: 'post',
            data: formData
          })
          if (status === 1) {
            this.$message.success('上传成功！')
            setTimeout(() => {
              this.$router.push('/video')
            }, 2000)
          }

        } catch (err) {
          console.log(err);
          return this.$message.error('上传失败')
        }

      })

    },

    goBack () {
      this.$router.push('/video')
    }

  },
  mounted () {

  }
}
</script>

<style lang="less" >
  .vid-wrap {
    letter-spacing: 2px;
    margin: 0 auto;
    width: 861px;
    .vid-header {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      .left {
        font-weight: 600;
        font-size: 24px;
      }
      .right {
        font-size: 18px;
        color: #5997fd;
      }
    }
  }
  .form {
    .el-form-item__label {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #000;
    }
    .el-upload {
      width: 100%;
      height: 440px;
      .el-upload-dragger {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    .form-btns {
      text-align: center;
      .el-button {
        width: 100px;
        height: 40px;
      }
    }
    .video,
    .poster {
      height: 440px;
      width: 770px;
    }

    .poster-bg,
    .video-bg {
      height: 440px;
      width: 770px;
      background-color: #5997fd;
    }

    .vid-btn {
      color: #5997fd;
      font-size: 18px;
      cursor: pointer;
    }
    .vid-btn:hover,
    .vid-btn:focus {
      opacity: 0.8;
    }
  }
</style>