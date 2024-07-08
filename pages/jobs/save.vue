<template>
  <section class="save_job current_page mt-5">
      <div class="container"  v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
        <form :complete_url="id ? '/'+id:''" @submit.prevent="jobAction">
          <div class="row">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.job_info }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.select_work_field }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                 <label>{{ $parent.$attrs.words.jobs.save_job.job_name }}</label>
                 <input class="form-control" name="name" :value="job_info?.name">
                 <span><i class="bi bi-info"></i></span>
              </div>
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ $parent.$attrs.words.jobs.save_job.job_category }}</label>
                <select class="form-control" name="category_id">
                  <option value="">{{ $parent.$attrs.words.jobs.save_job.select_best_choice }}</option>
                  <option v-for="(i,index) in categories" :key="index" :value="i['id']"
                          :selected="job_info?.category?.id === i?.id">{{ i?.name }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3 input-icon flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.min_experience }}</label>
                    <input class="form-control" name="min_experience" type="number" min="0"
                           :value="job_info?.min_experience"
                           required>
                    <span><i class="bi bi-arrow-up-circle"></i></span>
                  </div>
                </div>
                <div class="col-6 ">
                  <div class="mb-3 input-icon flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.max_experience }}</label>
                    <input class="form-control" name="max_experience" type="number" min="0"
                           :value="job_info?.max_experience"
                           required>
                    <span><i class="bi bi-arrow-down-circle"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.job_requirement }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.job_requirement_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label class="w-100">{{ $parent.$attrs.words.jobs.save_job.short_description }}</label>
                <textarea name="description" class="editor form-control" :value="job_info?.description">{{ job_info?.description }}</textarea>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.job_responsibilities }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.job_responsibilities_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label class="w-100">{{ $parent.$attrs.words.jobs.save_job.job_responsibilities }}</label>
                <textarea name="responsibilities" class="editor form-control" :value="job_info?.responsibilities">{{ job_info?.responsibilities }}</textarea>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.job_skills }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.job_skills_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ $parent.$attrs.words.jobs.save_job.skills }}</label>
                <tags-inputs  class="w-100 d-block" :table="'job_skills'"
                             :data="job_skills"
                             v-model="job_skills"></tags-inputs>

              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.job_location }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.job_location_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ $parent.$attrs.words.jobs.save_job.country }}</label>
                <select class="form-control" name="country_id" @change="citiesAction" required>
                  <option value="">{{ $parent.$attrs.words.jobs.save_job.select_best_choice }}</option>
                  <option v-for="(i,index) in countries" :key="index" :value="i['id']"
                          :selected="job_info?.city?.country_id === i?.id">{{ i['name'] }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
              </div>
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ $parent.$attrs.words.jobs.save_job.city }}</label>
                <select class="form-control" name="city_id" required>
                  <option value="">{{ $parent.$attrs.words.jobs.save_job.select_best_choice }}</option>
                  <option v-for="(i,index) in cities" :key="index" :value="i['id']"
                          :selected="job_info?.city?.id === i?.id"
                  >{{ i['name'] }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.employment_work_time }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.employment_work_time_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 checkbox-item flex-wrap">
                 <input type="radio" name="work_time" value="full_time"
                        :checked="job_info?.work_time === 'full_time'"
                        required>
                 <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.full_time }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_time" value="part_time"
                       :checked="job_info?.work_time === 'part_time'"
                       required>
                <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.part_time }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_time" value="negotiable"
                       :checked="job_info?.work_time === 'negotiable'"
                       required>
                <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.negotiable }}</span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.employment_work_type }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.employment_work_type_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_type" value="from_office"
                       :checked="job_info?.work_type === 'from_office'"
                       required>
                <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.from_office }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_type" value="remotely"
                       :checked="job_info?.work_type === 'remotely'"
                       required>
                <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.remotely }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_type" value="negotiable"
                       :checked="job_info?.work_type === 'negotiable'"
                       required>
                <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.negotiable }}</span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ $parent.$attrs.words.jobs.save_job.employment_work_salary }}</p>
                <p class="gray">{{ $parent.$attrs.words.jobs.save_job.employment_work_salary_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-3 flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.min_salary }}</label>
                    <input class="form-control" type="number" name="min_salary"
                           :value="job_info?.salary !== '' && job_info?.salary?.indexOf(':') > 0 ?
                            job_info?.salary.slice(0,job_info?.salary?.indexOf(':')):''"
                           >
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3 flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.max_salary }}</label>
                    <input class="form-control" type="number" name="max_salary"
                           :value="job_info?.salary !== '' && job_info?.salary?.indexOf(':') > 0 ?
                            job_info?.salary.slice(job_info.salary?.indexOf(':') + 1):''"
                           >
                  </div>
                </div>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="checkbox" class="salary_box" @change="change_salary_type" name="salary"
                       :value="job_info?.salary !== '' && job_info?.salary?.indexOf(':') === -1 ?
                            job_info?.salary:''">
                <span class="mrl-half">{{ $parent.$attrs.words.jobs.save_job.negotiable }}</span>
              </div>
            </div>
          </div>
          <input type="submit" class="btn btn-primary w-100 mt-3" :value="$parent.$attrs.words.jobs.save_job.save">
        </form>
      </div>
  </section>
