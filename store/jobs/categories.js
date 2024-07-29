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
  InitializeData(state,payload = []){
    state.categories = payload;
  },
  PushNewItem(state,payload ){
    state.categories.push(payload)
  },
  UpdateItem(state,payload ){
    let id = state.categories.findIndex((item)=>{
      return item.id ==  payload.id;
    });
    if(id >= 0){
      if(state.categories[id]) {
        this._vm.$set(state.categories,id,payload);
      }
    }
  },

}


export const actions = {
  async saveCategoryAction({ state,commit,rootGetters }) {
    let target = event.target;
    let data = new FormData(target)
    if(target.getAttribute('complete_url').length > 0){
      data.append('_method','PUT');
      data.append('id',target.getAttribute('complete_url').replace('/',''));
    }

    this.$axios.post('/categories-jobs'+(target.getAttribute('complete_url').length > 0 ? target.getAttribute('complete_url').replace('/',''):''),data).then((e)=>{
      formValidation(e.data,target,'',true,'');
        if(target.getAttribute('complete_url').length > 0){
          commit('UpdateItem',e.data.data)
        }else{
          commit('PushNewItem',e.data.data)
        }
        console.log(e.data.data)
        console.log(state.categories)
    })
  },

  getStatisticsDataAction({ commit } , payload = '') {
    return this.$axios.get('/statistics/categories',payload != '' ? {
      headers: {
        'AllLangs': true
      }
    }:'')
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
  },


  getDataAction({ commit }) {
    return this.$axios.get('/categories-jobs')
      .then((e)=>{
        commit('InitializeData',e.data.data);
      })
  },


}
