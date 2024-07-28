<template>
  <header class="mt-5" id="header">
    <div class="container" v-if="Object.keys($parent.$parent.$attrs).length > 0  &&  Object.keys($parent.$parent.$attrs.words.header).length > 0">
      <div class="row align-items-center">
        <div class="col-md-6 mb-5">
          <h1 class="fw-bold">
            <span>{{ $parent.$parent.$attrs.words.header.main_title_one }}</span>
            <br>
            <span>{{ $parent.$parent.$attrs.words.header.main_title_two }}</span>
            <br>
            <span>{{ $parent.$parent.$attrs.words.header.main_title_three }}</span>
          </h1>
          <p class="gray">{{ $parent.$parent.$attrs.words.header.sub_title }}</p>
          <nuxt-link to="#get_last_information" class="btn btn-primary d-inline-flex align-items-center">
            <span class="p-relative white mrl-1">{{ $parent.$parent.$attrs.words.header.know_more }}</span>
            <span class="white" v-if="lang == null || lang == 'ar'"><i class="bi bi-arrow-left position-relative top-1"></i></span>
            <span class="white" v-else><i class="bi bi-arrow-right position-relative top-1"></i></span>
          </nuxt-link>
        </div>
        <div class="col-md-6 mb-5">
          <div class="bk-form">
            <img src="/images/icons/Calendar.png">
            <img src="/images/icons/Chat.png">
            <img src="/images/icons/Location.png">
            <img src="/images/icons/Tick.png">
             <form method="get" action="/jobs">
                <h1 class="fw-bold text-center">{{ $parent.$parent.$attrs.words.header.form_main_title }}</h1>
                <p class="gray text-center">
                  <span class="gray">{{ $parent.$parent.$attrs.words.header.form_sub_title }}</span>
                  <br>
                  <span class="gray">{{$parent.$parent.$attrs.words.header.apply_to_job}}</span>
                </p>
               <div class="mb-2 input-icon">
                 <span><i class="bi bi-arrow-down-short"></i></span>
                 <select name="category_id" class="form-control">
                   <option value="">{{ $parent.$parent.$attrs.words.header.select_your_category }}</option>
                   <option v-for="(i,index) in categories" :key="index" :value="i?.id">{{ i?.name }}</option>
                 </select>
               </div>
                <div class="mb-2 input-icon">
                  <span><i class="bi bi-arrow-down-short"></i></span>
                   <select name="country_id" class="form-control">
                      <option value="">{{ $parent.$parent.$attrs.words.header.select_your_country }}</option>
                      <option v-for="(i,index) in countries" :key="index" :value="i?.id">{{ i?.name }}</option>
                   </select>
                </div>
                <div class="mb-2">
                    <input type="submit" class="btn btn-primary w-100" :value="$parent.$parent.$attrs.words.general.filter">
                </div>
             </form>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapActions , mapGetters} from "vuex";

export default {
  name: "HeaderComponent",
  data(){
    return {
      lang:'',
    }
  },
  computed:{
    ...mapGetters({
      'countries':'places/countries/getCountriesGetter',
      'categories':'jobs/categories/get_data'
    })
  },
  methods:{
    ...mapActions({
      'countriesAction':'places/countries/getCountriesAction',
      'categoriesAction':'jobs/categories/getStatisticsDataAction'
    })
  },
  mounted() {
      this.lang = localStorage.getItem('lang');
      if(this.countries.length === 0){
        this.countriesAction()
      }
    if(this.categories.length === 0){
      this.categoriesAction()
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/variables";
header{
  .row{
    >div{
      h1{
        line-height: 55px;
      }
    }
  }
}
  .bk-form{
    background-image: url("/images/bk-header.webp");
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: auto;
    background-position: bottom;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    >img{
      position: absolute;
      height: 65px;
      &:first-of-type{
          top:20px;
          left: -30px;
      }
      &:nth-of-type(2){
        top:-30px;
        right: 30px;
      }
      &:nth-of-type(3){
        bottom:-30px;
        left: 40px;
      }
      &:nth-of-type(4){
        bottom: 50px;
        right: -50px;
      }
    }
    form{
      background-color: white;
      padding: 20px;
      box-shadow: 0px 0px 10px 3px #ddd;
      border-radius: 5px;
    }
  }

@media (max-width: 767px) {
  header{
    .row {
      > div {
        h1 {
          line-height: 40px;
        }
      }
    }
    .container{
      >div{
        >div:first-of-type{
          text-align: center;
        }
      }
      .bk-form{
        >img:nth-of-type(4){
          right: 0px;
          bottom:-20px;
        }
      }
    }
  }
}
</style>

<style scoped>

</style>
