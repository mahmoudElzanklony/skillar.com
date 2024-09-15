<template>
  <section class="current_page profile published-jobs mt-4">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <form class="mb-4" v-if="false">
        <div class="row align-items-center">
          <div class="col-md-4">
            <div class="form-group input-icon flex-wrap">
              <label class="w-100">{{ $parent.$attrs.words.profile.published_jobs.job_time }}</label>
              <span><i class="bi bi-arrow-down-short"></i></span>
              <select class="form-control" name="country_id">
                <option>{{ $parent.$attrs.words.profile.published_jobs.select_best_choice }}</option>
                <option value="1" v-for="i in 5">Programming</option>
                <option value="1" v-for="i in 5">Teaching</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group input-icon flex-wrap">
              <label class="w-100">{{ $parent.$attrs.words.profile.published_jobs.job_type }}</label>
              <span><i class="bi bi-arrow-down-short"></i></span>
              <select class="form-control" name="country_id">
                <option>{{ $parent.$attrs.words.profile.published_jobs.select_best_choice }}</option>
                <option value="1" v-for="i in 5">Programming</option>
                <option value="1" v-for="i in 5">Teaching</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group input-icon flex-wrap">
              <input type="submit" class="btn btn-primary w-100 position-relative top-13" :value="$parent.$attrs.words.profile.published_jobs.filter">
            </div>
          </div>
        </div>
      </form>
      <div class="row infinite_scroll" action_path="jobs/getJobsAction" method="get">

        <div class="col-lg-3">
          <div class="mb-4 el show cursor-pointer" v-for="(i,index) in jobs_data" :key="index" @click="select_this_job(i)">
            <job-component
                           :title="i?.name"
                           :company_name="i?.company?.username"
                           :time="i?.published"
                           :id="i?.id"
                           :skills="i?.skills"
                           :show_details="i?.status"
                           :img="i?.company?.image?.name"
            ></job-component>
          </div>
        </div>
        <div class="col-lg-9 mb-2" v-if="authorizeControl">
          <div class="job_description" v-if="specific_job">
            <div class="heading d-flex align-items-center justify-content-between mb-3">
               <image-component :src="'https://cvapi.skillar.com/images/users/'+specific_job?.company?.image?.name"></image-component>
               <div class="controls d-flex justify-content-between">
                 <p class="gray mrl-1 position-relative top-3">{{ specific_job?.published }}</p>
                 <a class="mrl-half" :href="'/jobs/save?id='+specific_job?.id">
                   <span><i class="bi bi-pencil-square"></i></span>
                 </a>
                 <nuxt-link to="" data-bs-toggle="modal" data-bs-target="#shareModal">
                   <span><i class="bi bi-share"></i></span>
                 </nuxt-link>
               </div>
            </div>
            <div class="content">
              <h2 class="fw-bold mb-4">{{ specific_job?.name }}</h2>
              <p class="fw-bold gray mb-1">{{ $parent.$attrs.words.jobs.save_job.short_description }}</p>
              <p class="mb-4 gray" v-html="specific_job?.description"></p>
              <p class="fw-bold gray mb-1">{{ $parent.$attrs.words.jobs.save_job.skills }}</p>
              <ul class="mb-4 gray">
                <li class="gray mb-2" v-for="(skill,key) in specific_job?.skills" :key="key">
                  <strong>{{ skill?.title }}</strong> :
                  <span>{{ skill?.description }}</span>
                </li>
              </ul>

              <div class="dynamic_tabs">
                <div>
                  <ul class="row" :key="$route.fullPath">
                  <li class="p-2 d-flex align-items-center active"
                      @click="add_active"
                      name="not_viewed_requests" filter="pending">
                    <span class="mrl-half mrl-reverse-15" filter="pending"><i class="bi bi-card-list" filter="pending"></i></span>
                    <div>
                      <p class="fw-bold mb-0">
                        {{  applicants.filter((e)=> e.status === 'pending').length }}
                      </p>
                      <p class="mb-0">{{ $parent.$attrs.words.profile.published_jobs.not_viewed_requests }}</p>
                    </div>
                  </li>
                  <li class="p-2 d-flex align-items-center"
                      @click="add_active"

                      name="top_best_requests" filter="top_best">
                    <span class="mrl-half" filter="top_best"><i class="bi bi-arrow-up" filter="top_best"></i></span>
                    <div>
                      <p class="fw-bold mb-0">
                        {{  applicants.filter((e)=> e.status === 'top_best').length }}
                      </p>
                      <p class="mb-0">{{ $parent.$attrs.words.profile.published_jobs.top_best_requests }}</p>
                    </div>
                  </li>
                  <li class="p-2 d-flex align-items-center" name="consideration"
                      @click="add_active"
                      filter="consideration">
                    <span class="mrl-half" filter="consideration"><i filter="consideration"  class="bi bi-hand-thumbs-up"></i></span>
                    <div>
                      <p class="fw-bold mb-0">
                        {{  applicants.filter((e)=> e.status === 'consideration').length }}
                      </p>
                      <p class="mb-0">{{ $parent.$attrs.words.profile.applied_jobs.in_consideration }}</p>
                    </div>
                  </li>
                    <li class="p-2 d-flex align-items-center"
                        @click="add_active"
                        name="accepted_requests" filter="acceptance">
                      <span class="mrl-half" filter="top_best"><i filter="top_best" class="bi bi-check-lg"></i></span>
                      <div>
                        <p class="fw-bold mb-0">
                          {{  applicants.filter((e)=> e.status === 'acceptance').length }}
                        </p>
                        <p class="mb-0">{{ $parent.$attrs.words.profile.published_jobs.accepted_requests }}</p>
                      </div>
                    </li>
                  <li class="p-2 d-flex align-items-center"
                      @click="add_active"
                      name="rejected_requests" filter="rejected">
                    <span class="mrl-half" filter="rejected"><i filter="rejected" class="bi bi-x-square"></i></span>
                    <div>
                      <p class="fw-bold mb-0">
                        {{  applicants.filter((e)=> e.status === 'rejected').length }}
                      </p>
                      <p class="mb-0">{{ $parent.$attrs.words.profile.published_jobs.rejected_requests }}</p>
                    </div>
                  </li>
                </ul>
                </div>
                <div class="content employees_applied">
                  <div class="job_info info d-flex align-items-center">
                    <div class="data d-block w-100">
                      <div class="value end-border-bottom p-2"
                           v-for="(i,key) in applicants.filter((e) => e?.status === filter_applicants)" :key="key">
                        <div :class="'d-flex align-items-center box_'+key">
                          <nuxt-link tag="img" to="/profile/ahmed" class="mrl-1 cursor-pointer" :src="computedSrc+'/images/users/'+i?.resume?.user?.image?.name"></nuxt-link>
                          <div>
                            <div class="fw-bold mb-1 d-flex align-items-center justify-content-between">
                              <nuxt-link to="/profile/ahmed">
                                <span class="blue normal">
                                  {{ i?.resume?.user?.username }}
                                </span>
                              </nuxt-link>
                              <ul class="dots-action cursor-pointer d-inline-block">
                                <li class="dots">
                                  <i class="bi bi-three-dots-vertical gray"></i>
                                  <ul>
                                    <li data-bs-toggle="modal"
                                        @click="select_applicant(i)"
                                        data-bs-target="#rate_employee">
                                      <span class="gray"><i class="bi bi-person-vcard"></i></span>
                                      <span>{{ $parent.$attrs.words.profile.published_jobs.rate_employee }}</span>
                                    </li>
                                    <li>
                                      <span class="red" @click="delete_item('jobs_offers_applicants',i?.id,'jobs_offers_applicants','.box_'+key); select_this_job(i?.job);"><i class="bi bi-trash"></i></span>
                                      <span>{{ $parent.$attrs.words.profile.published_jobs.delete_request }}</span>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                            <p class="mb-0">
                              <span class="fw-bold">{{ i?.resume?.user?.bio }}</span>
                              <span class="gray d-block small">
                                {{ $parent.$attrs.words.profile.published_jobs.applied_at_date }} {{i?.created_at }}
                              </span>
                              <a target="_blank" :href="computedSrc+'/pdfs/'+i?.resume?.file">{{ $parent.$attrs.words.profile.published_jobs.show_resume }}</a>
                            </p>
                            <p class="mb-0 gray small">{{ $parent.$attrs.words.profile.published_jobs.profile_match_skills }}</p>
                            <div class="flex flex-wrap">
                              <button :class="'btn btn-outline-primary '+(index > 0 ? 'mrl-reverse-10':'')"
                                      v-for="(s,index) in i?.resume?.user.profile_sections" :key="index">
                                {{ s?.first_attribute_data?.answer }}
                              </button>
                            </div>
                            <div class="progress" v-if="false">
                              <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-----------modals--------- -->
    <share-component></share-component>
    <rate_employee></rate_employee>

  </section>
