import formValidation from '/validation/formValidation';
export const state = () => ({
  data: [],
  status:true,
  total:0,
})



export const getters = {
  get_data(state) {
    return state.data
  },
}

export const mutations = {
  InitializeData(state,payload = []){
    state.data = payload;
  },
  UpdateData(state,payload){
    if(payload.length > 0) {
      state.data = [...state.data, ...payload]
    }
  },
  EmptyData(state){
    state.data = [];
  },
  ChangeStatus(state,payload){
    state.status = payload;
  },
  SetTotal(state,payload){
    state.total = payload;
  },
}


export const actions = {

  getDataAction({ commit ,state} , payload = '') {
    if(payload.length > 1 && payload.indexOf('empty') >= 0){
      commit('EmptyData');
      commit('ChangeStatus',true);
    }
    var page = payload.substring(payload.indexOf('page='));
    console.log(state.status)
    if(state.status) {
      return this.$axios.get('/dashboard/users'+payload).then((e) => {
        commit('UpdateData', e.data.data);
        commit('SetTotal',e.data.meta.total);
        if(e.data.data.length === 0){
          commit('ChangeStatus',false);
        }
      }).finally(() => {
        commit('loader/updateLoaderMutation', false, {root: true});
      });
    }
  },

}
