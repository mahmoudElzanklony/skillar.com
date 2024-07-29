<template>
  <div class="dashboard" >
    <div class="container" v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="text-center d-flex justify-content-between mb-3 mt-3" >
        <h1 class="fw-bold blue ">{{ $parent.$attrs.words?.admin?.users?.title }}</h1>
        <button class="btn btn-outline-primary open-box-modal" data-bs-toggle="modal"
                @click="update_item(null)"
                data-bs-target=".modal">{{ $parent.$attrs.words?.general.add_item }}</button>
      </div>

      <form class="infinite_scroll_form" @submit.prevent="filterData">
        <div class="row align-items-end">
          <div class="col-lg-3 col-md-6 col-12 mb-2"
               v-for="(item,index) in $parent.$attrs.words?.admin?.users.filters" :key="index">
            <div class="form-group input-icon flex-wrap">
              <label class="w-100">{{ item?.name }}</label>
              <span><i :class="item?.icon"></i></span>
              <input class="form-control" :type="item?.type" :name="item?.input">
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12 mb-2">
            <div class="form-group input-icon flex-wrap">
              <input class="form-control btn btn-primary w-100"
                     type="submit" :value="$parent.$attrs.words?.general.save">
            </div>
          </div>
        </div>
      </form>

      <table class="table table-hover table-striped text-center
       table-responsive table-bordered infinite_scroll"
             action_path="users/getDataAction" method="get" >
        <thead>
        <tr>
          <td v-for="(column,index) in Object.keys($parent.$attrs.words?.admin?.users?.table)" :key="index">
            {{  $parent.$attrs.words?.admin?.users?.table[column] }}
          </td>
          <td>
            {{ $parent.$attrs.words?.general.control }}
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.getters[$parent.$attrs.words?.admin?.users?.getterPath]"
            :class="'el show tr_'+index"
            :key="index">
          <td v-for="(val,key) in Object.keys($parent.$attrs.words?.admin?.users?.table)"
              :key="key">
            <span v-if="val != 'image'">{{ val.indexOf('_id') >= 0 ? item[val.replace('_id','')]['name'] : item[val] }}</span>
            <img v-else-if="val == 'image'&& item[val]?.name" :src="'https://cvapi.skillar.com/images/users/'+item[val]?.name"></img>
            <span v-else>{{ item[val] }}</span>
          </td>
          <td>
              <span v-tooltip="$parent.$attrs.words?.general.control['edit']"
                    data-bs-toggle="modal"
                    data-bs-target=".modal"
                    @click="update_item(item)"
                    class="mrl-1 cursor-pointer open-box-modal"><i class="bi bi-pencil-square"></i></span>

            <span v-tooltip="$parent.$attrs.words?.general.control['delete']"
                  @click="delete_item('users',item.id,'users','.tr_'+index)"
                  class="red cursor-pointer">
                <i class="bi bi-trash remove-element"></i>
              </span>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Modal of insert of update data -->
      <div class="modal fade" id="update_personal_education" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" >
                {{ $parent.$attrs.words?.general.save_info}}
              </h5>
              <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form v-if="$parent.$attrs.words?.admin?.users?.model"
                    :complete_url="item?.id ? '/'+item?.id:''"
                    @submit.prevent="saveProfileInfoDataAction">
                <input type="hidden" v-if="item?.id" name="id" :value="item?.id">
                <div class="form-group position-relative input-icon flex-wrap mb-2"
                     v-for="(c,index) in Object.keys($parent.$attrs.words?.admin?.users?.model)" :key="index">
                  <label>
                    {{  $parent.$attrs.words?.admin?.users?.model[c]['label'] }}
                  </label>
                  <span><i class="bi bi-info-circle"></i></span>
                  <input class="form-control"
                         :type="$parent.$attrs.words?.admin?.users?.model[c]?.type"
                         :name="$parent.$attrs.words?.admin?.users?.model[c]?.name"
                         :placeholder="$parent.$attrs.words?.admin?.users?.model[c]?.placeholder"
                         :value="item != null && $parent.$attrs.words?.admin?.users?.model[c]['type'] === 'text' ? item[$parent.$attrs.words?.admin?.users?.model[c]?.name]:'' "
                  >
                </div>
                <div class="form-group position-relative input-icon flex-wrap mb-2">
                  <input class="btn btn-primary" type="submit" :value="$parent.$attrs.words?.general.save">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $parent.$attrs.words?.general.close }}</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>


<script>
import delete_item from "@/mixins/delete_item.vue";
import UpdateItem from "../../../mixins/UpdateItem";
import ImageComponent from "../../../components/ImageComponent.vue";
import {mapActions, mapGetters} from "vuex";
import animateData from "../../../mixins/animateData";

export default {
  name: "users",
  components: {ImageComponent},
  layout:"admin",
  mixins:[delete_item,UpdateItem,animateData],
  data(){
    return {
      current_user:null,
      last_item_observed_selector:'.infinite_scroll tbody > tr:last-child'
    }
  },
  async asyncData({store}){
    // clear data first
    store.commit('users/EmptyData')
    // get data action
    await store.dispatch('users/getDataAction','?empty=true&page=1')

  },
  methods:{
    ...mapActions({
      'saveProfileInfoDataAction':'profile/employee/saveProfileInfoDataAction',
    }),
    async filterData(){
      let data = new FormData(event.target);
      let dataTxt = '?';
      for (const [key, value] of data.entries()) {
        // Encode the key and value, and add them to the pairs array
        dataTxt += key +'='+value+'&';
      }
      this.current_page = 1;
      dataTxt += 'page=1';
      this.$store.commit('users/EmptyData')
      this.$store.commit('users/InitializeData',[]);
      await this.$store.dispatch('users/getDataAction',dataTxt);
      this.$store.commit('users/ChangeStatus',true);
      if(document.querySelector(this.last_item_observed_selector)){
        this.lastObserver?.observe(document.querySelector(this.last_item_observed_selector))
      }


    }
  },
  watch:{
    item(val){
      this.current_user = val?.id;
    }
  },
  computed:{
    ...mapGetters({
      'data':'users/get_data'
    })
  },
  async mounted() {
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  }
}
</script>

<style scoped>

</style>
