import formValidation from '/validation/formValidation';
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

  async getStatisticsProfile({commit}){
    await this.$axios.get('/profile/statistics')
      .then((e)=>{
         commit('InitializeData',e.data.data)
      })
  },

}
