<template>

  <form class="infinite_scroll_form" method="get" @submit.prevent="submitData">
    <div class="row align-items-center" v-if="Object.keys($parent.$parent.$attrs).length > 0  &&  Object.keys($parent.$parent.$attrs.words.jobs.main).length > 0">
      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label>{{ $parent.$parent.$attrs.words.jobs.main.category }}</label>
          <span><i class="bi bi-arrow-down-short"></i></span>
          <select class="form-control" name="category_id">
            <option value="">{{ $parent.$parent.$attrs.words.jobs.main.select_best_choice }}</option>
            <option value="1" v-for="(i,index) in categories" :key="index" :value="i['id']">{{ i['name'] }}</option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label>{{ $parent.$parent.$attrs.words.jobs.main.country }}</label>
          <span><i class="bi bi-arrow-down-short"></i></span>
          <select class="form-control" name="country_id" @change="citiesAction">
            <option value="">{{ $parent.$parent.$attrs.words.jobs.main.select_best_choice }}</option>
            <option value="1" v-for="(i,index) in countries" :key="index" :value="i['id']">{{ i['name'] }}</option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label>{{ $parent.$parent.$attrs.words.jobs.main.city }}</label>
          <span><i class="bi bi-arrow-down-short"></i></span>
          <select class="form-control" name="city_id">
            <option value="">{{ $parent.$parent.$attrs.words.jobs.main.select_best_choice }}</option>
            <option value="1" v-for="(i,index) in cities" :key="index" :value="i['id']">{{ i['name'] }}</option>
          </select>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label class="w-100">{{ $parent.$parent.$attrs.words.jobs.main.job_title }}</label>
          <span><i class="bi bi-briefcase"></i></span>
          <input class="form-control" name="name">
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label class="w-100">{{ $parent.$parent.$attrs.words.jobs.main.work_time }}</label>
          <span><i class="bi bi-arrow-down-short"></i></span>
          <select class="form-control" name="work_time">
            <option value="">{{ $parent.$parent.$attrs.words.jobs.main.select_best_choice }}</option>
            <option value="full_time">{{ $parent.$parent.$attrs.words.jobs.save_job.full_time }}</option>
            <option value="part_time">{{ $parent.$parent.$attrs.words.jobs.save_job.part_time }}</option>
            <option value="negotiable">{{ $parent.$parent.$attrs.words.jobs.save_job.negotiable }}</option>
          </select>
        </div>
      </div>

      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label class="w-100">{{ $parent.$parent.$attrs.words.jobs.main.min_experience }}</label>
          <span><i class="bi bi-arrow-down"></i></span>
          <input class="form-control" type="number" min="0" name="min_experience">
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group input-icon flex-wrap">
          <label class="w-100">{{ $parent.$parent.$attrs.words.jobs.main.max_experience }}</label>
          <span><i class="bi bi-arrow-up"></i></span>
          <input class="form-control" type="number" max="1" name="max_experience">
        </div>
      </div>

      <div class="col-lg-3 col-md-6 mb-2">
        <div class="form-group">
          <label class="w-100">{{ $parent.$parent.$attrs.words.jobs.main.start_date_posting }}</label>
          <input type="date" name="start_date" class="form-control">
        </div>
      </div>

      <div class="col-lg-3 col-md-6 mb-2 mt-2">
        <input type="submit" class="btn btn-primary w-100" :value="$parent.$parent.$attrs.words.jobs.main.filter">
      </div>
    </div>
  </form>

</template>

<script>
import {mapActions , mapGetters} from "vuex";
import FilterJobs from "@/mixins/FilterJobs";
export default {
  name: "FilterationJobsComponent",
  mixins:[FilterJobs],
  methods:{
    ...mapActions({
      'citiesAction':'places/cities/getCitiesInsideCountryAction',
    }),
  },
  computed:{
    ...mapGetters({
      'categories':'jobs/categories/get_data',
      'countries':'places/countries/getCountriesGetter',
      'cities':'places/cities/getCitiesGetter'
    })
  },
}
</script>

<style scoped>

</style>
