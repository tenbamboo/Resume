<template>
    <div class="regionPickerWrap">
        <transition name="pickerT">
            <div class="regionPicker" v-if="status">
              sassss
               
            </div>
        </transition>

        <transition name="overlayT">
            <div v-if="status" class="regionPickerOverlay" @click="hide"></div>
        </transition>

    </div>
</template>




<script>

// function
// show()
// hide()

// event
// confrim

import { Picker, Button } from 'mint-ui'
// import Cain from '@/components/cain'
export default {
  name: 'region-picker',
  props: {
  },
  mounted () {
    this.getProvince()
  },
  data () {
    return {
      // tempProvince: { // 阻止滑动城市触发请求
      //   regionId: ''
      // },
      status: false // 显示状态
    //   provinceList: [], // 省份List
    //   cityList: [], // 城市List
    //   pickerList: [
    //     {
    //       flex: 1,
    //       values: [],
    //       textAlign: 'right'
    //     },
    //     {
    //       divider: true,
    //       content: '-'
    //     },
    //     {
    //       flex: 1,
    //       values: [],
    //       textAlign: 'left'
    //     }
    //   ]
    }
  },
  methods: {
    // // 获取省份
    // getProvince (val) {
    //   this.$httpJson
    //     .post('hpbs/getRegionList', { regionType: '2' })
    //     .then(res => {
    //       this.provinceList = res.data
    //     })
    // },
    // // 获取城市
    // getCity (val) {
    //   this.$httpJson
    //     .post('hpbs/getRegionList', { regionType: '3', superRegionId: val })
    //     .then(res => {
    //       this.cityList = res.data
    //       this.$nextTick(() => {
    //         this.$refs.picker.setSlotValues(1, this.cityList)
    //       })
    //     })
    // },
    // 隐藏Picker
    hide () {
      document.body.classList.remove('overflowHidden')
      this.status = false
    },
    // 显示Picker
    show () {
      this.status = true
      // document.body.classList.add('overflowHidden')
      // this.$nextTick(() => {
      //   this.$refs.picker.setSlotValues(0, this.provinceList)
      // })
    }
    // // Picker 改变
    // pickerChange (picker, values) {
    //   if (!Cain.isBlank(values[0]) && values[0].regionId !== this.tempProvince.regionId) {
    //     this.tempProvince = JSON.parse(JSON.stringify(values[0]))
    //     this.getCity(values[0].regionId)
    //   }
    // },
    // // 提交数据
    // submit () {
    //   this.hide()
    //   this.$emit('confrim', this.$refs.picker.getValues())
    // }
  },
  components: {
    'mt-picker': Picker,
    'mt-button': Button
  }
}
</script>   

<style   lang="scss">
.regionPickerWrap {
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
  .regionPickerOverlay {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(82, 76, 76, 0.5);
    z-index: 100;
    width: 100%;
    height: 100%;
  }
  .regionPicker {
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
    background-color: #525ca3;
  }
}
</style>
