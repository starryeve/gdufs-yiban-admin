<template>
  <div ref="wang"></div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
  props: {
    // wangEditor 的配置
    option: {
      type: Object,
      default () {
        return {}
      }
    },

    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    option: {
      handler (n) {
        Object.entries(n).forEach(([k, v]) => {
          this.config[k] = v
        })
      },
      immediate: true
    },
    // 监听父组件传值，将值赋值给编辑器
    value: {
      handler (n) {
        if (this.editor && n !== this.temp) {
          this.editor.$textElem.html(n)
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      temp: '',   // 缓存当前的编辑器中的值，用于与父组件传入值进行对比
      config: {},
      editor: null
    }
  },
  mounted () {
    this.editor = new wangEditor(this.$refs.wang)

    // 合并配置项
    Object.assign(this.editor.config, this.config)

    this.editor.config.excludeMenus = [
      'emoticon',
      'video',
      'image'
    ]
    // v-model 双向绑定：把值发送到父组件
    this.editor.txt.eventHooks.changeEvents.push(() => {
      this.temp = this.editor.$textElem.html()
      this.$emit('input', this.temp)
    })

    this.editor.create()

    // 如果父组件传入了值，将值赋值给编辑器
    if (this.value.length) {
      this.editor.txt.html(this.value)
    }
  },
  beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}
</script>

<style lang="less">
  .w-e-text-container {
    z-index: 1000 !important;
  }
  .w-e-toolbar {
    z-index: 1001 !important;
  }
</style>