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
  async GetDataAction({ state,commit,rootGetters },payload) {
    let data = new FormData()
    data.append('user_id',payload)

    this.$axios.post('/profile/get-applied-jobs',data).then((e)=>{
      commit('InitializeData',e.data.data)
    })
  },



}
