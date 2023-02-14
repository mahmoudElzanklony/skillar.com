<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxt-link class="navbar-brand" to="/">Skillar</nuxt-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 align-items-md-center">
          <li class="nav-item link mrl-1">
            <nuxt-link to="/" class="nav-link line-hover" aria-current="page" href="#">
              {{ words.home }}
            </nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link to="#" class="nav-link line-hover" href="#">{{ words.about }}</nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link to="#" class="nav-link line-hover" href="#">{{ words.posts }}</nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link to="/jobs" class="nav-link line-hover">{{ words.jobs }}</nuxt-link>
          </li>
          <li class="nav-item mrl-1">
            <nuxt-link to="#" class="nav-link btn-bk-primary" href="#">{{ words.register }}</nuxt-link>
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-outline-primary" @click="changeLang">
              {{ another_lang }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import WordsLang from "../mixins/WordsLang";
export default {
  name: "NavbarComponent",
  data(){
    return {
      file_name:'navbar',
      another_lang:'',
    }
  },
  mixins:[WordsLang],
  methods:{
    changeLang(){
      if(localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'ar'){
          localStorage.setItem('lang','en');
      }else{
        localStorage.setItem('lang','ar');
      }
      window.location = document.URL;
    },
  },
  mounted() {
      if(localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'ar'){
          this.another_lang = 'English';
      }else{
        this.another_lang = 'اللغة العربية';
      }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
nav{
  background-color: transparent !important;
  box-shadow: 1px 1px 10px 0px #ddd;
  .navbar-brand{
    font-size: $semi_big !important;
    font-weight: bold;
  }
  ul{
    li.link{
      .nav-link{
        position: relative;
        padding: 0px;
        padding-right: 0px !important;
        padding-left: 0px !important;
        color: $black;
        &.active{
          color: $blue;
        }
      }

    }
  }
  .btn-outline-primary{
    padding: 4px 8px !important;
  }

}
@media (max-width: 767px) {
  nav{
    ul{
      li:not(:last-of-type){
        .nav-link{
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
