import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data: [],
  jobs:[],
  total:0,
  status:true,
  item:false,
})



export const getters = {
  get_data(state) {
    return state.data
  },
  getTotal(state){
    return state.total;
  },
  get_item(state) {
    return state.item
  },
  get_jobs(state){
    return state.jobs
  }
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
  InitializeItem(state,payload){
    state.item = payload;
  },
  InitializeJobs(state,payload){
    state.jobs = payload;
  },
  UpdateData(state,payload){
    if(payload.length > 0) {
      state.jobs = [...state.jobs, ...payload]
    }
  },
  EmptyData(state){
    state.jobs = [];
  },
}


export const actions = {
  async saveDataAction({ state,commit,rootGetters }) {
    let target = event.target;
    let data = new FormData(target)
    let editors = document.querySelectorAll('.ck-editor__editable');
    data.append('description',editors[0].innerHTML)
    data.append('responsibilities',editors[1].innerHTML)
    if(target.getAttribute('complete_url').length > 0){
      data.append('_method','PUT');
      data.append('id',target.getAttribute('complete_url').replace('/',''));
    }
    this.$axios.post('/jobs-offers'+target.getAttribute('complete_url'),data).then((e)=>{
      formValidation(e.data,target,'',true,'');
    })
  },

  getJobInfoAction({ state,commit,rootGetters },payload) {
    return this.$axios.get('/jobs-offers/'+payload).then((e)=>{
      commit('InitializeItem',e.data.data);
    })
  },

  getJobsAction({ state,commit,rootGetters },payload) {
    if(payload.length > 1 && payload.indexOf('empty') >= 0){
      commit('EmptyData');
      commit('ChangeStatus',true);
    }
    var page = payload.substring(payload.indexOf('page='));
    if(state.status) {
      return this.$axios.get('/jobs-offers'+payload).then((e) => {
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


  getDataAction({ commit }) {
    return this.$axios.get('/categories-jobs')
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
  },


}
