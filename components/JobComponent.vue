<template>
  <section>

    <div class="job position-relative">

      <ul v-if="admin == 'yes'"
          class="dots-action cursor-pointer d-flex flex-row-reverse">
        <li class="dots">
          <i class="bi bi-three-dots-vertical gray"></i>
          <ul>
            <li>
              <a :href="'/jobs/'+id" target="_blank">
                <span class="gray"><i class="bi bi-eye"></i></span>
                <span class="gray">{{ $parent.$parent.$attrs.words.general.view }}</span>
              </a>
            </li>
            <li>
              <a :href="'/jobs/save?id='+id" target="_blank">
                <span class="gray"><i class="bi bi-pencil-square"></i></span>
                <span class="gray">{{ $parent.$parent.$attrs.words.general.edit }}</span>
              </a>
            </li>
            <li @click="$emit('delete_job',id)">
              <span class="red"><i class="bi bi-trash delete red remove-element"></i></span>
              <span class="gray">{{ $parent.$parent.$attrs.words.general.delete }}</span>
            </li>
          </ul>
        </li>
      </ul>

       <div class="job-header d-flex justify-content-between align-items-center position-relative">
         <img :src="'https://cvapi.skillar.com/images/users/'+img">
          <a v-if="full_url == undefined && admin != 'yes'" target="_blank"
                     :href="'/jobs/'+id" class="btn btn-outline-primary">{{ show_details }}</a>
          <a v-else target="_blank"
             :href="'/jobs/'+id" class="btn btn-outline-primary">{{ show_details }}</a>

        </div>
        <div class="job-body">
          <p class="fw-bold mb-1">
            <a target="_blank" class="black normal"
               :href="'/jobs/'+id">{{ title }}</a>
          </p>
          <ul class="d-flex flex-wrap">
            <li class="mrl-1" v-for="(skill,index) in skills" :key="index">{{ skill?.title }}</li>
          </ul>
        </div>
        <div class="job-footer d-flex align-items-center justify-content-between">
          <p class="fw-bold">{{ company_name }}</p>
          <p class="gray">{{ time }}</p>
        </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "JobComponent",
  props:['full_url','img','title','skills','company_name','time','show_details','id','admin','controls'],

}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.job{
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 10px;
  //box-shadow: 1px 1px 8px 1px #ddd;
  border:1px solid #eee;
  .job-header{
    >ul{
       position: absolute;
       top:10px;
    }
  }
  img{
    height: 40px;
    border-radius: 6px;
    margin-bottom: 10px;
  }
  .job-body{
    height: 130px;
    overflow: auto;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 5px;
    ul{
      list-style-type: disc;
      list-style-position: inside;
      li{
        color:$gray;
        &::marker{
          margin: 0px;
        }
      }
    }
  }
  .job-footer{
    p{
      margin-bottom: 0px;
    }
  }
}
a.black.normal{
  font-size: $normal !important;
}

</style>
