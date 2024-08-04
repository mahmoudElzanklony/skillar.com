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

  async getDataAction({ state,commit },payload) {
    let data = new FormData();
    if(payload){
      data.append('user_id',payload);
    }
    await this.$axios.post('/employee/get-resumes',data)
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
    document.querySelector('.modal').className = 'modal fade show'

  },


}
