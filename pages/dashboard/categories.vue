<template>
  <div class="dashboard" >
    <div class="container" v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="text-center d-flex justify-content-between mb-3 mt-3" >
        <h1 class="fw-bold blue ">{{ $parent.$attrs.words?.admin?.categories?.title }}</h1>
        <button class="btn btn-outline-primary open-box-modal" data-bs-toggle="modal"
                @click="update_item(null)"
                data-bs-target=".modal">{{ $parent.$attrs.words?.general.add_item }}</button>
      </div>

      <table class="table table-hover table-striped text-center table-responsive table-bordered" >
        <thead>
        <tr>
          <td v-for="(column,index) in Object.keys($parent.$attrs.words?.admin?.categories?.table)" :key="index">
            {{  $parent.$attrs.words?.admin?.categories?.table[column] }}
          </td>
          <td>
            {{ $parent.$attrs.words?.general.control }}
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in $store.getters[$parent.$attrs.words?.admin?.categories?.getterPath]"
            :class="'tr_'+index"
            :key="index">
          <td v-for="(val,key) in Object.keys($parent.$attrs.words?.admin?.categories?.table)"
              :key="key">
            <span>{{ item[val] }}</span>
          </td>
          <td>
              <span v-tooltip="$parent.$attrs.words?.general.control['edit']"
                    data-bs-toggle="modal"
                    data-bs-target=".modal"
                    @click="update_item(item)"
                    class="mrl-1 cursor-pointer open-box-modal"><i class="bi bi-pencil-square"></i></span>

            <span v-tooltip="$parent.$attrs.words?.general.control['delete']"
                  @click="delete_item('jobs_categories',item.id,'jobs_categories','.tr_'+index)"
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
              <form v-if="$parent.$attrs.words?.admin?.categories?.model"
                    :complete_url="item?.id ? '/'+item?.id:''"
                    @submit.prevent="$store.dispatch($parent.$attrs.words?.admin?.categories?.savePath)">
                <div class="form-group position-relative input-icon flex-wrap mb-2"
                     v-for="(c,index) in Object.keys($parent.$attrs.words?.admin?.categories?.model)" :key="index">
                  <label>
                    {{  $parent.$attrs.words?.admin?.categories?.model[c]['label'] }}
                  </label>
                  <span><i class="bi bi-info-circle"></i></span>
                  <input class="form-control"
                         :type="$parent.$attrs.words?.admin?.categories?.model[c]['type']"
                         :name="$parent.$attrs.words?.admin?.categories?.model[c]['name']" >
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
import UpdateItem from "../../mixins/UpdateItem";

export default {
  name: "categories",
  layout:"admin",
  mixins:[delete_item,UpdateItem],
  mounted() {
    // clear data first
    this.$store.commit(this.$parent.$attrs.words?.admin?.categories?.emptyPath)
    // get data action
    this.$store.dispatch(this.$parent.$attrs.words?.admin?.categories?.actionPath,true)
  }
}
</script>

<style scoped>

</style>
