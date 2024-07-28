<template>
  <section class="job_details current_page">
    <div v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="container" >
        <div class="row">
          <div class="col-lg-8 col-md-6 mb-3">
            <div class="description box-shadow">
              <div class="image">
                <image-component :src="'/users/'+job_info?.company?.image?.name"></image-component>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <p class="fw-bold">{{ job_info?.name }}</p>
                <button class="btn btn-primary"
                        v-if="job_info?.status === 'open' && $auth.$state.user && $auth.$state.user?.role.name !== 'company' && application_info === null"
                        data-bs-toggle="modal"
                        @click="get_my_cvs_action"
                        data-bs-target="#apply_for_job">{{ $parent?.$attrs?.words?.jobs?.details.apply_job }}</button>
                <span v-if="job_info?.status !== 'open'" :class="'badge bg-'+(job_info?.status === 'hired' ? 'success':'dark')">{{ job_info?.status }}</span>

              </div>
              <p>
                <span class="gray" v-html="job_info.description"></span>
              </p>

              <p v-if="false">
                <span class="gray d-none toggle-show" v-html="job_info.description"></span>
              </p>
              <p class=" toggle_p_show" v-if="false">
                    <span class="blue cursor-pointer small"
                          :show="$parent.$attrs.words.profile.main.show_more"
                          :hide="$parent.$attrs.words.profile.main.show_less">{{ $parent.$attrs.words.profile.main.show_more }}</span>
              </p>

              <div class="another_info">
                <ul>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-info"></i></span>
                    <span>{{ job_info?.company?.username }}</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-people"></i></span>
                    <span>{{ $parent?.$attrs?.words?.jobs?.details.employees_number_at_company }}</span>
                    <span> {{ job_info.applicants.length }} </span><span>{{ $parent?.$attrs?.words?.jobs?.details.employee }}</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-briefcase"></i></span>
                    <span>{{ $parent?.$attrs?.words?.jobs?.details.job_way }}</span>
                    <span>{{ (job_info.work_type) }}</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-geo-alt"></i></span>
                    <span>{{ job_info.city.name }} , {{ job_info.city.country.name }}</span>
                  </li>
                  <li class="mb-2">
                    <span class="gray mrl-half"><i class="bi bi-calendar"></i></span>
                    <span>{{ job_info.published }}</span>
                  </li>
                </ul>
              </div>
              <div class="job_application">
                <p v-if="application_info" :class="'d-flex justify-content-between alert alert-'+(application_info?.status === 'pending' ? 'dark':application_info?.status === 'rejected' ? 'danger':'success')">
                  <span>{{ $parent?.$attrs?.words?.jobs?.details.your_applied_this_job }}</span>
                  <span :class="'badge  bg-'+(application_info?.status === 'pending' ? 'dark':application_info?.status === 'rejected' ? 'danger':'success')">{{ application_info?.status?.replace('_',' ') }}</span>
                </p>
              </div>
              <p class="fw-bold">{{ $parent?.$attrs?.words?.jobs?.save_job.job_responsibilities }}</p>
              <p class="gray end-border-bottom" v-html="job_info.responsibilities"></p>
              <div class="skills">
                <p class="fw-bold">{{ $parent?.$attrs?.words?.jobs?.details.required_skills }}</p>
                <ul class="d-flex align-items-center flex-wrap">
                  <li v-for="(i,index) in job_info?.skills" :key="index" class="mrl-half mb-2"><span>{{ i?.title }}</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="statistics box-shadow mb-3">
              <div class="mb-3 d-flex statistics_type align-items-center flex-wrap justify-content-between end-border-bottom">
                <p class="mb-1">
                  <span class="top-3 position-relative gray"><i class="bi bi-eye"></i></span>
                  <span>{{ $parent?.$attrs?.words?.jobs?.details.no_seen }}</span>
                </p>
                <span class="fw-bold">{{ job_info?.views }}</span>
                <div class="percentage w-100 progress">
                  <p :style="(job_info?.views <= 1000 ? 'width: '+(job_info.views * 10 / 100)+'%':'width:100%')" class="progress-bar progress-bar-animated progress-bar-striped"></p>
                </div>
              </div>
              <div class="mb-3 d-flex statistics_type align-items-center flex-wrap justify-content-between end-border-bottom">
                <p class="mb-1">
                  <span class="top-3 position-relative gray"><i class="bi bi-people"></i></span>
                  <span>{{ $parent?.$attrs?.words?.jobs?.details.no_people_applied }}</span>
                </p>
                <span class="fw-bold">{{ job_info?.applicants.length }}</span>
                <div class="percentage w-100 progress">
                  <p :style="(job_info?.applicants.length <= 1000 ? 'width: '+(job_info.applicants.length * 10 / 100)+'%':'width:100%')" class="progress-bar progress-bar-animated progress-bar-striped"></p>
                </div>
              </div>
              <div class="mb-3 d-flex statistics_type align-items-center flex-wrap justify-content-between end-border-bottom">
                <p class="mb-1">
                  <span class="top-3 position-relative gray"><i class="bi bi-person-check"></i></span>
                  <span>{{ $parent?.$attrs?.words?.jobs?.details.matching_job_profile }}</span>
                </p>
                <span class="fw-bold">90%</span>
                <div class="percentage w-100 progress">
                  <p style="width: 90%" class="progress-bar progress-bar-animated progress-bar-striped"></p>
                </div>
              </div>
            </div>
            <div class="similar_jobs box-shadow">
              <p class="fw-bold">{{ $parent?.$attrs?.words?.jobs?.details.similar_jobs }}</p>
              <div class="mb-3" v-for="(i,index) in jobs" :key="index">
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
          </div>
        </div>
      </div>
      <apply_for_job></apply_for_job>
    </div>
  </section>
