<template>
  <section class="current_page profile profile-jobs mt-4">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="row">
        <div class="col-lg-9 mb-2">
          <div class="inner_profile pb-3">
            <profile-personal-info-component :edit_info="$parent.$attrs.words.profile.applied_jobsedit_info"></profile-personal-info-component>
            <div class="info">
              <div class="inner_jobs">

                <div class="variety_data">
                  <div class="one_variety" :name="$parent.$attrs.words.profile.applied_jobs.name">
                    <div class="heading d-flex align-items-center justify-content-between">
                      <span class="normal fw-bold">{{ $parent.$attrs.words.profile.applied_jobs.name }}</span>
                      <p class="mb-0">
                        <span class="blue mrl-half" >
                          {{ applied_jobs.length }}
                        </span>
                        <span><i class="bi bi-caret-up-fill"></i></span>
                      </p>
                    </div>
                    <div class="data">

                        <div class="dynamic_tabs">
                            <ul class="row w-100 m-0" :key="$route.fullPath">
                               <li class="col-lg-3 col-md-6 p-2 d-flex align-items-center justify-content-between"
                                   @click="add_active"
                                   name="">
                                  <span class="mrl-half mrl-reverse-15"><i class="bi bi-card-list"></i></span>
                                  <div>
                                    <p class="fw-bold mb-0">
                                      {{ applied_jobs.length }}
                                    </p>
                                    <p class="mb-0">{{ $parent.$attrs.words.profile.applied_jobs.all_requests }}</p>
                                  </div>
                               </li>
                              <li class="col-lg-3 col-md-6 p-2 d-flex align-items-center justify-content-between"
                                  @click="add_active"
                                  name="consideration">
                                <span class="mrl-half"><i class="bi bi-arrow-up"></i></span>
                                <div>
                                  <p class="fw-bold mb-0">
                                    {{ applied_jobs.filter((e)=> e.status === 'consideration').length }}
                                  </p>
                                  <p class="mb-0">{{ $parent.$attrs.words.profile.applied_jobs.in_consideration_requests }}</p>
                                </div>
                               </li>
                              <li class="col-lg-3 col-md-6 p-2 d-flex align-items-center justify-content-between"
                                  @click="add_active"
                                  name="acceptance">
                                <span class="mrl-half"><i class="bi bi-check-lg"></i></span>
                                <div>
                                  <p class="fw-bold mb-0">
                                    {{ applied_jobs.filter((e)=> e.status === 'acceptance').length }}
                                  </p>
                                  <p class="mb-0">{{ $parent.$attrs.words.profile.applied_jobs.accepted_requests }}</p>
                                </div>
                               </li>
                              <li class="col-lg-3 col-md-6 p-2 d-flex align-items-center justify-content-between"
                                  @click="add_active"
                                  name="rejected">
                                <span class="mrl-half"><i class="bi bi-x-square"></i></span>
                                <div>
                                  <p class="fw-bold mb-0">
                                    {{ applied_jobs.filter((e)=> e.status === 'rejected').length }}
                                  </p>
                                  <p class="mb-0">{{ $parent.$attrs.words.profile.applied_jobs.rejected_requests }}</p>
                                </div>
                               </li>
                            </ul>
                            <div class="content">
                               <div class="job_info d-flex align-items-center">
                                 <div class="data d-block w-100">
                                   <div :class="'value end-border-bottom p-2 job_'+key" :key="key"
                                        v-for="(i,key) in applied_jobs.filter((e) => e.status.indexOf(this.filter_applicants) >= 0)" >
                                     <div class="d-flex align-items-center">
                                       <image-component v-if="i?.job?.company?.image" :src="'/users/'+i?.job?.company?.image?.name"></image-component>
                                       <img v-else src="/images/users/default.png" class="mrl-1">
                                       <div class="mrl-reverse-10">
                                         <p class="fw-bold w-100 mb-1 d-flex align-items-center justify-content-between">
                                           <span>
                                             <a :href="'/jobs/'+i?.job?.id"  target="_blank">{{ i?.job?.name }}</a>
                                           </span>
                                           <span class="red cursor-pointer"
                                                 v-if="authorizeControl"
                                                 @click="delete_item('jobs_offers_applicants',i?.id,'jobs_offers_applicants','.job_'+key)"
                                                 v-tooltip="$parent.$attrs.words.profile.applied_jobs.delete"><i class="bi bi-trash"></i></span>
                                         </p>
                                         <p class="mb-1">
                                           <span>{{ i?.job?.company?.username }}</span>
                                           <span class="gray">{{ i?.job?.company?.address }}</span>
                                         </p>
                                         <span :class="'btn mb-1 btn-'+(
                                          i?.status == 'acceptance' ? 'success'
                                         :i?.status == 'top_best' ? 'primary'
                                         :i?.status == 'consideration' ? 'light'
                                         :i?.status == 'rejected'?'danger':'secondary')">
                                           {{ $parent.$attrs.words.profile.applied_jobs[i.status] }}
                                         </span>
                                         <p>
                                           <span class="gray">{{ $parent.$attrs.words.profile.applied_jobs.applied_at_date }}</span>
                                           <span class="gray">{{ i?.job?.created_at }}</span>
                                         </p>
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
        </div>
        <div class="col-lg-3 mb-2">
          <div class="nearest_jobs">
            <h2 class="fw-bold mb-3">{{ $parent.$attrs.words.profile.applied_jobs.popular_jobs }}</h2>
            <job-component v-for="(i,index) in jobs_data" :key="index"
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
      </div>
    </div>

    <!-----------modals--------- -->
    <update_personal_data></update_personal_data>



  </section>
</template>

<script>
import WordsLang from "../../../mixins/WordsLang";
import JobComponent from "../../../components/JobComponent";
import Update_personal_data from "../../../components/Modals/candidate/update_personal_data";
import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";
import AuthorizeControlProfile from "../../../mixins/AuthorizeControlProfile";
import {mapGetters} from "vuex";
import ImageComponent from "../../../components/ImageComponent.vue";
import delete_item from "../../../mixins/delete_item.vue";
export default {
  name: "jobs",
  components: {
    ImageComponent,
    ProfilePersonalInfoComponent,
    Update_personal_data,
    JobComponent
  },
  computed:{
    ...mapGetters({
      'applied_jobs':'profile/appliedJobs/get_data',
      'jobs_data':'jobs/get_jobs'
    })
  },
  data(){
    return {
      filter_applicants:'',
    }
  },
  mounted() {
     this.$store.dispatch('profile/appliedJobs/GetDataAction',this.current_id)
  },
  methods:{
     add_active(){
       console.log(event.currentTarget)
       console.log(event.currentTarget.getAttribute('name'))
       this.filter_applicants = event.currentTarget.getAttribute('name')
       $(event.target).addClass('active').siblings().removeClass('active')
     }
  },
  mixins:[WordsLang,AuthorizeControlProfile,delete_item],
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.dynamic_tabs ul.row > li{
  min-width: 25%;
}
.profile.profile-jobs{
  .variety_data{
    .one_variety{
      .data{
        display: block;
        a{
          font-size: $normal !important;
          color:$black;
        }
      }
    }
  }
}
</style>
