<!--
 * @Description:
 * @Author: Ali
 * @Date: 2021-02-03 16:11:39
 * @LastEditors: Ali
 * @LastEditTime: 2021-02-25 21:47:44
-->
<template>
  <el-dialog class="my-dialog-wrap"
             v-if="visible"
             :visible.sync="visible"
             :close-on-click-modal="false">
    <slot name="form"></slot>
    <template v-slot:title>
      <span v-html="content.title"
            class="dialog-title"></span>
    </template>
    <span v-html="content.message"></span>
    <div slot="footer"
         class="dialog-footer">
      <div v-show="submitVisible"
           @click="cancel"
           class="my-dialog-btn cancel-btn">
        {{ cancelText }}
      </div>
      <el-button type="primary"
                 round
                 v-show="cancelVisible"
                 @click="submit"
                 class="my-dialog-btn submit-btn">
        {{ submitText }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    parentVisible: {
      type: Boolean
    }
  },
  watch: {
    parentVisible (nv) {
      console.log(nv)
      this.visible = nv
    }
  },
  data () {
    return {
      visible: false,
      content: {
        title: '',
        message: ''
      },

      /* footer */
      submitVisible: true,
      submitText: '确认',
      onSubmit: null,
      cancelVisible: true,
      cancelText: '取消',
      onCancel: null
    }
  },
  mounted () {
    this.visible = this.parentVisible
  },

  methods: {
    submit () {
      this.$emit('submit')
    },
    cancel () {
      this.$emit('cancel')
    }

  }
}
</script>

<style lang="less">
  .my-dialog-wrap {
    .el-dialog {
      position: relative;
      margin-top: 20vh !important;
      padding: 24px 40px;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      width: 60%;
      max-width: 485px;
      .el-dialog__header {
        .el-dialog__headerbtn {
          display: none;
        }
      }
      .dialog-footer {
        display: flex;
        justify-content: space-between;
        .my-dialog-btn {
          display: inline-block;
          padding: 8px 0;
          cursor: pointer;
        }
        .submit-btn {
          width: 80px;
        }
      }
    }
    .dialog-title {
      line-height: 24px;
      font-size: 18px;
      color: #303133;
    }
  }
</style>
