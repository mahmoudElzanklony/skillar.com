import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  categories: [],
})



export const getters = {
  get_data(state) {
    console.log('getters')
    return state.categories
  },
}

export const mutations = {
  InitializeData(state,payload){
    console.log('mutation')
    state.categories = payload;
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


  getDataAction({ commit }) {
    return this.$axios.get('/categories-jobs')
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
  },


}
