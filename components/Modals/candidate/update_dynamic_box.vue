<template>
  <div class="modal fade"
       id="update_dynamic_box" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog"
         v-if="Object.keys($parent.$parent.$attrs).length > 0  &&  Object.keys($parent.$parent.$attrs.words).length > 0">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ $parent.$parent.$attrs.words.profile.main.save_data }}
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
                v-if="!(i['type'] == 'date' || i['type'] == 'textarea' || i['type'] == 'select' || index === 0)"><i class="bi bi-info-circle"></i></span>
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
                     v-model="inputs.find((e) => e['id'] === i['id']).val"
                     :type="i['type'] == 'image' ? 'file':i['type']"
                     @blur="blurInput"
                     @keyup="auto_complete(index)"

                     :placeholder="i['placeholder']">
              <input type="hidden" name="type[]"
                     :value="i['type'] == 'image' ? 'image':
                     i['type'] == 'file' ? 'file':'text'">
              <ul v-if="index === 0 && tags.length > 0" class="auto_complete">
                 <li v-for="(tag,ind) in tags"
                     @click="selectThisOption(tag?.value)"
                     :key="ind" >{{ tag?.value }}</li>
              </ul>
            </div>

            <div class="form-group position-relative input-icon flex-wrap mb-2">
              <input class="btn btn-primary" type="submit" :value="$parent.$parent.$attrs.words.general.save">
            </div>
          </form>
          <loader v-else :color="'#0a58ca'" style="text-align: center" size="30px"></loader>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $parent.$parent.$attrs.words.general.close }}</button>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import {mapActions ,  mapGetters} from "vuex";
import $ from "jquery";

export default {
  name:'update_dynamic_box',
  data(){
    return {
      inputs:[],
      auto_complete_types:['skills','interests','knowledge','abilities']
    }
  },
  watch:{
    section_attributes(val){
      this.inputs = [];
      if(val != null) {
        this.inputs = this?.section_attributes?.attributes?.map(function (e) {
          return {id: e.id, val: ''}
        })
      }
      if(this.get_answers_section) {
        for (let input of this.inputs) {
          input.val = this.get_answers_section.find((e) => e?.attribute?.id == input['id'])?.answer
        }
      }
    },
  },
  methods:{
    ...mapActions({
      'save_data':'profile/employee/saveSectionInfoDataAction',
      'tags_input':'tags_input/getTags'
    }),
    blurInput(){
      $('.auto_complete').slideUp();
    },
    async auto_complete(index){
       if(index === 0){
         let table_name = this.section_attributes?.profile_name?.toLowerCase();
         if(this.auto_complete_types.includes(table_name)){
           await this.tags_input({table:table_name,search:event.target.value})
         }
         if(this.tags.length > 0){
           $('.auto_complete').slideDown();
         }
       }else{
         $('.auto_complete').slideUp();
       }
    },
    selectThisOption(val){
      $(event.target).parent().parent().find('.form-control').val(val);
      $('.auto_complete').slideUp();
    }
  },
  computed:{
     ...mapGetters({
       'section_attributes':'sections/get_section_properties',
       'get_answers_section':'profile/employee/get_selected_section_box_info',
       'tags':'tags_input/getData'
     })
  },
  mounted() {

  }
}
</script>



<style scoped lang="scss">
.auto_complete{
  width: 100%;
  max-height: 120px;
  overflow: auto;
  background-color: #58585821;
  margin: 10px 0px;
  border-radius: 5px;
  li{
    padding: 10px;
    border-bottom: 1px solid #dddddd;
    transition: 0.5s all;
    cursor: pointer;
    &:hover{
      padding-right: 30px;
      padding-left: 40px;
    }
  }
}
</style>
