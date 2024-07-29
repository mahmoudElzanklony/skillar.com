
export default {
  name:'animateData',
  data(){
    return {
      observer:null,
      lastObserver:null,
      current_page:2,
    }
  },
   mounted() {

     this.ObserveData()
  },
  methods:{
    ObserveData(){
      let action_path = $('#__nuxt').find('.infinite_scroll').attr('action_path');
      let method = $('#__nuxt').find('.infinite_scroll').attr('method');
      let form_submit = $('.infinite_scroll_form')
      this.observer = new IntersectionObserver(entries=>{
          entries.forEach(entry => {
            entry.target.classList.toggle('show',entry.isIntersecting)
            //if(entry.isIntersecting) this.observer.unobserve(entry.target)
          })
        }
      );
      this.lastObserver = new IntersectionObserver(async entries => {
        const last = entries[0]
        if(last.isIntersecting) {
          if (action_path !== '') {
            let data = new FormData(form_submit[0])
            if(method === 'post') {
              data.append('page', this.current_page);
            }else{
              let data_filters = '?';
              for (let item of data.entries()) {
                if(item[1] !== ''){
                  data_filters += item[0] + '='+item[1]+'&';
                }
              }
              let user_id = this.$auth.$state.user.id
              if(this?.current_user){
                user_id = this.current_user;
              }
              if(this.filter_with_user_id){
                data_filters += this.filter_with_user_id+'='+user_id+'&';
              }
              data = data_filters+'page='+this.current_page;
            }
            await this.$store.dispatch(action_path, data);
            this.current_page++;
          }
          // remove observe from current last item and select new last item to be observed
          this.lastObserver.unobserve(last.target)
          if($(last.target).nextAll().length > 0) {
            for(let tem of $(last.target).nextAll()){
              this.observer.observe(tem)
            }
            this.observe_last_item()
          }
        }
      },{
        rootMargin:"60px"
      })
      // go to last child to be observed
      this.observe_last_item()
    },
    observe_last_item(){
      if(this.last_item_observed_selector){
        if (document.querySelector(this.last_item_observed_selector)) {
          this.lastObserver.observe(document.querySelector(this.last_item_observed_selector))
        }
      }else {
        if (document.querySelector('.infinite_scroll > div:last-child')) {
          this.lastObserver.observe(document.querySelector('.infinite_scroll > div:last-child'))
        }
      }
    }
  }
}
