import formValidation from '/validation/formValidation';
export const state = () => ({
  data: null,
  error:0,
})



export const getters = {
  get_visited_user(state) {
    return state.data
  },
  get_error(state){
    return state.error;
  }
}

export const mutations = {
  InitializeVisitedUser(state,payload){
    state.data = payload;
  },
  InitializeError(state,payload){
    state.error = payload;
  },

}


export const actions = {
  async visitProfileAction({ state,commit },payload) {
    let data = new FormData();
    data.append('user_id',payload);
    this.$axios.post('/profile/visit',data).then((e)=>{

    })
  },
  async getVisitedUserAction({ state,commit },payload) {
    this.$axios.get('/user?user_id='+payload).then((e)=>{
        console.log(e.data);
        commit('InitializeVisitedUser',e.data);
    }).catch((e)=>{
      commit('InitializeError',1);
    })
  },


}
