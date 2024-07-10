<template>
  <!-- Modal of update introduction video -->
  <div class="modal fade" id="apply_for_job" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog"
         v-if="Object.keys($parent.$parent.$attrs).length > 0  &&  Object.keys($parent.$parent.$attrs.words).length > 0">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ $parent.$parent.$attrs.words.jobs.apply_box.my_cvs }}</h5>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save_data">
            <div :class="'mb-3 checkbox-item flex-wrap box_'+(index)+(control === true ? ' d-flex justify-content-between':'')"
                 v-for="(i,index) in cvs_data" :key="index">
              <input type="radio" name="user_resume_id" :value="i?.id" v-if="!control">
              <span class="mrl-half">{{ i?.name }}</span>
              <p class="mb-0" v-if="control">
                <a :href="computedSrc+'/pdfs/'+i?.file" target="_blank" class="mx-2"><i class="bi bi-eye"></i></a>
                <span
                  @click="delete_item('users_resumes',i['id'],'users_resumes','box_'+index)"
                  class="red cursor-pointer"><i class="bi bi-trash"></i></span>

              </p>
            </div>
            <div class="form-group position-relative input-icon flex-wrap mb-2" v-if="control">
              <label>{{ $parent.$parent.$attrs.words.register.name }}</label>
              <span><i class="bi bi-info-circle"></i></span>
              <input class="form-control" name="name">
            </div>
            <div class="file_upload mb-2" v-if="control">
              <div>
                <span class="mrl-1">{{ $parent.$parent.$attrs.words.general.upload_file_here }}</span>
                <span class="gray"><i class="bi bi-cloud-arrow-up"></i></span>
              </div>
              <input type="file" name="file" required>
            </div>
            <div class="form-group position-relative input-icon flex-wrap">
              <input class="btn btn-primary" type="submit" :value="$parent.$parent.$attrs.words.general.save">
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
import {mapGetters , mapActions} from "vuex";
import delete_item from "~/mixins/delete_item.vue";
export default {
  name: "apply_for_job",
  props:['control'],
  mixins:[delete_item],
  computed:{
    ...mapGetters({
      'cvs_data':'profile/resumes/get_data',
    }),
    computedSrc() {
      return process.env.baseUrl
    }
  },
  mounted() {

  },
  methods:{
    ...mapActions({
      'save_resume':'profile/resumes/saveDataAction',
      'get_resumes_action':'profile/resumes/getDataAction',
      'apply_job':'profile/applications/applyJobAction'
    }),
    save_data(){
      let data = new FormData(event.target)
      if(this.control){
         this.save_resume(data);
      }else{
        if(this.$route?.params?.id){
          data.append('job_id',this.$route?.params.id);
          this.apply_job(data);
        }
      }
    }
  },
}
</script>

