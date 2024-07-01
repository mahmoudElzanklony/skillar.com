<template>
  <div class="personal_info_profile">
    <div class="info">
      <div class="bk">
        <div>
          <image-component v-if="$auth?.state?.user?.image"
                           :src="'/users/'+$auth?.state?.user?.image"></image-component>
          <button class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#update_personal_data">{{ edit_info }}</button>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span class="mrl-half"><i class="bi bi-person-circle"></i></span>
            <span>{{ $auth?.state?.user?.username }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span class="mrl-half"><i class="bi bi-envelope"></i></span>
            <span>{{ $auth?.state?.user?.email }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <p class="d-flex align-items-center">
            <span><i class="bi bi-geo-alt"></i></span>
            <span>{{ $auth?.state?.user?.address }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "./ImageComponent.vue";
export default {
  name: "ProfilePersonalInfoComponent",
  props:['edit_info'],
  components:{ImageComponent}
}
</script>

<style scoped>

</style>
