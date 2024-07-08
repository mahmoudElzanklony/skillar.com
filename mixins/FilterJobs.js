import {mapActions} from "vuex";
import animateData from "@/mixins/animateData";
export default {
  name:'FilterJobs',
  data(){
    return {
      filters:'?',
    }
  },
  methods:{
    ...mapActions({
      'filterJobs':'jobs/getJobsAction'
    }),
    async submitData(){
      if(event?.type === 'submit') {
        let data = new FormData(event.target);
        let data_filters = '?';
        for (let item of data.entries()) {

          if(item[1] !== ''){
            data_filters += item[0] + '='+item[1]+'&';
          }
        }
        this.filters = data_filters.substring(0,data_filters.length-1)
      }else{
        if(document.URL.indexOf('?')[1] !== undefined){
          this.filters = document.URL.substring(document.URL.indexOf('?'));
        }
      }
      this.current_page = 1;
      await this.filterJobs(this.filters.length > 1 ? this.filters+'&empty=true&page=1' : '?empty=true&page=1')
      try{
        this.$parent?.resetCurrentPage();
      }catch (e){}
      if(document.querySelector('.infinite_scroll > div:last-child')) {
        this.$parent?.lastObserver?.observe(document.querySelector('.infinite_scroll > div:last-child'))
      }
    }
  }
}
