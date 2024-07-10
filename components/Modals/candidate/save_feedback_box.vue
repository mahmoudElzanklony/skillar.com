<template>
  <!-- Modal of update introduction video -->
  <div class="modal fade" id="save_feedback" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $parent.$parent.$attrs.words.profile.feedbacks.save_feedback }}
          </h5>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="save_feedback">
            <div class="form-group position-relative input-icon flex-wrap mb-2">
              <label>{{ $parent.$parent.$attrs.words.profile.feedbacks.feedback }}</label>
              <span><i class="bi bi-info-circle"></i></span>
              <textarea class="form-control" name="info" required></textarea>
            </div>
            <div class="form-group position-relative input-icon flex-wrap mb-2">
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
import {mapActions} from "vuex";
import WordsLang from "../../../mixins/WordsLang";
export default {
  name: "save_feedback",
  data(){
    return {
      file_name:'modals/save_feedback_box',
    }
  },
  methods:{
    ...mapActions({
      'save_feedback':'profile/feedbacks/saveDataAction',
    })
  },
  mixins:[WordsLang],
}
</script>

