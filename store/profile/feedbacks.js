import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data: [],
})



export const getters = {
  get_data(state) {
    return state.data
  },
}

export const mutations = {
  InitializeData(state,payload){
    state.data = payload;
  },
}


export const actions = {
  async saveDataAction({ state,commit,rootGetters }) {
    let target = event.target;
    let data = new FormData(target)
    data.append('receiver_id',rootGetters["profile/employee/get_profile_id"])

    this.$axios.post('/profile/make-feedback',data).then((e)=>{
      formValidation(e.data,target,'',true,'');
    })
  },


  async updateStatusAction({ state,commit },payload) {
    let data = new FormData();
    data.append('id',payload);
    let router = this.$router;
    let page = document.URL;
    this.$axios.post('/profile/update-feedback-status',data)
      .then((e)=>{
        Toast.fire({
          icon:'success',
          title:e.data?.message
        });
        this.$router.push(page);
      })
  },
  async getDataAction({ state,commit },payload) {
    let data = new FormData();
    data.append('id',payload);
    this.$axios.post('/profile/get-feedbacks',data)
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
  },


}
