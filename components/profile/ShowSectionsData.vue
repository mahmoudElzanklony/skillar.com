<template>

  <div class="data" >
    <div :class="'value box_'+index" v-for="(i,index) in getDataForSpecificSec(item.id)" :key="index">
      <div class="mb-0">
        <div class="d-flex align-items-center">
          <span class="mrl-1 big">
            <i :class="'bi '+(get_specific_class(item?.en_name?.toLowerCase()))"></i>
          </span>
          <div class="max-width">
            <div class="d-flex align-items-center mb-0 max-width flex-row-reverse">
              <ul class="dots-action cursor-pointer d-inline-block">
                <li class="dots">
                  <i class="bi gray bi-three-dots-vertical gray"></i>
                  <ul>
                    <li data-bs-toggle="modal"
                        @click="get_section_properties(item['id']);
                        get_selected_box_info(i['items'])"
                        data-bs-target="#update_dynamic_box"
                       >
                      <span class="gray"><i class="bi bi-pencil-square"></i></span>
                      <span class="gray">{{ $parent.words.edit }}</span>
                    </li>
                    <li @click="delete_item('employee_profile_sections_data',item.id,'employee_profile_sections_data','.box_'+index)">
                      <span class="red"><i class="bi bi-trash"></i></span>
                      <span class="gray">{{ $parent.words.delete }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <p
               :title="val['attribute']['label']"
               v-for="(val,index) in i['items']" :key="index"
                :class="'mb-0 gray small '+(index == 0 ? 'black  fw-bold top-reverse-20':'')">
              <span  v-if="index <= 2" :class="(index > 0) ? 'gray':''">
                {{ val['answer'] }}
              </span>
              <span  v-else-if="index >= 3" class="gray d-none toggle-show">{{ val['answer'] }}</span>
            </p>
            <p class="mb-0 toggle_p_show">
              <span class="blue cursor-pointer small"
                    :show="$parent.words.show_more"
                    :hide="$parent.words.show_less">{{ $parent.words.show_more }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {mapActions, mapGetters , mapMutations} from "vuex";
import delete_item from "../../mixins/delete_item.vue";
export default {
    name:'ShowSectionsData',
    props:['item'],
    mixins:[delete_item],
    data(){
      return {
        sections_classes : [
          {
            name:'education',
            class:'bi-buildings',
          },
          {
            name:'experience',
            class:'bi-stars',
          },
          {
            name:'skill',
            class:'bi-star',
          },
          {
            name:'language',
            class:'bi-translate',
          },
          {
            name:'project',
            class:'bi-stack',
          },
          {
            name:'interest',
            class:'bi-heart',
          },
          {
            name:'certificate',
            class:'bi-patch-check',
          },
          {
            name:'course',
            class:'bi-book',
          },
          {
            name:'organization',
            class:'bi-building-gear',
          },
          {
            name:'publication',
            class:'bi-journals'
          },
          {
            name:'reference',
            class:'bi-person-vcard'
          },
          {
            name: 'declaration',
            class: 'bi-card-text',
          }
        ]
      }
    },
    computed:{
      ...mapGetters({
        'get_data_sections':'profile/employee/get_data_sections'
      }),
    },
    methods:{
      ...mapMutations({
        'get_selected_box_info':'profile/employee/InitializeSelectedSectionBoxInfo'
      }),
      ...mapActions({
        'get_section_properties':'sections/sectionPropertiesAction',
      }),
      getDataForSpecificSec(sec_id){
        if(this.get_data_sections.length > 0){
         let output =  this.get_data_sections.find((e)=> e['id'] === sec_id);
         return output?.data;
        }
        return [];
      },
      get_specific_class(name){
        let class_name = this.sections_classes.find((e)=>e.name === name)
        if(class_name != null){
          return class_name.class
        }
        return 'bi-info';
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
