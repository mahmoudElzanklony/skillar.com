import formValidation from '/validation/formValidation';
export const state = () => ({
  data: null,
})



export const getters = {
  get_video_data(state) {
    return state.data
  },
}

export const mutations = {
  InitializeVideoData(state,payload){
    state.data = payload;
  },
}


export const actions = {
  async saveVideoDataAction({ state,commit }) {
    let target = event.target;
    let data = new FormData(target)
    let router = this.$router;
    let page = window.location.pathname;
    console.log(page);
    this.$axios.post('/profile/save-video',data).then((e)=>{
      formValidation(e.data,target,page,true,router);
    })
  },

  async getDataAction({ state,commit }) {
    this.$axios.post('/profile/get-video')
      .then((e)=>{
        console.log(e.data)
        commit('InitializeVideoData',e.data);
      })
  },


}
