<template>
  <div class="modal fade" id="update_dynamic_box" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $parent.words.save_data }}
            ({{ section_attributes?.name }})
          </h5>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form
            @submit.prevent="save_data"
            v-if="section_attributes != null">
              <input type="hidden" name="profile_section_id"
                     v-if="get_answers_section != null" :value="get_answers_section[0]?.employee_profile_section_id">
              <input type="hidden" name="section_id" :value="section_attributes['id']">
              <div class="form-group position-relative input-icon flex-wrap mb-2"
                v-for="(i,index) in section_attributes['attributes']" :key="index"
              >
              <input type="hidden" :name="'id[]'"
                     v-if="get_answers_section != null"
                     :value="get_answers_section != null ?
                     get_answers_section.find((e)=> e?.attribute?.id == i['id'])?.id:''">

              <input type="hidden" :name="'attribute_id[]'" :value="i['id']">
              <label>{{ i['label'] }}</label>
              <span
                v-if="!(i['type'] == 'date' || i['type'] == 'textarea' || i['type'] == 'select')"><i class="bi bi-info-circle"></i></span>
              <textarea class="form-control editor"
                        v-if="i['type'] == 'textarea'"
                        name="answer[]"
                        :value="get_answers_section != null ?
                     get_answers_section.find((e)=> e?.attribute?.id == i['id'])?.answer:''"
                        :placeholder="i['placeholder']">

              </textarea>

              <select class="form-control"
                      v-else-if="i['type'] == 'select'"
                      name="answer[]" :type="i['type']"
                      :placeholder="i['placeholder']"></select>
              <input v-else class="form-control" name="answer[]"
                     :type="i['type'] == 'image' ? 'file':i['type']"
                     :value="get_answers_section != null ?
                     get_answers_section.find((e)=> e?.attribute?.id == i['id'])?.answer:''"
                     :placeholder="i['placeholder']">
              <input type="hidden" name="type[]"
                     :value="i['type'] == 'image' ? 'image':
                     i['type'] == 'file' ? 'file':'text'">
            </div>

            <div class="form-group position-relative input-icon flex-wrap mb-2">
              <input class="btn btn-primary" type="submit" :value="$parent.words.save">
            </div>
          </form>
          <loader v-else :color="'#0a58ca'" style="text-align: center" size="30px"></loader>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $parent.words.close }}</button>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import {mapActions ,  mapGetters} from "vuex";

export default {
  name:'update_dynamic_box',
  methods:{
    ...mapActions({
      'save_data':'profile/employee/saveSectionInfoDataAction'
    })
  },
  computed:{
     ...mapGetters({
       'section_attributes':'sections/get_section_properties',
       'get_answers_section':'profile/employee/get_selected_section_box_info'

     })
  }
}
</script>



<style scoped lang="scss">

</style>
