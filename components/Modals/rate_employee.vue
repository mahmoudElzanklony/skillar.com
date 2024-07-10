<template>
  <!-- Modal of update introduction video -->
  <div class="modal fade" id="rate_employee" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ $parent.$parent.$attrs.words.profile.published_jobs.rate_employee }}</h5>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 checkbox-item flex-wrap">
              <input type="radio" name="request_status">
              <span class="mrl-half">{{ $parent.$parent.$attrs.words.profile.published_jobs.accepted_request }}</span>
            </div>
            <div class="mb-3 checkbox-item flex-wrap">
              <input type="radio" name="request_status">
              <span class="mrl-half">{{ $parent.$parent.$attrs.words.profile.published_jobs.top_best_request }}</span>
            </div>
            <div class="mb-3 checkbox-item flex-wrap">
              <input type="radio" name="request_status">
              <span class="mrl-half">{{ $parent.$parent.$attrs.words.profile.published_jobs.rejected_request }}</span>
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
export default {

}
</script>

