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
        <video class="vid-player video"
               id="player-container-id"
               width="770"
               height="440">
        </video>
      </el-form-item>
      <el-form-item label="">
        <div class="form-btns">
          <el-button @click="modifyVideo">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>


import WangEditor from '../components/WangEditor.vue'
import MyUpload from '../components/MyUpload.vue';
import { requiredValidator } from '../utils/validate';
export default {
  name: 'ModifyVid',
  components: {
    WangEditor,
    MyUpload
  },
  data () {
    return {
      vid: this.$route.params.id,
      form: {
        intro: 'aaa',
        title: '111',

        poster: '',

        posterUrl: '',
        fileId: ''
      },
      player: '',
      video: [],
      poster: [],
      file: null,
      isUpload: false,
      percent: 0,
      uploader: null
    }

  },
  methods: {
    handlePosterChange (fileList) {
      this.poster = [...fileList]
      if (this.poster[0]) {
        this.form.poster = this.poster[0]
        this.form.posterUrl = this.poster[0].url
      } else {
        this.form.poster = this.form.posterUrl = ''
      }
    },



    async getVideo () {
      try {
        const { data: { status, data } } = await this.$http({
          url: '/getVideoById/' + this.vid
        })
        if (status === 1) {
          const { brief, cover, title, fileId, id } = data
          this.form.intro = brief
          this.form.posterUrl = cover
          this.form.title = title
          this.form.fileId = fileId
          this.form.id = id
        } else {
          return this.$message.error('获取数据失败')
        }

        const timer = setInterval(() => {
          console.log(document.readyState);
          if (document.readyState === "complete") {

            var player = new TCPlayer("player-container-id", {

              fileID: this.form.fileId,
              appID: '1301105414',

              autoplay: false,
              plugins: {
                ContinuePlay: {
                },
                ProgressMarker: true,
                ContextMenu: {
                  statistic: true,
                  levelSwitch: {
                    open: true,
                  }
                }
              }
            });
            this.player = player
            console.log('player:', player);
            window.clearInterval(timer);
          }
        }, 500);
      } catch (err) {
        console.log(err);
      }

    },

    async modifyVideo () {
      if (!requiredValidator(this.form, ['poster', 'posterUrl'])) {
        return this.$message.error('请检查是否有空字段')
      }
      this.$dialog({
        title: '修改视频文案',
        message: '请确定是否修改视频文案'
      }).then(async () => {
        const formData = new FormData()
        formData.append('title', this.form.title)

        formData.append('id', this.form.id)
        formData.append('brief', this.form.intro)
        if (this.form.poster) {
          formData.append('cover', this.form.poster)
          try {
            const { data: { status, data } } = await this.$http({
              url: '/modifyVideoWithImage',
              method: 'put',
              data: formData
            })
            if (status === 1) {

              this.$message.success('修改成功')
              setTimeout(() => {
                this.$router.go(0)
              }, 2000);

            } else {
              return this.$error.success('修改成功')
            }
          } catch (err) {
            console.log(err);
          }
          return
        }
        try {
          const { data: { status, data } } = await this.$http({
            url: '/modifyVideoWithoutImage',
            method: 'put',
            data: formData
          })
          if (status === 1) {
            this.$router.go(0)
            return this.$message.success('修改成功')
          } else {
            return this.$error.success('修改成功')
          }
        } catch (err) {
          console.log(err);
        }


      })

    },

    goBack () {
      this.$router.push('/video')
    }

  },
  mounted () {
    this.getVideo()
  },
  beforeDestroy () {
    this.player.dispose()
  },

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