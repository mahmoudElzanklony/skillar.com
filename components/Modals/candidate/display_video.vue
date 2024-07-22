<template>
  <!-- Modal of update introduction video -->
  <div class="modal fade" id="display_introduction_video" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ $parent.$parent.$attrs.words.profile.main.display_video }}</h5>
          <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
           <video class="w-100" v-if="get_video?.file"
                  style="max-height: 400px;"
                  controls loop autoplay
                  :src="computedUrl+'/videos/users/'+get_video?.file"></video>
          <img class="w-75 d-block m-auto" v-else src="/images/no_data.gif">
          <p v-if="!get_video?.file" class="text-center gray">{{ $parent.$parent.$attrs.words.profile.main.not_founded_video_to_display }}</p>
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
  name: "display_video",
  mixins:[WordsLang],
  created() {
    if(this.get_video == null){
      this.getVideoAction()
    }
  },
  mounted() {
    console.log(this.get_video)
  },
  methods:{
    ...mapActions({
      'getVideoAction':'profile/video/getDataAction'
    })
  },
  computed:{
    ...mapGetters({
      'get_video':'profile/video/get_video_data'
    }),
    computedUrl() {
      return process.env.baseUrl
    }
  },
  data(){
    return {
      file_name:'modals/display_personal_video',
    }
  },
}
</script>

