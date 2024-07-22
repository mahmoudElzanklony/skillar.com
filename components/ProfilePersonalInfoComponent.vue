<template>
  <div class="personal_info_profile">
    <div class="info">
      <div class="bk">
        <div>
          <img v-if="$auth?.$state?.user?.image"
                           :src="cvApiUrl+'/users/'+$auth?.$state?.user?.image?.name">
          <img v-else src="/images/users/default.png">
          <button class="btn btn-primary" data-bs-toggle="modal"
                  v-if="authorizeControl"
                  data-bs-target="#update_personal_data">{{ edit_info }}</button>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span class="mrl-half"><i class="bi bi-person-circle"></i></span>
            <span>{{ $auth?.$state?.user?.username }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span class="mrl-half"><i class="bi bi-envelope"></i></span>
            <span>{{ $auth?.$state?.user?.email }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span><i class="bi bi-geo-alt"></i></span>
            <span>{{ $auth?.$state?.user?.address }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "./ImageComponent.vue";
import {mapGetters , mapActions ,mapMutations} from "vuex";
import AuthorizeControlProfile from "@/mixins/AuthorizeControlProfile";
export default {
  name: "ProfilePersonalInfoComponent",
  props:['edit_info'],
  mixins:[AuthorizeControlProfile],
  computed:{
    ...mapGetters({
      'feedbacks':'profile/feedbacks/get_data'
    }),
    cvApiUrl(){
      return 'https://cvapi.skillar.com/images'
    }
  },
  methods:{
    ...mapActions({
      'feedbackGetDataAction':'profile/feedbacks/getDataAction'
    }),
    ...mapMutations({
      'setProfileId':'profile/employee/SetProfileId'
    })
  },
  mounted() {
    console.log(this.$auth.$state.user)
    this.setProfileId(this.current_id);
    if(this.feedbacks.length == 0 && document.URL.indexOf('feedback') >= 0){
       this.feedbackGetDataAction(this.current_id);
    }
  },
  components:{ImageComponent}
}
</script>

<style scoped>

</style>