</template>

<script>
import WordsLang from "../../mixins/WordsLang";
import text_editor from "../../mixins/text_editor";
import NotForClient from "@/mixins/NotForClient";
import {mapActions , mapGetters} from "vuex";

export default {
  name: "job_save",
  mixins:[WordsLang,text_editor,NotForClient],
  async asyncData({store , route , $auth , redirect}){
     if(route?.query?.id){
       // get info of job
       await store.dispatch('jobs/getJobInfoAction',route.query.id+'?has_not_view=true');
       // check authorization of job
       if(!($auth?.$state?.user?.role?.name === 'admin' || $auth?.$state?.id === store.getters['jobs/get_item']['company_id'])){
         redirect('/');
       }
     }
     await store.dispatch('jobs/categories/getDataAction')
     await store.dispatch('places/countries/getCountriesAction')
  },
  data(){
    return {
      id:null,
      job_skills:[]
    }
  },
  mounted() {
    if(document.URL.split('?id=')[1] !== undefined){
      this.id = document.URL.split('?id=')[1]
    }
    if(this?.job_info){
      this.citiesAction(this?.job_info?.city?.country_id);
      // show salary negotiable box
      if(this.job_info.salary === 'negotiable'){
        document.querySelector('.salary_box').click()
      }
    }
  },
  created() {
    if(this?.job_info){
      //get job skills
      this.job_skills = [];
      for(let skill of this.job_info.skills){
        this.job_skills.push({key:skill?.id,value:skill?.title})
      }
    }
  },
  job_skills: {
    handler(newVal, oldVal) {
      console.log('job_skills changed:', newVal);
      // Handle the change as needed
    },
    deep: true,
  },
  computed:{
    ...mapGetters({
      'categories':'jobs/categories/get_data',
      'countries':'places/countries/getCountriesGetter',
      'cities':'places/cities/getCitiesGetter',
      'job_info':'jobs/get_item'
    }),
  },
  methods:{
    ...mapActions({
      'citiesAction':'places/cities/getCitiesInsideCountryAction',
      'jobAction':'jobs/saveDataAction',
    }),
    change_salary_type:function (){
      var parent = event.target.parentElement;
      if(event.target.parentElement.classList.contains('active')){
        setTimeout(()=>{
          parent.classList.remove('active');
        },300);
      }else{
        setTimeout(()=>{
          parent.classList.add('active');
        },300);
      }
      $(event.target.parentElement.previousElementSibling).slideToggle();
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
form{
  >div.row{
    border-bottom: 1px solid #dddddd;
  }
  p{
    margin-bottom: 10px;
  }
}
</style>
