<template>
  <section class="jobs current_page pt-3 pb-3">
      <div class="container">
        <div class="filter mb-3 position-relative">
          <h2 class="d-flex justify-content-between mb-3 align-items-center section-title-control d-sm-none">
            <span class="fw-bold blue">{{ words.filter_jobs }}</span>
            <span class="gray"><i class="bi bi-arrow-down-short"></i></span>
          </h2>
          <form>
            <div class="row align-items-center">
              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group input-icon flex-wrap">
                  <label>{{ words.country }}</label>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                  <select class="form-control" name="country_id">
                      <option>{{ words.select_best_choice }}</option>
                      <option value="1" v-for="i in 10">egypt</option>
                    </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group input-icon flex-wrap">
                  <label>{{ words.city }}</label>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                  <select class="form-control" name="country_id">
                    <option>{{ words.select_best_choice }}</option>
                    <option value="1" v-for="i in 10">cairo</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group input-icon flex-wrap">
                  <label class="w-100">{{ words.work_field }}</label>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                  <select class="form-control" name="country_id">
                    <option>{{ words.select_best_choice }}</option>
                    <option value="1" v-for="i in 5">Programming</option>
                    <option value="1" v-for="i in 5">Teaching</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group input-icon flex-wrap">
                  <label class="w-100">{{ words.job_title }}</label>
                  <span><i class="bi bi-briefcase"></i></span>
                  <input class="form-control" name="job_title">
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group input-icon flex-wrap">
                  <label class="w-100">{{ words.job_type }}</label>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                  <select class="form-control" name="country_id">
                    <option>{{ words.select_best_choice }}</option>
                    <option value="1">Full time</option>
                    <option value="1">Part time</option>
                    <option value="1">Remotely</option>
                  </select>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group input-icon flex-wrap">
                  <label class="w-100">{{ words.experience_type }}</label>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                  <select class="form-control" name="country_id">
                    <option>{{ words.select_best_choice }}</option>
                    <option value="1">Team leader</option>
                    <option value="1">Senior</option>
                    <option value="1">Junior</option>
                  </select>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group">
                  <label class="w-100">{{ words.start_date_posting }}</label>
                  <input type="date" name="start_date" class="form-control">
                </div>
              </div>
              <div class="col-lg-3 col-md-6 mb-2">
                <div class="form-group">
                  <label class="w-100">{{ words.end_date_posting }}</label>
                  <input type="date" name="end_date" class="form-control">
                </div>
              </div>

              <div class="col-lg-3 col-md-6 mb-2 mt-2">
                  <input type="submit" class="btn btn-primary w-100" :value="words.filter">
               </div>
          </div>
          </form>
        </div>
        <div class="current_jobs">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-12" v-for="i in 15">
                <job-component
                  title="Full stack"
                  company_name="Algorithma"
                  time="30M ago"
                  id="1"
                  :skills="skills"
                  :show_details="words.open"
                  img="/images/companies/1.png"
                ></job-component>
              </div>
            </div>
        </div>
      </div>
  </section>
</template>

<script>
import WordsLang from "../../mixins/WordsLang";
import JobComponent from "../../components/JobComponent";
export default {
  name: "jobs",
  components: {JobComponent},
  mixins:[WordsLang],
  data(){
    return {
      skills:['php','laravel','oop','design pattern','mysql']
    }
  },

}
</script>

<style scoped>

</style>
