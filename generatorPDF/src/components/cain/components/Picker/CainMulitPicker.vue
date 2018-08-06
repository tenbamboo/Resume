<template>
  <div class="cainPickerWrap">
    <transition name="pickerT">
      <div class="cainPicker" v-if="status">
        <!-- <mt-picker ref="picker" :slots="pickerList" :showToolbar="true" @change="pickerChange" :valueKey="valueKey">
          <slot>
            <mt-button type="default" @click="hide">取消</mt-button>
            <mt-button type="primary" class="fr" @click="submit">确认</mt-button>
          </slot>
        </mt-picker> -->
      </div>
    </transition>

    <transition name="overlayT">
      <div v-if="status" class="cainPickerOverlay" @click="hide"></div>
    </transition>

  </div>
</template>

<script>
// function
// show()
// hide()

// event
// confirm

// import { Picker, Button } from 'mint-ui'
import Cain from '@cain/'
export default {
  name: 'cain-mulit-picker',
  props: {
    value: {}
  },
  mounted () {},
  data () {
    return {
      valueKey: '', // object key
      status: false, // 显示状态
      pickerList: [
        {
          flex: 1,
          values: [],
          textAlign: 'center'
        },
        {
          divider: true,
          content: '--'
        },
        {
          flex: 1,
          values: [],
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    // 隐藏Picker
    hide () {
      document.body.classList.remove('overflowHidden')
      this.status = false
    },
    // 显示Picker
    // param
    // list select list
    // label list中指定哪个key是显示的值
    // value 选中的值
    show (list, label = '', selectedValue) {
      this.status = true
      document.body.classList.add('overflowHidden')
      this.valueKey = label

      this.$nextTick(() => {
        this.$refs.picker.setSlotValues(0, list[0])
        this.$refs.picker.setSlotValues(1, list[1])
        if (!Cain.isBlank(selectedValue)) {
          this.$refs.picker.setSlotValue(0, selectedValue[0])
          this.$refs.picker.setSlotValue(1, selectedValue[1])
        }
      })
    },
    // Picker 改变
    pickerChange (picker, values) {
      // if (!Cain.isBlank(values[0]) && values[0].regionId !== this.tempProvince.regionId) {
      //   this.tempProvince = JSON.parse(JSON.stringify(values[0]))
      //   this.getCity(values[0].regionId)
      // }
    },
    // 提交数据
    submit () {
      this.hide()
      this.$emit('input', this.$refs.picker.getValues())
      this.$emit('confirm', this.$refs.picker.getValues())
    }
  },
  components: {
    // 'mt-picker': Picker,
    // 'mt-button': Button
  }
}
</script>

<style   lang="scss">
.cainPickerWrap {
  .overlayT-leave-active,
  .overlayT-enter-active {
    transition: opacity 0.3s;
    opacity: 1;
  }
  .overlayT-enter,
  .overlayT-leave-to {
    opacity: 0;
  }
  .pickerT-leave-active,
  .pickerT-enter-active {
    transition: transform 0.3s;
    transform: translate(0, 0);
  }
  .pickerT-enter,
  .pickerT-leave-to {
    transform: translate(0, 150%);
  }
  .cainPickerOverlay {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(82, 76, 76, 0.5);
    z-index: 100;
    width: 100%;
    height: 100%;
  }
  .cainPicker {
    z-index: 102;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .picker-toolbar {
    height: auto;
    padding: 5px;
    background: #e3e3e3;
  }
  .mint-button--primary {
    background-color: $mainColor;
  }
}
.overflowHidden {
  overflow: hidden;
}
</style>
