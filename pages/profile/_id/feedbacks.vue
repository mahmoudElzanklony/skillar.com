<template>
  <section class="current_page profile profile-feedbacks mt-4">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="row">
        <div class="col-lg-9 mb-2">
          <div class="inner_profile pb-3">
            <profile-personal-info-component :edit_info="$parent.$attrs.words.profile.feedbacks.edit_info"></profile-personal-info-component>

            <div class="variety_data">
              <div class="one_variety" :name="$parent.$attrs.words.profile.feedbacks.friend_feedbacks">
                <div class="heading d-flex align-items-center justify-content-between">
                  <span class="normal fw-bold">{{ $parent.$attrs.words.profile.feedbacks.friend_feedbacks }}</span>
                  <p class="mb-0">
                    <span class="blue mrl-half" >{{ feedbacks.length }}</span>
                    <span><i class="bi bi-caret-up-fill"></i></span>
                  </p>
                </div>
                <div class="data" v-if="feedbacks.length > 0">
                  <div :class="'value box_'+index" v-for="(i,index) in feedbacks" :key="index">
                    <div class="d-flex align-items-center justify-content-between">
                      <image-component
                        :src="'/users/'+i?.sender?.image?.name"></image-component>
                      <div class="mrl-reverse-10">
                        <div class="mb-0 fw-bold d-flex align-items-center justify-content-between">
                          <span>{{ i?.sender?.username }}</span>
                          <ul v-if="authorizeControl" class="dots-action cursor-pointer d-inline-block">
                            <li class="dots">
                              <i class="bi bi-three-dots-vertical gray"></i>
                              <ul>
                                <li
                                  @click="update_status(i?.id)"
                                  v-tooltip="$parent.$attrs.words?.profile?.feedbacks?.accept_apperance_feedback"
                                v-if="i?.status === 'pending'">
                                  <span class="gray"><i class="bi bi-check-lg"></i></span>
                                  <span>{{ $parent.$attrs.words?.profile?.feedbacks?.accept }}</span>
                                </li>
                                <li>
                                  <span class="red"
                                        @click="delete_item('employee_feedbacks',i?.id,'employee_feedbacks','box_'+index)"><i class="bi bi-trash"></i></span>
                                  <span>{{ $parent.$attrs.words.general.delete }}</span>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                        <p class="mb-0 line-height-22">{{ i['info'] }}</p>
                        <p class="mb-0">
                          <span  class="gray">{{ $parent.$attrs.words.general.created_at }}</span>
                          <span class="gray">{{ i?.created_at }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <img v-else class="d-block m-auto" src="/images/no_data.gif">
                <button class="btn btn-primary m-2"
                        data-bs-toggle="modal"
                        data-bs-target="#save_feedback"
                        v-if="get_profile_id != $auth?.state?.user?.id">{{ $parent.$attrs.words.profile.feedbacks.write_feedback }}</button>
              </div>
            </div>

          </div>
        </div>
        <div class="col-lg-3 mb-2">
          <div class="nearest_jobs">
            <h2 class="fw-bold mb-3">{{ $parent.$attrs.words.profile.feedbacks.popular_jobs }}</h2>
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

    <save_feedback></save_feedback>

  </section>
</template>

<script>
import WordsLang from "../../../mixins/WordsLang";
import JobComponent from "../../../components/JobComponent";
import Update_personal_data from "../../../components/Modals/candidate/update_personal_data";
import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";
import {mapGetters , mapActions} from "vuex";
import ImageComponent from "../../../components/ImageComponent.vue";
import delete_item from "../../../mixins/delete_item.vue";
import Save_feedback from "../../../components/Modals/candidate/save_feedback_box.vue";
import AuthorizeControlProfile from "../../../mixins/AuthorizeControlProfile";
export default {
  name: "feedbacks",
  components: {
    Save_feedback,
    ImageComponent,
    ProfilePersonalInfoComponent,
    Update_personal_data,
    JobComponent},
  methods:{
    ...mapActions({
      'update_status':'profile/feedbacks/updateStatusAction',
    }),
  },
  computed:{
    ...mapGetters({
      'feedbacks':'profile/feedbacks/get_data',
      'get_profile_id':'profile/employee/get_profile_id',
      'jobs_data':'jobs/get_jobs'
    })
  },
  mixins:[WordsLang,delete_item,AuthorizeControlProfile],
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.profile.profile-feedbacks{
  .variety_data{
    .one_variety{
      .data{
        display: block;
      }
    }
    .value{
      img{
        max-height: 70px;
        max-width: 70px;
        border: 1px solid #dddddd;
        border-radius: 8px;
      }
      img+div{
        width: calc(100% - 72px);
      }
    }
  }
}
</style>
