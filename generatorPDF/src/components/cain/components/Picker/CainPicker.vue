<template>
  <div class="cainPickerWrap">
  </div>
</template>

<script>
// 注意 此模块现仅支持单选

// function
// show(defaultValue) 默认值

// event
// confirm
// close
// change

import Cain from '@/components/cain'
export default {
  name: 'cain-picker',
  props: {
    value: '',
    valueKey: '',
    labelKey: ''
  },
  mounted () {},
  data () {
    return {
    }
  },
  methods: {
    // 按照valueKey和labelKey格式化数据
    formatValue (list) {
      if (Cain.isBlank(this.valueKey) && Cain.isBlank(this.labelKey)) {
        return list
      }
      let resList = []
      for (let item of list) {
        if (!Cain.isBlank(this.valueKey)) {
          item.value = item[this.valueKey]
        }
        if (!Cain.isBlank(this.labelKey)) {
          item.label = item[this.labelKey]
        }
        resList.push(item)
      }
      return resList
    },
    // // 隐藏Picker
    // hide () {
    //   document.body.classList.remove('overflowHidden')
    //   this.status = false
    // },
    // 显示Picker
    // param
    // list select list
    // value 选中的值
    show (list, defaultValue = '') {
      weui.picker(this.formatValue(list), {
        id: Cain.getUUID(),
        defaultValue: [defaultValue],
        onChange: result => {
          this.$emit('change', result)
        },
        onConfirm: result => {
          this.$emit('input', result)
          this.$emit('confirm', result)
        },
        onClose: result => {
          this.$emit('close', result)
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
