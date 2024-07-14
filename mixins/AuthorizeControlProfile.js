export default {
  data(){
    return  {
      current_id:null
    }
  },

  computed:{
    authorizeControl(){
      return this.current_id == this.$auth.$state.user.id;
    }
  },
  created() {
    if(this.$route.params.id){
      this.current_id = parseInt(this.$route.params.id)
    }
  }
}
