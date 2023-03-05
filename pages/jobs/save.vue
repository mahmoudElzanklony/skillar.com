<template>
  <section class="save_job current_page mt-5">
      <div class="container">
        <form>
          <div class="row">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.job_info }}</p>
                <p class="gray">{{ words.select_work_field }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                 <label>{{ words.job_name }}</label>
                 <input class="form-control" name="name">
                 <span><i class="bi bi-info"></i></span>
              </div>
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ words.job_category }}</label>
                <select class="form-control" name="category_id">
                  <option value="">{{ words.select_best_choice }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
              </div>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3 input-icon flex-wrap">
                    <label>{{ words.min_experience }}</label>
                    <input class="form-control" name="min_experience">
                    <span><i class="bi bi-arrow-up-circle"></i></span>
                  </div>
                </div>
                <div class="col-6 ">
                  <div class="mb-3 input-icon flex-wrap">
                    <label>{{ words.max_experience }}</label>
                    <input class="form-control" name="max_experience">
                    <span><i class="bi bi-arrow-down-circle"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.job_requirement }}</p>
                <p class="gray">{{ words.job_requirement_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label class="w-100">{{ words.short_description }}</label>
                <textarea class="editor form-control" required></textarea>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.job_skills }}</p>
                <p class="gray">{{ words.job_skills_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ words.skills }}</label>
                <input class="form-control">
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.job_location }}</p>
                <p class="gray">{{ words.job_location_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ words.country }}</label>
                <select class="form-control" name="country_id">
                  <option value="">{{ words.select_best_choice }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
              </div>
              <div class="mb-3 input-icon flex-wrap">
                <label>{{ words.city }}</label>
                <select class="form-control" name="city_id">
                  <option value="">{{ words.select_best_choice }}</option>
                </select>
                <span><i class="bi bi-arrow-down"></i></span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.employment_work_time }}</p>
                <p class="gray">{{ words.employment_work_time_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 checkbox-item flex-wrap">
                 <input type="radio" name="work_time">
                 <span class="mrl-half">{{ words.full_time }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_time">
                <span class="mrl-half">{{ words.part_time }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_time">
                <span class="mrl-half">{{ words.negotiable }}</span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.employment_work_type }}</p>
                <p class="gray">{{ words.employment_work_type_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_type">
                <span class="mrl-half">{{ words.from_office }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_type">
                <span class="mrl-half">{{ words.remotely }}</span>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="radio" name="work_type">
                <span class="mrl-half">{{ words.negotiable }}</span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
              <div>
                <p class="fw-bold black">{{ words.employment_work_salary }}</p>
                <p class="gray">{{ words.employment_work_salary_info }}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-lg-6">
                  <div class="mb-3 flex-wrap">
                    <label>{{ words.min_salary }}</label>
                    <input class="form-control" type="number" name="min_salary">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="mb-3 flex-wrap">
                    <label>{{ words.max_salary }}</label>
                    <input class="form-control" type="number" name="min_salary">
                  </div>
                </div>
              </div>
              <div class="mb-3 checkbox-item flex-wrap">
                <input type="checkbox" @change="change_salary_type" name="work_type">
                <span class="mrl-half">{{ words.negotiable }}</span>
              </div>
            </div>
          </div>
          <input type="submit" class="btn btn-primary w-100 mt-3" :value="words.save">
        </form>
      </div>
  </section>
</template>

<script>
import WordsLang from "../../mixins/WordsLang";
import $ from 'jquery';
export default {
  name: "job_save",
  mixins:[WordsLang],
  methods:{
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
  data(){
    return {
      skills:['php','laravel','oop','design pattern','mysql']
    }
  },
  created() {
    console.log(this.$route);
  }
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
