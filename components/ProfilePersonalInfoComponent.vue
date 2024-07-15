<template>
  <div class="personal_info_profile">
    <div class="info">
      <div class="bk">
        <div>
          <image-component v-if="visited_user?.image"
                           :src="'/users/'+visited_user?.image.name"></image-component>
          <img v-else src="/images/users/default.png">
          <button class="btn btn-primary" data-bs-toggle="modal"
                  v-if="authorizeControl"
                  data-bs-target="#update_personal_data">{{ $parent.$parent.$attrs.words.general.edit }}</button>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span class="mrl-half"><i class="bi bi-person-circle"></i></span>
            <span>{{ visited_user?.username }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span class="mrl-half"><i class="bi bi-envelope"></i></span>
            <span>{{ visited_user?.email }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span><i class="bi bi-geo-alt"></i></span>
            <span>{{ visited_user?.address }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "./ImageComponent.vue";
import {mapGetters , mapActions ,mapMutations} from "vuex";
import AuthorizeControlProfile from "../mixins/AuthorizeControlProfile";
export default {
  name: "ProfilePersonalInfoComponent",
  props:['edit_info'],
  mixins:[AuthorizeControlProfile],
  computed:{
    ...mapGetters({
      'feedbacks':'profile/feedbacks/get_data',
      'visited_user':'profile/visits/get_visited_user'
    }),
  },
  methods:{
    ...mapActions({
      'feedbackGetDataAction':'profile/feedbacks/getDataAction'
    }),
    ...mapMutations({
      'setProfileId':'profile/employee/SetProfileId'
    })
  },
  async mounted() {
    this.setProfileId(this.current_id);
    if(document.URL.indexOf('feedback') >= 0){
       this.feedbackGetDataAction(this.current_id);
    }
    // get data of visited user info
    this.$store.commit('profile/visits/InitializeVisitedUser',this.$auth.$state.user);
    if(!this.authorizeControl){
        await this.$store.dispatch('profile/visits/getVisitedUserAction',this.current_id)
    }
    // if page not for valid user throw error and go back to colleagues page
    if(this.$store.getters['profile/visits/get_error']){
      this.$router.push('/colleagues')
    }
    // get data of jobs data
    if(this.$auth.$state.user.role.name !== 'company'){
      this.$store.dispatch('jobs/getJobsAction','?page=1&empty=true');
    }else{
      this.$store.dispatch('jobs/getJobsAction','?company_id='+this.current_id+'&page=1&empty=true')
    }
  },
  components:{ImageComponent}
}
</script>

<style scoped>

</style>
