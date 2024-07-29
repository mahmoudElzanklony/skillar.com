<template>
  <div class="admin">
    <div class="row">
      <div class="col-lg-2 col-md-4">
         <admin-nav :words="words_data"></admin-nav>
      </div>
      <div class="col-lg-10 col-md-8">
        <nuxt :words="words_data"/>
      </div>
    </div>


  </div>
</template>

<script>

import {mapGetters , mapActions} from "vuex";

export default {
  name: "admin",
  data(){
     return {
       file_name:'admin_layout',
       current_page:'',
     }
  },
  computed:{
    ...mapGetters({
      'loader_status':'loader/getLoaderGetter',
      'words_data':'words_data_lang/getData'
    })
  },

}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";
.admin {
  overflow: hidden;
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

}
</style>

