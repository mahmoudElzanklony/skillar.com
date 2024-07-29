export default {
  data(){
    return  {
      current_id:null,
    }
  },

  computed:{
    authorizeControl(){
      return this.current_id == this.$auth.$state?.user?.id;
    }
  },
  async created() {
    if(this.$route.params.id){
      this.current_id = parseInt(this.$route.params.id)
    }
    if(!(this.authorizeControl)){
      await this.$store.dispatch('profile/visits/getVisitedUserAction',this.current_id)
    }
    this.$store.commit('profile/visits/InitializeVisitedUser',this.$auth.$state.user)
  }
}
