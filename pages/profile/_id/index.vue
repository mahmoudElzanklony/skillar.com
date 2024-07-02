<template>
  <section class="current_page profile mt-4">
      <div class="container">
          <div class="row">
            <div class="col-lg-9 mb-2">
              <div class="inner_profile pb-3">
                <profile-personal-info-component :edit_info="words.edit_info"></profile-personal-info-component>
                <div class="quick_statistics mb-3 p-3">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 mb-2">
                      <nuxt-link to="/profile/ahmed/applied-jobs">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ words.number_of_applied_jobs }}</p>
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
                            <p class="fw-bold">{{ words.number_of_visiting }}</p>
                            <p class="fw-bold">{{ statistics_data?.views }}</p>
                          </div>
                          <img src="/images/icons/Show.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                      <nuxt-link to="/chat">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ words.number_of_messages_chat }}</p>
                            <p class="fw-bold">{{ statistics_data?.chat }}</p>
                          </div>
                          <img src="/images/icons/Chat.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                      <nuxt-link to="/profile/ahmed/feedbacks">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ words.number_of_friends_feedback }}</p>
                            <p class="fw-bold">{{ statistics_data?.rates }}</p>
                          </div>
                          <img src="/images/icons/Profile.png">
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="col-lg-4 col-md-6 mb-2">
                      <nuxt-link to="/notifications">
                        <div class="statistics d-flex align-items-center justify-content-between">
                          <div>
                            <p class="fw-bold">{{ words.number_of_new_notifications }}</p>
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
                    <ul class="dots-action cursor-pointer d-inline-block">
                      <li class="dots">
                        <i class="bi white bi-three-dots-vertical gray"></i>
                        <ul>
                          <li data-bs-toggle="modal"
                              data-bs-target="#update_personal_video">
                            <span class="gray"><i class="bi bi-pencil-square"></i></span>
                            <span class="gray">{{ words.edit }}</span>
                          </li>
                          <li>
                            <span class="red"><i class="bi bi-trash"></i></span>
                            <span class="gray">{{ words.delete }}</span>
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
                    <span class="fw-bold normal">{{ words.quick_description }}</span>
                    <nuxt-link to="#">{{ words.download_my_cv }}</nuxt-link>
                  </div>
                  <p>{{ $auth?.user?.bio }}</p>
                </div>

                <div class="variety_data" v-if="sections_names.length > 0">
                  <div class="one_variety"
                       v-for="(i,index) in sections_names" :key="index"
                       :name="i.name">
                    <div class="heading d-flex align-items-center justify-content-between">
                      <span class="normal fw-bold">{{ i?.profile_name }}</span>
                      <p class="mb-0">
                        <span class="blue mrl-half" data-bs-toggle="modal"
                              @click="get_section_properties(i['id'])"
                              data-bs-target="#update_dynamic_box"><i class="bi bi-plus"></i></span>
                        <span @click="get_section_data(i['id'])"><i class="bi bi-caret-down-fill"></i></span>
                      </p>
                    </div>
                    <ShowSectionsData :item="i"></ShowSectionsData>
                  </div>

                </div>
                <loader v-else :color="'#0a58ca'" style="text-align: center" size="30px"></loader>

              </div>
            </div>
            <div class="col-lg-3 mb-2">
               <div class="nearest_jobs">
                 <h2 class="fw-bold mb-3">{{ words.popular_jobs }}</h2>
                 <job-component v-for="i in 6" class="mb-3"
                                title="Full stack"
                                company_name="Algorithma"
                                time="30M ago"
                                id="1"
                                :skills="skills"
                                :show_details="words.open"
                                img="/images/companies/1.png"
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

export default {
  name: "candidate",
  components: {
    Update_dynamic_box,
    ShowSectionsData,
    ProfilePersonalInfoComponent,
    Display_video, Update_personal_video, Update_personal_data, JobComponent},
  data(){
    return{
      skills:['php','laravel','oop','design pattern','mysql']
    }
  },
  methods:{
    ...mapActions({
      'sectionsNamesAction':'sections/sectionsNamesAction',
      'get_section_properties':'sections/sectionPropertiesAction',
      'get_section_data':'profile/employee/getDataSection',
      'get_profile_statistics_action':'profile/statistics/getStatisticsProfile',
    }),

  },
  computed:{
    ...mapGetters({
      'sections_names':'sections/get_sections_names',
      'data_sections':'profile/employee/get_data_sections',
      'statistics_data':'profile/statistics/get_data',
    })
  },
  mounted() {
    this.sectionsNamesAction();
    this.get_profile_statistics_action()
  },
  mixins:[WordsLang,text_editor],
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";


</style>