</template>

<script>
import delete_item from "../../../mixins/delete_item.vue";
import JobComponent from "../../../components/JobComponent";
import $ from "jquery";
import ShareComponent from "../../../components/ShareComponent";
import Rate_employee from "../../../components/Modals/rate_employee";
import animateData from "../../../mixins/animateData";
import AuthorizeControlProfile from "../../../mixins/AuthorizeControlProfile";
import {mapGetters , mapMutations} from "vuex";
export default {
  name: "published_jobs",
  components: {
    Rate_employee,
    ShareComponent,
    JobComponent
  },
  async asyncData({store , $auth , route}){
    await store.commit('jobs/EmptyData')
    await store.dispatch('jobs/getJobsAction','?company_id='+route.params.id+'&page=1')
  },
  mixins:[animateData,AuthorizeControlProfile,delete_item],
  computed:{
    ...mapGetters({
      'jobs_data':'jobs/get_jobs',
      'specific_job':'jobs/get_item',
      'applicants':'jobs/applicants/get_data'
    }),
    computedSrc() {
      return process.env.baseUrl
    }
  },
  methods:{
    ...mapMutations({
      'select_applicant':'jobs/applicants/InitializeApplicant'
    }),
    resetCurrentPage(){
      this.current_page = 2;
    },
    add_active(){
      $(event.currentTarget).addClass('active').siblings().removeClass('active')
      this.filter_applicants = event.currentTarget.getAttribute('filter')
    },

    async select_this_job(job){
      if(this.authorizeControl) {
        let data = new FormData();
        data.append('job_id', job?.id)
        await this.$store.dispatch('jobs/applicants/getDataAction', data)
        await this.$store.commit('jobs/InitializeItem', job)
      }
    },
  },
  mounted() {
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
    this.current_user = this.current_id;
  },
  data(){
    return{
      last_item_observed_selector :'.infinite_scroll > div:first-of-type > div:last-of-type',
      filter_with_user_id:'company_id',
      filter_applicants:'pending',
      current_user:null
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.job_description{
  padding: 10px;
  border:1px solid #dddddd;
  border-radius: 8px;
  .heading{
    img{
      height: 70px;
    }
    .controls{
      p{
        margin-bottom: 0px;
      }
      a{
        border: 1px solid #dddddd;
        border-radius:4px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        font-size: $normal;
        color:$gray;
      }
    }
  }
}
.dynamic_tabs{
  border: 1px solid #dddddd;
  border-radius: 8px;
  >div:first-of-type{
    overflow: hidden;
  }
  .job_info{
    img{
      max-height: 140px;
    }
  }
  .data{
    .value{
      div{
        >div{
          width:-webkit-fill-available;
        }
      }
      &:last-of-type{
        border-bottom: none;
      }
    }
  }
}

</style>
