<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container"  v-if="Object.keys($attrs).length > 0  &&  Object.keys($attrs.words).length > 0">
      <nuxt-link class="navbar-brand cursor-pointer position-relative"
                 to="/" tag="img" style="top: -6px;" src="/images/logo.png"></nuxt-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse mrl-reverse-15" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 align-items-md-center position-relative">
          <li class="nav-item link mrl-1">
            <nuxt-link to="/" class="nav-link line-hover" aria-current="page" href="/">
              {{ $attrs.words.navbar.home }}
            </nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link to="#" class="nav-link line-hover" href="#">{{ $attrs.words.navbar.about }}</nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link class="nav-link line-hover" to="/best-companies">{{ $attrs.words.navbar.companies_rank }}</nuxt-link>
          </li>
          <li class="nav-item link mrl-1" v-if="$auth?.state?.user?.role?.name === 'company'">
            <nuxt-link class="nav-link line-hover" to="/jobs/save">{{ $attrs.words.navbar.add_job }}</nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link class="nav-link line-hover" to="/colleagues">{{ $attrs.words.navbar.colleagues }}</nuxt-link>
          </li>
          <li class="nav-item link mrl-1">
            <nuxt-link to="/jobs" class="nav-link line-hover">{{ $attrs.words.navbar.jobs }}</nuxt-link>
          </li>
        </ul>

        <ul class="navbar-nav mb-2 mb-lg-0 align-items-md-center">
          <li class="nav-item mrl-1" v-if="!($auth.loggedIn)">
            <nuxt-link to="/auth/register" class="nav-link btn-bk-primary">{{ $attrs.words.navbar.register }}</nuxt-link>
          </li>
          <li class="nav-item mrl-1">
            <button class="nav-link btn btn-outline-primary" @click="changeLang">
              {{ another_lang }}
            </button>
          </li>
          <li class="user_profile " v-if="$auth.loggedIn">
            <ul class="dots-action cursor-pointer d-inline-block">
              <li class="dots">
                <img v-if="$auth?.$state?.user?.image"
                     :src="cvApiUrl+'/users/'+$auth?.$state?.user?.image?.name">
                <img v-else src="/images/users/default.png">

                <ul>
                  <li>
                    <nuxt-link class="w-100 d-block" :to="'/profile/'+$auth?.user?.id">
                      <span class="gray"><i class="bi bi-person-circle"></i></span>
                      <span class="gray">{{ $attrs.words.navbar.profile }}</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link class="w-100 d-block" to="/notifications">
                      <span><i class="bi bi-bell"></i></span>
                      <span class="gray">{{ $attrs.words.navbar.notifications }}</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link class="w-100 d-block" to="/chat">
                      <span><i class="bi bi-chat-dots"></i></span>
                      <span class="gray">{{ $attrs.words.navbar.chat }}</span>
                    </nuxt-link>
                  </li>
                  <li v-if="false">
                    <nuxt-link to="/nearest-jobs">
                      <span><i class="bi bi-geo-alt"></i></span>
                      <span class="gray">{{ $attrs.words.navbar.nearest_jobs }}</span>
                    </nuxt-link>
                  </li>
                  <li style="border-top: 1px solid #dddddd" @click="logout">
                    <nuxt-link class="w-100 d-block" to="#">
                      <span><i class="bi bi-box-arrow-in-left"></i></span>
                      <span class="gray">{{ $attrs.words.navbar.logout }}</span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

        </ul>

      </div>
    </div>
  </nav>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "NavbarComponent",
  data(){
    return {
      file_name:'navbar',
      another_lang:'',
    }
  },
  computed:{
    cvApiUrl(){
      return 'https://cvapi.skillar.com/images'
    }
  },
  methods:{
    ...mapActions({
      'logout':'auth/login/logoutAction'
    }),
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
  box-shadow: 1px 1px 10px 0px #ddd;
  position: fixed;
  top:0px;
  right: 0px;
  left: 0px;
  z-index: 999999;
  background-color: white !important;
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
  .user_profile{
    img{
      width: 40px;
      height: 40px;
      border: 1px solid #eeeeee;
      border-radius: 50%;
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
      .dots-action > li > ul{

      }
    }
  }
}
</style>
