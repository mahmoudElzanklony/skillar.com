import formValidation from '/validation/formValidation';
import FormValidation from "/validation/formValidation";
export const state = () => ({
  data: [],
  item:null
})



export const getters = {
  get_data(state) {
    return state.data
  },
  get_item(state){
    return state.item
  }
}

export const mutations = {
  InitializeData(state,payload){
    state.data = payload;
  },
  InitializeItem(state,payload){
    state.item = payload;
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

  async applyJobAction({ state,commit,rootGetters },data) {
    let target = document.querySelector('form');

    this.$axios.post('/applicants/apply',data).then((e)=>{
      formValidation(e.data,target,'',true,'');
      commit('InitializeItem',e.data.data)
    })
  },

  async getSpecificOneAction({ state,commit,rootGetters },payload) {
    return this.$axios.get('/applicants/specific_one?job_id='+payload).then((e)=>{
      if(e.data.data != null){
        console.log(e.data.data)
        commit('InitializeItem',e.data.data)
      }
    })
  },




}
