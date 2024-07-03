import formValidation from '/validation/formValidation';
export const state = () => ({
  data: null,
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
  UpdateData(state,payload){
    state.data.push(payload)
  },
}


export const actions = {
  async saveDataAction({ state,commit },payload) {
    let target = document.querySelector('form');
    this.$axios.post('/employee/save-resume',payload).then((e)=>{
      formValidation(e.data,target,'',true);
      if(e.data.status === 200)
      commit('UpdateData',e.data.data)
    })
  },

  async getDataAction({ state,commit }) {
    this.$axios.post('/employee/get-resumes')
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
  },


}
