<template>
  <div class="best_companies current_page">
     <div class="container mt-4 mb-4">
       <h1 class="fw-bold mb-4">{{ $parent.$attrs.words.footer.companies }}</h1>
       <form class="mb-3" @submit.prevent="filterData">
         <div class="row align-items-end">
           <div class="col-md-4 col-12 mb-2">
             <div class="form-group input-icon flex-wrap">
               <label>{{ $parent.$attrs.words.general.company_name }}</label>
               <span><i class="bi bi-person"></i></span>
               <input class="form-control" name="username" required>
             </div>
           </div>
           <div class="col-md-3" v-if="false">
             <div class="form-group input-icon flex-wrap">
               <label>{{ $parent.$attrs.words.colleagues.skill }}</label>
               <span><i class="bi bi-tag"></i></span>
               <input class="form-control" name="skill" required>
             </div>
           </div>
           <div class="col-md-4 col-12 mb-2">
             <div class="form-group input-icon flex-wrap">
               <label>{{ $parent.$attrs.words.colleagues.country }}</label>
               <span><i class="bi bi-arrow-down-short"></i></span>
               <select class="form-control" name="country_id">
                 <option value="">{{ $parent.$attrs.words.colleagues.select_best_choice }}</option>
                 <option value="1" v-for="(i,index) in countries" :value="i['id']" :key="index">{{ i['name'] }}</option>
               </select>
             </div>
           </div>
           <div class="col-md-4 col-12 mb-2">
             <div class="form-group input-icon flex-wrap">
               <input type="submit" class="btn btn-primary w-100" :value="$parent.$attrs.words.general.filter">
             </div>
           </div>
         </div>
       </form>

       <div class="row infinite_scroll outer" action_path="companies_rank/companiesAction" method="get">
         <div class="company" v-for="(i,index) in data" :key="index">
           <div class="row align-items-center">
             <div class="col-lg-2 col-md-4">
               <div class="image">
                 <nuxt-link tag="img" :to="'/profile/'+i?.id" class="cursor-pointer"
                            :src="'https://cvapi.skillar.com/images/users/'+i?.image?.name"></nuxt-link>
               </div>
             </div>
             <div class="col-lg-10 col-md-8">
               <div class="info">
                 <h2 class="h2 mb-0">
                   <a target="_blank" class="fw-bold normal" :href="'/profile/'+i?.id">{{ i?.username }}</a>
                 </h2>
                 <p class="gray mb-0 small bio">{{ i?.bio }}</p>
                 <div class="d-flex justify-content-between w-75">
                   <span>
                       <i class="bi bi-eye"></i>
                       {{  $parent.$attrs.words.general.profile_watching }}
                        <strong>{{ i?.views?.views ?? 0}}</strong>
                     </span>
                   <span>
                       <i class="bi bi-info"></i>
                       {{  $parent.$attrs.words.general.jobs_number }}
                       <strong>{{ i?.jobs_count ?? 0}}</strong>
                     </span>
                   <span>
                       <i class="bi bi-people"></i>
                       {{  $parent.$attrs.words.general.applicants_number }}
                       <strong>{{ i?.applicants_count ?? 0}}</strong>
                     </span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import {mapActions , mapGetters} from "vuex";
import animateData from "@/mixins/animateData";
import sections_profile_classes from "@/mixins/sections_profile_classes";
export default {
  name: 'best_companies',
  mixins:[sections_profile_classes,animateData],
  async asyncData({store}){
    await store.commit('companies_rank/InitializeData',[]);
    await store.dispatch('companies_rank/companiesAction','?page=1')
  },
  computed:{
    ...mapGetters({
      'data':'companies_rank/get_data',
      'countries':'places/countries/getCountriesGetter'
    })
  },
  methods:{
    ...mapActions({
      'companiesAction':'companies_rank/companiesAction',
      'countriesAction':'places/countries/getCountriesAction'
    }),
    async filterData(){
      let data = new FormData(event.target);
      let dataTxt = '?';
      for (const [key, value] of data.entries()) {
        // Encode the key and value, and add them to the pairs array
        dataTxt += key +'='+value+'&';
      }
      dataTxt += 'page=1';
      console.log('---submit---')
      this.$store.commit('companies_rank/EmptyData');
      this.$store.commit('companies_rank/InitializeData',[]);
      await this.$store.dispatch('companies_rank/companiesAction',dataTxt);
      this.$store.commit('companies_rank/ChangeStatus',true);
    }
  },
  mounted() {
    if(this.countries.length == 0) {
      this.countriesAction()
    }
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },
}
</script>

<style lang="scss">
@import "~style/variables";
.best_companies{
  .bio{
    height: 50px;
    overflow: hidden;
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
  }
  .outer{
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 10px;
  }
  .company {
    border-bottom: 1px solid #dddddd;
    padding: 10px;
    .image {
      img {
        object-fit: contain;
        height: 100px;
        display: block;
        margin: auto;
      }
    }
    span{
      background-color: $main_color_white_bk;
      color:$main_color;
      padding: 7px 15px;
      border-radius: 32px;
      display: inline-block;
      margin-top: 5px;
    }
  }
}
</style>
