import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data_per_job: [],
  selected_applicant:null,
})



export const getters = {
  get_data(state) {
    return state.data_per_job
  },
  get_applicant(state){
    return state.selected_applicant
  }
}

export const mutations = {
  InitializeData(state,payload){
    state.data_per_job = payload;
  },
  InitializeApplicant(state,payload){
    state.selected_applicant = payload;
  }
}


export const actions = {
  async getDataAction({ state,commit,rootGetters },payload) {
    this.$axios.post('/jobs-offers/get-applicants',payload).then((e)=>{
      commit('InitializeData',e.data.data);
    })
  },
  async rateApplicantAction({ state,commit,rootGetters },payload) {
    this.$axios.post('/jobs-offers/change-applicant-status',payload).then((e)=>{
      Toast.fire({
        icon:'success',
        title:e.data.message
      })
    });
  },


}
