<template>
  <section class="current_page profile mt-4">
      <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
          <div class="row">
            <div class="col-lg-9 mb-2">
              <div class="inner_profile pb-3">
                <profile-personal-info-component :edit_info="$parent.$attrs.words.profile.main.edit_info"></profile-personal-info-component>
                <ResendActivation v-if="authorizeControl"></ResendActivation>
                <div class="quick_statistics mb-3 p-3">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 mb-2">
                      <nuxt-link :to="authorizeControl ? ($auth?.$state?.user?.role?.name === 'company' ? '/profile/'+current_id+'/published-jobs':'/profile/'+current_id+'/applied-jobs'):'#'">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold" v-if="$auth?.$state?.user?.role?.name !== 'company'">{{ $parent.$attrs.words.profile.main.number_of_applied_jobs }}</p>
                            <p class="fw-bold" v-else>{{ $parent.$attrs.words.footer.jobs }}</p>
                            <p class="fw-bold">{{ statistics_data?.jobs }}</p>
                          </div>
                          <img src="/images/icons/Document.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-6 col-md-6 mb-2">
                      <nuxt-link to="#">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ $parent.$attrs.words.profile.main.number_of_visiting }}</p>
                            <p class="fw-bold">{{ statistics_data?.views }}</p>
                          </div>
                          <img src="/images/icons/Show.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2" v-if="authorizeControl">
                      <nuxt-link to="/chat">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ $parent.$attrs.words.profile.main.number_of_messages_chat }}</p>
                            <p class="fw-bold">{{ statistics_data?.chat }}</p>
                          </div>
                          <img src="/images/icons/Chat.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                      <nuxt-link :to="'/profile/'+current_id+'/feedbacks'">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ $parent.$attrs.words.profile.main.number_of_friends_feedback }}</p>
                            <p class="fw-bold">{{ statistics_data?.rates }}</p>
                          </div>
                          <img src="/images/icons/Profile.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2" v-if="authorizeControl">
                      <nuxt-link to="/notifications">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ $parent.$attrs.words.profile.main.number_of_new_notifications }}</p>
                            <p class="fw-bold">{{ statistics_data?.notifications }}</p>
                          </div>
                          <img src="/images/icons/Notification.png">
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="video mb-3">
                  <div class="d-flex align-items-center justify-content-center">
                    <ul class="dots-action cursor-pointer d-inline-block" v-if="authorizeControl">
                      <li class="dots">
                        <i class="bi white bi-three-dots-vertical gray"></i>
                        <ul>
                          <li data-bs-toggle="modal"
                              data-bs-target="#update_personal_video">
                            <span class="gray"><i class="bi bi-pencil-square"></i></span>
                            <span class="gray">{{ $parent.$attrs.words.general.edit }}</span>
                          </li>
                          <li>
                            <span class="red"><i class="bi bi-trash"></i></span>
                            <span class="gray">{{ $parent.$attrs.words.general.delete }}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <span data-bs-toggle="modal"
                          data-bs-target="#display_introduction_video"><i class="bi bi-file-earmark-play"></i></span>
                  </div>
                </div>
                <div class="description p-3">
                  <div class="main-heading d-flex align-items-center justify-content-between mb-2">
                    <span class="fw-bold normal">{{ $parent.$attrs.words.profile.main.quick_description }}</span>
                    <span data-bs-toggle="modal"
                          v-if="$auth.$state.user?.role?.name !== 'company'"
                          @click="get_resumes_action(current_id)"
                          class="blue cursor-pointer"
                          data-bs-target="#apply_for_job">
                      {{ $parent.$attrs.words.profile.published_jobs.show_resume }}
                    </span>
                  </div>
                  <p>{{ visitor_obj?.bio }}</p>
                </div>
                <div class="variety_data" v-if="sections_names.length > 0 && $auth?.$state?.user.role?.name != 'company'">
                  <div class="one_variety"
                       v-for="(i,index) in sections_names" :key="index"
                       :name="i.name">
                    <div class="heading d-flex align-items-center justify-content-between">
                      <span class="normal fw-bold">{{ i?.profile_name }}</span>
                      <p class="mb-0">
                        <span class="blue mrl-half" data-bs-toggle="modal" v-if="authorizeControl"
                              @click="get_section_properties(i['id']);"
                              data-bs-target="#update_dynamic_box"><i class="bi bi-plus"></i></span>
                        <span @click="get_section_data([i['id'],current_id])"><i class="bi bi-caret-down-fill"></i></span>
                      </p>
                    </div>
                    <ShowSectionsData :item="i"></ShowSectionsData>
                  </div>

                </div>
                <loader v-else-if="$auth?.$state?.user.role?.name !== 'company'" :color="'#0a58ca'" style="text-align: center" size="30px"></loader>

              </div>
            </div>
            <div class="col-lg-3 mb-2">
               <div class="nearest_jobs">
                 <h2 class="fw-bold mb-3">{{ $parent.$attrs.words.profile.main.popular_jobs }}</h2>
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

    <update_dynamic_box></update_dynamic_box>
    <update_personal_video></update_personal_video>

    <update_personal_data></update_personal_data>


    <display_video></display_video>

    <apply_for_job :control="true"></apply_for_job>

  </section>
