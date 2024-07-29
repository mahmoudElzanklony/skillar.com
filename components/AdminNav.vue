<template>
  <nav>
    <div v-if="Object.keys($attrs).length > 0  &&  Object.keys($attrs.words).length > 0">
      <nuxt-link tag="img" src="/images/logo.png" class="brand" to="/"></nuxt-link>
      <ul>
        <li v-for="(i,index) in $attrs.words.admin.links" :key="index">
          <span class="mrl-half"><i :class="i?.icon"></i></span>
          <nuxt-link :to="'/dashboard'+i?.path">{{ i?.name }}</nuxt-link>
        </li>


      </ul>
    </div>
  </nav>

</template>

<script>
  export default {
    name:'AdminNav',
    mounted() {
      this.current_page = this.$route.path.split('/')[this.$route.path.split('/').length - 1];
      for(let li of document.querySelectorAll('ul li')){
        if(li.children[1].href.indexOf(this.current_page) >= 0){
          li.className = 'active';
          break;
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
@import "~assets/scss/variables";
nav {
  background-color: $main_color_more_white_bk;
  padding-top: 30px;
  height: 100%;
  img.brand{
    height: 75px;
    display: block;
    margin:auto;
    margin-bottom: 30px;
    max-width: 100%;
  }
  ul{
    li{
      padding: 10px;
      border-bottom: 1px solid #dddddd;
      transition: 0.5s all;
      span,a{
        font-size: $normal !important;
      }
      span{
        color:$main_color;
      }
      a{
        display: inline-block;
        width: calc(100% - 30px);
        color:$black;
      }
      &.active{
        background-color: $main_color_white_bk;
        padding-right: 30px;
        padding-left: 30px;
      }
      &:hover{
        @extend .active
      }
    }
  }
}

</style>
