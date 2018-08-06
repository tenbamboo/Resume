<template>
  <div class="cainDatePickerWrap">
  </div>
</template>

<script>
// 注意 此模块现仅支持单选

// function
// show() 默认值

// event
// confirm
// close
// change

import Cain from '@/components/cain'
export default {
  name: 'cain-date-picker',
  props: {
    value: '',
    startDate: {
      type: String
      // default: new Date()
    },
    endDate: {
      type: String
    }
  },
  mounted () {},
  data () {
    return {}
  },
  methods: {
    // value 选中的值
    show () {
      let end = this.endDate
      let start = this.startDate
      if (!end && Cain.isBlank(end)) {
        let now = new Date()
        now.setFullYear(now.getFullYear() + 20)
        end = now
      } else {
        end = new Date(end)
      }
      if (!start && Cain.isBlank(start)) {
        let now = new Date()
        start = now
      } else {
        start = new Date(start)
      }
      let currentValue = this.value
      if (!currentValue && Cain.isBlank(currentValue)) {
        currentValue = new Date()
      } else {
        currentValue = new Date(currentValue)
      }
      weui.datePicker({
        start,
        end,
        id: Cain.getUUID(),
        defaultValue: [
          currentValue.getFullYear(),
          currentValue.getMonth() + 1,
          currentValue.getDate()
        ],
        onChange: result => {
          this.$emit('change', this.formatResValue(result))
        },
        onConfirm: result => {
          let res = this.formatResValue(result)
          // UTC GMT 不一致问题，需要增加8市区时间
          let inputRes = this.formatResValue(result)
          inputRes.setHours(inputRes.getHours() + 8)
          this.$emit('input', inputRes)
          this.$emit('confirm', res)
        },
        onClose: result => {
          this.$emit('close', this.formatResValue(result))
        }
      })
    },
    formatResValue (result) {
      if (Cain.isBlank(result)) {
        return ''
      }
      let res1 = result[1].value
      if (result[1].value < 10) {
        res1 = '0' + res1
      }
      let res2 = result[2].value
      if (result[2].value < 10) {
        res2 = '0' + res2
      }

      let temp = result[0].value + '/' + res1 + '/' + res2
      return new Date(temp)
      // return {
      //   label: result[0].label + result[1].label + result[2].label,
      //   value: new Date(result[0].value, result[1].value - 1, result[2].value)
      // }
    }
  }
}
</script>

<style lang="scss">

</style>
