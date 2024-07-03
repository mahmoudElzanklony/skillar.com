<template>
  <!-- Modal of update personal data -->
  <div class="modal fade" id="update_personal_data" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog"
         v-if="Object.keys($parent.$parent.$attrs).length > 0  &&  Object.keys($parent.$parent.$attrs.words).length > 0">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ $parent.$parent.$attrs.words.profile.main.update_data }}</h5>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveProfileInfoDataAction">
            <div class="variety_data mb-2">
              <div class="one_variety">
                <div class="heading d-flex align-items-center justify-content-between">
                  <span class="normal fw-bold">{{ $parent.$parent.$attrs.words.profile.main.personal_data }}</span>
                  <p class="mb-0">
                    <span><i class="bi bi-caret-down-fill"></i></span>
                  </p>
                </div>

                <div class="row p-2">
                  <div class="col-12 mb-2">
                    <div class="form-group position-relative input-icon flex-wrap">
                      <label>{{ $parent.$parent.$attrs.words.register.username }}</label>
                      <span><i class="bi bi-person-circle"></i></span>
                      <input class="form-control" name="username"
                             :value="$auth?.state?.user?.username" required>
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <div class="form-group position-relative input-icon flex-wrap">
                      <label>{{ $parent.$parent.$attrs.words.register.email }}</label>
                      <span><i class="bi bi-envelope"></i></span>
                      <input class="form-control" name="email"
                             :value="$auth?.state?.user?.email"
                             required>
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <div class="form-group position-relative input-icon flex-wrap">
                      <label>{{ $parent.$parent.$attrs.words.register.password }}</label>
                      <span><i class="bi bi-lock"></i></span>
                      <input class="form-control" name="password"
                             :placeholder="$parent.$parent.$attrs.words.register.leave_password"
                             >
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <div class="form-group position-relative input-icon flex-wrap">
                      <label>{{ $parent.$parent.$attrs.words.register.country }}</label>
                      <span><i class="bi bi-arrow-down-short"></i></span>
                      <select class="form-control" name="country_id">
                        <option value="">{{ $parent.$parent.$attrs.words.general.select_best_choice }}</option>
                        <option value="1" v-for="(i,index) in getCountriesGetter" :key="index" :value="i['id']"
                                :selected="$auth?.state?.user.country_id == i['id']">{{ i['name'] }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <div class="form-group position-relative input-icon flex-wrap">
                      <label>{{ $parent.$parent.$attrs.words.register.address }}</label>
                      <span><i class="bi bi-geo-alt"></i></span>
                      <input class="form-control"
                             :value="$auth?.state?.user?.address"
                             name="address">
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <div class="form-group position-relative input-icon flex-wrap">
                      <label>{{ $parent.$parent.$attrs.words.register.image }}</label>
                      <span><i class="bi bi-image"></i></span>
                      <input class="form-control" name="image" type="file">
                    </div>
                  </div>
                </div>

              </div>
              <div class="one_variety">
                <div class="heading d-flex align-items-center justify-content-between">
                  <span class="normal fw-bold">{{ $parent.$parent.$attrs.words.profile.main.business_data }}</span>
                  <p class="mb-0">
                    <span><i class="bi bi-caret-down-fill"></i></span>
                  </p>
                </div>

                <div class="row p-2">
                  <div class="col-12 mb-2">
                    <label>{{ $parent.$parent.$attrs.words.profile.main.quick_description }}</label>
                    <textarea class="form-control" name="bio" :value="$auth?.state?.user?.bio">{{ $auth?.state?.user?.bio }}</textarea>
                  </div>
                  <div class="col-12 mb-2" v-if="false">
                    <div class="file_upload mb-2">
                      <div>
                        <span class="mrl-1">{{ $parent.$parent.$attrs.words.profile.main.resume }}</span>
                        <span class="gray"><i class="bi bi-cloud-arrow-up"></i></span>
                      </div>
                      <input type="file" name="video" required>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div>
            <div class="mb-2">
                <div class="form-group position-relative input-icon flex-wrap">
                  <input class="btn btn-primary" type="submit" :value="$parent.$parent.$attrs.words.general.save">
                </div>
            </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $parent.$parent.$attrs.words.general.close }}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import WordsLang from "../../../mixins/WordsLang";
import {mapActions , mapGetters} from "vuex";

export default {
  name: "update_personal_data",
  mixins:[WordsLang],
  data(){
    return {
      file_name:'modals/update_personal_data',
    }
  },
  computed:{
    ...mapGetters({
      'getCountriesGetter':'places/countries/getCountriesGetter',
    })
  },
  methods:{
    ...mapActions({
      'saveProfileInfoDataAction':'profile/employee/saveProfileInfoDataAction',
      'getCountriesAction':'places/countries/getCountriesAction',
    })
  },
  created() {
    if(this.getCountriesGetter.length == 0){
      this.getCountriesAction();
    }
  },
}
</script>

<style scoped>

</style>