</template>

<script>
import WordsLang from "../../../mixins/WordsLang";
import JobComponent from "../../../components/JobComponent";
import Update_personal_data from "../../../components/Modals/candidate/update_personal_data";
import Update_personal_video from "../../../components/Modals/candidate/update_personal_video";
import Display_video from "../../../components/Modals/candidate/display_video";
import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";

import text_editor from "../../../mixins/text_editor";
import {mapActions , mapGetters} from "vuex";
import ShowSectionsData from "../../../components/profile/ShowSectionsData.vue";
import Update_dynamic_box from "../../../components/Modals/candidate/update_dynamic_box.vue";
import Apply_for_job from "~/components/Modals/candidate/apply_for_job.vue";
import AuthorizeControlProfile from "../../../mixins/AuthorizeControlProfile";
import ResendActivation from "../../../components/ResendActivation.vue";
export default {
  name: "candidate",
  components: {
    ResendActivation,
    Apply_for_job,
    Update_dynamic_box,
    ShowSectionsData,
    ProfilePersonalInfoComponent,
    Display_video, Update_personal_video, Update_personal_data, JobComponent
  },

  methods:{
    ...mapActions({
      'sectionsNamesAction':'sections/sectionsNamesAction',
      'get_section_properties':'sections/sectionPropertiesAction',
      'get_section_data':'profile/employee/getDataSection',
      'get_profile_statistics_action':'profile/statistics/getStatisticsProfile',
      'get_resumes_action':'profile/resumes/getDataAction',
      'visit_profile':'profile/visits/visitProfileAction',
      'activate':'profile/activationAccount/activation'
    }),
    confirm_open_model(){
    }

  },
  computed:{
    ...mapGetters({
      'sections_names':'sections/get_sections_names',
      'data_sections':'profile/employee/get_data_sections',
      'statistics_data':'profile/statistics/get_data',
      'jobs_data':'jobs/get_jobs',
      'visitor_obj':'profile/visits/get_visited_user'
    })
  },
  async mounted() {
    // you visit external profile
    if(!this.authorizeControl){
      this.visit_profile(this.current_id);
    }
    // get statistics of my account
    this.get_profile_statistics_action(this.current_id)
    // get jobs for my account
    if(this.$auth.$state.user.role.name !== 'company'){
      this.sectionsNamesAction();
      // latest jobs
      this.$store.dispatch('jobs/getJobsAction','?page=1&empty=true');
    }else{
      // my jobs
      this.$store.dispatch('jobs/getJobsAction','?company_id='+this.$auth.$state.user.id+'&page=1&empty=true')
    }

    if(this.$route.query?.activation){
      // activate account
      await  this.activate(this.$route.query?.activation)
      console.log(this.$auth.$state.user)
      setTimeout(()=>{
        window.location = '/profile/'+this.$auth.user.id
      },2000)


    }
  },
  mixins:[WordsLang,text_editor,AuthorizeControlProfile],
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";


</style>
