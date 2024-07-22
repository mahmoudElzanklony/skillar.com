<template>
  <div class="colleagues current_page mt-4 mb-4">
    <div class="container">
      <h1 class="mb-4">{{ $parent.$attrs.words.colleagues.colleagues_at_skillar }}</h1>
      <form class="mb-3" @submit.prevent="filterData">
        <div class="row align-items-end">
          <div class="col-md-4 col-12 mb-2">
            <div class="form-group input-icon flex-wrap">
              <label>{{ $parent.$attrs.words.colleagues.username }}</label>
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

      <div class="row infinite_scroll" action_path="colleagues/colleaguesAction" method="get">
         <div class="col-md-4" v-for="(i,index) in data" :key="index">
           <div class="user-card mb-3 position-relative">
             <div class="user-header">
               <a target="_blank" class="cursor-pointer" :href="'/profile/'+i?.id">
                 <image-component v-if="i?.image?.name" :src="'https://cvapi.skillar.com/images/users/'+i?.image?.name"></image-component>
                 <img v-else src="/images/users/default.png">
               </a>
             </div>
             <div class="user-body p-2">
               <p class="fw-bold text-center mb-0">{{ i?.username }}</p>
               <p class="text-center mb-2 bio" :title="i?.bio">{{ i?.bio }}</p>
               <ul class="d-flex justify-content-center align-items-center flex-wrap mb-2" >
                 <li class="mrl-2 mb-2 d-flex align-items-center" v-for="(item,key) in sections_names" :key="key">
                   <span class="position-relative  mx-1 gray">
                     <i :title="item?.name" :class="'bi '+sections_classes.find((e)=> e.name === item.en_name.toLowerCase())?.class"></i>
                   </span>
                   <p class="mb-0">
                     <span class="blue mx-1">{{ i?.profile_sections.find((e) => e?.section?.id === item?.id)?.sections_count ?? 0 }}</span>
                     <span class="gray">{{ item?.name }}</span>
                   </p>
                 </li>
               </ul>
               <a :href="'/profile/'+i?.id"
                  target="_blank" class="btn btn-outline-primary fit-content d-block m-auto">{{ $parent.$attrs.words.colleagues.see_profile }}</a>
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
  name: 'colleagues',
  mixins:[sections_profile_classes,animateData],
  async asyncData({store}){
    await store.commit('colleagues/EmptyData');
    await store.commit('colleagues/InitializeData',[]);
    await store.dispatch('sections/sectionsNamesAction');
    await store.dispatch('colleagues/colleaguesAction')
  },
  computed:{
    ...mapGetters({
      'data':'colleagues/get_data',
      'sections_names':'sections/get_sections_names',
      'countries':'places/countries/getCountriesGetter'
    })
  },
  methods:{
    ...mapActions({
      'colleaguesAction':'colleagues/colleaguesAction',
      'sectionsNamesAction':'sections/sectionsNamesAction',
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
      this.$store.commit('colleagues/EmptyData');
      this.$store.commit('colleagues/InitializeData',[]);
      await this.$store.dispatch('colleagues/colleaguesAction',dataTxt);
      this.$store.commit('colleagues/ChangeStatus',true);
    }
  },
  mounted() {
    this.countriesAction()
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.bio{
  height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
