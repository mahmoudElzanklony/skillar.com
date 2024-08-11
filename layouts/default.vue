<template>
  <div>
      <navbar-component :words="words_data"></navbar-component>
      <nuxt :words="words_data" />
      <loader v-if="loader_status" :color="'#0a58ca'" size="60px"></loader>
      <footer-component :words="words_data"></footer-component>


  </div>
</template>

<script>

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import {mapGetters} from "vuex";

export default {
  name: "default",
  components: {NavbarComponent,FooterComponent},
  computed:{
    ...mapGetters({
      'loader_status':'loader/getLoaderGetter',
      'words_data':'words_data_lang/getData'
    })
  },
  mounted() {

    if(document.cookie.split('lang=')[1] === undefined){
      document.cookie = "lang=en;  path=/;";
      localStorage.setItem('lang','en');
    }
  }
}
</script>

