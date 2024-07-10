import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data_per_job: [],
})



export const getters = {
  get_data(state) {
    return state.data_per_job
  },
}

export const mutations = {
  InitializeData(state,payload){
    state.data_per_job = payload;
  },

}


export const actions = {
  async getDataAction({ state,commit,rootGetters },payload) {
    this.$axios.post('/jobs-offers/get-applicants',payload).then((e)=>{
      commit('InitializeData',e.data.data);
    })
  },


}
