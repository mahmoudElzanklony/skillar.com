<template>
  <div class="fixed-dots">
    <ul>
      <li  v-for="(i,index) in dots"
          :key="index"
          :to="i"
          :class="index == 0 ? 'active':''">
        <span></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DotsScrollComponent",
  props:['dots'],
}
</script>

<style scoped>

</style>
