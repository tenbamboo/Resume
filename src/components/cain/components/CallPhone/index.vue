<template>

  <div>
      <a style="display:none;" :href="phone"  id="rootCallPhone"></a>
  </div>

</template>

<script>
export default {
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    number (p) {
      this.phone = `tel:${p}`
      this.$nextTick(() => {
        document.getElementById('rootCallPhone').click()
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" >
</style>
