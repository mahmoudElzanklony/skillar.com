<template>
  <section class="save_job current_page mt-5" >
      <div class="container"  v-if="Object.keys($parent?.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
        <ResendActivation></ResendActivation>
        <form
          v-if="$auth.$state.user?.email_verified_at != null"
          :complete_url="id ? '/'+id:''" @submit.prevent="jobAction">
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
                 <input class="form-control" name="name" v-model="job_data.name">
                 <span><i class="bi bi-info"></i></span>
                 <p class="alert alert-danger"></p>
              </div>
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ $parent.$attrs.words.jobs.save_job.job_category }}</label>
                <select class="form-control" name="category_id">
                  <option value="">{{ $parent.$attrs.words.jobs.save_job.select_best_choice }}</option>
                  <option v-for="(i,index) in categories" :key="index" :value="i['id']"
                          :selected="job_info?.category?.id === i?.id">{{ i?.name }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
                <p class="alert alert-danger"></p>

              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3 input-icon flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.min_experience }}</label>
                    <input class="form-control" name="min_experience" type="number" min="0"
                           v-model="job_data.min_experience"
                           required>
                    <span><i class="bi bi-arrow-up-circle"></i></span>
                    <p class="alert alert-danger"></p>

                  </div>
                </div>
                <div class="col-6 ">
                  <div class="mb-3 input-icon flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.max_experience }}</label>
                    <input class="form-control" name="max_experience" type="number" min="0"
                           v-model="job_data.max_experience"
                           required>
                    <span><i class="bi bi-arrow-down-circle"></i></span>
                    <p class="alert alert-danger"></p>

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
                <textarea name="description" class="editor form-control" v-html="job_data.description"></textarea>
                <p class="alert alert-danger"></p>
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
                <textarea name="responsibilities" class="editor form-control" v-html="job_data.responsibilities" ></textarea>
                <p class="alert alert-danger"></p>
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
                <input type="radio" name="work_type" value="office"
                       :checked="job_info?.work_type === 'office'"
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
                           v-model="computedMinSalary"
                           >
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3 flex-wrap">
                    <label>{{ $parent.$attrs.words.jobs.save_job.max_salary }}</label>
                    <input class="form-control" type="number" name="max_salary"
                           v-model="computedMaxSalary"
                           >
                  </div>
                </div>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="checkbox" class="salary_box" @change="change_salary_type" name="salary"
                       :checked="job_info?.salary === 'negotiable' || job_info.salary == '' || job_info.salary  == ':'"
                       value="negotiable">
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
import ResendActivation from "../../components/ResendActivation.vue";

export default {
  name: "job_save",
  components: {ResendActivation},
  mixins:[WordsLang,text_editor,NotForClient],
  async fetch({store , route , $auth , redirect}){
    if(route?.query?.id){
       // get info of job
       try{
         await store.dispatch('jobs/getJobInfoAction',route.query.id+'?has_not_view=true');
         // check authorization of job
         if(!($auth?.$state?.user?.role?.name === 'admin' || route?.query?.id === store.getters['jobs/get_item']['company_id'])){
           redirect('/');
         }
       }catch (e){
         redirect('/jobs');
       }
     }
      await store.dispatch('jobs/categories/getDataAction')
      await store.dispatch('places/countries/getCountriesAction')
  },
  data(){
    return {
      id:null,
      job_skills:[],
      job_data:{},
    }
  },
  mounted() {
    if(document.URL.split('?id=')[1] !== undefined){
      this.id = document.URL.split('?id=')[1]
    }

    if(this?.job_info){
      this.citiesAction(this?.job_info?.city?.country_id);
      this.job_data = {...this.job_info}
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
    computedMinSalary:{
      get() {
        if (this.job_data?.salary && this.job_data.salary !== '' && this.job_data.salary.indexOf(':') > 0) {
          return this.job_data.salary.slice(0, this.job_data.salary.indexOf(':'));
        } else {
          return '';
        }
      },
      set(newValue) {
        this.job_data.salary = newValue +':'+ this.job_data.salary.slice(this.job_data.salary.indexOf(':') + 1);
      }
    },
    computedMaxSalary:{
      get() {
        if (this.job_data?.salary && this.job_data.salary !== '' && this.job_data.salary.indexOf(':') > 0) {
          return this.job_data.salary.slice(this.job_data.salary.indexOf(':') +  1);
        } else {
          return '';
        }
      },
      set(newValue) {
        this.job_data.salary = this.computedMinSalary +':'+newValue;
      }
    }
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
  .alert-danger{
    display: none;
  }
  >div.row{
    border-bottom: 1px solid #dddddd;
  }
  p{
    margin-bottom: 10px;
  }
}
</style>
