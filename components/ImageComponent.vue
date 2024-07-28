<template>
  <img
    :src="this.src?.indexOf('http') >= 0 ? this.src : computedSrc + '/images' + this.src">
</template>

<script>
export default {
  name: "ImageComponent",
  props:['src'],
  computed: {
    computedSrc() {
      return process.env.baseUrl
    }
  }
}
</script>

<style scoped>

</style>