</template>

<script>
import apply_for_job from "@/components/Modals/candidate/apply_for_job.vue";
import {mapActions , mapGetters} from "vuex";
import filterJobs from "@/mixins/FilterJobs";
export default {
  name: "job_id",
  async asyncData({store , route , $auth}){
    await store.dispatch('jobs/getJobInfoAction',route.params.id);
    let filters = '?name='+store.getters['jobs/get_item'].name+'&nid='+store.getters['jobs/get_item'].id+'&page=1';
    await store.dispatch('jobs/getJobsAction',filters);
    if($auth.$state.user){
      await store.dispatch('profile/applications/getSpecificOneAction',store.getters['jobs/get_item'].id);
    }

  },
  mixins:[filterJobs],
  data(){
    return {
      file_name:'job_details',
    }
  },
  validate({params}){
    return !(isNaN(params.id));
  },
  computed:{
    ...mapGetters({
      'job_info':'jobs/get_item',
      'jobs':'jobs/get_jobs',
      'application_info':'profile/applications/get_item'
    })
  },
  methods:{
    ...mapActions({
      'get_my_cvs_action':'profile/resumes/getDataAction'
    })
  },
  components:{apply_for_job},
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.job_details{
  background-color: $main_color_more_white_bk;
  padding: 20px 0px;
  .description{
    background-color: white;
    padding: 15px;
    box-shadow: 1px 1px 6px 1px #ddd;
    border-radius: 8px;
    .image{
      margin-bottom: 10px;
      img{
        height: 50px;
      }
    }
    >p{
      margin-bottom: 10px;
    }
    >p:last-of-type{
      span,button{
        font-size: $button;
      }
    }
    .another_info{
      ul{
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        padding-bottom: 10px;
      }
    }
    .skills{
      ul{
        li{
          border: 1px solid $main_color;
          border-radius: 15px;
          padding: 5px 10px;
          transition: 0.5s all;
          &:hover{
            background-color: $main_color;
          }
          &:hover span{
            color:white;
          }
        }
      }
    }
  }
  .statistics{
    .statistics_type{
      p{
        margin-bottom: 0px;
      }
      p:first-of-type{
        span:first-of-type{
          color:$gray;
        }
      }
      .percentage{
        height: 10px;
        p{
          background-image: linear-gradient(45deg, #0a58ca, transparent);
        }
      }
    }
  }
  .similar_jobs{
    max-height: 550px;
    overflow: auto;
  }
}
</style>
