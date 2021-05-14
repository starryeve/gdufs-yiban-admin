
<template>
  <div class="my-upload-wrap">
    <slot name="my-file__area"></slot>
    <div class="my-upload__area"
         @click="clickButton"
         :class="{disabled: disabled}">
      <slot name="my-upload__area">点击上传</slot>
    </div>
    <div v-if="tipBox"
         class="my-upload__tip "
         :class="{disabled: disabled}"
         style="background: transparent !important">
      <slot name="my-upload__tip">{{ tip }}</slot>
    </div>
    <ul class="my-upload__list"
        v-if="fileListBox && fileList.length !== 0">
      <li class="my-upload__list--item"
          v-for="(item, index) in fileList"
          :key="item.name">
        <div class="my-upload__list--item-info clearfix">
          <div class="my-upload__list--item-name">
            <i class="file el-icon-document"></i>{{ item.name }}
          </div>
          <div class="my-upload__list--item-remove"
               style="font-size: 8px"
               @click="remove(index)">
            <i class="delete el-icon-close"></i>
            <i class="success el-icon-upload-success el-icon-circle-check"
               style="color:#67c23a"></i>
          </div>
        </div>
        <div class="my-upload__list--item-progress"
             v-if="progress">
          <span></span>
        </div>
      </li>
    </ul>
    <input ref="myUploadBtn"
           style="display:none"
           @change="addFile"
           :multiple="multiple"
           type="file"
           :name="name"
           :accept="accept" />
  </div>
</template>

<script>
export default {
  name: 'MyUpload',
  props: {
    name: String,
    accept: {
      // 允许文件类型
      type: String,
      default: ''
    },
    tip: {
      // 上传提示
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 1024 * 10
    },
    fileList: {
      // 文件列表，无论是单文件还是多文件都使用数组存放
      type: Array
    },
    disabled: {
      // 上传提示
      type: Boolean,
      default: false
    },
    multiple: Boolean, // 是否多文件
    tipBox: Boolean, // 是否需要显示提示信息
    fileListBox: Boolean, // 是否需要显示文件列表
    limit: Number, // 最大文件限度
    progress: Boolean, // 是否需要进度条
    onChange: Function, // 上传文件成功时的回调
    onBefore: Function,
    onProgress: Function,
    onSuccess: Function,
    onFailed: Function,
    onFinished: Function
  },
  methods: {
    clickButton () {
      this.$refs.myUploadBtn.click()
      // console.log(this.fileList)
    },
    addFile ({ target: { files } }) {
      // console.log(files) // 用户是可以一次性选择多个文件的
      // input标签触发onchange事件时，将文件加入待上传列表
      for (let i = 0, l = files.length; i < l; i++) {
        if (!(this.judgeType(files[i]) && this.judgeSize(files[i]))) {
          return
        }
        let URL = window.URL || window.webkitURL;

        files[i].url = URL.createObjectURL(files[i])
        files[i].status = 'ready'
      }
      let fileList = [...this.fileList]
      if (this.multiple) {
        // 多选时，文件全部压如列表末尾
        fileList = [...fileList, ...files]
        const l = fileList.length
        let limit = this.limit
        if (
          limit &&
          typeof limit === 'number' &&
          Math.ceil(limit) > 0 &&
          l > limit
        ) {
          // 有数目限制时，取后面limit个文件
          limit = Math.ceil(limit)
          //  limit = limit > 10 ? 10 : limit;
          fileList = fileList.slice(l - limit)
        }
      } else {
        // 单选时，只取最后一个文件。注意这里没写成fileList = files;是因为files本身就有多个元素（比如选择文件时一下子框了一堆）时，也只要一个
        fileList = [files[0]]
      }

      this.$refs.myUploadBtn.value = null


      this.onChange(fileList) // 调用父组件方法，将列表缓存到上一级data中的fileList属性
    },
    remove (index) {
      // console.log(index)
      const fileList = [...this.fileList]
      if (fileList.length) {
        fileList.splice(index, 1)
        this.onChange(fileList)
      }
      // console.log('remove after: ', fileList)
    },


    judgeType (file) {
      const accept = this.accept.split(',')
      const res = accept.some((type) => {
        const typeReg = new RegExp(type + '$')

        return typeReg.test(file.name)
      })
      if (!res) {
        this.$message.error('文件类型不符合要求！')
      }
      return res
    },
    judgeSize (file) {
      const fileSize = file.size / 1024 / 1024
      console.log(fileSize + 'M')
      console.log(this.size)
      if (this.size < fileSize) {
        this.$message.error(`文件大小超过${this.size + 'M'}的限制！`)
        return false
      } else {
        return true
      }
    }

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .my-upload-wrap {
    .my-upload__input {
      display: none;
    }
    .my-upload__tip {
      height: 16px;
      line-height: 16px;
      font-size: 12px;
    }
    .my-upload__area {
      display: inline-block;
    }
    .my-upload__list {
      display: inline-flex;
      flex-direction: column;
      min-width: 400px;
      > .my-upload__list--item {
        position: relative;
        margin-top: 10px;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        font-size: 14px;
        color: #606266;
        line-height: 1.8;
        position: relative;
        box-sizing: border-box;
        border-radius: 4px;
        cursor: pointer;
        .delete {
          display: none;
          transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        }
        .success {
          display: block;
          transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
        }
        .file {
          padding: 0 4px;
        }
        &:hover {
          background-color: #f5f7fa;

          .success {
            display: none;
          }
          .delete {
            display: block;
          }
        }
        .my-upload__list--item-info {
          .my-upload__list--item-name {
            font-size: 12px;
          }
          .my-upload__list--item-remove {
            position: absolute;
            display: block;
            line-height: inherit;
            right: 5px;
            top: 4px;
            cursor: pointer;
          }
        }
        .my-upload__list--item-progress {
          position: relative;
          width: 100%;
          height: 8px;
          border: 1px solid #333;
          background-color: #fff;
          border-radius: 6px;
          span {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            background: #ffc93c;
            border-radius: 6px;
          }
        }
      }
    }
  }
</style>
