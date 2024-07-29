<template>
  <section class="jobs current_page pt-3 pb-3">
    <div class="container" v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="filter mb-3 position-relative">
        <h2 class="d-flex justify-content-between mb-3 align-items-center section-title-control d-sm-none">
          <span class="fw-bold blue">{{ $parent.$attrs.words.jobs.main.filter_jobs }}</span>
          <span class="gray"><i class="bi bi-arrow-down-short"></i></span>
        </h2>
        <filteration-jobs-component></filteration-jobs-component>
      </div>
      <div class="current_jobs">
        <div class="row infinite_scroll" action_path="jobs/getJobsAction" method="get">

          <div :class="'col-lg-3 col-md-6 col-12 mb-4 el show job_'+index" v-for="(i,index) in jobs_data"
               :key="index">
            <job-component
              @delete_job="(el)=> delete_item('jobs_offers',el,'jobs_offers','.job_'+index)"
              :title="i?.name"
              :company_name="i?.company?.username"
              :time="i?.published"
              :id="i?.id"
              :skills="i?.skills"
              admin="yes"
              :show_details="i?.status"
              :img="i?.company?.image?.name"
            ></job-component>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import JobComponent from "@/components/JobComponent.vue";
import FilterationJobsComponent from "@/components/FilterationJobsComponent.vue";
import {mapGetters , mapActions} from "vuex";
import animateData from "../../mixins/animateData";
import delete_item from "@/mixins/delete_item.vue";
export default {
  name: "jobs",
  async asyncData({store , route}){
    let output = '?page=1';
    // empty store
    store.commit('jobs/ChangeStatus',true)
    await store.commit('jobs/EmptyData');
    await store.dispatch('jobs/categories/getDataAction')
    await store.dispatch('places/countries/getCountriesAction')
    await store.dispatch('jobs/getJobsAction',output)
  },
  mixins:[animateData,delete_item],
  components: {FilterationJobsComponent, JobComponent},
  computed:{
    ...mapGetters({
      'jobs_data':'jobs/get_jobs'
    })
  },
  methods:{
    resetCurrentPage(){
      this.current_page = 2;
    },
  },
  mounted() {
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },

}
</script>

<style scoped>

</style>
