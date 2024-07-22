import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data: [],
  total:0,
  status:true,
})



export const getters = {
  get_data(state) {
    return state.data
  },
  getTotal(state){
    return state.total;
  },
}

export const mutations = {
  InitializeData(state,payload){
    state.data = payload;
  },
  ChangeStatus(state,payload){
    state.status = payload;
  },
  SetTotal(state,payload){
    state.total = payload;
  },
  UpdateData(state,payload){
    if(payload.length > 0) {
      state.data = [...state.data, ...payload]
    }
  },
  EmptyData(state){
    state.jobs = [];
  },
}


export const actions = {


  async colleaguesAction({ state,commit,rootGetters },payload = '') {
    if(payload.length > 1 && payload.indexOf('empty') >= 0){
      commit('EmptyData');
      commit('ChangeStatus',true);
    }
    var page = payload.substring(payload.indexOf('page='));
    if(state.status) {
      return this.$axios.get('/colleagues'+payload).then((e) => {
        commit('UpdateData', e.data.data);
        commit('SetTotal',e.data?.meta?.total);
        if(e.data.data.length === 0){
          commit('ChangeStatus',false);
        }
      }).finally(() => {
        commit('loader/updateLoaderMutation', false, {root: true});
      });
    }
  },



}
